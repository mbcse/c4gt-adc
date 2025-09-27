const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();
const { getOrgUnitDescendants } = require('../../utils/filterUtils');


class FilterOptionsService {
  async getFilterOptions(user) {
    try {
      let blockWhere = { type: 'BLOCK' };
      let schoolWhere = { type: 'SCHOOL' };

      let accessibleOrgIds = [];

      if (user && user.role !== 'SUPERADMIN' && user.organizationUnitId) {
        accessibleOrgIds = [
          user.organizationUnitId,
          ...(await getOrgUnitDescendants(user.organizationUnitId))
        ];

        blockWhere.id = { in: accessibleOrgIds };
        schoolWhere.id = { in: accessibleOrgIds };
      }

      const [blocks, schools, grades, students, courses] = await Promise.all([
        prisma.organizationUnit.findMany({
          where: blockWhere,
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        }),
        prisma.organizationUnit.findMany({
          where: schoolWhere,
          select: {
            id: true,
            name: true,
            parentId: true,
          },
          orderBy: { name: "asc" },
        }),
        prisma.grade.findMany({
          orderBy: { value: 'asc' },
        }),
        prisma.user.findMany({
          where: {
            role: 'STUDENT',
            ...(user && user.role !== 'SUPERADMIN' && user.organizationUnitId ? {
              organizationUnitId: { in: accessibleOrgIds }
            } : {})
          },
          select: {
            id: true,
            name: true,
            email: true,
            organizationUnitId: true,
            organizationUnit: {
              select: {
                id: true,
                name: true,
                type: true,
                parentId: true
              }
            }
          },
          orderBy: { name: 'asc' }
        }),
        prisma.course.findMany({
          select: { id: true, title: true },
          orderBy: { title: 'asc' }
        })
      ]);

      return {
        grades: grades.map(g => ({
          id: g.id,
          value: g.value,
        })),
        schools: schools.map(s => ({
          id: s.id,
          name: s.name,
          blockId: s.parentId,
        })),
        blocks: blocks.map(b => ({ id: b.id, name: b.name })),
        students: students.map(s => ({
          id: s.id,
          name: s.name,
          email: s.email,
          organizationUnitId: s.organizationUnitId,
          schoolId: s.organizationUnit?.type === 'SCHOOL' ? s.organizationUnit.id : null,
          blockId: s.organizationUnit?.type === 'SCHOOL' ? s.organizationUnit.parentId :
            s.organizationUnit?.type === 'BLOCK' ? s.organizationUnit.id : null
        })),
        courses: courses.map(c => ({ id: c.id, title: c.title }))
      };
    } catch (error) {
      console.error("Error fetching filter options:", error);
      throw new Error("Could not retrieve filter options.");
    }
  }
}

module.exports = new FilterOptionsService();
