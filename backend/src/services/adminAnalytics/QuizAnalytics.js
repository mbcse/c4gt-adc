const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();

const { buildUserFilter, buildDateFilter } = require('../../utils/filterUtils');
const {
  aggregateQuizScoresByGrade,
  aggregateQuizScoresBySchool,
  aggregateQuizScoresByDistrict,
  aggregateQuizScoresByCourse,
  aggregateQuizScoresByVideo,
  calculateOverallQuizScores
} = require('../../utils/aggregationUtils');

class QuizService {

  async getAverageQuizScores(filters = {}) {
    try {
      const userFilter = buildUserFilter(filters);
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
              school: { include: { district: true } }
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
        byDistrict: aggregateQuizScoresByDistrict(quizAttempts),
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
