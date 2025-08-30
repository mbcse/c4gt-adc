import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Video as VideoIcon } from "lucide-react";
import { useAuth } from "@/shared/context/AuthContext";
import { courseAPI } from "@/api/courseAPI";
import { useApi } from "@/api/index";
import { AssignCourseModal } from "@/admin/components/AssignCourseModal";
import type { Course, Video } from "@/types";
import { useNavigate } from "react-router-dom";
import { AdminCourseWizard } from "@/admin/components/AdminCourseWizard";

export default function Courses() {
  const api = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [assignCourseModalCourseId, setAssignCourseModalCourseId] = useState<number | null>(null);
  const [videoModalCourseId, setVideoModalCourseId] = useState<number | null>(null);
  const [isCourseWizardOpen, setCourseWizardOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await courseAPI.getAllCourses(api, currentPage, 10);
        const coursesArray = Array.isArray(response.data) ? response.data : [];
        setCourses(coursesArray);
        setTotalCourses(response.total ?? 0);
        setCurrentPage(response.page ?? 1);
        setTotalPages(response.totalPages ?? 1);
      } catch (err: any) {
        setError(err.message || "Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [user, api, currentPage]);

  const openCreateCourseWizard = () => setCourseWizardOpen(true);

  const handleCourseSaved = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
    setCourseWizardOpen(false);
  };


  const handleVideoAdded = async (video: Video) => {
    if (videoModalCourseId === null) return;

    try {
      // Refetch fresh course data from backend API
      const updatedCourse = await courseAPI.getCourse(videoModalCourseId, api);

      // Update courses array with fresh data
      setCourses((prevCourses) =>
        prevCourses.map((c) => (c.id === videoModalCourseId ? updatedCourse : c))
      );
    } catch (error) {
      alert("Failed to refresh course data after adding video");
    } finally {
      // Close the video modal
      setVideoModalCourseId(null);
    }
  };



  const deleteCourse = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseAPI.deleteCourse(id, api);
      setCourses((courses) => courses.filter((c) => c.id !== id));
    } catch (error: any) {
      alert(error.message || "Failed to delete course");
    }
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
            Course Management
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button onClick={openCreateCourseWizard} className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[300px] text-gray-500">
          Loading courses...
        </div>
      )}
      {error && (
        <div className="text-red-600 text-center py-8">
          <p>Error loading courses: {error}</p>
        </div>
      )}

      {!isLoading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <VideoIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first course.
          </p>
          <button className="btn btn-primary" onClick={openCreateCourseWizard}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      )}

      {!isLoading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/admin/courses/${course.id}`)} // Add this click handler
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <VideoIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                <img
                  src={course.thumbnailUrl || "/placeholder-thumbnail.png"}
                  alt={course.title}
                  className="absolute inset-0 object-cover w-full h-full opacity-30 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {course.category?.name || "Uncategorized"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {course.description}
                </p>
                {course.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block text-xs px-2 py-1 bg-gray-200 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mb-1 text-sm text-gray-500">
                  {course.skillLevel?.level && <span>Skill: {course.skillLevel.level} </span>}
                  {course.grade?.value && <span>• Grade: {course.grade.value} </span>}
                  {course.language?.name && <span>• Language: {course.language.name}</span>}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <VideoIcon className="w-4 h-4 mr-1" />
                    <span>
                      {course.courseVideos?.length ?? 0} videos
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAssignCourseModalCourseId(course.id);
                    }}
                    className="btn btn-sm btn-outline"
                  >
                    <Edit className="mr-1" /> Assign Course
                  </button>

                  <button
                    className="btn btn-danger flex-1 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCourse(course.id);
                    }}
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Add/Edit Modal */}
      <AdminCourseWizard
        isOpen={isCourseWizardOpen}
        onClose={() => setCourseWizardOpen(false)}
        onSaved={handleCourseSaved}
      />

      {assignCourseModalCourseId !== null && (
        <AssignCourseModal
          courseId={assignCourseModalCourseId}
          onClose={() => setAssignCourseModalCourseId(null)}
        />
      )}

    </div>
  );
}
