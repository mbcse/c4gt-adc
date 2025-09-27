const CoreAnalyticsService = require('./CoreAnalyticsService');
const CourseAnalyticsService = require('./CourseAnalyticsService');
const ActivityAnalyticsService = require('./ActivityAnalyticsService');
const QuizAnalyticsService = require('./QuizAnalyticsService');

class AnalyticsService {
  // Core methods
  async getStudentSummary(userId) {
    return CoreAnalyticsService.getStudentSummary(userId);
  }

  // Activity methods
  async getActivityTrends(userId, timeframe = "weekly") {
    return ActivityAnalyticsService.getActivityTrends(userId, timeframe);
  }

  async getActivityCalendar(userId, year) {
    return ActivityAnalyticsService.getActivityCalendar(userId, year);
  }

  async getStudyTimePatterns(userId, timeframe = "weekly") {
    return ActivityAnalyticsService.getStudyTimePatterns(userId, timeframe);
  }

  async getLessonCompletionPatterns(userId, timeframe = "weekly") {
    return ActivityAnalyticsService.getLessonCompletionPatterns(userId, timeframe);
  }

  // Course methods
  async getCourseWiseProgress(userId) {
    return CourseAnalyticsService.getCourseWiseProgress(userId);
  }

  async getCourseCompletionStats(userId) {
    return CourseAnalyticsService.getCourseCompletionStats(userId);
  }

  // Quiz methods
  async getQuizAnalytics(userId) {
    return QuizAnalyticsService.getQuizAnalytics(userId);
  }

  async getDetailedQuizPerformance(userId, courseId = null) {
    return QuizAnalyticsService.getDetailedQuizPerformance(userId, courseId);
  }
  async getAvailableCourses(userId) {
    return CourseAnalyticsService.getAvailableCourses(userId);
  }

  async getCourseVideoProgress(userId, courseId) {
    return CourseAnalyticsService.getCourseVideoProgress(userId, courseId);
  }

  async getCourseSpecificQuizAnalytics(userId, courseId = null) {
    return CourseAnalyticsService.getCourseSpecificQuizAnalytics(userId, courseId);
  }

  async getPeakStudyHours(userId) {
    return ActivityAnalyticsService.getPeakStudyHours(userId);
  }
}

module.exports = new AnalyticsService();
