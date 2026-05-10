import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { auth, githubProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedInfo = JSON.parse(userInfo);
        if (parsedInfo && parsedInfo.user) {
          setUser(parsedInfo.user);
        } else {
          localStorage.removeItem('userInfo');
        }
      } catch (e) {
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });
      if (data && data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        setUser(data.data.user);
        return data.data.user;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const { data } = await axiosClient.post('/auth/github-login', {
        email: user.email,
        name: user.displayName,
        githubId: user.uid,
        avatar: user.photoURL
      });
      if (data && data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        setUser(data.data.user);
        return data.data.user;
      }
    } catch (error) {
      console.error(error);
      throw new Error('GitHub login failed');
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await axiosClient.post('/auth/register', userData);
      if (data && data.success) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        setUser(data.data.user);
        return data.data.user;
      }
      throw new Error(data.message || 'Registration failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || error.response?.data?.errors?.[0] || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return { user, loading, login, githubLogin, register, logout };
};
