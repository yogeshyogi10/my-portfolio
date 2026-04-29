"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiDjango, SiPostgresql, SiWordpress } from "react-icons/si";

const skillsData = [
  { 
    category: "Architecture", 
    items: [
      { name: "React", icon: SiReact, level: "Advanced" },
      { name: "Next.js", icon: SiNextdotjs, level: "Advanced" },
      { name: "TypeScript", icon: SiTypescript, level: "Professional" }
    ]
  },
  { 
    category: "Backend & Data", 
    items: [
      { name: "Django", icon: SiDjango, level: "Professional" },
      { name: "PostgreSQL", icon: SiPostgresql, level: "Professional" },
      { name: "REST APIs", icon: null, level: "Expert" }
    ]
  },
  { 
    category: "Design Systems", 
    items: [
      { name: "Tailwind CSS", icon: SiTailwindcss, level: "Expert" },
      { name: "Framer Motion", icon: SiFramer, level: "Expert" },
      { name: "WordPress", icon: SiWordpress, level: "Advanced" }
    ]
  }
];

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4"
          >
            Technical Proficiency
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif"
          >
            Mastered <span className="text-luxury-gradient italic">Expertise</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillsData.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="space-y-10"
            >
              <h3 className="text-accent font-serif text-2xl italic border-b border-white/5 pb-4">
                {cat.category}
              </h3>
              <div className="space-y-6">
                {cat.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-500 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500">
                        {skill.icon ? <skill.icon size={22} /> : <span className="text-[10px] font-bold">API</span>}
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium tracking-wide">{skill.name}</h4>
                        <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">{skill.level}</p>
                      </div>
                    </div>
                    
                    <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden hidden sm:block">
                       <motion.div 
                         initial={{ x: "-100%" }}
                         animate={{ x: hoveredSkill === skill.name ? "0%" : "-100%" }}
                         className="absolute inset-0 bg-accent"
                       />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 p-12 glass border border-white/10 rounded-[3rem] text-center"
        >
          <p className="text-gray-400 font-light max-w-2xl mx-auto italic text-lg">
            &ldquo;Engineering is the art of making the impossible inevitable. I focus on building robust, scalable architectures that empower elegant user experiences.&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default Skills;
