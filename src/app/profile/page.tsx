'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Background } from '@/components/background';

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      router.push('/login'); // Redirect to login if no token or user data found
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        setUser(parsedUser);
      } else {
        router.push('/login'); // Redirect if user data is invalid
      }
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login'); // Redirect to login after logout
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-darkblue">
        <div className="relative w-full max-w-md px-4">
          <div className="text-white font-medium text-lg text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-darkblue">
        <div className="relative w-full max-w-md px-4">
          <div className="text-white font-medium text-lg text-center">User not found. Please check the URL.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed -z-10 inset-0 h-full w-full">
        <Background />
      </div>
      <Header />
      <div className="container mx-auto p-6 bg-darkblue mt-40 min-h-screen">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Welcome to your profile, {user.fullName}
        </h1>
        <div className="text-center mb-6">
          <button
            onClick={handleLogout}
            className="p-2 z-50 text-white bg-purple-800 rounded-md hover:bg-purple-900 transition duration-200"
          >
            Logout
          </button>
        </div>
        <div className="bg-gray-700 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-purple-600">Profile Information</h2>
          <p className="text-gray-300">Email: {user.email}</p>
          <p className="text-gray-300">Full Name: {user.fullName}</p>
          <p className="text-gray-300">Role: {user.role}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;