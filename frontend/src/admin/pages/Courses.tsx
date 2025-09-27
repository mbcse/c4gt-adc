import React, { useEffect, useState } from 'react';
import {
  Plus,
  Play,
  Edit,
  Users,
  Video as VideoIcon,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/shared/context/AuthContext';
import { courseAPI } from '@/api/courseAPI';
import { assignmentAPI } from '@/api/assignmentAPI';
import { userAPI } from '@/api/userAPI';
import { useApi } from '@/api/index';
import AssignCourseModal from '../components/AssignCourseModal';

interface Video {
  id: number;
  title: string;
  platform: string;
  videoUrl: string;
  videoId: string;
  duration: number;
  createdAt: string;
}

interface CourseVideo {
  video: Video;
  order?: number;
}

interface Course {
  id: number;
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  courseVideos?: CourseVideo[];
}

export default function Courses() {
  const api = useApi();
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Course form state
  const [isCourseFormOpen, setCourseFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  // Video form state
  const [isVideoFormOpenForCourseId, setVideoFormOpenForCourseId] =
    useState<number | null>(null);
  const [videoFormData, setVideoFormData] = useState({
    videoUrl: '',
    title: '',
    platform: 'youtube',
    duration: 0,
  });

  // Assignment modal state
  const [assignModalCourseId, setAssignModalCourseId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await courseAPI.getAllCourses(api);
        setCourses(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [user, api]);

  // Course form handlers
  const handleCourseFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourseFormData({ ...courseFormData, [e.target.name]: e.target.value });
  };

  const openCreateCourseForm = () => {
    setEditingCourse(null);
    setCourseFormData({ title: '', description: '', category: '' });
    setCourseFormOpen(true);
  };

  const openEditCourseForm = (course: Course) => {
    setEditingCourse(course);
    setCourseFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
    });
    setCourseFormOpen(true);
  };

  const submitCourseForm = async () => {
    try {
      setIsLoading(true);
      if (editingCourse) {
        const updated = await courseAPI.updateCourse(
          editingCourse.id,
          courseFormData,
          api
        );
        setCourses(courses.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const created = await courseAPI.createCourse(courseFormData, api);
        setCourses([created, ...courses]);
      }
      setCourseFormOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to save course');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseAPI.deleteCourse(id, api);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (error: any) {
      alert(error.message || 'Failed to delete course');
    }
  };

  // Video form handlers
  const openVideoForm = (courseId: number) => {
    setVideoFormData({ videoUrl: '', title: '', platform: 'youtube', duration: 0 });
    setVideoFormOpenForCourseId(courseId);
  };

  const handleVideoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.name === 'duration' ? Number(e.target.value) : e.target.value;
    setVideoFormData({ ...videoFormData, [e.target.name]: val });
  };

  const submitVideoForm = async () => {
    if (isVideoFormOpenForCourseId === null) return;
    try {
      setIsLoading(true);
      const addedVideo = await courseAPI.addVideoToCourse(
        isVideoFormOpenForCourseId,
        videoFormData,
        api
      );
      setCourses((prev) =>
        prev.map((c) =>
          c.id === isVideoFormOpenForCourseId
            ? { ...c, courseVideos: [...(c.courseVideos || []), { video: addedVideo }] }
            : c
        )
      );
      setVideoFormOpenForCourseId(null);
    } catch (error: any) {
      alert(error.message || 'Failed to add video');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = async (courseId: number, videoId: number) => {
    if (!window.confirm('Delete this video from the course?')) return;
    try {
      await courseAPI.deleteVideoFromCourse(courseId, videoId, api);
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId
            ? { ...c, courseVideos: c.courseVideos?.filter((cv) => cv.video.id !== videoId) }
            : c
        )
      );
    } catch (error: any) {
      alert(error.message || 'Failed to delete video');
    }
  };

  // Category filtering handler
  const filteredCourses = selectedCategory
    ? courses.filter((c) => c.category === selectedCategory)
    : courses;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Course Management
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button onClick={openCreateCourseForm} className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === '' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
          }`}
        >
          All ({courses.length})
        </button>
        {Array.from(new Set(courses.map((c) => c.category).filter(Boolean))).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category ?? '')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
            }`}
          >
            {category} ({courses.filter((c) => c.category === category).length})
          </button>
        ))}
      </div>

      {/* Course create/edit modal */}
      {isCourseFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{editingCourse ? 'Edit Course' : 'Add Course'}</h2>
            <input
              name="title"
              value={courseFormData.title}
              onChange={handleCourseFormChange}
              placeholder="Title"
              className="input mb-3 w-full"
              required
            />
            <textarea
              name="description"
              value={courseFormData.description}
              onChange={handleCourseFormChange}
              placeholder="Description"
              className="textarea mb-3 w-full"
              rows={3}
            />
            <input
              name="category"
              value={courseFormData.category}
              onChange={handleCourseFormChange}
              placeholder="Category"
              className="input mb-3 w-full"
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setCourseFormOpen(false)} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={submitCourseForm} className="btn btn-primary">
                {editingCourse ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading and error indicators */}
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

      {/* Courses grid */}
      {!isLoading && !error && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <VideoIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">
            {selectedCategory ? `No courses found in the ${selectedCategory} category.` : 'Get started by creating your first course.'}
          </p>
          <button className="btn btn-primary" onClick={openCreateCourseForm}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      )}

      {!isLoading && !error && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                <img
                  src={course.thumbnailUrl || '/placeholder-thumbnail.png'}
                  alt={course.title}
                  className="absolute inset-0 object-cover w-full h-full opacity-30 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {course.category || 'Uncategorized'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <VideoIcon className="w-4 h-4 mr-1" />
                    <span>{course.courseVideos?.length ?? 0} videos</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button className="btn btn-outline flex-1 text-sm" onClick={() => openEditCourseForm(course)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>

                  <button
                    className="btn btn-primary flex-1 text-sm"
                    onClick={() => setAssignModalCourseId(course.id)}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Assign
                  </button>

                  <button
                    className="btn btn-danger flex-1 text-sm"
                    onClick={() => deleteCourse(course.id)}
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>

                {/* Videos list */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Videos</h4>
                  {course.courseVideos?.length ? (
                    <ul className="space-y-2 max-h-48 overflow-auto">
                      {course.courseVideos.map(({ video }) => (
                        <li key={video.id} className="flex justify-between items-center border p-2 rounded">
                          <div>
                            <span className="font-medium">{video.title}</span>{' '}
                            <span className="text-xs text-gray-500">({video.platform})</span>
                          </div>
                          <button
                            onClick={() => deleteVideo(course.id, video.id)}
                            className="btn btn-danger btn-xs"
                            title="Remove video"
                          >
                            <Trash2 size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No videos added.</p>
                  )}

                  {/* Add video form toggle */}
                  {isVideoFormOpenForCourseId === course.id ? (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        name="videoUrl"
                        placeholder="Video URL"
                        value={videoFormData.videoUrl}
                        onChange={handleVideoFormChange}
                        className="input w-full"
                      />

                      <input
                        type="text"
                        name="title"
                        placeholder="Video Title (optional)"
                        value={videoFormData.title}
                        onChange={handleVideoFormChange}
                        className="input w-full"
                      />

                      <input
                        type="text"
                        name="platform"
                        placeholder="Platform (default: youtube)"
                        value={videoFormData.platform}
                        onChange={handleVideoFormChange}
                        className="input w-full"
                      />

                      <input
                        type="number"
                        name="duration"
                        placeholder="Duration (seconds, optional)"
                        min={0}
                        value={videoFormData.duration || undefined}
                        onChange={handleVideoFormChange}
                        className="input w-full"
                      />

                      <div className="flex space-x-2 mt-1">
                        <button onClick={submitVideoForm} className="btn btn-primary flex-1">
                          Add Video
                        </button>
                        <button onClick={() => setVideoFormOpenForCourseId(null)} className="btn btn-outline flex-1">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => openVideoForm(course.id)}
                      className="btn btn-sm btn-outline mt-2"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Assignment modal */}
      {assignModalCourseId !== null && (
        <AssignCourseModal
          courseId={assignModalCourseId}
          onClose={() => setAssignModalCourseId(null)}
          // Pass axios instance for API calls
          client={api}
        />
      )}
    </div>
  );
}
