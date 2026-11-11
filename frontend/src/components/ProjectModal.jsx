import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, ArrowUpRight, AlertCircle, Compass, Award } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        
        {/* Backdrop Dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col font-sans"
        >
          {/* Header Toolbar */}
          <div className="bg-slate-850 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono uppercase font-bold">
                {project.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                CATEGORY: {project.category.toUpperCase()}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-sky-400 mb-1">
                <span>SYSTEM ARCHITECTURE &amp; CASE STUDY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {project.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base font-mono text-sky-400 font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Problem Statement Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20 space-y-1.5">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase">
                <AlertCircle className="w-4 h-4" />
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Approach Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-1.5">
              <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono font-bold uppercase">
                <Compass className="w-4 h-4" />
                <span>Bharath's Architecture &amp; Implementation</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* Architecture Diagram */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>System Architecture &amp; Data Flow Blueprint</span>
              </h4>
              <div className="p-4 rounded-2xl bg-black/80 border border-slate-800 font-mono text-[11px] sm:text-xs text-sky-300 overflow-x-auto shadow-inner leading-relaxed">
                <pre>{project.architecture}</pre>
              </div>
            </div>

            {/* Measurable Outcomes */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Key Measurable Outcomes</span>
              </h4>
              <ul className="space-y-2">
                {project.keyOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mr-2.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Breakdown */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                // Technologies Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-sky-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="bg-slate-850 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400">
              REPOSITORY: github.com/bittubunny/{project.repoName}
            </span>

            <div className="flex items-center space-x-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs font-mono transition-transform hover:scale-105 active:scale-95 shadow-neon-sky"
              >
                <Github className="w-4 h-4" />
                <span>Open Verified GitHub Repo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
