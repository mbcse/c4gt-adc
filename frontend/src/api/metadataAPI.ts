import api from './index';       // Authenticated role-based Axios for admin calls
import { publicApi } from './publicAPI'; // Public Axios instance for open calls

export const metadataAPI = {
  // Public GET all - open to all users
  getCategories: async () => (await publicApi.get("/metadata/categories")).data,
  getSkillLevels: async () => (await publicApi.get("/metadata/skill-levels")).data,
  getGrades: async () => (await publicApi.get("/metadata/grades")).data,
  getLanguages: async () => (await publicApi.get("/metadata/languages")).data,
  getTags: async () => (await publicApi.get("/metadata/tags")).data,

  // Admin POST create calls - only for admins, authenticated
  createTag: async (tag: { name: string }, client = api) => {
    const response = await client.post("/metadata/tags", tag);
    return response.data;
  },

  createCategory: async (category: { name: string }, client = api) => {
    const response = await client.post("/metadata/categories", category);
    return response.data;
  },

  createSkillLevel: async (skillLevel: { level: string }, client = api) => {
    const response = await client.post("/metadata/skill-levels", skillLevel);
    return response.data;
  },

  createGrade: async (grade: { value: string }, client = api) => {
    const response = await client.post("/metadata/grades", grade);
    return response.data;
  },

  createLanguage: async (language: { name: string }, client = api) => {
    const response = await client.post("/metadata/languages", language);
    return response.data;
  },
};


  

  