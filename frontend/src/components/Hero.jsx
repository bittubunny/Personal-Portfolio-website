import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Calendar, Github, Linkedin, MapPin, CheckCircle2, Camera, Upload, Sparkles, Code2, Server } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const ROTATING_TITLES = [
  "Full-Stack Software Engineer (React & FastAPI)",
  "Applied AI/ML Specialist (NLP & Anomaly Detection)",
  "M.Tech Computer Science Postgraduate Scholar",
  "Distributed Systems & High-Throughput Architect"
];

export default function Hero({ onOpenResume }) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Custom photo state (persisted in localStorage)
  const [portraitSrc, setPortraitSrc] = useState('/bharath-portrait.svg');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('bharath_custom_portrait');
    if (saved) setPortraitSrc(saved);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (base64) {
          setPortraitSrc(base64);
          localStorage.setItem('bharath_custom_portrait', base64);
          setShowPhotoModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (photoUrlInput.trim()) {
      setPortraitSrc(photoUrlInput.trim());
      localStorage.setItem('bharath_custom_portrait', photoUrlInput.trim());
      setShowPhotoModal(false);
      setPhotoUrlInput('');
    }
  };

  const handleResetPhoto = () => {
    localStorage.removeItem('bharath_custom_portrait');
    setPortraitSrc('/bharath-portrait.svg');
    setShowPhotoModal(false);
  };

  // Rotating title typewriter effect
  useEffect(() => {
    const title = ROTATING_TITLES[titleIdx];
    let timer;

    if (!isDeleting && currentText === title) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
      setTypingSpeed(75);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting ? title.substring(0, prev.length - 1) : title.substring(0, prev.length + 1)
        );
        setTypingSpeed(isDeleting ? 30 : 70);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIdx, typingSpeed]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden w-full">
      
      {/* Top Ambient Light Glow */}
      <div className="ambient-glow-top" />

      {/* Edge-to-Edge Fluid Container (Widescreen layout utilizing the whole display) */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Bold Headline & Recruiter Pitch (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 backdrop-blur-md shadow-sm"
            >
              <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                AVAILABLE IMMEDIATELY
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-xs font-mono text-slate-300">Full-Stack / AI/ML Roles</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-sm sm:text-base font-mono tracking-widest uppercase text-sky-400 font-bold">
                BHARATH CHELIMALLA &bull; @bittubunny
              </h2>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
                Architecting <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Intelligent Software</span> &amp; Modern Web Systems.
              </h1>
            </motion.div>

            {/* Dynamic Typewriter Role Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 flex items-center font-mono text-sm sm:text-lg text-slate-200 min-h-[46px] px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md w-full max-w-2xl"
            >
              <span className="text-sky-400 font-bold mr-2.5">&gt;_</span>
              <span className="text-white font-semibold">{currentText}</span>
              <span className="inline-block w-2.5 h-5 bg-sky-400 ml-1.5 animate-pulse"></span>
            </motion.div>

            {/* Concise Executive Summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans"
            >
              Computer Science graduate currently pursuing <strong className="text-sky-400 font-semibold">M.Tech in Computer Science &amp; Engineering</strong>. Specializing in high-throughput full-stack web applications with <strong className="text-slate-100">React and Python FastAPI</strong>, alongside production machine learning pipelines for predictive anomaly detection and NLP.
            </motion.p>

            {/* Live Telemetry Metric Badges Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl font-mono text-xs"
            >
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-sky-400 font-extrabold text-base">5 Repos</div>
                <div className="text-slate-400 text-[11px]">Verified on GitHub</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-emerald-400 font-extrabold text-base">0.962</div>
                <div className="text-slate-400 text-[11px]">Fintech ROC-AUC</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-indigo-400 font-extrabold text-base">&lt;120ms</div>
                <div className="text-slate-400 text-[11px]">POS Optical Decode</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-amber-400 font-extrabold text-base">M.Tech</div>
                <div className="text-slate-400 text-[11px]">Ongoing Scholar</div>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3.5 w-full"
            >
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold font-sans text-xs sm:text-sm shadow-neon-sky transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Explore Verified Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-500/40 hover:border-sky-400 font-mono text-xs sm:text-sm transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Interview Call</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-mono text-xs sm:text-sm transition-all transform hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>ATS Resume</span>
              </button>
            </motion.div>

            {/* Quick Profiles Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-7 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400"
            >
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>github.com/bittubunny</span>
              </a>

              <span>&bull;</span>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4 text-slate-300" />
                <span>LinkedIn Profile</span>
              </a>

              <span>&bull;</span>

              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </span>
            </motion.div>

          </div>

          {/* Right Column: Prominent Portrait Picture & Photo Customizer (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
          >
            {/* Portrait Frame Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 p-2.5 shadow-executive-card group hover:border-sky-400/60 transition-all duration-500">
              
              {/* Inner Photo Wrapper */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-950 flex flex-col justify-between">
                
                {/* Main Photo Image */}
                <img
                  src={portraitSrc}
                  alt="Bharath Chelimalla - Full-Stack & AI/ML Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={() => setPortraitSrc('/bharath-portrait.svg')}
                />

                {/* Top Subtle Overlay Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-sky-400/40 text-sky-300 backdrop-blur-md font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>M.Tech Scholar</span>
                  </span>

                  {/* Photo Customizer Trigger Button */}
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-sky-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-sky-400 backdrop-blur-md transition-all shadow-md"
                    title="Change or Upload Your Photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Profile Plate */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">
                        Bharath Chelimalla
                      </h3>
                      <p className="text-xs font-mono text-sky-400 font-medium">
                        Full-Stack Engineer &bull; AI/ML Specialist
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 font-mono font-bold text-sm shadow-inner">
                      BC
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800">
                    <span>Verified GitHub: @bittubunny</span>
                    <span className="text-emerald-400 font-semibold">Immediate Availability</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Caption Under Portrait */}
            <div className="mt-3 flex items-center justify-between w-full max-w-md text-xs font-mono text-slate-400 px-2">
              <span>Portrait ID: Bharath Chelimalla</span>
              <button
                onClick={() => setShowPhotoModal(true)}
                className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload / Set Photo</span>
              </button>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Photo Customizer Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-base font-bold text-white font-display">Customize Your Portrait</h4>
                <p className="text-xs text-slate-400">Upload your personal photo or paste an image URL</p>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Option 1: File Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-300">
                Option A: Choose Image File from Computer
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                <span>Browse Local Photo (.png, .jpg, .webp)</span>
              </button>
            </div>

            {/* Option 2: Image URL */}
            <form onSubmit={handleUrlSubmit} className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-mono text-slate-300">
                Option B: Paste Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs font-mono hover:bg-sky-400 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>

            {/* Reset Button */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <button
                onClick={handleResetPhoto}
                className="text-slate-400 hover:text-rose-400 transition-colors font-mono"
              >
                Reset to Default
              </button>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
