const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/requireAuth');
const requireRole = require('../../middlewares/requireRole');
const adminStudentsController = require('../../controllers/adminStudentsController');

router.get('/', requireAuth, requireRole(['ADMIN', 'SUPERADMIN']), adminStudentsController.listStudents);
router.get('/:id', requireAuth, requireRole(['ADMIN', 'SUPERADMIN']), adminStudentsController.getStudentById);

module.exports = router;
