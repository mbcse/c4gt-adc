import api from './index';

export interface Video {
  id: number;
  title: string;
  platform: string;
  videoUrl: string;
  videoId: string;
  duration: number;
  createdAt: string;
}

export interface CourseVideo {
  video: Video;
  order?: number;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  courseVideos?: CourseVideo[];
}

export const courseAPI = {
  getAllCourses: async (client = api): Promise<Course[]> => {
    const response = await client.get('/courses');
    return response.data;
  },

  createCourse: async (
    courseData: {
      title: string;
      description?: string;
      createdBy?: string;
      category?: string;
      courseVideos?: { videoUrl: string; title?: string; platform?: string; duration?: number }[];
    },
    client = api
  ) => {
    const response = await client.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (
    courseId: number,
    courseData: { title: string; description?: string; thumbnailUrl?: string; category?: string },
    client = api
  ) => {
    const response = await client.put(`/courses/${courseId}`, courseData);
    return response.data;
  },

  deleteCourse: async (courseId: number, client = api) => {
    const response = await client.delete(`/courses/${courseId}`);
    return response.data;
  },

  addVideoToCourse: async (
    courseId: number,
    videoData: { videoUrl: string; title?: string; platform?: string; duration?: number },
    client = api
  ) => {
    const response = await client.post(`/courses/${courseId}/videos`, videoData);
    return response.data;
  },

  deleteVideoFromCourse: async (courseId: number, videoId: number, client = api) => {
    const response = await client.delete(`/courses/${courseId}/videos/${videoId}`);
    return response.data;
  },
};
