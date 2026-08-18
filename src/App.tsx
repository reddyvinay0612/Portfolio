import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { Preloader } from './components/Preloader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <>
      {/* 1. CINEMATIC PRELOADER */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. PORTFOLIO WEBSITE CONTENT */}
      <div className="relative min-h-screen bg-[#070709] text-white selection:bg-[#FF2A2A] selection:text-white font-sans overflow-x-hidden">
        {/* Sticky Header Navbar */}
        <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        <main>
          {/* Hero Section with Video */}
          <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
          
          {/* About Section with Lanyard ID Badge */}
          <About />
          
          {/* Process Timeline Section (White Grid S-Curve) */}
          <ProcessTimeline />

          {/* Academic Education Section */}
          <Education />

          {/* Works / Projects Section */}
          <Projects />

          {/* Skill Proficiency Section */}
          <Skills />

          {/* Certificates Training Section */}
          <Certifications />

          {/* Contact CTA Form Section */}
          <Contact />
        </main>

        {/* Agency editorial Footer */}
        <Footer />

        {/* PDF Resume Drawer Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </>
  );
};

export default App;
