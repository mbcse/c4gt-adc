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

      const [watchLogs, quizAttempts, coursesWithStructure] = await Promise.all([
        prisma.watchLog.findMany({
          where: { userId: { in: studentIds }, isCompleted: true, ...(dateFilter && { updatedAt: dateFilter }) },
          select: { userId: true, videoId: true }
        }),
        prisma.quizAttempt.findMany({
          where: { userId: { in: studentIds }, ...(dateFilter && { completedAt: dateFilter }) },
          select: { userId: true, quizId: true }
        }),
        prisma.course.findMany({
          where: { id: { in: uniqueCourseIds } },
          include: {
            courseVideos: {
              include: {
                video: {
                  select: {
                    id: true,
                    quiz: {
                      select: {
                        id: true
                      }
                    }
                  }
                }
              }
            }
          }
        })
      ]);

      const courseStructureMap = new Map(coursesWithStructure.map(c => [c.id, c]));

      const studentsWithProgress = students.map(student => {
        const studentEnrolledCourses = Array.from((enrolledCoursesMap.get(student.id) || new Map()).values());

        const courseProgress = studentEnrolledCourses.map(enrolledCourse => {
          const course = courseStructureMap.get(enrolledCourse.courseId);
          if (!course) return null;

          const courseVideos = course.courseVideos.map(cv => cv.video);
          const courseVideoIds = new Set(courseVideos.map(v => v.id));

          const courseQuizIds = new Set(courseVideos.map(v => v.quiz?.id).filter(Boolean));

          const completedVideos = watchLogs.filter(log => log.userId === student.id && courseVideoIds.has(log.videoId)).length;
          const completedQuizzes = quizAttempts.filter(att => att.userId === student.id && courseQuizIds.has(att.quizId)).length;

          const totalVideos = courseVideoIds.size;
          const totalQuizzes = courseQuizIds.size;

          const videoCompletionRate = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
          const quizCompletionRate = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;

          const overallCompletionRate = totalQuizzes > 0
            ? (videoCompletionRate * 0.7) + (quizCompletionRate * 0.3)
            : videoCompletionRate;

          return {
            courseId: course.id,
            courseTitle: course.title,
            completionRate: Math.round(overallCompletionRate),
            isCompleted: overallCompletionRate >= 95
          };
        }).filter(Boolean);

        return {
          ...student,
          courseProgress
        };
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

