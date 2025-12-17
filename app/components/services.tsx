"use client";

import { motion } from "framer-motion";
import React from "react";

const services = [
  {
    id: "frontend",
    title: "Frontend Web Development",
    tag: "React · Next.js · Tailwind",
    description:
      "I build modern, responsive and high-performing websites using React, Next.js and Tailwind CSS with clean UI and smooth animations.",
    icon: "💻",
  },
  {
    id: "design",
    title: "Poster & Creative Design",
    tag: "Branding · Social Creatives",
    description:
      "Eye-catching posters, thumbnails and social media creatives tailored to your brand style and marketing goals.",
    icon: "🎨",
  },
  {
    id: "social",
    title: "Social Media Management",
    tag: "Instagram · Facebook · More",
    description:
      "I plan, design and manage content across platforms to keep your brand active, consistent and engaging.",
    icon: "📱",
  },
  {
    id: "meta",
    title: "Meta Ads / Performance Marketing",
    tag: "Meta Ads · Strategy · Scaling",
    description:
      "From campaign setup to optimization, I run Meta ads that focus on reach, engagement and conversions.",
    icon: "🚀",
  },
] as const;

const flows: Record<
  (typeof services)[number]["id"],
  {
    label: string;
    title: string;
    description: string;
  }[]
> = {
  frontend: [
    {
      label: "Step 1",
      title: "Discovery & Wireframe",
      description:
        "We discuss goals, pages, features and references. I translate that into a clean structure or wireframe.",
    },
    {
      label: "Step 2",
      title: "Design & Development",
      description:
        "I build the UI using Next.js, Tailwind and Framer Motion with responsive layouts and smooth animations.",
    },
    {
      label: "Step 3",
      title: "Review & Launch",
      description:
        "We review together, refine details, and then deploy it so your website is live and ready to share.",
    },
  ],
  design: [
    {
      label: "Step 1",
      title: "Brand & Context",
      description:
        "You share your brand details, target audience, references and where the creatives will be used.",
    },
    {
      label: "Step 2",
      title: "Concept & Design",
      description:
        "I design multiple options or a main direction with strong composition, typography and visual hierarchy.",
    },
    {
      label: "Step 3",
      title: "Final Assets",
      description:
        "You get export-ready files in correct sizes for Instagram, Facebook, stories, thumbnails and print if needed.",
    },
  ],
  social: [
    {
      label: "Step 1",
      title: "Strategy & Calendar",
      description:
        "We define goals (awareness, engagement, leads) and create a simple content calendar for your platforms.",
    },
    {
      label: "Step 2",
      title: "Content & Posting",
      description:
        "I design posts, write captions and maintain a consistent posting flow with your brand voice.",
    },
    {
      label: "Step 3",
      title: "Insights & Tweaks",
      description:
        "We look at what performs best and adjust visuals, formats and timing to improve results over time.",
    },
  ],
  meta: [
    {
      label: "Step 1",
      title: "Goal & Setup",
      description:
        "We decide the main objective (traffic, leads, sales), setup pixels and create the initial campaign structure.",
    },
    {
      label: "Step 2",
      title: "Creatives & Testing",
      description:
        "I design ad creatives, set targeting and run A/B tests on audiences, placements and messaging.",
    },
    {
      label: "Step 3",
      title: "Optimization & Scaling",
      description:
        "I monitor performance, pause what doesn’t work, scale what does and send you simple reports you can understand.",
    },
  ],
};

const Services: React.FC = () => {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [activeServiceId, setActiveServiceId] = React.useState<
    (typeof services)[number]["id"]
  >("frontend");

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setCursorPos({ x, y });
  };

  const activeService = services.find((s) => s.id === activeServiceId)!;
  const activeFlow = flows[activeServiceId];

  return (
    <section
      id="services"
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

      {/* Soft orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl -top-24 left-0"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl -bottom-32 right-0"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        animate={{ x: cursorPos.x * 0.1, y: cursorPos.y * 0.1 }}
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
          My <span className="text-purple-400">Services</span>
        </motion.h2>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-24 h-1 bg-purple-500 mx-auto mt-4 rounded-full opacity-80"
        />

        <p className="mt-6 text-gray-300 text-center max-w-2xl mx-auto text-base md:text-lg">
          Pick a service to see how I actually work with you from first message
          to final result.
        </p>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const isActive = service.id === activeServiceId;
            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => setActiveServiceId(service.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative text-left bg-black/40 border rounded-2xl p-6 overflow-hidden group
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
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-xl">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-xs text-purple-200/80 mt-1">
                        {service.tag}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm md:text-base text-gray-300">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-purple-400" : "bg-gray-500"
                        }`}
                      />
                      {isActive ? "Timeline shown below" : "Tap to see timeline"}
                    </span>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200"
                    >
                      Enquire
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Flow Timeline */}
        <motion.div
          key={activeServiceId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 bg-black/50 border border-white/20 rounded-2xl p-6 md:p-7"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-purple-300/80">
                Workflow for
              </p>
              <h3 className="mt-2 text-lg md:text-xl font-semibold text-white">
                {activeService.title}
              </h3>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/90 hover:bg-purple-700 text-white text-xs md:text-sm font-medium shadow-[0_0_25px_rgba(168,85,247,0.6)] transition"
            >
              Start this flow with me
              <span>↗</span>
            </a>
          </div>

          <div className="relative mt-2">
            {/* Horizontal line (timeline) */}
            <div className="hidden md:block absolute left-[10%] right-[10%] top-7 h-px bg-gradient-to-r from-purple-500/50 via-white/30 to-cyan-400/50 opacity-60" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeFlow.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative"
                >
                  {/* Circle marker for desktop */}
                  <div className="hidden md:flex items-center mb-3">
                    <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.9)] border border-white/60" />
                  </div>

                  <div className="bg-white/5 border border-white/15 rounded-2xl p-4 h-full">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300/80">
                      {step.label}
                    </p>
                    <h4 className="mt-1 text-sm md:text-base font-semibold text-white">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs md:text-sm text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-xs text-gray-400 text-center md:text-left">
            This is the typical structure I follow. We can always adjust steps
            based on your project size and deadlines.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
