// components/ShowToken.tsx
'use client';

import React, { useEffect, useState } from 'react';

const ShowToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // On component mount, get the token from localStorage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Your Token</h1>
        <div className="mt-4">
          {token ? (
            <p className="text-lg font-semibold text-gray-700">Token: {token}</p>
          ) : (
            <p className="text-lg font-semibold text-gray-700">No Token Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowToken;
