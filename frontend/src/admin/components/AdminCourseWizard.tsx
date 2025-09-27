// AdminCourseWizard.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CourseMetadataForm } from "../components/CourseMetadataForm";
import { CourseVideosManager } from "../components/CourseVideosManager";
import { AdminQuizModal } from "../components/AdminQuizModal";
import { courseAPI } from "@/api/courseAPI";
import { quizAPI } from "@/api/quizAPI";
import { useApi } from "@/api";
import type { Quiz, Video } from "@/types";

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

  // Videos state
  const [videos, setVideos] = useState<any[]>([]);

  // Backend created course
  const [savedCourse, setSavedCourse] = useState<any | null>(null);

  // Quiz management states
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Loading states for API calls
  const [loading, setLoading] = useState(false);

  // Load quizzes when savedCourse is available
  useEffect(() => {
    if (!savedCourse?.id) return;

    const loadQuizzes = async () => {
      try {
        const response = await quizAPI.getAllQuizzes(api, 1, 100, { courseId: savedCourse.id });
        setQuizzes(response.data || []);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    loadQuizzes();
  }, [savedCourse?.id, api]);

  // Load playlist, autofill metadata
  const loadPlaylist = async () => {
    if (!playlistUrl.trim()) return;
    setLoadingPlaylist(true);
    try {
      const data = await courseAPI.processPlaylist(playlistUrl.trim(), api);
      setTitle(data.playlistTitle || "");
      setDescription(data.playlistDescription || "");
      setThumbnailUrl(data.playlistThumbnailUrl || "");
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

  // Step 2: Add videos and quizzes

  // Videos handler
  const handleVideosUpdated = async () => {
    if (!savedCourse?.id) return;
    try {
      const updatedCourse = await courseAPI.getCourse(savedCourse.id, api);
      setVideos(updatedCourse.courseVideos || []);
      const response = await quizAPI.getAllQuizzes(api, 1, 100, { courseId: savedCourse.id });
      setQuizzes(response.data || []);
    } catch (error) {
      console.error("Failed to refresh videos:", error);
    }
  };

  // Quiz management handlers
  const handleCreateQuiz = (video: Video) => {
    setEditingQuiz(null);
    setSelectedVideo(video);
    setQuizModalOpen(true);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setSelectedVideo(null);
    setQuizModalOpen(true);
  };

  const handleQuizSaved = async (savedQuiz: Quiz) => {
    try {
      const response = await quizAPI.getAllQuizzes(api, 1, 100, { courseId: savedCourse.id });
      setQuizzes(response.data || []);
    } catch (error) {
      console.error("Failed to refresh quizzes:", error);
    }

    setQuizModalOpen(false);
    setEditingQuiz(null);
    setSelectedVideo(null);
  };

  const handleDeleteQuiz = async (quizId: number) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await quizAPI.deleteQuiz(quizId, api);
      const response = await quizAPI.getAllQuizzes(api, 1, 100, { courseId: savedCourse.id });
      setQuizzes(response.data || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete quiz");
    }
  };

  // Step 3: Finalize course 
  const handleFinishCourse = async () => {
    if (!savedCourse) return;
    setLoading(true);
    try {
      // Get the final updated course
      const updatedCourse = await courseAPI.getCourse(savedCourse.id, api);
      onSaved(updatedCourse);
      handleClose();
    } catch (e: any) {
      alert(e.message || "Failed to finalize course");
    } finally {
      setLoading(false);
    }
  };

  // Cancel/cleanup handler
  const handleCancel = async () => {
    const hasUnsavedWork = savedCourse && (videos.length > 0 || quizzes.length > 0);

    if (hasUnsavedWork) {
      const confirmed = window.confirm(
        "Are you sure you want to cancel? This will delete the partially created course and all its content."
      );
      if (!confirmed) return;
    }

    // Cleanup partial course if it exists
    if (savedCourse?.id) {
      try {
        await courseAPI.deleteCourse(savedCourse.id, api);
      } catch (error) {
        console.warn("Failed to cleanup partial course:", error);
      }
    }

    handleClose();
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
    setQuizzes([]);
    setQuizModalOpen(false);
    setEditingQuiz(null);
    setSelectedVideo(null);
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

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Create New Course</h1>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wizard Navigation */}
        <div className="flex space-x-4 mb-6">
          <span
            className={`${step === 1 ? "font-bold text-blue-600" : savedCourse ? "cursor-pointer hover:text-blue-600" : "text-gray-400"}`}
            onClick={() => savedCourse && setStep(1)}
          >
            1. Metadata
          </span>
          <span
            className={`${step === 2 ? "font-bold text-blue-600" : savedCourse ? "cursor-pointer hover:text-blue-600" : "text-gray-400"}`}
            onClick={() => savedCourse && setStep(2)}
          >
            2. Videos & Quizzes
          </span>
          <span
            className={`${step === 3 ? "font-bold text-blue-600" : savedCourse ? "cursor-pointer hover:text-blue-600" : "text-gray-400"}`}
            onClick={() => savedCourse && setStep(3)}
          >
            3. Review
          </span>
        </div>

        {/* Step 1: Metadata */}
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

            <div className="flex justify-between">
              <button onClick={handleCancel} className="btn btn-outline" disabled={loading}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveMetadata}
                disabled={loading || !title.trim()}
              >
                {loading ? "Creating..." : "Next"}
              </button>
            </div>
          </>
        )}

        {/* Step 2: Videos & Quizzes */}
        {step === 2 && savedCourse && (
          <>
            <h2 className="text-xl font-semibold mb-4">Manage Videos & Quizzes</h2>
            <p className="text-gray-600 mb-4">
              Add videos to your course and create quizzes for each video. Videos are saved immediately when added.
            </p>

            <CourseVideosManager
              courseId={savedCourse.id}
              videos={videos}
              onVideosUpdated={handleVideosUpdated}
              playlistUrl={playlistUrl}
              disabled={loading}
              quizzes={quizzes}
              onCreateQuiz={handleCreateQuiz}
              onEditQuiz={handleEditQuiz}
              onDeleteQuiz={handleDeleteQuiz}
            />

            <div className="flex justify-between mt-6">
              <button onClick={handleCancel} className="btn btn-outline" disabled={loading}>
                Cancel
              </button>
              <div className="flex space-x-2">
                <button className="btn btn-outline" onClick={() => setStep(1)} disabled={loading}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={() => setStep(3)} disabled={loading}>
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {step === 3 && savedCourse && (
          <>
            <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Course Details</h3>
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Description:</strong> {description || "(No description)"}</p>
              <p><strong>Thumbnail URL:</strong> {thumbnailUrl || "(No thumbnail)"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Content Summary</h3>
              <p><strong>Videos:</strong> {videos.length} added</p>
              <p><strong>Quizzes:</strong> {quizzes.length} created</p>
              {quizzes.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Total quiz questions: {quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
                </p>
              )}
            </div>

            {videos.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-yellow-800">
                  <strong>Note:</strong> This course doesn't have any videos yet. You can add videos later from the course detail page.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={handleCancel} className="btn btn-outline" disabled={loading}>
                Cancel
              </button>
              <div className="flex space-x-2">
                <button className="btn btn-outline" onClick={() => setStep(2)} disabled={loading}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={handleFinishCourse} disabled={loading}>
                  {loading ? "Finalizing..." : "Create Course"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Quiz Modal */}
        <AdminQuizModal
          isOpen={quizModalOpen}
          onClose={() => {
            setQuizModalOpen(false);
            setEditingQuiz(null);
            setSelectedVideo(null);
          }}
          onQuizSaved={handleQuizSaved}
          courseId={savedCourse?.id || 0}
          editingQuiz={editingQuiz}
          selectedVideo={selectedVideo}
        />
      </div>
    </div>
  );
}
