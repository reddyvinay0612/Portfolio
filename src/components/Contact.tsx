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
    <section id="contact" className="py-24 px-4 md:px-8 relative z-10 bg-[#f2f7fa]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b82a6]/15 border border-[#3b82a6]/35 text-[#163e54] text-xs font-mono uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-[#2c6585]" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Let's Build Something <span className="text-[#3b82a6]">Extraordinary</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
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
              className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#3b82a6] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#3b82a6]/15 border border-[#3b82a6]/30 flex items-center justify-center text-[#163e54] shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#6c757d] uppercase tracking-wider">Email Address</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-base font-bold text-[#000000] hover:text-[#2c6585] transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-[#f2f7fa] border border-neutral-200 text-[#6c757d] hover:text-[#000000] hover:border-[#3b82a6] transition-all"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Direct Phone Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#3b82a6] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#3b82a6]/15 border border-[#3b82a6]/30 flex items-center justify-center text-[#163e54] shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#6c757d] uppercase tracking-wider">Phone / WhatsApp</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                      className="text-base font-bold text-[#000000] hover:text-[#2c6585] transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-xl bg-[#f2f7fa] border border-neutral-200 text-[#6c757d] hover:text-[#000000] hover:border-[#3b82a6] transition-all"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#3b82a6]/15 border border-[#3b82a6]/30 flex items-center justify-center text-[#163e54] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#6c757d] uppercase tracking-wider">Location</div>
                  <div className="text-base font-bold text-[#000000]">
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
              className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex items-center justify-between"
            >
              <span className="text-xs font-mono text-[#6c757d] uppercase tracking-wider">Connect Online</span>
              <div className="flex items-center gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f2f7fa] border border-neutral-200/80 text-xs font-semibold text-[#212529] hover:border-[#3b82a6] hover:text-[#000000] transition-all"
                >
                  <Github className="w-4 h-4 text-[#2c6585]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f2f7fa] border border-neutral-200/80 text-xs font-semibold text-[#212529] hover:border-[#3b82a6] hover:text-[#000000] transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#2c6585]" />
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
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-neutral-200/80 hover:border-[#3b82a6] shadow-[0_15px_35px_rgba(0,0,0,0.05)] relative overflow-hidden transition-colors"
          >
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3b82a6] flex items-center justify-center text-white shadow-lg shadow-[#3b82a6]/40 animate-bounce">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#000000]">Message Received!</h3>
                <p className="text-[#6c757d] max-w-md text-sm">
                  Thank you for reaching out, <span className="text-[#2c6585] font-semibold">{formData.name}</span>! I'll get back to you shortly at <span className="text-[#000000] font-medium">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#f2f7fa] border border-neutral-200 text-xs text-[#495057] hover:text-[#000000] hover:border-[#3b82a6] transition-all font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-mono text-[#2c6585] uppercase tracking-wider mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Quick Message</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#6c757d] mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adarsh"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f2f7fa] border border-neutral-200/90 text-[#212529] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#3b82a6] focus:ring-1 focus:ring-[#3b82a6] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6c757d] mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. adarsh@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f2f7fa] border border-neutral-200/90 text-[#212529] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#3b82a6] focus:ring-1 focus:ring-[#3b82a6] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#6c757d] mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Hackathon Collaboration"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f2f7fa] border border-neutral-200/90 text-[#212529] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#3b82a6] focus:ring-1 focus:ring-[#3b82a6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#6c757d] mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Vinay, I'd like to talk about..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f2f7fa] border border-neutral-200/90 text-[#212529] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#3b82a6] focus:ring-1 focus:ring-[#3b82a6] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#3b82a6] hover:bg-[#2d6785] text-white font-bold text-sm shadow-md shadow-[#3b82a6]/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
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
