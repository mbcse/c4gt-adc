import api from './index';
import type { Role, User, OrganizationUnit, Grade } from '@/types/index';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  organizationUnitId?: number;
  gradeId?: number;
}

export interface SignupOptions {
  blocks: OrganizationUnit[];
  schools: (OrganizationUnit & { blockId: number })[];
  grades: Grade[];
}

export const authAPI = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  signup: async (data: SignupData): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/signup', data);
    return response.data;
  },

  getSignupOptions: async (): Promise<SignupOptions> => {
    const response = await api.get('/api/auth/signup-options');
    return response.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/api/user/profile');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/verify-email', { token });
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/reset-password', { token, newPassword });
    return response.data;
  },
};

