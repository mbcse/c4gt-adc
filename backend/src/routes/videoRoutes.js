const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const requireRole = require('../middlewares/requireRole');
const videoController = require('../controllers/videoController');
const {
  progressUpdateLimiter,
  videoFetchLimiter,
  validateProgressData,
  videoSecurityHeaders
} = require('../middlewares/videoSecurity');

router.use(videoSecurityHeaders);

router.use(requireAuth);

// Get all videos for a course
router.get('/courses/:courseId',
  videoFetchLimiter,
  requireRole(['STUDENT']),
  videoController.getCourseVideos
);

// Get specific video details
router.get('/:videoId',
  videoFetchLimiter,
  requireRole(['STUDENT']),
  videoController.getVideo
);

// Update video progress
router.post('/:videoId/progress',
  progressUpdateLimiter,
  requireRole(['STUDENT']),
  validateProgressData,
  videoController.updateProgress
);

// Get course progress summary
router.get('/courses/:courseId/progress',
  videoFetchLimiter,
  requireRole(['STUDENT']),
  videoController.getCourseProgress
);


module.exports = router;
