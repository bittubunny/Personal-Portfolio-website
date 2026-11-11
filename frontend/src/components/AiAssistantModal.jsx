import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, ArrowRight, Flame } from 'lucide-react';
import { queryAiAssistant, AI_SUGGESTED_PROMPTS } from '../utils/aiAssistant';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function AiAssistantModal({
  isOpen,
  onClose,
  onOpenProject
}) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `ようこそ！ I am Bharath Chelimalla's Guild Familiar AI, grounded strictly in his verified engineering background.\n\nAsk me anything about his **skills (Python, Java, React, SQL)**, **education (M.Tech CSE)**, **5 verified projects**, or **immediate availability**!`,
      action: null
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = { sender: 'user', text: query, action: null };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate fast natural AI response
    setTimeout(() => {
      const result = queryAiAssistant(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: result.text,
          action: result.action || null
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.href) {
      onClose();
      const el = document.querySelector(action.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action.projectId && onOpenProject) {
      const match = PORTFOLIO_DATA.projects.find((p) => p.id === action.projectId);
      if (match) {
        onClose();
        onOpenProject(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-anime-900 border border-orange-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col h-[600px] max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-anime-850 px-5 py-3.5 border-b border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 p-[1.5px] shadow-warm-glow">
              <div className="w-full h-full rounded-2xl bg-anime-900 flex items-center justify-center text-orange-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2 font-heading">
                <span>Guild AI Familiar</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Grounded &bull; Recruiter Ready
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Trained on verified GitHub projects, skills &amp; M.Tech scholarship
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-anime-800 text-slate-400 hover:text-white hover:bg-orange-500/20 transition-colors border border-orange-500/10"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Scrollable Feed */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-sm leading-relaxed">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-anime-950 font-extrabold'
                    : 'bg-anime-800 border border-orange-500/30 text-orange-400'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-anime-950 font-semibold'
                    : 'bg-black/40 border border-orange-500/20 text-slate-200 shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap text-xs sm:text-sm font-sans leading-relaxed">
                  {m.text}
                </div>

                {m.action && (
                  <div className="mt-3 pt-2.5 border-t border-orange-500/20">
                    <button
                      onClick={() => handleActionClick(m.action)}
                      className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-orange-400 hover:text-amber-300 bg-anime-800 px-3 py-1.5 rounded-xl border border-orange-500/30 hover:border-orange-400 transition-colors"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-anime-800 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-black/40 border border-orange-500/20 rounded-2xl px-4 py-2.5 text-xs text-slate-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse delay-75"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse delay-150"></span>
                <span className="ml-1 text-[11px] font-mono text-amber-200">Consulting alchemical records...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-4 py-2 bg-anime-850/80 border-t border-orange-500/15 overflow-x-auto flex gap-1.5 no-scrollbar">
          {AI_SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-3 py-1 rounded-xl bg-anime-800 hover:bg-anime-750 text-slate-300 hover:text-orange-300 border border-orange-500/20 hover:border-orange-500/40 text-[11px] font-mono transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-anime-850 border-t border-orange-500/20 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask about Bharath's skills, repos, M.Tech, availability..."
            className="flex-1 bg-black/40 border border-orange-500/20 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400 font-mono"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-anime-950 font-bold transition-all disabled:opacity-40 shadow-warm-glow"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
