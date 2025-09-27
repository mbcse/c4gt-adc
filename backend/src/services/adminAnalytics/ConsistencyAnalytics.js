const { PrismaClient } = require("../../../generated/prisma");
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
      const dateFilter = buildDateFilter(filters);

      const students = await prisma.user.findMany({
        where: userFilter,
        include: {
          watchLogs: {
            where: dateFilter ? { updatedAt: dateFilter } : undefined,
            select: { updatedAt: true, totalWatchTime: true }
          },
          grade: true,
          organizationUnit: {
            include: {
              parent: true
            }
          }
        }
      });

      const consistencyData = students.map(student => {
        const logs = student.watchLogs;

        // Group activity by date
        const dailyActivity = new Map();
        logs.forEach(log => {
          const date = log.updatedAt.toISOString().split('T')[0];
          if (!dailyActivity.has(date)) {
            dailyActivity.set(date, 0);
          }
          dailyActivity.set(date, dailyActivity.get(date) + log.totalWatchTime);
        });

        const activeDays = dailyActivity.size;
        // Calculate total days in the filtered period, default to 30
        const totalDays = (filters.startDate && filters.endDate)
          ? Math.ceil((new Date(filters.endDate) - new Date(filters.startDate)) / (1000 * 60 * 60 * 24))
          : 30;

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

      // Aggregate consistency rates
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
