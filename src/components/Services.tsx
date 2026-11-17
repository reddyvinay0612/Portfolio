import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, ShieldAlert, Eye, Layers, ChevronRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, ServiceItem } from '../data/portfolioData';

export const Services: React.FC = () => {
  const services = PORTFOLIO_DATA.services;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'BrainCircuit': return BrainCircuit;
      case 'ShieldAlert': return ShieldAlert;
      case 'Eye': return Eye;
      default: return Layers;
    }
  };

  return (
    <section id="services" className="py-24 px-4 md:px-8 relative z-10 bg-[#070709] overflow-hidden">
      
      {/* Background ambient red glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-[#FF2A2A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header (Joyseno / Clyde style) */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-[#FF2A2A]" />
            <span>Specializations &amp; Offerings</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            What I <span className="text-[#FF2A2A]">Build &amp; Deliver</span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-xl text-sm md:text-base">
            Comprehensive engineering services spanning scalable full-stack web applications, explainable AI pipelines, and proactive FinTech security architectures.
          </p>
        </div>

        {/* Services 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.iconName);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="glass-panel p-8 rounded-3xl border-white/10 hover:border-[#FF2A2A]/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden bg-[#0C0D12]"
              >
                {/* Subtle red ambient glow on card hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2A2A]/5 rounded-full blur-3xl group-hover:bg-[#FF2A2A]/15 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Number Badge */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-[#FF2A2A] group-hover:bg-[#FF2A2A] group-hover:text-white transition-all duration-300 shadow-lg shadow-[#FF2A2A]/10">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-3xl font-black font-mono text-white/20 group-hover:text-[#FF2A2A]/40 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FF2A2A] transition-colors mb-2">
                    {service.title}
                  </h3>

                  <div className="text-xs font-mono font-semibold text-[#FF2A2A] mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A]" />
                    <span>{service.subtitle}</span>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-neutral-400 group-hover:text-white transition-colors shrink-0"
                  >
                    <span>Inquire</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#FF2A2A] group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
