'use client';

import React from 'react';
import { toast } from 'react-hot-toast';
import { AddUser } from '../../../../components/layout';
import { addUser } from '../../../../services/userService';

const Page = () => {
  const handleAddUser = async (formData) => {
    try {
      const response = await addUser({
        name: formData.userName,
        email: formData.userEmail,
        role: formData.userRole,
        password: formData.userPassword,
      });

      if (response?.status === 200) {
        toast.success(response?.message || 'User added successfully');
      } else {
        toast.error(response?.error || 'User creation failed');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] flex justify-center items-center w-full">
      <AddUser onSubmit={handleAddUser} />
    </div>
  );
};

export default Page;
