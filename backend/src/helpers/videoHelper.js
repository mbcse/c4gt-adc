const youtubeService = require('../services/youtubeService');
const { extractYouTubeVideoId } = require('../utils/video');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

/**
 * Upsert a video with optional YouTube API metadata fetch.
 * 
 * @param {Object} videoInput - Contains videoUrl, title, description, duration, thumbnailUrl, platform
 * @param {boolean} fetchMetadata - Whether to fetch metadata from YouTube API if missing
 * @returns {Object} Prisma video record
 */
async function upsertVideo(videoInput, fetchMetadata = true) {
  const videoId = extractYouTubeVideoId(videoInput.videoUrl);
  if (!videoId) throw new Error('Invalid video URL');

  let videoData = {
    title: videoInput.title || `Video for ${videoId}`,
    platform: videoInput.platform || 'youtube',
    videoUrl: videoInput.videoUrl,
    duration: videoInput.duration || 0,
    description: videoInput.description || '',
    thumbnailUrl: videoInput.thumbnailUrl || null
  };

  if (fetchMetadata && (!videoInput.title || !videoInput.duration || !videoInput.description || !videoInput.thumbnailUrl)) {
    try {
      const apiMetadata = await youtubeService.getVideoMetadata(videoId);
      videoData = {
        ...videoData,
        title: videoInput.title || apiMetadata.title,
        duration: videoInput.duration || apiMetadata.duration,
        description: videoInput.description || apiMetadata.description,
        thumbnailUrl: videoInput.thumbnailUrl || apiMetadata.thumbnailUrl
      };
    } catch (error) {
      console.warn('Warning: YouTube API metadata fetch failed:', error.message);
    }
  }

  const video = await prisma.video.upsert({
    where: { videoId },
    update: videoData,
    create: {
      ...videoData,
      videoId,
      createdAt: new Date()
    }
  });

  return video;
}

/**
 * Add multiple videos to a course with ordering.
 * 
 * @param {Integer} courseId
 * @param {Array} videos Array of video input objects
 * @returns {Array} Added videos
 */
async function addVideosToCourse(courseId, videos) {
  // Get current max order
  const maxOrder = await prisma.courseVideo.aggregate({
    where: { courseId },
    _max: { order: true }
  });

  let order = (maxOrder._max.order || 0) + 1;
  const addedVideos = [];

  for (const videoInput of videos) {
    const video = await upsertVideo(videoInput, true);

    await prisma.courseVideo.create({
      data: {
        courseId,
        videoId: video.id,
        order: order++
      }
    });

    addedVideos.push(video);
  }

  return addedVideos;
}

async function upsertVideoWithTx(tx, videoInput, fetchMetadata = true) {
  const videoId = extractYouTubeVideoId(videoInput.videoUrl);
  if (!videoId) throw new Error('Invalid URL');

  let videoData = {
    title: videoInput.title || `Video for ${videoId}`,
    platform: videoInput.platform || 'youtube',
    videoUrl: videoInput.videoUrl,
    duration: videoInput.duration || 0,
    description: videoInput.description || '',
    thumbnailUrl: videoInput.thumbnailUrl || null
  };

  if (fetchMetadata && (!videoInput.title || !videoInput.duration || !videoInput.description || !videoInput.thumbnailUrl)) {
    try {
      const apiData = await youtubeService.getVideoMetadata(videoId);
      videoData = {
        ...videoData,
        title: videoInput.title || apiData.title,
        duration: videoInput.duration || apiData.duration,
        description: videoInput.description || apiData.description,
        thumbnailUrl: videoInput.thumbnailUrl || apiData.thumbnailUrl
      };
    } catch (e) {
      console.warn("Failed fetching YouTube metadata", e.message);
    }
  }

  const existing = await tx.video.findUnique({ where: { videoId } });

  if (existing) {
    const updated = await tx.video.update({
      where: { videoId },
      data: videoData
    });
    return updated;
  } else {
    const created = await tx.video.create({
      data: {
        ...videoData,
        videoId,
        createdAt: new Date()
      }
    });
    return created;
  }
}

async function addVideosToCourseTx(tx, courseId, videos) {
  const maxOrder = await tx.courseVideo.aggregate({
    where: { courseId },
    _max: { order: true }
  });
  let order = maxOrder._max.order || 0 + 1;

  const addedVideos = [];

  for (const videoInput of videos) {
    const video = await upsertVideoWithTx(tx, videoInput);
    await tx.courseVideo.create({
      data: {
        courseId,
        videoId: video.id,
        order: order++
      }
    });
    addedVideos.push(video);
  }

  return addedVideos;
}

module.exports = {
  upsertVideo,
  addVideosToCourse,
  upsertVideoWithTx,
  addVideosToCourseTx
};
