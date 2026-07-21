import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Factory, Server, MapPin, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const EventsAndVisits: React.FC = () => {
  const events = PORTFOLIO_DATA.eventsAndVisits;

  return (
    <section id="events" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-pink-400" />
            <span>Practical Exposure &amp; Hackathons</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Hackathons &amp; <span className="text-purple-gradient">Industrial Exposure</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl text-sm md:text-base">
            National hackathons, high-performance computing immersion at IISc, and Industry 4.0 IoT training at BOSCH.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Hackathons Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span>Competitive Hackathons</span>
            </h3>

            {events.filter(e => e.category === 'Hackathon').map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel p-6 rounded-2xl border-purple-500/20 glass-panel-hover"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.badge}
                  </span>
                  {item.duration && (
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      ⚡ {item.duration}
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-white mt-1">
                  {item.title}
                </h4>

                <div className="text-xs text-gray-400 font-medium mb-3">
                  {item.organization}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Industrial Visits & Specialized Immersion Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Factory className="w-5 h-5 text-cyan-400" />
              <span>Industrial &amp; HPC Immersion</span>
            </h3>

            {events.filter(e => e.category === 'Industrial Visit').map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel p-6 rounded-2xl border-cyan-500/20 glass-panel-hover"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                  {item.title.includes('SERC') ? <Server className="w-4 h-4 text-purple-400" /> : <Factory className="w-4 h-4 text-cyan-400" />}
                  <span>{item.title}</span>
                </h4>

                <div className="text-xs text-gray-400 font-medium mb-3">
                  {item.organization}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
