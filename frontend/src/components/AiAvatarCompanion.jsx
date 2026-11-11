import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Navigation,
  X,
  Sparkles,
  ChevronRight,
  Radio,
  Eye,
  Crosshair,
  Maximize2,
  Minimize2,
  Move,
  Flame,
  Brain,
  ShieldCheck,
  Send,
  Zap,
  Layers,
  ArrowRight,
  Bot,
  User,
  Heart,
  Scale,
  Users,
  MessageSquare,
  Play,
  Square,
  Palette,
  Terminal,
  Activity,
  Plus,
  RefreshCw,
  Award,
  Settings,
  CheckCircle,
  HelpCircle,
  Target,
  Gauge,
  Cpu,
  Github,
  Star,
  ExternalLink
} from 'lucide-react';
import { querySelfEvolvingAgent, teachAgentNote, syncGitHubReposAPI, fetchGitHubReposAPI } from '../utils/api';
import {
  loadLocalAgentState,
  saveLocalAgentState,
  recordEvolutionStep,
  generateClientDynamicDebate,
  CLIENT_QUIZ_BANK,
  evaluateClientJobFit,
  ALL_GITHUB_REPOSITORIES
} from '../utils/selfEvolvingAgent';

/**
 * ============================================================================
 * Multi-Avatar Living Autonomous Spatial Agent Ecosystem ("Aiko & Kuro")
 * ============================================================================
 * - Multi-Avatar Spawning: Can dynamically spawn and control 2 autonomous floating avatars on screen!
 * - Autonomous Avatar-to-Avatar Dialogue: Aiko & Kuro talk to each other aloud, debate architecture & ML!
 * - Live On-Screen Holographic Memory Stack HUD: Visualizes cognitive pipeline, active memory nodes & thoughts in real-time.
 * - Dynamic Persona & Visual Overdrive Mutation: Switch between Default, Matrix Code, Cyberpunk, and Golden skins.
 * - Continuous hands-free voice loop with Acoustic Echo Cancellation (never listens to its own voice).
 * - Full Task Execution: Live project filtering, resume launch, guided site tour, mock interview simulation.
 * ============================================================================
 */

