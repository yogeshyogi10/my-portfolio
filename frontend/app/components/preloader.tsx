"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303]"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif tracking-tighter text-white">
                Yogesh<span className="text-accent italic font-light">waran</span>
              </h2>
            </motion.div>

            {/* Percentage Counter */}
            <div className="relative h-20 w-40 flex items-center justify-center">
              <motion.span 
                className="text-6xl md:text-8xl font-serif text-white/10 absolute inset-0 flex items-center justify-center"
              >
                {Math.round(progress)}%
              </motion.span>
              <motion.div 
                className="text-accent font-serif text-sm tracking-[0.5em] uppercase"
              >
                Initializing
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="mt-12 w-48 h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-0 bg-accent"
              />
            </div>
            
            <p className="mt-6 text-[9px] uppercase tracking-[0.4em] text-gray-600">
              Crafting Digital Excellence
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
