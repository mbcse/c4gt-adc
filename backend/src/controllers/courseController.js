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
      include: {   // SWITCH from `select` to `include` to get full objects
        category: true,
        skillLevel: true,
        grade: true,
        language: true,
        tags: true,
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

    // --- Handle tagIds from both array or comma-separated string ---
    let parsedTagIds = [];
    if (Array.isArray(tagIds)) {
      parsedTagIds = tagIds.map(n => Number(n));
    } else if (typeof tagIds === 'string') {
      parsedTagIds = tagIds.split(',').map(n => Number(n));
    }
    if (parsedTagIds.length) {
      where.tags = { some: { id: { in: parsedTagIds } } };
    }

    // --- Handle search (title/description) ---
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
        tags: true, category: true, skillLevel: true, grade: true, language: true,
        courseVideos: { include: { video: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    // Add assignment status
    const mappedCourses = courses.map(course => ({
      ...course,
      isAssigned: course.assignments && course.assignments.length > 0,
    }));

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


// /**
//  * Create a new course with optional videos and thumbnail extracted from first video.
//  * Expects in body:
//  *  - title (string),
//  *  - description (string, optional),
//  *  - createdBy (string, add this when calling),
//  *  - category (string, optional),
//  *  - courseVideos (array of { videoId: string }) (optional)
//  */
// exports.createCourse = async (req, res) => {
//   const { title, description, createdBy, category, courseVideos = [] } = req.body;

//   if (!title) {
//     return res.status(400).json({ error: "Title is required" });
//   }

//   // Get thumbnail URL from first video's YouTube videoId if available
//   const firstVideoId =
//     courseVideos.length > 0 && courseVideos[0].videoId
//       ? courseVideos[0].videoId
//       : null;
//   const thumbnailUrl = firstVideoId ? getYouTubeThumbnail(firstVideoId) : null;

//   try {
//     const course = await prisma.course.create({
//       data: {
//         title,
//         description,
//         createdBy,
//         category,
//         thumbnailUrl,
//         createdAt: new Date(),
//         courseVideos: {
//           create: courseVideos.map((cv, idx) => ({
//             video: {
//               connect: { videoId: cv.videoId }, // assumes videoId is unique in Video table
//             },
//             order: idx + 1,
//           })),
//         },
//       },
//       include: {
//         courseVideos: {
//           include: { video: true },
//         },
//       },
//     });

//     return res.status(201).json({ course });
//   } catch (err) {
//     console.error("Error creating course:", err);
//     return res.status(500).json({ error: "Failed to create course" });
//   }
// };
