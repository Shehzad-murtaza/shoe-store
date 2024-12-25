'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useCart } from "@/app/context/cartContext";  // Make sure the import is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';

config.autoAddCss = false;
library.add(faTrashAlt);

// Define the structure of cart items (CartItem)
interface CartItem {
    id: number;
    name: string;
    price: number;
}

const Cart: React.FC = () => {
    const { cart, removeFromCart } = useCart();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);  // Track selected items
    const [isClient, setIsClient] = useState(false);  // Ensure this is client-side

    useEffect(() => {
        setIsClient(true);  // Update after the component mounts
    }, []);

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
                selectedItems.includes(item.id) ? total + item.price : total, 
                0
            )
            .toFixed(2);
    };

    // Handle checkout action
    const handleCheckout = () => {
        const total = calculateTotal();
        toast.success(`Proceeding to checkout with total: $${total}`);
    };

    if (!isClient) return null;  // Ensure the component is rendered only on the client

    return (
        <>
        <Header/>
        <div className="absolute inset-0 bg-gray-900 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl">
                <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300">Your cart is empty.</p>
                ) : (
                    <div className="space-y-6">
                        <ul className="space-y-4">
                            {cart.map((item: CartItem) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-4 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-300"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                {item.name}
                                            </h3>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FontAwesomeIcon icon="trash-alt" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                            <div className="flex justify-between text-lg font-medium text-gray-800 dark:text-white">
                                <span>Total:</span>
                                <span className="text-purple-600">${calculateTotal()}</span>
                            </div>
                            <button
                                className="mt-4 w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default Cart;
