import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

// Type definitions
interface Product {
    id: number;
    name: string;
    price: number; // Add price if needed
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    cartNotify: number;
}

// Context initialization
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Initial cart setup, getting cart data from sessionStorage
    const [cart, setCart] = useState<Product[]>(() => {
        if (typeof window !== "undefined") {
            const storedCart = sessionStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    const [cartNotify, setCartNotify] = useState<number>(cart.length);

    // Update cartNotify and sessionStorage whenever cart changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('cart', JSON.stringify(cart)); // Save cart to sessionStorage
            setCartNotify(cart.length); // Update notification based on cart length
        }
    }, [cart]);

    // Add item to cart
    const addToCart = (product: Product) => {
        const exists = cart.find((item) => item.id === product.id);
        if (exists) {
            toast.error(`${product.name} is already in your cart!`, {
                toastId: `duplicate-${product.id}`, // Unique toast id for each product
            });
            return;
        }

        setCart((prevCart) => {
            toast.success(`${product.name} has been added to your cart!`, {
                toastId: `add-${product.id}`, // Unique toast id for each add action
            });
            return [...prevCart, product];
        });
    };

    // Remove item from cart
    const removeFromCart = (productId: number) => {
        setCart((prevCart) => {
            const product = prevCart.find((item) => item.id === productId);
            const updatedCart = prevCart.filter((item) => item.id !== productId);

            if (product) {
                toast.success(`${product.name} has been removed from your cart!`, {
                    toastId: `remove-${productId}`, // Unique toast id for each remove action
                });
            }

            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartNotify }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
