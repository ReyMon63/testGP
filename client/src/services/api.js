import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API de Candidatos
export const candidatesAPI = {
  register: (data) => api.post('/candidates/register', data),
};

// API de Test
export const testAPI = {
  verifyCode: (code) => api.post('/test/verify-code', { code }),
  submitTest: (data) => api.post('/test/submit', data),
  getResult: (candidateId) => api.get(`/test/result/${candidateId}`),
};

// API de Admin
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getResults: () => api.get('/admin/results'),
  exportCSV: () => api.get('/admin/export-csv', { responseType: 'blob' }),
  getRecentActivity: () => api.get('/admin/recent-activity'),
};

export default api;
