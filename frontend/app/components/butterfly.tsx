"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React from "react";

const SingleButterfly: React.FC<{ 
  delay: number; 
  pathX: string[]; 
  pathY: string[]; 
  size: number;
  color: string;
}> = ({ delay, pathX, pathY, size, color }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const x = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], pathX);
  const y = useTransform(smoothProgress, [0, 1], pathY);
  const rotate = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -30, 30, -15, 20, 0]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: x,
        top: y,
        rotate: rotate,
        zIndex: 40,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay, duration: 1.5, ease: "easeOut" }}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div className={`absolute inset-0 bg-${color}/20 rounded-full blur-xl scale-150`} />
        
        <motion.div
          animate={{ rotateY: [0, 80, 0] }}
          transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 origin-right w-[60%] h-[100%] bg-gradient-to-br from-${color} via-accent-muted to-transparent rounded-tl-[100%] rounded-bl-[80%] opacity-80`}
          style={{ transformStyle: "preserve-3d" }}
        />
        
        <motion.div
          animate={{ rotateY: [0, -80, 0] }}
          transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute right-1/2 origin-left w-[60%] h-[100%] bg-gradient-to-bl from-${color} via-accent-muted to-transparent rounded-tr-[100%] rounded-br-[80%] opacity-80`}
          style={{ transformStyle: "preserve-3d" }}
        />
        
        <div className="absolute w-[8%] h-[70%] bg-black border border-white/10 rounded-full" />
      </div>
    </motion.div>
  );
};

const Butterfly: React.FC = () => {
  const butterflies = [
    { 
      delay: 3, 
      pathX: ["80%", "20%", "70%", "30%", "85%", "15%"], 
      pathY: ["10vh", "90vh"], 
      size: 48,
      color: "accent"
    },
    { 
      delay: 3.5, 
      pathX: ["10%", "80%", "20%", "90%", "15%", "70%"], 
      pathY: ["20vh", "80vh"], 
      size: 32,
      color: "platinum"
    },
    { 
      delay: 4, 
      pathX: ["50%", "10%", "90%", "40%", "70%", "30%"], 
      pathY: ["5vh", "95vh"], 
      size: 40,
      color: "accent"
    }
  ];

  return (
    <>
      {butterflies.map((b, i) => (
        <SingleButterfly key={i} {...b} />
      ))}
    </>
  );
};

export default Butterfly;
