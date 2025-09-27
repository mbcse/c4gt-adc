import api from './index';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  enrolledCourses?: number;   
  progress?: number;          
  lastActive?: string;  
}

interface GetUsersParams {
  role?: string;
  skip?: number;
  take?: number;
  search?: string;
}

export const userAPI = {
  getUsers: async (
    params?: GetUsersParams,
    client = api
  ): Promise<{ users: User[]; totalCount: number }> => {
    const response = await client.get('/users', { params });
    return response.data;
  },

  // POST /users for user creation
  createUser: async (
    userData: { name: string; email: string; password: string; role: string },
    client = api
  ) => {
    const response = await client.post('/users', userData);
    return response.data;
  },

  // PUT /users/:id/role to update user role 
  updateUserRole: async (
    userId: number,
    role: string,
    client = api
  ) => {
    const response = await client.put(`/users/${userId}/role`, { role });
    return response.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/api/user/profile');
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await api.post('/api/user/change-password', { oldPassword, newPassword });
    return response.data;
  },

};
