"use client";

import { motion } from "framer-motion";
import React from "react";
import emailjs from "@emailjs/browser";

type InquiryType = "project" | "design" | "ads" | "hi";

const inquiryLabels: Record<InquiryType, string> = {
  project: "Web / Frontend Project",
  design: "Posters, creatives & social",
  ads: "Meta ads & growth",
  hi: "Just saying hi / networking",
};

const inquiryPlaceholders: Record<InquiryType, string> = {
  project: "I want a website / frontend built for my brand or idea...",
  design: "I need posters, thumbnails or social media creatives for...",
  ads: "I want to run Meta ads to get more leads / sales for...",
  hi: "I just wanted to connect and say hi. I’m working on...",
};

const Contact: React.FC = () => {
  // EmailJS keys (hardcoded)
  const EMAILJS_SERVICE_ID = "service_r1y041i";
  const EMAILJS_TEMPLATE_ID = "template_ffbogx8";
  const EMAILJS_PUBLIC_KEY = "EqtE4bJD_VT3YukZ9";

  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [inquiryType, setInquiryType] = React.useState<InquiryType>("project");
  const [contactPreference, setContactPreference] =
    React.useState<"email" | "whatsapp">("email");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const maxMessageLength = 600;
  const messageProgress = Math.min((message.length / maxMessageLength) * 100, 100);

  // ✅ success / error message state (no UI layout change)
  const [status, setStatus] = React.useState<null | { type: "success" | "error"; text: string }>(
    null
  );
  const [isSending, setIsSending] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setCursorPos({ x, y });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }

    setIsSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          inquiry: inquiryLabels[inquiryType],
          contact_preference: contactPreference,
          subject: inquiryLabels[inquiryType],
          message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus({ type: "success", text: "✅ Message sent successfully!" });

      // clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", text: "❌ Failed to send. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
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
        animate={{ x: cursorPos.x * 0.1, y: cursorPos.y * 0.1 }}
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
          Contact <span className="text-purple-400">Me</span>
        </motion.h2>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-24 h-1 bg-purple-500 mx-auto mt-4 rounded-full opacity-80"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr] gap-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-base md:text-lg">
              Have a project, idea or collaboration in mind? Select what you need help
              with and drop me a quick message — I&apos;ll get back to you soon.
            </p>

            {/* Inquiry chips */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-purple-300/80 mb-3">
                What are you looking for?
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["project", "Web / Frontend"],
                    ["design", "Design & Social"],
                    ["ads", "Meta Ads / Growth"],
                    ["hi", "Just saying hi"],
                  ] as [InquiryType, string][]
                ).map(([type, label]) => {
                  const isActive = inquiryType === type;
                  return (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`
                        px-3.5 py-1.5 rounded-full text-xs md:text-sm border
                        transition-colors
                        ${
                          isActive
                            ? "bg-purple-600/80 border-purple-300 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)]"
                            : "bg-black/40 border-white/20 text-gray-200 hover:border-purple-300/70"
                        }
                      `}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Preferred reply toggle */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-purple-300/80 mb-3">
                Preferred reply
              </p>
              <div className="inline-flex items-center rounded-full bg-black/40 border border-white/15 p-1">
                {(["email", "whatsapp"] as const).map((mode) => {
                  const isActive = contactPreference === mode;
                  return (
                    <motion.button
                      key={mode}
                      type="button"
                      onClick={() => setContactPreference(mode)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`
                        px-3 py-1 text-xs md:text-sm rounded-full transition-colors
                        ${
                          isActive
                            ? "bg-purple-600/90 text-white shadow-[0_0_18px_rgba(168,85,247,0.7)]"
                            : "text-gray-300"
                        }
                      `}
                    >
                      {mode === "email" ? "Email" : "WhatsApp"}
                    </motion.button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-gray-400">
                I usually reply within <span className="text-purple-200">12–24 hours</span> on
                weekdays.
              </p>
            </div>

            {/* Availability card */}
            <div className="bg-black/40 border border-white/20 rounded-2xl p-4 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-300/40 flex items-center justify-center text-lg">
                  ⏱
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Current availability</p>
                  <p className="text-xs text-gray-400">
                    Open for freelance & project-based work. Tell me your timeline and
                    I&apos;ll let you know what&apos;s realistic.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-400"
              />
            </div>

            <input
              type="text"
              placeholder={inquiryLabels[inquiryType]}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-400"
            />

            <div>
              <textarea
                rows={5}
                maxLength={maxMessageLength}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={inquiryPlaceholders[inquiryType]}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none"
              />

              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                <span>Tell me as much detail as you like (max {maxMessageLength} chars)</span>
                <span>
                  {message.length} / {maxMessageLength}
                </span>
              </div>

              <div className="mt-1 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  style={{ width: `${messageProgress}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={{ scale: isSending ? 1 : 1.03, y: isSending ? 0 : -2 }}
              whileTap={{ scale: isSending ? 1 : 0.98 }}
              className={`w-full mt-2 px-6 py-3 rounded-full text-white font-semibold shadow-[0_0_30px_rgba(168,85,247,0.6)] transition ${
                isSending
                  ? "bg-purple-500/50 cursor-not-allowed"
                  : "bg-purple-500/90 hover:bg-purple-500"
              }`}
            >
              {isSending ? "Sending..." : "Send Message"}
            </motion.button>

            {/* ✅ Success / error message (small text, no layout change) */}
            {status && (
              <p
                className={`text-sm mt-2 ${
                  status.type === "success" ? "text-green-300" : "text-red-300"
                }`}
              >
                {status.text}
              </p>
            )}

            <div className="mt-4 text-xs text-gray-400">
              Prefer direct contact?{" "}
              <a
                href="mailto:yogeshhub004@gmail.com"
                className="text-purple-300 hover:text-purple-200"
              >
                yogeshhub004@gmail.com
              </a>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
