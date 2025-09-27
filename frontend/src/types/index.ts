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
  videoUrl: string;
  videoId: string;
  platform: string;
  duration: number; // seconds
  order?: number; // optional for general video type
  thumbnailUrl: string | null;
  description?: string;
  publishedAt?: string;
}

export interface CourseVideo {
  id: number; // courseVideo id (relation id)
  order: number;
  video: Video; // nested video object
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
  progress: number; // e.g., 0-100 percentage
  timeSpent: number; // seconds or milliseconds
  lastAccessed: string;
}

export interface QuizResult {
  studentId: number;
  courseId: number;
  quizId: number;
  score: number; // percentage or points
  completedAt: string;
}
