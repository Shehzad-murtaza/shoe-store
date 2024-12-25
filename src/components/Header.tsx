'use client';

import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/libs/utils";
import Link from "next/link";

interface HeaderProps {
  className?: string; // className is optional
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Effect to check if user is logged in based on token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsLoggedIn(!!storedToken); // Update state based on token existence
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        {isLoggedIn ? (
          <Link href={"/dashboard"}>
            <MenuItem setActive={setActive} active={active} item="Dashboard" />
          </Link>
        ) : (
          <Link href={"/login"}>
            <MenuItem setActive={setActive} active={active} item="Login" />
          </Link>
        )}
        <Link href={"/signup"}>
          <MenuItem setActive={setActive} active={active} item="Signup" />
        </Link>
        <Link href={"/cart"}>
          <MenuItem setActive={setActive} active={active} item="Cart" />
        </Link>
      </Menu>
    </div>
  );
};

export default Header;
