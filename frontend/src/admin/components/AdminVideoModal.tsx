import React, { useState } from "react";
import { useApi } from "@/api/index";
import { courseAPI } from "@/api/courseAPI";

export function AdminVideoModal({
  isOpen,
  onClose,
  onVideoAdded,
  courseId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onVideoAdded: (video: any) => void;
  courseId: number;
}) {
  const api = useApi();

  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [duration, setDuration] = useState<number | "">(0);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setVideoUrl("");
    setTitle("");
    setPlatform("youtube");
    setDuration(0);
  };

  const handleSubmit = async () => {
    if (!videoUrl.trim()) {
      alert("Video URL is required");
      return;
    }
    setLoading(true);
    try {
      const videoData = {
        videoUrl: videoUrl.trim(),
        title: title.trim(),
        platform: platform.trim() || "youtube",
        duration: typeof duration === "number" ? duration : 0,
      };
      const addedVideo = await courseAPI.addVideoToCourse(courseId, videoData, api);
      onVideoAdded(addedVideo);
      resetForm();
      onClose();
    } catch (error: any) {
      alert(error.message || "Failed to add video");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Add Video</h2>

        <input
          type="text"
          placeholder="Video URL"
          className="input w-full mb-3"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Title (optional)"
          className="input w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Platform (default: youtube)"
          className="input w-full mb-3"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Duration (seconds, optional)"
          className="input w-full mb-6"
          value={duration === 0 ? "" : duration}
          min={0}
          onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value, 10) : "")}
          disabled={loading}
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} disabled={loading} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="btn btn-primary">
            {loading ? "Adding..." : "Add Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
