const express = require('express');
const requireAuth = require('../../middlewares/requireAuth');
const requireRole = require('../../middlewares/requireRole');

const usersRoutes = require('./adminUsers');
const studentsRoutes = require('./adminStudents');
const coursesRoutes = require('./adminCourses');
const quizRoutes = require('./adminQuiz');
const reportsRoutes = require('./adminReports');
const adminMetadataRoutes = require('./adminMetadata');
const adminAnalyticsRoutes = require('./adminAnalytics'); 

const router = express.Router();

// Require authentication for all admin routes
router.use(requireAuth);

// SUPERADMIN-only user management routes
router.use('/users',usersRoutes);

// ADMIN and SUPERADMIN student management routes
router.use('/students', requireRole(['ADMIN', 'SUPERADMIN']), studentsRoutes);

// ADMIN and SUPERADMIN courses management routes
router.use('/courses', requireRole(['ADMIN', 'SUPERADMIN']), coursesRoutes);
router.use('/metadata', requireRole(['ADMIN', 'SUPERADMIN']), adminMetadataRoutes);

// INSTRUCTOR, ADMIN and SUPERADMIN progress tracking routes
router.use('/analytics', requireRole(['INSTRUCTOR', 'ADMIN', 'SUPERADMIN']), adminAnalyticsRoutes);

// ADMIN and SUPERADMIN quiz routes
router.use('/quizzes', requireRole(['ADMIN', 'SUPERADMIN']), quizRoutes);

// ADMIN and SUPERADMIN reports routes
router.use('/reports', requireRole(['ADMIN', 'SUPERADMIN']), reportsRoutes);

module.exports = router;
