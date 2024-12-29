'use client';

import React, { useState, useEffect } from 'react';
import { Menu, MenuItem } from './ui/navbar-menu';
import { cn } from '@/libs/utils';
import Link from 'next/link';

const Header: React.FC<{ className?: string }> = ({ className }) => {
    const [active, setActive] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (storedToken && storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setIsLoggedIn(true);
                setIsAdmin(parsedUser?.role === 'admin');
            } else {
                setIsLoggedIn(false);
            }
        } catch {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home" />
                </Link>
                {isLoggedIn ? (
                    <>
                        {isAdmin ? (
                            <Link href={"/pages/dashboard"}>
                                <MenuItem setActive={setActive} active={active} item="Dashboard" />
                            </Link>
                        ) : (
                            <Link href={"/pages/profile"}>
                                <MenuItem setActive={setActive} active={active} item="Profile" />
                            </Link>
                        )}
                        <Link href={"/pages/cart"}>
                            <MenuItem setActive={setActive} active={active} item="Cart" />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={"/pages/login"}>
                            <MenuItem setActive={setActive} active={active} item="Login" />
                        </Link>
                        <Link href={"/pages/signup"}>
                            <MenuItem setActive={setActive} active={active} item="Signup" />
                        </Link>
                    </>
                )}
            </Menu>
        </div>
    );
};

export default Header;
