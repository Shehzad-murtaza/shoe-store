'use client';

import React, { useState, useEffect } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';

const Header: React.FC<{ className?: string }> = ({ className }) => {
    const [active, setActive] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { clearCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

            if (storedToken && storedUser) {
                setIsLoggedIn(true);
                setIsAdmin(storedUser.role === 'admin');
            } else {
                setIsLoggedIn(false);
            }
        } catch {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        clearCart();
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home" />
                </Link>
                {isLoggedIn ? (
                    <>
                        {isAdmin ? (
                            <Link href={"/dashboard"}>
                                <MenuItem setActive={setActive} active={active} item="Dashboard" />
                            </Link>
                        ) : (
                            <Link href={"/profile"}>
                                <MenuItem setActive={setActive} active={active} item="Profile" />
                            </Link>
                        )}
                        <Link href={"/cart"}>
                            <MenuItem setActive={setActive} active={active} item="Cart" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-purple-400 transition duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href={"/login"}>
                            <MenuItem setActive={setActive} active={active} item="Login" />
                        </Link>
                        <Link href={"/signup"}>
                            <MenuItem setActive={setActive} active={active} item="Signup" />
                        </Link>
                    </>
                )}
            </Menu>
        </div>
    );
};

export default Header;
