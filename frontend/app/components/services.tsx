"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Laptop, Palette, Share2, Rocket } from "lucide-react";

const services = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    tag: "High-Performance • Bespoke",
    description: "Engineering cinematic digital experiences using React and Next.js, focused on architectural precision and fluid motion.",
    icon: Laptop,
  },
  {
    id: "design",
    title: "Visual Identity",
    tag: "Minimalist • Impactful",
    description: "Curating high-end visual assets and social identities that resonate with premium audiences and brand philosophies.",
    icon: Palette,
  },
  {
    id: "social",
    title: "Brand Management",
    tag: "Strategic • Narrative",
    description: "Managing digital presence with a focus on consistent storytelling and high-quality engagement strategies.",
    icon: Share2,
  },
  {
    id: "meta",
    title: "Performance Ads",
    tag: "Data-Driven • Scalable",
    description: "Optimizing digital reach through sophisticated Meta campaigns designed for measurable scaling and high ROI.",
    icon: Rocket,
  },
] as const;

const flows: Record<string, { label: string; title: string; description: string }[]> = {
  frontend: [
    { label: "Phase 01", title: "Strategic Discovery", description: "Analyzing architectural requirements and brand alignment." },
    { label: "Phase 02", title: "Bespoke Development", description: "Crafting the core engine with high-end performance optimization." },
    { label: "Phase 03", title: "Elegance Review", description: "Final polish of interactions, animations, and cinematic deployment." },
  ],
  design: [
    { label: "Phase 01", title: "Concept Curation", description: "Defining the visual language and mood-boarding the identity." },
    { label: "Phase 02", title: "Architectural Design", description: "Building high-fidelity assets with pixel-perfect precision." },
    { label: "Phase 03", title: "Asset Delivery", description: "Exporting premium deliverables for cross-platform implementation." },
  ],
  social: [
    { label: "Phase 01", title: "Narrative Strategy", description: "Crafting a content calendar that tells your brand story." },
    { label: "Phase 02", title: "Content Orchestration", description: "Designing and deploying high-engagement visual narratives." },
    { label: "Phase 03", title: "Growth Analytics", description: "Analyzing performance data to refine and elevate the strategy." },
  ],
  meta: [
    { label: "Phase 01", title: "Objective Alignment", description: "Setting precise conversion goals and tracking infrastructure." },
    { label: "Phase 02", title: "Creative Optimization", description: "A/B testing high-end creatives for maximum audience resonance." },
    { label: "Phase 03", title: "Strategic Scaling", description: "Scaling successful campaigns while maintaining premium brand feel." },
  ],
};

const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("frontend");

  return (
    <section id="services" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4"
            >
              The Atelier
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif"
            >
              Premium <span className="text-luxury-gradient italic">Solutions</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Services Selection */}
          <div className="space-y-4">
            {services.map((service) => (
              <motion.div
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`group cursor-pointer p-8 rounded-[2rem] border transition-all duration-500 ${
                  activeId === service.id 
                    ? 'bg-white/[0.03] border-accent/20' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      activeId === service.id ? 'bg-accent text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      <service.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-serif italic">{service.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-accent mt-1">{service.tag}</p>
                    </div>
                  </div>
                  {activeId === service.id && (
                    <motion.div layoutId="serviceArrow" className="text-accent text-2xl">→</motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Detailed Workflow */}
          <div className="relative">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass p-12 rounded-[3rem] border border-white/10 h-full flex flex-col justify-between"
                >
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Methodology</p>
                      <h4 className="text-3xl font-serif text-white">The {services.find(s => s.id === activeId)?.title} <span className="text-accent italic">Workflow</span></h4>
                      <p className="text-gray-400 font-light leading-relaxed">{services.find(s => s.id === activeId)?.description}</p>
                    </div>

                    <div className="space-y-8">
                       {flows[activeId].map((step, idx) => (
                         <div key={idx} className="flex gap-6 items-start group">
                            <span className="text-[10px] font-bold text-accent pt-1">0{idx + 1}</span>
                            <div className="space-y-2">
                               <h5 className="text-white font-serif text-lg italic group-hover:text-accent transition-colors">{step.title}</h5>
                               <p className="text-xs text-gray-500 leading-relaxed max-w-sm">{step.description}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="pt-12 border-t border-white/5 mt-12 flex items-center justify-between">
                     <p className="text-[10px] uppercase tracking-widest text-gray-600">Curated & Crafted with Excellence</p>
                     <a href="#contact" className="text-accent text-sm font-bold uppercase tracking-widest border-b border-accent/20 pb-1 hover:border-accent transition-all">Start Project</a>
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
