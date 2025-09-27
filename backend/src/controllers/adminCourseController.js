const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const { extractYouTubeVideoId, getYouTubeThumbnail } = require("../utils/video");
const { upsertVideoWithTx, addVideosToCourseTx } = require('../helpers/videoHelper');
const videoHelper = require('../helpers/videoHelper');
const { buildUserFilter, getOrgUnitDescendants } = require('../utils/filterUtils');

exports.listCourses = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const skip = (page - 1) * limit;

    // Filters
    const where = {};

    if (req.query.categoryId) where.categoryId = Number(req.query.categoryId);
    if (req.query.skillLevelId) where.skillLevelId = Number(req.query.skillLevelId);
    if (req.query.gradeId) where.gradeId = Number(req.query.gradeId);
    if (req.query.languageId) where.languageId = Number(req.query.languageId);

    // Tags filtering 
    if (req.query.tagIds) {
      const tagIds = req.query.tagIds.split(',').map(id => Number(id));
      where.tags = { some: { id: { in: tagIds } } };
    }

    // Search (title/description)
    if (req.query.search) {
      const search = req.query.search;
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Count total matches
    const total = await prisma.course.count({ where });

    // Paginated results
    const courses = await prisma.course.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where,
      include: {
        courseVideos: {
          orderBy: { order: 'asc' },
          include: { video: true }
        },
        tags: true,
        category: true,
        skillLevel: true,
        grade: true,
        language: true
      }
    });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    res.json({
      total,
      page,
      totalPages,
      data: courses
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        courseVideos: {
          orderBy: { order: 'asc' },
          include: { video: true }
        },
        tags: true,
        category: true,
        skillLevel: true,
        grade: true,
        language: true
      }
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Failed to fetch course' });
  }
};


exports.createCourse = async (req, res) => {
  const { title, description, categoryId, skillLevelId, gradeId, languageId, tagIds = [], courseVideos = [] } = req.body;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const course = await prisma.$transaction(async (tx) => {
      // Create the course
      const createdCourse = await tx.course.create({
        data: {
          title,
          description,
          categoryId: categoryId ? Number(categoryId) : undefined,
          skillLevelId: skillLevelId ? Number(skillLevelId) : undefined,
          gradeId: gradeId ? Number(gradeId) : undefined,
          languageId: languageId ? Number(languageId) : undefined,
          tags: { connect: tagIds.map(id => ({ id: Number(id) })) },
        }
      });

      if (courseVideos.length > 0) {
        // Add videos transactionally
        await addVideosToCourseTx(tx, createdCourse.id, courseVideos);

        // Update thumbnail
        await tx.course.update({
          where: { id: createdCourse.id },
          data: { thumbnailUrl: courseVideos[0]?.thumbnailUrl || null }
        });
      }

      // Return complete course with related data
      return tx.course.findUnique({
        where: { id: createdCourse.id },
        include: {
          tags: true,
          category: true,
          skillLevel: true,
          grade: true,
          language: true,
          courseVideos: { include: { video: true }, orderBy: { order: 'asc' } }
        }
      });
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = parseInt(req.params.id);
  if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

  const {
    title,
    description,
    categoryId,
    skillLevelId,
    gradeId,
    languageId,
    tagIds = [],
    thumbnailUrl,
    courseVideos = []
  } = req.body;

  try {
    const updatedCourse = await prisma.$transaction(async (tx) => {

      // Update main course info & tags
      const updated = await tx.course.update({
        where: { id: courseId },
        data: {
          title,
          description,
          categoryId: categoryId ? Number(categoryId) : null,
          skillLevelId: skillLevelId ? Number(skillLevelId) : null,
          gradeId: gradeId ? Number(gradeId) : null,
          languageId: languageId ? Number(languageId) : null,
          tags: { set: tagIds.map(id => ({ id: Number(id) })) },
          thumbnailUrl: thumbnailUrl || null
        }
      });

      // Sync course videos if array provided
      if (Array.isArray(courseVideos)) {
        // Delete existing links
        await tx.courseVideo.deleteMany({ where: { courseId } });

        let order = 1;
        for (const videoInput of courseVideos) {
          const video = await videoHelper.upsertVideoWithTx(tx, videoInput);
          await tx.courseVideo.create({
            data: {
              courseId,
              videoId: video.id,
              order: order++,
            }
          });
        }

        // Update thumbnail from first video if no explicit thumbnail
        if (!thumbnailUrl && courseVideos[0]?.thumbnailUrl) {
          await tx.course.update({
            where: { id: courseId },
            data: { thumbnailUrl: courseVideos.thumbnailUrl }
          });
        }
      }

      return tx.course.findUnique({
        where: { id: courseId },
        include: {
          tags: true,
          category: true,
          skillLevel: true,
          grade: true,
          language: true,
          courseVideos: { orderBy: { order: 'asc' }, include: { video: true } }
        }
      });
    });

    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Failed to update course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

    await prisma.course.delete({ where: { id: courseId } });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

exports.assignCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'courseId and userId are required' });
    }

    const currentUser = req.user;

    const filters = {};
    const userFilter = await buildUserFilter(filters, currentUser);

    const targetUser = await prisma.user.findFirst({
      where: {
        id: Number(userId),
        role: 'STUDENT',
        ...userFilter
      }
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'Student not found or access denied' });
    }

    const existing = await prisma.courseAssignment.findUnique({
      where: {
        courseId_userId: {
          courseId: Number(courseId),
          userId: Number(userId)
        }
      }
    });

    if (existing) {
      return res.status(409).json({ message: 'Course already assigned to user' });
    }

    const assignment = await prisma.courseAssignment.create({
      data: {
        courseId: Number(courseId),
        userId: Number(userId),
        assignedAt: new Date(),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true } }
      }
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error assigning course:', error);
    res.status(500).json({ message: 'Failed to assign course' });
  }
};

