const express = require('express');
const { PrismaClient } = require('../../../generated/prisma');
const prisma = new PrismaClient();

const { extractYouTubeVideoId, getYouTubeThumbnail } = require('../../utils/video');

const requireAuth = require('../../middlewares/requireAuth');
const requireRole = require('../../middlewares/requireRole');

const router = express.Router();

// Protect all admin course routes to authenticated admins and superadmins
router.use(requireAuth);
router.use(requireRole(['ADMIN', 'SUPERADMIN']));

/**
 * GET /api/admin/courses
 * Get all courses with their videos (ordered)
 */
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        courseVideos: {
          orderBy: { order: 'asc' },
          include: { video: true },
        },
      },
    });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

/**
 * POST /api/admin/courses
 * Create a new course with optional initial videos
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, createdBy, category, courseVideos = [] } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    // Prepare nested create for videos with upsert
    const videoCreates = [];

    for (let i = 0; i < courseVideos.length; i++) {
      const videoInput = courseVideos[i];
      const videoId = extractYouTubeVideoId(videoInput.videoUrl);

      if (!videoId) {
        return res.status(400).json({ message: `Invalid video URL: ${videoInput.videoUrl}` });
      }

      videoCreates.push({
        video: {
          connectOrCreate: {
            where: { videoId },
            create: {
              title: videoInput.title || `Video for ${videoId}`,
              platform: videoInput.platform || 'youtube',
              videoUrl: videoInput.videoUrl,
              videoId,
              duration: videoInput.duration || 0,
              createdAt: new Date(),
            },
          },
        },
        order: i + 1,
      });
    }

    const thumbnailUrl = courseVideos.length > 0 
      ? getYouTubeThumbnail(extractYouTubeVideoId(courseVideos[0].videoUrl))
      : null;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        createdBy,
        category,
        thumbnailUrl,
        createdAt: new Date(),
        courseVideos: { create: videoCreates },
      },
      include: { courseVideos: { include: { video: true } } },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

/**
 * PUT /api/admin/courses/:id
 * Update course details
 */
router.put('/:id', async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const { title, description, category, thumbnailUrl } = req.body;

    if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

    // If thumbnailUrl is not provided, regenerate from first video if present
    let updatedThumbnailUrl = thumbnailUrl;

    if (!updatedThumbnailUrl) {
      const firstVideoLink = await prisma.courseVideo.findFirst({
        where: { courseId },
        include: { video: true },
        orderBy: { order: 'asc' },
      });

      if (firstVideoLink) {
        updatedThumbnailUrl = getYouTubeThumbnail(firstVideoLink.video.videoId);
      }
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        title,
        description,
        category,
        thumbnailUrl: updatedThumbnailUrl,
      },
      include: { courseVideos: { include: { video: true } } },
    });

    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Failed to update course' });
  }
});

/**
 * DELETE /api/admin/courses/:id
 * Delete a course by id
 */
router.delete('/:id', async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

    await prisma.course.delete({ where: { id: courseId } });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
});

/**
 * POST /api/admin/courses/:courseId/videos
 * Add a video to a course
 */
router.post('/:courseId/videos', async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

    const { videoUrl, title, platform, duration } = req.body;
    if (!videoUrl) return res.status(400).json({ message: 'videoUrl is required' });

    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) return res.status(400).json({ message: 'Invalid video URL' });

    const video = await prisma.video.upsert({
      where: { videoId },
      update: {
        title: title || `Video for ${videoId}`,
        platform: platform || 'youtube',
        videoUrl,
        duration: duration || 0,
      },
      create: {
        title: title || `Video for ${videoId}`,
        platform: platform || 'youtube',
        videoUrl,
        videoId,
        duration: duration || 0,
        createdAt: new Date(),
      },
    });

    // Determine the order of new video (append at end)
    const maxOrder = await prisma.courseVideo.aggregate({
      where: { courseId },
      _max: { order: true },
    });

    const nextOrder = (maxOrder._max.order || 0) + 1;

    await prisma.courseVideo.create({
      data: {
        courseId,
        videoId: video.id,
        order: nextOrder,
      },
    });

    // If first video, update course thumbnail
    const courseVideosCount = await prisma.courseVideo.count({ where: { courseId } });
    if (courseVideosCount === 1) {
      const thumbnailUrl = getYouTubeThumbnail(videoId);
      await prisma.course.update({ where: { id: courseId }, data: { thumbnailUrl } });
    }

    res.status(201).json(video);
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ message: 'Failed to add video' });
  }
});

/**
 * DELETE /api/admin/courses/:courseId/videos/:videoId
 * Remove a video from a course
 */
router.delete('/:courseId/videos/:videoId', async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const videoId = parseInt(req.params.videoId);

    if (isNaN(courseId) || isNaN(videoId))
      return res.status(400).json({ message: 'Invalid course or video id' });

    await prisma.courseVideo.deleteMany({ where: { courseId, videoId } });

    // Delete video entirely if no longer linked to any course
    const otherLinks = await prisma.courseVideo.findMany({ where: { videoId } });
    if (otherLinks.length === 0) {
      await prisma.video.delete({ where: { id: videoId } });
    }

    // Update course thumbnail if first video changed
    const remainingVideos = await prisma.courseVideo.findMany({
      where: { courseId },
      include: { video: true },
      orderBy: { order: 'asc' },
    });

    if (remainingVideos.length > 0) {
      const newThumbnail = getYouTubeThumbnail(remainingVideos[0].video.videoId);
      await prisma.course.update({ where: { id: courseId }, data: { thumbnailUrl: newThumbnail } });
    } else {
      await prisma.course.update({ where: { id: courseId }, data: { thumbnailUrl: null } });
    }

    res.json({ message: 'Video removed from course' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Failed to delete video' });
  }
});

// -------- Course Assignment Routes --------

/**
 * POST /api/admin/courses/assign
 * Assign a course to a user
 */
router.post('/assign', async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    if (!courseId || !userId)
      return res.status(400).json({ message: 'courseId and userId are required' });

    const existing = await prisma.courseAssignment.findUnique({
      where: {
        courseId_userId: {
          courseId: Number(courseId),
          userId: Number(userId),
        },
      },
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
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error assigning course:', error);
    res.status(500).json({ message: 'Failed to assign course' });
  }
});

/**
 * DELETE /api/admin/courses/assign
 * Unassign a course from a user
 */
router.delete('/assign', async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    if (!courseId || !userId)
      return res.status(400).json({ message: 'courseId and userId are required' });

    await prisma.courseAssignment.deleteMany({
      where: { courseId: Number(courseId), userId: Number(userId) },
    });

    res.json({ message: 'Course unassigned from user' });
  } catch (error) {
    console.error('Error unassigning course:', error);
    res.status(500).json({ message: 'Failed to unassign course' });
  }
});

/**
 * GET /api/admin/courses/assignments
 * List course assignments optionally filtered by courseId or userId
 */
router.get('/assignments', async (req, res) => {
  try {
    const { courseId, userId } = req.query;
    const where = {};
    if (courseId) where.courseId = Number(courseId);
    if (userId) where.userId = Number(userId);

    const assignments = await prisma.courseAssignment.findMany({
      where,
      include: {
        course: true,
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: { assignedAt: 'desc' },
    });

    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
});

module.exports = router;
