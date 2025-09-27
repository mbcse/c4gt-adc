const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const requireRole = require('../middlewares/requireRole');
const courseController = require('../controllers/courseController');

// Course list route
router.get(
  "/",
  requireAuth,
  requireRole(["STUDENT"]),
  courseController.getAllCourses
);

router.get(
  "/:courseId",
  requireAuth,
  requireRole(["STUDENT"]),
  courseController.getCourseDetails
);

module.exports = router;
