const { PrismaClient,Prisma } = require("../../../generated/prisma");
const prisma = new PrismaClient();

const { buildUserFilter, buildDateFilter, getEnrolledCoursesForStudents } = require('../../utils/filterUtils');

class EngagementService {

  async getEngagementMetrics(filters = {}, user) {
    try {
      const userFilter = await buildUserFilter(filters, user);
      const dateFilter = buildDateFilter(filters);

      const activeStudentsCount = await prisma.user.count({ where: { ...userFilter, watchLogs: { some: { ...(dateFilter && { updatedAt: dateFilter }) } } } });
      const totalStudentsCount = await prisma.user.count({ where: userFilter });
      const watchLogStats = await prisma.watchLog.aggregate({
        where: { user: userFilter, ...(dateFilter && { updatedAt: dateFilter }) },
        _avg: { totalWatchTime: true },
        _sum: { totalWatchTime: true },
        _count: { id: true }
      });

 const studentsForTrend = await prisma.user.findMany({
        where: userFilter,
        select: { id: true }
      });
      const studentIdsForTrend = studentsForTrend.map(s => s.id);

      let activeStudentsTrend = [];
      if (studentIdsForTrend.length > 0) {
        const trendResult = await prisma.$queryRaw`
          SELECT DATE(updatedAt) as date, COUNT(DISTINCT userId) as count
          FROM WatchLog
          WHERE userId IN (${Prisma.join(studentIdsForTrend)})
          ${dateFilter ? Prisma.raw(`AND updatedAt >= '${filters.startDate}' AND updatedAt <= '${filters.endDate}'`) : Prisma.empty}
          GROUP BY DATE(updatedAt)
          ORDER BY date ASC
        `;

        activeStudentsTrend = trendResult.map(row => {
            const date = new Date(row.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return {
                date: `${year}-${month}-${day}`,
                count: Number(row.count) 
            };
        });
      }

      const totalWatchHours = Math.round(((watchLogStats._sum.totalWatchTime || 0) / 3600) * 10) / 10;
      const avgSessionDuration = watchLogStats._count.id > 0 ? Math.round(((watchLogStats._avg.totalWatchTime || 0) / 60) * 10) / 10 : 0;
      
      const studentsForEnrollment = await prisma.user.findMany({ 
        where: userFilter, 
        select: { 
          id: true, 
          grade: { select: { value: true } }, 
          organizationUnit: { select: { name: true } }
        } 
      });
      const studentIds = studentsForEnrollment.map(s => s.id);
      const enrolledCoursesByStudent = await getEnrolledCoursesForStudents(studentIds, dateFilter);
      const courseEnrollmentStats = this._calculateCourseEnrollmentStats(enrolledCoursesByStudent, studentsForEnrollment);

      return {
        activeStudentsCount,
        totalStudentsCount,
        activeStudentsPercentage: totalStudentsCount > 0 ? Math.round((activeStudentsCount / totalStudentsCount) * 100) : 0,
        totalWatchHours,
        avgSessionDuration,
        courseEnrollmentStats,
        activeStudentsTrend, 
      };

    } catch (error) {
      console.error("Error getting engagement metrics:", error);
      throw error;
    }
  }

  // Helper for course stats
  _calculateCourseEnrollmentStats(enrolledCoursesByStudent, students) {
    const studentInfoMap = new Map(students.map(s => [s.id, {
        grade: s.grade?.value || 'No Grade',
        school: s.organizationUnit?.name || 'No School'
    }]));

    const courseMap = new Map();
    for (const [studentId, courses] of enrolledCoursesByStudent.entries()) {
      const studentInfo = studentInfoMap.get(studentId);
      if (!studentInfo) continue;

      for (const [courseId, courseData] of courses.entries()) {
        if (!courseMap.has(courseId)) {
          courseMap.set(courseId, {
            courseTitle: courseData.courseTitle,
            enrollments: 0,
            byGrade: new Map(),
            bySchool: new Map()
          });
        }
        const aggregatedCourseData = courseMap.get(courseId);
        aggregatedCourseData.enrollments++;
        aggregatedCourseData.byGrade.set(studentInfo.grade, (aggregatedCourseData.byGrade.get(studentInfo.grade) || 0) + 1);
        aggregatedCourseData.bySchool.set(studentInfo.school, (aggregatedCourseData.bySchool.get(studentInfo.school) || 0) + 1);
      }
    }

    return Array.from(courseMap.entries()).map(([courseId, data]) => ({
      courseId, courseTitle: data.courseTitle, totalEnrollments: data.enrollments,
      byGrade: Array.from(data.byGrade.entries()).map(([grade, count]) => ({ grade, count })),
      bySchool: Array.from(data.bySchool.entries()).map(([school, count]) => ({ school, count }))
    }));
  }
}

module.exports = new EngagementService();

