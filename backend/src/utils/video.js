function extractYouTubeVideoId(url) {
  if (!url) return null;
  try {
    const urlObj = new URL(url.trim());
    if (urlObj.hostname === "youtu.be" || urlObj.hostname === "www.youtu.be") {
      return urlObj.pathname.replace("/", "");
    }
    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

function getYouTubeThumbnail(videoId) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

const extractYouTubePlaylistId = (url) => {
  const regex = /[?&]list=([^&#]*)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

module.exports = { extractYouTubeVideoId, getYouTubeThumbnail, extractYouTubePlaylistId };
