const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const analyticsService = require('../services/analyticsService');
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const eventLoggerService = require('../services/eventLoggerService');

router.use(requireAuth);

// Get student summary analytics
router.get('/student/summary', async (req, res) => {
  try {
    const userId = req.user.userId;
    const summary = await analyticsService.getStudentSummary(userId);
    res.json({ success: true, data: summary });
  } catch (error) {
    console.error('Error getting student summary:', error);
    res.status(500).json({ error: 'Failed to get student summary' });
  }
});

// Get activity trends
router.get('/student/activity-trends', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { timeframe = 'weekly' } = req.query;
    const trends = await analyticsService.getActivityTrends(userId, timeframe);
    res.json({ success: true, data: trends });
  } catch (error) {
    console.error('Error getting activity trends:', error);
    res.status(500).json({ error: 'Failed to get activity trends' });
  }
});

// Get course-wise progress
router.get('/student/course-progress', async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await analyticsService.getCourseWiseProgress(userId);
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error('Error getting course progress:', error);
    res.status(500).json({ error: 'Failed to get course progress' });
  }
});

// Get quiz analytics
router.get('/student/quiz-analytics', async (req, res) => {
  try {
    const userId = req.user.userId;
    const analytics = await analyticsService.getQuizAnalytics(userId);
    res.json({ success: true, data: analytics });
  } catch (error) {
    console.error('Error getting quiz analytics:', error);
    res.status(500).json({ error: 'Failed to get quiz analytics' });
  }
});

// Event logging endpoint
router.post('/event', async (req, res) => {
  try {
    const { eventType, videoId, ...data } = req.body;
    const userId = req.user.userId;
    const userAgent = req.headers['user-agent'];

    if (!videoId || !eventType) {
      return res.status(400).json({ error: "videoId and eventType are required." });
    }
    
    await eventLoggerService.logEvent(userId, videoId, eventType, data, userAgent);
    
    res.status(204).send();
  } catch (err) {
    console.error("Error logging analytics event", err);
    res.status(500).json({ error: 'Failed to log analytics event' });
  }
});

router.get('/student/course-completion', async (req, res) => {
  try {
    const userId = req.user.userId;
    const stats = await analyticsService.getCourseCompletionStats(userId);
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error getting course completion stats:', error);
    res.status(500).json({ error: 'Failed to get course completion stats' });
  }
});

// Get activity calendar
router.get('/student/activity-calendar', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { year } = req.query;
    const calendar = await analyticsService.getActivityCalendar(userId, year ? parseInt(year) : undefined);
    res.json({ success: true, data: calendar });
  } catch (error) {
    console.error('Error getting activity calendar:', error);
    res.status(500).json({ error: 'Failed to get activity calendar' });
  }
});

// Get study time patterns
router.get('/student/study-time-patterns', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { timeframe = 'weekly' } = req.query;
    const patterns = await analyticsService.getStudyTimePatterns(userId, timeframe);
    res.json({ success: true, data: patterns });
  } catch (error) {
    console.error('Error getting study time patterns:', error);
    res.status(500).json({ error: 'Failed to get study time patterns' });
  }
});

// Get lesson completion patterns
router.get('/student/lesson-completion-patterns', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { timeframe = 'weekly' } = req.query;
    const patterns = await analyticsService.getLessonCompletionPatterns(userId, timeframe);
    res.json({ success: true, data: patterns });
  } catch (error) {
    console.error('Error getting lesson completion patterns:', error);
    res.status(500).json({ error: 'Failed to get lesson completion patterns' });
  }
});

// Get available courses
router.get('/student/available-courses', async (req, res) => {
  try {
    const userId = req.user.userId;
    const courses = await analyticsService.getAvailableCourses(userId);
    res.json({ success: true, data: courses });
  } catch (error) {
    console.error('Error getting available courses:', error);
    res.status(500).json({ error: 'Failed to get available courses' });
  }
});

// Get video progress for specific course
router.get('/student/course-video-progress/:courseId', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;
    const progress = await analyticsService.getCourseVideoProgress(userId, courseId);
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error('Error getting course video progress:', error);
    res.status(500).json({ error: 'Failed to get course video progress' });
  }
});

// Get quiz analytics for specific course (or all courses if no courseId provided)
router.get('/student/course-quiz-analytics', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.query;
    const analytics = await analyticsService.getCourseSpecificQuizAnalytics(userId, courseId);
    res.json({ success: true, data: analytics });
  } catch (error) {
    console.error('Error getting course quiz analytics:', error);
    res.status(500).json({ error: 'Failed to get course quiz analytics' });
  }
});

// Get detailed quiz performance, optionally filtered by course
router.get('/student/detailed-quiz-performance', async (req, res) => {
  try {

    const userId = req.user.userId;
    const { courseId } = req.query; 

    const analytics = await analyticsService.getDetailedQuizPerformance(userId, courseId);
    res.json({ success: true, data: analytics });
  } catch (error) {
    console.error('Error getting detailed quiz performance:', error);
    res.status(500).json({ error: 'Failed to get detailed quiz performance' });
  }
});


// Get peak study hours
router.get('/student/peak-study-hours', async (req, res) => {
  try {
    const userId = req.user.userId;
    const peakHours = await analyticsService.getPeakStudyHours(userId);
    res.json({ success: true, data: peakHours });
  } catch (error) {
    console.error('Error getting peak study hours:', error);
    res.status(500).json({ error: 'Failed to get peak study hours' });
  }
});

module.exports = router;
