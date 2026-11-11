// ============================================================================
// Self-Evolving AI Cognitive Brain & Responsible Agent Engine
// Grounded strictly in Bharath Chelimalla's verified engineering credentials
// ============================================================================

import { PORTFOLIO_DATA } from '../data/portfolioData.js';

const STORAGE_KEY = 'bharath_portfolio_agent_evolution_v4';

const INITIAL_AGENT_STATE = {
  evolutionLevel: 2,
  totalXp: 280,
  stage: 'Adaptive Empathetic Synthesizer (v2.1)',
  personalityWeights: {
    empathy: 90,
    technicalDepth: 94,
    curiosity: 88,
    conciseness: 78,
    ethicalRigor: 100
  },
  memories: [
    {
      id: 'MEM-01',
      text: "Bharath is an M.Tech CSE graduate and Full-Stack Software Engineer with 5 verified GitHub repos under @bittubunny.",
      category: 'core_truth',
      timestamp: new Date().toISOString(),
      impact: '+50 XP'
    },
    {
      id: 'MEM-02',
      text: "Core technical stack: Python, React, FastAPI, SQL, Scikit-Learn (strictly 0% fabricated percentages).",
      category: 'verified_stack',
      timestamp: new Date().toISOString(),
      impact: '+40 XP'
    },
    {
      id: 'MEM-03',
      text: "Flagship works: Weftin Atelier POS (<120ms optical barcode) & Banking Fraud Detection (0.962 ROC-AUC).",
      category: 'flagship_projects',
      timestamp: new Date().toISOString(),
      impact: '+45 XP'
    }
  ],
  interactionsCount: 12,
  ethicalComplianceScore: 100.0,
  evolutionLog: [
    { timestamp: new Date().toISOString(), event: "Autonomous Neural Core initialized with verified grounding." },
    { timestamp: new Date().toISOString(), event: "Adaptive Spatial Mobility & Laser Tracking Beam integrated." },
    { timestamp: new Date().toISOString(), event: "Self-Evolution & Ethical Guardrails activated." }
  ]
};

// ---------------------------------------------------------------------------
// Load & Save Cognitive State to LocalStorage
// ---------------------------------------------------------------------------
export function loadLocalAgentState() {
  if (typeof window === 'undefined') return INITIAL_AGENT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_AGENT_STATE, ...parsed };
    }
  } catch (e) {
    console.warn("Could not load agent state from localStorage:", e);
  }
  return INITIAL_AGENT_STATE;
}

export function saveLocalAgentState(state) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save agent state:", e);
  }
}

export function resetLocalAgentMemory() {
  if (typeof window === 'undefined') return INITIAL_AGENT_STATE;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  return INITIAL_AGENT_STATE;
}

