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
    fetchCart: (userId: string) => void; // Added fetchCart function here
    cartNotify: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]); // Current cart state
    const [cartNotify, setCartNotify] = useState<number>(0);
    const router = useRouter();

    // Fetch cart data from the server
    const fetchCart = async (userId: string) => {
        try {
            const response = await axios.get(`/api/cart?userId=${userId}`);
            setCart(response.data.cart || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Failed to load cart data. Please try again.');
        }
    };

    // Initialize cart only on first load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { _id } = JSON.parse(storedUser);
            fetchCart(_id); // Fetch cart after login
        }
    }, []);

    // Sync cart with session storage
    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        setCartNotify(cart.reduce((acc, product) => acc + product.quantity, 0));
    }, [cart]);

    // Save cart to server
    const saveCartToServer = async (updatedCart: Product[]) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return;

        const { _id } = JSON.parse(storedUser);
        try {
            await axios.post('/api/cart', { userId: _id, cart: updatedCart });
        } catch (error) {
            console.error('Error syncing cart:', error);
            toast.error('Failed to sync cart with server.');
        }
    };

    // Add product to cart
    const addToCart = (product: Product) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            toast.error('Please log in to add items to the cart.');
            router.push('/pages/signup');
            return;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            return existingProduct
                ? prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...prevCart, { ...product, quantity: 1 }];
        });

        saveCartToServer(cart);  // Save cart immediately after adding an item
        toast.success(`${product.name} added to cart.`);
    };

    // Remove product from cart
    const removeFromCart = (productId: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
            ).filter((item) => item.quantity > 0)
        );
        saveCartToServer(cart);  // Save cart after removal
        toast.info('Product removed from cart.');
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { _id } = JSON.parse(storedUser);
            axios.post('/api/cart', { userId: _id, cart: [] }).catch((error) => {
                console.error('Error clearing cart:', error);
                toast.error('Failed to clear cart.');
            });
        }
        sessionStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                fetchCart, // Make sure fetchCart is passed in context
                cartNotify,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
