const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { getYouTubeThumbnail } = require("../utils/video");

/**
 * Get detailed information for a single course.
 */
exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        thumbnailUrl: true,
        category: true,
        createdBy: true,
        courseVideos: {
          include: {
            video: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.json({ course });
  } catch (error) {
    console.error("Failed to get course details:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get all courses mapped to include progress per user if applicable.
 * If the `req.user.userId` is available, includes watch progress data.
 */
exports.getAllCourses = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const courses = await prisma.course.findMany({where: {
        assignments: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        courseVideos: {
          include: {
            video: {
              include: {
                watchLogs: userId
                  ? {
                      where: { userId },
                      select: {
                        isCompleted: true,
                        watchedPercentage: true,
                        updatedAt: true,
                      },
                    }
                  : false,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Map and compute course progress per user
    const mappedCourses = courses.map((course) => {
      const totalLessons = course.courseVideos.length;
      const completedLessons = course.courseVideos.filter((cv) =>
        cv.video.watchLogs.some((log) => log.isCompleted)
      ).length;

      const progress = totalLessons
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

      let status = "not-started";
      if (progress === 100) status = "completed";
      else if (progress > 0) status = "in-progress";

      // Determine last activity date
      const allWatchLogDates = course.courseVideos.flatMap((cv) =>
        cv.video.watchLogs.map((wl) => wl.updatedAt)
      );
      const lastActivityDate = allWatchLogDates.length
        ? new Date(Math.max(...allWatchLogDates.map((d) => new Date(d))))
        : null;
      const lastActivity = lastActivityDate
        ? lastActivityDate.toLocaleDateString()
        : "N/A";

      return {
        id: course.id,
        title: course.title,
        description: course.description || "",
        thumbnailUrl: course.thumbnailUrl || "",
        totalLessons,
        completedLessons,
        progress,
        status,
        enrolledDate: course.createdAt.toISOString(),
        lastActivity,
        createdBy: course.createdBy || "Unknown",
        category: course.category || "",
      };
    });

    return res.json(mappedCourses );
  } catch (error) {
    console.error("Failed to get courses:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Create a new course with optional videos and thumbnail extracted from first video.
 * Expects in body:
 *  - title (string),
 *  - description (string, optional),
 *  - createdBy (string, add this when calling),
 *  - category (string, optional),
 *  - courseVideos (array of { videoId: string }) (optional)
 */
exports.createCourse = async (req, res) => {
  const { title, description, createdBy, category, courseVideos = [] } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  // Get thumbnail URL from first video's YouTube videoId if available
  const firstVideoId =
    courseVideos.length > 0 && courseVideos[0].videoId
      ? courseVideos[0].videoId
      : null;
  const thumbnailUrl = firstVideoId ? getYouTubeThumbnail(firstVideoId) : null;

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        createdBy,
        category,
        thumbnailUrl,
        createdAt: new Date(),
        courseVideos: {
          create: courseVideos.map((cv, idx) => ({
            video: {
              connect: { videoId: cv.videoId }, // assumes videoId is unique in Video table
            },
            order: idx + 1,
          })),
        },
      },
      include: {
        courseVideos: {
          include: { video: true },
        },
      },
    });

    return res.status(201).json({ course });
  } catch (err) {
    console.error("Error creating course:", err);
    return res.status(500).json({ error: "Failed to create course" });
  }
};
