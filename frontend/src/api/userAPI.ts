import api from './index';
import type { AxiosInstance } from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  enrolledCourses?: number;   // added to match backend enhanced field
  progress?: number;          // added to match backend enhanced field
  lastActive?: string;        // added to match backend enhanced field
}

interface GetUsersParams {
  role?: string;
  skip?: number;
  take?: number;
  search?: string;
}

export const userAPI = {
  // GET /users with optional filtering & pagination, accepts axios client for proper baseURL
  getUsers: async (
    params?: GetUsersParams,
    client: AxiosInstance = api
  ): Promise<{ users: User[]; totalCount: number }> => {
    const response = await client.get('/users', { params });
    return response.data;
  },

  // POST /users for user creation (unchanged, restricted access)
  createUser: async (
    userData: { name: string; email: string; password: string; role: string },
    client: AxiosInstance = api
  ) => {
    const response = await client.post('/users', userData);
    return response.data;
  },

  // PUT /users/:id/role to update user role (unchanged, restricted access)
  updateUserRole: async (
    userId: number,
    role: string,
    client: AxiosInstance = api
  ) => {
    const response = await client.put(`/users/${userId}/role`, { role });
    return response.data;
  },

  // Additional user-related API calls can go here...
};
