import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  userEmail: yup.string().email('Invalid email').required('Email is required'),
  userPassword: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  userRole: yup.string().oneOf(['admin', 'editor', 'viewer'], 'Select a valid role').required('Role is required'),
});

const AddUser = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Add User</h1>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="userName"
            {...register('userName')}
            placeholder="Enter name"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
        </div>

        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="userEmail"
            type="email"
            {...register('userEmail')}
            placeholder="Enter email"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail.message}</p>}
        </div>

        <div>
          <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="userPassword"
            type="password"
            {...register('userPassword')}
            placeholder="Enter password"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          {errors.userPassword && <p className="text-red-500 text-sm mt-1">{errors.userPassword.message}</p>}
        </div>
        <div>
          <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            id="userRole"
            {...register('userRole')}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 cursor-pointer"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          {errors.userRole && <p className="text-red-500 text-sm mt-1">{errors.userRole.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
