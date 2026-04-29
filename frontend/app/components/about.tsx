"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 bg-[#050505] overflow-hidden"
    >
      {/* Background Text Parallax */}
      <motion.div 
        style={{ x, opacity }}
        className="absolute top-1/4 left-0 text-[25vw] font-serif text-white/[0.02] select-none pointer-events-none italic whitespace-nowrap"
      >
        Elegance in Engineering
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Visual Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 glass shadow-2xl">
              <img 
                src="/assets/images/profile.png" 
                alt="Yogeshwaran" 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 glass-accent p-8 rounded-3xl border border-accent/20 hidden md:block"
            >
              <p className="text-4xl font-serif text-accent mb-1">4+</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Projects <br /> Mastered</p>
            </motion.div>
          </motion.div>

          {/* Right: Narrative */}
          <div className="space-y-12">
            <div>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-6"
              >
                The Philosophy
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif leading-tight mb-8"
              >
                Timeless Code, <br />
                <span className="text-luxury-gradient italic">Modern Design.</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="space-y-6 text-gray-400 text-lg font-light leading-relaxed"
              >
                <p>
                  I am a Frontend Architect driven by the pursuit of digital perfection. 
                  My approach blends the architectural rigor of software engineering 
                  with the aesthetic sensitivity of luxury design.
                </p>
                <p>
                  Specializing in <span className="text-white font-medium">React</span> and 
                  <span className="text-white font-medium"> Next.js</span>, I craft bespoke 
                  web experiences that are as performant as they are visually stunning. 
                  Every line of code is written with intent, every animation curated for 
                  sophistication.
                </p>
              </motion.div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
              <div className="space-y-2">
                <h4 className="text-accent font-serif text-xl italic">Performance</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Speed is the ultimate luxury in the digital age.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-accent font-serif text-xl italic">Precision</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Pixel-perfect execution is the baseline, not the goal.</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-8"
            >
              <a href="#contact" className="inline-flex items-center gap-4 text-accent group">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-accent/20 pb-1 group-hover:border-accent transition-all">Explore My Expertise</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
