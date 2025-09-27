const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();

class FilterOptionsService {
  
  async getFilterOptions() {
    try {
      const [grades, schools, districts, students, courses] = await Promise.all([
        prisma.grade.findMany({ orderBy: { value: 'asc' } }),
        prisma.school.findMany({ 
          include: { district: true },
          orderBy: { name: 'asc' }
        }),
        prisma.district.findMany({ orderBy: { name: 'asc' } }),
        prisma.user.findMany({
          where: { role: 'STUDENT' },
          select: { id: true, name: true, email: true },
          orderBy: { name: 'asc' }
        }),
        prisma.course.findMany({
          select: { id: true, title: true },
          orderBy: { title: 'asc' }
        })
      ]);

      return {
        grades: grades.map(g => ({ id: g.id, value: g.value })),
        schools: schools.map(s => ({ 
          id: s.id, 
          name: s.name, 
          districtId: s.districtId,
          districtName: s.district.name 
        })),
        districts: districts.map(d => ({ id: d.id, name: d.name })),
        students: students.map(s => ({ id: s.id, name: s.name, email: s.email })),
        courses: courses.map(c => ({ id: c.id, title: c.title }))
      };
    } catch (error) {
      console.error("Error getting filter options:", error);
      throw error;
    }
  }
}

module.exports = new FilterOptionsService();
