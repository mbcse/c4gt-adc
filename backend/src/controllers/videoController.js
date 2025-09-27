const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();


// Get all videos for a course with user progress
const getCourseVideos = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;


    // Validate student’s course access
    const courseAssignment = await prisma.courseAssignment.findFirst({
      where: { courseId: parseInt(courseId), userId },
    });
    if (!courseAssignment) {
      return res.status(403).json({ error: "Access denied to this course" });
    }


    // Count total videos for pagination
    const totalVideos = await prisma.courseVideo.count({
      where: { courseId: parseInt(courseId) },
    });


    // Get paginated videos
    const courseVideos = await prisma.courseVideo.findMany({
      where: { courseId: parseInt(courseId) },
      orderBy: { order: "asc" },
      skip,
      take: limit,
      include: {
        video: {
          include: {
            watchLogs: {
              where: { userId },
              select: {
                totalWatchTime: true,
                isCompleted: true,
                watchedPercentage: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });


    const videosWithProgress = courseVideos.map((cv) => ({
      id: cv.video.id,
      title: cv.video.title,
      videoUrl: cv.video.videoUrl,
      videoId: cv.video.videoId,
      platform: cv.video.platform,
      duration: cv.video.duration,
      order: cv.order,
      progress: cv.video.watchLogs[0] || {
        totalWatchTime: 0,
        isCompleted: false,
        watchedPercentage: 0.0,
      },
    }));


    res.json({
      success: true,
      total: totalVideos,
      page,
      totalPages: Math.ceil(totalVideos / limit),
      videos: videosWithProgress,
    });
  } catch (error) {
    console.error("Error fetching course videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};


// Get specific video with progress
const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;


    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoId) },
      include: {
        watchLogs: {
          where: { userId },
          select: {
            totalWatchTime: true,
            isCompleted: true,
            watchedPercentage: true,
            skipEvents: true,
            pauseEvents: true,
            updatedAt: true
          }
        },
        courseVideos: {
          include: {
            course: {
              include: {
                assignments: {
                  where: { userId },
                  select: { id: true }
                }
              }
            }
          }
        }
      }
    });


    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }


    // Check if user has access to this video
    const hasAccess = video.courseVideos.some(cv => 
      cv.course.assignments.length > 0
    );


    if (!hasAccess) {
      return res.status(403).json({ 
        error: 'Access denied to this video' 
      });
    }


    res.json({
      success: true,
      video: {
        ...video,
        progress: video.watchLogs[0] || {
          totalWatchTime: 0,
          isCompleted: false,
          watchedPercentage: 0.0,
          skipEvents: [],
          pauseEvents: []
        }
      }
    });


  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
};


// Update video progress
const updateProgress = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;
    const { 
      watchedPercentage, 
      isCompleted, 
      totalWatchTime, 
      skipEvents = [], 
      pauseEvents = [] 
    } = req.body;

    // Validate watchedPercentage is numeric and within [0, 100]
    if (
      typeof watchedPercentage !== 'number' || 
      watchedPercentage < 0 || 
      watchedPercentage > 100
    ) {
      return res.status(400).json({ 
        error: 'Invalid watchedPercentage value; must be a number between 0 and 100.' 
      });
    }

    // Basic validation for totalWatchTime (non-negative)
    if (
      typeof totalWatchTime !== 'number' || 
      totalWatchTime < 0
    ) {
      return res.status(400).json({ 
        error: 'Invalid totalWatchTime value; must be a non-negative number.' 
      });
    }

    // Clamp values to safe ranges
    const clampedWatchedPercentage = Math.min(Math.max(watchedPercentage, 0), 100);
    const clampedTotalWatchTime = Math.max(totalWatchTime, 0);
    const completionStatus = isCompleted || clampedWatchedPercentage >= 95;

    // Check video access
    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoId) },
      include: {
        courseVideos: {
          include: {
            course: {
              include: {
                assignments: {
                  where: { userId },
                  select: { id: true }
                }
              }
            }
          }
        }
      }
    });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const hasAccess = video.courseVideos.some(cv => 
      cv.course.assignments.length > 0
    );

    if (!hasAccess) {
      return res.status(403).json({ 
        error: 'Access denied to this video' 
      });
    }

    // Optional: You may want to verify that clampedTotalWatchTime does not exceed video.duration here

    // Update or create progress
    const progress = await prisma.watchLog.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId: parseInt(videoId)
        }
      },
      update: {
        watchedPercentage: clampedWatchedPercentage,
        isCompleted: completionStatus,
        totalWatchTime: clampedTotalWatchTime,
        skipEvents,
        pauseEvents,
        updatedAt: new Date()
      },
      create: {
        userId,
        videoId: parseInt(videoId),
        watchedPercentage: clampedWatchedPercentage,
        isCompleted: completionStatus,
        totalWatchTime: clampedTotalWatchTime,
        skipEvents,
        pauseEvents
      }
    });

    res.json({
      success: true,
      progress
    });

  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};


// Get student's overall progress for a course
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;


    const courseVideos = await prisma.courseVideo.findMany({
      where: { courseId: parseInt(courseId) },
      include: {
        video: {
          include: {
            watchLogs: {
              where: { userId }
            }
          }
        }
      }
    });


    const totalVideos = courseVideos.length;
    const completedVideos = courseVideos.filter(cv => 
      cv.video.watchLogs[0]?.isCompleted
    ).length;


    const totalWatchTime = courseVideos.reduce((sum, cv) => 
      sum + (cv.video.watchLogs[0]?.totalWatchTime || 0), 0
    );


    const averageProgress = courseVideos.reduce((sum, cv) => 
      sum + (cv.video.watchLogs[0]?.watchedPercentage || 0), 0
    ) / totalVideos;


    res.json({
      success: true,
      courseProgress: {
        totalVideos,
        completedVideos,
        completionPercentage: (completedVideos / totalVideos) * 100,
        totalWatchTime,
        averageProgress: averageProgress || 0
      }
    });


  } catch (error) {
    console.error('Error fetching course progress:', error);
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
};


module.exports = {
  getCourseVideos,
  getVideo,
  updateProgress,
  getCourseProgress
};
