// src/api/video/videoAPI.ts
import api from './index';

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

  updateProgress: async (videoId: number, progressData: Partial<VideoProgress>): Promise<VideoProgress> => {
    const response = await api.post(`/api/videos/${videoId}/progress`, progressData);
    return response.data.progress;
  },

  getCourseProgress: async (courseId: number): Promise<CourseProgress> => {
    const response = await api.get(`/api/videos/courses/${courseId}/progress`);
    return response.data.courseProgress;
  },
};
