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
    <section id="services" className="py-24 px-4 md:px-8 relative z-10 bg-[#f8f9fa] overflow-hidden">
      
      {/* Background ambient sage glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-[#b1b493]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header (Clyde style) */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#5a5d40] text-xs font-mono uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-[#8e916c]" />
            <span>Specializations &amp; Offerings</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            What I <span className="text-[#b1b493]">Build &amp; Deliver</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
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
                className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#b1b493] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle sage ambient glow on card hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#b1b493]/5 rounded-full blur-3xl group-hover:bg-[#b1b493]/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Number Badge */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                    <div className="w-14 h-14 rounded-2xl bg-[#b1b493]/15 border border-[#b1b493]/30 flex items-center justify-center text-[#5a5d40] group-hover:bg-[#b1b493] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-3xl font-black font-mono text-neutral-300 group-hover:text-[#b1b493] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-[#000000] group-hover:text-[#8e916c] transition-colors mb-2">
                    {service.title}
                  </h3>

                  <div className="text-xs font-mono font-semibold text-[#8e916c] mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#b1b493]" />
                    <span>{service.subtitle}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[#6c757d] text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#f8f9fa] text-[#495057] border border-neutral-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#6c757d] group-hover:text-[#000000] transition-colors shrink-0"
                  >
                    <span>Inquire</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#b1b493] group-hover:translate-x-1 transition-transform" />
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
