const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();

const { buildDateFilter, getEnrolledCoursesForStudents } = require('../../utils/filterUtils');

class StudentService {
  async getIndividualStudentAnalytics(studentId, filters = {}) {
    try {
      const id = parseInt(studentId);
      const dateFilter = buildDateFilter(filters);

      const student = await prisma.user.findUnique({
        where: { id },
        include: {
          grade: true,
          school: { include: { district: true } },
        },
      });

      if (!student) {
        throw new Error('Student not found');
      }

      const enrolledCoursesMap = await getEnrolledCoursesForStudents([id], dateFilter);
      const enrolledCourses = Array.from((enrolledCoursesMap.get(id) || new Map()).values());
      const courseIds = enrolledCourses.map(c => c.courseId);

      const watchLogs = await prisma.watchLog.findMany({
          where: { userId: id, ...(dateFilter && { updatedAt: dateFilter }) },
      });
      const quizAttempts = await prisma.quizAttempt.findMany({
          where: { userId: id, ...(dateFilter && { completedAt: dateFilter }) },
      });

      const coursesWithStructure = await prisma.course.findMany({
          where: { id: { in: courseIds } },
          include: { courseVideos: { include: { video: { include: { quiz: true } } } } }
      });
      const coursesStructureMap = new Map(coursesWithStructure.map(c => [c.id, c]));

      const courseProgress = enrolledCourses.map(enrolledCourse => {
          const course = coursesStructureMap.get(enrolledCourse.courseId);
          if (!course) return null;

          const courseVideos = course.courseVideos.map(cv => cv.video);
          const totalVideos = courseVideos.length;
          const completedVideos = courseVideos.filter(v => 
              watchLogs.some(log => log.videoId === v.id && log.isCompleted)
          ).length;

          const quizzes = courseVideos.map(v => v.quiz).filter(Boolean);
          const totalQuizzes = quizzes.length;
          const completedQuizzes = quizzes.filter(q => 
              quizAttempts.some(attempt => attempt.quizId === q.id)
          ).length;
          
          const relevantAttempts = quizAttempts.filter(attempt => quizzes.some(q => q.id === attempt.quizId));
          const avgQuizScore = relevantAttempts.length > 0 ? relevantAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / relevantAttempts.length : 0;
          const videoCompletionRate = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
          const quizCompletionRate = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;
          const overallCompletionRate = totalQuizzes > 0 ? (videoCompletionRate * 0.7) + (quizCompletionRate * 0.3) : videoCompletionRate;

          return {
              courseId: course.id,
              courseTitle: course.title,
              completionRate: Math.round(overallCompletionRate),
              totalVideos, completedVideos, totalQuizzes, completedQuizzes,
              avgQuizScore: Math.round(avgQuizScore * 10) / 10
          };
      }).filter(Boolean); 

      const totalStudyTime = Math.round((watchLogs.reduce((sum, log) => sum + log.totalWatchTime, 0) / 3600) * 10) / 10;
      const quizAnalytics = {
          totalAttempts: quizAttempts.length,
          avgScore: quizAttempts.length > 0 ? Math.round((quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / quizAttempts.length) * 10) / 10 : 0,
          perfectScores: quizAttempts.filter(attempt => attempt.score >= 95).length
      };

      return {
        student: {
          id: student.id, name: student.name, email: student.email,
          grade: student.grade?.value, school: student.school?.name, district: student.school?.district?.name
        },
        courseProgress,
        totalStudyTime,
        quizAnalytics,
        enrolledCourses: enrolledCourses.length, 
        completedCourses: courseProgress.filter(cp => cp.completionRate >= 95).length
      };
    } catch (error) {
      console.error("Error getting individual student analytics:", error);
      throw error;
    }
  }
}

module.exports = new StudentService();
