const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// GET /profile - user profile with recent activity data
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        organizationUnitId: true,
        organizationUnit: {
          select: {
            id: true,
            name: true,
            type: true,
            parentId: true
          }
        },
        gradeId: true,
        grade: {
          select: { id: true, value: true }
        },
        assignments: {
          select: { courseId: true },
        },
        quizAttempts: {
          select: { score: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCoursesCount = user.assignments.length;

    // Compute average quiz score
    const avgQuizScore =
      user.quizAttempts.length > 0
        ? Math.round(
          user.quizAttempts.reduce((sum, q) => sum + q.score, 0) /
          user.quizAttempts.length
        )
        : null;

    // Fetch recent activity (limit to last 5):

    // 1. Completed assignments (courses completed)
    const recentEnrollments = await prisma.courseAssignment.findMany({
      where: { userId },
      orderBy: { assignedAt: "desc" },
      take: 3,
      include: {
        course: { select: { title: true } },
      },
    });

    // 2. Recent quiz attempts
    const recentQuizzes = await prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 3,
      include: {
        quiz: {
          select: {
            video: {
              select: { courseVideos: { select: { course: { select: { title: true } } } } },
            },
          },
        },
      },
    });

    // 3. Recent watch logs sessions (study sessions)
    const recentWatchLogs = await prisma.watchLog.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
      include: {
        video: {
          select: {
            title: true,
            courseVideos: {
              select: {
                course: {
                  select: { title: true },
                },
              },
            },
          },
        },
      },
    });

    const recentActivity = [];

    // Map enrollments to recentActivity
    recentEnrollments.forEach((enroll) => {
      recentActivity.push({
        type: "enrollment",
        title: `Enrolled in ${enroll.course.title}`,
        description: `Enrolled on ${enroll.assignedAt.toDateString()}`,
        date: enroll.assignedAt.toDateString(),
        icon: "UserPlus",
        color: "text-blue-600",
      });
    });

    // Map quiz attempts
    recentQuizzes.forEach((quiz) => {
      // Try to get course title from quiz video courseVideos (may be empty)
      const courseTitle =
        quiz.quiz.video.courseVideos.length > 0
          ? quiz.quiz.video.courseVideos[0].course.title
          : "a course";
      recentActivity.push({
        type: "quiz",
        title: `Quiz taken in ${courseTitle}`,
        description: `Score: ${quiz.score}%`,
        date: quiz.completedAt.toDateString(),
        icon: "Trophy",
        color: "text-yellow-600",
      });
    });

    // Map watch logs to study sessions
    recentWatchLogs.forEach((log) => {
      const courseTitle =
        log.video.courseVideos.length > 0
          ? log.video.courseVideos[0].course.title
          : "a course";
      const watchHours = (log.totalWatchTime / 3600).toFixed(1);
      recentActivity.push({
        type: "study_session",
        title: `Studied ${log.video.title}`,
        description: `${watchHours} hours in ${courseTitle}`,
        date: log.updatedAt.toDateString(),
        icon: "Clock",
        color: "text-purple-600",
      });
    });

    // Sort recentActivity by date descending and limit to 5 results
    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentActivitySlice = recentActivity.slice(0, 5);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        organizationUnitId: user.organizationUnitId,
        organizationUnit: user.organizationUnit,
        gradeId: user.gradeId,
        grade: user.grade,
        enrolledCourses: enrolledCoursesCount,
        avgQuizScore,
      },
      recentActivity: recentActivitySlice,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile and recent activity" });
  }
});

module.exports = router;
