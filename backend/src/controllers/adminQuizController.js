const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

exports.listQuizzes = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const skip = (page - 1) * limit;

    // Filters
    const where = {};
    if (req.query.videoId) where.videoId = Number(req.query.videoId);
    if (req.query.courseId) {
      where.video = {
        courseVideos: {
          some: { courseId: Number(req.query.courseId) }
        }
      };
    }

    const total = await prisma.quiz.count({ where });

    const quizzes = await prisma.quiz.findMany({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        video: {
          include: {
            courseVideos: { include: { course: true } }
          }
        },
        attempts: {
          select: {
            id: true,
            score: true,
            completedAt: true,
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({ total, page, totalPages, data: quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    if (isNaN(quizId)) return res.status(400).json({ message: 'Invalid quiz id' });

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        video: {
          include: {
            courseVideos: { include: { course: true } }
          }
        },
        attempts: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          },
          orderBy: { completedAt: 'desc' }
        }
      }
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { videoId, questions, generatedBy } = req.body;

    if (!videoId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Video ID and questions array are required' });
    }

    // Validate questions structure
    const isValidQuestions = questions.every(q =>
      q.question &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correctAnswer === 'number' &&
      q.correctAnswer >= 0 && q.correctAnswer < 4
    );
    if (!isValidQuestions) {
      return res.status(400).json({ message: 'Invalid questions format.' });
    }

    // Check if video exists
    const video = await prisma.video.findUnique({
      where: { id: Number(videoId) }
    });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check for existing quiz
    const existingQuiz = await prisma.quiz.findUnique({
      where: { videoId: Number(videoId) }
    });
    if (existingQuiz) {
      return res.status(409).json({ message: 'Quiz already exists for this video' });
    }

    const quiz = await prisma.quiz.create({
      data: {
        videoId: Number(videoId),
        questions: questions,
        generatedBy: generatedBy || 'ADMIN',
        createdAt: new Date()
      },
      include: {
        video: { include: { courseVideos: { include: { course: true } } } }
      }
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    if (isNaN(quizId)) return res.status(400).json({ message: 'Invalid quiz id' });

    const { questions, generatedBy } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Questions array is required' });
    }

    const isValidQuestions = questions.every(q =>
      q.question &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correctAnswer === 'number' &&
      q.correctAnswer >= 0 && q.correctAnswer < 4
    );
    if (!isValidQuestions) {
      return res.status(400).json({ message: 'Invalid questions format.' });
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        questions: questions,
        generatedBy: generatedBy || 'ADMIN'
      },
      include: {
        video: { include: { courseVideos: { include: { course: true } } } }
      }
    });

    res.json(updatedQuiz);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Failed to update quiz' });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    if (isNaN(quizId)) return res.status(400).json({ message: 'Invalid quiz id' });

    await prisma.quiz.delete({ where: { id: quizId } });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Failed to delete quiz' });
  }
};

exports.getQuizByVideoId = async (req, res) => {
  try {
    const videoId = parseInt(req.params.videoId);
    if (isNaN(videoId)) return res.status(400).json({ message: 'Invalid video id' });

    const quiz = await prisma.quiz.findUnique({
      where: { videoId: videoId },
      include: {
        video: { include: { courseVideos: { include: { course: true } } } }
      }
    });

    if (!quiz) {
      return res.status(404).json({ message: 'No quiz found for this video' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz by video ID:', error);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

exports.getQuizAttempts = async (req, res) => {
  try {
    const { quizId, userId } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const skip = (page - 1) * limit;

    const where = {};
    if (quizId) where.quizId = Number(quizId);
    if (userId) where.userId = Number(userId);

    const total = await prisma.quizAttempt.count({ where });

    const attempts = await prisma.quizAttempt.findMany({
      skip,
      take: limit,
      where,
      orderBy: { completedAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        quiz: { include: { video: { select: { id: true, title: true } } } }
      }
    });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({ total, page, totalPages, data: attempts });
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    res.status(500).json({ message: 'Failed to fetch quiz attempts' });
  }
};
