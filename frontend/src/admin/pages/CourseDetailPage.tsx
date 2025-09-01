import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useAuth } from "@/shared/context/AuthContext";
import { courseAPI } from "@/api/courseAPI";
import { quizAPI } from "@/api/quizAPI";
import { useApi } from "@/api/index";
import { CourseMetadataForm } from "../components/CourseMetadataForm";
import { CourseVideosManager } from "../components/CourseVideosManager";
import { AdminQuizModal } from "../components/AdminQuizModal";
import type { Course, Quiz, Video } from "@/types/index";
import { formatDuration } from "@/utils/format";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useApi();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit mode toggle for metadata 
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [saving, setSaving] = useState(false);

  // Quiz management states
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Metadata form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [skillLevelId, setSkillLevelId] = useState<number | "">("");
  const [gradeId, setGradeId] = useState<number | "">("");
  const [languageId, setLanguageId] = useState<number | "">("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const loadQuizzes = async () => {
    if (!course?.id) return;
    try {
      const response = await quizAPI.getAllQuizzes(api, 1, 100, { courseId: course.id });
      setQuizzes(response.data || []);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    }
  };

  useEffect(() => {
    if (!id || !user) return;
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const courseData = await courseAPI.getCourse(parseInt(id), api);
        setCourse(courseData);
        setTitle(courseData.title || "");
        setDescription(courseData.description || "");
        setThumbnailUrl(courseData.thumbnailUrl || "");
        setCategoryId(courseData.category?.id ?? "");
        setSkillLevelId(courseData.skillLevel?.id ?? "");
        setGradeId(courseData.grade?.id ?? "");
        setLanguageId(courseData.language?.id ?? "");
        setSelectedTagIds(courseData.tags?.map((t) => t.id) || []);
      } catch (err: any) {
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, api, user]);

  useEffect(() => {
    if (course?.id) {
      loadQuizzes();
    }
  }, [course?.id]);

  const handleCreateQuiz = (video: Video) => {
    setEditingQuiz(null);
    setSelectedVideo(video);
    setQuizModalOpen(true);
  };
  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setQuizModalOpen(true);
  };

  const handleQuizSaved = () => {
    loadQuizzes();
    setQuizModalOpen(false);
    setEditingQuiz(null);
  };

  const handleDeleteQuiz = async (quizId: number) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await quizAPI.deleteQuiz(quizId, api);
      loadQuizzes();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete quiz");
    }
  };

  const handleSaveMetadata = async () => {
    if (!course) return;
    setSaving(true);
    try {
      const payload = {
        title,
        description,
        thumbnailUrl: thumbnailUrl || undefined,
        categoryId: categoryId === "" ? undefined : categoryId,
        skillLevelId: skillLevelId === "" ? undefined : skillLevelId,
        gradeId: gradeId === "" ? undefined : gradeId,
        languageId: languageId === "" ? undefined : languageId,
        tagIds: selectedTagIds,
      };
      const updatedCourse = await courseAPI.updateCourse(course.id, payload, api);
      setCourse(updatedCourse);
      setIsEditingMetadata(false);
    } catch (error: any) {
      alert(error.message || "Failed to save course metadata");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (!course) return;
    setTitle(course.title || "");
    setDescription(course.description || "");
    setThumbnailUrl(course.thumbnailUrl || "");
    setCategoryId(course.category?.id ?? "");
    setSkillLevelId(course.skillLevel?.id ?? "");
    setGradeId(course.grade?.id ?? "");
    setLanguageId(course.language?.id ?? "");
    setSelectedTagIds(course.tags?.map((t) => t.id) || []);
    setIsEditingMetadata(false);
  };

  const handleVideosUpdated = (updatedVideos: any[]) => {
    setCourse((prev) => (prev ? { ...prev, courseVideos: updatedVideos } : null));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading course...</div>;
  }
  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <p className="mb-4 text-red-600">{error || "Course not found"}</p>
        <button onClick={() => navigate("/admin/courses")} className="btn btn-outline">
          Back to Courses
        </button>
      </div>
    );
  }

  function ReadOnlyVideosList({ videos }: { videos: Course['courseVideos'] }) {
    if (!videos || videos.length === 0) return <p>No videos in this course.</p>;
    return (
      <ul className="space-y-2 list-disc list-inside text-gray-700">
        {videos.map(cv => (
          <li key={cv.id} className="break-words">
            {cv.video.title} ({formatDuration(cv.video.duration)})
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate("/admin/courses")}
          className="btn btn-outline w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </button>
        {!isEditingMetadata ? (
          <button
            onClick={() => setIsEditingMetadata(true)}
            className="btn btn-primary w-full sm:w-auto"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Metadata
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <button
              onClick={handleCancelEdit}
              disabled={saving}
              className="btn btn-outline w-full sm:w-auto"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSaveMetadata}
              disabled={saving || !title.trim()}
              className="btn btn-primary w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Metadata"}
            </button>
          </div>
        )}
      </div>

      {/* Metadata form or read-only display */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        {!isEditingMetadata ? (
          <div className="space-y-4">
            {course.thumbnailUrl ? (
              <div className="mb-4">
                <img
                  src={course.thumbnailUrl}
                  alt={`${course.title} Thumbnail`}
                  className="rounded shadow-md w-full max-w-xs"
                />
              </div>
            ) : (
              <p className="text-gray-500">No course thumbnail available.</p>
            )}
            <h2 className="text-xl font-semibold">Course Information</h2>
            <div>
                <strong className="block text-gray-800">Title:</strong>
                <p className="break-words">{course.title}</p>
            </div>
            <div>
                <strong className="block text-gray-800">Description:</strong>
                <p className="break-words">{course.description}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4">
              <label htmlFor="thumbnailUrl" className="block font-medium mb-1">
                Course Thumbnail URL
              </label>
              <input
                type="text"
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                disabled={saving}
                className="w-full border rounded p-2"
                placeholder="https://example.com/image.png"
              />
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="mt-2 w-full max-w-[200px] rounded shadow"
                />
              )}
            </div>
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
              disabled={saving}
            />
          </div>
        )}
      </div>

      {/* Video Management and Quiz*/}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        {!isEditingMetadata ? (
          <div className="overflow-x-auto">
            <CourseVideosManager
              courseId={course.id}
              videos={course.courseVideos || []}
              onVideosUpdated={handleVideosUpdated}
              disabled={saving}
              quizzes={quizzes}
              onCreateQuiz={handleCreateQuiz}
              onEditQuiz={handleEditQuiz}
              onDeleteQuiz={handleDeleteQuiz}
            />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Videos in this course</h3>
            <ReadOnlyVideosList videos={course.courseVideos || []} />
          </div>
        )}
      </div>

      {/* Admin Quiz Modal */}
      <AdminQuizModal
        isOpen={quizModalOpen}
        onClose={() => {
          setQuizModalOpen(false);
          setEditingQuiz(null);
          setSelectedVideo(null);
        }}
        onQuizSaved={handleQuizSaved}
        courseId={course.id}
        editingQuiz={editingQuiz}
        selectedVideo={selectedVideo}
      />
    </div>
  );
}