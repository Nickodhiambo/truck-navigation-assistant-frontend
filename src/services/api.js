import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  // Add a request interceptor
  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Token ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Might add a response interceptor

export default api