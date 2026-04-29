"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User } from "lucide-react";

const links = [
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState<string>("home");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const selector = id.startsWith("#") ? id : `#${id}`;
    const el = document.querySelector(selector);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    scrollToSection(id);
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        w-[92%] md:w-[85%] lg:w-[65%]
        px-8 py-5 rounded-full
        flex items-center justify-between
        border transition-all duration-500
        ${
          isScrolled
            ? "bg-black/40 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl py-4"
            : "bg-white/[0.02] border-white/5 backdrop-blur-md"
        }
      `}
    >
      {/* Precision Progress Bar */}
      <motion.div
        className="absolute top-0 left-8 right-8 h-[1px] bg-accent/30 origin-left"
        style={{ scaleX: scrollProgress }}
      />
      <motion.div
        className="absolute top-0 left-8 right-8 h-[1px] bg-accent origin-left blur-[1px]"
        style={{ scaleX: scrollProgress }}
      />
      {/* Logo */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative text-white text-2xl font-serif tracking-tight"
        onClick={() => handleNavClick("home")}
      >
        Yogesh<span className="text-accent italic font-light">waran</span>
      </motion.button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-12">
        <ul className="flex gap-10 text-[11px] uppercase tracking-[0.25em] font-medium">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`relative transition-all duration-300 hover:text-accent ${
                  active === link.id ? "text-accent" : "text-gray-400"
                }`}
              >
                {link.label}
                <AnimatePresence>
                  {active === link.id && (
                    <motion.div 
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                    />
                  )}
                </AnimatePresence>
              </button>
            </li>
          ))}
        </ul>
        
        <Link href="/login">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-accent hover:border-accent/40 transition-all cursor-pointer shadow-lg shadow-black/20"
            title="Admin Login"
          >
            <User size={18} />
          </motion.div>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 md:hidden">
        <Link href="/login">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-accent"
          >
            <User size={18} />
          </motion.div>
        </Link>
        
        <button
          className="text-white text-2xl p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[80px] left-0 right-0 p-4 md:hidden"
          >
            <div className="bg-black/90 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
              <ul className="flex flex-col gap-6 text-[12px] uppercase tracking-widest font-medium">
                {links.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className={`block w-full text-left py-2 ${
                        active === link.id ? "text-accent" : "text-gray-300"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
