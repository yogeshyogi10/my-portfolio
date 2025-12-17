"use client";

import { motion, useMotionValue } from "framer-motion";
import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiWordpress,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

const DOODLES = [
  `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M25 15 C15 30 15 70 25 85" stroke-linecap="round"/>
      <path d="M75 15 C85 30 85 70 75 85" stroke-linecap="round"/>
   </svg>`,
  `<svg viewBox="0 0 110 110" fill="none" stroke="currentColor" stroke-width="1.6">
      <circle cx="55" cy="55" r="40" stroke-dasharray="4 6"/>
   </svg>`,
  `<svg viewBox="0 0 100 50" fill="none" stroke="currentColor" stroke-width="3">
      <polyline points="0,40 20,10 40,40 60,10 80,40 100,10" stroke-linecap="round"/>
   </svg>`,
  `<svg viewBox="0 0 100 100" fill="currentColor">
      <circle cx="20" cy="20" r="3"/>
      <circle cx="50" cy="20" r="3"/>
      <circle cx="80" cy="20" r="3"/>
      <circle cx="20" cy="50" r="3"/>
      <circle cx="50" cy="50" r="3"/>
      <circle cx="80" cy="50" r="3"/>
   </svg>`,
];

const DOODLE_COLORS = [
  "text-purple-300/45",
  "text-cyan-300/45",
  "text-pink-300/45",
  "text-sky-300/40",
];

const TECH_BADGES: { label: string; Icon: React.ElementType }[] = [
  { label: "React", Icon: SiReact },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "WordPress", Icon: SiWordpress },
  { label: "Tailwind CSS", Icon: SiTailwindcss },
  { label: "Framer Motion", Icon: SiFramer },
];

const Hero: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const doodles = React.useMemo(
    () =>
      Array.from({ length: 16 }).map(() => ({
        svg: DOODLES[Math.floor(Math.random() * DOODLES.length)],
        top: Math.random() * 80 + 5,
        left: Math.random() * 80 + 5,
        size: Math.random() * 70 + 60,
        baseRotate: Math.random() * 40 - 20,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 8,
        color: DOODLE_COLORS[Math.floor(Math.random() * DOODLE_COLORS.length)],
      })),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setCursorPos({ x, y });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;

    const rotateX = ((cardY - rect.height / 2) / rect.height) * -8;
    const rotateY = ((cardX - rect.width / 2) / rect.width) * 10;

    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleCardMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden min-h-screen flex items-center px-6 py-16 bg-gradient-to-br from-black via-gray-900 to-gray-800"
    >
      {/* 🎨 Random doodles across hero */}
      {doodles.map((d, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute z-0 ${d.color}`}
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
          }}
          dangerouslySetInnerHTML={{ __html: d.svg }}
          animate={{
            opacity: [0.18, 0.55, 0.18],
            y: [0, -14, 0],
            rotate: [d.baseRotate, d.baseRotate + 8, d.baseRotate],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Interactive glow following cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.22),_transparent_55%)] z-0"
        animate={{ x: cursorPos.x, y: cursorPos.y }}
        transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.5 }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Text card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1000,
          }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="
            relative
            max-w-l
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            p-8 md:p-10 rounded-3xl
            shadow-[0_0_50px_rgba(255,255,255,0.15)]
            text-center md:text-left
          "
        >
          {/* Pulsing outline glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl border border-purple-400/40"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Small intro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative text-purple-400 text-lg font-semibold tracking-wide"
          >
            Hello 👋, I&apos;m
          </motion.p>

          {/* Name with animated gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="
              relative mt-2
              text-4xl md:text-5xl lg:text-6xl font-extrabold
              text-transparent bg-clip-text
              bg-gradient-to-r from-purple-300 via-white to-cyan-300
            "
          >
            <motion.span
              animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="inline-block bg-[length:200%_200%] bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent"
            >
              YOGESHWARAN
            </motion.span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative text-lg md:text-xl lg:text-2xl mt-4 text-gray-300"
          >
            Frontend Developer • React • Next.js • WordPress
          </motion.h2>

          {/* Tech Badges with Icons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="relative flex flex-wrap gap-3 mt-6 justify-center md:justify-start"
          >
            {TECH_BADGES.map(({ label, Icon }) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center gap-2
                  px-3.5 py-1.5 text-sm rounded-full
                  bg-white/10 border border-white/20 backdrop-blur-xl
                  text-gray-200 shadow-[0_0_12px_rgba(255,255,255,0.18)]
                  cursor-default
                "
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="relative text-gray-400 mt-6 text-base md:text-lg leading-relaxed"
          >
            I build fast, visually stunning and responsive websites using
            <span className="text-purple-400"> React</span>,{" "}
            <span className="text-purple-400"> Next.js</span>,{" "}
            <span className="text-purple-400"> WordPress / Elementor</span> and{" "}
            <span className="text-purple-400"> Tailwind CSS</span>. Focused on
            performance, clean UI/UX and SEO-ready builds.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="relative mt-8 flex flex-wrap items-center gap-4 md:gap-5"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-xl hover:bg-purple-700 transition"
            >
              View Projects
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="px-6 py-3 rounded-xl border border-purple-400 text-purple-300 hover:bg-purple-500/20 transition font-semibold"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Person image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <motion.div
            className="relative w-56 sm:w-64 md:w-72 lg:w-80"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            {/* Glow behind person */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-purple-500/30 via-transparent to-transparent blur-3xl" />

            {/* Ground shadow / base */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full bg-black/70 blur-xl opacity-80" />

            {/* Person image */}
            <motion.div
              className="
                relative rounded-[2.5rem] overflow-hidden
                border border-white/20 bg-white/5 backdrop-blur-xl
                shadow-[0_20px_40px_rgba(0,0,0,0.7)]
              "
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <img
                src="/assets/images/profile.png"
                alt="Yogeshwaran standing"
                className="w-full h-95 object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 💬 Floating WhatsApp button */}
      <motion.a
        href="https://wa.me/919944163807" // TODO: put your real number here
        target="_blank"
        rel="noreferrer"
        className="
          fixed
          bottom-6 right-6
          md:bottom-8 md:right-8
          z-50
        "
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.div
          className="
            relative
            w-12 h-12 md:w-14 md:h-14
            rounded-full
            bg-[#25D366]
            flex items-center justify-center
            shadow-[0_0_25px_rgba(37,211,102,0.7)]
            border border-white/20
          "
          animate={{ boxShadow: [
            "0 0 18px rgba(37,211,102,0.5)",
            "0 0 28px rgba(37,211,102,0.9)",
            "0 0 18px rgba(37,211,102,0.5)",
          ]}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
