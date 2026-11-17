import React from 'react';
import { motion } from 'framer-motion';
import { Award, Database, TrendingUp, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Counters: React.FC = () => {
  const counters = PORTFOLIO_DATA.counters;

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return Database;
      case 1: return TrendingUp;
      case 2: return Award;
      default: return GraduationCap;
    }
  };

  return (
    <section id="section-counter" className="relative py-16 px-4 md:px-8 bg-[#070709] border-y border-white/5 z-20 overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#FF2A2A]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {counters.map((item, idx) => {
            const Icon = getIcon(idx);

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-7 rounded-2xl border-white/10 hover:border-[#FF2A2A]/40 transition-all group flex flex-col justify-between relative overflow-hidden bg-[#0C0D12]"
              >
                {/* Ambient hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2A2A]/5 group-hover:bg-[#FF2A2A]/15 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FF2A2A]/10 border border-[#FF2A2A]/25 flex items-center justify-center text-[#FF2A2A] group-hover:scale-110 group-hover:bg-[#FF2A2A] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                    0{idx + 1} // STAT
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#FF2A2A] transition-colors flex items-baseline">
                    <span>{item.value}</span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-200 mt-1.5 uppercase tracking-wide">
                    {item.label}
                  </h4>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
