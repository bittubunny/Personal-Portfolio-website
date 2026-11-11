import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Calendar, Sun, Moon, Bot, Github, Linkedin, ExternalLink } from 'lucide-react';
import { checkBackendHealth } from '../utils/api';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenResume, onOpenSchedule }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkBackendHealth()
      .then((res) => {
        if (res.status === 'healthy' || res.status === 'online') {
          setServerStatus('online');
        } else {
          setServerStatus('standby');
        }
      })
      .catch(() => setServerStatus('standby'));
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 dark:bg-[#070a12]/90 bg-white/90 backdrop-blur-xl border-b border-slate-800/60 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          
          {/* Logo & Executive Brand */}
          <a
            href="#"
            className="group flex items-center space-x-3.5 transition-transform hover:scale-102"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1.5px] shadow-neon-sky">
              <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center font-display font-extrabold text-sky-400 text-sm group-hover:bg-slate-900 transition-colors">
                BC
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-sky-400 transition-colors">
                Bharath Chelimalla
              </span>
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <span>@bittubunny</span>
                <span>&bull;</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active for Hire
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-sky-400 transition-colors py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center space-x-3 font-mono text-xs">
            {/* Direct Schedule Call Button */}
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold transition-transform hover:scale-105 active:scale-95 shadow-neon-sky"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Call</span>
            </a>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-sky-400/50 transition-colors font-semibold"
              title="Download ATS-Friendly Resume"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Resume</span>
            </button>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-700/80 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 mt-3 space-y-4 font-mono text-sm shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-sky-400 py-2 border-b border-slate-800/80 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-sky-400 text-xs">&rarr;</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs shadow-neon-sky"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Interview Call</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenResume) onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-semibold"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Download ATS Resume Dossier</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
