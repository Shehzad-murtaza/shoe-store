'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';

// Define the product structure
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams() as { id: string }; // `id` is a string from `useParams`
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products`); // Fetch from the API
        const products: Product[] = await response.json();

        // Find the product with the matching ID
        const foundProduct = products.find((item) => item.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Handle case when product is not found
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading or error handling
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-darkblue">
        <div className="relative w-full max-w-md px-4">
          {/* Loading bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-purple-600 h-2.5 rounded-full animate-pulse"></div>
          </div>
          <div className="text-white font-medium text-lg text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-white text-center mt-12">Product not found. Please check the URL.</p>;
  }

  // Display product details
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-darkblue mt-32 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center text-white space-y-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{product.name}</h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-full md:w-1/2 max-w-[450px]">
            <div className="w-full h-[400px] overflow-hidden rounded-lg relative">
              <Image
                src={product.imageUrl}
                width={450}
                height={500}
                alt={product.name}
                className="object-cover object-bottom w-full h-full transition-transform transform hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-left space-y-6">
            <p className="text-lg md:text-xl text-neutral-300">{product.description}</p>
            <p className="text-2xl text-neutral-100 font-semibold">
              Price: <span className="text-purple-500">${product.price.toFixed(2)}</span>
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="mt-6 py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
