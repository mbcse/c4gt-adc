// controllers/videoController.js
const { PrismaClient } = require("../../generated/prisma");
const { 
  computeVideoProgressAndQuiz, 
  computeCourseProgress, 
  getVideoIncludeClause,
  checkVideoAssignment
} = require("../utils/progressUtils");

const prisma = new PrismaClient();

// Anti-gaming configuration
const ANTI_GAMING_CONFIG = {
  MAX_PLAYBACK_SPEED: 1.6,
  MIN_UPDATE_INTERVAL: 2,
  SUSPICIOUS_SKIP_THRESHOLD: 60,
  COMPLETION_THRESHOLD: 95,
};

const validateProgressIntegrity = (current, previous, video, realTimeElapsed) => {
  const issues = [];
  
  // Speed validation 
  const watchTimeIncrease = current.totalWatchTime - (previous?.totalWatchTime || 0);
  if (realTimeElapsed > ANTI_GAMING_CONFIG.MIN_UPDATE_INTERVAL && watchTimeIncrease > 0) {
    const effectiveSpeed = watchTimeIncrease / realTimeElapsed;
    if (effectiveSpeed > ANTI_GAMING_CONFIG.MAX_PLAYBACK_SPEED) {
      issues.push({
        type: 'SPEED_VIOLATION',
        detectedSpeed: effectiveSpeed,
        maxAllowed: ANTI_GAMING_CONFIG.MAX_PLAYBACK_SPEED
      });
    }
  }
  
  // Large skip detection
  const skipDistance = Math.abs(current.totalWatchTime - (previous?.totalWatchTime || 0));
  if (skipDistance > ANTI_GAMING_CONFIG.SUSPICIOUS_SKIP_THRESHOLD && realTimeElapsed < 10) {
    issues.push({
      type: 'LARGE_SKIP',
      skipDistance,
      threshold: ANTI_GAMING_CONFIG.SUSPICIOUS_SKIP_THRESHOLD
    });
  }
  
  // Duration overflow
  if (current.totalWatchTime > video.duration * 1.05) {
    issues.push({
      type: 'DURATION_OVERFLOW',
      totalWatchTime: current.totalWatchTime,
      videoDuration: video.duration
    });
  }
  
  return issues;
};

/**
 * Get all videos for a course with user progress - OPTIMIZED
 */
const getCourseVideos = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Check assignment status
    const isAssigned = await getCourseAssignmentStatus(courseId, userId);

    // Get total count and videos
    const [totalVideos, courseVideos] = await Promise.all([
      prisma.courseVideo.count({
        where: { courseId: parseInt(courseId) }
      }),
      prisma.courseVideo.findMany({
        where: { courseId: parseInt(courseId) },
        orderBy: { order: "asc" },
        skip,
        take: limit,
        include: {
          video: {
            include: getVideoIncludeClause(userId)
          }
        }
      })
    ]);

    // Process videos 
    const videosWithProgress = courseVideos.map((cv) => {
      const { progress, quizStatus } = computeVideoProgressAndQuiz(cv.video, userId);
      
      return {
        id: cv.video.id,
        title: cv.video.title,
        videoUrl: cv.video.videoUrl,
        videoId: cv.video.videoId,
        platform: cv.video.platform,
        duration: cv.video.duration,
        order: cv.order,
        progress,
        quizStatus
      };
    });

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

/**
 * Get specific video with progress 
 */
