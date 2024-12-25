"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export function Background() {
  return (
    <div className="absolute inset-0 h-full w-full z-0">
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
