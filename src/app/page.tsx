'use client';
import ProductList from './products/page';
import './globals.css';
import HeroSection from '@/components/HeroSection'; // Import HeroSection component
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-darkblue flex flex-col items-center justify-start py-12 px-6 space-y-12">
                {/* Hero Section */}
                <HeroSection /> {/* Use HeroSection component */}

                {/* Featured Section */}
                <section className="w-full bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 p-8 rounded-lg shadow-lg text-center mb-0">
                    <h2 className="text-4xl font-extrabold text-white mb-4">
                        Featured Products
                    </h2>
                    <p className="text-purple-200 text-lg">
                        Discover our top picks and trending products, handpicked just for you!
                    </p>
                </section>

                {/* Product List Section */}
                <section className="w-full px-4 py-8 bg-darkblue">
                    <ProductList />
                </section>

                <Footer />
            </div>
        </>
    );
}