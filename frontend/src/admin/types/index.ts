export interface User {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  lastActive: string
  enrolledCourses: number
  progress: number
}

export interface Course {
  id: number
  title: string
  description?: string
  totalVideos: number
  avgDuration: number
  enrolledStudents: number
  category?: string
}

export interface Metrics {
  totalStudents: number
  activeCourses: number
  completionRate: number
  avgQuizScore: number
  totalWatchHours: number
  newEnrollments: number
}

export interface Activity {
  type: 'enrollment' | 'completion' | 'quiz' | 'course' | 'assignment'
  message: string
  timestamp: string
  icon: string
  color: string
}

export interface ProgressData {
  studentId: number
  courseId: number
  progress: number
  timeSpent: number
  lastAccessed: string
}

export interface QuizResult {
  studentId: number
  courseId: number
  quizId: number
  score: number
  completedAt: string
}
