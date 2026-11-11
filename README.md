# 🚀 Bharath Chelimalla (@bittubunny) — Executive Full-Stack & AI/ML Portfolio v3.0

> **Full-Stack Software Engineer & Applied AI/ML Specialist | M.Tech Computer Science Scholar**  
> An ultra-modern, widescreen executive portfolio engineered for technical recruiters and hiring managers. Features edge-to-edge full-display layouts, Bharath's photo showcase with live upload support, an interactive System Architecture Explorer, a speaking AI Voice Avatar companion that monitors screen activity and flies across the screen, and a FastAPI backend with interview scheduling.

---

## 🌟 Key Highlights & Professional Features

### 1. 🖥️ Edge-to-Edge Widescreen Layout
- **100% Screen Utilization:** Eliminates narrow boxed container margins, scaling dynamically across laptops, widescreen, and 4K displays (`w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32`).
- **Sleek Executive Aesthetic:** Dark slate obsidian (`#070a12`, `#0c1220`) with electric sky blue (`#38bdf8`), cyan, and emerald accents. Supports 1-click light mode.

### 2. 🤖 Aiko — Cute AI Voice Avatar Companion ([`AiAvatarCompanion.jsx`](frontend/src/components/AiAvatarCompanion.jsx))
- **Speaks Aloud in Human Voice:** Uses browser `window.speechSynthesis` to talk to users out loud (with instant Mute/Unmute audio toggle & subtitle speech bubble).
- **Physical Screen Flight Navigation:** When asked for projects, skills, contact, or architecture, Aiko physically animates/flies across the screen, smooth-scrolls the window, and casts a glowing highlight ring on the section!
- **Continuous Screen Activity Monitoring:** Tracks the user's scroll position and proactively explains sections as they come into view (e.g. announcing the 5 verified GitHub repos when reaching Projects).
- **Voice Microphone & Quick Pills:** Supports Web Speech Recognition microphone voice input and 1-click navigation pills ("Show Projects", "View Skills", "Schedule Chat", "Education").

### 3. 📸 Bharath's Picture Showcase ([`Hero.jsx`](frontend/src/components/Hero.jsx))
- Prominent executive portrait card with glowing rim light and glass plate.
- **Interactive Photo Customizer:** Allows uploading any local personal photo (`.png`, `.jpg`, `.webp`) or pasting an image URL, persisted in `localStorage`.

### 4. 📐 Interactive System Architecture Explorer ([`ArchitectureCanvas.jsx`](frontend/src/components/ArchitectureCanvas.jsx))
- Interactive node visualizer for real-world system designs:
  - *Atelier Real-Time POS Barcode Architecture* (`<120ms` optical decode)
  - *Fintech Anomaly ML Pipeline with SMOTE Balancing* (`0.962 ROC-AUC`)
  - *Wearable IoT 6-DOF IMU Telemetry Flow* (Real-time sensor stream)

### 5. 📅 Recruiter Scheduling & Communication Hub ([`Contact.jsx`](frontend/src/components/Contact.jsx))
- **Interview Scheduler:** Recruiter booking form connected to FastAPI `POST /api/schedule` (company, role, preferred date/time, notes).
- **Direct Dispatch:** Direct message form connected to FastAPI `POST /api/contact`.

---

## 📂 5 Verified GitHub Repositories (@bittubunny)

| Project | Category | Verified Stack | Problem & Architectural Solution |
|---|---|---|---|
| [**weftin-project**](https://github.com/bittubunny/weftin-project) | Full-Stack Retail POS | React, Tailwind, Python, Barcode Scanner, SQLite/MySQL | Eliminates manual SKU entry via optical webcam barcode detection, synchronizing stockroom inventory with POS billing. |
| [**AI-in-Mental-Health**](https://github.com/bittubunny/AI-in-Mental-Health) | Applied AI & NLP | Python, NLP, Scikit-Learn, Flask, React | Privacy-first sentiment analysis and emotion screening with zero tracking and automated crisis helpline triage. |
| [**Fraud-Detection-in-Banking-System**](https://github.com/bittubunny/Fraud-Detection-in-Banking-System) | Anomaly Detection | Python, Scikit-Learn, Pandas, SMOTE, REST APIs | Real-time banking fraud classification pipeline balancing extreme minority class distributions (**0.962 ROC-AUC**, &lt;0.05% FPR). |
| [**gesture-app**](https://github.com/bittubunny/gesture-app) | Wearable IoT & Hardware | Python, Flex Sensors, 6-DOF IMU, React Dashboard | Wearable dorsal hand patch capturing finger flexion and 3D kinematics to control smart appliances hands-free. |
| [**quiz-game**](https://github.com/bittubunny/quiz-game) | Dynamic Web App | React, Tailwind CSS, JavaScript, Local Storage | Gamified single-page state machine featuring timed rounds, multiplier bonuses, and persistent browser scoreboards. |

---

## 🛠️ Verified Technical Arsenal (0% Arbitrary Percentages)

- **Languages:** Python (Primary / Advanced), Java (Core OOP), C++ (Algorithms & Systems), C (Low-Level Systems), SQL
- **Web & Microservices:** React.js (Frontend), FastAPI (Async APIs), Flask, Streamlit (ML Prototypes), HTML5/CSS3
- **Databases & Architecture:** MySQL, SQLite, PostgreSQL, 3NF Schema Normalization, ACID Transactions
- **Tools, Version Control & Testing:** Git & GitHub, GitHub Actions, Selenium WebDriver Automated Testing

---

## 🎓 Academic Credentials

1. **Master of Technology (M.Tech) in Computer Science & Engineering** *(Ongoing Postgraduate Scholar)*
2. **Bachelor of Technology (B.Tech) in Computer Science & Engineering** *(Completed CS Graduate)*

---

## 🚀 Running Locally

### 1. Start the FastAPI Backend
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- Swagger API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

### 2. Start the React Frontend
```bash
cd frontend
npm run dev
```
- Open portfolio in browser: `http://localhost:5173`
- Production build: `npm run build`
