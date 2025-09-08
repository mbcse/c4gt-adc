const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

class CoreAnalyticsService {
async getStudentSummary(userId) {
    try {
      const watchStats = await prisma.watchLog.aggregate({
        where: { userId },
        _sum: { totalWatchTime: true },
        _count: { id: true },
      });

      const completedVideos = await prisma.watchLog.count({
        where: { userId, isCompleted: true },
      });

      const quizStats = await prisma.quizAttempt.aggregate({
        where: { userId },
        _avg: { score: true },
        _count: { id: true },
      });

      const totalQuizzes = quizStats._count.id || 0;
      
      const activityData = await this.calculateStreak(userId);

      const { startedCourses, completedCourses } = await this.getCourseCounts(userId);

      const [
        nextLesson
      ] = await Promise.all([
        this.getNextLesson(userId)
      ]);

      const totalTimeInHours = (watchStats._sum.totalWatchTime || 0) / 3600;
      const totalStudyTime = Math.round(totalTimeInHours * 100) / 100;

      return {
        totalStudyTime: totalStudyTime,
        totalLessons: completedVideos,
        currentStreak: activityData.current,            
        longestStreak: activityData.longest,   
        averageQuizScore: Math.round((quizStats._avg.score || 0) * 10) / 10,
        totalQuizzes,
        enrolledCourses: startedCourses,
        completedCourses,
        completionRate: startedCourses > 0 ? Math.round((completedCourses / startedCourses) * 100) : 0,
        lessonsCompletedThisWeek: activityData.lessonsCompletedThisWeek, 
        studyTimeThisWeek: activityData.studyTimeThisWeek, 
        nextLesson: nextLesson
      };
    } catch (error) {
      console.error("Error getting student summary:", error);
      throw error;
    }
  }

  async getCourseCounts(userId) {
    try {
      // Get all courses where user has any activity (assignments OR watch logs)
      const assignedCourses = await prisma.courseAssignment.findMany({
        where: { userId },
        select: { courseId: true }
      });

      const assignedCourseIds = assignedCourses.map(a => a.courseId);

      // Get courses where user has watch logs (even if not assigned)
      const watchedCourses = await prisma.watchLog.findMany({
        where: { userId },
        include: {
          video: {
            include: {
              courseVideos: {
                select: { courseId: true }
              }
            }
          }
        }
      });

      const watchedCourseIds = Array.from(new Set(
        watchedCourses.flatMap(log =>
          log.video.courseVideos.map(cv => cv.courseId)
        )
      ));

      // Combine both assigned and watched course IDs
      const allCourseIds = Array.from(new Set([...assignedCourseIds, ...watchedCourseIds]));

      // Get full course data for all relevant courses
      const allCourses = await prisma.course.findMany({
        where: { id: { in: allCourseIds } },
        include: {
          courseVideos: {
            include: {
              video: {
                include: {
                  watchLogs: { where: { userId } },
                  quiz: { include: { attempts: { where: { userId } } } },
                },
              },
            },
          },
        },
      });

      let startedCourses = 0;
      let completedCourses = 0;

      allCourses.forEach(course => {
        const totalVideos = course.courseVideos.length;
        const totalDuration = course.courseVideos.reduce((sum, cv) => sum + (cv.video.duration || 0), 0);
        const totalWatchTime = course.courseVideos.reduce((sum, cv) =>
          sum + (cv.video.watchLogs?.[0]?.totalWatchTime || 0), 0
        );
        const completedVideos = course.courseVideos.filter(cv =>
          cv.video.watchLogs?.[0]?.isCompleted
        ).length;

        const videosWithQuizzes = course.courseVideos.filter(cv => cv.video.quiz);
        const totalQuizzes = videosWithQuizzes.length;
        const completedQuizzes = videosWithQuizzes.filter(cv =>
          cv.video.quiz.attempts && cv.video.quiz.attempts.length > 0
        ).length;

        const progress = totalDuration > 0 ? Math.round((totalWatchTime / totalDuration) * 100) : 0;
        const videoCompletionPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
        const quizCompletionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;
        const overallProgress = totalQuizzes > 0
          ? Math.round((videoCompletionPercentage * 0.7) + (quizCompletionPercentage * 0.3))
          : progress;

        // Course is "started" if there's any progress
        if (overallProgress > 0) {
          startedCourses++;

          // Course is "completed" if >= 95% and all videos/quizzes done
          if (overallProgress >= 95 && completedVideos === totalVideos && completedQuizzes === totalQuizzes) {
            completedCourses++;
          }
        }
      });

      return { startedCourses, completedCourses };
    } catch (error) {
      console.error("Error getting course counts:", error);
      return { startedCourses: 0, completedCourses: 0 };
    }
  }

async calculateStreak(userId) {
    try {
      const logs = await prisma.watchLog.findMany({
        where: { userId },
        select: { updatedAt: true, totalWatchTime: true, isCompleted: true },
        orderBy: { updatedAt: "desc" },
      });

      const activityDaySet = new Set(
        logs.map((log) => log.updatedAt.toISOString().split("T")[0])
      );
      
      let currentStreak = 0;
      let longestStreak = 0, tempStreak = 1;
      const today = new Date();
      let checkDate = new Date(today);
      while (activityDaySet.has(checkDate.toISOString().split("T")[0])) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
      const activityDays = Array.from(activityDaySet).sort().reverse(); 
      for (let i = 0; i < activityDays.length - 1; i++) {
        const date1 = new Date(activityDays[i]);
        const date2 = new Date(activityDays[i + 1]);
        if (date1.getTime() - date2.getTime() === 24 * 60 * 60 * 1000) tempStreak++;
        else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);

      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0); 
      
      const weeklyLogs = logs.filter(log => log.updatedAt >= sevenDaysAgo); 

      const lessonsCompletedThisWeek = weeklyLogs.filter(log => log.isCompleted).length;
      const studyTimeInSeconds = weeklyLogs.reduce((sum, log) => sum + log.totalWatchTime, 0);

      const studyTimeInHours = studyTimeInSeconds / 3600;
      const studyTimeThisWeek = Math.round((studyTimeInSeconds / 60) * 10) / 10;

      return {
        current: currentStreak,
        longest: longestStreak,
        lessonsCompletedThisWeek,
        studyTimeThisWeek,
      };
      
    } catch (error) {
      console.error("Error calculating streak and weekly stats:", error);
      return { current: 0, longest: 0, lessonsCompletedThisWeek: 0, studyTimeThisWeek: 0 };
    }
  }
  async getNextLesson(userId) {
    try {
      // Find the first in-progress course
      const courseProgress = await prisma.course.findFirst({
        where: {
          assignments: { some: { userId } },
        },
        include: {
          courseVideos: {
            where: {
              video: {
                watchLogs: {
                  none: { userId, isCompleted: true }
                }
              }
            },
            orderBy: { order: 'asc' },
            select: { course: { select: { title: true, id: true } } }
          }
        }
      });

      if (courseProgress && courseProgress.courseVideos.length > 0) {
        return {
          courseTitle: courseProgress.courseVideos[0].course.title,
          id: courseProgress.courseVideos[0].course.id
        };
      }
      return null;
    } catch (error) {
      console.error("Error getting next lesson:", error);
      return null;
    }
  }
}

module.exports = new CoreAnalyticsService();
