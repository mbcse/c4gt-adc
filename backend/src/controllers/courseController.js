const { PrismaClient } = require("../../generated/prisma");
const { 
  computeVideoProgressAndQuiz, 
  computeCourseProgress, 
  getVideoIncludeClause,
  getCourseAssignmentStatus 
} = require("../utils/progressUtils");

const prisma = new PrismaClient();

/**
 * Get detailed information for a single course including quiz progress.
 */
exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const userId = req.user?.userId;

    if (isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    // Fetch course with videos 
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
              include: getVideoIncludeClause(userId)
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

    // Process videos with progress and quiz status
    const processedCourseVideos = course.courseVideos.map(cv => {
      const { progress, quizStatus } = computeVideoProgressAndQuiz(cv.video, userId);
      return {
        ...cv,
        video: {
          ...cv.video,
          progress,
          quizStatus
        }
      };
    });

    // Calculate course-level progress
    const courseProgress = computeCourseProgress(course.courseVideos);

    const courseWithProgress = {
      ...course,
      isAssigned: course.assignments && course.assignments.length > 0,
      courseVideos: processedCourseVideos
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

/**
 * Get all courses with pagination and filtering
 */
exports.getAllCourses = async (req, res) => {
  try {
    const userId = req.user?.userId;

    // Parse pagination & filters 
    let {
      page = 1, limit = 10,
      assigned, categoryId, gradeId, skillLevelId, languageId, tagIds, search
    } = req.query;
    page = parseInt(page); 
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const where = buildCourseWhereClause({
      assigned, userId, categoryId, gradeId, skillLevelId, 
      languageId, tagIds, search
    });

    // Get total count and courses
    const [totalCourses, courses] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({
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
                include: getVideoIncludeClause(userId)
              }
            },
            orderBy: { order: "asc" }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      })
    ]);

    // Process courses with progress calculations
    const mappedCourses = courses.map(course => processCourseWithProgress(course, userId));

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

/**
 * Where clause for course filtering
 */
function buildCourseWhereClause({ assigned, userId, categoryId, gradeId, skillLevelId, languageId, tagIds, search }) {
  const where = {};
  
  // Assignment filter
  if (assigned === 'true') {
    where.assignments = { some: { userId } };
  } else if (assigned === 'false') {
    where.assignments = { none: { userId } };
  }

  // Basic filters
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

  // Search filter
  if (search && search.trim()) {
    where.OR = [
      { title: { contains: search.trim(), mode: "insensitive" } },
      { description: { contains: search.trim(), mode: "insensitive" } }
    ];
  }

  return where;
}

/**
 * Process individual course with progress calculations
 */
function processCourseWithProgress(course, userId) {
  const isAssigned = course.assignments && course.assignments.length > 0;
  
  // Calculate progress
  const progressMetrics = computeCourseProgress(course.courseVideos);
  
  // Find most recent activity
  const lastActivity = course.courseVideos
    .flatMap(cv => cv.video.watchLogs || [])
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
  
  const lastActivityDate = lastActivity 
    ? new Date(lastActivity.updatedAt).toLocaleDateString()
    : 'Never';

  // Determine course status
  let status = 'not-started';
  if (progressMetrics.overallCompletionPercentage >= 95 && 
      progressMetrics.completedVideos === progressMetrics.totalVideos && 
      progressMetrics.completedQuizzes === progressMetrics.totalQuizzes) {
    status = 'completed';
  } else if (progressMetrics.overallCompletionPercentage > 0) {
    status = 'in-progress';
  }

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
    progress: Math.round(progressMetrics.completionPercentage),
    overallProgress: Math.round(progressMetrics.overallCompletionPercentage),
    status,
    totalLessons: progressMetrics.totalVideos,
    completedLessons: progressMetrics.completedVideos,
    totalQuizzes: progressMetrics.totalQuizzes,
    completedQuizzes: progressMetrics.completedQuizzes,
    totalWatchTime: progressMetrics.totalWatchTime,
    totalDuration: progressMetrics.totalDuration,
    lastActivity: lastActivityDate,
    enrolledDate: isAssigned ? course.assignments[0]?.assignedAt || course.createdAt : null
  };
}
