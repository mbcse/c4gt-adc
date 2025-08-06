const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { getYouTubeThumbnail } = require("../utils/video");

exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) return res.status(400).json({ error: 'Invalid course ID' });

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    if (!course) return res.status(404).json({ error: 'Course not found' });

    res.json({ course });
  } catch (error) {
    console.error("Failed to get course details:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const courses = await prisma.course.findMany({
      include: {
        courseVideos: {
          include: {
            video: {
              include: {
                watchLogs: {
                  where: { userId },
                  select: {
                    isCompleted: true,
                    watchedPercentage: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const mappedCourses = courses.map(course => {
      const totalLessons = course.courseVideos.length;
      const completedLessons = course.courseVideos.filter(cv =>
        cv.video.watchLogs.some(log => log.isCompleted)
      ).length;

      const progress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

      let status = "not-started";
      if (progress === 100) status = "completed";
      else if (progress > 0) status = "in-progress";

      // last activity
      const allWatchLogDates = course.courseVideos.flatMap(cv =>
        cv.video.watchLogs.map(wl => wl.updatedAt)
      );
      const lastActivityDate = allWatchLogDates.length
        ? new Date(Math.max(...allWatchLogDates.map(d => new Date(d))))
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
        createdBy: course.createdBy || "Unknown"
      };
    });

    res.json({ courses: mappedCourses });
  } catch (error) {
    console.error("Failed to get courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, courseVideos } = req.body;

  const firstVideoId = courseVideos && courseVideos.length > 0 ? courseVideos[0].videoId : null;
  const thumbnailUrl = getYouTubeThumbnail(firstVideoId);

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        createdBy,
        thumbnailUrl,
        createdAt: new Date(),
        courseVideos: {
          create: courseVideos.map(cv => ({ videoId: cv.videoId })),
        },
      },
      include: {
        courseVideos: true,
      },
    });

    res.json({ course });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: "Failed to create course" });
  }
};
