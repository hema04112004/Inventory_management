import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Spring Boot
  withCredentials: true
});

// attach token later if you add JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // placeholder for future
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
