import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Bot, ExternalLink, Moon, Sun, ArrowRight, Code, GraduationCap, Briefcase, Mail, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const allItems = [
    {
      id: 'resume',
      title: 'View & Download Resume Dossier',
      subtitle: 'ATS-formatted recruiter resume & PDF print option',
      category: 'Recruiter Action',
      icon: <FileText className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      }
    },
    {
      id: 'schedule',
      title: 'Schedule an Interview Call',
      subtitle: 'Choose preferred date/time for technical discussion',
      category: 'Recruiter Action',
      icon: <Calendar className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'theme-toggle',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle light and dark themes',
      category: 'Preferences',
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'nav-projects',
      title: 'Browse All 5 Verified Repositories',
      subtitle: 'Filter by AI/ML, Full-Stack, and IoT Systems',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: `${p.category} • ${p.tagline}`,
      category: 'Verified Code Repositories',
      icon: <Code className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onClose();
        if (onSelectProject) onSelectProject(p);
      }
    })),
    {
      id: 'nav-architecture',
      title: 'Interactive System Architecture Explorer',
      subtitle: 'Visual data flow blueprints for POS, ML, and IoT',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-skills',
      title: 'Technical Arsenal & Skills Matrix',
      subtitle: 'Python, Java, C++, SQL, React, FastAPI, Selenium',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-education',
      title: 'Academic Credentials (M.Tech CSE)',
      subtitle: 'Ongoing M.Tech Postgraduate & B.Tech CS Degree',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-contact',
      title: 'Contact Bharath Chelimalla',
      subtitle: `${PORTFOLIO_DATA.personal.email} • Direct FastAPI Endpoint`,
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'ext-github',
      title: 'GitHub Profile @bittubunny',
      subtitle: 'github.com/bittubunny',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.github, '_blank');
        onClose();
      }
    }
  ];

  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-850">
          <Search className="w-5 h-5 text-sky-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, skills, resume, schedule, or actions..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close Command Palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm font-mono">
              No matching entries found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-colors ${
                  selectedIndex === idx
                    ? 'bg-sky-500/15 border border-sky-400/40 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-slate-100 truncate font-display">{item.title}</div>
                    <div className="text-xs text-slate-400 truncate font-sans">{item.subtitle}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 ml-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-sky-300 border border-slate-700">
                    {item.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Keyboard Footer */}
        <div className="px-4 py-2.5 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
          <div className="flex items-center space-x-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-sky-400 font-bold">Ctrl+K Command Palette</span>
        </div>

      </div>
    </div>
  );
}
