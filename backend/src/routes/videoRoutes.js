// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const requireRole = require('../middlewares/requireRole');
const videoController = require('../controllers/videoController');
const {
  progressUpdateLimiter,
  validateSession,
  validateProgressData,
  videoSecurityHeaders
} = require('../middlewares/videoSecurity');

router.use(videoSecurityHeaders);
router.use(requireAuth);

// Get all videos for a course
router.get('/courses/:courseId',
  requireRole(['STUDENT']),
  videoController.getCourseVideos
);

// Get specific video details
router.get('/:videoId',
  requireRole(['STUDENT']),
  videoController.getVideo
);

// Update video progress with enhanced security
router.post('/:videoId/progress',
  progressUpdateLimiter,
  requireRole(['STUDENT']),
  validateSession,
  validateProgressData,
  videoController.updateProgress
);

// Get course progress summary
router.get('/courses/:courseId/progress',
  requireRole(['STUDENT']),
  videoController.getCourseProgress
);

module.exports = router;