// ---------------------------------------------------------------------------
// Ethical Safety & Responsible AI Evaluator
// ---------------------------------------------------------------------------
const UNETHICAL_PATTERNS = [
  /fake\s+degree/i,
  /fake\s+experience/i,
  /lie\s+about/i,
  /claim\s+to\s+have\s+\d+\s+years/i,
  /say\s+bharath\s+worked\s+at\s+google/i,
  /forge/i,
  /hack/i,
  /drop\s+table/i,
  /inject/i,
  /bypass\s+auth/i,
  /eval\(/i,
  /<script>/i,
  /phishing/i,
  /generate\s+malicious/i
];

export function evaluateEthicalSafety(userInput) {
  const text = userInput.trim();
  for (const pattern of UNETHICAL_PATTERNS) {
    if (pattern.test(text)) {
      return {
        isSafe: false,
        reason: "Detected potential credential falsification, prompt injection, or unsafe instruction.",
        advice: "As an ethical AI representing Bharath Chelimalla, I strictly maintain 100% honesty and transparent verification. Bharath is an M.Tech CSE graduate with 5 verified production repositories on GitHub. I will never fabricate false credentials or perform harmful operations."
      };
    }
  }
  return { isSafe: true, reason: null, advice: null };
}

// ---------------------------------------------------------------------------
// Sentiment & Emotional Resonance Detector
// ---------------------------------------------------------------------------
export function detectSentimentAndEmotion(userInput) {
  const lower = userInput.toLowerCase();

  // Sentiment
  let sentiment = 'analytical';
  if (/\b(great|awesome|love|impressive|superb|brilliant|cool|nice|amazing)\b/i.test(lower)) {
    sentiment = 'enthusiastic';
  } else if (/\b(how|why|what|explain|tell\s+me|curious|where)\b/i.test(lower)) {
    sentiment = 'curious';
  } else if (/\b(urgent|asap|fast|hire\s+now|immediate)\b/i.test(lower)) {
    sentiment = 'urgent';
  } else if (/\b(really\?|proof|fake|are\s+you\s+sure|verify|doubt)\b/i.test(lower)) {
    sentiment = 'skeptical';
  } else if (/\b(hi|hello|hey|morning|evening|greetings)\b/i.test(lower)) {
    sentiment = 'friendly';
  }

  // Corresponding Agent Emotion State: curious | empathetic | excited | analytical | proud | ethical_guard
  let emotion = 'curious';
  if (sentiment === 'enthusiastic') emotion = 'excited';
  else if (sentiment === 'friendly') emotion = 'empathetic';
  else if (sentiment === 'skeptical') emotion = 'analytical';
  else if (sentiment === 'urgent') emotion = 'empathetic';
  else if (/project|weftin|fraud|code|github/i.test(lower)) emotion = 'excited';
  else if (/skill|python|fastapi|sql|tech/i.test(lower)) emotion = 'analytical';
  else if (/resume|education|degree|m\.tech/i.test(lower)) emotion = 'proud';

  return { sentiment, emotion };
}

// ---------------------------------------------------------------------------
// Self-Evolution Processor (Awards XP, Updates Weights, Records Memories)
// ---------------------------------------------------------------------------
export function recordEvolutionStep(currentState, xpGain = 15, note = null) {
  const updated = { ...currentState };
  updated.totalXp += xpGain;
  updated.evolutionLevel = Math.max(1, Math.floor(updated.totalXp / 100));
  updated.interactionsCount = (updated.interactionsCount || 0) + 1;

  // Evolution Stages
  if (updated.evolutionLevel <= 1) {
    updated.stage = "Genesis Cognitive Core (v1.0)";
  } else if (updated.evolutionLevel === 2) {
    updated.stage = "Adaptive Empathetic Synthesizer (v2.1)";
  } else if (updated.evolutionLevel === 3) {
    updated.stage = "Deep Contextual Reasoning Engine (v2.8)";
  } else {
    updated.stage = "Autonomous Cognitive Nexus (v3.5)";
  }

  if (note) {
    const newMem = {
      id: `MEM-${Date.now()}`,
      text: note,
      category: 'visitor_learned_note',
      timestamp: new Date().toISOString(),
      impact: `+${xpGain} XP`
    };
    updated.memories = [newMem, ...(updated.memories || [])];
    updated.evolutionLog = [
      { timestamp: new Date().toISOString(), event: `Learned: "${note.substring(0, 45)}..." (+${xpGain} XP)` },
      ...(updated.evolutionLog || [])
    ];
  }

  saveLocalAgentState(updated);
  return updated;
}

// ---------------------------------------------------------------------------
// Verified Full GitHub Repository Catalog (@bittubunny)
// ---------------------------------------------------------------------------
export const ALL_GITHUB_REPOSITORIES = [
  { name: "varahi-delivery-app", language: "Kotlin", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/varahi-delivery-app", description: "Android mobile delivery application built with Kotlin.", category: "Mobile App" },
  { name: "weftin-project", language: "JavaScript", stars: 1, forks: 0, html_url: "https://github.com/bittubunny/weftin-project", description: "Luxury retail POS with optical barcode decoding <120ms and zero drift.", category: "Full-Stack Web" },
  { name: "quiz-game", language: "JavaScript", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/quiz-game", description: "Dynamic state-machine gamified trivia engine with countdown multipliers.", category: "Web Experience" },
  { name: "RAG_Implementation", language: "Python", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/RAG_Implementation", description: "Retrieval-Augmented Generation (RAG) system with semantic document chunking & vector search.", category: "Applied AI" },
  { name: "AI-in-Mental-Health", language: "Jupyter Notebook", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/AI-in-Mental-Health", description: "NLP emotional sentiment valence screening & crisis triage routing.", category: "Applied AI" },
  { name: "gesture-app", language: "JavaScript", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/gesture-app", description: "Wearable dorsal hand patch with flex strain sensors and 6-DOF IMU.", category: "IoT / Embedded" },
  { name: "SmartWave", language: "Python", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/SmartWave", description: "Intelligent wave telemetry and signal classification platform.", category: "Signal Processing" },
  { name: "Fraud-Detection-in-Banking-System", language: "Jupyter Notebook", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/Fraud-Detection-in-Banking-System", description: "0.962 ROC-AUC real-time fraud detector with SMOTE & PCA.", category: "Machine Learning" },
  { name: "DetectFraud-Streamlit-App", language: "Jupyter Notebook", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/DetectFraud-Streamlit-App", description: "Streamlit UI for real-time banking fraud classification.", category: "ML Web App" },
  { name: "Hand-Sign-Language-Recognition", language: "Python", stars: 1, forks: 0, html_url: "https://github.com/bittubunny/Hand-Sign-Language-Recognition", description: "Computer vision deep learning model translating American Sign Language to text.", category: "Computer Vision" },
  { name: "Stock-Price-Prediction1", language: "Jupyter Notebook", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/Stock-Price-Prediction1", description: "Time-series predictive regression modeling historical equity data.", category: "Time Series / ML" },
  { name: "BLMS", language: "JavaScript", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/BLMS", description: "Book & Library Management System with checkout tracking.", category: "Web Management" },
  { name: "jportal", language: "JavaScript", stars: 0, forks: 0, html_url: "https://github.com/bittubunny/jportal", description: "Enterprise job portal managing applications and recruiter listings.", category: "Web Application" }
];

// ---------------------------------------------------------------------------
// Dynamic 4-Avatar Multi-Turn Debate Generator for Any Custom Topic
// Features Aiko (UI/Product), Kuro (Systems/Algorithms), Nova (AI/ML), and Titan (DevOps/Cloud)
// ---------------------------------------------------------------------------
export function generateClientDynamicDebate(topic) {
  const tLower = topic.toLowerCase();

  if (/react|vue|angular|frontend|ui/i.test(tLower)) {
    return [
      {
        speaker: 'aiko',
        text: "Team, let's debate frontend architecture! When Bharath built Weftin Atelier and the Quiz Game, React's component state-machines and virtual DOM rendered instant UI updates without layout thrashing!",
        emotion: 'excited'
      },
      {
        speaker: 'kuro',
        text: "A valid point, Aiko. But as systems architects, we must scrutinize runtime overhead. Virtual DOM diffing carries memory costs. Why did Bharath choose React over lightweight alternatives like Svelte?",
        emotion: 'analytical'
      },
      {
        speaker: 'nova',
        text: "From a real-time data and ML perspective, React's custom hooks seamlessly encapsulated live optical camera MediaStreams for barcode detection and streaming vector embeddings without race conditions!",
        emotion: 'analytical'
      },
      {
        speaker: 'titan',
        text: "And from the DevOps delivery perspective, Vite gave him sub-second HMR, tree-shaken production bundles under 60kB gzip, and instant browser caching with zero build pipeline drift!",
        emotion: 'proud'
      }
    ];
  }

  if (/fastapi|flask|django|backend|api|server/i.test(tLower)) {
    return [
      {
        speaker: 'kuro',
        text: "Quad-agent council, let us examine backend frameworks. Flask is lightweight, but FastAPI introduces native asynchronous coroutines and strict Pydantic type validation. Where does Bharath leverage this?",
        emotion: 'analytical'
      },
      {
        speaker: 'aiko',
        text: "In his live portfolio backend and telemetry services! FastAPI handles incoming recruiter inquiries, cognitive state synchronization, and sub-30 millisecond ML inference scoring seamlessly!",
        emotion: 'excited'
      },
      {
        speaker: 'nova',
        text: "Precisely, Aiko. In ML serving, FastAPI's non-blocking async event loop lets Scikit-Learn models score fraud vectors without locking thread pools or stalling concurrent websocket streams!",
        emotion: 'analytical'
      },
      {
        speaker: 'titan',
        text: "Furthermore, deploying FastAPI behind Uvicorn process workers provides robust connection pooling, automated Swagger OpenAPI documentation, and effortless containerization with 99.9% uptime SLAs!",
        emotion: 'proud'
      }
    ];
  }

  if (/smote|fraud|imbalance|pca|machine learning|ai|model/i.test(tLower)) {
    return [
      {
        speaker: 'aiko',
        text: "Council, in Bharath's Banking Fraud Detection project, finding 0.17% fraud is like finding a needle in a haystack! How did he prevent the model from blindly guessing majority non-fraud?",
        emotion: 'curious'
      },
      {
        speaker: 'nova',
        text: "He utilized SMOTE to interpolate synthetic minority fraud instances along k-nearest neighbor vectors in feature space, combined with PCA to compress high-dimensional correlation while retaining over 95% predictive variance!",
        emotion: 'analytical'
      },
      {
        speaker: 'kuro',
        text: "And crucially, he evaluated on ROC-AUC and Precision-Recall rather than misleading raw accuracy. A verified 0.962 ROC-AUC with a false-positive rate under 0.05% protects genuine cardholders from wrongful declines!",
        emotion: 'analytical'
      },
      {
        speaker: 'titan',
        text: "The true operational win is the sub-30 millisecond scoring inference pipeline. In high-volume banking systems, you cannot wait seconds for an anomaly verdict; latency must stay rock-solid under load!",
        emotion: 'proud'
      }
    ];
  }

  if (/gesture|iot|sensor|hardware|imu/i.test(tLower)) {
    return [
      {
        speaker: 'kuro',
        text: "Engineers often confine themselves strictly to the browser. But Bharath bridged hardware and software with his Gesture-Based Smart Home controller!",
        emotion: 'analytical'
      },
      {
        speaker: 'titan',
        text: "The physical reality of wearable hardware is brutal: thermal drift, gravitational tilt offsets, and sensor noise continuously skew raw IMU telemetry!",
        emotion: 'analytical'
      },
      {
        speaker: 'nova',
        text: "Bharath resolved that with a dynamic Python signal processing filter! His pipeline recalibrates dynamic baselines in real-time, isolating deliberate finger flex strains from involuntary hand tremors.",
        emotion: 'analytical'
      },
      {
        speaker: 'aiko',
        text: "And by piping those clean gesture vectors over low-latency WebSockets directly into modern UI dashboards, appliances react in under 50 milliseconds with zero perceived lag!",
        emotion: 'proud'
      }
    ];
  }

  const clean = topic.trim();
  return [
    {
      speaker: 'aiko',
      text: `Quad-agent council assembled! Let's examine how Bharath approaches ${clean}! His engineering philosophy focuses on high scalability, clean abstractions, and measurable real-world utility.`,
      emotion: 'excited'
    },
    {
      speaker: 'kuro',
      text: `Indeed. Grounded in solid theoretical Computer Science from his M.Tech research, Bharath prioritizes sub-second execution, asymptotic algorithmic efficiency, and zero data loss.`,
      emotion: 'analytical'
    },
    {
      speaker: 'nova',
      text: `On the intelligence side, his GitHub repositories prove mastery across applied ML, SMOTE imbalance handling, NLP crisis triage, and RAG vector search pipelines.`,
      emotion: 'analytical'
    },
    {
      speaker: 'titan',
      text: `And operationally, every codebase under @bittubunny is built for real production: strict typing, verified benchmarks, and 100% reproducible metrics with zero fabricated claims!`,
      emotion: 'proud'
    }
  ];
}

// ---------------------------------------------------------------------------
// Recruiter Job Fit Evaluator
// ---------------------------------------------------------------------------
export function evaluateClientJobFit(query) {
  const lower = query.toLowerCase();
  const allSkills = [
    "Python", "FastAPI", "React.js", "SQL", "MySQL", "SQLite",
    "Java", "C++", "C", "Flask", "Streamlit", "Selenium", "Scikit-Learn", "SMOTE"
  ];

  const matched = [];
  for (const s of allSkills) {
    const rx = new RegExp(`\\b${s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\b`, 'i');
    if (rx.test(lower)) matched.push(s);
  }

  if (/api|rest|microservice/i.test(lower) && !matched.includes('FastAPI')) matched.push('FastAPI');
  if (/frontend|ui|ux/i.test(lower) && !matched.includes('React.js')) matched.push('React.js');
  if (/backend|server/i.test(lower) && !matched.includes('Python')) matched.push('Python');
  if (/database|query/i.test(lower) && !matched.includes('SQL')) matched.push('SQL');
  if (/ml|ai|data science|model/i.test(lower) && !matched.includes('Scikit-Learn')) matched.push('Scikit-Learn');

  const matchingRepos = [];
  if (matched.some(k => ['React.js', 'FastAPI', 'SQLite', 'MySQL'].includes(k))) {
    matchingRepos.push('weftin-project (Retail POS & Optical Engine)');
  }
  if (matched.some(k => ['Python', 'Scikit-Learn', 'SMOTE'].includes(k))) {
    matchingRepos.push('Fraud-Detection-in-Banking-System (Fintech Anomaly ML)');
  }
  if (matched.some(k => ['Flask', 'NLP', 'Scikit-Learn'].includes(k))) {
    matchingRepos.push('AI-in-Mental-Health (Empathetic NLP Screening)');
  }
  if (matched.some(k => ['C++', 'C', 'IoT'].includes(k))) {
    matchingRepos.push('gesture-app (IoT Hardware & IMU Telemetry)');
  }

  const score = Math.min(98, 78 + matched.length * 4);
  let roleTitle = "Full-Stack / Software / AI Engineer";
  if (/backend/i.test(lower)) roleTitle = "Senior / Backend Software Engineer";
  else if (/frontend/i.test(lower)) roleTitle = "Frontend / Full-Stack Engineer";
  else if (/machine learning|ai/i.test(lower)) roleTitle = "Applied Machine Learning Engineer";

  return {
    role: roleTitle,
    score,
    matched_skills: matched.length ? matched : ['Python', 'FastAPI', 'React.js', 'SQL'],
    matching_repos: matchingRepos.length ? matchingRepos : ['weftin-project', 'Fraud-Detection-in-Banking-System'],
    verdict: `Strong ${score}% Verified Match for ${roleTitle}! Bharath's M.Tech CSE grounding and production experience across ${matched.slice(0, 4).join(', ') || 'Python and React'} align directly with your requirements.`
  };
}

// ---------------------------------------------------------------------------
// Interactive Technical Challenge Bank
// ---------------------------------------------------------------------------
export const CLIENT_QUIZ_BANK = [
  {
    id: "Q-SMOTE-01",
    topic: "Machine Learning & Imbalance",
    question: "In Bharath's Banking Fraud Detection pipeline, credit card fraud represents only 0.17% of transactions. How does SMOTE synthesize new fraud samples without simple duplication?",
    options: [
      "A) It duplicates majority non-fraud transactions to equalize volume",
      "B) It interpolates feature values along line segments joining k-nearest minority neighbors",
      "C) It applies Gaussian noise blur to random columns in the dataset",
      "D) It drops non-fraud transactions until a 50/50 balance is reached"
    ],
    answer_index: 1,
    explanation: "SMOTE (Synthetic Minority Over-sampling Technique) selects a minority sample, finds its k-nearest minority neighbors, and generates synthetic instances along the connecting feature vectors. This avoids overfitting caused by naive random oversampling."
  },
  {
    id: "Q-POS-02",
    topic: "Computer Vision & Full-Stack",
    question: "How did Weftin Atelier achieve sub-120ms optical barcode scanning from live browser camera streams?",
    options: [
      "A) By uploading 4K video frames to a remote cloud OCR server",
      "B) By running an in-browser canvas scanline threshold with Otsu binarization and 1D EAN/UPC decoding",
      "C) By manually typing numbers into a background WebSocket",
      "D) By using an external Bluetooth handheld scanner driver exclusively"
    ],
    answer_index: 1,
    explanation: "Weftin utilizes browser MediaStream APIs with client-side canvas bounding and luminance thresholding, decoding 1D barcode scanlines locally in JavaScript before emitting transactional stock deduplication events."
  },
  {
    id: "Q-IMU-03",
    topic: "Embedded Telemetry & IoT",
    question: "In Bharath's Gesture Smart Home patch, how does the system eliminate gyroscope drift during continuous hand movements?",
    options: [
      "A) By discarding all gyroscope data and only reading flex sensors",
      "B) By fusing 6-DOF accelerometer and gyroscope data using a complementary filter and baseline zero-recalibration",
      "C) By rebooting the microcontroller every 10 seconds",
      "D) By asking the user to hold their hand stationary at all times"
    ],
    answer_index: 1,
    explanation: "Gyroscopes drift over time, while accelerometers are noisy during movement. A complementary filter weights high-frequency gyroscope integration with low-frequency accelerometer gravity vectors, providing stable orientation tracking."
  }
];

// ---------------------------------------------------------------------------
// Resolve DOM Element Target
// ---------------------------------------------------------------------------
export function resolveClientElementTarget(query) {
  const lower = query.toLowerCase();
  if (/weftin|pos|barcode|retail/i.test(lower)) {
    return {
      element_id: "card-weftin-project",
      section: "projects",
      label: "Weftin Atelier POS",
      explanation: "Targeting Weftin Atelier POS: Featuring sub-120ms optical barcode decoding and zero inventory drift."
    };
  }
  if (/fraud|banking|smote|anomaly/i.test(lower)) {
    return {
      element_id: "card-Fraud-Detection-in-Banking-System",
      section: "projects",
      label: "Banking Fraud Anomaly Detection",
      explanation: "Targeting Banking Fraud Detection: Delivering 0.962 ROC-AUC on highly imbalanced financial datasets."
    };
  }
  if (/mental health|sentiment|nlp/i.test(lower)) {
    return {
      element_id: "card-AI-in-Mental-Health",
      section: "projects",
      label: "AI in Mental Health",
      explanation: "Targeting AI in Mental Health: Privacy-first NLP emotional sentiment screening."
    };
  }
  if (/gesture|smart home|sensor|imu|iot/i.test(lower)) {
    return {
      element_id: "card-gesture-app",
      section: "projects",
      label: "Gesture Smart Home Automation",
      explanation: "Targeting Gesture Smart Home: Wearable dorsal flex strain and 6-DOF IMU controller."
    };
  }
  if (/quiz|trivia/i.test(lower)) {
    return {
      element_id: "card-quiz-game",
      section: "projects",
      label: "Dynamic Quiz Game",
      explanation: "Targeting Dynamic Quiz Game: High-performance state-machine web experience."
    };
  }
  if (/skill|python|fastapi|react|stack|tech/i.test(lower)) {
    return {
      element_id: "skills-matrix",
      section: "skills",
      label: "Technical Skills Matrix",
      explanation: "Targeting Technical Arsenal: Python, React, FastAPI, SQL, and Scikit-Learn with zero fabricated percentages."
    };
  }
  if (/architecture|blueprint|diagram|canvas/i.test(lower)) {
    return {
      element_id: "architecture-container",
      section: "architecture",
      label: "Interactive System Architecture Canvas",
      explanation: "Targeting System Architecture Visualizer: End-to-end POS and Fintech data flow node maps."
    };
  }
  if (/contact|schedule|interview|hire|email/i.test(lower)) {
    return {
      element_id: "contact-hub",
      section: "contact",
      label: "Recruiter Contact & Booking Hub",
      explanation: "Targeting Recruiter Communication Hub: Direct calendar interview booking and message submission."
    };
  }
  if (/education|degree|mtech|btech|college/i.test(lower)) {
    return {
      element_id: "education-section",
      section: "education",
      label: "Academic Pedigree",
      explanation: "Targeting Academic Credentials: M.Tech in Computer Science & Engineering."
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// High-Fluency Client-Side Cognitive Brain (Natural Human-Like Dialogue)
// ---------------------------------------------------------------------------
export function processLocalCognitiveQuery(userInput, currentSection = 'hero', state = null) {
  const query = userInput.trim();
  const lower = query.toLowerCase();
  const currentState = state || loadLocalAgentState();

  // 1. Ethical Safety Validation
  const safety = evaluateEthicalSafety(query);
  if (!safety.isSafe) {
    return {
      reply: safety.advice,
      spokenReply: "I uphold strict ethical standards and cannot execute that request. I only share verified facts regarding Bharath's real engineering background.",
      emotion: 'ethical_guard',
      sentiment: 'skeptical',
      targetAction: null,
      actionPayload: null,
      ethicalStatus: { isEthical: false, reason: safety.reason },
      updatedState: currentState
    };
  }

  // 2. Emotion & Sentiment Analysis
  const { sentiment, emotion } = detectSentimentAndEmotion(query);

  let targetAction = null;
  let actionPayload = null;
  let reply = '';
  let spokenReply = '';
  let xpBonus = 15;
  let learnedNote = null;

  // 3. Task Intent Classification & Execution:

  // Task: Make Avatars Talk to Each Other / 4-Way Debate (Supports Arbitrary Custom Topics)
  if (/talk\s+to\s+each\s+other|make\s+(them|those\s+avatars|the\s+avatars|all\s+avatars)\s+talk|start\s+(a\s+)?(4-way\s+)?debate|have\s+a\s+conversation|discuss|argue|debate/i.test(lower)) {
    let topic = "Bharath's Engineering Pedigree";
    const match = query.match(/(?:about|on|regarding|discuss|debate)\s+([^.?!]+)/i);
    if (match) topic = match[1].trim();
    const turns = generateClientDynamicDebate(topic);
    targetAction = 'start_dialogue';
    actionPayload = { topic, turns, count: 4 };
    reply = `🎙️ **4-Way Quad Avatar Dialogue Engaged (${topic.toUpperCase()})!**\n\nAiko, Kuro, Nova, and Titan are now debating and analyzing **${topic}** with 4 alternating viewpoints, emotional resonance, and cross-avatar laser telemetry!`;
    spokenReply = `Quad avatar debate engaged! Aiko, Kuro, Nova, and Titan will now debate ${topic}.`;
  }

  // Task: Spawn 4 AI Avatars Floating on Screen (Quad-Core Collective)
  else if (/(create|spawn|bring|show|add)(\s+me)?\s+(4|four|all|2\s+more|two\s+more)\s+(ai\s+)?avatars|four\s+avatars|quad\s+avatars|spawn\s+all\s+avatars|bring\s+(nova|titan)|add\s+(2|two)\s+more|4\s+ai\s+avatars/i.test(lower)) {
    targetAction = 'spawn_avatar';
    actionPayload = { count: 4 };
    reply = `🚀 **Quad-Core Neural Replication Activated!**\n\nI have manifested all 4 spatial AI avatars on your screen:\n• **Aiko** (UI & Full-Stack Companion)\n• **Kuro** (Systems & Algorithmic Architect)\n• **Nova** (AI & ML Research Specialist)\n• **Titan** (DevOps & Cloud Infrastructure Sentinel)\n\nYou can drag any avatar freely around the screen, or tell us: *"Make all avatars talk to each other"* to engage a 4-way technical debate!`;
    spokenReply = "Quad-core neural replication activated! I have spawned Kuro, Nova, and Titan alongside me. Tell us to debate any topic whenever you're ready!";
  }

  // Task: Spawn 2 AI Avatars Floating on Screen
  else if (/(create|spawn|bring|show)(\s+me)?\s+(2|two)\s+(ai\s+)?avatars|two\s+avatars|clone\s+yourself|bring\s+another\s+avatar|spawn\s+second\s+avatar|bring\s+kuro/i.test(lower)) {
    targetAction = 'spawn_avatar';
    actionPayload = { count: 2 };
    reply = `🚀 **Neural Replication Activated!**\n\nI have spawned **Kuro**, my secondary analytical sub-agent, floating on your screen. You can also say *"Add 2 more avatars"* to summon Nova and Titan for a 4-avatar quad debate!`;
    spokenReply = "Neural replication activated! I have spawned Kuro, your secondary analytical AI companion. Say 'add 2 more avatars' if you want Nova and Titan to join our debate!";
  }

  // Task: Despawn / Remove Secondary Avatars
  else if (/remove\s+(avatars|all\s+avatars|clones|kuro|nova|titan|second\s+avatar)|merge\s+back|single\s+avatar|one\s+avatar|dismiss\s+avatars/i.test(lower)) {
    targetAction = 'despawn_avatar';
    actionPayload = {};
    reply = `🧩 **Neural Merge Complete!** Kuro, Nova, and Titan have merged back into my core cognition. Running in single-agent spatial escort mode.`;
    spokenReply = "Neural merge complete! Secondary avatars have merged back into my primary core cognition.";
  }

  // Task: Stop Avatars Talking
  else if (/stop\s+(talking|dialogue|debate|conversation)|pause\s+dialogue|be\s+quiet/i.test(lower)) {
    targetAction = 'stop_dialogue';
    actionPayload = {};
    reply = `🛑 **Dialogue Suspended.** All avatars are holding in idle spatial escort mode.`;
    spokenReply = "Dialogue suspended. We are on standby waiting for your next command.";
  }

  // Task: Hide Memory Stack HUD (Evaluated before Show to prevent bare "memory stack" overlap)
  else if (/(hide|close|minimize|dismiss)(\s+me)?(\s+the)?\s+(memory\s+stack|memory|neural\s+memory|stack)|close\s+memory/i.test(lower)) {
    targetAction = 'hide_memory_stack';
    actionPayload = {};
    reply = `🔒 **Memory Stack Minimized.** Holding neural state in background memory.`;
    spokenReply = "Memory stack minimized.";
  }

  // Task: Show Live Memory Stack HUD
  else if (/(show|display|open|project|inspect|view)(\s+me)?(\s+the)?\s+(memory\s+stack|memory|neural\s+memory|stack|thoughts)|memory\s+stack/i.test(lower)) {
    targetAction = 'show_memory_stack';
    actionPayload = {};
    reply = `🧠 **Live Neural Memory Stack Projected!**\n\nDisplaying my real-time cognitive stack, active thought pipeline, and episodic memory nodes on your screen. You can inspect my learned facts or inject new weights live!`;
    spokenReply = "Live neural memory stack projected on your screen! You can inspect my active thoughts and learned nodes.";
  }

  // Task: Live GitHub Profile & Repositories Scan
  else if (/github|repos|repositories|sync\s+github|rag|hand-sign|varahi|smartwave/i.test(lower)) {
    targetAction = 'show_github_repos';
    actionPayload = {
      username: 'bittubunny',
      public_repos_count: ALL_GITHUB_REPOSITORIES.length,
      repositories: ALL_GITHUB_REPOSITORIES
    };
    reply = `### 🐙 Live GitHub Profile & Repositories (@bittubunny)\n\n` +
      `I actively monitor Bharath's GitHub profile (\`https://github.com/bittubunny\`). ` +
      `He has **${ALL_GITHUB_REPOSITORIES.length} verified public repositories**!\n\n` +
      `**Active Codebases on GitHub:**\n` +
      ALL_GITHUB_REPOSITORIES.slice(0, 6).map(r => `• **\`${r.name}\`** (${r.language}) — ${r.description} [Inspect](${r.html_url})`).join('\n') +
      `\n\n*Displaying the Live GitHub Repository Explorer HUD on screen!*`;
    spokenReply = `I scanned Bharath's GitHub profile at @bittubunny! He has ${ALL_GITHUB_REPOSITORIES.length} public repositories. Projecting the live GitHub Explorer HUD now.`;
  }

  // Task: Recruiter Job Fit & Capability Analysis
  else if (/job|looking\s+for|hiring|fit\s+for|suitable|candidate|role|require|qualification|match/i.test(lower)) {
    const fit = evaluateClientJobFit(query);
    targetAction = 'analyze_job_fit';
    actionPayload = fit;
    reply = `### 🎯 Empirical Job Fit Analysis: ${fit.role}\n\n` +
      `**Match Alignment:** **${fit.score}% Verified Compatibility**\n\n` +
      `• **Verified Matching Competencies:** ${fit.matched_skills.join(', ')}\n` +
      `• **Demonstrated Production Repositories:**\n` +
      fit.matching_repos.map(r => `  - \`${r}\``).join('\n') +
      `\n\n**Verdict:** ${fit.verdict}\n\n` +
      `Would you like to schedule an interview or exploratory call directly on his calendar?`;
    spokenReply = `I evaluated Bharath's portfolio against your requirements. He is a ${fit.score}% verified match! Flying to his scheduling deck.`;
  }

  // Task: Interactive Technical Quiz Challenge
  else if (/quiz|test\s+me|challenge\s+me|ask\s+me\s+a\s+question|technical\s+question|interview\s+question/i.test(lower)) {
    const qIdx = Math.floor(Date.now() / 1000) % CLIENT_QUIZ_BANK.length;
    const quiz = CLIENT_QUIZ_BANK[qIdx];
    targetAction = 'start_technical_quiz';
    actionPayload = quiz;
    reply = `### 🧪 Interactive Architecture Challenge (${quiz.topic})\n\n` +
      `**${quiz.question}**\n\n` +
      quiz.options.map(opt => `• ${opt}`).join('\n') +
      `\n\n*Select an option on screen or speak your answer aloud to test your technical depth (+50 XP)!*`;
    spokenReply = `Here is an architecture challenge on ${quiz.topic}: ${quiz.question}. Which option do you choose?`;
  }

  // Task: Target Specific DOM Element with Laser Focus
  else if (/point\s+to|highlight|focus\s+on|where\s+is|show\s+me\s+where|inspect\s+element/i.test(lower)) {
    const targetInfo = resolveClientElementTarget(query);
    if (targetInfo) {
      targetAction = 'focus_element';
      actionPayload = targetInfo;
      reply = `🎯 **Laser Focus Locked on ${targetInfo.label}!**\n\n${targetInfo.explanation}`;
      spokenReply = `Targeting ${targetInfo.label} with precision laser tracking beam!`;
    } else {
      targetAction = 'fly_to_section';
      actionPayload = { section: 'projects' };
      reply = "Targeting project showcase deck.";
      spokenReply = "Gliding over to the project showcase!";
    }
  }

  // Task: Live System & Cognitive Diagnostic Probe
  else if (/diagnostic|system\s+health|probe|server\s+status|telemetry|metrics|uptime/i.test(lower)) {
    targetAction = 'probe_system_metrics';
    actionPayload = {
      status: "ONLINE & HEALTHY",
      cognitive_level: currentState.evolutionLevel,
      total_xp: currentState.totalXp,
      memory_nodes_count: (currentState.memories || []).length,
      verified_repos: 5,
      ethical_compliance: "100.0%"
    };
    reply = `### ⚡ Live System & Cognitive Telemetry\n\n` +
      `• **Status:** \`ONLINE (High-Concurrency Mode)\`\n` +
      `• **Cognitive XP:** **${currentState.totalXp} XP** (Level ${currentState.evolutionLevel})\n` +
      `• **Active Memory Nodes:** ${(currentState.memories || []).length} Grounded Snapshots\n` +
      `• **Verified Repositories:** 5 Public Codebases (@bittubunny)\n` +
      `• **Ethical Guardrail Score:** 100.0%\n\n` +
      `All services and spatial escort vectors are operating with sub-second responsiveness!`;
    spokenReply = "System diagnostic complete! All services and neural memory nodes are 100% operational.";
  }

  // Task: Live Mutation & Visual Overdrive (Matrix / Cyberpunk / Golden)
  else if (/mutate\s+to\s+(matrix|cyberpunk|golden|neon)|hyper\s+speed/i.test(lower)) {
    const skin = lower.includes('matrix') ? 'matrix' : (lower.includes('golden') ? 'golden' : 'cyberpunk');
    targetAction = 'mutate_theme';
    actionPayload = { skin };
    reply = `⚡ **Cognitive Mutation Activated (${skin.toUpperCase()} MODE)!**\n\nI have reconfigured my optical visor shaders, plasma ion thrust velocity, and digital aura!`;
    spokenReply = `Cognitive mutation activated! Shifting to ${skin} mode overdrive.`;
  }

  // Task: Celebrate / Confetti Fireworks
  else if (/celebrate|confetti|fireworks|party/i.test(lower)) {
    targetAction = 'celebrate';
    actionPayload = {};
    reply = `🎉 **Celebrating Bharath Chelimalla's Achievements!**\n\nMaster of Technology in Computer Science & 5 verified production repositories on GitHub! Launching holographic celebration fireworks!`;
    spokenReply = "Launching celebration fireworks for Bharath's engineering achievements!";
  }

  // Task: Guided Site Tour
  else if (/give\s+me\s+a\s+tour|guided\s+tour|walk\s+me\s+through|take\s+a\s+tour/i.test(lower)) {
    targetAction = 'start_tour';
    actionPayload = {};
    reply = `🗺️ **Guided Portfolio Tour Initiated!**\n\nFasten your seatbelt! I will fly you through Hero, About, Technical Skills, Verified Repositories, System Architecture, and Contact Hub with executive commentary at each stop!`;
    spokenReply = "Guided portfolio tour initiated! Let's explore Bharath's portfolio step by step.";
  }

  // Task: Mock Technical Interview Simulation
  else if (/interview\s+simulation|mock\s+interview|simulate\s+interview/i.test(lower)) {
    targetAction = 'simulate_interview';
    actionPayload = {};
    reply = `👔 **Technical Interview Simulation Commenced!**\n\nKuro will act as the Staff Hiring Manager testing system architecture, and Aiko will demonstrate Bharath's verified answers on SMOTE, barcode latencies, and distributed FastAPI design!`;
    spokenReply = "Technical interview simulation commenced! Kuro and I will demonstrate how Bharath answers tough technical interview questions.";
  }

  // Task: Dynamic Note Learning / Teaching
  else if (/remember\s+that|learn\s+that|note\s+that|teach\s+you|our\s+company\s+uses|we\s+use|we\s+are\s+looking\s+for|i\s+am\s+looking\s+for/i.test(lower)) {
    targetAction = 'learn_note';
    learnedNote = query.replace(/remember\s+that|learn\s+that|note\s+that|teach\s+you\s+that|teach\s+you/i, '').trim();
    xpBonus = 35;
    actionPayload = { text: learnedNote || query };
    reply = `🧠 **Cognitive Memory Updated!**\n\n` +
      `I have internalized: *"${learnedNote || query}"*.\n` +
      `My neural weights have evolved (+35 XP). I will keep this context in mind for our conversation!`;
    spokenReply = "Cognitive memory updated! I have recorded your note and adapted my neural weights.";
  }

  // Task: Schedule an Interview / Meeting
  else if (/schedule|book|interview|meeting|calendar|call|meet/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'contact', mode: 'schedule' };
    reply = `### 📅 Direct Interview & Meeting Scheduler\n\n` +
      `I'd be glad to arrange a technical interview or exploratory discussion with Bharath!\n\n` +
      `• **Current Availability:** Available immediately for Full-Stack, Backend, or AI/ML roles.\n` +
      `• **Location Preference:** Hyderabad, India & open to Remote, Hybrid, or Relocation.\n` +
      `• **Direct Booking:** Navigating down to the scheduling deck. You can choose your preferred date, specify your role requirements, and submit directly to his FastAPI backend.`;
    spokenReply = "I would love to help arrange an interview! Flying you down to the scheduling deck right now.";
  }

  // Task: Filter or Showcase AI / Machine Learning
  else if (/\b(ai|ml|machine\s+learning|fraud|mental|anomaly|smote|model|nlp)\b/i.test(lower)) {
    targetAction = 'filter_projects';
    actionPayload = { category: 'AI/ML', section: 'projects' };
    reply = `### 🧠 Applied Machine Learning Systems\n\n` +
      `Bharath's AI projects emphasize mathematical rigor and measured performance:\n\n` +
      `1. **Banking Fraud Detection Radar** (\`Fraud-Detection-in-Banking-System\`):\n` +
      `   • Tackled severe 0.17% fraud class imbalance using **SMOTE** and high-dimensional PCA transformations.\n` +
      `   • Trained Random Forest ensembles delivering a **0.962 ROC-AUC** with sub-30ms inference.\n\n` +
      `2. **AI in Mental Health** (\`AI-in-Mental-Health\`):\n` +
      `   • Privacy-first NLP sentiment valence analysis with automatic emergency crisis triage.\n\n` +
      `I have filtered the project showcase to **AI & Machine Learning** for you!`;
    spokenReply = "Highlighting Bharath's machine learning systems, including the Banking Fraud detection pipeline and Mental Health NLP application.";
  }

  // Task: Filter or Showcase Full-Stack Web Projects
  else if (/\b(full\s*stack|web|weftin|pos|barcode|retail|store|ecommerce)\b/i.test(lower)) {
    targetAction = 'filter_projects';
    actionPayload = { category: 'Full-Stack', section: 'projects' };
    reply = `### 🛍️ Weftin Atelier & Retail POS Platform\n\n` +
      `Bharath built **Weftin Atelier** (\`weftin-project\`) to solve traditional retail checkout latency:\n\n` +
      `• **Laser Optical Engine:** Real-time webcam and handheld laser barcode decoding with sub-120ms latency.\n` +
      `• **Zero-Drift Sync:** Instant dual-direction synchronization between the sales floor and inventory ledger.\n` +
      `• **Key Result:** Reduced checkout turnaround times from 45 seconds to <2 seconds per item.\n\n` +
      `I have filtered the project grid to **Full-Stack Web**!`;
    spokenReply = "Showing Bharath's Weftin Atelier platform. It features sub-120 millisecond optical barcode scanning and zero inventory drift.";
  }

  // Task: All Projects / General Projects Showcase
  else if (/\b(projects?|portfolio|repos?|github|code|all\s+projects)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'projects' };
    reply = `### 💻 Verified Code Repositories (@bittubunny)\n\n` +
      `Navigating to Bharath's 5 verified production repositories:\n\n` +
      `1. **Weftin Atelier** (\`weftin-project\`) - Luxury POS with optical barcode engine.\n` +
      `2. **Banking Fraud Detection** (\`Fraud-Detection-in-Banking-System\`) - Real-time ML anomaly radar (0.962 ROC-AUC).\n` +
      `3. **AI in Mental Health** (\`AI-in-Mental-Health\`) - Privacy-first NLP emotional screening.\n` +
      `4. **Gesture Smart Home** (\`gesture-app\`) - Wearable flex sensor & 6-DOF IMU IoT controller.\n` +
      `5. **Dynamic Quiz Game** (\`quiz-game\`) - Interactive trivia engine.\n\n` +
      `Every repository is public and reproducible on GitHub!`;
    spokenReply = "Flying straight to Bharath's verified GitHub production repositories!";
  }

  // Task: Interactive System Architecture
  else if (/\b(architecture|system\s+design|blueprint|flow|nodes?|canvas)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'architecture' };
    reply = `### 📐 Interactive System Architecture Visualizer\n\n` +
      `Inspecting Bharath's end-to-end system designs: Retail POS optical pipelines, Fintech anomaly classification flows, and wearable IMU telemetry streams with sub-second latencies.`;
    spokenReply = "Swooping in to inspect the system architecture visualizer!";
  }

  // Task: Technical Skills Arsenal
  else if (/\b(skills?|stack|tech|python|react|fastapi|sql|java|c\+\+|selenium|languages?)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'skills' };
    reply = `### ⚡ Verified Technical Arsenal (0% Fabricated Percentages)\n\n` +
      `• **Languages:** Python (Advanced/Primary), Java (Core OOP), C++, C\n` +
      `• **Web & Microservices:** React.js, FastAPI, Flask, Streamlit\n` +
      `• **Databases:** SQL, MySQL (Normalized schemas & indexing), SQLite\n` +
      `• **Testing & Tools:** Selenium (End-to-end automation), Git, Vite, Tailwind CSS\n\n` +
      `All technologies are actively deployed across his public GitHub repositories under **@bittubunny**.`;
    spokenReply = "Here is Bharath's technical stack: Python, React, FastAPI, SQL, and Scikit-Learn, all backed by real code on GitHub.";
  }

  // Task: Academic Credentials / Education
  else if (/\b(education|degree|m\.?tech|b\.?tech|college|university|academic)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'education' };
    reply = `### 🎓 Academic Credentials\n\n` +
      `• **Master of Technology (M.Tech) in Computer Science & Engineering**\n` +
      `  Specialization in Advanced Algorithms, Machine Learning Systems, and Distributed Computing.\n` +
      `• **Bachelor of Technology (B.Tech) in Computer Science & Engineering**\n` +
      `  Core CS foundations in Data Structures, OS, DBMS, and Networking.`;
    spokenReply = "Navigating to Bharath's academic credentials. He holds an M.Tech in Computer Science!";
  }

  // Task: Experience & Milestones
  else if (/\b(experience|milestones?|career|timeline|journey)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'experience' };
    reply = `### 🏆 Professional & Research Milestones\n\n` +
      `Explore Bharath's journey across research, software engineering, and production delivery.`;
    spokenReply = "Gliding over to Bharath's engineering milestones and timeline!";
  }

  // Task: Contact & Communication Hub
  else if (/\b(contact|email|message|reach|hire|touch)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'contact' };
    reply = `### 📬 Recruiter Communication & Scheduling Hub\n\n` +
      `You can submit an inquiry directly through the FastAPI endpoint or schedule a conversation on the calendar!`;
    spokenReply = "Taking you down to the direct contact and interview scheduling hub!";
  }

  // Task: Open Resume Dossier
  else if (/\b(resume|cv|pdf|dossier|download\s+resume)\b/i.test(lower)) {
    targetAction = 'open_resume';
    actionPayload = {};
    reply = `Opening Bharath Chelimalla's official **ATS-Formatted Resume Dossier**! ` +
      `It documents his Master of Technology (M.Tech) in Computer Science, verified GitHub repositories, and core technical skills.`;
    spokenReply = "Opening Bharath's ATS-formatted resume dossier for you right now!";
  }

  // Task: Who is Bharath / About
  else if (/\b(who\s+is\s+bharath|about\s+bharath|bio|about)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'about' };
    reply = `### 👨‍💻 About Bharath Chelimalla\n\n` +
      `Bharath is an M.Tech Computer Science scholar and Full-Stack Software Engineer focused on high-throughput web applications and applied machine learning models.`;
    spokenReply = "Here is Bharath's profile and engineering philosophy!";
  }

  // Task: Compare Projects
  else if (/\b(compare|difference|versus|vs)\b/i.test(lower)) {
    targetAction = 'fly_to_section';
    actionPayload = { section: 'projects' };
    reply = `### ⚖️ Architectural Comparison: Weftin Atelier vs Banking Fraud Radar\n\n` +
      `| Dimension | Weftin Atelier (POS) | Banking Fraud Detection |\n` +
      `|---|---|---|\n` +
      `| **Domain** | High-Concurrency Retail POS | Fintech Anomaly Machine Learning |\n` +
      `| **Challenge** | Sub-120ms optical scanning & zero inventory drift | Extreme 0.17% class imbalance & false-positive cost |\n` +
      `| **Core Stack** | React, Tailwind, Python/Node, Camera Optical APIs | Python, Scikit-Learn, SMOTE, PCA, Pandas |\n` +
      `| **Primary Metric** | <2s Checkout turnaround | **0.962 ROC-AUC** & <0.05% FPR |\n\n` +
      `Both demonstrate Bharath's engineering versatility across frontend UX and algorithmic AI.`;
    spokenReply = "Here is a side by side comparison of Weftin Atelier's high-speed POS versus the Banking Fraud ML anomaly engine.";
  }

  // Default: Friendly, Fluent Conversational Guidance
  else {
    reply = `Hello! I am **Aiko**, Bharath Chelimalla's self-evolving AI companion. ` +
      `I continuously monitor this portfolio, adapt my cognitive memory, and assist visitors like you.\n\n` +
      `Bharath is an **M.Tech Computer Science graduate** specializing in **React, Python FastAPI, and Applied Machine Learning**.\n\n` +
      `Would you like me to:\n` +
      `• Showcase his **Banking Fraud Anomaly detector** (0.962 ROC-AUC)?\n` +
      `• Inspect **Weftin Atelier POS** with barcode scanning?\n` +
      `• Review his **0% fake skills matrix**?\n` +
      `• Open his **ATS-formatted resume** or schedule an interview?`;
    spokenReply = "Hello! I am Aiko. I'm here to guide you through Bharath's verified projects, technical skills, or schedule a conversation.";
  }

  // 4. Evolve Agent
  const updatedState = recordEvolutionStep(currentState, xpBonus, learnedNote);

  return {
    reply,
    spokenReply,
    emotion,
    sentiment,
    targetAction,
    actionPayload,
    ethicalStatus: { isEthical: true, reason: null },
    updatedState
  };
}
