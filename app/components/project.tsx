"use client";

import { motion } from "framer-motion";
import React from "react";

const projects = [
  {
    title: "Portfolio Website",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    description:
      "Personal portfolio with smooth page transitions, glassmorphism UI and responsive design.",
    link: "#",
  },
  {
    title: "Tijaruk",
    tech: ["Angular", "TypeScript", "Angular Animations"],
    description:
      "Tijaruk is a website which helps to set-up and support companies exclusively in GCC countries, built with reusable components, leaflet and purple theme.",
    link: "https://tijaruk.com/",
  },
  {
    title: "Abuhind",
    tech: ["React", "Tailwind", "GSAP Animations"],
    description:
      "Abuhind is a landing page for an e-commerce platform that offers exclusively rice import and export and part of tijaruk, featuring smooth scrolling animations and a modern design.",
    link: "https://tijaruk.com/abuhind/",
  },
  {
    title: "Indania",
    tech: ["React", "Tailwind", "GSAP Animations"],
    description:
      "Indania is a landing page for import and export of spices, for now exclusively focusing on tea powder, featuring smooth scrolling animations and a standard design.",
    link: "https://indaniafoods.com/",
  },
    {
    title: "Delicio",
    tech: ["Wordpress", "Elementor"],
    description:
      "Delicio is a import and export website built using wordpress, elementor and other plugins, featuring smooth animations and a modern design.",
    link: "https://deliciouae.com/",
  },
] as const;

const Projects: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setCursorPos({ x, y });
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
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

      {/* Background orbs */}
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
          max-w-6xl mx-auto
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          p-10 md:p-14 rounded-3xl
          shadow-[0_0_40px_rgba(255,255,255,0.1)]
        "
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center text-white"
        >
          Selected <span className="text-purple-400">Projects</span>
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 120, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-28 h-1 bg-purple-500 mx-auto mt-4 rounded-full opacity-80"
        />

        {/* Active Project Preview */}
        <motion.div
          key={activeProject.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mt-10 mb-8
            bg-black/50 border border-white/20 rounded-2xl
            p-6 md:p-7 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center
          "
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-300/40 flex items-center justify-center text-lg text-purple-100">
            {String(activeIndex + 1).padStart(2, "0")}
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-300/80">
              Active Project
            </p>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white">
              {activeProject.title}
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-300">
              {activeProject.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {activeProject.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-purple-100 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/40"
                >
                  {t}
                </span>
              ))}
            </div>

            {activeProject.link && (
              <motion.a
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="mt-4 inline-flex items-center text-sm text-purple-300 hover:text-purple-200"
              >
                View live / case study
                <span className="ml-2">↗</span>
              </motion.a>
            )}
          </div>

          <div className="hidden md:flex flex-col items-end text-right text-xs text-gray-400">
            <span>Project {activeIndex + 1}</span>
            <span className="text-gray-500">
              of {projects.length.toString().padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.button
                key={project.title}
                type="button"
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative group text-left
                  bg-black/40 border rounded-2xl p-6 flex flex-col justify-between overflow-hidden
                  transition-colors
                  ${
                    isActive
                      ? "border-purple-400/70 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                      : "border-white/15"
                  }
                `}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-cyan-500/15 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white text-lg font-semibold">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-400">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-300 text-sm">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-purple-200 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex items-center justify-between text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-purple-400" : "bg-gray-500"
                      }`}
                    />
                    {isActive ? "Currently viewing" : "Tap to preview"}
                  </span>

                  {project.link && (
                    <span className="inline-flex items-center gap-1 text-purple-300 group-hover:text-purple-200">
                      Live / Case Study
                      <span>↗</span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
