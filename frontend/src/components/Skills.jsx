import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Wrench, Layers, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'languages', label: 'Programming Languages', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'webFrameworks', label: 'Web & Microservices', icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'databases', label: 'Databases & Query Optimization', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'toolsAndTesting', label: 'Tools, Automation & Testing', icon: <Wrench className="w-3.5 h-3.5" /> }
  ];

  const getFilteredGroups = () => {
    let groups = [];
    if (activeTab === 'all' || activeTab === 'languages') {
      groups.push({
        id: 'languages',
        title: 'Core Programming Languages',
        desc: 'Foundational syntax, asynchronous concurrency, and algorithmic problem-solving.',
        items: PORTFOLIO_DATA.skills.languages
      });
    }
    if (activeTab === 'all' || activeTab === 'webFrameworks') {
      groups.push({
        id: 'webFrameworks',
        title: 'Web Frameworks & Asynchronous Microservices',
        desc: 'Reactive frontends (React 18), asynchronous REST APIs (FastAPI/Flask), and rapid prototyping.',
        items: PORTFOLIO_DATA.skills.webFrameworks
      });
    }
    if (activeTab === 'all' || activeTab === 'databases') {
      groups.push({
        id: 'databases',
        title: 'Databases, Normalization & Query Design',
        desc: 'Relational data modeling, schema normalization (3NF), ACID compliance, and query indexing.',
        items: PORTFOLIO_DATA.skills.databases
      });
    }
    if (activeTab === 'all' || activeTab === 'toolsAndTesting') {
      groups.push({
        id: 'toolsAndTesting',
        title: 'Tools, Version Control & Automated QA',
        desc: 'Collaborative Git branch workflows, browser test automation with Selenium, and CI/CD pipelines.',
        items: PORTFOLIO_DATA.skills.toolsAndTesting
      });
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      groups = groups.map(g => ({
        ...g,
        items: g.items.filter(item =>
          item.name.toLowerCase().includes(q) ||
          item.highlights.toLowerCase().includes(q) ||
          item.usedIn.some(p => p.toLowerCase().includes(q))
        )
      })).filter(g => g.items.length > 0);
    }

    return groups;
  };

  return (
    <section id="skills" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/60">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
              <span>// 02. TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Verified Technical <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Every technology below is backed by real implementations in Bharath's GitHub repositories. Strictly <strong className="text-sky-300">0% arbitrary percentages</strong>.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              placeholder="Search stack, concepts, or repos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === cat.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-neon-sky scale-102'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div id="skills-matrix" className="space-y-12">
          {getFilteredGroups().map((group, groupIdx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white font-display">
                  {group.title}
                </h3>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                  {group.items.length} Verified Proficiencies
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="executive-card p-5 rounded-2xl flex flex-col justify-between group hover:border-sky-400/50 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                          {skill.tier}
                        </span>
                        <span className="text-slate-500 text-[11px]">{skill.category}</span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors font-display flex items-center justify-between mb-1.5">
                        <span>{skill.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                        {skill.highlights}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="text-[10px] font-mono text-slate-500 mb-1.5">Implemented In:</div>
                      <div className="flex flex-wrap gap-1">
                        {skill.usedIn.map((proj, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
