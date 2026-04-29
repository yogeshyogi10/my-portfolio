"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const ScrollPath: React.FC = () => {
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };
    // Initial height might be 0, wait for content
    setTimeout(updateHeight, 500);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map progress to path drawing
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Adjust path points based on page height
  const getPath = () => {
    const segments = 10;
    let d = "M 50 0";
    for (let i = 1; i <= segments; i++) {
      const y = (i / segments) * pageHeight;
      const cp1y = ((i - 0.5) / segments) * pageHeight;
      const cp2y = ((i - 0.5) / segments) * pageHeight;
      const x = i % 2 === 0 ? 80 : 20;
      d += ` C ${100 - x} ${cp1y}, ${x} ${cp2y}, 50 ${y}`;
    }
    return d;
  };

  if (pageHeight === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <svg
        width="100%"
        height={pageHeight}
        viewBox={`0 0 100 ${pageHeight}`}
        fill="none"
        preserveAspectRatio="none"
        className="absolute top-0 left-0"
      >
        <motion.path
          d={getPath()}
          stroke="url(#luxury-gradient)"
          strokeWidth="1"
          style={{ pathLength }}
        />
        
        <defs>
          <linearGradient id="luxury-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-muted)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ScrollPath;
