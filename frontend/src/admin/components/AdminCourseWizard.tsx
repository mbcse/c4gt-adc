// AdminCourseWizard.tsx
import React, { useState } from "react";
import { CourseMetadataForm } from "../components/CourseMetadataForm";
import { CourseVideosManager } from "../components/CourseVideosManager";
import { courseAPI } from "@/api/courseAPI";
import { useApi } from "@/api";

export function AdminCourseWizard({
  isOpen,
  onClose,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (course: any) => void;
}) {
  const api = useApi();

  // Wizard step state
  const [step, setStep] = useState(1);

  // Playlist URL + loading state
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);

  // Metadata state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [skillLevelId, setSkillLevelId] = useState<number | "">("");
  const [gradeId, setGradeId] = useState<number | "">("");
  const [languageId, setLanguageId] = useState<number | "">("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  // Videos state (local, editable in step 2)
  const [videos, setVideos] = useState<any[]>([]);

  // Backend created course
  const [savedCourse, setSavedCourse] = useState<any | null>(null);

  // Loading states for API calls
  const [loading, setLoading] = useState(false);

  // Load playlist: autofill metadata (do NOT load videos)
  const loadPlaylist = async () => {
    if (!playlistUrl.trim()) return;
    setLoadingPlaylist(true);
    try {
      const data = await courseAPI.processPlaylist(playlistUrl.trim(), api);
      setTitle(data.playlistTitle || "");
      setDescription(data.playlistDescription || "");
      setThumbnailUrl(data.playlistThumbnailUrl || "");
      // Don't set videos here to prevent loading all videos upfront
    } catch {
      alert("Failed to load playlist");
    } finally {
      setLoadingPlaylist(false);
    }
  };

  // Step 1: Save metadata (create course)
  const handleSaveMetadata = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        thumbnailUrl,
        categoryId: categoryId || undefined,
        skillLevelId: skillLevelId || undefined,
        gradeId: gradeId || undefined,
        languageId: languageId || undefined,
        tagIds: selectedTagIds,
      };
      const newCourse = await courseAPI.createCourse(payload, api);
      setSavedCourse(newCourse);
      setStep(2);
    } catch (e: any) {
      alert(e.message || "Failed to save course metadata");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Final save videos to backend
  const handleFinishVideos = async () => {
    if (!savedCourse) return;
    setLoading(true);
    try {
      for (const video of videos) {
        const videoPayload = {
          videoUrl: video.videoUrl,
          title: video.title,
          description: video.description,
          duration: video.duration,
          thumbnailUrl: video.thumbnailUrl,
          platform: video.platform || "youtube",
        };
        await courseAPI.addVideoToCourse(savedCourse.id, videoPayload, api);
      }
      const updatedCourse = await courseAPI.getCourse(savedCourse.id, api);
      onSaved(updatedCourse);
      handleClose();
    } catch (e: any) {
      alert(e.message || "Failed to save videos");
    } finally {
      setLoading(false);
    }
  };

  // Reset wizard state on close
  const resetWizard = () => {
    setStep(1);
    setPlaylistUrl("");
    setLoadingPlaylist(false);
    setTitle("");
    setDescription("");
    setThumbnailUrl("");
    setCategoryId("");
    setSkillLevelId("");
    setGradeId("");
    setLanguageId("");
    setSelectedTagIds([]);
    setVideos([]);
    setSavedCourse(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-auto max-h-[90vh]">

        {/* Wizard Navigation */}
        <div className="flex space-x-4 mb-6">
          <span className={step === 1 ? "font-bold" : "cursor-pointer"} onClick={() => setStep(1)}>
            1. Metadata
          </span>
          <span
            className={step === 2 ? "font-bold" : savedCourse ? "cursor-pointer" : "text-gray-400"}
            onClick={() => savedCourse && setStep(2)}
          >
            2. Videos
          </span>
          <span
            className={step === 3 ? "font-bold" : savedCourse ? "cursor-pointer" : "text-gray-400"}
            onClick={() => savedCourse && setStep(3)}
          >
            3. Review
          </span>
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Course Metadata</h2>

            <input
              type="text"
              placeholder="YouTube Playlist URL (optional)"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              className="input w-full mb-2"
              disabled={loadingPlaylist || loading}
            />
            <button
              onClick={loadPlaylist}
              disabled={loadingPlaylist || loading || !playlistUrl.trim()}
              className="btn btn-secondary mb-4"
            >
              {loadingPlaylist ? "Loading..." : "Load Playlist"}
            </button>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input w-full mb-3"
              disabled={loading}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea w-full mb-3"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="input w-full mb-3"
              disabled={loading}
            />

            <CourseMetadataForm
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              skillLevelId={skillLevelId}
              setSkillLevelId={setSkillLevelId}
              gradeId={gradeId}
              setGradeId={setGradeId}
              languageId={languageId}
              setLanguageId={setLanguageId}
              selectedTagIds={selectedTagIds}
              setSelectedTagIds={setSelectedTagIds}
              disabled={loading}
            />

            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                onClick={handleSaveMetadata}
                disabled={loading || !title.trim()}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && savedCourse && (
  <>
    <h2 className="text-xl font-semibold mb-4">Manage Videos</h2>

    <CourseVideosManager
      courseId={savedCourse.id}
      videos={videos}
      onVideosUpdated={setVideos}
      playlistUrl={playlistUrl}  
      disabled={loading}
    />

    <div className="flex justify-between mt-4">
      <button className="btn btn-outline" onClick={() => setStep(1)} disabled={loading}>
        Back
      </button>
      <button className="btn btn-primary" onClick={() => setStep(3)} disabled={loading}>
        Next
      </button>
    </div>
  </>
)}


        {step === 3 && savedCourse && (
          <>
            <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>

            <p>
              <strong>Title:</strong> {title}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Thumbnail URL:</strong> {thumbnailUrl || "(none)"}
            </p>
            <p>
              <strong>Number of Videos:</strong> {videos.length}
            </p>

            <div className="flex justify-between mt-4">
              <button className="btn btn-outline" onClick={() => setStep(2)} disabled={loading}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleFinishVideos} disabled={loading}>
                {loading ? "Saving..." : "Create Course"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
