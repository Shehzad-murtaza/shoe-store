'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/app/pages/context/cartContext';
import { Background } from '@/components/background';
import Header from '@/components/Header';

const Cart: React.FC = () => {
    const { cart, addToCart, removeFromCart, clearCart, fetchCart, cartNotify } = useCart();

    // Initialize cart only when it's empty
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        // Fetch cart data only if it's not already loaded and user is logged in
        if (storedUser && cart.length === 0) { // Only fetch if cart is empty
            const { _id } = JSON.parse(storedUser);
            fetchCart(_id); // Fetch cart after login
        }
    }, [cart.length]);  // Dependency array only depends on cart.length
     // Added fetchCart to dependency array

    return (
        <>
            <div className="fixed -z-10 top-0 inset-0 h-full w-full">
                <Background />
            </div>
            <Header />
            <div className="container mx-auto p-6 bg-darkblue mt-40 min-h-screen">
                <h1 className="text-3xl font-semibold text-center text-white mb-6">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center text-gray-400">Your cart is empty.</p>
                ) : (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-purple-400">{item.name}</h2>
                                    <p className="text-gray-300">Price: ${item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 rounded-md text-purple-400 bg-gray-700 hover:bg-gray-600 transition duration-200"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="p-2 rounded-md text-purple-400 bg-gray-700 hover:bg-gray-600 transition duration-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={clearCart}
                                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                            >
                                Clear Cart
                            </button>
                            <div className="text-white">Items: {cartNotify}</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
