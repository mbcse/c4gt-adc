export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'SUPERADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  assignments?: CourseAssignment[];
  quizAttempts?: QuizAttempt[];
  watchLogs?: WatchLog[];
}

export interface Category {
  id: number;
  name: string;
  courses?: Course[];
}

export interface SkillLevel {
  id: number;
  level: string;
  courses?: Course[];
}

export interface Grade {
  id: number;
  value: string;
  courses?: Course[];
}

export interface Language {
  id: number;
  name: string;
  courses?: Course[];
}

export interface Tag {
  id: number;
  name: string;
  courses?: Course[];
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnailUrl?: string | null;
  category?: Category | null;
  skillLevel?: SkillLevel | null;
  grade?: Grade | null;
  language?: Language | null;
  tags?: Tag[];
  assignments?: CourseAssignment[];
  courseVideos?: CourseVideo[];
  createdAt?: string;
  createdBy?: string;
}

export interface CourseAssignment {
  id: number;
  courseId: number;
  userId: number;
  assignedAt: string;
  course?: Course;
  user?: User;
}

export interface CourseVideo {
  id: number;
  courseId: number;
  videoId: number;
  order: number;
  course?: Course;
  video: Video;
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

export interface QuizQuestion {
  id?: number;
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
  answers?: any; 
  user?: User;
  quiz?: Quiz;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  totalPages: number;
  data: T[];
}
