import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Code, 
  BrainCircuit, 
  Cpu, 
  Sparkles, 
  Layout, 
  Database, 
  Terminal, 
  Hand
} from 'lucide-react';
import { PORTFOLIO_DATA, TechBadge, SkillCategory } from '../data/portfolioData';
import { TechSphere } from './ui/tech-sphere';
import CardDeckCarousel from './ui/card-deck-carousel';

export const Skills: React.FC = () => {
  const categories = PORTFOLIO_DATA.skillCategories;
  const badges = PORTFOLIO_DATA.techStackBadges || [];

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

  const domainDescriptions: Record<string, string> = {
    "Core Programming Languages": "High-performance algorithms, data structures & procedural software syntax",
    "Frontend & UI/UX Frameworks": "Modern responsive interfaces, state management & accessible component systems",
    "Backend & Server Architecture": "Scalable REST APIs, asynchronous microservices & robust server infrastructure",
    "AI, Machine Learning & Data Science": "Predictive modeling, TreeSHAP explainability, neural networks & data pipelines",
    "Databases & Cloud Platforms": "ACID compliance, document stores, cloud serverless & managed database engines",
    "Developer Tools & Version Control": "Git branching models, CI/CD deployment pipelines & containerized microservices",
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
          {/* Top Bar: Title & Stats */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100">
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

          {/* 3D TECH SPHERE SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <TechSphere
              items={badges}
              selectedCategory="All"
            />
          </motion.div>

        </motion.div>

        {/* ---------------- STRUCTURED PROFICIENCY MATRIX ---------------- */}
        <div className="flex flex-col items-center text-center mb-8">
          <h3 className="text-2xl font-extrabold text-[#000000] tracking-tight">
            Domain Proficiency Matrix
          </h3>
          <p className="text-xs sm:text-sm text-[#6c757d] mt-1 font-mono">
            6 core engineering domains • Interactive loose card deck with gesture throwing physics
          </p>
        </div>

        {/* INTERACTIVE CARD DECK VIEW (PHYSICAL DECK CAROUSEL) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-4"
        >
            <CardDeckCarousel<SkillCategory>
              items={categories}
              cardWidth="min(92vw, 470px)"
              cardHeight="460px"
              scatter={7}
              autoplay={0}
              getItemMeta={(cat, idx) => ({
                title: cat.title,
                caption: `${cat.skills.length} core competencies • Specialization 0${idx + 1} of 06`
              })}
              renderCard={(cat, catIdx) => {
                const IconComp = getCategoryIcon(cat.iconName);
                const domainDesc = domainDescriptions[cat.title] || "Core engineering domain proficiency";

                return (
                  <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between bg-white select-none">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#b1b493]/15 border border-[#b1b493]/35 flex items-center justify-center text-[#5a5d40] shrink-0">
                            <IconComp className="w-5 h-5 text-[#8e916c]" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e916c] font-bold block">
                              0{catIdx + 1} // DOMAIN
                            </span>
                            <h3 className="text-base sm:text-lg font-extrabold text-[#000000] tracking-tight leading-snug">
                              {cat.title}
                            </h3>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#f8f9fa] border border-neutral-200/80 text-[10px] font-mono text-[#6c757d] font-semibold shrink-0">
                          {cat.skills.length} Skills
                        </span>
                      </div>

                      <p className="text-xs text-[#6c757d] mb-5 leading-relaxed font-normal">
                        {domainDesc}
                      </p>

                      {/* Skill Items with Animated Progress Bars */}
                      <div className="space-y-3.5">
                        {cat.skills.map((skill) => (
                          <div key={skill.name} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-[#212529] flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-[#b1b493] shrink-0" />
                                <span className="truncate max-w-[240px]">{skill.name}</span>
                              </span>
                              {skill.level && (
                                <span className="font-mono text-[11px] font-bold text-[#8e916c]">
                                  {skill.level}%
                                </span>
                              )}
                            </div>

                            {/* Clyde Sage Progress Bar */}
                            <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden p-[1px] border border-neutral-200/60">
                              <div
                                style={{ width: `${skill.level || 85}%` }}
                                className="h-full rounded-full bg-gradient-to-r from-[#b1b493] to-[#9a9d7c] shadow-sm shadow-[#b1b493]/30 transition-all duration-700"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Drag / Throw Hint */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-[#6c757d]">
                      <span className="flex items-center gap-1.5 text-[#8e916c]">
                        <Hand className="w-3.5 h-3.5 animate-pulse" />
                        <span>Throw or drag card to flip</span>
                      </span>
                      <span className="font-bold text-[#000000]">
                        0{catIdx + 1} / 06
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </motion.div>

      </div>
    </section>
  );
};
