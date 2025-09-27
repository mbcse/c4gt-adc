const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();

const { buildUserFilter, buildDateFilter } = require('../../utils/filterUtils');
const {
  aggregateQuizScoresByGrade,
  aggregateQuizScoresBySchool,
  aggregateQuizScoresByBlock,
  aggregateQuizScoresByCourse,
  aggregateQuizScoresByVideo,
  calculateOverallQuizScores
} = require('../../utils/aggregationUtils');

class QuizService {

  async getAverageQuizScores(filters = {}, user) {
    try {
      const userFilter = await buildUserFilter(filters, user);
      const dateFilter = buildDateFilter(filters);

      let quizWhereClause = {
        user: userFilter
      };

      if (dateFilter) {
        quizWhereClause.completedAt = dateFilter;
      }

      if (filters.courseId) {
        quizWhereClause.quiz = {
          video: {
            courseVideos: {
              some: { courseId: parseInt(filters.courseId) }
            }
          }
        };
      }

      if (filters.videoId) {
        quizWhereClause.quiz = {
          videoId: parseInt(filters.videoId)
        };
      }

      const quizAttempts = await prisma.quizAttempt.findMany({
        where: quizWhereClause,
        include: {
          user: {
            include: {
              grade: true,
              organizationUnit: { include: { parent: true } }
            }
          },
          quiz: {
            include: {
              video: {
                include: {
                  courseVideos: {
                    include: { course: true }
                  }
                }
              }
            }
          }
        }
      });

      // Aggregate quiz scores by different dimensions
      return {
        byGrade: aggregateQuizScoresByGrade(quizAttempts),
        bySchool: aggregateQuizScoresBySchool(quizAttempts),
        byBlock: aggregateQuizScoresByBlock(quizAttempts),
        byCourse: aggregateQuizScoresByCourse(quizAttempts),
        byVideo: aggregateQuizScoresByVideo(quizAttempts),
        overall: calculateOverallQuizScores(quizAttempts)
      };
    } catch (error) {
      console.error("Error getting average quiz scores:", error);
      throw error;
    }
  }
}

module.exports = new QuizService();