const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    const [video, isAssigned] = await Promise.all([
      prisma.video.findUnique({
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
              updatedAt: true,
              lastUpdateTime: true,
            }
          }
        }
      }),
      checkVideoAssignment(videoId, userId)
    ]);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      success: true,
      video: {
        ...video,
        isAssigned,
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

/**
 * Update video progress with validation
 */
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

    const now = new Date();

    // Input validation
    if (typeof watchedPercentage !== 'number' || watchedPercentage < 0 || watchedPercentage > 100) {
      return res.status(400).json({
        error: 'Invalid watchedPercentage value; must be a number between 0 and 100.',
        code: 'INVALID_INPUT'
      });
    }

    if (typeof totalWatchTime !== 'number' || totalWatchTime < 0) {
      return res.status(400).json({
        error: 'Invalid totalWatchTime value; must be a non-negative number.',
        code: 'INVALID_INPUT'
      });
    }

    // Get video and existing progress
    const [video, existingLog] = await Promise.all([
      prisma.video.findUnique({
        where: { id: parseInt(videoId) },
        select: { id: true, duration: true }
      }),
      prisma.watchLog.findUnique({
        where: {
          userId_videoId: { userId, videoId: parseInt(videoId) }
        }
      })
    ]);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Calculate real time elapsed
    let realTimeElapsed = 2; // Default minimum
    if (existingLog?.lastUpdateTime) {
      realTimeElapsed = Math.max((now - existingLog.lastUpdateTime) / 1000, 1);
    }

    // Validation for gaming behavior
    const currentProgress = { totalWatchTime, watchedPercentage, isCompleted };
    const validationIssues = validateProgressIntegrity(currentProgress, existingLog, video, realTimeElapsed);

    // Handle violations
    if (validationIssues.length > 0) {
      const speedViolation = validationIssues.find(issue => issue.type === 'SPEED_VIOLATION');
      const skipViolation = validationIssues.find(issue => issue.type === 'LARGE_SKIP');
      const overflowViolation = validationIssues.find(issue => issue.type === 'DURATION_OVERFLOW');

      if (speedViolation) {
        return res.status(400).json({
          error: `Playback speed too high (${speedViolation.detectedSpeed.toFixed(2)}x). Please watch at normal speed (max 1.5x) for effective learning.`,
          code: 'SPEED_VIOLATION',
          details: {
            detectedSpeed: speedViolation.detectedSpeed,
            maxAllowed: 1.5,
          }
        });
      }

      if (overflowViolation) {
        return res.status(400).json({
          error: 'Watch time cannot exceed video duration. Please watch the video normally.',
          code: 'DURATION_OVERFLOW'
        });
      }

      if (skipViolation) {
        return res.status(400).json({
          error: 'Excessive skipping detected. Please watch the video sequentially for better learning.',
          code: 'EXCESSIVE_SKIPPING',
          details: {
            skipDistance: skipViolation.skipDistance,
          }
        });
      }
    }

    // Progress validation and clamping 
    const clampedWatchedPercentage = Math.min(Math.max(watchedPercentage, 0), 100);
    let clampedTotalWatchTime = Math.max(totalWatchTime, 0);
    
    if (clampedTotalWatchTime > video.duration * 1.1) {
      return res.status(400).json({
        error: 'Total watch time cannot exceed video duration significantly.',
        code: 'DURATION_EXCEEDED'
      });
    }
    
    if (existingLog && clampedTotalWatchTime < existingLog.totalWatchTime - 5) {
      clampedTotalWatchTime = existingLog.totalWatchTime;
    }

    const actualPercentage = (clampedTotalWatchTime / video.duration) * 100;
    let completionStatus = isCompleted || clampedWatchedPercentage >= 95;
    
    if (completionStatus && actualPercentage < ANTI_GAMING_CONFIG.COMPLETION_THRESHOLD) {
      completionStatus = false;
    }

    // Update or create progress
    const progress = await prisma.watchLog.upsert({
      where: {
        userId_videoId: { userId, videoId: parseInt(videoId) }
      },
      update: {
        watchedPercentage: Math.max(clampedWatchedPercentage, existingLog?.watchedPercentage || 0),
        isCompleted: completionStatus || existingLog?.isCompleted || false,
        totalWatchTime: Math.max(clampedTotalWatchTime, existingLog?.totalWatchTime || 0),
        skipEvents: [...(existingLog?.skipEvents || []), ...skipEvents].slice(-100),
        pauseEvents: [...(existingLog?.pauseEvents || []), ...pauseEvents].slice(-100),
        lastUpdateTime: now,
        updatedAt: now
      },
      create: {
        userId,
        videoId: parseInt(videoId),
        watchedPercentage: clampedWatchedPercentage,
        isCompleted: completionStatus,
        totalWatchTime: clampedTotalWatchTime,
        skipEvents,
        pauseEvents,
        lastUpdateTime: now
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

/**
 * Get course progress
 */
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    const courseVideos = await prisma.courseVideo.findMany({
      where: { courseId: parseInt(courseId) },
      include: {
        video: {
          include: getVideoIncludeClause(userId)
        }
      }
    });

    const courseProgress = computeCourseProgress(courseVideos);

    res.json({
      success: true,
      courseProgress
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
