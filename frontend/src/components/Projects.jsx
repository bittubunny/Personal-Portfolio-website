import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Layers, ShieldCheck, Activity, Cpu, CheckCircle2, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

// Interactive Mockup Visualizer for each project card
function ProjectVisualBanner({ project }) {
  if (project.id === 'weftin-project') {
    return (
      <div className="relative h-56 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-black/60 border border-sky-400/40 text-sky-300">
            BARCODE OPTICAL ENGINE :: READY
          </span>
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            POS ONLINE
          </span>
        </div>

        <div className="my-auto p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-sky-400 font-bold">WEFTIN ATELIER &bull; SKU #9482-LUX</span>
            <span className="text-emerald-400 font-bold">$1,250.00</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-sky-400 w-3/4 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Laser Optical Feed: Verified</span>
            <span className="text-sky-300">Latency: &lt;120ms</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>INVOICE LEDGER &bull; STOCKROOM SYNC</span>
          <span className="text-sky-400 font-bold">ZERO INVENTORY DRIFT</span>
        </div>
      </div>
    );
  }

  if (project.id === 'Fraud-Detection-in-Banking-System') {
    return (
      <div className="relative h-56 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-black/60 border border-indigo-400/40 text-indigo-300">
            FINTECH ANOMALY RADAR
          </span>
          <span className="text-emerald-400 font-semibold font-mono">ROC-AUC: 0.962</span>
        </div>

        <div className="my-auto p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-200">Incoming Transaction Vector</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              SAFE (Risk: 0.02%)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400 pt-1">
            <div className="p-1 rounded bg-white/5">
              <div className="text-slate-200 font-bold">SMOTE</div>
              <div>Balanced</div>
            </div>
            <div className="p-1 rounded bg-white/5">
              <div className="text-sky-400 font-bold">&lt;30ms</div>
              <div>Latency</div>
            </div>
            <div className="p-1 rounded bg-white/5">
              <div className="text-emerald-400 font-bold">&lt;0.05%</div>
              <div>False Pos</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>HIGH-DIMENSIONAL PCA</span>
          <span className="text-indigo-400 font-bold">ENSEMBLE TREES &amp; LOGISTIC ML</span>
        </div>
      </div>
    );
  }

  if (project.id === 'AI-in-Mental-Health') {
    return (
      <div className="relative h-56 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-black/60 border border-cyan-400/40 text-cyan-300">
            NLP SENTIMENT VALENCE &bull; PRIVACY-FIRST
          </span>
          <span className="text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            ZERO TRACKING
          </span>
        </div>

        <div className="my-auto p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-200">Conversational Emotion Valence</span>
            <span className="text-cyan-300 font-bold">+0.78 Stable</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 w-4/5 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Safety Net Trigger: Armed</span>
            <span className="text-emerald-400">Clinical Triage Ready</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>SCIKIT-LEARN NLP &bull; TF-IDF</span>
          <span className="text-cyan-400 font-bold">EMPATHETIC HEALTHCARE</span>
        </div>
      </div>
    );
  }

  if (project.id === 'gesture-app') {
    return (
      <div className="relative h-56 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-black/60 border border-emerald-400/40 text-emerald-300">
            DORSAL HAND PATCH &bull; 6-DOF IMU
          </span>
          <span className="text-sky-400 text-xs font-mono font-semibold">
            TELEMETRY STREAM
          </span>
        </div>

        <div className="my-auto p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-200">Recognized Gesture</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              PINCH &amp; ROTATE (Relay #3)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400 pt-1">
            <div className="p-1 rounded bg-white/5">
              <div className="text-slate-200 font-bold">FLEX SENSORS</div>
              <div>5 Digits</div>
            </div>
            <div className="p-1 rounded bg-white/5">
              <div className="text-emerald-400 font-bold">PITCH / ROLL</div>
              <div>±180° Range</div>
            </div>
            <div className="p-1 rounded bg-white/5">
              <div className="text-sky-400 font-bold">SMART HOME</div>
              <div>Connected</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>TREMOR NOISE FILTER</span>
          <span className="text-emerald-400 font-bold">HANDS-FREE WEARABLE UI</span>
        </div>
      </div>
    );
  }

  // Quiz game
  return (
    <div className="relative h-56 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="px-2.5 py-1 rounded bg-black/60 border border-purple-400/40 text-purple-300">
          GAMIFIED REACT ENGINE
        </span>
        <span className="text-sky-400 font-mono font-semibold">60 FPS SPA</span>
      </div>

      <div className="my-auto p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-200">Dynamic Multiplier</span>
          <span className="text-purple-400 font-bold">x3.5 BONUS ACTIVE</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-400 to-sky-400 w-5/6 animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Category: CS Algorithms</span>
          <span className="text-emerald-400">Streak: 12 Correct</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>STATE MACHINE ARCHITECTURE</span>
        <span className="text-purple-400 font-bold">PERSISTENT LEADERBOARD</span>
      </div>
    </div>
  );
}

export default function Projects({
  activeCategory: externalCategory,
  onCategoryChange
}) {
  const [internalCategory, setInternalCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const activeCategory = externalCategory !== undefined ? externalCategory : internalCategory;
  const handleCategorySelect = (cat) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const categories = [
    { label: 'All Repositories', value: 'All' },
    { label: 'AI & Machine Learning', value: 'AI/ML' },
    { label: 'Full-Stack Web', value: 'Full-Stack' },
    { label: 'IoT & Interactive', value: 'Other' },
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory || (activeCategory === 'Other' && (p.category === 'Other' || p.category === 'Web Development')));

  return (
    <section id="projects" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/40">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
              <span>// 03. VERIFIED CODE REPOSITORIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Production Projects &amp; <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Case Studies</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Every project below is an active repository on GitHub under <strong className="text-white font-mono">@bittubunny</strong>, engineered with modern software design patterns and measurable outcomes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategorySelect(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat.value
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-neon-sky scale-102'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Widescreen Fluid Grid: Expands to 2 or 3 columns on ultra-wide screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              id={`card-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="executive-card rounded-3xl overflow-hidden group flex flex-col justify-between hover:border-sky-400/50 transition-all shadow-xl"
            >
              <div>
                {/* Visualizer Banner */}
                <ProjectVisualBanner project={project} />

                {/* Body Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      CATEGORY: {project.category.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-mono text-sky-400 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  {/* Highlights Bullet */}
                  <div className="space-y-1.5 pt-2">
                    {project.keyOutcomes.slice(0, 2).map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 sm:p-7 sm:pt-0 flex items-center justify-between gap-3 border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center space-x-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors group/btn"
                >
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Inspect Blueprint &amp; Case Study</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 transition-all"
                  title="View GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Modal Case Study Viewer */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
