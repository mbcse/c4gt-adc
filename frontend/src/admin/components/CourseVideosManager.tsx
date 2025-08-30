import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Plus, Trash2, GripVertical, Edit, FileText } from "lucide-react";
import { courseAPI } from "@/api/courseAPI";
import { useApi } from "@/api/index";
import { formatDuration } from "@/utils/format";
import type { Quiz, Video } from "@/types";

interface CourseVideosManagerProps {
  courseId: number;
  videos: any[];
  onVideosUpdated: (videos: any[]) => void;
  playlistUrl?: string;
  disabled?: boolean;
  quizzes: Quiz[];
  onCreateQuiz: (video: Video) => void;
  onEditQuiz: (quiz: Quiz) => void;
  onDeleteQuiz: (quizId: number) => void;
}

interface PlaylistVideo {
  videoId: string;
  videoUrl?: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  description?: string;
  platform: string;
}

export function CourseVideosManager({
  courseId,
  videos,
  onVideosUpdated,
  playlistUrl: externalPlaylistUrl,
  disabled = false,
  quizzes = [],
  onCreateQuiz,
  onEditQuiz,
  onDeleteQuiz
}: CourseVideosManagerProps) {
  const api = useApi();

  // Playlist import states
  const [playlistUrl, setPlaylistUrl] = useState(externalPlaylistUrl || "");
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideo[]>([]);
  const [selectedVideoIds, setSelectedVideoIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);

  // Single video add states
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [addingVideo, setAddingVideo] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);

  React.useEffect(() => {
    if (externalPlaylistUrl !== undefined && externalPlaylistUrl !== playlistUrl) {
      setPlaylistUrl(externalPlaylistUrl);
    }
  }, [externalPlaylistUrl]);

  // Load playlist videos page
  const loadPlaylistVideos = async (page: number = 1) => {
    if (!playlistUrl.trim()) return;
    setLoadingPlaylist(true);
    try {
      const data = await courseAPI.getPlaylistVideos(playlistUrl.trim(), page, api);
      setPlaylistVideos(data.videos);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch {
      alert("Failed to load playlist videos");
    } finally {
      setLoadingPlaylist(false);
    }
  };

  // Toggle video selection from playlist
  const toggleSelectVideo = (videoId: string) => {
    setSelectedVideoIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) newSet.delete(videoId);
      else newSet.add(videoId);
      return newSet;
    });
  };

  // Add selected playlist videos to course
  const addSelectedVideos = async () => {
    const selectedVideos = playlistVideos.filter((v) => selectedVideoIds.has(v.videoId));
    if (selectedVideos.length === 0) {
      alert("Select at least one video");
      return;
    }

    try {
      // Add videos to course via API
      await courseAPI.addVideosFromPlaylist(courseId, selectedVideos.map(v => ({
        videoUrl: v.videoUrl || `https://youtu.be/${v.videoId}`,
        title: v.title,
        description: v.description,
        duration: v.duration,
        thumbnailUrl: v.thumbnailUrl,
        platform: v.platform
      })), api);

      // Refresh videos list
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos || []);

      // Reset playlist UI
      setPlaylistUrl("");
      setPlaylistVideos([]);
      setSelectedVideoIds(new Set());
      setCurrentPage(1);
      setTotalPages(1);
    } catch {
      alert("Failed to add selected videos");
    }
  };

  // Add single video from URL
  const addSingleVideo = async () => {
    if (!videoUrl.trim()) {
      alert("Video URL is required");
      return;
    }
    setAddingVideo(true);
    try {
      const videoData = {
        videoUrl: videoUrl.trim(),
        title: videoTitle.trim() || undefined,
        platform: "youtube"
      };
      await courseAPI.addVideoToCourse(courseId, videoData, api);

      // Refresh videos list
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos || []);

      setVideoUrl("");
      setVideoTitle("");
      setShowAddVideo(false);
    } catch (error: any) {
      alert(error.message || "Failed to add video");
    } finally {
      setAddingVideo(false);
    }
  };

  // Delete video from course
  const deleteVideo = async (videoId: number) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await courseAPI.deleteVideoFromCourse(courseId, videoId, api);

      // Refresh videos list
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos || []);
    } catch (error: any) {
      alert(error.message || "Failed to delete video");
    }
  };

  // Reorder videos via drag and drop
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    // Update UI
    onVideosUpdated(reorderedVideos);

    try {
      const videoOrders = reorderedVideos.map((video, index) => ({
        videoId: video.video.id,
        order: index + 1
      }));

      await courseAPI.reorderVideos(courseId, videoOrders, api);
    } catch (error) {
      // Revert UI on error
      onVideosUpdated(videos);
      alert("Failed to reorder videos");
    }
  };

  const addEntirePlaylist = async () => {
    if (!playlistUrl.trim()) {
      alert("Please enter a playlist URL");
      return;
    }
    try {
      setLoadingPlaylist(true);
      await courseAPI.addEntirePlaylist(courseId, { playlistUrl }, api);
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos || []);
      setPlaylistUrl('');
      setPlaylistVideos([]);
    } catch {
      alert("Failed to add entire playlist videos");
    } finally {
      setLoadingPlaylist(false);
    }
  };

  async function addVideos(videosToAdd: PlaylistVideo[]) {
    if (videosToAdd.length === 0) {
      alert("No videos selected to add");
      return;
    }
    try {
      await courseAPI.addVideosFromPlaylist(
        courseId,
        videosToAdd.map((v) => ({
          videoUrl: v.videoUrl ?? `https://youtu.be/${v.videoId}`,
          title: v.title,
          description: v.description,
          duration: v.duration,
          thumbnailUrl: v.thumbnailUrl,
          platform: v.platform,
        })),
        api
      );

      // Refresh course videos list
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos ?? []);

      setPlaylistVideos([]);
      setSelectedVideoIds(new Set());
      setPlaylistUrl("");
    } catch (err) {
      alert("Failed to add chosen videos");
    }
  }

  // Calculate total duration
  const totalDuration = videos.reduce((total, cv) => total + (cv.video?.duration || 0), 0);

  return (
    <div className="space-y-6">
      {/* Playlist Import Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Import Videos from YouTube Playlist</h3>
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="YouTube Playlist URL"
            className="input flex-grow"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            disabled={disabled || loadingPlaylist}
          />
          <button
            onClick={() => loadPlaylistVideos(1)}
            disabled={disabled || loadingPlaylist || !playlistUrl.trim()}
            className="btn btn-secondary"
          >
            {loadingPlaylist ? "Loading..." : "Load Playlist"}
          </button>
        </div>

        {playlistVideos.length > 0 && (
          <div className="playlist-selector p-4 border rounded space-y-4">
            <div className="video-list max-h-64 overflow-auto">
              {playlistVideos.map((video) => (
                <label key={video.videoId} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedVideoIds.has(video.videoId)}
                    onChange={() => toggleSelectVideo(video.videoId)}
                    disabled={disabled}
                    className="form-checkbox"
                  />
                  <img src={video.thumbnailUrl} alt={video.title} className="w-20 rounded" />
                  <div>
                    <p className="font-semibold">{video.title}</p>
                    <p className="text-sm text-gray-500">{formatDuration(video.duration)}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination flex justify-between">
              <button
                disabled={currentPage <= 1 || loadingPlaylist || disabled}
                onClick={() => loadPlaylistVideos(currentPage - 1)}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span>
                Page {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages || loadingPlaylist || disabled}
                onClick={() => loadPlaylistVideos(currentPage + 1)}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => addVideos(playlistVideos)}
                disabled={loadingPlaylist || !playlistVideos.length}
                className="btn btn-primary"
              >
                Add All Videos in This Page
              </button>

              <button
                onClick={addEntirePlaylist}
                disabled={loadingPlaylist || !playlistVideos.length}
                className="btn btn-secondary"
              >
                Add All Videos in Playlist
              </button>
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={addSelectedVideos}
              disabled={loadingPlaylist || disabled || selectedVideoIds.size === 0}
            >
              Add Selected Videos
            </button>
          </div>
        )}
      </div>

      {/* Single Video Add Section */}
      <div>
        <label className="block font-medium mb-2">Add Single Video</label>
        {!showAddVideo ? (
          <button
            onClick={() => setShowAddVideo(true)}
            className="btn btn-outline"
            disabled={disabled}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Single Video
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Video URL"
              className="input w-full"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={disabled || addingVideo}
            />
            <input
              type="text"
              placeholder="Video Title (optional)"
              className="input w-full"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              disabled={disabled || addingVideo}
            />
            <div className="flex space-x-2">
              <button
                onClick={addSingleVideo}
                disabled={disabled || addingVideo || !videoUrl.trim()}
                className="btn btn-primary"
              >
                {addingVideo ? "Adding..." : "Add Video"}
              </button>
              <button
                onClick={() => {
                  setShowAddVideo(false);
                  setVideoUrl("");
                  setVideoTitle("");
                }}
                disabled={disabled || addingVideo}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Videos List Section with Quizzes */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Videos & Quizzes</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{videos.length} videos</span>
              <span>•</span>
              <span>{quizzes.length} quizzes</span>
              <span>•</span>
              <span>{formatDuration(totalDuration)} total duration</span>
            </div>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No videos in this course yet. Add some videos above.
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="videos-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {videos.map((courseVideo, index) => {
                    const video = courseVideo.video ?? courseVideo;
                    const videoId = video.id || video.videoId || `temp-${index}`;
                    const existingQuiz = quizzes.find(q => q.videoId === video.id);

                    return (
                      <Draggable key={videoId} draggableId={videoId.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition-shadow ${snapshot.isDragging ? "shadow-lg" : ""
                              }`}
                          >
                            {/* Drag Handle */}
                            <div {...provided.dragHandleProps} className="cursor-grab">
                              <GripVertical className="w-5 h-5" />
                            </div>

                            {/* Video Order Badge */}
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>

                            {/* Video Thumbnail */}
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="h-16 w-28 object-cover rounded"
                            />

                            {/* Video Details */}
                            <div className="flex-grow min-w-0">
                              <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">{video.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatDuration(video.duration)}</span>
                                <span>•</span>
                                <span>{video.platform}</span>
                              </div>

                              {/* Quiz Status */}
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs font-medium text-gray-600">Quiz:</span>
                                {existingQuiz ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <FileText className="w-3 h-3 mr-1" />
                                    {existingQuiz.questions.length} questions
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    No quiz
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-2">
                              {/* Video Actions */}
                              <div className="flex space-x-1 items-center">
                                <button
                                  onClick={() => deleteVideo(video.id ?? video.videoId)}
                                  className="flex items-center text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                  title="Delete Video"
                                  disabled={disabled}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  <span className="text-sm">Delete Video</span>
                                </button>
                              </div>

                              {/* Quiz Actions */}
                              <div className="flex space-x-1 items-center">
                                {existingQuiz ? (
                                  <>
                                    <button
                                      onClick={() => onEditQuiz(existingQuiz)}
                                      disabled={disabled}
                                      className="flex items-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                      title="Edit Quiz"
                                    >
                                      <Edit className="w-4 h-4 mr-1" />
                                      <span className="text-sm">Edit Quiz</span>
                                    </button>
                                    <button
                                      onClick={() => onDeleteQuiz(existingQuiz.id)}
                                      disabled={disabled}
                                      className="flex items-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                      title="Delete Quiz"
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      <span className="text-sm">Delete Quiz</span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => onCreateQuiz(video)}
                                    disabled={disabled}
                                    className="flex items-center p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                    title="Add Quiz"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    <span className="text-sm">Add Quiz</span>
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
