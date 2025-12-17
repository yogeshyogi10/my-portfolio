"use client";

import { motion } from "framer-motion";
import React from "react";

const links = [
  // we keep only section links here (hero handled by logo)
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [active, setActive] = React.useState<string>("home");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Scroll effects: shadow + progress bar
  React.useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
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

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[92%] md:w-[75%] lg:w-[60%]
          px-6 py-4 rounded-2xl
          flex items-center justify-between
          border
          ${
            isScrolled
              ? "bg-black/60 border-white/25 shadow-[0_18px_45px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
              : "bg-white/10 border-white/20 shadow-xl backdrop-blur-xl"
          }
          transition-all duration-300
        `}
      >
        {/* Scroll progress strip */}
        <motion.div
          className="absolute left-0 top-0 h-0.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        {/* Logo → scroll to hero (#home) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-white text-2xl font-bold tracking-wide"
          onClick={() => handleNavClick("home")}
        >
          <span className="bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Portfolio
          </span>
        </motion.button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-gray-200 font-medium">
          {links.map((link) => (
            <li key={link.id}>
              <motion.button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`relative pb-1 ${
                  active === link.id ? "text-purple-400" : "text-gray-200"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                {/* animated underline */}
                <motion.span
                  className="absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                  initial={false}
                  animate={{
                    width: active === link.id ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.25 }}
                />
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger icon */}
        <motion.button
          className="md:hidden text-white text-2xl cursor-pointer relative"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </motion.button>
      </motion.nav>

      {/* Mobile menu dropdown */}
      <motion.div
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: "auto" },
          closed: { opacity: 0, y: -10, pointerEvents: "none" },
        }}
        transition={{ duration: 0.25 }}
        className="
          md:hidden fixed top-[72px] left-1/2 -translate-x-1/2 z-40
          w-[92%]
        "
      >
        <div className="bg-black/85 border border-white/15 rounded-2xl backdrop-blur-xl px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
          <ul className="flex flex-col gap-3 text-gray-100 text-sm">
            {links.map((link) => (
              <li key={link.id}>
                <motion.button
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left py-2 ${
                    active === link.id ? "text-purple-300" : "text-gray-100"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
