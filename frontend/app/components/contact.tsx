"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import api from "../lib/api";
import { Mail, MessageSquare, Send, ArrowRight } from "lucide-react";

type InquiryType = "project" | "design" | "ads" | "hi";

const inquiryLabels: Record<InquiryType, string> = {
  project: "Web Architecture",
  design: "Visual Identity",
  ads: "Growth Strategy",
  hi: "Networking",
};

const Contact: React.FC = () => {
  const EMAILJS_SERVICE_ID = "service_r1y041i";
  const EMAILJS_TEMPLATE_ID = "template_ffbogx8";
  const EMAILJS_PUBLIC_KEY = "EqtE4bJD_VT3YukZ9";

  const [inquiryType, setInquiryType] = useState<InquiryType>("project");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | { type: "success" | "error"; text: string }>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please provide all details." });
      return;
    }

    setIsSending(true);
    try {
      await api.post("/contact/", { name, email, message });
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, email, inquiry: inquiryLabels[inquiryType], message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus({ type: "success", text: "Your message has been received with excellence." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      const errorMessage = err.response?.data
        ? Object.values(err.response.data).flat().join(" ")
        : "Submission encountered an issue. Please try again.";
      setStatus({ type: "error", text: errorMessage });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Branding & Info */}
          <div className="space-y-12">
            <div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4"
              >
                Inquiries
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif leading-tight"
              >
                Let&apos;s Craft Your <br />
                <span className="text-luxury-gradient italic">Next Masterpiece.</span>
              </motion.h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass border border-white/5 flex items-center justify-center text-accent group-hover:border-accent/20 transition-all duration-500">
                  <Mail size={20} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Direct Correspondence</p>
                   <a href="mailto:yogeshhub004@gmail.com" className="text-lg font-serif italic text-white hover:text-accent transition-colors">yogeshhub004@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl glass border border-white/5 flex items-center justify-center text-accent group-hover:border-accent/20 transition-all duration-500">
                  <MessageSquare size={20} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Social Connection</p>
                   <a href="https://wa.me/919944163807" className="text-lg font-serif italic text-white hover:text-accent transition-colors">+91 99441 63807</a>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 max-w-sm">
               <p className="text-sm text-gray-500 font-light leading-relaxed italic">
                 &ldquo;Exceptional design is the result of meaningful conversations. I am ready to bring your vision to life with architectural precision.&rdquo;
               </p>
            </div>
          </div>

          {/* Right: Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-10 md:p-14 rounded-[3rem] border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-accent transition-colors">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Alexander King"
                      className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-gray-700 focus:outline-none focus:border-accent transition-colors font-serif italic"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-accent transition-colors">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. contact@luxury.com"
                      className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-gray-700 focus:outline-none focus:border-accent transition-colors font-serif italic"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Service Required</label>
                  <div className="flex flex-wrap gap-3">
                    {(Object.keys(inquiryLabels) as InquiryType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest border transition-all duration-500 ${
                          inquiryType === type 
                            ? 'bg-accent border-accent text-black font-bold' 
                            : 'border-white/10 text-gray-500 hover:border-white/30'
                        }`}
                      >
                        {inquiryLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-accent transition-colors">Your Vision</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your project goals..."
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-gray-700 focus:outline-none focus:border-accent transition-colors font-serif italic resize-none"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group bg-white text-black py-5 rounded-2xl font-bold overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSending ? "Processing..." : "Submit Inquiry"}
                  {!isSending && <ArrowRight size={18} />}
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>

              {status && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-xs tracking-wide ${status.type === 'success' ? 'text-accent' : 'text-red-400'}`}
                >
                  {status.text}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
