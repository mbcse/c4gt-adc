import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useAuth } from "@/shared/context/AuthContext";
import { courseAPI } from "@/api/courseAPI";
import { useApi } from "@/api/index";
import { CourseMetadataForm } from "../components/CourseMetadataForm";
import { CourseVideosManager } from "../components/CourseVideosManager";
import type { Course } from "@/types/index";
import { formatDuration } from "@/utils/format";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useApi();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit mode toggle for metadata only
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [saving, setSaving] = useState(false);

  // Metadata form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [skillLevelId, setSkillLevelId] = useState<number | "">("");
  const [gradeId, setGradeId] = useState<number | "">("");
  const [languageId, setLanguageId] = useState<number | "">("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

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
        setCategoryId(courseData.category?.id ?? courseData.category?.id ?? "");
        setSkillLevelId(courseData.skillLevel?.id ?? courseData.skillLevel?.id ?? "");
        setGradeId(courseData.grade?.id ?? courseData.grade?.id ?? "");
        setLanguageId(courseData.language?.id ?? courseData.language?.id ?? "");
        setSelectedTagIds(courseData.tags?.map((t) => t.id) || []);
      } catch (err: any) {
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, api, user]);

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
    return <div>Loading course...</div>;
  }
  if (error || !course) {
    return (
      <div>
        <p>{error || "Course not found"}</p>
        <button onClick={() => navigate("/admin/courses")}>Back to Courses</button>
      </div>
    );
  }

  function ReadOnlyVideosList({ videos }: { videos: Course['courseVideos'] }) {
  if (!videos || videos.length === 0) return <p>No videos in this course.</p>;

  return (
    <ul className="space-y-2 list-disc list-inside text-gray-700">
      {videos.map(cv => (
        <li key={cv.id}>
          {cv.video.title} ({formatDuration(cv.video.duration)})
        </li>
      ))}
    </ul>
  );
}


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/courses")}
          className="btn btn-outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </button>
        {!isEditingMetadata ? (
          <button
            onClick={() => setIsEditingMetadata(true)}
            className="btn btn-primary"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Metadata
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancelEdit}
              disabled={saving}
              className="btn btn-outline"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSaveMetadata}
              disabled={saving || !title.trim()}
              className="btn btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Metadata"}
            </button>
          </div>
        )}
      </div>

      {/* Metadata form or read-only display */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {!isEditingMetadata ? (
  <>
    {course.thumbnailUrl ? (
      <div className="mb-4">
        <img
          src={course.thumbnailUrl}
          alt={`${course.title} Thumbnail`}
          className="rounded shadow-md max-w-xs"
        />
      </div>
    ) : (
      <p>No course thumbnail available</p>
    )}

    <h2 className="text-xl font-semibold mb-4">Course Information</h2>
    <p><strong>Title:</strong> {course.title}</p>
    <p><strong>Description:</strong> {course.description}</p>
  </>
) : (
  <>
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
        placeholder="Enter thumbnail URL"
      />
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Thumbnail Preview"
          className="mt-2 w-40 rounded shadow"
        />
      )}
    </div>
    {/* Place the existing CourseMetadataForm below */}
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
  </>
)}

      </div>

      {/* Conditionally render video management or read-only based on edit mode */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {!isEditingMetadata ? (
          <CourseVideosManager
            courseId={course.id}
            videos={course.courseVideos || []}
            onVideosUpdated={handleVideosUpdated}
            disabled={saving}
          />
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Videos in this course</h3>
            <ReadOnlyVideosList videos={course.courseVideos || []} />
          </div>
        )}
      </div>
    </div>
  );
}
