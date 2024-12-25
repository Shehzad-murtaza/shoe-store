'use client';
import ProductList from './products/page';
import './globals.css';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-darkblue flex flex-col items-center justify-start py-12 px-6 space-y-12">
            {/* Hero Section */}
            <section className="w-full min-h-screen bg-gradient-to-r from-purple-700 to-purple-600 flex items-center justify-center text-center py-24 px-4 relative">
                <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay */}
                <div className="relative z-10 space-y-6 text-white">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:text-opacity-90 transition-all duration-300">
                        Welcome to StepHub
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                        Discover the perfect shoes for every occasion. Explore our wide range of premium footwear designed to match your style.
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex justify-center space-x-8 mt-6">
                        <Link href="./products">
                            <button className="px-10 py-4 bg-purple-600 text-white rounded-lg font-semibold shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 transform hover:scale-105">
                                Explore Products
                            </button>
                        </Link>
                        <button className="px-10 py-4 bg-gray-700 text-white rounded-lg font-semibold shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 transform hover:scale-105">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Product List Section */}
            <section className="w-full px-4 py-8 bg-darkblue">
                <ProductList />
            </section>
             <Footer/>
        </div>
    );
}
