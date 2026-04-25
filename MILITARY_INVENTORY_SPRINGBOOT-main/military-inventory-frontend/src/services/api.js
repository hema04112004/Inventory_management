import axios from 'axios';

// Read backend base URL from Vite env variable at build time.
// In Vercel set VITE_API_BASE_URL to your backend URL (example: https://api.example.com)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'; // Spring Boot

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// attach token later if you add JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // placeholder for future
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
