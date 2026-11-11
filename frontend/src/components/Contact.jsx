import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, CheckCircle2, AlertCircle, Mail, MapPin, Copy, Check, Github, Linkedin, Clock, Loader2, Building, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendContactMessage, scheduleMeeting } from '../utils/api';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('schedule'); // schedule | message
  const [copied, setCopied] = useState(false);

  // Message Form State
  const [msgData, setMsgData] = useState({ name: '', email: '', subject: '', message: '' });
  const [msgStatus, setMsgStatus] = useState('idle'); // idle | submitting | success | error
  const [msgFeedback, setMsgFeedback] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  // Schedule Form State
  const [schedData, setSchedData] = useState({
    name: '',
    email: '',
    company: '',
    role_type: 'Full-Stack Software Engineer',
    preferred_date: '',
    notes: ''
  });
  const [schedStatus, setSchedStatus] = useState('idle');
  const [schedFeedback, setSchedFeedback] = useState('');
  const [bookingId, setBookingId] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msgData.name || !msgData.email || !msgData.message) return;

    setMsgStatus('submitting');
    try {
      const res = await sendContactMessage(msgData);
      if (res && res.success) {
        setMsgStatus('success');
        setMsgFeedback(res.message);
        setInquiryId(res.inquiry_id || 'INQ-' + Date.now());
        try {
          confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
        } catch {}
        setMsgData({ name: '', email: '', subject: '', message: '' });
      } else {
        setMsgStatus('error');
        setMsgFeedback('Transmission error. Please email directly.');
      }
    } catch {
      setMsgStatus('error');
      setMsgFeedback('Network error. Direct email is available below.');
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!schedData.name || !schedData.email) return;

    setSchedStatus('submitting');
    try {
      const res = await scheduleMeeting(schedData);
      if (res && res.success) {
        setSchedStatus('success');
        setSchedFeedback(res.message);
        setBookingId(res.booking_id || 'MEET-' + Date.now());
        try {
          confetti({ particleCount: 85, spread: 90, origin: { y: 0.6 }, colors: ['#38bdf8', '#6366f1', '#10b981'] });
        } catch {}
        setSchedData({ name: '', email: '', company: '', role_type: 'Full-Stack Software Engineer', preferred_date: '', notes: '' });
      } else {
        setSchedStatus('error');
        setSchedFeedback('Booking failed. Please send a direct message or email.');
      }
    } catch {
      setSchedStatus('error');
      setSchedFeedback('Network error while booking. Please email directly.');
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/80">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Header */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <span>// 07. RECRUITER SCHEDULING &amp; DISPATCH HUB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Initiate Contact &amp; <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Schedule an Interview</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose whether to schedule an introductory interview call or send an engineering inquiry directly to Bharath.
          </p>
        </div>

        {/* Widescreen Fluid Grid */}
        <div id="contact-hub" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & Telemetry Info (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 executive-card p-7 sm:p-9 rounded-3xl space-y-6 shadow-xl"
          >
            <div>
              <h3 className="text-xl font-bold text-white font-display mb-2">Direct Communication</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Open to discuss Full-Stack, Backend, or Applied AI/ML engineering roles (Remote, Hybrid, or On-site with relocation).
              </p>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Email Address</div>
                    <div className="text-slate-200 font-semibold">{PORTFOLIO_DATA.personal.socials.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-400 transition-colors"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">GitHub Profile</div>
                    <div className="text-slate-200 font-semibold">github.com/bittubunny</div>
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 text-xs font-bold hover:underline"
                >
                  Inspect &rarr;
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">LinkedIn</div>
                    <div className="text-slate-200 font-semibold">linkedin.com/in/bharath-chelimalla</div>
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 text-xs font-bold hover:underline"
                >
                  Connect &rarr;
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Location &amp; Mobility</div>
                  <div className="text-slate-200 font-semibold">{PORTFOLIO_DATA.personal.location}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-slate-400 font-bold uppercase">Candidate Overview</div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Postgraduate scholar in Computer Science &bull; 5 Public GitHub repositories &bull; Available immediately for Full-Stack, Backend, or Machine Learning roles.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Tabbed Scheduling & Dispatch Center (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 executive-card p-7 sm:p-9 rounded-3xl relative shadow-xl"
          >
            {/* Tab Toggles */}
            <div className="flex items-center space-x-2 pb-6 border-b border-slate-800 mb-6">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'schedule'
                    ? 'bg-sky-500 text-slate-950 shadow-neon-sky'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Interview Call</span>
              </button>

              <button
                onClick={() => setActiveTab('message')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'message'
                    ? 'bg-sky-500 text-slate-950 shadow-neon-sky'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Inquiry</span>
              </button>
            </div>

            {/* TAB 1: SCHEDULE INTERVIEW */}
            {activeTab === 'schedule' && (
              <>
                {schedStatus === 'success' ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-neon-emerald">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">Interview Request Logged!</h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                      {schedFeedback}
                    </p>
                    <div className="inline-block px-4 py-1.5 rounded-xl bg-slate-900 text-sky-400 border border-sky-400/30 text-xs font-mono font-bold">
                      BOOKING REF: {bookingId}
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setSchedStatus('idle')}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors"
                      >
                        Schedule Another Time
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleScheduleSubmit} className="space-y-4">
                    {schedStatus === 'error' && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{schedFeedback}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Your Name <span className="text-sky-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={schedData.name}
                          onChange={(e) => setSchedData({ ...schedData, name: e.target.value })}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Email Address <span className="text-sky-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={schedData.email}
                          onChange={(e) => setSchedData({ ...schedData, email: e.target.value })}
                          placeholder="sarah@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Company / Team
                        </label>
                        <input
                          type="text"
                          value={schedData.company}
                          onChange={(e) => setSchedData({ ...schedData, company: e.target.value })}
                          placeholder="e.g. Stripe, Microsoft, Startup"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Target Role
                        </label>
                        <select
                          value={schedData.role_type}
                          onChange={(e) => setSchedData({ ...schedData, role_type: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 text-xs sm:text-sm focus:outline-none transition-colors"
                        >
                          <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                          <option value="Backend Python / FastAPI Engineer">Backend Python / FastAPI Engineer</option>
                          <option value="AI/ML Engineer">AI/ML Engineer</option>
                          <option value="Frontend React Developer">Frontend React Developer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Preferred Date &amp; Time
                      </label>
                      <input
                        type="text"
                        value={schedData.preferred_date}
                        onChange={(e) => setSchedData({ ...schedData, preferred_date: e.target.value })}
                        placeholder="e.g. Tomorrow at 3:00 PM EST, or Next Monday"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Interview Notes or Focus
                      </label>
                      <textarea
                        rows={3}
                        value={schedData.notes}
                        onChange={(e) => setSchedData({ ...schedData, notes: e.target.value })}
                        placeholder="Topics you'd like to discuss (e.g. system design, algorithms, project deep-dive)..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={schedStatus === 'submitting'}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold font-mono text-xs sm:text-sm shadow-neon-sky flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50"
                    >
                      {schedStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Booking Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Confirm Interview Booking Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}

            {/* TAB 2: DIRECT INQUIRY */}
            {activeTab === 'message' && (
              <>
                {msgStatus === 'success' ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-neon-emerald">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">Message Delivered!</h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                      {msgFeedback}
                    </p>
                    <div className="inline-block px-4 py-1.5 rounded-xl bg-slate-900 text-sky-400 border border-sky-400/30 text-xs font-mono font-bold">
                      INQUIRY REF: {inquiryId}
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setMsgStatus('idle')}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    {msgStatus === 'error' && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{msgFeedback}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Full Name <span className="text-sky-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={msgData.name}
                          onChange={(e) => setMsgData({ ...msgData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Email Address <span className="text-sky-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={msgData.email}
                          onChange={(e) => setMsgData({ ...msgData, email: e.target.value })}
                          placeholder="your-email@domain.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Inquiry Subject
                      </label>
                      <input
                        type="text"
                        value={msgData.subject}
                        onChange={(e) => setMsgData({ ...msgData, subject: e.target.value })}
                        placeholder="Engineering Collaboration / Full-Stack Opening"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Message <span className="text-sky-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={msgData.message}
                        onChange={(e) => setMsgData({ ...msgData, message: e.target.value })}
                        placeholder="Describe your engineering role, project, or inquiry details..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={msgStatus === 'submitting'}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold font-mono text-xs sm:text-sm shadow-neon-sky flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50"
                    >
                      {msgStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to FastAPI Hub</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
