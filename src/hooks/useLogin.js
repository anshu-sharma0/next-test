'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginUser } from '../services/authService';

export const useLogin = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(name);
      if (data?.status === 200) {
        const userRole = data?.data?.role;
        const userName = data?.data?.name;

        if (userRole) {
          document.cookie = `role=${userRole}; path=/`;
          document.cookie = `name=${userName}; path=/`;

          toast.success(data.message);

          if (userRole.toLowerCase() === 'admin') {
            router.push('/admin/permissions');
          } else {
            router.push('/logs');
          }
        } else {
          toast.error('No role found. Redirecting to logs.');
          router.push('/logs');
        }
      } else {
        toast.error(data?.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    loading,
    handleSubmit
  };
};
