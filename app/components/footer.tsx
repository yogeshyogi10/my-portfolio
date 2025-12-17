"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
} from "lucide-react";

const Footer: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCursorPos({ x, y });
  };

  const socials = [
    {
      icon: Github,
      href: "https://github.com/yogeshyogi10",
      title: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/yogeshwaran-m-4a0106294/",
      title: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/yogesh.webstudio?igsh=ZzBvcnBxNWpleXc0",
      title: "Instagram",
    },
    {
      icon: Mail,
      href: "mailto:yogeshhub004@gmail.com",
      title: "Email",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black px-6 py-10 border-t border-white/10">
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          relative
          max-w-6xl mx-auto
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          rounded-3xl
          px-6 md:px-10 py-6
          flex flex-col md:flex-row items-center justify-between gap-4
          shadow-[0_0_30px_rgba(255,255,255,0.08)]
          overflow-hidden
        "
      >
        {/* Interactive glow inside footer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute w-64 h-64 rounded-full bg-purple-500/25 blur-3xl opacity-40"
          animate={{ x: cursorPos.x * 0.2, y: cursorPos.y * 0.2 }}
          transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.5 }}
        />

        {/* Left */}
        <div className="relative z-10 text-center md:text-left space-y-1.5">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-300 font-medium">Yogesh</span>. All
            rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with Next.js, React, Tailwind CSS & Framer Motion.
          </p>

          {/* Availability pill */}
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1.5">
            <div className="relative flex items-center">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[11px] text-gray-300">
              Currently{" "}
              <span className="text-emerald-300 font-medium">
                available for freelance & projects
              </span>
            </p>
          </div>
        </div>

        {/* Center – quick nav + back to top */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4 text-xs text-gray-300">
            <a href="#home" className="hover:text-purple-300 transition">
              Home
            </a>
            <span className="text-gray-500">•</span>
            <a href="#about" className="hover:text-purple-300 transition">
              About
            </a>
            <span className="text-gray-500">•</span>
            <a href="#projects" className="hover:text-purple-300 transition">
              Projects
            </a>
            <span className="text-gray-500">•</span>
            <a href="#contact" className="hover:text-purple-300 transition">
              Contact
            </a>
          </div>

          <motion.a
            href="#home"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-purple-300 transition"
          >
            <span className="inline-block rotate-90">➤</span>
            Back to top
          </motion.a>
        </div>

        {/* Right – socials with icons */}
        <div className="relative z-10 flex items-center gap-2 flex-wrap justify-center md:justify-end">
          {socials.map(({ icon: Icon, href, title }) => (
            <motion.a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              title={title}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-8 h-8 rounded-full
                bg-black/60 border border-white/20
                flex items-center justify-center
                text-gray-200
                hover:border-purple-400 hover:text-purple-300
                transition
              "
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
