// controllers/userController.js
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Fetch user basic info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        quizAttempts: true,
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const coursesStarted = await prisma.watchLog.groupBy({
      by: ["videoId"],
      where: { userId },
    });
    
    // Get distinct courseIds from related videos
    const videoIds = coursesStarted.map(wl => wl.videoId);

    // Find distinct courses from these videos
    const startedCourses = await prisma.courseVideo.findMany({
      where: {
        videoId: { in: videoIds }
      },
      select: {
        courseId: true
      },
      distinct: ['courseId']
    });

    const coursesStartedCount = startedCourses.length;

    // Calculate average quiz score
    const quizScores = await prisma.quizAttempt.findMany({
      where: { userId },
      select: { score: true }
    });
    const avgScore = quizScores.length > 0
      ? quizScores.reduce((a, b) => a + b.score, 0) / quizScores.length
      : null;

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        enrolledCourses: coursesStartedCount, 
        avgQuizScore: avgScore
      }
    });
  } catch (err) {
    console.error("Failed to get profile", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { name, email } = req.body;

    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== userId) {
        return res.status(400).json({ error: "Email is already taken" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email }
    });

    return res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } catch (err) {
    console.error("Failed to update profile", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
