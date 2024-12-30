'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!storedToken || !storedUser) {
          router.push('/pages/login');
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Fetch user's cart data from the API
        const response = await fetch(`/api/cart?userId=${parsedUser._id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`, // If token is needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }

        const data = await response.json();
        setCart(data.cart || []); // Set fetched cart data
      } catch (error) {
        console.error('Error fetching user or cart data:', error);
        router.push('/pages/login'); // Redirect if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/pages/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-darkblue">
        <div className="text-white font-medium text-lg text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-darkblue">
        <div className="text-white font-medium text-lg text-center">
          User not found. Please check the URL.
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
        <div className="bg-gray-700 rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">Profile Information</h2>
          <p className="text-gray-300">Email: {user.email}</p>
          <p className="text-gray-300">Full Name: {user.fullName}</p>
          <p className="text-gray-300">Role: {user.role}</p>
        </div>
        <div className="bg-gray-700 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <ul className="space-y-2">
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center bg-gray-800 rounded-md p-3 hover:bg-gray-900 transition"
                >
                  <span className="text-white font-medium">{product.name}</span>
                  <span className="text-gray-300">Quantity: {product.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
