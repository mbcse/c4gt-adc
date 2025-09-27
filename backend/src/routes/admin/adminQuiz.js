const express = require('express');
const adminQuizController = require('../../controllers/adminQuizController');

const router = express.Router();

// Quiz CRUD operations
router.get('/', adminQuizController.listQuizzes);
router.get('/:id', adminQuizController.getQuiz);
router.post('/', adminQuizController.createQuiz);
router.put('/:id', adminQuizController.updateQuiz);
router.delete('/:id', adminQuizController.deleteQuiz);

// Get quiz by video ID
router.get('/video/:videoId', adminQuizController.getQuizByVideoId);

// Quiz attempts
router.get('/attempts', adminQuizController.getQuizAttempts);

module.exports = router;
