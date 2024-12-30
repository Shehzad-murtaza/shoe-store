'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '@/components/Header';
import { Background } from '@/components/background';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  cart: Product[];
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      router.push('/pages/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        setUser(parsedUser);
        if (parsedUser.role === 'admin') {
          fetchUsers();
        } else {
          router.push('/pages/profile');
        }
      } else {
        router.push('/pages/login');
      }
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
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
    router.push('/pages/login');
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.post('/api/auth', {
        action: 'delete',
        userId,
      });

      if (response.status === 200) {
        toast.success('User deleted successfully');
        fetchUsers();
        setSelectedUser(null); // Close the panel after deletion
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
      <div className="flex justify-center items-center min-h-screen bg-darkblue">
        <div className="text-white font-medium text-lg text-center">Loading...</div>
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
          Welcome, {user?.fullName}
        </h1>
        <div className="text-center mb-6">
          <button
            onClick={handleLogout}
            className="p-2 z-50 text-white bg-purple-800 rounded-md hover:bg-purple-900 transition duration-200"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-700 rounded-lg shadow-md p-4 hover:bg-gray-800 transition duration-300"
              >
                <h2 className="text-xl font-semibold text-purple-600">{user.fullName}</h2>
                <p className="text-gray-300">{user.email}</p>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="mt-2 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No users found.</p>
          )}
        </div>
      </div>

      {/* User Details Panel */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedUser.fullName}&apos;s Details</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Cart:</strong></p>
            <ul className="list-disc ml-5">
              {selectedUser.cart.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price} (x{product.quantity})
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteUser(selectedUser._id)}
              className="mt-4 p-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
            >
              Delete User
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;