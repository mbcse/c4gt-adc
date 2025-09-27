import api from './index';
import type { Course } from "@/types";

interface CreateCoursePayload {
  title: string;
  description?: string;
  createdBy?: string;
  categoryId?: number;
  skillLevelId?: number;
  gradeId?: number;
  languageId?: number;
  tagIds?: number[];
  courseVideos?: { videoUrl: string; title?: string; platform?: string; duration?: number }[];
}

interface UpdateCoursePayload {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  categoryId?: number;
  skillLevelId?: number;
  gradeId?: number;
  languageId?: number;
  tagIds?: number[];
}

export const courseAPI = {
  getAllCourses: async (
    client = api,
    page: number = 1,
    limit: number = 10,
    filters: {
      assigned?: boolean;
      categoryId?: number;
      skillLevelId?: number;
      gradeId?: number;
      languageId?: number;
      tagIds?: number[];
      search?: string;
    } = {}
  ): Promise<{
    total: number;
    page: number;
    totalPages: number;
    data: Course[];
  }> => {
    const params: any = { page, limit };
    if (filters.assigned !== undefined) params.assigned = filters.assigned.toString();
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.skillLevelId) params.skillLevelId = filters.skillLevelId;
    if (filters.gradeId) params.gradeId = filters.gradeId;
    if (filters.languageId) params.languageId = filters.languageId;
    if (filters.tagIds && filters.tagIds.length > 0) params.tagIds = filters.tagIds.join(",");
    if (filters.search) params.search = filters.search;

    const response = await client.get('/courses', { params });
    return response.data;
  },

getCourse: async (courseId: number, client = api) => {
  return client.get(`/courses/${courseId}`).then(res => res.data);
},


  createCourse: async (
    courseData: CreateCoursePayload,
    client = api
  ) => {
    const response = await client.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (
    courseId: number,
    courseData: UpdateCoursePayload,
    client = api
  ) => {
    const response = await client.put(`/courses/${courseId}`, courseData);
    return response.data;
  },

  deleteCourse: async (courseId: number, client = api) => {
    const response = await client.delete(`/courses/${courseId}`);
    return response.data;
  },

  getPlaylistVideos: async (
    playlistUrl: string,
    page: number = 1,
    client = api
  ) => {
    const response = await client.get('/courses/playlist/videos', {
      params: { playlistUrl, page },
    });
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

  // Process playlist URL and get list of videos with metadata
  processPlaylist: async (playlistUrl: string, client = api) => {
    const response = await client.post('/courses/process-playlist', { playlistUrl });
    return response.data;
  },

  // Bulk add selected videos from playlist to course
  addVideosFromPlaylist: async (
    courseId: number,
    videos: {
      videoUrl: string;
      title?: string;
      duration?: number;
      description?: string;
      thumbnailUrl?: string;
    }[],
    client = api
  ) => {
    const response = await client.post(`/courses/${courseId}/videos/bulk`, { videos });
    return response.data;
  },

  // Reorder videos in a course
  reorderVideos: async (
    courseId: number,
    videoOrders: { videoId: number; order: number }[],
    client = api
  ) => {
    const response = await client.put(`/courses/${courseId}/videos/reorder`, { videoOrders });
    return response.data;
  },

  // Fetch video metadata for a single YouTube URL
  getVideoMetadata: async (videoUrl: string, client = api) => {
    const response = await client.get('/courses/video-metadata', { params: { videoUrl } });
    return response.data;
  },

  addEntirePlaylist: async (courseId: number, data: { playlistUrl: string }, client = api) => {
  const response = await client.post(`/courses/${courseId}/playlist/add-all`, data);
  return response.data;
},

};


