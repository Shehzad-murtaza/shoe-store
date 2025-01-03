'use client'; // <-- Ensure this is the very first line

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // <-- This should work after 'use client'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import { Background } from '@/components/background';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth', {
        action: 'login',
        email,
        password,
      });

      toast.success(response.data.message);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); 

      setTimeout(() => {
        router.push('/pages/dashboard');
      }, 100); // Redirect to dashboard after login

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'An error occurred');
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 inset-0 h-full w-full">
        <Background />
      </div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-darkblue">
        <div className="w-full max-w-md p-8 space-y-6 z-10 mt-24 bg-gray-900 rounded-xl shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-600">Welcome Back</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 text-purple-400 bg-darkblue border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 text-purple-400 bg-darkblue border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 text-purple-400 focus:outline-none"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;