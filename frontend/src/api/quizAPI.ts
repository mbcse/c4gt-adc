import api from './index';
import type { Quiz, QuizAttempt, PaginatedResponse, QuizQuestion } from "@/types";


export interface QuizWithStatus extends Quiz {
  isUnlocked: boolean;
  attemptCount: number;
  bestScore: number;
}

interface QuizFilters {
  videoId?: number;
  courseId?: number;
  [key: string]: any;
}

interface QuizAttemptsFilters {
  quizId?: number;
  userId?: number;
  [key: string]: any;
}

interface CreateQuizPayload {
  videoId: number;
  questions: QuizQuestion[];
  generatedBy?: string;
}

interface UpdateQuizPayload {
  questions: QuizQuestion[];
  generatedBy?: string;
}

export const quizAPI = {
  getAllQuizzes: async (
    client = api,
    page: number = 1,
    limit: number = 10,
    filters: QuizFilters = {}
  ): Promise<PaginatedResponse<QuizWithStatus>> => {
    const params: any = { page, limit, ...filters };
    const response = await client.get('/quizzes', { params });
    return response.data;
  },

  getQuiz: async (
    id: number,
    client = api
  ): Promise<Quiz> => {
    const response = await client.get(`/quizzes/${id}`);
    return response.data;
  },

  getQuizByVideoId: async (
    videoId: number,
    client = api
  ): Promise<Quiz | null> => {
    try {
      const response = await client.get(`/quizzes/video/${videoId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  },

  createQuiz: async (
    quizData: CreateQuizPayload,
    client = api
  ): Promise<Quiz> => {
    const response = await client.post('/quizzes', quizData);
    return response.data;
  },

  updateQuiz: async (
    id: number,
    quizData: UpdateQuizPayload,
    client = api
  ): Promise<Quiz> => {
    const response = await client.put(`/quizzes/${id}`, quizData);
    return response.data;
  },

  deleteQuiz: async (
    id: number,
    client = api
  ): Promise<{ message: string }> => {
    const response = await client.delete(`/quizzes/${id}`);
    return response.data;
  },

  getQuizAttempts: async (
    client = api,
    filters: QuizAttemptsFilters = {},
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<QuizAttempt>> => {
    const params: any = { page, limit, ...filters };
    const response = await client.get('/quizzes/attempts', { params });
    return response.data;
  },

  createQuizAttempt: async (
    attemptData: {
      quizId: number;
      answers: any[];
      score: number;
    },
    client = api
  ): Promise<QuizAttempt> => {
    const response = await client.post('/quizzes/attempts', attemptData);
    return response.data;
  },

  getUserQuizAttempts: async (
    client = api,
    page: number = 1,
    limit: number = 10,
    quizId?: number
  ): Promise<PaginatedResponse<QuizAttempt>> => {
    const params: any = { page, limit };
    if (quizId) params.quizId = quizId;
    const response = await client.get('/quizzes/attempts', { params });
    return response.data;
  },

  getUnlockedQuizzes: async (
    client = api,
    courseId?: number
  ): Promise<Quiz[]> => {
    const params: any = {};
    if (courseId) params.courseId = courseId;
    const response = await client.get('/quizzes', { params });
    return response.data.data.filter((quiz: any) => quiz.isUnlocked);
  }
};
