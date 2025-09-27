// src/api/index.ts
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { useMemo } from 'react';
import { useAuth } from '@/shared/context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Static axios instance (global static instance)
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Role-based Axios instance hook with memoization
export function useApi(): AxiosInstance {
  const { token, user } = useAuth();

  const baseApiUrl = API_BASE_URL.endsWith('/')
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  const ADMIN_BASE_URL = `${baseApiUrl}/api/admin`;
  const STUDENT_BASE_URL = `${baseApiUrl}/api`;

  return useMemo(() => {
    let baseURL = STUDENT_BASE_URL;
    if (user && ['ADMIN', 'SUPERADMIN', 'INSTRUCTOR'].includes(user.role)) {
      baseURL = ADMIN_BASE_URL;
    }

    const instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    instance.interceptors.request.use((config) => {
      if (!config.headers) config.headers = {} as AxiosRequestHeaders;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [token, user?.role]);
}

export default api;
