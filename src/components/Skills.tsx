import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Code, 
  BrainCircuit, 
  Cpu, 
  Sparkles, 
  Laptop, 
  Layout, 
  Database, 
  Terminal, 
  Orbit, 
  LayoutGrid 
} from 'lucide-react';
import { PORTFOLIO_DATA, TechBadge } from '../data/portfolioData';
import { TechSphere } from './ui/tech-sphere';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'sphere' | 'grid'>('sphere');
  const categories = PORTFOLIO_DATA.skillCategories;
  const badges = PORTFOLIO_DATA.techStackBadges || [];

  const badgeFilterCategories = [
    'All',
    'Languages',
    'Frontend',
    'Backend',
    'AI & Data',
    'Cloud & DB',
    'Tools'
  ];

  const filteredBadges = selectedCategory === 'All'
    ? badges
    : badges.filter(b => b.category === selectedCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'Layout': return Layout;
      case 'Cpu': return Cpu;
      case 'BrainCircuit': return BrainCircuit;
      case 'Database': return Database;
      case 'Wrench': return Wrench;
      default: return Terminal;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 md:px-8 relative z-10 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#5a5d40] text-xs font-mono uppercase tracking-widest mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#8e916c]" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Skills &amp; <span className="text-[#b1b493]">Technologies</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-xl text-sm md:text-base">
            Languages, full-stack frameworks, artificial intelligence libraries, and database architectures mastered through academic engineering, hackathons, and production builds.
          </p>
        </div>

        {/* ---------------- 💻 TECH STACK SHOWCASE (3D SPHERE & BADGES) ---------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
        >
          {/* Top Bar: Title, Filters & View Mode Switcher */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
            
            {/* Title & Stats */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">💻</span>
              <div>
                <h3 className="text-xl font-extrabold text-[#000000] tracking-tight">
                  Tech Stack
                </h3>
                <span className="text-xs font-mono text-[#6c757d]">
                  {badges.length} core technologies across software &amp; AI
                </span>
              </div>
            </div>

            {/* Controls: Filter Pills & 3D Switcher */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {badgeFilterCategories.map((cat) => {
                  const count = cat === 'All' 
                    ? badges.length 
                    : badges.filter(b => b.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#b1b493] text-white shadow-sm font-semibold'
                          : 'bg-[#f8f9fa] text-[#6c757d] hover:text-[#000000] border border-neutral-200/80'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="ml-1 opacity-75 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* View Switcher: 3D Sphere vs Grid */}
              <div className="inline-flex p-1 rounded-2xl bg-[#f8f9fa] border border-neutral-200/80 shrink-0">
                <button
                  onClick={() => setViewMode('sphere')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                    viewMode === 'sphere'
                      ? 'bg-[#b1b493] text-white shadow-sm'
                      : 'text-[#6c757d] hover:text-[#000000]'
                  }`}
                  title="3D Image Sphere View"
                >
                  <Orbit className="w-3.5 h-3.5" />
                  <span>3D Sphere</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#b1b493] text-white shadow-sm'
                      : 'text-[#6c757d] hover:text-[#000000]'
                  }`}
                  title="Badge Wall View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Badges</span>
                </button>
              </div>

            </div>

          </div>

          {/* 1. 3D TECH SPHERE VIEW (Tony Sebastian Image-Sphere Style) */}
          {viewMode === 'sphere' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <TechSphere
                items={badges}
                selectedCategory={selectedCategory}
              />
            </motion.div>
          )}

          {/* 2. FLAT BADGE GRID VIEW */}
          {viewMode === 'grid' && (
            <motion.div 
              layout 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 p-4 bg-[#f8f9fa] rounded-3xl border border-neutral-200/80 min-h-[220px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredBadges.map((badge) => (
                  <motion.div
                    key={badge.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      backgroundColor: badge.bgColor,
                      color: badge.textColor
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg shadow-sm border border-black/10 select-none cursor-default font-mono font-bold text-xs uppercase tracking-wider"
                  >
                    {badge.iconSymbol && (
                      <span className="text-sm leading-none opacity-90 drop-shadow-sm">
                        {badge.iconSymbol}
                      </span>
                    )}
                    <span>{badge.name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </motion.div>

        {/* ---------------- STRUCTURED PROFICIENCY MATRIX ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => {
            const IconComp = getCategoryIcon(cat.iconName);

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-[#b1b493] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                    <div className="w-10 h-10 rounded-xl bg-[#b1b493]/15 border border-[#b1b493]/30 flex items-center justify-center text-[#5a5d40] shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#000000] tracking-tight">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill List with Progress Bars */}
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#212529] flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#b1b493]" />
                            {skill.name}
                          </span>
                          {skill.level && (
                            <span className="font-mono text-[11px] text-[#6c757d]">
                              {skill.level}%
                            </span>
                          )}
                        </div>

                        {/* Progress Bar (Clyde Sage) */}
                        <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden p-[1px] border border-neutral-200/60">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level || 85}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.15 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#b1b493] to-[#9a9d7c] shadow-sm shadow-[#b1b493]/30"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
