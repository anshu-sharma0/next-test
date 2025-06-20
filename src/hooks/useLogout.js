'use client'
import { logoutUser } from '../services/logoutService';

export const useLogout = () => {
  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      if (data.status === 200) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { handleLogout };
};
