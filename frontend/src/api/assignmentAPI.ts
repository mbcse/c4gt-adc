import api from './index';

export const assignmentAPI = {
  assignCourseToUser: async (
    courseId: number,
    userId: number,
    client = api
  ) => {
    const response = await client.post('/courses/assign', { courseId, userId });
    return response.data;
  },

  unassignCourseFromUser: async (
    courseId: number,
    userId: number,
    client = api
  ) => {
    const response = await client.delete('/courses/assign', { data: { courseId, userId } });
    return response.data;
  },

  getAssignments: async (
    params?: { courseId?: number; userId?: number },
    client = api
  ) => {
    const response = await client.get('/courses/assignments', { params });
    return response.data;
  },
};
