"use client"; // Specify that this is a client component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import
import { toast } from 'react-toastify'; // No need to import ToastContainer here
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import { Background } from '@/components/background';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const router = useRouter(); // Use useRouter from next/navigation

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation check (minimum length of 6 characters)
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post('/api/auth', {
        action: 'signup',
        email,
        fullName,
        password,
      });

      toast.success(response.data.message); // Show success toast
      router.push('/pages/login'); // Redirect to login page after signup
    } catch (error: unknown) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (message === 'User already exists') {
          toast.error('This email is already taken.'); // Handle existing user error
        } else {
          toast.error(message || 'An error occurred'); // Show other errors
        }
      } else {
        toast.error('An unknown error occurred'); // Fallback for other types of errors
      }
    }
  };

  return (
    <>
      {/* Background spans the full page */}
      <div className="fixed inset-0 h-full w-full">
        <Background />
      </div>

      <Header />

      {/* Signup form */}
      <div className="flex items-center justify-center min-h-screen bg-darkblue">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg z-10 mt-20 shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-600">Create an Account</h1>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="custom-input w-full p-4 text-purple-400 bg-darkblue border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="custom-input w-full p-4 text-purple-400 bg-darkblue border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="custom-input w-full p-4 text-purple-400 bg-darkblue border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 text-purple-400 focus:outline-none"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full p-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            >
              Signup
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <a href="/pages/login" className="text-purple-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
