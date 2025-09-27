const videoHelper = require('../helpers/videoHelper');
const { PrismaClient, Prisma } = require('../../generated/prisma');
const prisma = new PrismaClient();
const { extractYouTubeVideoId, getYouTubeThumbnail } = require('../utils/video');
const youtubeService = require('../services/youtubeService');

exports.addVideoToCourse = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) return res.status(400).json({ message: 'Invalid course id' });

    const videoInput = req.body;
    if (!videoInput.videoUrl) return res.status(400).json({ message: 'videoUrl is required' });

    const video = await videoHelper.upsertVideo(videoInput, videoInput.useApiMetadata !== false);

    // Try to create the courseVideo relation
    const maxOrder = await prisma.courseVideo.aggregate({
      where: { courseId },
      _max: { order: true }
    });
    const nextOrder = (maxOrder._max.order || 0) + 1;

    await prisma.courseVideo.create({
      data: { courseId, videoId: video.id, order: nextOrder }
    });

    // Update thumbnail if first video
    const courseVideosCount = await prisma.courseVideo.count({ where: { courseId } });
    if (courseVideosCount === 1) {
      await prisma.course.update({
        where: { id: courseId },
        data: { thumbnailUrl: video.thumbnailUrl }
      });
    }

    res.status(201).json(video);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ message: 'Video already added to this course' });
      }
    }

    console.error('Error adding video:', error);
    res.status(500).json({ message: 'Failed to add video' });
  }
};

exports.deleteVideoFromCourse = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const videoId = parseInt(req.params.videoId);
    if (isNaN(courseId) || isNaN(videoId)) return res.status(400).json({ message: 'Invalid course or video id' });

    await prisma.courseVideo.deleteMany({ where: { courseId, videoId } });

    // Delete video if no other associations
    const otherLinkCount = await prisma.courseVideo.count({ where: { videoId } });
    if (otherLinkCount === 0) {
      await prisma.video.delete({ where: { id: videoId } });
    }

    // Update thumbnail or clear
    const remainingVideos = await prisma.courseVideo.findMany({
      where: { courseId },
      include: { video: true },
      orderBy: { order: 'asc' }
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
};

exports.processPlaylist = async (req, res) => {
  try {
    const { playlistUrl, maxResults = 50 } = req.body;
    if (!playlistUrl) return res.status(400).json({ message: 'Playlist URL is required' });

    const playlistId = youtubeService.extractPlaylistId(playlistUrl);
    if (!playlistId) return res.status(400).json({ message: 'Invalid playlist URL' });

    // Fetch playlist metadata (title, description, thumbnail)
    const playlistMetadata = await youtubeService.getPlaylistMetadata(playlistId);

    // Fetch playlist videos
    const videos = await youtubeService.getPlaylistVideos(playlistId, maxResults);

    res.json({
      playlistId,
      playlistTitle: playlistMetadata.title,
      playlistDescription: playlistMetadata.description,
      playlistThumbnailUrl: playlistMetadata.thumbnailUrl,
      totalVideos: videos.length,
      videos: videos.map((video, index) => ({
        ...video,
        platform: 'youtube',
        selected: true,
        order: index + 1,
      }))
    });
  } catch (error) {
    console.error('Error processing playlist:', error);
    res.status(500).json({ message: 'Failed to process playlist' });
  }
};


exports.addVideosFromPlaylist = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const videos = req.body.videos;
    if (!Array.isArray(videos) || videos.length === 0) {
      return res.status(400).json({ message: 'Videos array is required' });
    }

    // Fetch existing videoIds for the course
    const existingLinks = await prisma.courseVideo.findMany({
      where: { courseId },
      select: { videoId: true }
    });
    const existingVideoIds = new Set(existingLinks.map(link => link.videoId));

    // Filter out videos already linked
    const newVideos = videos.filter(v => !existingVideoIds.has(v.videoId));

    if (newVideos.length === 0) {
      return res.status(409).json({ message: 'All the videos already exist in the course' });
    }

    // Add videos to course
    const addedVideos = await videoHelper.addVideosToCourse(courseId, newVideos);

    // Update thumbnail if first videos added
    const courseVideosCount = await prisma.courseVideo.count({ where: { courseId } });
    if (courseVideosCount === addedVideos.length) {
      await prisma.course.update({
        where: { id: courseId },
        data: { thumbnailUrl: addedVideos[0].thumbnailUrl }
      });
    }

    res.status(201).json({ message: `Added ${addedVideos.length} videos to course`, videos: addedVideos });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ message: 'Some videos are already added to this course' });
      }
    }
    console.error('Error adding videos from playlist:', error);
    res.status(500).json({ message: 'Failed to add videos from playlist' });
  }
};


