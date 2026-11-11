import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/60">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Header */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <span>// 06. PROFESSIONAL &amp; RESEARCH TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Career Milestones &amp; <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Engineering Impact</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Hands-on software delivery, machine learning model training, and technical project execution with verified outcomes and timelines.
          </p>
        </div>

        {/* Fluid Timeline Container */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="executive-card p-7 sm:p-9 rounded-3xl shadow-xl hover:border-sky-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-neon-sky">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="px-3 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono font-bold">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors font-display">
                  {item.role}
                </h3>
                <div className="text-sm font-mono text-sky-400 font-semibold mt-0.5">
                  {item.organization}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-4xl">
                  {item.description}
                </p>

                {/* Achievements */}
                <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                  {item.keyAchievements.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 mr-2.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
