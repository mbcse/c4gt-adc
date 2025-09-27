const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

/**
 * Get all quizzes with optional filters
 */
exports.getAllQuizzes = async (req, res) => {
  try {
    const userId = req.user?.userId;
    let { page = 1, limit = 10, videoId, courseId } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const where = {};
    if (videoId) where.videoId = parseInt(videoId);
    if (courseId) {
      // Get videos from course
      const courseVideos = await prisma.courseVideo.findMany({
        where: { courseId: parseInt(courseId) },
        select: { videoId: true }
      });
      where.videoId = { in: courseVideos.map(cv => cv.videoId) };
    }

    const totalQuizzes = await prisma.quiz.count({ where });

    const quizzes = await prisma.quiz.findMany({
      where,
      include: {
        video: {
          select: {
            id: true,
            title: true,
            duration: true,
            // Include user's watch progress if logged in
            watchLogs: userId ? {
              where: { userId },
              select: {
                isCompleted: true,
                watchedPercentage: true,
                totalWatchTime: true
              }
            } : false
          }
        },
        attempts: userId ? {
          where: { userId },
          orderBy: { completedAt: 'desc' },
          select: {
            id: true,
            score: true,
            completedAt: true
          }
        } : false
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    // Add unlocked status and attempt info
    const quizzesWithStatus = quizzes.map(quiz => {
      const isUnlocked = quiz.video.watchLogs?.[0]?.isCompleted || false;
      const attempts = quiz.attempts || [];
      const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
      
      return {
        ...quiz,
        isUnlocked,
        attemptCount: attempts.length,
        bestScore,
        lastAttempt: attempts || null
      };
    });

    res.json({
      total: totalQuizzes,
      page,
      totalPages: Math.ceil(totalQuizzes / limit),
      data: quizzesWithStatus
    });
  } catch (error) {
    console.error("Failed to get quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get quiz by video ID (only if video is completed)
 */
exports.getQuizByVideoId = async (req, res) => {
  try {
    const videoId = parseInt(req.params.videoId);
    const userId = req.user?.userId;

    if (isNaN(videoId)) {
      return res.status(400).json({ error: "Invalid video ID" });
    }

    // Check if user has completed the video
    if (userId) {
      const watchLog = await prisma.watchLog.findUnique({
        where: { userId_videoId: { userId, videoId } }
      });

      const isCompleted = watchLog?.isCompleted || false;
      const isUnlocked = isCompleted;

      // console.log(`Quiz fetch - Video ID: ${videoId}, User ID: ${userId}, isCompleted: ${isCompleted}`);

      if (!isUnlocked) {
        return res.status(403).json({ 
          error: "Quiz is locked",
          message: "Complete the video first to unlock the quiz"
        });
      }
    }

    const quiz = await prisma.quiz.findUnique({
      where: { videoId },
      include: {
        video: {
          select: {
            id: true,
            title: true,
            duration: true
          }
        },
        attempts: userId ? {
          where: { userId },
          orderBy: { completedAt: 'desc' },
          select: {
            id: true,
            score: true,
            completedAt: true
          }
        } : false
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found for this video" });
    }

    // Add attempt info
    const attempts = quiz.attempts || [];
    const quizWithStatus = {
      ...quiz,
      attemptCount: attempts.length,
      bestScore: attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0,
      lastAttempt: attempts.length > 0 ? attempts[0] : null
    };

    return res.json(quizWithStatus);

  } catch (error) {
    console.error("Failed to get quiz by video ID:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
  }
};


/**
 * Get quiz by ID
 */
exports.getQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const userId = req.user?.userId;

    if (isNaN(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        video: {
          select: {
            id: true,
            title: true,
            duration: true,
            watchLogs: userId ? {
              where: { userId },
              select: {
                isCompleted: true,
                watchedPercentage: true
              }
            } : false
          }
        },
        attempts: userId ? {
          where: { userId },
          orderBy: { completedAt: 'desc' }
        } : false
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Check if quiz is unlocked
    const isUnlocked = userId ? quiz.video.watchLogs?.[0]?.isCompleted || false : true;
    
    if (userId && !isUnlocked) {
      return res.status(403).json({ 
        error: "Quiz is locked",
        message: "Complete the video first to unlock the quiz"
      });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Failed to get quiz:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Create quiz attempt
 */
exports.createQuizAttempt = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { quizId, answers, score } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!quizId || !answers || score === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify quiz exists and is unlocked
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) },
      include: {
        video: {
          include: {
            watchLogs: {
              where: { userId },
              select: { isCompleted: true }
            }
          }
        }
      }
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (!quiz.video.watchLogs?.[0]?.isCompleted) {
      return res.status(403).json({ 
        error: "Quiz is locked",
        message: "Complete the video first to unlock the quiz"
      });
    }

    // Create the attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId: parseInt(quizId),
        score: parseFloat(score),
        completedAt: new Date(),
        answers: answers
      },
      include: {
        quiz: {
          include: {
            video: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });

    res.status(201).json(attempt);
  } catch (error) {
    console.error("Failed to create quiz attempt:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get quiz attempts for a user
 */
exports.getQuizAttempts = async (req, res) => {
  try {
    const userId = req.user?.userId;
    let { page = 1, limit = 10, quizId } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const where = { userId };
    if (quizId) where.quizId = parseInt(quizId);

    const totalAttempts = await prisma.quizAttempt.count({ where });

    const attempts = await prisma.quizAttempt.findMany({
      where,
      include: {
        quiz: {
          include: {
            video: {
              select: {
                id: true,
                title: true,
                duration: true
              }
            }
          }
        }
      },
      orderBy: { completedAt: 'desc' },
      skip,
      take: limit
    });

    res.json({
      total: totalAttempts,
      page,
      totalPages: Math.ceil(totalAttempts / limit),
      data: attempts
    });
  } catch (error) {
    console.error("Failed to get quiz attempts:", error);
    res.status(500).json({ error: "Server error" });
  }
};
