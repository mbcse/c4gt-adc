const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middlewares/requireAuth');

router.use(authMiddleware);

// Get all quizzes with filters
router.get('/', quizController.getAllQuizzes);

// Get quiz by video ID (checks if video is completed)
router.get('/video/:videoId', quizController.getQuizByVideoId);

// Get quiz attempts for current user
router.get('/attempts', quizController.getQuizAttempts);

// Create quiz attempt
router.post('/attempts', quizController.createQuizAttempt);

// Get specific quiz
router.get('/:id', quizController.getQuiz);

module.exports = router;
