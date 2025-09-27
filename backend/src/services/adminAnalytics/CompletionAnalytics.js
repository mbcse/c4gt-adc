const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();

const { buildUserFilter, buildDateFilter, getEnrolledCoursesForStudents } = require('../../utils/filterUtils');

const {
  aggregateByGrade,
  aggregateBySchool,
  aggregateByBlock,
  calculateOverallCompletionRates
} = require('../../utils/aggregationUtils');

class CompletionService {

  async getCourseCompletionRates(filters = {}, user) {
    try {
      const userFilter = await buildUserFilter(filters, user);
      const dateFilter = buildDateFilter(filters);

      const students = await prisma.user.findMany({
        where: userFilter,
        include: {
          grade: true,
          organizationUnit: {
            include: {
              parent: true
            }
          },
        },
      });

      if (students.length === 0) {
        return {
          byGrade: [],
          bySchool: [],
          byBlock: [],
          overall: { totalStudents: 0, avgCompletionRate: 0, completedStudents: 0, totalEnrollments: 0 }
        };
      }

      const studentIds = students.map(s => s.id);
      const enrolledCoursesMap = await getEnrolledCoursesForStudents(studentIds, dateFilter);
      const allCourseIds = Array.from(enrolledCoursesMap.values()).flatMap(courseMap => Array.from(courseMap.keys()));
      const uniqueCourseIds = [...new Set(allCourseIds)];

      const [videoProgress, quizProgress, courseStructures] = await Promise.all([
        // Aggregate completed videos per student per course
        prisma.watchLog.groupBy({
          by: ['userId', 'videoId'],
          where: { userId: { in: studentIds }, isCompleted: true, ...(dateFilter && { updatedAt: dateFilter }) },
          _count: { videoId: true }
        }),
        // Aggregate completed quizzes per student per course
        prisma.quizAttempt.groupBy({
            by: ['userId', 'quizId'],
            where: { userId: { in: studentIds }, ...(dateFilter && { completedAt: dateFilter }) },
            _count: { quizId: true }
        }),
        // Get course structures
        prisma.course.findMany({
          where: { id: { in: allCourseIds } },
          include: { courseVideos: { select: { video: { select: { id: true, quiz: { select: { id: true } } } } } } }
        })
      ]);

      const courseStructureMap = new Map();
      courseStructures.forEach(c => {
        courseStructureMap.set(c.id, {
          totalVideos: c.courseVideos.length,
          totalQuizzes: c.courseVideos.filter(cv => cv.video.quiz).length,
          videoIds: new Set(c.courseVideos.map(cv => cv.video.id)),
          quizIds: new Set(c.courseVideos.map(cv => cv.video.quiz?.id).filter(Boolean)),
        });
      });
      
      const studentsWithProgress = students.map(student => {
        const studentEnrolledCourses = Array.from((enrolledCoursesMap.get(student.id) || new Map()).values());
        
        const courseProgress = studentEnrolledCourses.map(enrolledCourse => {
          const structure = courseStructureMap.get(enrolledCourse.courseId);
          if (!structure) return null;

          const completedVideos = videoProgress.filter(p => p.userId === student.id && structure.videoIds.has(p.videoId)).length;
          const completedQuizzes = quizProgress.filter(p => p.userId === student.id && structure.quizIds.has(p.quizId)).length;
          
          const videoCompletionRate = structure.totalVideos > 0 ? (completedVideos / structure.totalVideos) * 100 : 0;
          const quizCompletionRate = structure.totalQuizzes > 0 ? (completedQuizzes / structure.totalQuizzes) * 100 : 100;
          const overallCompletionRate = structure.totalQuizzes > 0 ? (videoCompletionRate * 0.7) + (quizCompletionRate * 0.3) : videoCompletionRate;

          return {
            courseId: enrolledCourse.courseId,
            courseTitle: enrolledCourse.courseTitle,
            completionRate: Math.round(overallCompletionRate),
            isCompleted: overallCompletionRate >= 95
          };
        }).filter(Boolean);

        return { ...student, courseProgress };
      });

      return {
        byGrade: aggregateByGrade(studentsWithProgress),
        bySchool: aggregateBySchool(studentsWithProgress),
        byBlock: aggregateByBlock(studentsWithProgress),
        overall: calculateOverallCompletionRates(studentsWithProgress)
      };

    } catch (error) {
      console.error("Error getting course completion rates:", error);
      throw error;
    }
  }
}

module.exports = new CompletionService();

