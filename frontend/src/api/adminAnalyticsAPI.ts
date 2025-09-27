import api from './index';

export interface FilterOptions {
  grades: Array<{
    id: number;
    value: string;
  }>;
  schools: Array<{
    id: number;
    name: string;
    blockId: number;
    blockName: string;
  }>;
  blocks: Array<{ id: number; name: string }>;
  students: Array<{
    id: number;
    name: string;
    email: string;
    organizationUnitId: number;
    schoolId: number | null;
    blockId: number | null;
  }>;
  courses: Array<{ id: number; title: string }>;
}

export interface AnalyticsFilters {
  gradeId?: number;
  schoolId?: number;
  blockId?: number;
  studentId?: number;
  courseId?: number;
  videoId?: number;
  startDate?: string;
  endDate?: string;
  timeframe?: 'weekly' | 'monthly' | 'yearly';
}

export interface CompletionRateData {
  grade?: string;
  school?: string;
  block?: string;
  studentCount: number;
  avgCompletionRate: number;
  completedCourses: number;
  totalEnrollments: number;
}

export interface CourseCompletionRates {
  byGrade: CompletionRateData[];
  bySchool: CompletionRateData[];
  byBlock: CompletionRateData[];
  overall: {
    totalStudents: number;
    totalCourses: number;
    totalEnrollments: number;
    avgCompletionRate: number;
    completedCourses: number;
    completionPercentage: number;
  };
}

export interface QuizScoreData {
  grade?: string;
  school?: string;
  block?: string;
  courseId?: number;
  courseTitle?: string;
  videoId?: number;
  videoTitle?: string;
  avgScore: number;
  attemptCount: number;
  perfectScores: number;
}

export interface QuizScores {
  byGrade: QuizScoreData[];
  bySchool: QuizScoreData[];
  byBlock: QuizScoreData[];
  byCourse: QuizScoreData[];
  byVideo: QuizScoreData[];
  overall: {
    totalAttempts: number;
    avgScore: number;
    perfectScores: number;
    uniqueStudents: number;
    uniqueQuizzes: number;
    perfectScoreRate: number;
  };
}

export interface EngagementMetrics {
  activeStudentsCount: number;
  totalStudentsCount: number;
  activeStudentsPercentage: number;
  totalWatchHours: number;
  avgSessionDuration: number;
  courseEnrollmentStats: Array<{
    courseId: number;
    courseTitle: string;
    totalEnrollments: number;
    byGrade: Array<{ grade: string; count: number }>;
    bySchool: Array<{ school: string; count: number }>;
  }>;
  activeStudentsTrend: Array<{ date: string; count: number }>;
}

export interface ConsistencyData {
  studentId: number;
  studentName: string;
  grade?: string;
  school?: string;
  block?: string;
  activeDays: number;
  totalDays: number;
  consistencyRate: number;
}

export interface ConsistencyRates {
  byGrade: Array<{
    grade: string;
    avgConsistencyRate: number;
    studentCount: number;
    highConsistencyStudents: number;
  }>;
  bySchool: Array<{
    school: string;
    avgConsistencyRate: number;
    studentCount: number;
    highConsistencyStudents: number;
  }>;
  byBlock: Array<{
    block: string;
    avgConsistencyRate: number;
    studentCount: number;
    highConsistencyStudents: number;
  }>;
  overall: {
    totalStudents: number;
    avgConsistencyRate: number;
    highConsistencyStudents: number;
    highConsistencyPercentage: number;
  };
  individual: ConsistencyData[];
}

export interface IndividualStudentAnalytics {
  student: {
    id: number;
    name: string;
    email: string;
    grade?: string;
    school?: string;
    block?: string;
  };
  courseProgress: Array<{
    courseId: number;
    courseTitle: string;
    completionRate: number;
    totalVideos: number;
    completedVideos: number;
    totalQuizzes: number;
    completedQuizzes: number;
    avgQuizScore: number;
  }>;
  totalStudyTime: number;
  quizAnalytics: {
    totalAttempts: number;
    avgScore: number;
    perfectScores: number;
  };
  enrolledCourses: number;
  completedCourses: number;
}

export interface DashboardData {
  courseCompletionRates: CourseCompletionRates;
  quizScores: QuizScores;
  engagementMetrics: EngagementMetrics;
  consistencyRates: ConsistencyRates;
  filterOptions: FilterOptions;
}

export const adminAnalyticsAPI = {
  getCourseCompletionRates: async (api, filters: AnalyticsFilters = {}): Promise<CourseCompletionRates> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/analytics/course-completion-rates?${params.toString()}`);
    return response.data.data;
  },

  getQuizScores: async (api, filters: AnalyticsFilters = {}): Promise<QuizScores> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/analytics/quiz-scores?${params.toString()}`);
    return response.data.data;
  },

  getEngagementMetrics: async (api, filters: AnalyticsFilters = {}): Promise<EngagementMetrics> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/analytics/engagement?${params.toString()}`);
    return response.data.data;
  },

  getConsistencyRates: async (api, filters: AnalyticsFilters = {}): Promise<ConsistencyRates> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/analytics/consistency-rates?${params.toString()}`);
    return response.data.data;
  },

  getIndividualStudentAnalytics: async (api, studentId: number, filters: Omit<AnalyticsFilters, 'studentId'> = {}): Promise<IndividualStudentAnalytics> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/analytics/student/${studentId}?${params.toString()}`);
    return response.data.data;
  },

  getFilterOptions: async (api): Promise<FilterOptions> => {
    const response = await api.get('/analytics/filter-options');
    return response.data.data;
  },

  getDashboardData: async (api, filters: AnalyticsFilters = {}): Promise<DashboardData> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/analytics/dashboard?${params.toString()}`);
    return response.data.data;
  },
};