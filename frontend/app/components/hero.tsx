"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";
import { SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiDjango, SiPostgresql } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

const TECH_BADGES = [
  { label: "React", Icon: SiReact },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "Django", Icon: SiDjango },
  { label: "Postgres", Icon: SiPostgresql },
  { label: "Tailwind", Icon: SiTailwindcss },
  { label: "Framer", Icon: SiFramer },
];

const Hero: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const targetRef = useRef(null);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Parallax elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  if (!mounted) return <section ref={targetRef} className="min-h-screen bg-[#050505]" />;

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background Parallax Layers */}
      <motion.div 
        style={{ y: springY1 }}
        className="absolute top-20 left-[10%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: springY2 }}
        className="absolute bottom-20 right-[5%] w-[35vw] h-[35vw] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" 
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium tracking-widest uppercase mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Available for Luxury Digital Experiences
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[1.1] mb-8"
        >
          Crafting <span className="text-luxury-gradient italic">Elegance</span> <br />
          In Digital Spaces
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-light"
        >
          I am Yogeshwaran, a high-end Frontend Architect specializing in 
          premium web experiences that blend timeless design with 
          cutting-edge performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link
            href="#projects"
            className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:pr-14"
          >
            <span className="relative z-10">View Portfolio</span>
            <motion.span 
              className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-8 transition-all duration-300"
            >
              →
            </motion.span>
          </Link>
          <Link
            href="#contact"
            className="px-10 py-5 border border-white/10 hover:bg-white/5 font-bold rounded-full transition-all duration-300"
          >
            Start a Conversation
          </Link>
        </motion.div>

        {/* Tech Stack Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 pt-12 border-t border-white/5 w-full max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 font-medium">Expertise in Premium Technologies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {TECH_BADGES.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-3 group">
                <Icon size={24} className="group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium tracking-wide group-hover:text-white transition-colors">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Parallax Element */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-[-10%] left-[-5%] text-[20vw] font-serif text-white/5 select-none pointer-events-none italic"
      >
        Sophistication
      </motion.div>

      <motion.a
        href="https://wa.me/919944163807"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-10 right-10 z-50 group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-all duration-500" />
          <div className="relative w-16 h-16 bg-black border border-white/10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <FaWhatsapp size={24} className="text-accent" />
          </div>
        </div>
      </motion.a>

      {/* Storytelling Parallax Keywords */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[20%] right-[15%] text-[8vw] font-serif text-white/[0.03] select-none pointer-events-none"
      >
        Precision
      </motion.div>
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[30%] left-[10%] text-[10vw] font-serif text-white/[0.02] select-none pointer-events-none italic"
      >
        Performance
      </motion.div>
      <motion.div 
        style={{ y: springY1 }}
        className="absolute top-[40%] left-[5%] text-[6vw] font-serif text-white/[0.04] select-none pointer-events-none"
      >
        Elegance
      </motion.div>
    </section>
  );
};

export default Hero;
