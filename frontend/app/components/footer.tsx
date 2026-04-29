"use client";

import { motion } from "framer-motion";
import React from "react";
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const socials = [
    { icon: Github, href: "https://github.com/yogeshyogi10", title: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yogeshwaran-m-4a0106294/", title: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/yogesh.webstudio?igsh=ZzBvcnBxNWpleXc0", title: "Instagram" },
    { icon: Mail, href: "mailto:yogeshhub004@gmail.com", title: "Email" },
  ];

  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-16">
          
          {/* Logo & Narrative */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white">
              Yogesh<span className="text-accent italic font-light">waran</span>
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto text-xs uppercase tracking-[0.4em] leading-relaxed">
              Architecting Premium Digital <br /> Experiences with Precision.
            </p>
          </div>

          {/* Social Curation */}
          <div className="flex items-center gap-10">
            {socials.map(({ icon: Icon, href, title }) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, color: "var(--accent)" }}
                className="text-gray-500 transition-colors duration-500"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600">
            <a href="#home" className="hover:text-white transition-colors">Residence</a>
            <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#projects" className="hover:text-white transition-colors">Atelier</a>
            <a href="#skills" className="hover:text-white transition-colors">Expertise</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="group flex flex-col items-center gap-3"
          >
            <div className="w-px h-12 bg-white/10 group-hover:bg-accent transition-colors" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 group-hover:text-accent transition-colors">Ascend</span>
          </motion.button>

          {/* Legal & Credits */}
          <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
              © {new Date().getFullYear()} Yogeshwaran. All Rights Reserved.
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
              Coded with <span className="text-accent italic font-serif">Excellence</span> using Next.js
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[20vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
