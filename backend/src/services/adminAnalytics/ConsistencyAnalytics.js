const { PrismaClient, Prisma } = require("../../../generated/prisma");
const prisma = new PrismaClient();

const { buildUserFilter, buildDateFilter } = require('../../utils/filterUtils');
const {
  aggregateConsistencyByGrade,
  aggregateConsistencyBySchool,
  aggregateConsistencyByBlock,
  calculateOverallConsistency,
} = require('../../utils/aggregationUtils');
const { getBlockName } = require('../../utils/aggregationUtils');

class ConsistencyService {

  async getConsistencyRates(filters = {}, user) {
    try {
      const userFilter = await buildUserFilter(filters, user);
      
      const students = await prisma.user.findMany({
        where: userFilter,
        include: {
          grade: true,
          organizationUnit: { include: { parent: true } }
        }
      });

      if (students.length === 0) {
        return {
          byGrade: [], bySchool: [], byBlock: [],
          overall: { totalStudents: 0, avgConsistency: 0 },
          individual: []
        };
      }

      const studentIds = students.map(s => s.id);
      
      let startDate, endDate;
      if (filters.startDate && filters.endDate) {
          startDate = new Date(filters.startDate);
          endDate = new Date(filters.endDate);
      } else {
          const firstLog = await prisma.watchLog.findFirst({
              where: { userId: { in: studentIds } },
              orderBy: { updatedAt: 'asc' },
              select: { updatedAt: true }
          });
          startDate = firstLog ? firstLog.updatedAt : new Date();
          endDate = new Date();
      }

      const totalDays = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));

      const activeDaysResult = await prisma.$queryRaw`
        SELECT userId, COUNT(DISTINCT DATE(updatedAt)) as activeDays
        FROM WatchLog
        WHERE userId IN (${Prisma.join(studentIds)})
        AND updatedAt >= ${startDate}
        AND updatedAt <= ${endDate}
        GROUP BY userId
      `;
      
      const activeDaysMap = new Map(activeDaysResult.map(r => [r.userId, Number(r.activeDays)]));

      const consistencyData = students.map(student => {
        const activeDays = activeDaysMap.get(student.id) || 0;
        const consistencyRate = totalDays > 0 ? (activeDays / totalDays) * 100 : 0;

        return {
          studentId: student.id,
          studentName: student.name,
          grade: student.grade?.value,
          school: student.organizationUnit?.name,
          block: getBlockName(student),
          activeDays,
          totalDays,
          consistencyRate: Math.round(consistencyRate)
        };
      });

      return {
        byGrade: aggregateConsistencyByGrade(consistencyData),
        bySchool: aggregateConsistencyBySchool(consistencyData),
        byBlock: aggregateConsistencyByBlock(consistencyData),
        overall: calculateOverallConsistency(consistencyData),
        individual: consistencyData
      };
    } catch (error) {
      console.error("Error getting consistency rates:", error);
      throw error;
    }
  }
}

module.exports = new ConsistencyService();