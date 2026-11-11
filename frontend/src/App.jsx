import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ArchitectureCanvas from './components/ArchitectureCanvas';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiAvatarCompanion from './components/AiAvatarCompanion';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import ResumeModal from './components/ResumeModal';
import ProjectModal from './components/ProjectModal';
import AgentEvolutionModal from './components/AgentEvolutionModal';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioMain() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState(false);
  const [projectCategory, setProjectCategory] = useState('All');
  const [modalProject, setModalProject] = useState(null);
  const { isDark } = useTheme();

  // Lenis smooth scroll with accessibility reduced-motion check
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 font-sans selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden ${
        isDark ? 'bg-[#070a12] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Top Reading Scroll Progress Bar */}
      <ScrollProgress />

      {/* Trailing Precision Cursor */}
      <CustomCursor />

      {/* Modern Grid Background Texture */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0" />

      {/* Full-Width Executive Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections - Fluid Full-Width Layout */}
      <main className="flex-1 w-full">
        {/* 00. Hero Section with Bharath's Picture & Quick Telemetry */}
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* 01. Engineering Profile & Philosophy */}
        <About />

        {/* 02. Verified Technical Arsenal (0% Fake Percentages) */}
        <Skills />

        {/* 03. Production Code Repositories & Case Studies */}
        <Projects
          activeCategory={projectCategory}
          onCategoryChange={setProjectCategory}
        />

        {/* 04. Interactive System Architecture & Data Flow Explorer */}
        <ArchitectureCanvas />

        {/* 05. Academic Credentials (M.Tech CSE & B.Tech CSE) */}
        <Education />

        {/* 06. Professional & Research Milestones */}
        <Experience />

        {/* 07. Recruiter Scheduling & Direct Communication Hub (FastAPI) */}
        <Contact />
      </main>

      {/* Full-Width Executive Footer */}
      <Footer />

      {/* Autonomous Self-Evolving Spatial VR AI Companion */}
      <AiAvatarCompanion
        onNavigateToSection={(action) => {
          if (action === 'resume') setIsResumeModalOpen(true);
        }}
        onFilterProjects={(cat) => setProjectCategory(cat)}
        onOpenEvolutionDeck={() => setIsEvolutionModalOpen(true)}
      />

      {/* Agent Cognitive Core & Self-Evolution Deck Modal */}
      <AgentEvolutionModal
        isOpen={isEvolutionModalOpen}
        onClose={() => setIsEvolutionModalOpen(false)}
      />

      {/* Recruiter Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onSelectProject={(proj) => setModalProject(proj)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioMain />
    </ThemeProvider>
  );
}
