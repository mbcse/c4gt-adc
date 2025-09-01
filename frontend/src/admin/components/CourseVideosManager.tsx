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
  const [playlistUrl, setPlaylistUrl] = useState(externalPlaylistUrl || "");
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideo[]>([]);
  const [selectedVideoIds, setSelectedVideoIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [addingVideo, setAddingVideo] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);

  React.useEffect(() => {
    if (externalPlaylistUrl !== undefined && externalPlaylistUrl !== playlistUrl) {
      setPlaylistUrl(externalPlaylistUrl);
    }
  }, [externalPlaylistUrl]);

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

  const toggleSelectVideo = (videoId: string) => {
    setSelectedVideoIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) newSet.delete(videoId);
      else newSet.add(videoId);
      return newSet;
    });
  };

  const addSelectedVideos = async () => {
    const selectedVideos = playlistVideos.filter((v) => selectedVideoIds.has(v.videoId));
    if (selectedVideos.length === 0) {
      alert("Select at least one video");
      return;
    }
    try {
      await courseAPI.addVideosFromPlaylist(courseId, selectedVideos.map(v => ({
        videoUrl: v.videoUrl || `https://youtu.be/${v.videoId}`,
        title: v.title,
        description: v.description,
        duration: v.duration,
        thumbnailUrl: v.thumbnailUrl,
        platform: v.platform
      })), api);
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos || []);
      setPlaylistUrl("");
      setPlaylistVideos([]);
      setSelectedVideoIds(new Set());
      setCurrentPage(1);
      setTotalPages(1);
    } catch {
      alert("Failed to add selected videos");
    }
  };

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

  const deleteVideo = async (videoId: number) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await courseAPI.deleteVideoFromCourse(courseId, videoId, api);
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos || []);
    } catch (error: any) {
      alert(error.message || "Failed to delete video");
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);
    onVideosUpdated(reorderedVideos);
    try {
      const videoOrders = reorderedVideos.map((video, index) => ({
        videoId: video.video.id,
        order: index + 1
      }));
      await courseAPI.reorderVideos(courseId, videoOrders, api);
    } catch (error) {
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
      const updatedCourse = await courseAPI.getCourse(courseId, api);
      onVideosUpdated(updatedCourse.courseVideos ?? []);
      setPlaylistVideos([]);
      setSelectedVideoIds(new Set());
      setPlaylistUrl("");
    } catch (err) {
      alert("Failed to add chosen videos");
    }
  }

  const totalDuration = videos.reduce((total, cv) => total + (cv.video?.duration || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Import Videos from YouTube Playlist</h3>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
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
            className="btn btn-secondary w-full sm:w-auto"
          >
            {loadingPlaylist ? "Loading..." : "Load Playlist"}
          </button>
        </div>

        {playlistVideos.length > 0 && (
          <div className="playlist-selector p-4 border rounded space-y-4">
            <div className="video-list max-h-64 overflow-y-auto space-y-3">
              {playlistVideos.map((video) => (
                <label key={video.videoId} className="flex items-start sm:items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedVideoIds.has(video.videoId)}
                    onChange={() => toggleSelectVideo(video.videoId)}
                    disabled={disabled}
                    className="form-checkbox mt-1 sm:mt-0"
                  />
                  <img src={video.thumbnailUrl} alt={video.title} className="w-16 sm:w-20 rounded flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base break-words">{video.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{formatDuration(video.duration)}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="pagination flex flex-col sm:flex-row justify-between items-center gap-2">
              <button
                disabled={currentPage <= 1 || loadingPlaylist || disabled}
                onClick={() => loadPlaylistVideos(currentPage - 1)}
                className="btn btn-secondary w-full sm:w-auto"
              >
                Previous
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages || loadingPlaylist || disabled}
                onClick={() => loadPlaylistVideos(currentPage + 1)}
                className="btn btn-secondary w-full sm:w-auto"
              >
                Next
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
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
          <div className="space-y-2 p-4 border rounded-lg bg-gray-50">
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
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={addSingleVideo}
                disabled={disabled || addingVideo || !videoUrl.trim()}
                className="btn btn-primary w-full sm:w-auto"
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
                className="btn btn-outline w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-lg font-semibold">Videos & Quizzes</h3>
            <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-600">
              <span>{videos.length} videos</span>
              <span className="hidden sm:inline">•</span>
              <span>{quizzes.length} quizzes</span>
              <span className="hidden sm:inline">•</span>
              <span>{formatDuration(totalDuration)} total duration</span>
            </div>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
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
                            className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-3 md:p-4 bg-white border rounded-lg hover:shadow-md transition-shadow ${snapshot.isDragging ? "shadow-lg" : ""}`}
                          >
                            <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
                                <div {...provided.dragHandleProps} className="cursor-grab text-gray-400">
                                  <GripVertical className="w-5 h-5" />
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                                <img
                                  src={video.thumbnailUrl}
                                  alt={video.title}
                                  className="h-12 w-20 md:h-16 md:w-28 object-cover rounded"
                                />
                            </div>
                            
                            <div className="flex-grow min-w-0 w-full md:w-auto">
                              <h4 className="font-medium text-gray-900 break-words mb-1">{video.title}</h4>
                              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                                <span>{formatDuration(video.duration)}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="capitalize">{video.platform}</span>
                              </div>
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
                            
                            <div className="flex flex-col items-start gap-2 w-full md:w-auto md:ml-auto">
                              <div className="flex flex-wrap gap-2 items-center">
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