import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
           setUser(JSON.parse(storedUser));
        } else {
           // In future, could call authService.getCurrentUser() if session cookie exists
        }
      } catch (e) {
        console.error('Failed to init auth', e);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (role = 'student') => {
    setLoading(true);
    try {
      const userData = await authService.login(role);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
       console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};