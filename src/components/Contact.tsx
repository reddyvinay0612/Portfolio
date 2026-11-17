import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 relative z-10 bg-[#070709]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-xs font-mono uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-[#FF2A2A]" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-[#FF2A2A]">Extraordinary</span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-xl text-sm md:text-base">
            Whether you have a project inquiry, hackathon collaboration, or internship opportunity, feel free to reach out!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Copy Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-3xl border-white/10 glass-panel-hover hover:border-[#FF2A2A]/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Email Address</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-base font-bold text-white hover:text-[#FF2A2A] transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Direct Phone Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6 rounded-3xl border-white/10 glass-panel-hover hover:border-[#FF2A2A]/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Phone / WhatsApp</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                      className="text-base font-bold text-white hover:text-[#FF2A2A] transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 rounded-3xl border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-[#FF2A2A] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Location</div>
                  <div className="text-base font-bold text-white">
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-3xl border-white/10 flex items-center justify-between"
            >
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Connect Online</span>
              <div className="flex items-center gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-pill text-xs font-semibold text-neutral-300 hover:text-white hover:border-[#FF2A2A]/50 transition-all"
                >
                  <Github className="w-4 h-4 text-[#FF2A2A]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-pill text-xs font-semibold text-neutral-300 hover:text-white hover:border-[#FF2A2A]/50 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#FF2A2A]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>

          </div>

          {/* Contact Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-3xl border-white/10 hover:border-[#FF2A2A]/30 shadow-2xl relative overflow-hidden transition-colors"
          >
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FF2A2A] flex items-center justify-center text-white shadow-xl shadow-[#FF2A2A]/40 animate-bounce">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-neutral-300 max-w-md text-sm">
                  Thank you for reaching out, <span className="text-[#FF2A2A] font-semibold">{formData.name}</span>! I'll get back to you shortly at <span className="text-white font-medium">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-xs text-neutral-300 hover:text-white hover:bg-white/20 transition-all font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-mono text-[#FF2A2A] uppercase tracking-wider mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Quick Message</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adarsh"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF2A2A] focus:ring-1 focus:ring-[#FF2A2A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. adarsh@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF2A2A] focus:ring-1 focus:ring-[#FF2A2A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Hackathon Collaboration"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF2A2A] focus:ring-1 focus:ring-[#FF2A2A] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Vinay, I'd like to talk about..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF2A2A] focus:ring-1 focus:ring-[#FF2A2A] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FF2A2A] hover:bg-red-600 text-white font-bold text-sm shadow-xl shadow-[#FF2A2A]/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
