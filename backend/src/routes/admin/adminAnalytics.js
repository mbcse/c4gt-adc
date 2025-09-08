const express = require('express');
const {
  completionService,
  quizService,
  engagementService,
  consistencyService,
  studentService,
  filterOptionsService
} = require('../../services/adminAnalytics');

const router = express.Router();

// Get course completion rates with filtering
router.get('/course-completion-rates', async (req, res) => {
  try {
    const filters = {
      gradeId: req.query.gradeId,
      schoolId: req.query.schoolId,
      districtId: req.query.districtId,
      studentId: req.query.studentId,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const data = await completionService.getCourseCompletionRates(filters);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting course completion rates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get course completion rates'
    });
  }
});

// Get average quiz scores with filtering
router.get('/quiz-scores', async (req, res) => {
  try {
    const filters = {
      gradeId: req.query.gradeId,
      schoolId: req.query.schoolId,
      districtId: req.query.districtId,
      studentId: req.query.studentId,
      courseId: req.query.courseId,
      videoId: req.query.videoId,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const data = await quizService.getAverageQuizScores(filters);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting quiz scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get quiz scores'
    });
  }
});

// Get engagement metrics with filtering
router.get('/engagement', async (req, res) => {
  try {
    const filters = {
      gradeId: req.query.gradeId,
      schoolId: req.query.schoolId,
      districtId: req.query.districtId,
      studentId: req.query.studentId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      timeframe: req.query.timeframe || 'weekly'
    };

    const data = await engagementService.getEngagementMetrics(filters);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting engagement metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get engagement metrics'
    });
  }
});

// Get consistency rates with filtering
router.get('/consistency-rates', async (req, res) => {
  try {
    const filters = {
      gradeId: req.query.gradeId,
      schoolId: req.query.schoolId,
      districtId: req.query.districtId,
      studentId: req.query.studentId,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const data = await consistencyService.getConsistencyRates(filters);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting consistency rates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get consistency rates'
    });
  }
});

// Get individual student analytics
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const data = await studentService.getIndividualStudentAnalytics(studentId, filters);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting individual student analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get individual student analytics'
    });
  }
});

// Get filter options for the frontend
router.get('/filter-options', async (req, res) => {
  try {

    const data = await filterOptionsService.getFilterOptions();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting filter options:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get filter options'
    });
  }
});

// Get comprehensive dashboard data 
router.get('/dashboard', async (req, res) => {
  try {
    const filters = {
      gradeId: req.query.gradeId,
      schoolId: req.query.schoolId,
      districtId: req.query.districtId,
      studentId: req.query.studentId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      timeframe: req.query.timeframe || 'weekly'
    };

    // Get all analytics data in parallel using the individual services
    const [
      courseCompletionRates,
      quizScores,
      engagementMetrics,
      consistencyRates,
      filterOptions
    ] = await Promise.all([
      completionService.getCourseCompletionRates(filters),
      quizService.getAverageQuizScores(filters),
      engagementService.getEngagementMetrics(filters),
      consistencyService.getConsistencyRates(filters),
      filterOptionsService.getFilterOptions()
    ]);

    res.json({
      success: true,
      data: {
        courseCompletionRates,
        quizScores,
        engagementMetrics,
        consistencyRates,
        filterOptions
      }
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get dashboard data'
    });
  }
});

module.exports = router;