exports.reorderVideos = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const videoOrders = req.body.videoOrders;

    if (!Array.isArray(videoOrders) || videoOrders.length === 0) {
      return res.status(400).json({ message: 'Video orders array is required' });
    }

    // Transaction for batch update
    await prisma.$transaction(async (tx) => {
      for (const { videoId, order } of videoOrders) {
        await tx.courseVideo.updateMany({
          where: { courseId, videoId: parseInt(videoId) },
          data: { order: parseInt(order) }
        });
      }
    });

    res.json({ message: 'Video order updated successfully' });
  } catch (error) {
    console.error('Error reordering videos:', error);
    res.status(500).json({ message: 'Failed to reorder videos' });
  }
};

exports.getVideoMetadata = async (req, res) => {
  try {
    const videoUrl = req.query.videoUrl;
    if (!videoUrl) return res.status(400).json({ message: 'Video URL is required' });

    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) return res.status(400).json({ message: 'Invalid YouTube URL' });

    const metadata = await youtubeService.getVideoMetadata(videoId);

    res.json({ videoId, videoUrl, platform: 'youtube', ...metadata });
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    res.status(500).json({ message: 'Failed to fetch video metadata' });
  }
};

exports.getPaginatedPlaylistVideos = async (req, res) => {
  try {
    const playlistUrl = req.query.playlistUrl;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 25;
    if (!playlistUrl) return res.status(400).json({ message: "playlistUrl is required" });

    const playlistId = youtubeService.extractPlaylistId(playlistUrl);
    if (!playlistId) return res.status(400).json({ message: "Invalid playlist URL" });

    const { videos, totalVideos } = await youtubeService.getPlaylistVideosPaginated(playlistId, page, pageSize);

    const totalPages = Math.ceil(totalVideos / pageSize);

    res.json({ videos, totalPages });
  } catch (err) {
    console.error("Failed to fetch paginated playlist videos:", err);
    res.status(500).json({ message: "Failed to fetch playlist videos" });
  }
};

exports.addEntirePlaylist = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const { playlistUrl } = req.body;

    if (!playlistUrl) {
      return res.status(400).json({ message: 'playlistUrl is required' });
    }
    if (isNaN(courseId)) {
      return res.status(400).json({ message: 'Invalid course id' });
    }

    const playlistId = youtubeService.extractPlaylistId(playlistUrl);
    if (!playlistId) {
      return res.status(400).json({ message: 'Invalid playlist URL' });
    }

    let allVideos = [];
    let page = 1;
    const pageSize = 50; // YouTube max page size

    // Fetch all pages of playlist videos sequentially
    while (true) {
      const { videos, totalVideos } = await youtubeService.getPlaylistVideos(playlistId, page, pageSize);
      allVideos = allVideos.concat(videos);

      const totalPages = Math.ceil(totalVideos / pageSize);
      if (page >= totalPages) break;
      page++;
    }

    if (allVideos.length === 0) {
      return res.status(400).json({ message: 'Playlist is empty' });
    }

    const existingLinks = await prisma.courseVideo.findMany({
      where: { courseId },
      select: { videoId: true }
    });
    const existingVideoIds = new Set(existingLinks.map(link => link.videoId));

    const newVideos = allVideos.filter(v => !existingVideoIds.has(v.videoId));

    if (newVideos.length === 0) {
      return res.status(409).json({ message: 'All videos already exist in the course' });
    }

    const addedVideos = await videoHelper.addVideosToCourse(courseId, newVideos);

    // Optionally update course thumbnail if none set
    const courseVideosCount = await prisma.courseVideo.count({ where: { courseId } });
    if (courseVideosCount === addedVideos.length) {
      await prisma.course.update({
        where: { id: courseId },
        data: { thumbnailUrl: addedVideos[0].thumbnailUrl }
      });
    }

    res.status(201).json({
      message: `Added ${addedVideos.length} videos to course`,
      videos: addedVideos,
    });

  } catch (error) {
    console.error('Add entire playlist error:', error);
    res.status(500).json({ message: 'Failed to add videos from playlist' });
  }
};
