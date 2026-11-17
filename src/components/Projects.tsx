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
  Eye
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';
import { generateProjectCardTexture } from '../utils/projectCardCanvas';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
    <section id="projects" className="py-24 px-4 md:px-8 relative z-10 bg-white overflow-hidden">
      
      {/* Background ambient sage glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#b1b493]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#5a5d40] text-xs font-mono uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5 text-[#8e916c]" />
            <span>Interactive 3D Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
            Featured <span className="text-[#b1b493]">Projects</span>
          </h2>
          <p className="mt-3 text-[#6c757d] max-w-2xl text-sm md:text-base">
            Explore innovative engineering work spanning explainable machine learning, biometric spoofing defense, educational intelligence, and computer vision.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#b1b493] text-white shadow-md shadow-[#b1b493]/30'
                  : 'bg-[#f8f9fa] text-[#6c757d] border border-neutral-200/80 hover:text-[#000000] hover:border-[#b1b493]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ---------------- 3D CIRCULAR GALLERY SHOWCASE ---------------- */}
        <div className="space-y-6">
            
            {/* Gallery Stage Container */}
            <div className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] rounded-3xl bg-[#f8f9fa] border border-neutral-200/80 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
              
              {/* Subtle tech background grid */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* The WebGL Circular Gallery */}
              <div className="w-full h-full">
                <CircularGallery
                  items={galleryItems}
                  bend={bendIntensity}
                  autoRotateSpeed={0.06}
                  autoScroll={autoRotate ? 0.3 : 0}
                  onActiveChange={(index) => setActiveProjectIndex(index)}
                  onItemClick={(item, index) => {
                    const proj = filteredProjects[index];
                    if (proj) setSelectedProject(proj);
                  }}
                />
              </div>
            </div>

            {/* Active Project Live Spotlight Card */}
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#b1b493]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  
                  {/* Left: Project Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#4e5135]">
                        {activeProject.category}
                      </span>
                      {activeProject.statusBadge && (
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#b1b493]/20 text-[#3a3d24] border border-[#b1b493]/40">
                          {activeProject.statusBadge}
                        </span>
                      )}
                      {activeProject.role && (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#f8f9fa] text-[#495057] border border-neutral-200 flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#b1b493]" />
                          {activeProject.role}
                        </span>
                      )}
                      <span className="text-xs font-mono text-[#6c757d]">
                        {activeProject.period}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#000000] tracking-tight">
                      {activeProject.title}
                    </h3>

                    <p className="text-sm text-[#6c757d] leading-relaxed max-w-3xl line-clamp-2">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeProject.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#f8f9fa] text-[#495057] border border-neutral-200/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions & Carousel Nav */}
                  <div className="flex items-center gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                    
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#f8f9fa] hover:bg-neutral-100 text-[#212529] border border-neutral-200 hover:border-[#b1b493] transition-all flex items-center gap-2 text-xs font-mono font-semibold"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4 text-[#b1b493]" />
                        <span>Code</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(activeProject)}
                      className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#b1b493] hover:bg-[#9a9d7c] text-white text-xs font-semibold shadow-md shadow-[#b1b493]/20 transition-all"
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

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-3xl border border-neutral-200/80 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl text-[#212529]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 text-[#495057] hover:text-[#000000] hover:bg-neutral-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#4e5135] text-xs font-mono mb-3">
                {selectedProject.category}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-[#000000] mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex items-center gap-4 text-xs font-mono text-[#6c757d] mb-6">
                <span>Period: {selectedProject.period}</span>
                {selectedProject.role && <span className="text-[#8e916c]">Role: {selectedProject.role}</span>}
              </div>

              <div className="space-y-4 text-[#495057] text-sm leading-relaxed mb-6">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              <h4 className="text-xs font-mono uppercase text-[#6c757d] tracking-wider mb-3">
                Key Technical Innovations &amp; Features:
              </h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#212529] bg-[#f8f9fa] p-2.5 rounded-xl border border-neutral-200/80">
                    <Sparkles className="w-4 h-4 text-[#b1b493] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-mono uppercase text-[#6c757d] tracking-wider mb-3">
                Technologies &amp; Libraries:
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.technologies.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-[#b1b493]/15 border border-[#b1b493]/35 text-[#4e5135] text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100">
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#f8f9fa] hover:bg-neutral-100 text-[#212529] font-mono text-xs font-bold transition-all border border-neutral-200 hover:border-[#b1b493]"
                  >
                    <Github className="w-4 h-4 text-[#b1b493]" />
                    <span>View GitHub Repo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6c757d]" />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#b1b493] hover:bg-[#9a9d7c] text-white font-semibold text-xs transition-colors shadow-sm"
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
