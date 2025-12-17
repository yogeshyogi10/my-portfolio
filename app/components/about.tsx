"use client";

import { motion } from "framer-motion";
import React from "react";

const About: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setCursorPos({ x, y });
  };

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-900 to-black"
    >
      {/* Interactive glow following cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.22),_transparent_55%)]"
        animate={{ x: cursorPos.x, y: cursorPos.y }}
        transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.5 }}
      />

      {/* Soft floating orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl -top-24 left-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl -bottom-32 right-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        animate={{ x: cursorPos.x * 0.1, y: cursorPos.y * 0.1 }} // subtle parallax
        className="
          relative z-10
          max-w-5xl mx-auto
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          p-10 md:p-14 rounded-3xl
          shadow-[0_0_40px_rgba(255,255,255,0.1)]
        "
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            About <span className="text-purple-400">Me</span>
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="h-1 bg-purple-500 mx-auto mt-4 rounded-full opacity-80"
          />
        </motion.div>

        {/* Content layout */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.6fr_1.1fr] gap-10 items-start">
          {/* Left: main text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            <p>
              I&apos;m a passionate{" "}
              <span className="text-purple-400 font-semibold">
                Frontend Developer
              </span>{" "}
              who loves building beautiful, responsive and user-friendly web
              interfaces.
            </p>

            <p className="mt-4">
              I specialize in{" "}
              <span className="text-purple-400">React</span>,{" "}
              <span className="text-purple-400">Next.js</span>,{" "}
              <span className="text-purple-400">WordPress / Elementor</span> and{" "}
              <span className="text-purple-400">Tailwind CSS</span>. I enjoy
              turning UI/UX designs into pixel-perfect applications and full
              websites – from custom React/Next.js builds to marketing and
              business sites in WordPress.
            </p>

            <p className="mt-4">
              My goal is to craft experiences that are performant, accessible,
              and visually stunning – making the web more beautiful one
              interface at a time.
            </p>

            {/* Animated skill chips */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delayChildren: 0.2, staggerChildren: 0.06 },
                },
              }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "WordPress / Elementor",
                
                "Responsive Design",
              ].map((tag) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="text-sm px-3 py-1 rounded-full bg-black/40 border border-white/15 text-gray-100"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: mini timeline / what I do */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 border border-white/15 rounded-2xl p-5 md:p-6 space-y-4"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-purple-300/80">
              What I Do
            </p>

            <div className="space-y-4">
              <motion.div whileHover={{ x: 4 }} className="flex gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-purple-400" />
                <div>
                  <p className="text-gray-100 font-semibold text-sm">
                    Frontend experiences
                  </p>
                  <p className="text-gray-400 text-sm">
                    Crafting interactive, modern UIs with smooth animations and
                    clean code using React, Next.js and Tailwind.
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 4 }} className="flex gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-pink-400" />
                <div>
                  <p className="text-gray-100 font-semibold text-sm">
                    Design to development
                  </p>
                  <p className="text-gray-400 text-sm">
                    Translating Figma/UI concepts into pixel-perfect, responsive
                    pages – whether it&apos;s a custom React app or a
                    WordPress/Elementor website.
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 4 }} className="flex gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400" />
                <div>
                  <p className="text-gray-100 font-semibold text-sm">
                    Performance & accessibility
                  </p>
                  <p className="text-gray-400 text-sm">
                    Focusing on fast loads, clean structure and inclusive
                    experiences across devices and platforms.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
              Currently open to{" "}
              <span className="text-purple-300">
                frontend projects in React/Next.js and WordPress
              </span>{" "}
              – freelance, remote and collaboration opportunities.
            </div>
          </motion.div>
        </div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
        >
          {[
            { label: "Months Experience", value: "5+" },
            { label: "Projects Completed", value: "4+" },
            { label: "Tools & Tech Skills", value: "10+" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl text-center overflow-hidden group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-cyan-500/20 transition-opacity" />
              <div className="relative">
                <h3 className="text-white text-3xl font-bold">{item.value}</h3>
                <p className="text-gray-400 mt-2 text-sm">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
