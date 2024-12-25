'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '@/components/Header';

interface User {
  _id: string;
  email: string;
  fullName: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      router.push('/login'); // Redirect to login if no token or user data found
    } else {
      setUser(JSON.parse(storedUser));
      fetchUsers(); // Fetch users only if authenticated
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.slice(0, 40)); // Limit to first 40 users
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login'); // Redirect to login after logout
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.post('/api/auth', {
        action: 'delete',
        userId,
      });

      if (response.status === 200) {
        toast.success('User deleted successfully');
        // Refetch users after deletion
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('An error occurred while deleting user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-gray-800">
        <div className="text-white font-medium text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 bg-gradient-to-r from-black to-gray-800 mt-40 min-h-screen">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Welcome, {user?.fullName}
        </h1>
        <div className="text-center mb-6">
          <button
            onClick={handleLogout}
            className="p-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-200"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-900 rounded-lg shadow-md p-4 hover:bg-gray-800 transition duration-300"
              >
                <h2 className="text-xl font-semibold text-teal-400">{user.fullName}</h2>
                <p className="text-gray-300">{user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="mt-2 p-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete User
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-6">No users found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
