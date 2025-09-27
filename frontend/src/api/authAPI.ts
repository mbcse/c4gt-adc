import api from './index';
import type { Role, User, OrganizationUnit } from '@/types/index';

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

export const authAPI = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  signup: async (data: SignupData): Promise<void> => {
    await api.post('/api/auth/signup', data);
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/api/user/profile');
    return response.data;
  },
};

