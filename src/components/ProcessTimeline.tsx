import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  rotation: string;
  position: 'left' | 'right';
  triggerProgress: number;
}

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Monitor scroll progress across the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to SVG path drawing length
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Define",
      description: "Establishing requirements, defining architecture, and mapping out features. We target application boundaries, outline user flows, and outline databases.",
      rotation: "rotate-2",
      position: 'right',
      triggerProgress: 0.15
    },
    {
      number: "02",
      title: "Design",
      description: "Translating concepts into responsive wireframes, choosing typography grids, and engineering consistent, state-of-the-art UI layouts with glassmorphic visuals.",
      rotation: "-rotate-2",
      position: 'left',
      triggerProgress: 0.38
    },
    {
      number: "03",
      title: "Build",
      description: "Writing scalable React code, styling with utility classes, integrating deep learning models (like CNNs), and securing transactions against synthetic AI threats.",
      rotation: "rotate-3",
      position: 'right',
      triggerProgress: 0.62
    },
    {
      number: "04",
      title: "Launch",
      description: "Performing builds, validating Cross-Browser stability, optimizing web asset delivery, checking final layouts, and deploying to production clouds.",
      rotation: "-rotate-3",
      position: 'left',
      triggerProgress: 0.85
    }
  ];

  // Update active step based on scroll depth
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      let currentActive = 0;
      steps.forEach((step, idx) => {
        if (latest >= step.triggerProgress - 0.05) {
          currentActive = idx + 1;
        }
      });
      setActiveStep(currentActive);
    });
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef}
      id="process" 
      className="relative py-28 bg-[#f2f7fa] text-[#212529] overflow-hidden z-10 select-none"
      style={{
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '28px 28px'
      }}
    >
      {/* Background ambient sage glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#3b82a6]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-24 relative">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#3b82a6]/35 text-xs font-mono font-bold uppercase tracking-widest shadow-sm bg-[#3b82a6]/15 text-[#163e54] mb-4">
            How we work
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-[#000000] max-w-3xl">
            Let us show you how we drive your brand to new heights
          </h2>

          <p className="mt-6 text-[#6c757d] max-w-xl text-sm md:text-base font-normal">
            A structured workflow ensures high performance, minimal friction, and beautiful production-ready code.
          </p>

          {/* Hand-drawn SVG Arrow */}
          <div className="hidden lg:block absolute right-16 top-6 text-[#3b82a6]">
            <svg className="w-16 h-16 transform rotate-[15deg]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 100">
              <path d="M10,80 Q40,30 90,20" strokeDasharray="5,5" />
              <path d="M70,15 L90,20 L85,40" />
            </svg>
          </div>
        </div>

        {/* TIMELINE CONNECTOR CONTAINER */}
        <div className="relative min-h-[1400px]">
          
          {/* GIANT S-CURVE TIMELINE SVG PATH (Desktop-only) */}
          <div className="hidden md:block absolute inset-0 w-full h-full z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 1400" fill="none" preserveAspectRatio="none">
              {/* Background soft dashed line */}
              <path 
                d="M 400 0 C 680 250, 680 450, 400 700 C 120 950, 120 1150, 400 1400" 
                stroke="#e2e4d5" 
                strokeWidth="4" 
                strokeDasharray="12 12"
              />
              {/* Active animated sage dashed line */}
              <motion.path 
                d="M 400 0 C 680 250, 680 450, 400 700 C 120 950, 120 1150, 400 1400" 
                stroke="#3b82a6" 
                strokeWidth="4" 
                strokeDasharray="12 12"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* VERTICAL TIMELINE FOR MOBILE */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-1 z-0 pointer-events-none">
            <div className="w-full h-full bg-neutral-200 border-l-2 border-dashed border-[#3b82a6]" />
          </div>

          {/* PROCESS CARDS GRID */}
          <div className="relative z-10 flex flex-col space-y-12 md:space-y-0 md:block w-full h-full">
            {steps.map((step, idx) => {
              const stepIndex = idx + 1;
              const isActive = activeStep >= stepIndex;
              const isLeft = step.position === 'left';
              
              // Define positioning values for absolute layout on desktop
              const desktopStyleY = [120, 450, 780, 1110];

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                  className={`md:absolute w-full md:w-[420px] z-20 ${
                    isLeft ? 'md:left-8' : 'md:right-8'
                  }`}
                  style={{
                    top: `${desktopStyleY[idx]}px`
                  }}
                >
                  {/* CARD BODY: Turns Clyde sage when active */}
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`relative p-8 rounded-[2rem] border transition-all duration-500 shadow-xl cursor-default ${step.rotation} ${
                      isActive 
                        ? 'bg-[#3b82a6] text-white border-[#3b82a6] shadow-[0_20px_45px_rgba(59, 130, 166,0.35)]' 
                        : 'bg-white text-[#212529] border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-[#3b82a6]'
                    }`}
                  >
                    {/* HOLE PUNCH DETAILED GRAPHIC */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-neutral-300 bg-neutral-100 shadow-inner flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                    </div>

                    {/* Step Number in Italic Serif Typography */}
                    <div className={`text-5xl font-serif italic font-normal tracking-wide mt-4 mb-2 ${
                      isActive ? 'text-white/90' : 'text-[#2c6585]'
                    }`}>
                      {step.number}
                    </div>

                    <h4 className="text-2xl font-black tracking-tight mb-3">
                      {step.title}
                    </h4>

                    <p className={`text-xs md:text-sm leading-relaxed ${
                      isActive ? 'text-white/95' : 'text-[#6c757d]'
                    }`}>
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM SECTION - SKETCHBOOK AESTHETIC */}
        <div className="mt-28 flex flex-col items-center">
          <motion.h4 
            whileInView={{ rotate: -2, scale: 1.05 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif italic text-[#2c6585] tracking-wide select-none font-medium transform -rotate-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            "Ready to be delivered!"
          </motion.h4>
        </div>

      </div>
    </section>
  );
};
