'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Header';
import './globals.css';
import { useState, ReactElement } from 'react';
import React from 'react';
import { CartProvider } from './context/cartContext';

// Define a user interface if possible
interface User {
  id: string;
  name: string;
  email: string;
}

interface RootLayoutProps {
  children: ReactElement<{ setUser: React.Dispatch<React.SetStateAction<User | null>>, user: User | null }>;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="en">
      <head><title>StepHub</title></head>
      <body>
        <CartProvider>
          <Header />
          <ToastContainer />
          <main>
            {React.cloneElement(children, { setUser, user })} {/* Pass both setUser and user */}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
