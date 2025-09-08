/* Main entry point for admin analytics services */

const completionService = require('./CompletionAnalytics.js');
const consistencyService = require('./ConsistencyAnalytics.js');
const engagementService = require('./EngagementAnalytics.js');
const filterOptionsService = require('./FilterOptions.js');
const quizService = require('./QuizAnalytics.js');
const studentService = require('./StudentAnalytics.js');

module.exports = {
  completionService,
  consistencyService,
  engagementService,
  filterOptionsService,
  quizService,
  studentService,
};