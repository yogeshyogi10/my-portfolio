"use client";

import React, { useState, useEffect } from "react";
import ThreeScene from "./ThreeScene";

const CinematicIntro = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-[#030303] flex items-center justify-center">
         <div className="text-accent font-serif italic text-xl animate-pulse">
           Initializing 3D Engine...
         </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ThreeScene />
    </div>
  );
};

export default CinematicIntro;
