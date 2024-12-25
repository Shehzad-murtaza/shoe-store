'use client';

import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/libs/utils";
import Link from "next/link";

// Define the props for the Header component
interface HeaderProps {
  className?: string; // className is optional
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null); // active can be a string or null

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <Link href={"/login"}>
          <MenuItem setActive={setActive} active={active} item="Login" />
        </Link>
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
