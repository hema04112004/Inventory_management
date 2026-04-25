import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const role = user?.role ?? null;
  const isAuthenticated = !!user;

const login = async ({ batch_number, password }) => {
  const { data } = await api.post('/api/auth/login', { id: batch_number, password });
  
  // Directly set the user from API response
  if (data) {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};
  const register = async (payload) => {
    const { data } = await api.post('/api/auth/register', payload);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}