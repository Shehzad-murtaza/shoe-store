import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Type definitions
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartNotify: number;
}

// Context initialization
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [cartNotify, setCartNotify] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchCart = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                try {
                    const response = await axios.get(`/api/cart?userId=${parsedUser._id}`);
                    setCart(response.data.cart || []); // Ensure cart is always an array
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        setCartNotify(cart.reduce((acc, product) => acc + product.quantity, 0));
    }, [cart]);

    const saveCartToUser = async (updatedCart: Product[]) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            try {
                await axios.post('/api/cart', { userId: parsedUser._id, cart: updatedCart });
                parsedUser.cart = updatedCart;
                localStorage.setItem('user', JSON.stringify(parsedUser));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        }
    };

    const addToCart = (product: Product) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            toast.error('Please login or signup to add items to the cart');
            router.push('/pages/signup');
            return;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            const updatedCart = existingProduct
                ? prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...prevCart, { ...product, quantity: 1 }];
            saveCartToUser(updatedCart);
            return updatedCart;
        });
        toast.success(`${product.name} added to cart`);
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === productId);
            const updatedCart = existingProduct && existingProduct.quantity > 1
                ? prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                : prevCart.filter((item) => item.id !== productId);
            saveCartToUser(updatedCart);
            return updatedCart;
        });
        toast.info(`Product removed from cart`);
    };

    const clearCart = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            try {
                await axios.post('/api/cart', { userId: parsedUser._id, cart: [] });
                parsedUser.cart = [];
                localStorage.setItem('user', JSON.stringify(parsedUser));
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        }
        setCart([]);
        sessionStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartNotify }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};