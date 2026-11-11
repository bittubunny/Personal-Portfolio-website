import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Server, Database, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function ArchitectureCanvas() {
  const [activeTab, setActiveTab] = useState('pos');

  const architectures = {
    pos: {
      title: "Real-Time Atelier POS & Barcode Decoding Architecture",
      repo: "weftin-project",
      badge: "High-Concurrency POS",
      latency: "<120ms optical decode",
      nodes: [
        { title: "React 18 SPA Client", role: "Webcam Video Stream + Audio Feedback Hook", color: "sky" },
        { title: "Optical Barcode Engine", role: "ZXing / Dynamic Pattern Recognizer", color: "indigo" },
        { title: "FastAPI / Node Backend", role: "Transactional Ledger + Stock Validator", color: "purple" },
        { title: "Relational DB (MySQL)", role: "ACID Ledger & Inventory Deductions", color: "emerald" },
      ],
      description: "Eliminates human SKU entry delays through continuous camera optical barcode scanning. Deducts stock in strict ACID transactions with printable receipts and zero stock drift."
    },
    fraud: {
      title: "Fintech Anomaly Detection & SMOTE Balancing Pipeline",
      repo: "Fraud-Detection-in-Banking-System",
      badge: "Applied AI / Anomaly Radar",
      latency: "<30ms per vector score",
      nodes: [
        { title: "Transaction Stream", role: "Sub-30ms High-Throughput REST Payload", color: "rose" },
        { title: "SMOTE & Preprocessing", role: "Synthetic Oversampling + Robust Scaling", color: "amber" },
        { title: "Ensemble Classifier", role: "Random Forest & Logistic Inference", color: "indigo" },
        { title: "Audit & Risk Radar", role: "ROC-AUC 0.962 Diagnostic Alert Engine", color: "emerald" },
      ],
      description: "Overcomes severe real-world credit card fraud class imbalances (<0.2% fraud). Evaluates Precision-Recall curves to keep false positive customer alerts below 0.05%."
    },
    iot: {
      title: "Wearable IoT Kinematics & IMU Gesture Telemetry Flow",
      repo: "gesture-app",
      badge: "Embedded Wearable Systems",
      latency: "Real-Time Telemetry Stream",
      nodes: [
        { title: "Dorsal Hand Hardware", role: "5 Flex Strain Sensors + 6-DOF IMU", color: "emerald" },
        { title: "Python Signal Processor", role: "Kalman Filter & Tremor Noise Attenuation", color: "sky" },
        { title: "WebSocket Dispatcher", role: "Event Hub Streaming Joint Angles", color: "indigo" },
        { title: "React Cockpit & Relays", role: "Appliance Actuators & 3D Visualizer", color: "purple" },
      ],
      description: "Integrates hardware-software boundaries using flex sensors and 3D gyroscopic orientation on a wearable dorsal hand patch, translating natural hand gestures into smart device triggers."
    }
  };

  const current = architectures[activeTab];

  return (
    <section id="architecture" className="py-24 relative z-10 w-full border-t border-slate-800/60 bg-slate-950/80">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        
        {/* Header */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <span>// 04. SYSTEM DESIGN &amp; DATA FLOW BLUEPRINTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Interactive System <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Architecture Explorer</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Inspect real-world data flow pipelines and distributed patterns engineered across Bharath's flagship repositories.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('pos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'pos'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-neon-sky'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            🛒 Retail POS Optical Barcode Architecture
          </button>

          <button
            onClick={() => setActiveTab('fraud')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'fraud'
                ? 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            🛡️ Fintech Anomaly ML Pipeline (0.962 ROC-AUC)
          </button>

          <button
            onClick={() => setActiveTab('iot')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'iot'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-neon-emerald'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            ✋ Wearable 6-DOF IMU Sensor Telemetry
          </button>
        </div>

        {/* Interactive Architecture Flow Board */}
        <div id="architecture-container" className="executive-card p-6 sm:p-10 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2.5 mb-1 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                  {current.badge}
                </span>
                <span className="text-slate-500">Repository: github.com/bittubunny/{current.repo}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {current.title}
              </h3>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Target Benchmark: {current.latency}</span>
            </div>
          </div>

          {/* Node Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {current.nodes.map((node, idx) => (
              <div key={idx} className="relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 group hover:border-sky-400/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 font-bold">NODE 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-sky-300 transition-colors">
                    {node.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {node.role}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-sky-400" />
                  <span>Sub-second Pipeline</span>
                </div>
              </div>
            ))}
          </div>

          {/* Description & Technical Summary */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <span className="text-white font-semibold mr-1">Architectural Insight:</span>
            {current.description}
          </div>

        </div>

      </div>
    </section>
  );
}

