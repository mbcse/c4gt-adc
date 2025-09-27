const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

class CourseAnalyticsService {
  // Get all courses that user can access (assigned + started)
  async getAvailableCourses(userId) {
    try {
      // Get assigned courses
      const assignedCourses = await prisma.courseAssignment.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
            }
          }
        }
      });

      // Get courses with any watch logs (started courses)
      const startedCourseIds = await prisma.watchLog.findMany({
        where: { userId },
        include: {
          video: {
            include: {
              courseVideos: {
                select: {
                  courseId: true,
                  course: {
                    select: {
                      id: true,
                      title: true,
                    }
                  }
                }
              }
            }
          }
        }
      });

      // Extract unique course info from started courses
      const startedCoursesMap = new Map();
      startedCourseIds.forEach(log => {
        log.video.courseVideos.forEach(cv => {
          if (cv.courseId && cv.course) {
            startedCoursesMap.set(cv.courseId, {
              id: cv.courseId,
              title: cv.course.title
            });
          }
        });
      });

      // Combine assigned and started courses, removing duplicates
      const allCoursesMap = new Map();

      // Add assigned courses
      assignedCourses.forEach(assignment => {
        allCoursesMap.set(assignment.course.id, {
          id: assignment.course.id,
          title: assignment.course.title
        });
      });

      // Add started courses
      startedCoursesMap.forEach((course, id) => {
        allCoursesMap.set(id, course);
      });

      return Array.from(allCoursesMap.values()).sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      console.error("Error getting available courses:", error);
      throw error;
    }
  }

  // Get video-level progress for a specific course
  async getCourseVideoProgress(userId, courseId) {
    try {
      const courseVideos = await prisma.courseVideo.findMany({
        where: { courseId: parseInt(courseId) },
        include: {
          video: {
            include: {
              watchLogs: { where: { userId } },
              quiz: { include: { attempts: { where: { userId } } } },
            },
          },
        },
        orderBy: { order: "asc" },
      });

      // Get course info
      const course = await prisma.course.findUnique({
        where: { id: parseInt(courseId) },
        select: { id: true, title: true }
      });

      const videoProgress = courseVideos.map((cv) => {
        const watchLog = cv.video.watchLogs[0];
        const hasQuiz = !!cv.video.quiz;
        const quizAttempts = cv.video.quiz?.attempts || [];
        const hasQuizAttempts = quizAttempts.length > 0;

        // Determine video status
        let status = 'not-started';
        if (watchLog?.isCompleted && (!hasQuiz || hasQuizAttempts)) {
          status = 'completed';
        } else if (watchLog && (watchLog.totalWatchTime > 0 || hasQuizAttempts)) {
          status = 'in-progress';
        }

        return {
          videoId: cv.video.id,
          title: cv.video.title,
          order: cv.order,
          duration: cv.video.duration,
          watchedPercentage: watchLog?.watchedPercentage || 0,
          totalWatchTime: watchLog?.totalWatchTime || 0,
          isCompleted: watchLog?.isCompleted || false,
          hasQuiz,
          quizScore: hasQuizAttempts ? Math.max(...quizAttempts.map(a => a.score)) : null,
          status
        };
      });

      // Calculate overall course stats
      const totalVideos = videoProgress.length;
      const completedVideos = videoProgress.filter(v => v.status === 'completed').length;
      const inProgressVideos = videoProgress.filter(v => v.status === 'in-progress').length;
      const notStartedVideos = videoProgress.filter(v => v.status === 'not-started').length;

      return {
        course,
        totalVideos,
        completedVideos,
        inProgressVideos,
        notStartedVideos,
        videos: videoProgress
      };
    } catch (error) {
      console.error("Error getting course video progress:", error);
      throw error;
    }
  }

  async getCourseWiseProgress(userId) {
    try {
      const assignments = await prisma.courseAssignment.findMany({
        where: { userId },
        include: {
          course: {
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
                orderBy: { order: "asc" },
              },
            },
          },
        },
      });

      return assignments.map((assignment) => {
        const course = assignment.course;

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

        const avgQuizScore = totalQuizzes > 0
          ? course.courseVideos.reduce((sum, cv) => {
            if (cv.video.quiz?.attempts?.length > 0) {
              return sum + Math.max(...cv.video.quiz.attempts.map((a) => a.score));
            }
            return sum;
          }, 0) / totalQuizzes
          : 0;

        let status = 'not-started';
        if (overallProgress >= 95 && completedVideos === totalVideos && completedQuizzes === totalQuizzes) {
          status = 'completed';
        } else if (overallProgress > 0) {
          status = 'in-progress';
        }

        return {
          courseId: course.id,
          title: course.title,
          totalVideos,
          completedVideos,
          totalQuizzes,
          completedQuizzes,
          totalWatchTime: Math.round((totalWatchTime / 3600) * 10) / 10,
          overallProgress,
          avgQuizScore: Math.round(avgQuizScore * 10) / 10,
          status,
        };
      });
    } catch (error) {
      console.error("Error getting course-wise progress:", error);
      throw error;
    }
  }

  async getCourseCompletionStats(userId) {
    try {
      const assignments = await prisma.courseAssignment.findMany({
        where: { userId },
        include: {
          course: {
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
          },
        },
      });

      return assignments.map((assignment) => {
        const course = assignment.course;

        const totalVideos = course.courseVideos.length;
        const completedVideos = course.courseVideos.filter(cv =>
          cv.video.watchLogs?.[0]?.isCompleted
        ).length;

        const videosWithQuizzes = course.courseVideos.filter(cv => cv.video.quiz);
        const totalQuizzes = videosWithQuizzes.length;
        const completedQuizzes = videosWithQuizzes.filter(cv =>
          cv.video.quiz.attempts && cv.video.quiz.attempts.length > 0
        ).length;

        const videoCompletionPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
        const quizCompletionPercentage = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 100;

        return {
          courseId: course.id,
          title: course.title,
          videoCompletionPercentage,
          quizCompletionPercentage,
          completedVideos,
          totalVideos,
          completedQuizzes,
          totalQuizzes,
        };
      });
    } catch (error) {
      console.error("Error getting course completion stats:", error);
      throw error;
    }
  }

  async getCourseSpecificQuizAnalytics(userId, courseId = null) {
    try {
      let whereClause = { userId };
      if (courseId) {
        const courseVideos = await prisma.courseVideo.findMany({
          where: { courseId: parseInt(courseId) },
          select: { videoId: true }
        });

        const videoIds = courseVideos.map(cv => cv.videoId);

        whereClause = {
          userId,
          quiz: {
            videoId: { in: videoIds }
          }
        };
      }

      const attempts = await prisma.quizAttempt.findMany({
        where: whereClause,
        include: {
          quiz: {
            include: {
              video: {
                select: {
                  title: true,
                  courseVideos: { include: { course: { select: { title: true } } } },
                },
              },
            },
          },
        },
        orderBy: { completedAt: "desc" },
      });

      const totalAttempts = attempts.length;
      const uniqueQuizzes = new Set(attempts.map((a) => a.quizId)).size;
      const averageScore = totalAttempts > 0 ? attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts : 0;
      const perfectScores = attempts.filter((a) => a.score >= 95).length;

      const scoreRanges = {
        "90-100": attempts.filter((a) => a.score >= 90).length,
        "80-89": attempts.filter((a) => a.score >= 80 && a.score < 90).length,
        "70-79": attempts.filter((a) => a.score >= 70 && a.score < 80).length,
        "60-69": attempts.filter((a) => a.score >= 60 && a.score < 70).length,
        "Below 60": attempts.filter((a) => a.score < 60).length,
      };

      const recentAttempts = attempts.slice(0, 10).reverse();
      const performanceTrend = recentAttempts.map((attempt) => ({
        date: attempt.completedAt.toISOString().split("T")[0],
        score: attempt.score,
        quizTitle: attempt.quiz.video.title,
        courseTitle: attempt.quiz.video.courseVideos?.[0]?.course?.title || "Unknown",
      }));

      return {
        totalAttempts,
        uniqueQuizzes,
        averageScore: Math.round(averageScore * 10) / 10,
        perfectScores,
        scoreDistribution: scoreRanges,
        performanceTrend,
        improvementRate: this.calculateImprovementRate(attempts),
      };
    } catch (error) {
      console.error("Error getting course-specific quiz analytics:", error);
      throw error;
    }
  }

  calculateImprovementRate(attempts) {
    if (attempts.length < 2) return 0;

    const recent = attempts.slice(0, Math.min(5, attempts.length));
    const older = attempts.slice(Math.min(5, attempts.length), Math.min(10, attempts.length));
    if (older.length === 0) return 0;

    const recentAvg = recent.reduce((sum, a) => sum + a.score, 0) / recent.length;
    const olderAvg = older.reduce((sum, a) => sum + a.score, 0) / older.length;

    return Math.round(((recentAvg - olderAvg) / olderAvg) * 100 * 10) / 10;
  }
}

module.exports = new CourseAnalyticsService();
