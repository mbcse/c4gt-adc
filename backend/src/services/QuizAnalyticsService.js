const { PrismaClient } = require("../../generated/prisma");
const { calculateQuizStats } = require("../utils/progressCalculations");
const prisma = new PrismaClient();

class QuizAnalyticsService {
  async getQuizAnalytics(userId) {
    try {
      const attempts = await prisma.quizAttempt.findMany({
        where: { userId },
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
      console.error("Error getting quiz analytics:", error);
      throw error;
    }
  }

  async getDetailedQuizPerformance(userId, courseId = null) {
    try {
      const whereClause = { userId };

      if (courseId) {
        whereClause.quiz = {
          video: {
            courseVideos: {
              some: {
                courseId: parseInt(courseId),
              },
            },
          },
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
        orderBy: { completedAt: 'asc' },
      });

      const quizStats = new Map();
      attempts.forEach((attempt) => {
        const quizId = attempt.quizId;
        if (!quizStats.has(quizId)) {
          quizStats.set(quizId, {
            quizId,
            title: attempt.quiz.video.title,
            courseTitle: attempt.quiz.video.courseVideos?.[0]?.course?.title || 'Unknown',
            attempts: [],
            scores: [],
          });
        }

        const stats = quizStats.get(quizId);
        stats.attempts.push({
          score: attempt.score,
          date: attempt.completedAt,
          attemptNumber: stats.attempts.length + 1,
        });
        stats.scores.push(attempt.score);
      });

      Array.from(quizStats.values()).forEach(quiz => {
        const quizCalcs = calculateQuizStats(quiz.attempts);
        quiz.latestScore = quizCalcs.latestScore;
        quiz.bestScore = quizCalcs.bestScore;
        quiz.averageScore = quizCalcs.averageScore;
        quiz.attemptCount = quizCalcs.totalAttempts;
      });

      return Array.from(quizStats.values());
    } catch (error) {
      console.error("Error getting detailed quiz performance:", error);
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

module.exports = new QuizAnalyticsService();
