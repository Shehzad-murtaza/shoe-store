'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';
import { Background } from '@/components/background';
import Header from '@/components/Header';

const Cart: React.FC = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const [selectedItems, setSelectedItems] = useState<number[]>([]); // Track selected items
    const [isClient, setIsClient] = useState(false); // Ensure this is client-side
    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Update after the component mounts

        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!storedToken || !storedUser) {
            clearCart();
            router.push('/login'); // Redirect to login if not logged in
        }
    }, [router, clearCart]);

    // Toggle selected items for checkout
    const handleSelectItem = (productId: number) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    // Calculate total price for selected items
    const calculateTotal = () => {
        return cart
            .reduce((total, item) =>
                selectedItems.includes(item.id) ? total + item.price * item.quantity : total, 0
            )
            .toFixed(2);
    };

    if (!isClient) {
        return null; // Render nothing on the server
    }

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
                                <button
                                    onClick={() => handleSelectItem(item.id)}
                                    className={`p-2 rounded-md ${
                                        selectedItems.includes(item.id) ? 'bg-purple-800' : 'bg-gray-800'
                                    } text-white hover:bg-purple-900 transition duration-200`}
                                >
                                    {selectedItems.includes(item.id) ? 'Deselect' : 'Select'}
                                </button>
                            </div>
                        ))}
                        <div className="text-right text-white mt-6">
                            <h2 className="text-2xl font-semibold">Total: ${calculateTotal()}</h2>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
