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

    if (!email || !password) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password);

      if (data?.status === 200) {
        toast.success('Login successful');

        const role = data?.data?.role?.toLowerCase();
        if (role === 'admin') {
          router.push('/admin/permissions');
        } else {
          router.push('/logs');
        }
      } else {
        toast.error(data?.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Login error');
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
