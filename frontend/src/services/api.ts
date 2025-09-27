import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface VideoProgress {
  totalWatchTime: number;
  isCompleted: boolean;
  watchedPercentage: number;
  skipEvents?: any[];
  pauseEvents?: any[];
  updatedAt?: string;
}

export interface Video {
  id: number;
  title: string;
  videoUrl: string;
  videoId: string;
  platform: string;
  duration: number;
  order: number;
  progress: VideoProgress;
}

export interface CourseProgress {
  totalVideos: number;
  completedVideos: number;
  completionPercentage: number;
  totalWatchTime: number;
  averageProgress: number;
}

export const videoAPI = {

  getCourseVideos: async (courseId: number): Promise<Video[]> => {
    const response = await api.get(`/api/videos/courses/${courseId}`);
    return response.data.videos;
  },

  getVideo: async (videoId: number): Promise<Video> => {
    const response = await api.get(`/api/videos/${videoId}`);
    return response.data.video;
  },

  updateProgress: async (
    videoId: number, 
    progressData: Partial<VideoProgress>
  ): Promise<VideoProgress> => {
    const response = await api.post(
      `/api/videos/${videoId}/progress`, 
      progressData
    );
    return response.data.progress;
  },

  getCourseProgress: async (courseId: number): Promise<CourseProgress> => {
    const response = await api.get(`/api/videos/courses/${courseId}/progress`);
    return response.data.courseProgress;
  },
};

export const courseAPI = {
  getAllCourses: async (): Promise<any[]> => {
    const response = await api.get('/api/courses');
    return response.data.courses;
  },
}

export default api;
