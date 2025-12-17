"use client";

import { motion } from "framer-motion";
import React from "react";

const skills = {
  "Frontend Core": ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript","Wordpress / Elementor"],
  "Frameworks & Libraries": ["React", "Next.js", "Framer Motion"],
  "Styling & UI": [
    "Tailwind CSS",
    "CSS Modules",
    "Responsive Design",
  ],
  "Tools & Workflow": ["Git & GitHub", "VS Code"],
} as const;

const skillDescriptions: Record<string, string> = {
  HTML5: "Semantic, accessible structure for modern web apps.",
  CSS3: "Custom layouts, animations and responsive styling.",
  "JavaScript (ES6+)": "Core logic, interactions and API handling.",
  TypeScript: "Type-safe, scalable frontend architecture.",
  React: "Component-based UI with hooks and state management.",
  "Next.js": "Production-grade React apps with routing, SEO and API routes.",
  "Framer Motion": "Fluid animations and micro-interactions for UI.",
  
  "Tailwind CSS": "Utility-first styling for fast, consistent design.",
  "CSS Modules": "Scoped, maintainable styles for components.",
  "Responsive Design": "Interfaces that adapt across all devices.",
  
  "Git & GitHub": "Version control, collaboration and code history.",
  Figma: "Design collaboration and UI prototyping.",
  "VS Code": "Efficient development environment with extensions.",
  
};

const Skills: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = React.useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setCursorPos({ x, y });
  };

  return (
    <section
      id="skills"
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

      {/* Soft orbs in background */}
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

      {/* Main card */}
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
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center text-white"
        >
          My <span className="text-purple-400">Skills</span>
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-24 h-1 bg-purple-500 mx-auto mt-4 rounded-full opacity-80"
        />

        {/* Skills Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl overflow-hidden"
            >
              {/* Hover gradient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-cyan-500/20 transition-opacity" />

              <div className="relative">
                <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-cyan-300 transition-colors">
                    {category}
                  </span>
                </h3>

                {/* Skill chips with stagger animation */}
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delayChildren: 0.1, staggerChildren: 0.05 },
                    },
                  }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {items.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedSkill(skill)}
                      className={`
                        cursor-pointer text-sm text-gray-200 px-3 py-1 rounded-full
                        bg-black/40 border border-white/15
                        transition-colors
                        ${
                          selectedSkill === skill
                            ? "bg-purple-600/40 border-purple-300 text-purple-100"
                            : ""
                        }
                      `}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Inspector – interactive detail section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 bg-black/40 border border-white/20 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-300/40 flex items-center justify-center text-xl">
            ⚙️
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-300/80">
              Skill Inspector
            </p>

            {selectedSkill ? (
              <>
                <p className="mt-2 text-gray-100 font-semibold text-base md:text-lg">
                  {selectedSkill}
                </p>
                <p className="mt-1 text-gray-400 text-sm md:text-base">
                  {skillDescriptions[selectedSkill] ??
                    "I actively use this skill in my projects to build better experiences."}
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-gray-100 font-semibold text-base md:text-lg">
                  Click any skill above
                </p>
                <p className="mt-1 text-gray-400 text-sm md:text-base">
                  Tap a skill chip to see how I use it in real projects – this helps
                  recruiters and clients quickly understand my strengths.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
