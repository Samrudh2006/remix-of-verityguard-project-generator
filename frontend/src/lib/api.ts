import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PREFIX = '/api/v1';

const api = axios.create({
  baseURL: `${API_URL}${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    locale?: string;
  }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  verify: async (token: string) => {
    const response = await api.post('/auth/verify', { token });
    return response.data;
  },
};

// Articles API
export const articlesAPI = {
  list: async (params?: { skip?: number; limit?: number; status_filter?: string }) => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  get: async (id: number) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  analyze: async (data: { url?: string; text: string; source?: string }) => {
    const response = await api.post('/articles/analyze', data);
    return response.data;
  },

  ingest: async (data: {
    url: string;
    title: string;
    content: string;
    source?: string;
    language?: string;
  }) => {
    const response = await api.post('/articles/ingest', data);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  get: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  leaderboard: async (params?: {
    timeframe?: string;
    region?: string;
    limit?: number;
  }) => {
    const response = await api.get('/leaderboard', { params });
    return response.data;
  },
};

// Reports API
export const reportsAPI = {
  create: async (data: {
    article_id: number;
    user_id: number;
    evidence_text: string;
    evidence_url?: string;
  }) => {
    const response = await api.post('/reports', data);
    return response.data;
  },

  get: async (id: number) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },
};

export default api;
