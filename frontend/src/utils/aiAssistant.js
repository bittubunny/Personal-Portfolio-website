// ============================================================================
// Grounded AI Portfolio Assistant Engine for Bharath Chelimalla
// Evaluates recruiter inquiries strictly against verified portfolio data
// ============================================================================

import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AI_SUGGESTED_PROMPTS = [
  "What are Bharath's primary technical skills?",
  "Tell me about the Weftin Atelier project",
  "What is Bharath's educational background?",
  "Explain his experience in Machine Learning & Fraud Detection",
  "Is Bharath available for full-time roles?",
  "How can I contact Bharath or view his resume?"
];

/**
 * Answers recruiter queries grounded strictly in Bharath Chelimalla's verified data.
 */
export function queryAiAssistant(userQuestion) {
  const query = userQuestion.toLowerCase().trim();

  // 1. Availability / Hiring / Status
  if (
    query.includes("available") ||
    query.includes("hire") ||
    query.includes("status") ||
    query.includes("looking for") ||
    query.includes("relocate") ||
    query.includes("remote") ||
    query.includes("open to")
  ) {
    return {
      text: `Bharath Chelimalla is **${PORTFOLIO_DATA.personal.statusText}**.\n\n` +
        `• **Availability:** ${PORTFOLIO_DATA.personal.availability}\n` +
        `• **Target Roles:** Full-Stack Developer, Software Engineer, AI/ML Engineer.\n` +
        `• **Location Preference:** Based in Hyderabad, India, and open to Remote, Hybrid, or Relocation.\n\n` +
        `You can reach him directly at [${PORTFOLIO_DATA.personal.email}](mailto:${PORTFOLIO_DATA.personal.email}) or connect on [LinkedIn](${PORTFOLIO_DATA.personal.linkedin}).`,
      action: { label: "Go to Contact Section", href: "#contact" }
    };
  }

  // 2. Weftin Atelier Project
  if (query.includes("weftin") || query.includes("pos") || query.includes("barcode") || query.includes("atelier")) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === "weftin-project");
    return {
      text: `### 🛍️ ${project.title}\n\n` +
        `**Overview:** ${project.summary}\n\n` +
        `• **The Problem:** Traditional retail ateliers suffer from slow manual SKU entry (~45s/item) and inventory drift.\n` +
        `• **Bharath's Approach:** Engineered a full-stack POS application using React and Tailwind with optical barcode scanning via webcam/laser, coupled with a Python/Node backend for real-time stock deductions.\n` +
        `• **Technologies:** ${project.technologies.join(", ")}\n` +
        `• **Key Outcome:** Reduced checkout SKU entry to <2 seconds and achieved zero inventory drift across sales channels.\n\n` +
        `View the verified source code on [GitHub](${project.githubUrl}).`,
      action: { label: "View Project Specs", projectId: "weftin-project" }
    };
  }

  // 3. Fraud Detection Project
  if (query.includes("fraud") || query.includes("banking") || query.includes("anomaly") || query.includes("smote")) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === "Fraud-Detection-in-Banking-System");
    return {
      text: `### 💳 ${project.title}\n\n` +
        `**Overview:** ${project.summary}\n\n` +
        `• **The Problem:** In financial transaction datasets, fraud represents less than 0.2% of transactions. Naive classifiers fail due to extreme class imbalance.\n` +
        `• **Bharath's Approach:** Applied SMOTE (Synthetic Minority Over-sampling), robust feature engineering, and trained Random Forests and logistic classifiers evaluated via Precision-Recall and ROC curves.\n` +
        `• **Technologies:** ${project.technologies.join(", ")}\n` +
        `• **Key Outcome:** Delivered an **ROC-AUC score of 0.962** with a false positive rate under 0.05% and sub-30ms scoring latency.\n\n` +
        `Check out the implementation on [GitHub](${project.githubUrl}).`,
      action: { label: "View Project Specs", projectId: "Fraud-Detection-in-Banking-System" }
    };
  }

  // 4. AI in Mental Health
  if (query.includes("mental") || query.includes("health") || query.includes("sentiment") || query.includes("nlp")) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === "AI-in-Mental-Health");
    return {
      text: `### 🧠 ${project.title}\n\n` +
        `**Overview:** ${project.summary}\n\n` +
        `• **The Problem:** Individuals experiencing emotional distress require early, accessible screening without risking sensitive medical data leakage.\n` +
        `• **Bharath's Approach:** Developed an NLP classification pipeline with Scikit-Learn and Flask that analyzes text sentiment and emotional markers while strictly operating without third-party tracking.\n` +
        `• **Technologies:** ${project.technologies.join(", ")}\n` +
        `• **Safety Mechanism:** Automatically triggers verified crisis hotlines if emergency keywords are detected.\n\n` +
        `Explore the repository on [GitHub](${project.githubUrl}).`,
      action: { label: "View Project Specs", projectId: "AI-in-Mental-Health" }
    };
  }

  // 5. Gesture / IoT Project
  if (query.includes("gesture") || query.includes("iot") || query.includes("hardware") || query.includes("sensor")) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === "gesture-app");
    return {
      text: `### 🖐️ ${project.title}\n\n` +
        `**Overview:** ${project.summary}\n\n` +
        `• **The Problem:** Voice and touchscreen home controllers are inaccessible for users with mobility or speech impairments.\n` +
        `• **Bharath's Approach:** Designed a wearable dorsal hand patch using flex strain sensors and a 6-DOF IMU. Signal processing in Python filters noise and baseline drift, broadcasting classified gestures to a React cockpit.\n` +
        `• **Technologies:** ${project.technologies.join(", ")}\n` +
        `• **Key Outcome:** Created a hands-free device control system with sub-60ms response latency.\n\n` +
        `Inspect the codebase on [GitHub](${project.githubUrl}).`,
      action: { label: "View Project Specs", projectId: "gesture-app" }
    };
  }

  // 6. Education / M.Tech / B.Tech / University
  if (
    query.includes("education") ||
    query.includes("degree") ||
    query.includes("m.tech") ||
    query.includes("b.tech") ||
    query.includes("graduate") ||
    query.includes("college") ||
    query.includes("university") ||
    query.includes("academic")
  ) {
    const mtech = PORTFOLIO_DATA.education[0];
    const btech = PORTFOLIO_DATA.education[1];
    return {
      text: `### 🎓 Academic Credentials of Bharath Chelimalla\n\n` +
        `1. **${mtech.degree}** (${mtech.period})\n` +
        `   • Status: ${mtech.status}\n` +
        `   • Specialization: Advanced Algorithms, Machine Learning Systems, Distributed Architectures.\n\n` +
        `2. **${btech.degree}** (${btech.period})\n` +
        `   • Status: ${btech.status}\n` +
        `   • Foundation: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks.\n\n` +
        `Bharath combines deep theoretical Computer Science rigor with practical production web delivery.`,
      action: { label: "View Education Section", href: "#education" }
    };
  }

  // 7. Skills & Tech Stack
  if (
    query.includes("skill") ||
    query.includes("language") ||
    query.includes("stack") ||
    query.includes("python") ||
    query.includes("react") ||
    query.includes("java") ||
    query.includes("sql") ||
    query.includes("selenium")
  ) {
    return {
      text: `### ⚡ Technical Skills Matrix\n\n` +
        `Bharath's verified skills organized by category (no fabricated percentages):\n\n` +
        `• **Programming Languages:** Python (Primary/Advanced), Java (Core OOP), C++, C\n` +
        `• **Web & Frameworks:** React.js (Frontend), Flask (Backend APIs), Streamlit (ML Prototyping)\n` +
        `• **Databases:** SQL, MySQL (Schema normalization, indexing), SQLite (Embedded stores)\n` +
        `• **Tools & Testing:** Git & GitHub (Daily workflow), Selenium (Automated testing & scraping)\n\n` +
        `Each skill has been applied in his public GitHub repositories under **@bittubunny**.`,
      action: { label: "View Technical Skills", href: "#skills" }
    };
  }

  // 8. Contact & Resume
  if (
    query.includes("contact") ||
    query.includes("resume") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("reach") ||
    query.includes("linkedin") ||
    query.includes("cv")
  ) {
    return {
      text: `### 📬 Connect with Bharath Chelimalla\n\n` +
        `• **Email:** [${PORTFOLIO_DATA.personal.email}](mailto:${PORTFOLIO_DATA.personal.email})\n` +
        `• **GitHub:** [@${PORTFOLIO_DATA.personal.handle}](${PORTFOLIO_DATA.personal.github})\n` +
        `• **LinkedIn:** [linkedin.com/in/bharath-chelimalla](${PORTFOLIO_DATA.personal.linkedin})\n` +
        `• **Location:** ${PORTFOLIO_DATA.personal.location}\n\n` +
        `You can submit an inquiry through the interactive FastAPI contact form or download his resume dossier directly.`,
      action: { label: "Download Resume / Contact", href: "#contact" }
    };
  }

  // 9. All Projects Overview
  if (query.includes("project") || query.includes("repo") || query.includes("portfolio") || query.includes("work")) {
    return {
      text: `### 💻 Bharath's 5 Verified GitHub Projects:\n\n` +
        `1. **Weftin Atelier** (\`weftin-project\`): Luxury digital atelier with camera barcode scanning and automated invoicing.\n` +
        `2. **AI in Mental Health** (\`AI-in-Mental-Health\`): Privacy-first NLP emotion screening and crisis triage.\n` +
        `3. **Banking Fraud Detection** (\`Fraud-Detection-in-Banking-System\`): Real-time financial transaction anomaly detection (0.962 ROC-AUC).\n` +
        `4. **Gesture Smart Home** (\`gesture-app\`): Wearable dorsal hand flex sensor and 6-DOF IMU device controller.\n` +
        `5. **Interactive Quiz Game** (\`quiz-game\`): React dynamic trivia engine with category banks and countdown bonuses.\n\n` +
        `All code is open-source and hosted on [GitHub @bittubunny](${PORTFOLIO_DATA.personal.github}).`,
      action: { label: "Explore Projects Section", href: "#projects" }
    };
  }

  // Fallback / General Summary
  return {
    text: `Bharath Chelimalla is a Computer Science graduate currently pursuing his **M.Tech in CSE**, specializing in Full-Stack Web Development (React, Python FastAPI/Flask) and Applied Machine Learning.\n\n` +
      `He has developed 5 verified projects on GitHub spanning retail POS systems, sentiment analysis AI, fintech fraud detection, and wearable IoT.\n\n` +
      `Try asking:\n` +
      `• *"Tell me about his Fraud Detection project"*\n` +
      `• *"What are his strongest skills?"*\n` +
      `• *"Is he available for hire?"*`,
    action: { label: "View Projects", href: "#projects" }
  };
}

