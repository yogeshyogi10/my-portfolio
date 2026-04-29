"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import api from "../lib/api";

interface ProjectData {
  title: string;
  tech: string[];
  description: string;
  link: string;
}

const Projects: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dynamicProjects, setDynamicProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects/");
        // Safely check if results exist, otherwise use fallback
        if (response.data && response.data.results) {
          const mappedProjects = response.data.results.map((p: any) => ({
            title: p.title,
            tech: p.tech_stack || [],
            description: p.description,
            link: p.live_url
          }));
          setDynamicProjects(mappedProjects);
        }
      } catch (err) {
        console.warn("API Offline: Using curated fallback projects.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : [
    {
      title: "Portfolio Website",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      description: "Personal portfolio with smooth page transitions, glassmorphism UI and responsive design.",
      link: "#",
    },
    {
      title: "Tijaruk",
      tech: ["Angular", "TypeScript", "Animations"],
      description: "Tijaruk is a corporate setup platform exclusively in GCC countries, built with reusable components and a premium dark theme.",
      link: "https://tijaruk.com/",
    },
    {
      title: "Abuhind",
      tech: ["React", "Tailwind", "GSAP"],
      description: "A luxury landing page for rice export-import e-commerce, featuring cinematic scrolling and modern typography.",
      link: "https://tijaruk.com/abuhind/",
    }
  ];

  const activeProject = allProjects[activeIndex] || allProjects[0];

  if (!mounted) return <section ref={containerRef} className="min-h-screen bg-[#050505]" />;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 bg-[#050505] overflow-hidden"
    >
      {/* Decorative Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 text-[30vw] font-serif text-white/[0.02] select-none pointer-events-none"
      >
        Projects
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4"
            >
              Curation • 2024 — 2026
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif leading-tight"
            >
              Selected <span className="text-luxury-gradient italic">Works</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm md:text-base font-light max-w-xs leading-relaxed"
          >
            A collection of high-end digital solutions focused on elegance, 
            performance, and architectural precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Active Project Showcase */}
          <div className="lg:col-span-7 sticky top-32">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative"
            >
              <div className="aspect-[16/10] bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center p-12 transition-all duration-700 group-hover:border-accent/30 shadow-2xl">
                 <div className="text-center">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-accent/20 text-9xl font-serif absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                    >
                      0{activeIndex + 1}
                    </motion.span>
                    <h3 className="relative text-3xl md:text-5xl font-serif mb-6">{activeProject.title}</h3>
                    <div className="relative flex flex-wrap justify-center gap-3 mb-8">
                      {activeProject.tech.map(t => (
                        <span key={t} className="text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full bg-white/5 text-gray-400">
                          {t}
                        </span>
                      ))}
                    </div>
                 </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 max-w-xl"
              >
                <p className="text-gray-400 text-lg leading-relaxed font-light mb-8 italic">
                  &ldquo;{activeProject.description}&rdquo;
                </p>
                {activeProject.link && (
                  <a 
                    href={activeProject.link} 
                    target="_blank" 
                    className="inline-flex items-center gap-4 text-accent hover:text-white transition-all group/link"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest border-b border-accent/30 pb-1">Discover Project</span>
                    <span className="text-xl group-hover/link:translate-x-2 transition-transform">→</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Project Navigation List */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-8">Project Index</p>
            {allProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveIndex(i)}
                className={`group cursor-pointer py-8 border-b border-white/5 flex items-center justify-between transition-all duration-500 ${
                  activeIndex === i ? 'pl-8' : 'hover:pl-4'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-bold tracking-widest transition-colors ${
                    activeIndex === i ? 'text-accent' : 'text-gray-600'
                  }`}>
                    0{i + 1}
                  </span>
                  <h4 className={`text-xl md:text-2xl font-serif transition-all duration-500 ${
                    activeIndex === i ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    {project.title}
                  </h4>
                </div>
                {activeIndex === i && (
                  <motion.div 
                    layoutId="activePointer"
                    className="w-1.5 h-1.5 rounded-full bg-accent"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
