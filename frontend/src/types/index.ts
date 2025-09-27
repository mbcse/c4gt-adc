export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'SUPERADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'SUPERADMIN' |'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  lastActive: string;
  enrolledCourses: number;
  progress: number; 
}

export interface Category {
  id: number;
  name: string;
}

export interface SkillLevel {
  id: number;
  level: string;
}

export interface Grade {
  id: number;
  value: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  title: string;
  platform: string;
  videoUrl: string;
  videoId: string;
  duration: number;
  createdAt: string;
  thumbnailUrl?: string;
  description?: string;
  courseVideos?: CourseVideo[];
  quiz?: Quiz;
  watchLogs?: WatchLog[];
}

export interface WatchLog {
  id: number;
  userId: number;
  videoId: number;
  totalWatchTime: number;
  isCompleted: boolean;
  watchedPercentage: number;
  skipEvents: unknown[];
  pauseEvents: unknown[];
  createdAt: string;
  updatedAt: string;  
  lastUpdateTime?: string; 
  user?: User;  
  video?: Video;
}


export interface CourseVideo {
  id: number;
  order: number;
  video: Video;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnailUrl?: string | null;
  totalVideos?: number;
  avgDuration?: number;
  enrolledStudents?: number;
  category?: Category | null;
  skillLevel?: SkillLevel | null;
  grade?: Grade | null;
  language?: Language | null;
  tags?: Tag[];
  courseVideos?: CourseVideo[];
}

export interface Metrics {
  totalStudents: number;
  activeCourses: number;
  completionRate: number;
  avgQuizScore: number;
  totalWatchHours: number;
  newEnrollments: number;
}

export interface Activity {
  type: 'enrollment' | 'completion' | 'quiz' | 'course' | 'assignment';
  message: string;
  timestamp: string;
  icon: string;
  color: string;
}

export interface ProgressData {
  studentId: number;
  courseId: number;
  progress: number;
  timeSpent: number; 
  lastAccessed: string;
}

export interface QuizResult {
  studentId: number;
  courseId: number;
  quizId: number;
  score: number; 
  completedAt: string;
}

export interface QuizQuestion {
  question: string; 
  options: string[];  
  correctAnswer: number;  
  explanation?: string; 
}

export interface Quiz {
  id: number;
  videoId: number;           
  questions: QuizQuestion[];  
  generatedBy?: string;
  createdAt: string;
  video?: Video;     
  attempts?: QuizAttempt[];  
}

export interface QuizAttempt {
  id: number;
  userId: number;
  quizId: number;
  score: number;
  completedAt: string;
  user?: User; 
  quiz?: Quiz;  
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  totalPages: number;
  data: T[];
}
