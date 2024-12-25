import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function HeroSection() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-purple-400 to-pink-600 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Welcome to StepHub, <br /> Discover Your Perfect Footwear.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Explore our premium collection of footwear, designed to match every style and occasion. Discover the latest trends and find your perfect pair today.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex justify-center space-x-8 mt-6">
        <a href="/products">
          <button className="px-10 py-4 bg-purple-600 text-white rounded-lg font-semibold shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 transform hover:scale-105">
            Explore Products
          </button>
        </a>
        <button className="px-10 py-4 bg-gray-700 text-white rounded-lg font-semibold shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 transform hover:scale-105">
          Contact Us
        </button>
      </div>
    </BackgroundLines>
  );
}
