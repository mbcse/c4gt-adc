const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { getYouTubeThumbnail } = require("../utils/video");

/**
 * Get detailed information for a single course including quiz progress.
 */
exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const userId = req.user?.userId; // Get user ID from auth

    if (isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        skillLevel: true,
        grade: true,
        language: true,
        tags: true,
        courseVideos: {
          include: {
            video: {
              include: {
                // Include user progress if user is logged in
                watchLogs: userId ? {
                  where: { userId },
                  select: {
                    totalWatchTime: true,
                    isCompleted: true,
                    watchedPercentage: true,
                    updatedAt: true,
                  }
                } : false,
                // Include quiz information
                quiz: {
                  include: {
                    attempts: userId ? {
                      where: { userId },
                      select: {
                        id: true,
                        score: true,
                        completedAt: true,
                      }
                    } : false
                  }
                }
              }
            }
          },
          orderBy: { order: "asc" },
        },
        assignments: userId ? {
          where: { userId },
          select: { id: true }
        } : false
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Add progress data to each video with quiz status
    const courseWithProgress = {
      ...course,
      isAssigned: course.assignments && course.assignments.length > 0,
      courseVideos: course.courseVideos.map(cv => ({
        ...cv,
        video: {
          ...cv.video,
          progress: cv.video.watchLogs?.[0] || {
            totalWatchTime: 0,
            isCompleted: false,
            watchedPercentage: 0.0,
          },
          // Add quiz status information
          quizStatus: cv.video.quiz ? {
            hasQuiz: true,
            isUnlocked: cv.video.watchLogs?.[0]?.isCompleted || false,
            attemptCount: cv.video.quiz.attempts?.length || 0,
            bestScore: cv.video.quiz.attempts?.length > 0 
              ? Math.max(...cv.video.quiz.attempts.map(a => a.score)) 
              : 0,
            lastAttempt: cv.video.quiz.attempts?.length > 0 
              ? cv.video.quiz.attempts[cv.video.quiz.attempts.length - 1] 
              : null
          } : { hasQuiz: false }
        }
      }))
    };

    // Calculate course-level progress
    const totalVideos = course.courseVideos.length;
    const completedVideos = course.courseVideos.filter(cv => 
      cv.video.watchLogs?.[0]?.isCompleted
    ).length;

    // Calculate quiz statistics
    const videosWithQuizzes = course.courseVideos.filter(cv => cv.video.quiz);
    const totalQuizzes = videosWithQuizzes.length;
    const completedQuizzes = videosWithQuizzes.filter(cv => 
      cv.video.quiz.attempts && cv.video.quiz.attempts.length > 0
    ).length;

    const totalDuration = course.courseVideos.reduce((sum, cv) => sum + (cv.video.duration || 0), 0);
    const totalWatchTime = course.courseVideos.reduce((sum, cv) => 
      sum + (cv.video.watchLogs?.[0]?.totalWatchTime || 0), 0
    );

    const completionPercentage = totalDuration > 0 
      ? (totalWatchTime / totalDuration) * 100 
      : 0;
    
    const averageProgress = totalVideos > 0 ? course.courseVideos.reduce((sum, cv) => 
      sum + (cv.video.watchLogs?.[0]?.watchedPercentage || 0), 0
    ) / totalVideos : 0;

    // Calculate separate completion percentages
    const videoCompletionPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
    const quizCompletionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;

    // Calculate overall completion percentage (weighted: 70% video, 30% quiz)
    const overallCompletionPercentage = totalQuizzes > 0 
      ? (videoCompletionPercentage * 0.7) + (quizCompletionPercentage * 0.3)
      : videoCompletionPercentage;

    // Course is fully completed only if both videos and quizzes are done
    const isCompleted = completedVideos === totalVideos && completedQuizzes === totalQuizzes;

    const courseProgress = {
      totalVideos,
      completedVideos,
      completionPercentage,
      totalWatchTime,
      averageProgress,
      totalQuizzes,
      completedQuizzes,
      videoCompletionPercentage,
      quizCompletionPercentage,
      overallCompletionPercentage,
      isCompleted
    };

    return res.json({ 
      course: courseWithProgress,
      courseProgress 
    });
  } catch (error) {
    console.error("Failed to get course details:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const userId = req.user?.userId;

    // Pagination & filters 
    let {
      page = 1, limit = 10,
      assigned, categoryId, gradeId, skillLevelId, languageId, tagIds, search
    } = req.query;
    page = parseInt(page); limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Build filters 
    const where = {};
    if (assigned === 'true') {
      where.assignments = { some: { userId } };
    } else if (assigned === 'false') {
      where.assignments = { none: { userId } };
    }

    if (categoryId) where.categoryId = parseInt(categoryId);
    if (gradeId) where.gradeId = parseInt(gradeId);
    if (skillLevelId) where.skillLevelId = parseInt(skillLevelId);
    if (languageId) where.languageId = parseInt(languageId);

    // Handle tagIds from both array or comma-separated string
    let parsedTagIds = [];
    if (Array.isArray(tagIds)) {
      parsedTagIds = tagIds.map(n => Number(n));
    } else if (typeof tagIds === 'string') {
      parsedTagIds = tagIds.split(',').map(n => Number(n));
    }
    if (parsedTagIds.length) {
      where.tags = { some: { id: { in: parsedTagIds } } };
    }

    // Handle search (title/description)
    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } }
      ];
    }

    // Pagination
    const totalCourses = await prisma.course.count({ where });

    const courses = await prisma.course.findMany({
      where,
      include: {
        assignments: userId ? { where: { userId } } : false,
        tags: true, 
        category: true, 
        skillLevel: true, 
        grade: true, 
        language: true,
        courseVideos: {
          include: {
            video: {
              include: {
                // Include user progress if user is logged in
                watchLogs: userId ? {
                  where: { userId },
                  select: {
                    totalWatchTime: true,
                    isCompleted: true,
                    watchedPercentage: true,
                    updatedAt: true,
                  }
                } : false,
                // Include quiz information
                quiz: {
                  include: {
                    attempts: userId ? {
                      where: { userId },
                      select: {
                        id: true,
                        score: true,
                        completedAt: true,
                      }
                    } : false
                  }
                }
              }
            }
          },
          orderBy: { order: "asc" }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    // Calculate course progress for each course 
    const mappedCourses = courses.map(course => {
      const isAssigned = course.assignments && course.assignments.length > 0;
      
      // Calculate course-level progress using total watch time / total duration
      const totalVideos = course.courseVideos.length;
      const totalDuration = course.courseVideos.reduce((sum, cv) => sum + (cv.video.duration || 0), 0);
      const totalWatchTime = course.courseVideos.reduce((sum, cv) => 
        sum + (cv.video.watchLogs?.[0]?.totalWatchTime || 0), 0
      );
      const completedVideos = course.courseVideos.filter(cv => 
        cv.video.watchLogs?.[0]?.isCompleted
      ).length;

      // Calculate quiz statistics
      const videosWithQuizzes = course.courseVideos.filter(cv => cv.video.quiz);
      const totalQuizzes = videosWithQuizzes.length;
      const completedQuizzes = videosWithQuizzes.filter(cv => 
        cv.video.quiz.attempts && cv.video.quiz.attempts.length > 0
      ).length;
      
      // Calculate weighted progress percentage
      const progress = totalDuration > 0 ? Math.round((totalWatchTime / totalDuration) * 100) : 0;

      // Calculate separate completion percentages
      const videoCompletionPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
      const quizCompletionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;

      // Calculate overall completion percentage (weighted: 70% video, 30% quiz)
      const overallProgress = totalQuizzes > 0 
        ? Math.round((videoCompletionPercentage * 0.7) + (quizCompletionPercentage * 0.3))
        : progress;
      
      // Determine status based on overall progress (considering both videos and quizzes)
      let status = 'not-started';
      if (overallProgress >= 95 && completedVideos === totalVideos && completedQuizzes === totalQuizzes) {
        status = 'completed';
      } else if (overallProgress > 0) {
        status = 'in-progress';
      }
      
      // Find most recent activity
      const lastActivity = course.courseVideos
        .flatMap(cv => cv.video.watchLogs || [])
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
      
      const lastActivityDate = lastActivity 
        ? new Date(lastActivity.updatedAt).toLocaleDateString()
        : 'Never';

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        createdBy: course.createdBy,
        createdAt: course.createdAt,
        category: course.category,
        skillLevel: course.skillLevel,
        grade: course.grade,
        language: course.language,
        tags: course.tags,
        isAssigned,
        progress,
        overallProgress, // quiz-weighted progress
        status,
        totalLessons: totalVideos,
        completedLessons: completedVideos,
        totalQuizzes, 
        completedQuizzes, 
        totalWatchTime,
        totalDuration,
        lastActivity: lastActivityDate,
        enrolledDate: isAssigned ? course.assignments[0]?.assignedAt || course.createdAt : null
      };
    });

    res.json({
      total: totalCourses,
      page,
      totalPages: Math.ceil(totalCourses / limit),
      data: mappedCourses
    });
  } catch (error) {
    console.error("Failed to get courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};