export default function AiAvatarCompanion({
  currentSection = 'hero',
  onNavigateToSection,
  onFilterProjects,
  onOpenEvolutionDeck
}) {
  // ---------------------------------------------------------------------------
  // 1. Primary Avatar (Aiko) State
  // ---------------------------------------------------------------------------
  const [pos, setPos] = useState({ x: 0, y: 120 });
  const [isInitializedPos, setIsInitializedPos] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [emotionState, setEmotionState] = useState('curious');
  const [avatarFlightState, setAvatarFlightState] = useState('idle');
  const [speechText, setSpeechText] = useState("Hi! I'm Aiko, your spatial AI companion. I'm actively monitoring your screen. You can command me, teach me notes, or ask me to spawn another avatar!");
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [bubbleTimeoutId, setBubbleTimeoutId] = useState(null);

  // ---------------------------------------------------------------------------
  // 2. Secondary Sub-Agent (Kuro - Systems & Algorithmic Architect) State
  // ---------------------------------------------------------------------------
  const [hasSecondAvatar, setHasSecondAvatar] = useState(false);
  const [kuroPos, setKuroPos] = useState({ x: 80, y: 160 });
  const [kuroFlightState, setKuroFlightState] = useState('idle');
  const [kuroSpeechText, setKuroSpeechText] = useState("Kuro online. Ready for algorithmic deep-dives.");
  const [showKuroBubble, setShowKuroBubble] = useState(false);
  const [kuroBubbleTimeoutId, setKuroBubbleTimeoutId] = useState(null);

  // ---------------------------------------------------------------------------
  // 2B. Third Sub-Agent (Nova - AI & ML Research Specialist) State
  // ---------------------------------------------------------------------------
  const [hasThirdAvatar, setHasThirdAvatar] = useState(false);
  const [novaPos, setNovaPos] = useState({ x: 80, y: 380 });
  const [novaFlightState, setNovaFlightState] = useState('idle');
  const [novaSpeechText, setNovaSpeechText] = useState("Nova online. Applied neural networks & statistical rigor standing by.");
  const [showNovaBubble, setShowNovaBubble] = useState(false);
  const [novaBubbleTimeoutId, setNovaBubbleTimeoutId] = useState(null);

  // ---------------------------------------------------------------------------
  // 2C. Fourth Sub-Agent (Titan - DevOps & Cloud Infrastructure Sentinel) State
  // ---------------------------------------------------------------------------
  const [hasFourthAvatar, setHasFourthAvatar] = useState(false);
  const [titanPos, setTitanPos] = useState({ x: 800, y: 380 });
  const [titanFlightState, setTitanFlightState] = useState('idle');
  const [titanSpeechText, setTitanSpeechText] = useState("Titan online. Microservice reliability & sub-120ms latency secured.");
  const [showTitanBubble, setShowTitanBubble] = useState(false);
  const [titanBubbleTimeoutId, setTitanBubbleTimeoutId] = useState(null);

  // ---------------------------------------------------------------------------
  // 3. Autonomous Avatar-to-Avatar Dialogue / Debate State
  // ---------------------------------------------------------------------------
  const [isDebating, setIsDebating] = useState(false);
  const debateTimeoutRef = useRef(null);

  // ---------------------------------------------------------------------------
  // 4. Visual Skin & Mutation State
  // ---------------------------------------------------------------------------
  const [avatarSkin, setAvatarSkin] = useState('cyberpunk'); // cyberpunk | matrix | golden | default

  // ---------------------------------------------------------------------------
  // 5. Live On-Screen Memory Stack HUD State
  // ---------------------------------------------------------------------------
  const [showMemoryStackHud, setShowMemoryStackHud] = useState(false);
  const [agentState, setAgentState] = useState(() => loadLocalAgentState());
  const [liveThoughtLogs, setLiveThoughtLogs] = useState([
    { id: 1, type: 'INIT', text: 'Cognitive neural core grounded in verified M.Tech & 5 GitHub repos.', time: 'INIT' },
    { id: 2, type: 'SYS', text: 'Spatial viewport physics & multi-agent dispatcher standing by.', time: 'READY' }
  ]);
  const [hudNewNote, setHudNewNote] = useState('');

  // ---------------------------------------------------------------------------
  // 5B. High-Intelligence Multi-Domain Task States (Recruiter Fit / Quiz / Diagnostics / Brain Settings)
  // ---------------------------------------------------------------------------
  const [activeJobFit, setActiveJobFit] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [activeDiagnostic, setActiveDiagnostic] = useState(null);
  const [showBrainSettings, setShowBrainSettings] = useState(false);
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState(() => {
    return typeof window !== 'undefined' ? (localStorage.getItem('bharath_agent_gemini_key') || '') : '';
  });
  const [activeBrainEngine, setActiveBrainEngine] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('bharath_agent_gemini_key')) ? 'gemini' : 'local';
  });
  const [activeGithubSync, setActiveGithubSync] = useState(null);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [githubSearchTerm, setGithubSearchTerm] = useState('');

  // ---------------------------------------------------------------------------
  // 6. Voice & Audio State (Acoustic Echo Cancellation)
  // ---------------------------------------------------------------------------
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isContinuousListening, setIsContinuousListening] = useState(true);
  const [currentHearing, setCurrentHearing] = useState('');
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isListeningActiveRef = useRef(false);
  const restartTimerRef = useRef(null);
  const speechSynthRef = useRef(null);
  const idleTimerRef = useRef(null);
  const droneRef = useRef(null);
  const kuroDroneRef = useRef(null);
  const novaDroneRef = useRef(null);
  const titanDroneRef = useRef(null);
  const chatScrollRef = useRef(null);

  // ---------------------------------------------------------------------------
  // 7. Spatial Targets, Laser Beam & Chat History
  // ---------------------------------------------------------------------------
  const [activeTarget, setActiveTarget] = useState(null);
  const [laserCoordinates, setLaserCoordinates] = useState(null);
  const [interAvatarBeam, setInterAvatarBeam] = useState(null);
  const [hasGreetedSection, setHasGreetedSection] = useState(new Set());
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'aiko',
      text: "Hello! I am **Aiko**, Bharath Chelimalla's self-evolving spatial AI companion. I can execute real tasks: try saying **'create 4 ai avatars on screen'**, **'show memory stack'**, **'filter to AI'**, or **'make all avatars talk to each other'**!",
      emotion: 'curious',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Initial Placement for 4-Avatar Quad Mesh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const screenW = window.innerWidth;
      const initialRightX = Math.max(30, screenW - 220);
      setPos({ x: initialRightX, y: 120 });
      setKuroPos({ x: 80, y: 160 });
      setNovaPos({ x: 80, y: 380 });
      setTitanPos({ x: initialRightX, y: 380 });
      setIsInitializedPos(true);
    }
  }, []);

  // Sync chat scroll
  useEffect(() => {
    if (isConsoleExpanded && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isConsoleExpanded]);

  // Log a live cognitive thought to the visual memory HUD
  const logThought = useCallback((type, text) => {
    setLiveThoughtLogs(prev => [
      { id: Date.now(), type, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) },
      ...prev.slice(0, 15)
    ]);
  }, []);

  // ---------------------------------------------------------------------------
  // Human Speech Synthesis with Quad-Avatar Voice Profiles (Aiko, Kuro, Nova, Titan)
  // ---------------------------------------------------------------------------
  const speakText = useCallback((text, emotion = 'curious', speaker = 'aiko') => {
    if (speaker === 'aiko') {
      setSpeechText(text);
      setShowSpeechBubble(true);
      if (bubbleTimeoutId) clearTimeout(bubbleTimeoutId);
      const tid = setTimeout(() => {
        if (!isConsoleExpanded) setShowSpeechBubble(false);
      }, 9000);
      setBubbleTimeoutId(tid);
    } else if (speaker === 'kuro') {
      setKuroSpeechText(text);
      setShowKuroBubble(true);
      if (kuroBubbleTimeoutId) clearTimeout(kuroBubbleTimeoutId);
      const tid = setTimeout(() => setShowKuroBubble(false), 9000);
      setKuroBubbleTimeoutId(tid);
    } else if (speaker === 'nova') {
      setNovaSpeechText(text);
      setShowNovaBubble(true);
      if (novaBubbleTimeoutId) clearTimeout(novaBubbleTimeoutId);
      const tid = setTimeout(() => setShowNovaBubble(false), 9000);
      setNovaBubbleTimeoutId(tid);
    } else if (speaker === 'titan') {
      setTitanSpeechText(text);
      setShowTitanBubble(true);
      if (titanBubbleTimeoutId) clearTimeout(titanBubbleTimeoutId);
      const tid = setTimeout(() => setShowTitanBubble(false), 9000);
      setTitanBubbleTimeoutId(tid);
    }

    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      if (speaker === 'aiko') {
        utterance.pitch = emotion === 'excited' ? 1.22 : (emotion === 'empathetic' ? 1.08 : 1.14);
        utterance.rate = 1.04;
        const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Jenny'))) || voices.find(v => v.lang.startsWith('en'));
        if (preferred) utterance.voice = preferred;
      } else if (speaker === 'kuro') {
        // Kuro has an authoritative, deep technical voice
        utterance.pitch = 0.88;
        utterance.rate = 0.98;
        const maleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('David') || v.name.includes('Guy') || v.name.includes('Mark') || v.name.includes('George') || v.name.includes('Male'))) || voices.find(v => v.lang.startsWith('en'));
        if (maleVoice) utterance.voice = maleVoice;
      } else if (speaker === 'nova') {
        // Nova: High-speed analytical ML research voice with higher pitch
        utterance.pitch = 1.28;
        utterance.rate = 1.06;
        const novaVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Zira') || v.name.includes('Victoria') || v.name.includes('Female') || v.name.includes('Karen') || v.name.includes('Google UK English Female'))) || voices.find(v => v.lang.startsWith('en'));
        if (novaVoice) utterance.voice = novaVoice;
      } else if (speaker === 'titan') {
        // Titan: Heavy-duty resonant baritone infrastructure voice
        utterance.pitch = 0.74;
        utterance.rate = 1.00;
        const bassVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Mark') || v.name.includes('David') || v.name.includes('Google US English') || v.name.includes('Male'))) || voices.find(v => v.lang.startsWith('en'));
        if (bassVoice) utterance.voice = bassVoice;
      }

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setAvatarFlightState(speaker === 'aiko' ? 'speaking' : 'idle');
        setKuroFlightState(speaker === 'kuro' ? 'speaking' : 'idle');
        setNovaFlightState(speaker === 'nova' ? 'speaking' : 'idle');
        setTitanFlightState(speaker === 'titan' ? 'speaking' : 'idle');
      };

      utterance.onend = () => {
        setAvatarFlightState('idle');
        setKuroFlightState('idle');
        setNovaFlightState('idle');
        setTitanFlightState('idle');
        // Acoustic echo cooldown period so microphone does not hear room echo
        setTimeout(() => {
          isSpeakingRef.current = false;
        }, 700);
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        setAvatarFlightState('idle');
        setKuroFlightState('idle');
        setNovaFlightState('idle');
        setTitanFlightState('idle');
      };

      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis notice:", e);
      setAvatarFlightState('idle');
      setKuroFlightState('idle');
      setNovaFlightState('idle');
      setTitanFlightState('idle');
    }
  }, [bubbleTimeoutId, isConsoleExpanded, isVoiceEnabled, kuroBubbleTimeoutId, novaBubbleTimeoutId, titanBubbleTimeoutId]);

  // ---------------------------------------------------------------------------
  // Laser Targeting Beam Computation
  // ---------------------------------------------------------------------------
  const updateLaserBeam = useCallback((targetEl) => {
    if (!targetEl || !droneRef.current) {
      setLaserCoordinates(null);
      return;
    }
    const droneRect = droneRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setLaserCoordinates({
      startX: droneRect.left + droneRect.width / 2,
      startY: droneRect.top + droneRect.height / 2,
      endX: targetRect.left + Math.min(300, targetRect.width / 2),
      endY: targetRect.top + 60
    });
  }, []);

  // Update Inter-Avatar Communication Laser (Connects Active Speaker to Quad Mesh)
  const triggerInterAvatarBeam = useCallback((speaker = 'aiko') => {
    const refs = {
      aiko: droneRef.current,
      kuro: kuroDroneRef.current,
      nova: novaDroneRef.current,
      titan: titanDroneRef.current
    };

    const targets = {
      aiko: refs.kuro || refs.nova || refs.titan,
      kuro: refs.nova || refs.titan || refs.aiko,
      nova: refs.titan || refs.aiko || refs.kuro,
      titan: refs.aiko || refs.kuro || refs.nova
    };

    const srcEl = refs[speaker] || droneRef.current;
    const tgtEl = targets[speaker];
    if (!srcEl || !tgtEl) return;

    const srcRect = srcEl.getBoundingClientRect();
    const tgtRect = tgtEl.getBoundingClientRect();

    setInterAvatarBeam({
      startX: srcRect.left + srcRect.width / 2,
      startY: srcRect.top + srcRect.height / 2,
      endX: tgtRect.left + tgtRect.width / 2,
      endY: tgtRect.top + tgtRect.height / 2,
      speaker
    });
    setTimeout(() => setInterAvatarBeam(null), 3800);
  }, []);

  // ---------------------------------------------------------------------------
  // Spatial Flight to Section
  // ---------------------------------------------------------------------------
  const flyToSection = useCallback((sectionId, spokenAnnouncement = null, targetEmotion = 'excited') => {
    setAvatarFlightState('flying');
    setEmotionState(targetEmotion);
    logThought('FLIGHT', `Navigating spatial trajectory to #${sectionId}`);

    const el = document.getElementById(sectionId);
    const announcement = spokenAnnouncement || `Flying right over to ${sectionId}!`;
    speakText(announcement, targetEmotion, 'aiko');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveTarget(sectionId);

      setTimeout(() => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        let targetX = screenW > 1200 ? screenW - 220 : Math.max(30, screenW - 140);
        let targetY = Math.max(90, Math.min(screenH - 180, 140));

        setPos({ x: targetX, y: targetY });
        updateLaserBeam(el);

        setAvatarFlightState('happy');
        setTimeout(() => setAvatarFlightState('idle'), 1800);

        setTimeout(() => {
          setActiveTarget(null);
          setLaserCoordinates(null);
        }, 4000);
      }, 500);
    } else {
      setTimeout(() => setAvatarFlightState('idle'), 1000);
    }
  }, [logThought, speakText, updateLaserBeam]);

  // ---------------------------------------------------------------------------
  // Guided Site Tour Sequence
  // ---------------------------------------------------------------------------
  const runGuidedTour = useCallback(() => {
    logThought('TOUR', 'Executing full audio-visual site tour');
    const tourStops = [
      { id: 'hero', speech: "Welcome to Bharath Chelimalla's executive portfolio! He is an M.Tech CSE graduate and Full-Stack AI Engineer." },
      { id: 'about', speech: "Here is Bharath's engineering philosophy. He designs high-performance microservices and applied ML systems." },
      { id: 'skills', speech: "This is Bharath's technical matrix. Python, React, FastAPI, SQL, and Scikit-Learn without inflated percentages." },
      { id: 'projects', speech: "These are Bharath's 5 verified GitHub production repositories, including Weftin POS and Banking Fraud Detection." },
      { id: 'architecture', speech: "Here is the interactive architecture canvas displaying POS pipelines and ML anomaly detection flows." },
      { id: 'contact', speech: "Ready to discuss a role? You can schedule a direct technical interview or send an inquiry right here!" }
    ];

    let stopIdx = 0;
    const nextStop = () => {
      if (stopIdx >= tourStops.length) return;
      const stop = tourStops[stopIdx];
      flyToSection(stop.id, stop.speech, 'excited');
      stopIdx++;
      if (stopIdx < tourStops.length) {
        setTimeout(nextStop, 8500);
      }
    };
    nextStop();
  }, [flyToSection, logThought]);

  // ---------------------------------------------------------------------------
  // Autonomous 4-Avatar Quad Dialogue & Debate Engine
  // ---------------------------------------------------------------------------
  const runAvatarDialogue = useCallback((topic = 'portfolio_overview', customTurns = null) => {
    if (!hasSecondAvatar || !hasThirdAvatar || !hasFourthAvatar) {
      setHasSecondAvatar(true);
      setHasThirdAvatar(true);
      setHasFourthAvatar(true);
      logThought('SPAWN', 'Summoned full 4-avatar quad council (Aiko, Kuro, Nova, Titan) for debate');
    }

    setIsDebating(true);
    triggerInterAvatarBeam('aiko');
    logThought('DEBATE', `Starting autonomous 4-avatar debate loop on ${topic}`);

    const debateScript = (customTurns && customTurns.length)
      ? customTurns
      : generateClientDynamicDebate(topic);

    let turn = 0;
    const executeTurn = () => {
      if (turn >= debateScript.length) {
        setIsDebating(false);
        setAvatarFlightState('idle');
        setKuroFlightState('idle');
        setNovaFlightState('idle');
        setTitanFlightState('idle');
        logThought('DEBATE', 'Autonomous 4-avatar dialogue completed successfully');
        return;
      }

      const line = debateScript[turn];
      const speaker = line.speaker || 'aiko';
      triggerInterAvatarBeam(speaker);

      setAvatarFlightState(speaker === 'aiko' ? 'speaking' : 'idle');
      setKuroFlightState(speaker === 'kuro' ? 'speaking' : 'idle');
      setNovaFlightState(speaker === 'nova' ? 'speaking' : 'idle');
      setTitanFlightState(speaker === 'titan' ? 'speaking' : 'idle');

      if (speaker === 'aiko') setEmotionState(line.emotion || 'curious');
      speakText(line.text, line.emotion, speaker);

      turn++;
      debateTimeoutRef.current = setTimeout(executeTurn, 7800);
    };

    executeTurn();
  }, [hasFourthAvatar, hasSecondAvatar, hasThirdAvatar, logThought, speakText, triggerInterAvatarBeam]);

  const stopAvatarDialogue = useCallback(() => {
    setIsDebating(false);
    if (debateTimeoutRef.current) clearTimeout(debateTimeoutRef.current);
    window.speechSynthesis?.cancel();
    setAvatarFlightState('idle');
    setKuroFlightState('idle');
    setNovaFlightState('idle');
    setTitanFlightState('idle');
    logThought('HALT', 'Avatar dialogue stopped by user command');
    speakText("Dialogue paused. All avatars on spatial standby.", 'curious', 'aiko');
  }, [logThought, speakText]);

  // ---------------------------------------------------------------------------
  // Cognitive Command Processor & Real Task Executor
  // ---------------------------------------------------------------------------
  const processQuery = useCallback(async (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const clean = queryText.trim();
    const lower = clean.toLowerCase();

    // Prevent echoing Aiko's own self-introduction
    if (
      lower.includes("i am aiko") ||
      lower.includes("bharath's self-evolving") ||
      lower.includes("tell me what you'd like to explore")
    ) {
      return;
    }

    logThought('COMMAND', `User: "${clean}"`);

    // Append to Chat history
    const userMsg = {
      sender: 'user',
      text: clean,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const response = await querySelfEvolvingAgent({
        message: clean,
        current_section: currentSection
      });

      setEmotionState(response.emotion || 'curious');
      if (response.evolution) {
        setAgentState(prev => ({
          ...prev,
          totalXp: response.evolution.xp,
          evolutionLevel: response.evolution.level,
          stage: response.evolution.stage
        }));
      }

      const aiMsg = {
        sender: 'aiko',
        text: response.reply,
        emotion: response.emotion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiMsg]);

      // Speak aloud
      speakText(response.spoken_reply || response.reply, response.emotion, 'aiko');

      // -----------------------------------------------------------------------
      // REAL DYNAMIC TASK EXECUTION ENGINE
      // -----------------------------------------------------------------------
      const action = response.target_action;
      const payload = response.action_payload || {};

      logThought('EXEC', `Action: ${action || 'CONVERSATION'} (${response.emotion})`);

      if (action === 'spawn_avatar' || action === 'spawn_all_avatars') {
        const count = payload.count || 4;
        if (count >= 4) {
          setHasSecondAvatar(true);
          setHasThirdAvatar(true);
          setHasFourthAvatar(true);
          triggerInterAvatarBeam('aiko');
          logThought('AGENT', 'Manifested 4 AI avatars (Aiko, Kuro, Nova, Titan) on screen');
        } else {
          setHasSecondAvatar(true);
          triggerInterAvatarBeam('aiko');
          logThought('AGENT', 'Manifested secondary avatar Kuro on screen');
        }
      } else if (action === 'despawn_avatar') {
        setHasSecondAvatar(false);
        setHasThirdAvatar(false);
        setHasFourthAvatar(false);
        setIsDebating(false);
        logThought('AGENT', 'Merged secondary avatars back into primary cognitive core');
      } else if (action === 'start_dialogue') {
        runAvatarDialogue(payload.topic || 'portfolio_overview', payload.turns || null);
      } else if (action === 'stop_dialogue') {
        stopAvatarDialogue();
      } else if (action === 'show_memory_stack') {
        setShowMemoryStackHud(true);
      } else if (action === 'hide_memory_stack') {
        setShowMemoryStackHud(false);
      } else if (action === 'analyze_job_fit') {
        setActiveJobFit(payload);
        if (onNavigateToSection) onNavigateToSection('contact');
        flyToSection('contact', response.spoken_reply, 'proud');
        logThought('JOB_FIT', `Evaluated candidate match: ${payload.score}% for ${payload.role}`);
      } else if (action === 'start_technical_quiz') {
        setActiveQuiz(payload);
        setSelectedQuizOption(null);
        setQuizFeedback(null);
        logThought('QUIZ', `Triggered technical architecture challenge: ${payload.topic}`);
      } else if (action === 'focus_element') {
        const el = document.getElementById(payload.element_id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          updateLaserBeam(el);
          setActiveTarget(payload.element_id);
          logThought('FOCUS', `Laser targeting element #${payload.element_id}`);
          setTimeout(() => {
            setActiveTarget(null);
            setLaserCoordinates(null);
          }, 6000);
        } else if (payload.section) {
          flyToSection(payload.section, response.spoken_reply, 'excited');
        }
      } else if (action === 'probe_system_metrics') {
        setActiveDiagnostic(payload);
        logThought('PROBE', 'Gathered real-time system & cognitive diagnostics');
      } else if (action === 'show_github_repos' || action === 'sync_github') {
        setActiveGithubSync(payload);
        logThought('GITHUB', `Scanned @bittubunny GitHub profile (${payload.repositories?.length || 16} repos)`);
      } else if (action === 'mutate_theme') {
        setAvatarSkin(payload.skin || 'matrix');
        logThought('MUTATION', `Shifting neural shaders to ${payload.skin || 'matrix'}`);
      } else if (action === 'celebrate') {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        logThought('CELEBRATE', 'Confetti particle fireworks deployed');
      } else if (action === 'start_tour') {
        runGuidedTour();
      } else if (action === 'simulate_interview') {
        runAvatarDialogue('interview_simulation');
      } else if (action === 'filter_projects' && payload.category) {
        if (onFilterProjects) onFilterProjects(payload.category);
        flyToSection('projects', response.spoken_reply, 'excited');
      } else if (action === 'open_resume') {
        if (onNavigateToSection) onNavigateToSection('resume');
      } else if (action === 'learn_note') {
        const fresh = loadLocalAgentState();
        setAgentState(fresh);
        setShowMemoryStackHud(true);
        logThought('LEARN', `Pushed memory node into cognitive stack: "${payload.text}"`);
      } else if (action === 'fly_to_section' || response.target_section) {
        const sec = payload.section || response.target_section;
        flyToSection(sec, response.spoken_reply, response.emotion);
      }
    } catch (err) {
      console.warn("Agent query fallback:", err);
      speakText("I'm right here with you! Tell me what you'd like to explore, or command me to perform a task.", 'empathetic', 'aiko');
    } finally {
      setIsProcessing(false);
    }
  }, [currentSection, flyToSection, logThought, onFilterProjects, onNavigateToSection, runAvatarDialogue, runGuidedTour, speakText, stopAvatarDialogue, triggerInterAvatarBeam]);

  // ---------------------------------------------------------------------------
  // Live GitHub Repository Real-Time Synchronizer
  // ---------------------------------------------------------------------------
  const handleLiveGitHubRefresh = useCallback(async () => {
    setIsSyncingGithub(true);
    try {
      const res = await syncGitHubReposAPI();
      if (res && res.data) {
        setActiveGithubSync(res.data);
        const fresh = recordEvolutionStep(agentState, 40, `Synced ${res.synced_count} repos from GitHub @bittubunny`);
        setAgentState(fresh);
        speakText(`Synced ${res.synced_count} repositories live from GitHub!`, 'excited', 'aiko');
        logThought('GITHUB_SYNC', `Synced ${res.synced_count} repos live from GitHub API`);
      } else {
        setActiveGithubSync({
          username: 'bittubunny',
          public_repos_count: ALL_GITHUB_REPOSITORIES.length,
          repositories: ALL_GITHUB_REPOSITORIES
        });
      }
    } catch (err) {
      console.warn("GitHub sync fallback:", err);
      setActiveGithubSync({
        username: 'bittubunny',
        public_repos_count: ALL_GITHUB_REPOSITORIES.length,
        repositories: ALL_GITHUB_REPOSITORIES
      });
    } finally {
      setIsSyncingGithub(false);
    }
  }, [agentState, logThought, speakText]);

  // ---------------------------------------------------------------------------
  // Continuous Speech Recognition with Acoustic Echo Cancellation
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isListeningActiveRef.current = true;
    };

    recognition.onresult = (event) => {
      // 1. Acoustic Echo Cancellation: NEVER listen to own voice from speakers
      if (isSpeakingRef.current) return;

      let interim = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) finalTranscript += item[0].transcript;
        else interim += item[0].transcript;
      }

      const lowerInterim = interim.toLowerCase();
      if (
        lowerInterim.includes("i am aiko") ||
        lowerInterim.includes("bharath's self-evolving") ||
        lowerInterim.includes("ai companion")
      ) {
        return;
      }

      if (interim) {
        setCurrentHearing(`Listening: "${interim}"`);
        setAvatarFlightState('listening');
      }

      if (finalTranscript) {
        const lowerFinal = finalTranscript.toLowerCase().trim();
        if (
          lowerFinal.includes("i am aiko") ||
          lowerFinal.includes("bharath's self-evolving") ||
          lowerFinal.includes("tell me what you'd like to explore")
        ) {
          return;
        }

        setCurrentHearing(`Heard: "${finalTranscript}"`);
        processQuery(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') setIsContinuousListening(false);
      isListeningActiveRef.current = false;
    };

    recognition.onend = () => {
      isListeningActiveRef.current = false;
      if (isContinuousListening) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          try {
            if (isContinuousListening && !isListeningActiveRef.current && !isSpeakingRef.current) {
              recognition.start();
            }
          } catch {}
        }, 350);
      }
    };

    recognitionRef.current = recognition;

    if (isContinuousListening) {
      try { recognition.start(); } catch {}
    }

    return () => {
      clearTimeout(restartTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, [isContinuousListening, processQuery]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      speakText("Microphone not supported in this browser, but you can type in the chat!", 'empathetic', 'aiko');
      return;
    }
    if (isContinuousListening) {
      setIsContinuousListening(false);
      try { recognitionRef.current.stop(); } catch {}
      setCurrentHearing("Mic paused");
      speakText("Voice listening paused.", 'analytical', 'aiko');
    } else {
      setIsContinuousListening(true);
      try { recognitionRef.current.start(); } catch {}
      setCurrentHearing("Continuous listening active");
      speakText("Continuous listening active! Speak any task.", 'curious', 'aiko');
    }
  };

  // Add memory from Live HUD
  const handleAddMemoryFromHud = async (e) => {
    e.preventDefault();
    if (!hudNewNote.trim()) return;
    await teachAgentNote(hudNewNote.trim());
    const fresh = recordEvolutionStep(agentState, 35, hudNewNote.trim());
    setAgentState(fresh);
    setHudNewNote('');
    logThought('LEARN', `Injected memory: "${hudNewNote.trim()}" (+35 XP)`);
    speakText("Pushed new memory node into cognitive stack!", 'excited', 'aiko');
  };

  if (!isInitializedPos) return null;

  // Emotion Badges
  const getBadge = () => {
    switch (emotionState) {
      case 'excited': return { label: 'EXCITED', color: 'bg-violet-500/20 text-violet-300 border-violet-500/40' };
      case 'empathetic': return { label: 'EMPATHETIC', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'analytical': return { label: 'ANALYTICAL', color: 'bg-sky-500/20 text-sky-300 border-sky-500/40' };
      case 'proud': return { label: 'PROUD', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'ethical_guard': return { label: 'ETHICAL SENTINEL', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      default: return { label: 'CURIOUS', color: 'bg-sky-500/20 text-sky-300 border-sky-500/40' };
    }
  };
  const badge = getBadge();

  // Visual Skin Shader Classes
  const getSkinClasses = (skin) => {
    if (skin === 'matrix') {
      return {
        aikoGradient: 'bg-gradient-to-tr from-emerald-600 via-green-500 to-lime-400 shadow-emerald-500/50',
        ring1: 'border-emerald-400/60 shadow-[0_0_10px_#10b981]',
        ring2: 'border-lime-400/40',
        eyeColor: 'bg-emerald-400 shadow-[0_0_10px_#10b981]',
        thruster: 'from-emerald-400 via-green-300 to-transparent shadow-[0_0_12px_#10b981]'
      };
    }
    if (skin === 'golden') {
      return {
        aikoGradient: 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shadow-amber-500/50',
        ring1: 'border-amber-400/60 shadow-[0_0_10px_#f59e0b]',
        ring2: 'border-yellow-300/40',
        eyeColor: 'bg-amber-300 shadow-[0_0_10px_#fde047]',
        thruster: 'from-amber-400 via-yellow-300 to-transparent shadow-[0_0_12px_#f59e0b]'
      };
    }
    // Cyberpunk Default
    return {
      aikoGradient: 'bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 shadow-sky-500/45',
      ring1: 'border-sky-400/40',
      ring2: 'border-indigo-400/30',
      eyeColor: 'bg-sky-400 shadow-[0_0_8px_#38bdf8]',
      thruster: 'from-sky-400 via-cyan-300 to-transparent shadow-[0_0_10px_#38bdf8]'
    };
  };
  const skinClasses = getSkinClasses(avatarSkin);

  return (
    <>
      {/* ===================================================================== */}
      {/* Holographic Laser Targeting Beam & Inter-Avatar Connection Laser     */}
      {/* ===================================================================== */}
      {(laserCoordinates || interAvatarBeam) && (
        <svg className="fixed inset-0 pointer-events-none z-40 w-full h-full">
          <defs>
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="interAvatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#f43f5e" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {laserCoordinates && (
            <>
              <line
                x1={laserCoordinates.startX}
                y1={laserCoordinates.startY}
                x2={laserCoordinates.endX}
                y2={laserCoordinates.endY}
                stroke="url(#laserGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <circle cx={laserCoordinates.endX} cy={laserCoordinates.endY} r="14" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" />
              <circle cx={laserCoordinates.endX} cy={laserCoordinates.endY} r="5" fill="#38bdf8" />
            </>
          )}
          {interAvatarBeam && (
            <>
              <line
                x1={interAvatarBeam.startX}
                y1={interAvatarBeam.startY}
                x2={interAvatarBeam.endX}
                y2={interAvatarBeam.endY}
                stroke="url(#interAvatarGrad)"
                strokeWidth="3"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
              <circle cx={interAvatarBeam.startX} cy={interAvatarBeam.startY} r="7" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" />
              <circle cx={interAvatarBeam.endX} cy={interAvatarBeam.endY} r="7" fill="none" stroke="#10b981" strokeWidth="2" className="animate-ping" />
            </>
          )}
        </svg>
      )}

      {/* Target highlight outline */}
      {activeTarget && (
        <style>{`
          #${activeTarget} {
            position: relative;
            outline: 2px solid #38bdf8 !important;
            outline-offset: 10px;
            box-shadow: 0 0 45px rgba(56, 189, 248, 0.45) !important;
            transition: all 0.6s ease;
          }
        `}</style>
      )}

      {/* ===================================================================== */}
      {/* 🧠 LIVE ON-SCREEN HOLOGRAPHIC MEMORY STACK HUD                         */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {showMemoryStackHud && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="fixed top-20 right-6 z-50 w-80 sm:w-96 rounded-3xl bg-slate-950/95 border border-sky-400/40 text-slate-100 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[82vh] overflow-hidden font-mono"
          >
            {/* HUD Header */}
            <div className="bg-slate-900/95 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wider">LIVE NEURAL MEMORY STACK</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                  LVL {agentState.evolutionLevel || 2}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setShowBrainSettings(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-sky-400"
                  title="Configure Brain Engine (Gemini LLM)"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowMemoryStackHud(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cognitive Stats Bar */}
            <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div>XP: <span className="text-emerald-400 font-bold">{agentState.totalXp} XP</span></div>
              <div>NODES: <span className="text-sky-400 font-bold">{agentState.memories?.length || 0}</span></div>
              <div className="text-emerald-400 font-bold">ETHICS: 100%</div>
            </div>

            {/* Scrollable Memory Stack Feed */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs leading-relaxed">
              
              {/* Active Thought Chain */}
              <div>
                <div className="text-[10px] uppercase text-sky-400 font-bold mb-1.5 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-sky-400 animate-pulse" />
                  <span>Real-Time Thought Stream</span>
                </div>
                <div className="space-y-1 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-[10px]">
                  {liveThoughtLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="flex items-start gap-1.5 text-slate-300">
                      <span className="text-sky-400 font-bold">[{log.type}]</span>
                      <span className="truncate flex-1">{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Nodes Stack */}
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold mb-1.5 flex items-center justify-between">
                  <span>Active Memory Nodes (Top of Stack)</span>
                  <span className="text-emerald-400">Synced</span>
                </div>
                <div className="space-y-2">
                  {(agentState.memories || []).slice(0, 5).map((mem, idx) => (
                    <motion.div
                      key={mem.id}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold">
                          {mem.category}
                        </span>
                        <span className="text-emerald-400 font-bold">{mem.impact}</span>
                      </div>
                      <p className="text-[11px] text-slate-200 font-sans leading-normal">
                        {mem.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Memory Injector */}
            <form onSubmit={handleAddMemoryFromHud} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={hudNewNote}
                onChange={(e) => setHudNewNote(e.target.value)}
                placeholder="Push custom memory node..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 font-sans"
              />
              <button
                type="submit"
                disabled={!hudNewNote.trim()}
                className="px-3 py-1.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-colors disabled:opacity-40 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Push</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🎯 RECRUITER JOB FIT COMPATIBILITY HUD                                */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {activeJobFit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 rounded-3xl bg-slate-950/98 border border-emerald-500/50 text-slate-100 shadow-2xl backdrop-blur-2xl p-4 font-sans text-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  {activeJobFit.score}%
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{activeJobFit.role}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Empirical Skill Alignment</div>
                </div>
              </div>
              <button onClick={() => setActiveJobFit(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Matched Technologies</div>
              <div className="flex flex-wrap gap-1">
                {activeJobFit.matched_skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Demonstrated Codebases</div>
              <div className="space-y-0.5 font-mono text-[10px] text-sky-300">
                {activeJobFit.matching_repos.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="text-emerald-400">&bull;</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-200 leading-relaxed font-sans">{activeJobFit.verdict}</p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  flyToSection('contact', "Flying down to book an interview!", 'excited');
                  setActiveJobFit(null);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1"
              >
                <span>Schedule Interview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🧪 INTERACTIVE TECHNICAL CHALLENGE HUD                                */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {activeQuiz && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 rounded-3xl bg-slate-950/98 border border-sky-400/50 text-slate-100 shadow-2xl backdrop-blur-2xl p-4 font-sans text-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-sky-400/30">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-400 animate-pulse" />
                <div>
                  <div className="font-bold text-white text-xs">Technical Challenge</div>
                  <div className="text-[10px] text-sky-400 font-mono">{activeQuiz.topic} &bull; +50 XP</div>
                </div>
              </div>
              <button onClick={() => setActiveQuiz(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-200 font-medium leading-relaxed">{activeQuiz.question}</p>

            <div className="space-y-1.5">
              {activeQuiz.options.map((opt, idx) => {
                const isSelected = selectedQuizOption === idx;
                const isAnswer = idx === activeQuiz.answer_index;
                let btnClass = "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-sky-400/50 hover:bg-slate-800";
                if (quizFeedback) {
                  if (isAnswer) btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                  else if (isSelected && !isAnswer) btnClass = "bg-rose-950/80 border-rose-500 text-rose-200";
                }
                return (
                  <button
                    key={idx}
                    disabled={!!quizFeedback}
                    onClick={() => {
                      setSelectedQuizOption(idx);
                      const isCorrect = idx === activeQuiz.answer_index;
                      setQuizFeedback({
                        correct: isCorrect,
                        explanation: activeQuiz.explanation
                      });
                      if (isCorrect) {
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                        const fresh = recordEvolutionStep(agentState, 50, `Passed challenge: ${activeQuiz.topic}`);
                        setAgentState(fresh);
                        speakText("Correct answer! That demonstrates true architectural understanding. Awarded 50 XP!", 'excited', 'aiko');
                      } else {
                        const fresh = recordEvolutionStep(agentState, 15, `Attempted challenge: ${activeQuiz.topic}`);
                        setAgentState(fresh);
                        speakText("Not quite! Let me explain the engineering principle behind it.", 'analytical', 'kuro');
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-[11px] transition-all leading-normal ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {quizFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                  quizFeedback.correct ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-slate-900 border-sky-400/30 text-slate-200'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1 font-mono">
                  {quizFeedback.correct ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Brain className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{quizFeedback.correct ? "Architectural Mastery (+50 XP)!" : "Technical Rationale:"}</span>
                </div>
                <p>{quizFeedback.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* ⚡ REAL-TIME SYSTEM DIAGNOSTICS & TELEMETRY HUD                       */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {activeDiagnostic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 rounded-3xl bg-slate-950/98 border border-sky-400/50 text-slate-100 shadow-2xl backdrop-blur-2xl p-4 font-mono text-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-sky-400/30">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="font-bold text-white text-xs">SYSTEM TELEMETRY HUD</span>
              </div>
              <button onClick={() => setActiveDiagnostic(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Status</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{activeDiagnostic.status}</span>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Cognitive XP</div>
                <div className="text-sky-400 font-bold mt-0.5">{activeDiagnostic.total_xp} XP (Lvl {activeDiagnostic.cognitive_level})</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Memory Nodes</div>
                <div className="text-white font-bold mt-0.5">{activeDiagnostic.memory_nodes_count} Snapshots</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Verified Repos</div>
                <div className="text-white font-bold mt-0.5">{activeDiagnostic.verified_repos} Public Codebases</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-300">
              Ethical Compliance Score: <span className="text-emerald-400 font-bold">{activeDiagnostic.ethical_compliance}</span> (0% Fabricated Claims)
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🐙 LIVE GITHUB PROFILE & REPOSITORY EXPLORER HUD                     */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {activeGithubSync && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-20 left-4 sm:left-8 z-50 w-[92vw] sm:w-[480px] max-h-[85vh] rounded-3xl bg-slate-950/98 border border-sky-400/50 text-slate-100 shadow-2xl backdrop-blur-2xl p-4 sm:p-5 font-sans text-xs space-y-3 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-sky-400/30 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>GitHub Explorer</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      @{activeGithubSync.username || 'bittubunny'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {activeGithubSync.public_repos_count || activeGithubSync.repositories?.length || 16} Verified Repositories &bull; Live Grounding
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleLiveGitHubRefresh}
                  disabled={isSyncingGithub}
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400/40 text-slate-400 hover:text-sky-300 transition-colors disabled:opacity-50"
                  title="Sync live from GitHub API"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGithub ? 'animate-spin text-sky-400' : ''}`} />
                </button>
                <button
                  onClick={() => setActiveGithubSync(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile banner & direct profile link */}
            <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="text-[11px] text-slate-300 leading-tight">
                <div className="font-semibold text-white">Bharath Chelimalla</div>
                <div className="text-[10px] text-slate-400 font-mono">Full-Stack Architect &amp; AI/ML Engineer</div>
              </div>
              <a
                href={`https://github.com/${activeGithubSync.username || 'bittubunny'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 font-mono text-[10px] flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Filter Search Input */}
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={githubSearchTerm}
                onChange={(e) => setGithubSearchTerm(e.target.value)}
                placeholder="Search repos (e.g. rag, delivery, fraud, quiz)..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-[11px] focus:outline-none focus:border-sky-400 font-sans"
              />
              {githubSearchTerm && (
                <button
                  onClick={() => setGithubSearchTerm('')}
                  className="text-slate-400 hover:text-white text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Repositories Scrollable List */}
            <div className="flex-1 overflow-y-auto max-h-64 sm:max-h-72 space-y-2 pr-1 custom-scrollbar">
              {((activeGithubSync.repositories && activeGithubSync.repositories.length > 0)
                ? activeGithubSync.repositories
                : ALL_GITHUB_REPOSITORIES
              )
                .filter(r => {
                  if (!githubSearchTerm.trim()) return true;
                  const term = githubSearchTerm.toLowerCase();
                  return (
                    r.name?.toLowerCase().includes(term) ||
                    r.description?.toLowerCase().includes(term) ||
                    r.language?.toLowerCase().includes(term) ||
                    r.category?.toLowerCase().includes(term)
                  );
                })
                .map((repo, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-all space-y-1.5 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-mono font-bold text-sky-300 text-[11px] group-hover:text-sky-200 break-all flex items-center gap-1.5">
                        <span>{repo.name}</span>
                        {repo.category && (
                          <span className="text-[9px] font-sans font-normal px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                            {repo.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-0.5 text-amber-400">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            <span>{repo.stars}</span>
                          </span>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-sky-300 p-1"
                          title="Open repo on GitHub"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                      {repo.description || "Public open-source repository on GitHub."}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${
                          repo.language === 'Python' ? 'bg-blue-400' :
                          repo.language === 'JavaScript' ? 'bg-amber-400' :
                          repo.language === 'Kotlin' ? 'bg-purple-400' :
                          repo.language === 'Jupyter Notebook' ? 'bg-orange-400' :
                          'bg-emerald-400'
                        }`} />
                        <span>{repo.language || 'Codebase'}</span>
                      </span>

                      <button
                        onClick={() => {
                          processQuery(`Tell me about the ${repo.name} repository and its architecture`);
                        }}
                        className="text-sky-400 hover:text-sky-300 text-[10px] underline underline-offset-2 flex items-center gap-0.5"
                      >
                        <span>Inspect with Aiko</span>
                        <ChevronRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Footer with Ethical Compliance Badge */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono shrink-0">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>100% Grounded in GitHub</span>
              </span>
              <button
                onClick={handleLiveGitHubRefresh}
                disabled={isSyncingGithub}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <span>{isSyncingGithub ? 'Syncing...' : 'Sync Live GitHub API'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* ⚙️ AI NEURAL ENGINE SETTINGS MODAL (GEMINI LLM CONFIG)                 */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {showBrainSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="w-full max-w-md rounded-3xl bg-slate-950 border border-sky-400/50 p-5 shadow-2xl text-slate-100 font-sans space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-sky-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Neural Engine Settings</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Cognitive Brain & LLM Configuration</p>
                  </div>
                </div>
                <button onClick={() => setShowBrainSettings(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-[11px] font-bold text-slate-300">Active Cognitive Engine</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    activeBrainEngine === 'gemini' ? 'bg-sky-500/10 border-sky-400 text-sky-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <div className="text-[10px] text-slate-400">Cloud AI</div>
                    <div>Google Gemini 2.5 Flash</div>
                  </div>
                  <div className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    activeBrainEngine === 'local' ? 'bg-sky-500/10 border-sky-400 text-sky-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <div className="text-[10px] text-slate-400">Zero-Latency</div>
                    <div>Local Semantic Brain</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                  <span>Gemini API Key (Optional)</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 hover:underline text-[10px] font-mono"
                  >
                    Get Free Key &rarr;
                  </a>
                </label>
                <input
                  type="password"
                  value={geminiApiKeyInput}
                  onChange={(e) => setGeminiApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-sky-400"
                />
                <p className="text-[10px] text-slate-400 leading-normal">
                  Entering your Google Gemini key unlocks real-time LLM reasoning, arbitrary debate topics, and natural conversational dialogue. Your key remains stored strictly in your browser.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    if (geminiApiKeyInput.trim()) {
                      localStorage.setItem('bharath_agent_gemini_key', geminiApiKeyInput.trim());
                      setActiveBrainEngine('gemini');
                      speakText("Google Gemini brain connected! Cloud LLM cognition is now active.", 'excited', 'aiko');
                    } else {
                      localStorage.removeItem('bharath_agent_gemini_key');
                      setActiveBrainEngine('local');
                      speakText("Switched to autonomous local semantic brain.", 'curious', 'aiko');
                    }
                    setShowBrainSettings(false);
                  }}
                  className="flex-1 py-2 px-4 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-colors"
                >
                  Save & Activate
                </button>
                <button
                  onClick={() => setShowBrainSettings(false)}
                  className="py-2 px-4 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🔴 SECONDARY AVATAR: KURO (SPAWNED DYNAMICALLY ON DEMAND)             */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {hasSecondAvatar && (
          <motion.div
            ref={kuroDroneRef}
            drag
            dragMomentum={false}
            dragElastic={0.08}
            onDragEnd={(e, info) => {
              setKuroPos(prev => ({
                x: Math.max(20, Math.min(window.innerWidth - 120, prev.x + info.offset.x)),
                y: Math.max(20, Math.min(window.innerHeight - 120, prev.y + info.offset.y))
              }));
            }}
            animate={{
              x: kuroPos.x,
              y: kuroPos.y,
              transition: { type: "spring", damping: 24, stiffness: 140 }
            }}
            className="fixed top-0 left-0 z-50 select-none flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            {/* Kuro Speech Bubble */}
            <AnimatePresence>
              {showKuroBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  className="mb-3 w-64 sm:w-72 p-3.5 rounded-3xl bg-slate-950/95 border border-rose-500/50 text-slate-100 shadow-2xl backdrop-blur-2xl relative font-sans text-xs leading-relaxed"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-rose-500/30 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span>Kuro &bull; Sub-Agent</span>
                    </span>
                    <button onClick={() => setShowKuroBubble(false)} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-medium">{kuroSpeechText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kuro Drone Body (Crimson Cyber Aesthetic) */}
            <div className="relative group">
              {/* Crimson Gyroscopic Rings */}
              <motion.div
                animate={{ rotateZ: [0, 360], rotateX: [65, 65] }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-rose-500/40 pointer-events-none"
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
              />
              <motion.div
                animate={{ rotateZ: [360, 0], rotateY: [60, 60] }}
                transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-purple-500/40 pointer-events-none"
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
              />

              {/* Drone Sphere */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                onClick={() => {
                  if (isDebating) stopAvatarDialogue();
                  else runAvatarDialogue();
                }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-purple-800 p-[2.5px] cursor-pointer shadow-[0_0_25px_rgba(244,63,94,0.5)]"
              >
                <div className="relative w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-white/20">
                  {/* Visor */}
                  <div className="w-9 h-7 rounded-xl bg-slate-900 border border-rose-400/50 flex flex-col items-center justify-center px-1 shadow-inner">
                    <div className="flex items-center justify-around w-full px-1">
                      <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e] flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e] flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                      </div>
                    </div>
                    {/* Equalizer mouth */}
                    <div className="mt-1 flex items-center space-x-0.5">
                      <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-300"></span>
                      <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Red Plasma Thrusters */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-between w-6 pointer-events-none">
                <div className="w-1.5 h-3.5 rounded-b-full bg-gradient-to-b from-rose-400 via-red-400 to-transparent blur-[1px] shadow-[0_0_8px_#f43f5e] animate-pulse" />
                <div className="w-1.5 h-3.5 rounded-b-full bg-gradient-to-b from-rose-400 via-red-400 to-transparent blur-[1px] shadow-[0_0_8px_#f43f5e] animate-pulse" />
              </div>

              {/* Sub-agent Action Toolbar */}
              <div className="mt-3 flex items-center space-x-1 p-1 rounded-full bg-slate-900/90 border border-rose-500/40 backdrop-blur-xl shadow-xl text-[10px] font-mono">
                <button
                  onClick={() => {
                    if (isDebating) stopAvatarDialogue();
                    else runAvatarDialogue();
                  }}
                  className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                    isDebating ? 'bg-rose-500 text-white' : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
                  }`}
                  title={isDebating ? "Stop Debate" : "Make Avatars Talk to Each Other"}
                >
                  {isDebating ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isDebating ? 'Stop' : 'Debate'}</span>
                </button>
                <button
                  onClick={() => setHasSecondAvatar(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                  title="Merge Kuro back"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🟢 THIRD AVATAR: NOVA (AI & ML RESEARCH SPECIALIST)                   */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {hasThirdAvatar && (
          <motion.div
            ref={novaDroneRef}
            drag
            dragMomentum={false}
            dragElastic={0.08}
            onDragEnd={(e, info) => {
              setNovaPos(prev => ({
                x: Math.max(20, Math.min(window.innerWidth - 120, prev.x + info.offset.x)),
                y: Math.max(20, Math.min(window.innerHeight - 120, prev.y + info.offset.y))
              }));
            }}
            animate={{
              x: novaPos.x,
              y: novaPos.y,
              transition: { type: "spring", damping: 24, stiffness: 140 }
            }}
            className="fixed top-0 left-0 z-50 select-none flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            {/* Nova Speech Bubble */}
            <AnimatePresence>
              {showNovaBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  className="mb-3 w-64 sm:w-72 p-3.5 rounded-3xl bg-slate-950/95 border border-emerald-500/50 text-slate-100 shadow-2xl backdrop-blur-2xl relative font-sans text-xs leading-relaxed"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-emerald-500/30 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Nova &bull; AI / ML Specialist</span>
                    </span>
                    <button onClick={() => setShowNovaBubble(false)} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-medium">{novaSpeechText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nova Drone Body (Emerald Matrix Cyber Aesthetic) */}
            <div className="relative group">
              {/* Emerald Gyroscopic Rings */}
              <motion.div
                animate={{ rotateZ: [0, 360], rotateX: [70, 70] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-emerald-500/40 pointer-events-none"
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
              />
              <motion.div
                animate={{ rotateZ: [360, 0], rotateY: [65, 65] }}
                transition={{ repeat: Infinity, duration: 8.5, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-teal-400/40 pointer-events-none"
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
              />

              {/* Drone Sphere */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut" }}
                onClick={() => {
                  if (isDebating) stopAvatarDialogue();
                  else runAvatarDialogue();
                }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-700 p-[2.5px] cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                <div className="relative w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-white/20">
                  {/* Visor */}
                  <div className="w-9 h-7 rounded-xl bg-slate-900 border border-emerald-400/50 flex flex-col items-center justify-center px-1 shadow-inner">
                    <div className="flex items-center justify-around w-full px-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                      </div>
                    </div>
                    {/* Equalizer mouth */}
                    <div className="mt-1 flex items-center space-x-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-300"></span>
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Emerald Plasma Thrusters */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-between w-6 pointer-events-none">
                <div className="w-1.5 h-3.5 rounded-b-full bg-gradient-to-b from-emerald-400 via-teal-400 to-transparent blur-[1px] shadow-[0_0_8px_#10b981] animate-pulse" />
                <div className="w-1.5 h-3.5 rounded-b-full bg-gradient-to-b from-emerald-400 via-teal-400 to-transparent blur-[1px] shadow-[0_0_8px_#10b981] animate-pulse" />
              </div>

              {/* Sub-agent Action Toolbar */}
              <div className="mt-3 flex items-center space-x-1 p-1 rounded-full bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-xl text-[10px] font-mono">
                <button
                  onClick={() => {
                    if (isDebating) stopAvatarDialogue();
                    else runAvatarDialogue();
                  }}
                  className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                    isDebating ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
                  }`}
                  title={isDebating ? "Stop Debate" : "Start 4-Way Quad Debate"}
                >
                  {isDebating ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isDebating ? 'Stop' : 'Debate'}</span>
                </button>
                <button
                  onClick={() => setHasThirdAvatar(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                  title="Merge Nova back"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🟡 FOURTH AVATAR: TITAN (DEVOPS & CLOUD INFRASTRUCTURE SENTINEL)      */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {hasFourthAvatar && (
          <motion.div
            ref={titanDroneRef}
            drag
            dragMomentum={false}
            dragElastic={0.08}
            onDragEnd={(e, info) => {
              setTitanPos(prev => ({
                x: Math.max(20, Math.min(window.innerWidth - 120, prev.x + info.offset.x)),
                y: Math.max(20, Math.min(window.innerHeight - 120, prev.y + info.offset.y))
              }));
            }}
            animate={{
              x: titanPos.x,
              y: titanPos.y,
              transition: { type: "spring", damping: 24, stiffness: 140 }
            }}
            className="fixed top-0 left-0 z-50 select-none flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            {/* Titan Speech Bubble */}
            <AnimatePresence>
              {showTitanBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  className="mb-3 w-64 sm:w-72 p-3.5 rounded-3xl bg-slate-950/95 border border-amber-500/50 text-slate-100 shadow-2xl backdrop-blur-2xl relative font-sans text-xs leading-relaxed"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-500/30 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      <span>Titan &bull; DevOps &amp; Cloud</span>
                    </span>
                    <button onClick={() => setShowTitanBubble(false)} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 font-medium">{titanSpeechText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Titan Drone Body (Solar Amber Cyber Aesthetic) */}
            <div className="relative group">
              {/* Amber Gyroscopic Rings */}
              <motion.div
                animate={{ rotateZ: [0, 360], rotateX: [60, 60] }}
                transition={{ repeat: Infinity, duration: 6.2, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-amber-500/40 pointer-events-none"
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
              />
              <motion.div
                animate={{ rotateZ: [360, 0], rotateY: [70, 70] }}
                transition={{ repeat: Infinity, duration: 9.2, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-orange-400/40 pointer-events-none"
                style={{ perspective: 600, transformStyle: "preserve-3d" }}
              />

              {/* Drone Sphere */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2.9, ease: "easeInOut" }}
                onClick={() => {
                  if (isDebating) stopAvatarDialogue();
                  else runAvatarDialogue();
                }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-orange-600 to-yellow-700 p-[2.5px] cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.5)]"
              >
                <div className="relative w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-white/20">
                  {/* Visor */}
                  <div className="w-9 h-7 rounded-xl bg-slate-900 border border-amber-400/50 flex flex-col items-center justify-center px-1 shadow-inner">
                    <div className="flex items-center justify-around w-full px-1">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                      </div>
                    </div>
                    {/* Equalizer mouth */}
                    <div className="mt-1 flex items-center space-x-0.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-300"></span>
                      <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amber Plasma Thrusters */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-between w-6 pointer-events-none">
                <div className="w-1.5 h-3.5 rounded-b-full bg-gradient-to-b from-amber-400 via-orange-400 to-transparent blur-[1px] shadow-[0_0_8px_#f59e0b] animate-pulse" />
                <div className="w-1.5 h-3.5 rounded-b-full bg-gradient-to-b from-amber-400 via-orange-400 to-transparent blur-[1px] shadow-[0_0_8px_#f59e0b] animate-pulse" />
              </div>

              {/* Sub-agent Action Toolbar */}
              <div className="mt-3 flex items-center space-x-1 p-1 rounded-full bg-slate-900/90 border border-amber-500/40 backdrop-blur-xl shadow-xl text-[10px] font-mono">
                <button
                  onClick={() => {
                    if (isDebating) stopAvatarDialogue();
                    else runAvatarDialogue();
                  }}
                  className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                    isDebating ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                  }`}
                  title={isDebating ? "Stop Debate" : "Start 4-Way Quad Debate"}
                >
                  {isDebating ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isDebating ? 'Stop' : 'Debate'}</span>
                </button>
                <button
                  onClick={() => setHasFourthAvatar(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                  title="Merge Titan back"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 🔵 PRIMARY AVATAR: AIKO (FREE-FLOATING SPATIAL GUIDE)                 */}
      {/* ===================================================================== */}
      <motion.div
        ref={droneRef}
        drag
        dragMomentum={false}
        dragElastic={0.08}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, info) => {
          setIsDragging(false);
          setPos(prev => ({
            x: Math.max(20, Math.min(window.innerWidth - 120, prev.x + info.offset.x)),
            y: Math.max(20, Math.min(window.innerHeight - 120, prev.y + info.offset.y))
          }));
        }}
        animate={{
          x: pos.x,
          y: pos.y,
          transition: { type: "spring", damping: 24, stiffness: 140 }
        }}
        className="fixed top-0 left-0 z-50 select-none flex flex-col items-center cursor-grab active:cursor-grabbing"
      >
        {/* Aiko Subtitle / Spoken Thought Bubble */}
        <AnimatePresence>
          {showSpeechBubble && !isConsoleExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              className={`mb-3 w-72 sm:w-80 p-4 rounded-3xl bg-slate-950/95 border border-sky-400/40 text-slate-100 shadow-2xl backdrop-blur-2xl relative font-sans text-xs sm:text-sm leading-relaxed ${
                pos.x > window.innerWidth / 2 ? 'origin-bottom-right' : 'origin-bottom-left'
              }`}
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-sky-400 uppercase tracking-wider">Aiko</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      const next = !isVoiceEnabled;
                      setIsVoiceEnabled(next);
                      if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      } else if (next) {
                        speakText("Voice enabled! I'm speaking aloud.", 'curious', 'aiko');
                      }
                    }}
                    className={`p-1 rounded-lg transition-colors ${
                      isVoiceEnabled ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500'
                    }`}
                  >
                    {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setShowBrainSettings(true)}
                    className="p-1 rounded-lg text-slate-400 hover:text-sky-400"
                    title="Configure AI Engine (Gemini LLM)"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsConsoleExpanded(true)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setShowSpeechBubble(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-slate-200 font-medium leading-normal">{speechText}</p>

              {currentHearing && (
                <div className="mt-2 px-2.5 py-1 rounded-lg bg-sky-950/60 border border-sky-500/30 font-mono text-[11px] text-sky-300 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                  <span className="truncate">{currentHearing}</span>
                </div>
              )}

              {/* Quick Runtime Task Pills */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => {
                    const willSpawn = !hasSecondAvatar || !hasThirdAvatar || !hasFourthAvatar;
                    setHasSecondAvatar(willSpawn);
                    setHasThirdAvatar(willSpawn);
                    setHasFourthAvatar(willSpawn);
                    if (willSpawn) runAvatarDialogue();
                    else stopAvatarDialogue();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1"
                >
                  <Users className="w-3 h-3" />
                  <span>{(hasSecondAvatar && hasThirdAvatar && hasFourthAvatar) ? 'Merge Quad' : 'Spawn 4 Avatars'}</span>
                </button>
                <button
                  onClick={() => setShowMemoryStackHud(prev => !prev)}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 transition-all flex items-center gap-1"
                >
                  <Brain className="w-3 h-3" />
                  <span>Memory Stack</span>
                </button>
                <button
                  onClick={() => processQuery("Evaluate job fit for Full-Stack Python and React developer")}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-1"
                >
                  <Target className="w-3 h-3" />
                  <span>Job Fit Match</span>
                </button>
                <button
                  onClick={() => processQuery("Quiz me on system architecture")}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Quiz Me (+50XP)</span>
                </button>
                <button
                  onClick={() => processQuery("Debate FastAPI versus Django")}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-all flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Debate Topic</span>
                </button>
                <button
                  onClick={() => processQuery("Run system diagnostics")}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 transition-all flex items-center gap-1"
                >
                  <Gauge className="w-3 h-3" />
                  <span>Diagnostics</span>
                </button>
                <button
                  onClick={() => processQuery("Go through my GitHub profile and repositories")}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 transition-all flex items-center gap-1"
                >
                  <Github className="w-3 h-3 text-sky-400" />
                  <span>🐙 GitHub Repos</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable Spatial Dialogue Console */}
        <AnimatePresence>
          {isConsoleExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              className={`mb-3 w-80 sm:w-96 rounded-3xl bg-slate-950/98 border border-sky-400/40 text-slate-100 shadow-2xl backdrop-blur-2xl flex flex-col h-[480px] overflow-hidden ${
                pos.x > window.innerWidth / 2 ? 'origin-bottom-right' : 'origin-bottom-left'
              }`}
            >
              {/* Header */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-[1.5px]">
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-sky-400">
                      <Brain className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-white">Aiko Spatial Console</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Level {agentState.evolutionLevel || 2} &bull; {(hasSecondAvatar && hasThirdAvatar && hasFourthAvatar) ? '4-Avatar Quad Council' : (hasSecondAvatar ? 'Dual-Agent Field' : 'Single Agent')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setShowMemoryStackHud(prev => !prev)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800"
                    title="Toggle Live Memory Stack HUD"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsConsoleExpanded(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={chatScrollRef} className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs leading-relaxed">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold ${
                        msg.sender === 'user'
                          ? 'bg-sky-500 text-slate-950'
                          : 'bg-slate-800 border border-sky-400/30 text-sky-400'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 ${
                        msg.sender === 'user'
                          ? 'bg-sky-500 text-slate-950 font-medium'
                          : 'bg-slate-900 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans leading-relaxed">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real Task Execution Chips */}
              <div className="px-3 py-1.5 bg-slate-900/70 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono">
                <button
                  onClick={() => {
                    setHasSecondAvatar(true);
                    setHasThirdAvatar(true);
                    setHasFourthAvatar(true);
                    runAvatarDialogue();
                  }}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 flex items-center gap-1"
                >
                  <Users className="w-3 h-3" />
                  <span>👥 4-Way Quad Debate</span>
                </button>
                <button
                  onClick={() => setShowMemoryStackHud(true)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40"
                >
                  🧠 Show Memory Stack
                </button>
                <button
                  onClick={() => runGuidedTour()}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  🗺️ Guided Tour
                </button>
                <button
                  onClick={() => processQuery("mutate to matrix")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                >
                  ⚡ Matrix Mode
                </button>
                <button
                  onClick={() => processQuery("Go through my GitHub profile and repositories")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-200 border border-sky-400/40 hover:bg-sky-500/30 flex items-center gap-1"
                >
                  <Github className="w-3 h-3 text-sky-400" />
                  <span>🐙 GitHub Repos</span>
                </button>
              </div>

              {/* Console Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputVal.trim()) {
                    processQuery(inputVal);
                    setInputVal('');
                  }
                }}
                className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-xl transition-all ${
                    isContinuousListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={isContinuousListening ? "Mic is Active" : "Mic is Paused"}
                >
                  {isContinuousListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                </button>

                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Say or type any task (e.g. 'spawn 2 avatars', 'show memory')..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 font-sans"
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isProcessing}
                  className="p-2 rounded-xl bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----------------------------------------------------------------- */}
        {/* Aiko 3D Gyroscopic Drone Body                                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="relative group">
          <motion.div
            animate={{ rotateZ: [0, 360], rotateX: [65, 65] }}
            transition={{ repeat: Infinity, duration: emotionState === 'excited' ? 4 : 8, ease: "linear" }}
            className={`absolute -inset-3.5 rounded-full border pointer-events-none ${skinClasses.ring1}`}
            style={{ perspective: 600, transformStyle: "preserve-3d" }}
          />
          <motion.div
            animate={{ rotateZ: [360, 0], rotateY: [60, 60] }}
            transition={{ repeat: Infinity, duration: emotionState === 'excited' ? 5.5 : 11, ease: "linear" }}
            className={`absolute -inset-2.5 rounded-full border pointer-events-none ${skinClasses.ring2}`}
            style={{ perspective: 600, transformStyle: "preserve-3d" }}
          />

          {/* Main Sphere */}
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: avatarFlightState === 'flying' ? [-4, 4, -4] : [0, -10, 0],
              rotate: avatarFlightState === 'flying' ? [0, 10, -10, 0] : [0, 3, -3, 0]
            }}
            transition={{ repeat: Infinity, duration: avatarFlightState === 'flying' ? 0.9 : 3.2, ease: "easeInOut" }}
            onClick={() => {
              if (!showSpeechBubble && !isConsoleExpanded) setShowSpeechBubble(true);
              else setIsConsoleExpanded(!isConsoleExpanded);
            }}
            className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] cursor-pointer ${skinClasses.aikoGradient}`}
          >
            <div className="relative w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-white/25">
              {/* Visor */}
              <div className="w-11 h-8 rounded-xl bg-slate-900 border border-sky-400/40 flex flex-col items-center justify-center px-1 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-around w-full px-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${skinClasses.eyeColor} flex items-center justify-center`}>
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${skinClasses.eyeColor} flex items-center justify-center`}>
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                  </div>
                </div>
                {/* Equalizer mouth */}
                <div className="mt-1 flex items-center space-x-0.5">
                  <motion.span
                    animate={avatarFlightState === 'speaking' ? { height: [3, 9, 4, 8] } : { height: 2 }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                    className="w-1 rounded-full bg-pink-400"
                  />
                  <motion.span
                    animate={avatarFlightState === 'speaking' ? { height: [2, 10, 3, 11] } : { height: 2 }}
                    transition={{ repeat: Infinity, duration: 0.35, delay: 0.05 }}
                    className="w-1.5 rounded-full bg-sky-400"
                  />
                  <motion.span
                    animate={avatarFlightState === 'speaking' ? { height: [3, 9, 4, 8] } : { height: 2 }}
                    transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }}
                    className="w-1 rounded-full bg-pink-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Plasma Thrusters */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-between w-8 pointer-events-none">
            <motion.div
              animate={{
                scaleY: avatarFlightState === 'flying' ? [1.2, 2.2, 1.4] : [0.7, 1.2, 0.8],
                opacity: avatarFlightState === 'flying' ? [0.9, 1, 0.8] : [0.5, 0.8, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className={`w-2 h-4 origin-top rounded-b-full bg-gradient-to-b ${skinClasses.thruster} blur-[1px]`}
            />
            <motion.div
              animate={{
                scaleY: avatarFlightState === 'flying' ? [1.4, 2.0, 1.2] : [0.8, 1.1, 0.7],
                opacity: avatarFlightState === 'flying' ? [0.9, 1, 0.8] : [0.5, 0.8, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 0.22, delay: 0.04 }}
              className={`w-2 h-4 origin-top rounded-b-full bg-gradient-to-b ${skinClasses.thruster} blur-[1px]`}
            />
          </div>

          {/* Action Toolbar on Drone */}
          <div className="mt-4 flex items-center space-x-1 p-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-xl">
            <button
              onClick={toggleListening}
              className={`p-1.5 rounded-full transition-all ${
                isContinuousListening ? 'bg-rose-500 text-white shadow-lg animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}
              title={isContinuousListening ? "Mic is Active" : "Mic is Paused"}
            >
              {isContinuousListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                const next = !isVoiceEnabled;
                setIsVoiceEnabled(next);
                if (!next) window.speechSynthesis?.cancel();
                else speakText("Voice enabled!", 'curious', 'aiko');
              }}
              className={`p-1.5 rounded-full transition-all ${
                isVoiceEnabled ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
              }`}
              title="Toggle Voice Synthesis"
            >
              {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setShowMemoryStackHud(prev => !prev)}
              className={`p-1.5 rounded-full transition-colors ${
                showMemoryStackHud ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-sky-400 hover:bg-sky-500/20'
              }`}
              title="Toggle Live Neural Memory Stack"
            >
              <Brain className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                const willSpawn = !hasSecondAvatar || !hasThirdAvatar || !hasFourthAvatar;
                setHasSecondAvatar(willSpawn);
                setHasThirdAvatar(willSpawn);
                setHasFourthAvatar(willSpawn);
                if (willSpawn) runAvatarDialogue();
                else stopAvatarDialogue();
              }}
              className={`p-1.5 rounded-full transition-colors ${
                (hasSecondAvatar && hasThirdAvatar && hasFourthAvatar) ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-rose-400'
              }`}
              title="Spawn / Despawn 4 AI Avatars for Debate"
            >
              <Users className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowBrainSettings(true)}
              className="p-1.5 rounded-full transition-colors bg-slate-800 text-slate-300 hover:text-sky-400"
              title="Configure AI Neural Engine (Gemini LLM)"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
              className={`p-1.5 rounded-full transition-colors ${
                isConsoleExpanded ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-sky-400'
              }`}
              title="Toggle Dialogue Console"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
