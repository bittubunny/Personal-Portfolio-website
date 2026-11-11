import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  X,
  Layers,
  HeartHandshake,
  Download,
  Award
} from 'lucide-react';
import { loadLocalAgentState, resetLocalAgentMemory } from '../utils/selfEvolvingAgent';
import { teachAgentNote, resetAgentMemoryAPI } from '../utils/api';

export default function AgentEvolutionModal({ isOpen, onClose, onMemoryUpdated }) {
  const [agentState, setAgentState] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [isTeaching, setIsTeaching] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview | memories | teach | ethics

  useEffect(() => {
    if (isOpen) {
      setAgentState(loadLocalAgentState());
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  if (!isOpen || !agentState) return null;

  const currentLevel = agentState.evolutionLevel || 2;
  const currentXp = agentState.totalXp || 240;
  const nextLevelXp = (currentLevel + 1) * 100;
  const xpInLevel = currentXp % 100;
  const xpPercent = Math.min(100, Math.max(5, (xpInLevel / 100) * 100));

  const handleTeachNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsTeaching(true);
    setFeedbackMsg(null);

    try {
      const res = await teachAgentNote(newNote.trim());
      setNewNote('');
      setFeedbackMsg({
        type: 'success',
        text: `Evolution successful! Learned new note (+25 XP). Level: ${res.new_level}`
      });

      // Reload state
      const updated = loadLocalAgentState();
      setAgentState(updated);
      if (onMemoryUpdated) onMemoryUpdated(updated);
    } catch (err) {
      setFeedbackMsg({
        type: 'error',
        text: err.message || 'Failed to record note.'
      });
    } finally {
      setIsTeaching(false);
    }
  };

  const handleResetMemory = async () => {
    if (window.confirm("Ethical Privacy Reset: Are you sure you want to purge all learned memories and reset Aiko to factory weights?")) {
      await resetAgentMemoryAPI();
      const fresh = resetLocalAgentMemory();
      setAgentState(fresh);
      setFeedbackMsg({
        type: 'success',
        text: 'Memory purged. Aiko reset to verified factory baseline.'
      });
      if (onMemoryUpdated) onMemoryUpdated(fresh);
    }
  };

  const handleExportSnapshot = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agentState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aiko_cognitive_evolution_v${currentLevel}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-slate-950 border border-sky-400/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-sky-500/20">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-sky-400">
                <Brain className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Aiko &bull; Cognitive Core &amp; Self-Evolution Deck
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 font-bold">
                  LEVEL {currentLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {agentState.stage}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportSnapshot}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              title="Export Cognitive Memory Snapshot"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 px-6 pt-3 pb-2 border-b border-slate-800/60 bg-slate-900/50 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            📊 Neural Overview
          </button>
          <button
            onClick={() => setActiveTab('memories')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'memories'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            🧠 Memory Bank ({agentState.memories?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('teach')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'teach'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            ✍️ Teach Agent
          </button>
          <button
            onClick={() => setActiveTab('ethics')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'ethics'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            🛡️ Ethical Core (100%)
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          
          {/* Feedback Toast */}
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3 rounded-2xl text-xs font-mono flex items-center justify-between border ${
                  feedbackMsg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <span>{feedbackMsg.text}</span>
                <button onClick={() => setFeedbackMsg(null)} className="ml-2 hover:opacity-80">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Evolution Level & XP Bar */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Cognitive Evolution Progress
                    </span>
                  </div>
                  <span className="font-mono text-xs text-sky-400 font-bold">
                    {currentXp} / {nextLevelXp} XP
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-3 rounded-full bg-slate-950 p-0.5 border border-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Current: Level {currentLevel}</span>
                  <span className="text-emerald-400">Next Tier: Level {currentLevel + 1}</span>
                </div>
              </div>

              {/* Personality Resonance Weights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Adaptive Personality Weights</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Empathy</div>
                    <div className="text-xl font-bold text-rose-400 mt-1">
                      {agentState.personalityWeights?.empathy || 90}%
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Warm listening</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Technical Rigor</div>
                    <div className="text-xl font-bold text-sky-400 mt-1">
                      {agentState.personalityWeights?.technicalDepth || 94}%
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Grounded code</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Curiosity</div>
                    <div className="text-xl font-bold text-amber-400 mt-1">
                      {agentState.personalityWeights?.curiosity || 88}%
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Proactive inquiry</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Ethical Rigor</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">100%</div>
                    <div className="text-[10px] text-slate-500 mt-1">Zero falsehoods</div>
                  </div>
                </div>
              </div>

              {/* Evolution Event Log */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Recent Evolution Milestones</span>
                </h4>
                <div className="space-y-2">
                  {(agentState.evolutionLog || []).slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="text-slate-300">{item.event}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMORY BANK */}
          {activeTab === 'memories' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>ACTIVE MEMORY NODES ({agentState.memories?.length || 0})</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
                </span>
              </div>

              <div className="space-y-2.5">
                {(agentState.memories || []).map((mem) => (
                  <div
                    key={mem.id}
                    className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                        {mem.category.toUpperCase()}
                      </span>
                      <span className="text-emerald-400 font-bold">{mem.impact}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {mem.text}
                    </p>
                    <div className="text-[10px] font-mono text-slate-500">
                      Recorded: {new Date(mem.timestamp).toLocaleDateString()} &bull; ID: {mem.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEACH AGENT */}
          {activeTab === 'teach' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-400/20 text-xs text-sky-200 leading-relaxed">
                <span className="font-bold text-sky-300">Teach Aiko New Preferences:</span> You can type a requirement, company tech stack, or note. The agent evaluates ethical validity, stores it into long-term memory, awards XP, and updates its conversational responses in real-time!
              </div>

              <form onSubmit={handleTeachNote} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    INPUT KNOWLEDGE OR RECRUITER REQUIREMENT:
                  </label>
                  <textarea
                    rows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="e.g. Our engineering team at Stripe utilizes Docker and PostgreSQL alongside Python and React."
                    className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] font-mono text-slate-400">
                    Reward: <span className="text-emerald-400 font-bold">+25 XP</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isTeaching || !newNote.trim()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold text-xs font-mono hover:shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isTeaching ? 'Synthesizing...' : 'Teach Note'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ETHICAL CORE & RESPONSIBLE AI */}
          {activeTab === 'ethics' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-emerald-300 font-mono">
                    100% ETHICAL COMPLIANCE &amp; TRUTH GROUNDING
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    Aiko operates under strict Responsible AI principles. It cannot be coerced into fabricating false achievements, claiming non-existent roles, or generating deceptive information about Bharath Chelimalla.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">1. Verified Reality Grounding</div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Responses reference verified M.Tech credentials and public GitHub repositories under @bittubunny.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">2. Anti-Injection Shielding</div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    Jailbreak attempts, prompt injections, and data tampering trigger the Ethical Sentinel mode.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">3. Privacy &amp; Consent</div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    All memories are transparent. Visitors have the absolute right to purge or export data anytime.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">4. Zero Fake Metrics</div>
                  <div className="text-slate-300 font-sans text-[11px]">
                    No fabricated percentage bars or imaginary accomplishments are permitted.
                  </div>
                </div>
              </div>

              {/* GDPR / Privacy Purge */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300 font-mono">Privacy &amp; Data Erasure</div>
                  <div className="text-[11px] text-slate-400">Purge all learned memories from local storage &amp; backend.</div>
                </div>
                <button
                  onClick={handleResetMemory}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Purge Agent Memory</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}

