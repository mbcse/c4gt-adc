const express = require('express');
const requireAuth = require('../../middlewares/requireAuth');
const requireRole = require('../../middlewares/requireRole');

const usersRoutes = require('./adminUsers');
const studentsRoutes = require('./adminStudents');
const coursesRoutes = require('./adminCourses');
const quizRoutes = require('./adminQuiz');
const adminMetadataRoutes = require('./adminMetadata');
const adminAnalyticsRoutes = require('./adminAnalytics'); 

const router = express.Router();

// Require authentication for all admin routes
router.use(requireAuth);

// ADMIN and SUPERADMIN user management routes
router.use('/users',requireRole(['ADMIN', 'SUPERADMIN']), usersRoutes);

// INSTRUCTOR, ADMIN and SUPERADMIN student management routes
router.use('/students', requireRole(['ADMIN', 'SUPERADMIN', 'INSTRUCTOR']), studentsRoutes);

// ADMIN and SUPERADMIN courses management routes
router.use('/courses', requireRole(['ADMIN', 'SUPERADMIN']), coursesRoutes);
router.use('/metadata', requireRole(['ADMIN', 'SUPERADMIN']), adminMetadataRoutes);

// INSTRUCTOR, ADMIN and SUPERADMIN progress tracking routes
router.use('/analytics', requireRole(['INSTRUCTOR', 'ADMIN', 'SUPERADMIN']), adminAnalyticsRoutes);

// ADMIN and SUPERADMIN quiz routes
router.use('/quizzes', requireRole(['ADMIN', 'SUPERADMIN']), quizRoutes);

module.exports = router;
