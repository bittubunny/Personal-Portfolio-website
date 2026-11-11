import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md print:p-0 print:bg-white">
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col text-slate-200 print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        
        {/* Header Toolbar (Hidden in print) */}
        <div className="bg-slate-850 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              ATS Recruiter Dossier / Resume
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs font-mono transition-transform hover:scale-105 active:scale-95 shadow-neon-sky"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-sm bg-slate-950/90 print:p-0 print:bg-white print:text-black font-sans leading-relaxed">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-5 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight font-display">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-sm font-semibold text-sky-400 print:text-blue-700 mt-1 font-mono">
              Full-Stack Software Engineer &bull; Applied AI/ML Specialist &bull; M.Tech CSE Scholar
            </p>

            <div className="mt-3 flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-300 print:text-black font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-sky-400 print:text-black" />
                {PORTFOLIO_DATA.personal.email}
              </span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-sky-400 print:text-black" />
                github.com/bittubunny
              </span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-sky-400 print:text-black" />
                linkedin.com/in/bharath-chelimalla
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400 print:text-black" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 print:text-blue-700 font-bold mb-2">
              Professional Summary
            </h2>
            <p className="text-slate-300 print:text-black text-xs sm:text-sm leading-relaxed">
              {PORTFOLIO_DATA.personal.bio[0]} {PORTFOLIO_DATA.personal.bio[1]}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 print:text-blue-700 font-bold mb-3">
              Verified Technical Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 print:border-black print:bg-white">
                <span className="font-bold text-slate-100 print:text-black font-mono">Languages:</span>
                <span className="text-slate-300 print:text-black ml-2">Python, Java, C++, C, SQL</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 print:border-black print:bg-white">
                <span className="font-bold text-slate-100 print:text-black font-mono">Web &amp; APIs:</span>
                <span className="text-slate-300 print:text-black ml-2">React.js, FastAPI, Flask, Streamlit, HTML5/CSS3</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 print:border-black print:bg-white">
                <span className="font-bold text-slate-100 print:text-black font-mono">Databases:</span>
                <span className="text-slate-300 print:text-black ml-2">MySQL, SQLite, PostgreSQL, Normalization (3NF)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 print:border-black print:bg-white">
                <span className="font-bold text-slate-100 print:text-black font-mono">Tools &amp; Testing:</span>
                <span className="text-slate-300 print:text-black ml-2">Git, GitHub Actions, Selenium Automated Testing</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 print:text-blue-700 font-bold mb-3">
              Education &amp; Academic Credentials
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-sky-400/40 print:border-black pl-3.5 space-y-1">
                  <div className="flex flex-wrap items-center justify-between text-xs">
                    <h3 className="font-bold text-white print:text-black text-sm">{edu.degree}</h3>
                    <span className="font-mono text-slate-400 print:text-black">{edu.period}</span>
                  </div>
                  <div className="text-xs text-sky-400 print:text-blue-700 font-mono font-medium">{edu.institution}</div>
                  <p className="text-xs text-slate-300 print:text-black">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 print:text-blue-700 font-bold mb-3">
              Verified Flagship Projects (GitHub: @bittubunny)
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-sky-400/40 print:border-black pl-3.5 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between text-xs">
                    <h3 className="font-bold text-white print:text-black text-sm">{proj.title}</h3>
                    <span className="font-mono text-sky-400 print:text-blue-700 font-semibold">{proj.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300 print:text-black leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 print:text-black">
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
