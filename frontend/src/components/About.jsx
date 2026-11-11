import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Database, Zap, CheckCircle2, Award, Terminal, Code2, Layers, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function About() {
  const engineeringPillars = [
    {
      icon: <Server className="w-5 h-5 text-sky-400" />,
      title: "Full-Stack Web Architectures",
      desc: "Coupling reactive modern frontends (React 18) with robust, asynchronous Python backend microservices (FastAPI & Flask). Designed for zero-latency user flows and resilient RESTful routing."
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Applied AI & Anomaly Detection",
      desc: "Training and serving supervised and unsupervised machine learning models. Built fintech fraud detection pipelines balancing extreme class distributions (0.962 ROC-AUC) and NLP sentiment screening."
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      title: "Hardware Telemetry & IoT Integration",
      desc: "Interfacing physical sensors with real-time web dashboards. Built wearable dorsal hand patches with strain flex sensors and 6-DOF IMUs for hands-free kinematic device control."
    },
    {
      icon: <Database className="w-5 h-5 text-amber-400" />,
      title: "Relational Schemas & Cloud Deployments",
      desc: "Designing normalized relational databases (3NF) across MySQL, SQLite, and PostgreSQL with strict ACID properties; automated production deployments using Vercel, Render, and CI/CD pipelines."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/40">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <span>// 01. ENGINEERING PROFILE &amp; PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Rigorous Foundations. <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Scalable Execution.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Bridging core academic Computer Science principles with modern software delivery and machine learning pipelines.
          </p>
        </div>

        {/* Fluid Grid Layout: Left Bio Card (5 Cols) + Right 4 Pillars (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 executive-card p-7 sm:p-9 rounded-3xl relative overflow-hidden group shadow-xl"
          >
            <div className="flex items-center space-x-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-sky-400/30 flex items-center justify-center text-sky-400 font-mono font-bold text-lg shadow-neon-sky">
                BC
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">{PORTFOLIO_DATA.personal.name}</h3>
                <p className="text-xs font-mono text-sky-400">@bittubunny &bull; M.Tech CSE Scholar</p>
              </div>
            </div>

            <div className="space-y-3.5 text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              {PORTFOLIO_DATA.personal.bio.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-3 pt-5 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Academic Level:</span>
                <span className="font-semibold text-white">M.Tech Computer Science Scholar</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Core Engineering:</span>
                <span className="font-semibold text-sky-300">React &bull; Python FastAPI &bull; SQL &bull; ML</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Work Readiness:</span>
                <span className="font-semibold text-emerald-400">Immediate / Full-Time Ready</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">GitHub Verified:</span>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-sky-400 hover:underline"
                >
                  github.com/bittubunny
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right 4 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {engineeringPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="executive-card p-6 rounded-3xl relative overflow-hidden group hover:border-sky-400/50 transition-all shadow-md"
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-display group-hover:text-sky-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}

            {/* Recruiter Guarantee Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2 p-6 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-400/20 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white font-display">
                    Software Engineer Ready for High-Scale Roles
                  </h5>
                  <p className="text-xs text-slate-300">
                    Strong data structure foundations, modern asynchronous APIs, and verified repositories.
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs shadow-neon-sky transition-transform hover:scale-105 active:scale-95"
              >
                Initiate Conversation &rarr;
              </a>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
