const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// Get all videos for a course with user progress
const getCourseVideos = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    // Validate course access for student
    const courseAssignment = await prisma.courseAssignment.findFirst({
      where: {
        courseId: parseInt(courseId),
        userId: userId
      }
    });

    if (!courseAssignment) {
      return res.status(403).json({ 
        error: 'Access denied to this course' 
      });
    }

    // Get videos with progress
    const courseVideos = await prisma.courseVideo.findMany({
      where: { courseId: parseInt(courseId) },
      orderBy: { order: 'asc' },
      include: {
        video: {
          include: {
            watchLogs: {
              where: { userId },
              select: {
                totalWatchTime: true,
                isCompleted: true,
                watchedPercentage: true,
                updatedAt: true
              }
            }
          }
        }
      }
    });

    // Format response with progress data
    const videosWithProgress = courseVideos.map(cv => ({
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
        watchedPercentage: 0.0
      }
    }));

    res.json({
      success: true,
      videos: videosWithProgress
    });

  } catch (error) {
    console.error('Error fetching course videos:', error);
    res.status(500).json({ 
      error: 'Failed to fetch videos' 
    });
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

    // Validate input
    if (watchedPercentage < 0 || watchedPercentage > 100) {
      return res.status(400).json({ 
        error: 'Invalid watchedPercentage value' 
      });
    }

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

    // Update or create progress
    const progress = await prisma.watchLog.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId: parseInt(videoId)
        }
      },
      update: {
        watchedPercentage: Math.max(watchedPercentage, 0),
        isCompleted: isCompleted || watchedPercentage >= 95,
        totalWatchTime: Math.max(totalWatchTime || 0, 0),
        skipEvents,
        pauseEvents,
        updatedAt: new Date()
      },
      create: {
        userId,
        videoId: parseInt(videoId),
        watchedPercentage: Math.max(watchedPercentage, 0),
        isCompleted: isCompleted || watchedPercentage >= 95,
        totalWatchTime: Math.max(totalWatchTime || 0, 0),
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
