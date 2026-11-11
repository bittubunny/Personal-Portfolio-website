import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, CheckCircle2, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/40">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Header */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <span>// 05. ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Education &amp; <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Research Scholarship</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Rigorous Computer Science scholarship combining postgraduate research in intelligent systems with foundational engineering principles.
          </p>
        </div>

        {/* Fluid 2-Column Grid */}
        <div id="education-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="executive-card p-7 sm:p-9 rounded-3xl flex flex-col justify-between group relative overflow-hidden shadow-xl hover:border-sky-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center space-x-2.5">
                    <span className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shadow-neon-sky">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-sky-300 border border-slate-700 font-semibold">
                      {edu.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors font-display">
                  {edu.degree}
                </h3>
                <div className="text-sm font-mono text-sky-400 mt-1 flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{edu.institution}</span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="mt-6 space-y-2.5 border-t border-slate-800 pt-4">
                  <h4 className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
                    Core Specializations &amp; Highlights:
                  </h4>
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>VERIFIED DEGREE TRACK</span>
                <span className="text-sky-400 font-semibold">CS &amp; ENGINEERING</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
