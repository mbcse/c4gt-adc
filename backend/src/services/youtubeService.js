const axios = require('axios');

class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  // Extract playlist ID from URL
  extractPlaylistId(url) {
    const regex = /[?&]list=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Get video metadata
async getVideoMetadata(videoId) {
  try {
    const response = await axios.get(`${this.baseUrl}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: this.apiKey
      }
    });

    if (!response.data.items.length) {
      throw new Error('Video not found');
    }

    const video = response.data.items[0];  // <-- Access first video object (not the array)

    // Safely parse duration string
    const durationStr = video.contentDetails?.duration || 'PT0S';
    const duration = this.parseDuration(durationStr);

    return {
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
      duration,
      publishedAt: video.snippet.publishedAt
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    throw error;
  }
}


  // Get all videos from a playlist, with pagination to gather up to maxResults
  async getPlaylistVideos(playlistId, maxResults = 200) {
    try {
      const videos = [];
      let nextPageToken = undefined;
      let fetchedCount = 0;

      do {
        const pageSize = Math.min(50, maxResults - fetchedCount);
        const response = await axios.get(`${this.baseUrl}/playlistItems`, {
          params: {
            part: 'snippet,contentDetails',
            playlistId,
            maxResults: pageSize,
            pageToken: nextPageToken,
            key: this.apiKey
          }
        });

        const items = response.data.items || [];
        const videoIds = items.map(item => item.snippet.resourceId.videoId).filter(Boolean);

        if (videoIds.length === 0) break;

        // Fetch video details for this page
        const videosResponse = await axios.get(`${this.baseUrl}/videos`, {
          params: {
            part: 'snippet,contentDetails',
            id: videoIds.join(','),
            key: this.apiKey
          }
        });

        videosResponse.data.items.forEach(video => {
          const duration = this.parseDuration(video.contentDetails.duration);
          videos.push({
            videoId: video.id,
            videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
            duration,
            publishedAt: video.snippet.publishedAt
          });
        });

        fetchedCount = videos.length;
        nextPageToken = response.data.nextPageToken;
      } while (nextPageToken && videos.length < maxResults);

      return videos.slice(0, maxResults);
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      throw error;
    }
  }

  async getPlaylistMetadata(playlistId) {
    try {
      const response = await axios.get(`${this.baseUrl}/playlists`, {
        params: {
          part: 'snippet',
          id: playlistId,
          key: this.apiKey
        }
      });
      if (!response.data.items.length) throw new Error('Playlist not found');
      const playlist = response.data.items[0];
      return {
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        thumbnailUrl: playlist.snippet.thumbnails.high?.url || playlist.snippet.thumbnails.default.url,
        publishedAt: playlist.snippet.publishedAt,
      };
    } catch (error) {
      console.error('Error fetching playlist metadata:', error);
      throw error;
    }
  }

  async getPlaylistVideosPaginated(playlistId, page = 1, pageSize = 25) {
  let nextPageToken = undefined;
  let currentPage = 1;

  // To get to the target page, "hop" through pageTokens
  while (currentPage < page) {
    const response = await axios.get(`${this.baseUrl}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: pageSize,
        pageToken: nextPageToken,
        key: this.apiKey
      }
    });
    nextPageToken = response.data.nextPageToken;
    if (!nextPageToken) break;
    currentPage++;
  }

  // Now fetch the requested page
  const response = await axios.get(`${this.baseUrl}/playlistItems`, {
    params: {
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: pageSize,
      pageToken: nextPageToken,
      key: this.apiKey
    }
  });

  const items = response.data.items || [];
  const totalVideos = response.data.pageInfo.totalResults;
  const videoIds = items.map(item => item.snippet.resourceId.videoId).filter(Boolean);

  let videosPage = [];
  if (videoIds.length > 0) {
    const videosResponse = await axios.get(`${this.baseUrl}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoIds.join(','),
        key: this.apiKey
      }
    });
    videosPage = videosResponse.data.items.map(video => ({
      videoId: video.id,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
      duration: this.parseDuration(video.contentDetails.duration),
      publishedAt: video.snippet.publishedAt
    }));
  }

  return { videos: videosPage, totalVideos };
}

  // Parse YouTube ISO 8601 duration to seconds
  parseDuration(duration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);
  if (!matches) return 0;
  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

}

module.exports = new YouTubeService();
