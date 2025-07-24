// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios'; // Використовуємо твій api з інтерсептором

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // login: зберігає токен, підтягує профіль
  const login = async (data) => {
    localStorage.setItem('token', data.token);
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch {
      logout();
    }
  };

  // logout: очищає все
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // автоматичне підтягування профілю, якщо токен є
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(logout)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