exports.unassignCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'courseId and userId are required' });
    }

    const currentUser = req.user;

    const filters = {};
    const userFilter = await buildUserFilter(filters, currentUser);

    const targetUser = await prisma.user.findFirst({
      where: {
        id: Number(userId),
        role: 'STUDENT',
        ...userFilter
      }
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'Student not found or access denied' });
    }

    const deleteResult = await prisma.courseAssignment.deleteMany({
      where: {
        courseId: Number(courseId),
        userId: Number(userId)
      }
    });

    if (deleteResult.count === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Course unassigned from user' });
  } catch (error) {
    console.error('Error unassigning course:', error);
    res.status(500).json({ message: 'Failed to unassign course' });
  }
};


exports.listAssignments = async (req, res) => {
  try {
    const { courseId, userId } = req.query;
    const currentUser = req.user;

    let where = {};

    if (courseId) where.courseId = Number(courseId);
    if (userId) where.userId = Number(userId);

    if (!currentUser || currentUser.role !== 'SUPERADMIN') {
      const filters = {};
      const userFilter = await buildUserFilter(filters, currentUser);

      if (userFilter.organizationUnitId) {
        where.user = {
          ...userFilter
        };
      }
    }

    const assignments = await prisma.courseAssignment.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnailUrl: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            organizationUnit: {
              select: { id: true, name: true, type: true }
            },
            grade: {
              select: { id: true, value: true }
            }
          }
        },
      },
      orderBy: { assignedAt: 'desc' }
    });

    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
};

exports.assignCourseBulk = async (req, res) => {
  try {
    const {
      courseId,
      userIds,
      blockId,
      schoolId,
      gradeId
    } = req.body;

    const currentUser = req.user;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) }
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let targetUsers = [];

    if (userIds && Array.isArray(userIds)) {
      // Individual user assignment
      const filters = {};
      const userFilter = await buildUserFilter(filters, currentUser);

      targetUsers = await prisma.user.findMany({
        where: {
          id: { in: userIds.map(id => Number(id)) },
          role: 'STUDENT',
          ...userFilter
        },
        select: { id: true, name: true, email: true }
      });

      if (targetUsers.length !== userIds.length) {
        return res.status(400).json({ message: 'Some selected users are not accessible or invalid' });
      }
    } else {
      // Bulk assignment by organization unit or grade
      let filters = {};

      if (blockId) {
        filters.blockId = Number(blockId);
      }
      if (schoolId) {
        filters.schoolId = Number(schoolId);
      }
      if (gradeId) {
        filters.gradeId = Number(gradeId);
      }

      const userFilter = await buildUserFilter(filters, currentUser);

      targetUsers = await prisma.user.findMany({
        where: {
          role: 'STUDENT',
          ...userFilter
        },
        select: { id: true, name: true, email: true }
      });

      if (targetUsers.length === 0) {
        return res.status(400).json({ message: 'No students found matching the criteria' });
      }
    }

    // Check for existing assignments to avoid duplicates
    const existingAssignments = await prisma.courseAssignment.findMany({
      where: {
        courseId: Number(courseId),
        userId: { in: targetUsers.map(user => user.id) }
      },
      select: { userId: true }
    });

    const existingUserIds = new Set(existingAssignments.map(a => a.userId));
    const newUsers = targetUsers.filter(user => !existingUserIds.has(user.id));

    if (newUsers.length === 0) {
      return res.status(400).json({ message: 'All selected students are already assigned to this course' });
    }

    // Create assignments for new users
    const assignments = await prisma.courseAssignment.createMany({
      data: newUsers.map(user => ({
        courseId: Number(courseId),
        userId: user.id,
        assignedAt: new Date(),
      })),
      skipDuplicates: true
    });

    res.status(201).json({
      message: 'Course assigned successfully',
      assignedCount: assignments.count,
      skippedCount: targetUsers.length - assignments.count,
      totalTargeted: targetUsers.length
    });

  } catch (error) {
    console.error('Error in bulk course assignment:', error);
    res.status(500).json({ message: 'Failed to assign course' });
  }
};