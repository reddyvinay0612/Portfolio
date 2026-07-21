import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, ShieldAlert, Code, Languages, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: Cpu,
      title: "AI & Deep Learning",
      description: "Developing CNN models with TensorFlow, OpenCV & MediaPipe for real-world facial analysis and skincare diagnostics."
    },
    {
      icon: ShieldAlert,
      title: "FinTech & Agentic AI Defense",
      description: "Building proactive security layers against synthetic biometric spoofing, voice mimicry, and automated AI fraud."
    },
    {
      icon: Code,
      title: "Full Stack Web Apps",
      description: "Crafting robust web architectures with HTML, CSS, JavaScript, Flask, and database integrations."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Passionate Engineer at the Intersection of <span className="text-purple-gradient">AI &amp; Design</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-base">
            Bridging technical precision with user-centric design principles to construct next-generation software systems.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bio Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-8 rounded-3xl border-purple-500/20 shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle background glow */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-500" />

            <h3 className="text-2xl font-bold text-white mb-4">
              Hello, I'm <span className="text-purple-400">Vinayprakash</span>
            </h3>
            
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {PORTFOLIO_DATA.personal.about}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Currently pursuing a Bachelor of Engineering in <strong className="text-gray-200">Computer Science and Design</strong> at PES Institute of Technology and Management, Shivamogga. I thrive on solving complex technical challenges—from detecting subtle facial biomarkers using convolutional neural networks to creating preemptive defenses against AI biometric mimicry in financial systems.
            </p>

            {/* Quick Info Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-mono uppercase">Location</div>
                  <div className="text-sm font-semibold text-white">{PORTFOLIO_DATA.personal.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-mono uppercase">Languages Known</div>
                  <div className="flex gap-1.5 mt-0.5">
                    {PORTFOLIO_DATA.personal.spokenLanguages.map(lang => (
                      <span key={lang} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-200 font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Pillars & Competencies Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass-panel p-6 rounded-2xl border-white/5 hover:border-purple-500/30 glass-panel-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                        {item.title}
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 opacity-80" />
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
