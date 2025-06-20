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
      console.log({ data })
      if (data?.status === 200)
        if (data?.data?.role === 'admin') {
          document.cookie = `role=${data.data.role}; path=/`;
          document.cookie = `name=${data.data.name}; path=/`;
          toast.success(data.message);
          router.push('/admin/permissions');
        } else {
          toast.success(data.message);
          router.push('/logs');
        }
      else {
        toast.error(data.message);
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
