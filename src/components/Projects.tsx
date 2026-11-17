import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Github, 
  ChevronRight, 
  X, 
  Users, 
  Orbit, 
  LayoutGrid, 
  RotateCw, 
  Compass, 
  Eye, 
  Maximize2
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';
import { generateProjectCardTexture } from '../utils/projectCardCanvas';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [bendIntensity, setBendIntensity] = useState<number>(3);

  const categories = [
    'All',
    'Machine Learning & XAI',
    'FinTech & AI Security',
    'Full Stack & AI',
    'Deep Learning & Computer Vision',
    'AI & Sustainability'
  ];

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All' 
      ? PORTFOLIO_DATA.projects 
      : PORTFOLIO_DATA.projects.filter(p => 
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
          selectedCategory.toLowerCase().includes(p.category.toLowerCase())
        );
  }, [selectedCategory]);

  // Keep active index in bounds when category changes
  useEffect(() => {
    setActiveProjectIndex(0);
  }, [selectedCategory]);

  // Generate high-DPI cybernetic textures for each project card
  const galleryItems: (GalleryItem & { project: Project })[] = useMemo(() => {
    return filteredProjects.map((project) => ({
      image: generateProjectCardTexture(project) || `/projects/${project.id}.svg`,
      text: project.title,
      description: project.description,
      project
    }));
  }, [filteredProjects]);

  const activeProject = filteredProjects[activeProjectIndex % (filteredProjects.length || 1)] || filteredProjects[0];

  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative z-10 bg-[#070709] overflow-hidden">
      
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF2A2A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 text-[#FF2A2A] text-xs font-mono uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5 text-[#FF2A2A]" />
            <span>Interactive 3D Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-[#FF2A2A]">Projects</span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-2xl text-sm md:text-base">
            Explore innovative engineering work spanning explainable machine learning, biometric spoofing defense, educational intelligence, and computer vision.
          </p>
        </div>

        {/* Top Controls: View Switcher & Category Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#FF2A2A] text-white shadow-lg shadow-[#FF2A2A]/30'
                    : 'glass-panel text-neutral-400 hover:text-white hover:border-[#FF2A2A]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Switcher: 3D Circular Orbit vs Grid */}
          <div className="inline-flex p-1 rounded-2xl bg-white/5 border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('circular')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'circular'
                  ? 'bg-[#FF2A2A] text-white shadow-md shadow-[#FF2A2A]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Circular Gallery</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#FF2A2A] text-white shadow-md shadow-[#FF2A2A]/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>

        </div>

        {/* ---------------- 3D CIRCULAR GALLERY VIEW ---------------- */}
        {viewMode === 'circular' && (
          <div className="space-y-6">
            
            {/* Gallery Stage Container */}
            <div className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] rounded-3xl bg-[#090A0E] border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Subtle tech background grid */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Top Interactive Controls Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                
                {/* Left: Navigation hint */}
                <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300">
                  <Compass className="w-3.5 h-3.5 text-[#FF2A2A] animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Drag horizontally to rotate  •  Scroll wheel to spin</span>
                </div>

                {/* Right: Quick Settings (Auto-rotate toggle & Bend) */}
                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono transition-all border ${
                      autoRotate 
                        ? 'bg-[#FF2A2A]/20 border-[#FF2A2A]/40 text-white' 
                        : 'bg-black/60 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                    title="Toggle Auto Rotation"
                  >
                    <RotateCw className={`w-3 h-3 ${autoRotate ? 'text-[#FF2A2A] animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                    <span>{autoRotate ? 'Auto-Spin On' : 'Paused'}</span>
                  </button>

                  <button
                    onClick={() => setBendIntensity(prev => prev === 3 ? 4.2 : prev === 4.2 ? 1.8 : 3)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-[#FF2A2A]/40 text-[11px] font-mono text-neutral-300 hover:text-white transition-all"
                    title="Change Circular Curvature"
                  >
                    <span>Curvature: {bendIntensity}x</span>
                  </button>
                </div>

              </div>

              {/* The WebGL Circular Gallery */}
              <div className="w-full h-full">
                <CircularGallery
                  items={galleryItems}
                  bend={bendIntensity}
                  textColor="#FF2A2A"
                  borderRadius={0.06}
                  itemSize={1.0}
                  itemAspect={0.78}
                  gap={0.28}
                  wave={1.2}
                  fadeEdges={0.14}
                  shadow={0.35}
                  scrollSpeed={2}
                  scrollEase={0.05}
                  autoScroll={autoRotate ? 0.3 : 0}
                  openOnClick={true}
                  showTitles={false}
                  onActiveChange={(index) => setActiveProjectIndex(index)}
                  onItemClick={(item, index) => {
                    const proj = filteredProjects[index];
                    if (proj) setSelectedProject(proj);
                  }}
                />
              </div>

              {/* Bottom Instructions Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-400">
                  <Maximize2 className="w-3 h-3 text-[#FF2A2A]" />
                  <span>Click any card to inspect full technical specs</span>
                </div>
              </div>

            </div>

            {/* Active Project Live Spotlight Card */}
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 rounded-3xl border-white/10 relative overflow-hidden bg-[#0C0D12]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2A2A]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  
                  {/* Left: Project Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 text-white">
                        {activeProject.category}
                      </span>
                      {activeProject.statusBadge && (
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                          {activeProject.statusBadge}
                        </span>
                      )}
                      {activeProject.role && (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/10 text-neutral-200 border border-white/10 flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#FF2A2A]" />
                          {activeProject.role}
                        </span>
                      )}
                      <span className="text-xs font-mono text-neutral-400">
                        {activeProject.period}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {activeProject.title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl line-clamp-2">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeProject.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions & Carousel Nav */}
                  <div className="flex items-center gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                    
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 hover:border-[#FF2A2A]/50 transition-all flex items-center gap-2 text-xs font-mono font-semibold"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4 text-[#FF2A2A]" />
                        <span>Code</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(activeProject)}
                      className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF2A2A] hover:bg-red-600 text-white text-xs font-semibold shadow-lg shadow-[#FF2A2A]/30 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Technical Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ---------------- CLASSIC GRID VIEW ---------------- */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-7 rounded-3xl border-white/10 glass-panel-hover flex flex-col justify-between relative group overflow-hidden hover:border-[#FF2A2A]/40"
              >
                {/* Subtle red background glow on hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2A2A]/5 rounded-full blur-3xl group-hover:bg-[#FF2A2A]/15 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Header Badge & Period */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 text-white">
                      {project.category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {project.role && (
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-neutral-200 border border-white/10 flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#FF2A2A]" />
                          {project.role}
                        </span>
                      )}
                      <span className="text-xs font-mono text-neutral-400">
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF2A2A] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>

                  {/* Status Badge */}
                  {project.statusBadge && (
                    <div className="inline-block mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                        {project.statusBadge}
                      </span>
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights List */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-neutral-400">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF2A2A] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer: Tech Stack & View Details CTA */}
                <div className="pt-5 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 hover:border-[#FF2A2A]/50 transition-all flex items-center gap-1.5 text-xs font-mono font-semibold shrink-0"
                        title="Open GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5 text-[#FF2A2A]" />
                        <span>Code</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF2A2A]/10 hover:bg-[#FF2A2A] border border-[#FF2A2A]/30 text-white text-xs font-semibold transition-all group-hover:border-[#FF2A2A]/60"
                    >
                      <span>View Technical Details</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-8 rounded-3xl border-[#FF2A2A]/30 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl bg-[#0F0F14]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-[#FF2A2A]/20 border border-[#FF2A2A]/30 text-white text-xs font-mono mb-3">
                {selectedProject.category}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-6">
                <span>Period: {selectedProject.period}</span>
                {selectedProject.role && <span className="text-[#FF2A2A]">Role: {selectedProject.role}</span>}
              </div>

              <div className="space-y-4 text-neutral-300 text-sm leading-relaxed mb-6">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                Key Technical Innovations &amp; Features:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-[#FF2A2A] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                Technologies &amp; Libraries:
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-[#FF2A2A]/15 border border-[#FF2A2A]/30 text-white text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/15 hover:border-[#FF2A2A]/50"
                  >
                    <Github className="w-4 h-4 text-[#FF2A2A]" />
                    <span>View GitHub Repo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF2A2A] hover:bg-red-600 text-white font-semibold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
