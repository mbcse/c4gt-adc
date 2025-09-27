import api from './index';

export interface StudentSummary {
  totalStudyTime: number;
  totalLessons: number;
  currentStreak: number;
  longestStreak: number;
  averageQuizScore: number;
  totalQuizzes: number;
  enrolledCourses: number;
  completedCourses: number;
  completionRate: number;
  lessonsCompletedThisWeek?: number;
  studyTimeThisWeek?: number;
  nextLesson?: {
    courseTitle: string;
    id: number;
  };
}

export interface ActivityTrendItem {
  period: string;
  studyTime: number;
  lessons: number;
}

export interface CourseProgress {
  courseId: number;
  title: string;
  totalVideos: number;
  completedVideos: number;
  totalQuizzes: number;
  completedQuizzes: number;
  totalWatchTime: number;
  overallProgress: number;
  avgQuizScore: number;
  status: 'completed' | 'in-progress' | 'not-started';
}

export interface QuizAnalytics {
  totalAttempts: number;
  uniqueQuizzes: number;
  averageScore: number;
  perfectScores: number;
  scoreDistribution: Record<string, number>;
  performanceTrend: Array<{
    date: string;
    score: number;
    quizTitle: string;
    courseTitle: string;
  }>;
  improvementRate: number;
}

export interface CourseCompletionStat {
  courseId: number;
  title: string;
  videoCompletionPercentage: number;
  quizCompletionPercentage: number;
  completedVideos: number;
  totalVideos: number;
  completedQuizzes: number;
  totalQuizzes: number;
}

export interface ActivityCalendarDay {
  date: string;
  studyTime: number;
  lessons: number;
  intensity: number; // 0-4 for heatmap
}

export interface ActivityCalendarResponse {
  calendarData: ActivityCalendarDay[];
  summary: {
    totalActiveDays: number;
    totalStudyTimeYear: number;
    totalLessonsYear: number;
    activityByDayOfWeek: number[];
  };
}

export interface DetailedQuizPerformance {
  quizId: number;
  title: string;
  courseTitle: string;
  attempts: Array<{
    score: number;
    date: string;
    attemptNumber: number;
  }>;
  scores: number[];
  latestScore: number;
  bestScore: number;
  averageScore: number;
  attemptCount: number;
}

export interface StudyTimePattern {
  period: string;
  studyTime: number;
}

export interface LessonCompletionPattern {
  period: string;
  lessons: number;
}

export interface AvailableCourse {
  id: number;
  title: string;
}

export interface VideoProgress {
  videoId: number;
  title: string;
  order: number;
  duration: number;
  watchedPercentage: number;
  totalWatchTime: number;
  isCompleted: boolean;
  hasQuiz: boolean;
  quizScore: number | null;
  status: 'completed' | 'in-progress' | 'not-started';
}

export interface CourseVideoProgress {
  course: {
    id: number;
    title: string;
  };
  totalVideos: number;
  completedVideos: number;
  inProgressVideos: number;
  notStartedVideos: number;
  videos: VideoProgress[];
}

function sendBeacon(url: string, data: any) {
  // Get auth token
  const token = localStorage.getItem('authToken'); 
  
  if (!token) {
    console.warn('No auth token available for beacon request');
    return;
  }

  const fullUrl = `${api.defaults.baseURL}${url}`;
  
  fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include auth header
    },
    body: JSON.stringify(data),
    keepalive: true // This ensures the request continues even if page unloads
  }).catch(err => {
    console.warn('Beacon request failed:', err);
  });
}

export const analyticsAPI = {

  logVideoProgressBeacon: (
    videoId: number,
    progressData: any
  ) => {
    const url = `/api/videos/${videoId}/progress`;
    sendBeacon(url, progressData);
  },
  
  getStudentSummary: async (): Promise<StudentSummary> => {
    const response = await api.get('/api/analytics/student/summary');
    return response.data.data;
  },

  getActivityTrends: async (timeframe: 'weekly' | 'monthly' | 'yearly' = 'weekly'): Promise<ActivityTrendItem[]> => {
    const response = await api.get('/api/analytics/student/activity-trends', {
      params: { timeframe }
    });
    return response.data.data;
  },

  getCourseProgress: async (): Promise<CourseProgress[]> => {
    const response = await api.get('/api/analytics/student/course-progress');
    return response.data.data;
  },

  getQuizAnalytics: async (): Promise<QuizAnalytics> => {
    const response = await api.get('/api/analytics/student/quiz-analytics');
    return response.data.data;
  },

  getCourseCompletionStats: async (): Promise<CourseCompletionStat[]> => {
    const response = await api.get('/api/analytics/student/course-completion');
    return response.data.data;
  },

  getActivityCalendar: async (year?: number): Promise<ActivityCalendarResponse> => {
    const response = await api.get('/api/analytics/student/activity-calendar', {
      params: year ? { year } : {}
    });
    return response.data.data;
  },

  getDetailedQuizPerformance: async (courseId?: number): Promise<DetailedQuizPerformance[]> => {
    const response = await api.get('/api/analytics/student/detailed-quiz-performance', {
      params: { courseId }
    });
    return response.data.data;
  },

  getStudyTimePatterns: async (timeframe: 'weekly' | 'monthly' | 'yearly' = 'weekly'): Promise<StudyTimePattern[]> => {
    const response = await api.get('/api/analytics/student/study-time-patterns', {
      params: { timeframe }
    });
    return response.data.data;
  },

  getLessonCompletionPatterns: async (timeframe: 'weekly' | 'monthly' | 'yearly' = 'weekly'): Promise<LessonCompletionPattern[]> => {
    const response = await api.get('/api/analytics/student/lesson-completion-patterns', {
      params: { timeframe }
    });
    return response.data.data;
  },

  getAvailableCourses: async (): Promise<AvailableCourse[]> => {
    const response = await api.get('/api/analytics/student/available-courses');
    return response.data.data;
  },

  getCourseVideoProgress: async (courseId: number): Promise<CourseVideoProgress> => {
    const response = await api.get(`/api/analytics/student/course-video-progress/${courseId}`);
    return response.data.data;
  },

  getCourseSpecificQuizAnalytics: async (courseId?: number): Promise<QuizAnalytics> => {
    const response = await api.get('/api/analytics/student/course-quiz-analytics', {
      params: { courseId }
    });
    return response.data.data;
  },

  getPeakStudyHours: async (): Promise<string> => {
    const response = await api.get('/api/analytics/student/peak-study-hours');
    return response.data.data;
  },
};
