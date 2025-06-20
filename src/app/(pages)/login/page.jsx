'use client'

import { LoginForm } from '../../../components/component';
import { useLogin } from '../../../hooks/useLogin';

export default function Login() {
  const { name, setName, loading, handleSubmit } = useLogin();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <LoginForm handleSubmit={handleSubmit} name={name} setName={setName} loading={loading} />
      </div>
    </div>
  );
}
