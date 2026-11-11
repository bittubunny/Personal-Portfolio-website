import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950 py-12 text-xs font-mono text-slate-400 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1.5px]">
              <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center font-bold text-sky-400 text-sm">
                BC
              </div>
            </div>
            <div>
              <div className="font-extrabold text-white text-sm font-display">Bharath Chelimalla</div>
              <span className="text-slate-400 text-[11px] font-mono">Full-Stack &amp; AI/ML Engineer &bull; M.Tech CSE</span>
            </div>
          </div>

          {/* Socials & Actions */}
          <div className="flex items-center space-x-3">
            <a
              href={PORTFOLIO_DATA.personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 transition-all hover:scale-105"
              aria-label="GitHub @bittubunny"
              title="GitHub @bittubunny"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 transition-all hover:scale-105"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.socials.email}`}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 transition-all hover:scale-105"
              aria-label="Email"
              title="Email Bharath"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 text-xs transition-all hover:scale-105"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name} (@{PORTFOLIO_DATA.personal.handle}). Built with clean architecture and modern engineering standards.
          </div>
          <div className="flex items-center space-x-2 font-mono">
            <span>Powered by:</span>
            <span className="text-sky-400 font-semibold">React 18</span>
            <span>&bull;</span>
            <span className="text-indigo-400 font-semibold">FastAPI Python</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-semibold">Tailwind CSS</span>
            <span>&bull;</span>
            <span className="text-slate-300 font-semibold">Web Speech AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
