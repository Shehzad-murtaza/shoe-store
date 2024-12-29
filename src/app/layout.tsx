'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import { useState, ReactElement } from 'react';
import React from 'react';
import { CartProvider } from './pages/context/cartContext';

interface User {
  id: string;
  name: string;
  email: string;
}

interface RootLayoutProps {
  children: ReactElement<{
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    user: User | null;
  }>;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="en">
      <head>
        <title>StepHub</title>
      </head>
      <body>

        {/* Main Content */}
        <CartProvider>
          <ToastContainer />
          <main>
            {React.cloneElement(children, { setUser, user })} {/* Pass both setUser and user */}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}