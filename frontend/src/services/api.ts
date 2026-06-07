import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (data: {
    fullName: string;
    age: number;
    gender: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => api.post('/auth/register', data),
};

export const imcService = {
  calculate: (weight: number, height: number) =>
    api.post('/imc/calculate', { weight, height }),
  
  getLastIMC: () =>
    api.get('/imc/last'),
  
  getHistory: () =>
    api.get('/imc/history'),
  
  getStatistics: () =>
    api.get('/imc/statistics'),
};

export default api;