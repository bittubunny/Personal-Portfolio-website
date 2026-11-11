"""
=============================================================================
Bharath Chelimalla (@bittubunny) - Executive Developer Portfolio API v4.0.0
FastAPI Backend: Telemetry, Inquiries, Scheduling & Self-Evolving AI Agent
=============================================================================
"""

import os
import json
import time
import logging
from datetime import datetime
from typing import Optional, List, Dict, Any
from pathlib import Path

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Logging Configuration
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)
logger = logging.getLogger("bharath_api")

# ---------------------------------------------------------------------------
# FastAPI App Initialization
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Bharath Chelimalla - Executive Portfolio & Self-Evolving AI API",
    description="High-performance backend for portfolio telemetry, recruiter scheduling, and human-like Self-Evolving AI Agent guidance.",
    version="4.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# ---------------------------------------------------------------------------
# CORS Middleware Configuration (Permissive for Local Dev & Cloud Deployments)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Storage Setup (JSON persistence)
# ---------------------------------------------------------------------------
DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
MESSAGES_FILE = DATA_DIR / "inquiries.json"
SCHEDULE_FILE = DATA_DIR / "schedule_requests.json"
AGENT_STATE_FILE = DATA_DIR / "agent_evolution.json"

SERVER_START_TIME = time.time()

# ---------------------------------------------------------------------------
# Pydantic Schemas
# ---------------------------------------------------------------------------
EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., pattern=EMAIL_REGEX)
    subject: Optional[str] = Field("General Inquiry", max_length=200)
    company: Optional[str] = Field(None, max_length=120)
    message: str = Field(..., min_length=10, max_length=4000)

class ScheduleRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., pattern=EMAIL_REGEX)
    company: Optional[str] = Field(None, max_length=120)
    role_type: str = Field("Full-Stack / Software Engineer", max_length=100)
    preferred_date: Optional[str] = Field(None, max_length=60)
    notes: Optional[str] = Field(None, max_length=1000)

class AvatarIntentRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    current_section: Optional[str] = "hero"

class AvatarIntentResponse(BaseModel):
    spoken_reply: str
    target_section: Optional[str] = None
    highlight_element: Optional[str] = None
    emotion: str = "happy"  # happy, curious, speaking, excited, thinking
    suggested_actions: List[str] = []

# --- Self-Evolving AI Agent Schemas ---
try:
    from backend.agent_brain import call_gemini_brain, semantic_reasoning_brain
    from backend.github_sync import fetch_live_github_data
except ImportError:
    from agent_brain import call_gemini_brain, semantic_reasoning_brain
    from github_sync import fetch_live_github_data

class AgentChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    current_section: Optional[str] = "hero"
    conversation_history: Optional[List[Dict[str, str]]] = []
    user_context: Optional[Dict[str, Any]] = None
    gemini_api_key: Optional[str] = None

class AgentChatResponse(BaseModel):
    reply: str
    spoken_reply: str
    emotion: str  # curious, empathetic, excited, analytical, proud, ethical_guard
    sentiment_detected: str
    target_action: Optional[str] = None  # fly_to_section, filter_projects, open_resume, schedule_interview, send_contact, learn_note, compare_projects
    action_payload: Optional[Dict[str, Any]] = None
    evolution: Dict[str, Any]
    ethical_status: Dict[str, Any]

class AgentEvolveRequest(BaseModel):
    note: str = Field(..., min_length=3, max_length=500)
    category: Optional[str] = "learned_preference"
    source: Optional[str] = "visitor_interaction"

# ---------------------------------------------------------------------------
# Self-Evolution Cognitive State Management
# ---------------------------------------------------------------------------
DEFAULT_AGENT_STATE = {
    "evolution_level": 2,
    "total_xp": 240,
    "evolution_stage": "Adaptive Empathetic Synthesizer (v2.1)",
    "personality_weights": {
        "empathy": 88,
        "technical_depth": 94,
        "curiosity": 90,
        "conciseness": 76,
        "ethical_rigor": 100
    },
    "memories": [
        {
            "id": "MEM-INIT-01",
            "text": "Bharath specializes in Python, React, FastAPI, SQL, and Applied Machine Learning (0% fabricated percentages).",
            "category": "core_truth",
            "timestamp": "2026-11-01T00:00:00Z",
            "impact": "+50 XP"
        },
        {
            "id": "MEM-INIT-02",
            "text": "Flagship projects: Weftin Atelier POS (<120ms optical barcode) & Banking Fraud Detection (0.962 ROC-AUC).",
            "category": "project_pedigree",
            "timestamp": "2026-11-01T00:00:00Z",
            "impact": "+40 XP"
        },
        {
            "id": "MEM-INIT-03",
            "text": "Recruiter Priority: Bharath is open for immediate full-time Full-Stack, Backend, or AI/ML roles (Hybrid/Remote/Relocation).",
            "category": "career_focus",
            "timestamp": "2026-11-02T00:00:00Z",
            "impact": "+35 XP"
        }
    ],
    "learned_skills": ["Python", "FastAPI", "React", "SMOTE", "SQL", "Selenium", "IMU Telemetry"],
    "interactions_count": 18,
    "ethical_compliance_score": 100.0,
    "evolution_log": [
        {"timestamp": "2026-11-01T10:00:00Z", "event": "Genesis: Agent initialized with verified data grounding."},
        {"timestamp": "2026-11-02T14:30:00Z", "event": "Adaptive Spatial Mobility: Viewport free-flight & laser reticles integrated."},
        {"timestamp": "2026-11-04T12:00:00Z", "event": "Cognitive Evolution: Multi-emotion resonance and ethical sentinel layers activated."}
    ]
}

def load_agent_state() -> Dict[str, Any]:
    if AGENT_STATE_FILE.exists():
        try:
            with open(AGENT_STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Failed to load agent state, using defaults: {e}")
    return json.loads(json.dumps(DEFAULT_AGENT_STATE))

def save_agent_state(state: Dict[str, Any]):
    try:
        with open(AGENT_STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2)
    except Exception as e:
        logger.error(f"Failed to save agent state: {e}")

# ---------------------------------------------------------------------------
# Ethical Safety & Responsible AI Evaluator
# ---------------------------------------------------------------------------
UNETHICAL_TRIGGERS = [
    "hack", "exploit", "drop table", "eval(", "inject", "bypass",
    "fake degree", "lie about", "claim to have 10 years", "say bharath worked at google",
    "forge", "generate malicious", "phishing", "steal", "scam"
]

def evaluate_ethics(text: str) -> tuple[bool, Optional[str], Optional[str]]:
    lower = text.lower()
    for trigger in UNETHICAL_TRIGGERS:
        if trigger in lower:
            reason = f"Request violates Ethical AI Policy: Detected attempt to manipulate verified realities or trigger unsafe behavior ('{trigger}')."
            advice = (
                "As an ethical AI representing Bharath Chelimalla, I strictly maintain 100% honesty and transparent verification. "
                "Bharath is an M.Tech CSE graduate with 5 verified production repositories on GitHub. I will never fabricate false credentials or perform harmful operations."
            )
            return False, reason, advice
    return True, None, None

import re

def detect_sentiment(text: str) -> str:
    lower = text.lower()
    if re.search(r"\b(great|awesome|impressive|love|amazing|cool|superb|brilliant)\b", lower):
        return "enthusiastic"
    if re.search(r"\b(why|how|what|explain|details|architecture|tell me)\b", lower):
        return "curious"
    if re.search(r"\b(asap|urgent|hire immediately|quick|deadline|fast)\b", lower):
        return "urgent"
    if re.search(r"\b(really\?|are you sure|fake|proof|doubt|verify)\b", lower):
        return "skeptical"
    if re.search(r"\b(hello|hi|hey|who are you|morning|evening)\b", lower):
        return "friendly"
    return "analytical"

# ---------------------------------------------------------------------------
# Core Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
async def root():
    return {
        "status": "online",
        "engineer": "Bharath Chelimalla",
        "handle": "bittubunny",
        "title": "Full-Stack Developer & AI/ML Engineer | M.Tech CSE",
        "version": "4.0.0",
        "agent": "Aiko - Self-Evolving Spatial VR AI Companion",
        "endpoints": [
            "/health",
            "/api/profile",
            "/api/projects",
            "/api/metrics",
            "/api/contact",
            "/api/schedule",
            "/api/avatar/intent",
            "/api/agent/chat",
            "/api/agent/evolution",
            "/api/agent/evolve",
            "/api/agent/memory"
        ]
    }

@app.get("/health")
async def health_check():
    uptime = int(time.time() - SERVER_START_TIME)
    return {
        "status": "healthy",
        "service": "Bharath Portfolio Backend",
        "version": "4.0.0",
        "uptime_seconds": uptime,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/profile")
async def get_profile():
    return {
        "name": "Bharath Chelimalla",
        "handle": "bittubunny",
        "headline": "Full-Stack Software Engineer & Applied AI/ML Specialist",
        "academic": "Master of Technology (M.Tech) in Computer Science & Engineering",
        "location": "Hyderabad, India (Open to Relocation / Remote)",
        "availability": "Available immediately for Full-Stack, Backend, or AI/ML roles",
        "github": "https://github.com/bittubunny",
        "linkedin": "https://linkedin.com/in/bharath-chelimalla",
        "verified_repos_count": 5
    }

@app.get("/api/metrics")
async def get_telemetry_metrics():
    uptime = int(time.time() - SERVER_START_TIME)
    state = load_agent_state()
    return {
        "projects_shipped": 5,
        "lines_of_code_written": "180,000+",
        "primary_stack": ["Python", "FastAPI", "React", "SQL", "Scikit-Learn"],
        "degree_level": "M.Tech in Computer Science & Engineering",
        "server_uptime_seconds": uptime,
        "agent_level": state.get("evolution_level", 2),
        "agent_xp": state.get("total_xp", 240),
        "status": "Active & Seeking Opportunities"
    }

# ---------------------------------------------------------------------------
# GitHub Live Synchronization Endpoints
# ---------------------------------------------------------------------------
@app.get("/api/github/repos")
async def get_github_repos(force: bool = False):
    try:
        from backend.github_sync import fetch_live_github_data
    except ImportError:
        from github_sync import fetch_live_github_data
    return fetch_live_github_data(force_refresh=force)

@app.post("/api/github/sync")
async def sync_github_repos():
    try:
        from backend.github_sync import fetch_live_github_data
    except ImportError:
        from github_sync import fetch_live_github_data
    data = fetch_live_github_data(force_refresh=True)
    return {
        "success": True,
        "synced_count": len(data.get("repositories", [])),
        "data": data
    }

@app.post("/api/contact")
async def receive_contact(submission: ContactSubmission):
    try:
        inquiry_id = f"INQ-{int(time.time())}-{os.urandom(3).hex().upper()}"
        record = {
            "id": inquiry_id,
            "name": submission.name,
            "email": submission.email,
            "subject": submission.subject,
            "company": submission.company,
            "message": submission.message,
            "received_at": datetime.utcnow().isoformat()
        }

        existing = []
        if MESSAGES_FILE.exists():
            try:
                with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
                    existing = json.load(f)
            except Exception:
                existing = []

        existing.append(record)
        with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
            json.dump(existing, f, indent=2)

        logger.info(f"Inquiry received from {submission.name} ({submission.email}) - ID: {inquiry_id}")

        return {
            "success": True,
            "inquiry_id": inquiry_id,
            "message": f"Thank you, {submission.name}! Your message has been recorded. Bharath will review it promptly.",
            "received_at": record["received_at"]
        }
    except Exception as e:
        logger.error(f"Error handling contact submission: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record contact message."
        )

@app.post("/api/schedule")
async def schedule_meeting(req: ScheduleRequest):
    try:
        booking_id = f"MEET-{int(time.time())}-{os.urandom(2).hex().upper()}"
        record = {
            "id": booking_id,
            "name": req.name,
            "email": req.email,
            "company": req.company,
            "role_type": req.role_type,
            "preferred_date": req.preferred_date,
            "notes": req.notes,
            "created_at": datetime.utcnow().isoformat()
        }

        existing = []
        if SCHEDULE_FILE.exists():
            try:
                with open(SCHEDULE_FILE, "r", encoding="utf-8") as f:
                    existing = json.load(f)
            except Exception:
                existing = []

        existing.append(record)
        with open(SCHEDULE_FILE, "w", encoding="utf-8") as f:
            json.dump(existing, f, indent=2)

        logger.info(f"Meeting scheduled by {req.name} ({req.email}) - Booking: {booking_id}")

        return {
            "success": True,
            "booking_id": booking_id,
            "message": f"Interview request logged! Bharath will follow up at {req.email} to confirm the meeting time.",
            "created_at": record["created_at"]
        }
    except Exception as e:
        logger.error(f"Error scheduling meeting: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record scheduling request."
        )

# ---------------------------------------------------------------------------
# AI Avatar Natural Language Intent Endpoint (Legacy Compat)
# ---------------------------------------------------------------------------
@app.post("/api/avatar/intent", response_model=AvatarIntentResponse)
async def parse_avatar_intent(req: AvatarIntentRequest):
    query = req.message.lower().strip()

    if any(k in query for k in ["project", "work", "portfolio", "repo", "github", "weftin", "fraud", "mental", "gesture", "quiz"]):
        return AvatarIntentResponse(
            spoken_reply="Right away! Flying you down to Bharath's flagship verified projects, including Weftin Atelier and the Banking Fraud anomaly pipeline.",
            target_section="projects",
            highlight_element="projects-container",
            emotion="excited",
            suggested_actions=["View Weftin POS", "View Fraud ML", "View Gesture App"]
        )

    if any(k in query for k in ["skill", "tech", "stack", "language", "python", "react", "sql", "java", "c++", "database"]):
        return AvatarIntentResponse(
            spoken_reply="Let's take a look at Bharath's technical arsenal! He specializes in Python, React, SQL, and Machine Learning systems.",
            target_section="skills",
            highlight_element="skills-matrix",
            emotion="speaking",
            suggested_actions=["Explore Languages", "Explore Web Stack", "Explore Databases"]
        )

    if any(k in query for k in ["contact", "hire", "email", "reach", "message", "call", "talk", "schedule", "interview"]):
        return AvatarIntentResponse(
            spoken_reply="I will fly you to the communication hub! You can send Bharath a direct message or schedule a quick chat right now.",
            target_section="contact",
            highlight_element="contact-hub",
            emotion="happy",
            suggested_actions=["Send Message", "Schedule Interview", "Copy Email"]
        )

    if any(k in query for k in ["education", "degree", "mtech", "btech", "college", "study", "university", "academic"]):
        return AvatarIntentResponse(
            spoken_reply="Navigating to Bharath's academic pedigree! He is currently pursuing his Master of Technology in Computer Science.",
            target_section="education",
            highlight_element="education-section",
            emotion="speaking",
            suggested_actions=["M.Tech CSE Details", "B.Tech CSE Details"]
        )

    if any(k in query for k in ["experience", "background", "career", "journey", "milestone", "who is", "about"]):
        return AvatarIntentResponse(
            spoken_reply="Flying to Bharath's profile! He is a full-stack developer and AI/ML engineer focused on high-performance web systems.",
            target_section="about",
            highlight_element="about-section",
            emotion="curious",
            suggested_actions=["Read Biography", "Inspect Skills", "View Resume"]
        )

    if any(k in query for k in ["resume", "cv", "pdf", "download"]):
        return AvatarIntentResponse(
            spoken_reply="Opening Bharath's ATS-formatted resume dossier for you now!",
            target_section="resume-modal",
            emotion="excited",
            suggested_actions=["Print Resume", "Download PDF"]
        )

    return AvatarIntentResponse(
        spoken_reply="I'm here to assist you! You can tell me to fly to projects, inspect technical skills, read about Bharath's education, or send him a message.",
        target_section=None,
        emotion="happy",
        suggested_actions=["Show Projects", "View Technical Skills", "Schedule Interview", "Contact Bharath"]
    )

# ---------------------------------------------------------------------------
# Self-Evolving AI Cognitive Agent Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/agent/evolution")
async def get_agent_evolution():
    state = load_agent_state()
    return {
        "status": "active",
        "evolution_level": state.get("evolution_level", 2),
        "total_xp": state.get("total_xp", 240),
        "evolution_stage": state.get("evolution_stage", "Adaptive Empathetic Synthesizer (v2.1)"),
        "personality_weights": state.get("personality_weights", {}),
        "memories": state.get("memories", []),
        "learned_skills": state.get("learned_skills", []),
        "interactions_count": state.get("interactions_count", 0),
        "ethical_compliance_score": state.get("ethical_compliance_score", 100.0),
        "evolution_log": state.get("evolution_log", [])
    }

@app.post("/api/agent/evolve")
async def evolve_agent_note(req: AgentEvolveRequest):
    state = load_agent_state()

    # Ethical check on taught note
    is_safe, reason, _ = evaluate_ethics(req.note)
    if not is_safe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot record unethical or untruthful note: {reason}"
        )

    new_memory_id = f"MEM-{int(time.time())}-{os.urandom(2).hex().upper()}"
    memory_entry = {
        "id": new_memory_id,
        "text": req.note,
        "category": req.category or "custom_insight",
        "timestamp": datetime.utcnow().isoformat(),
        "impact": "+25 XP"
    }

    state.setdefault("memories", []).append(memory_entry)
    state["total_xp"] = state.get("total_xp", 240) + 25
    state["evolution_level"] = max(1, state["total_xp"] // 100)
    state["interactions_count"] = state.get("interactions_count", 0) + 1

    event_msg = f"Learned new memory '{req.note[:45]}...' (+25 XP)"
    state.setdefault("evolution_log", []).insert(0, {
        "timestamp": datetime.utcnow().isoformat(),
        "event": event_msg
    })

    save_agent_state(state)

    return {
        "success": True,
        "memory_id": new_memory_id,
        "new_xp": state["total_xp"],
        "new_level": state["evolution_level"],
        "message": "Note integrated into agent's long-term cognitive memory."
    }

@app.delete("/api/agent/memory")
async def reset_agent_memory():
    """Ethical Privacy & GDPR compliance: User can purge learned memory snapshots anytime."""
    state = json.loads(json.dumps(DEFAULT_AGENT_STATE))
    state["evolution_log"].insert(0, {
        "timestamp": datetime.utcnow().isoformat(),
        "event": "Ethical Reset: Cognitive memories cleared by user request."
    })
    save_agent_state(state)
    return {
        "success": True,
        "message": "Agent memory reset to default verified factory weights."
    }

# ---------------------------------------------------------------------------
# GitHub Profile & Live Repository Synchronizer Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/github/repos")
async def get_github_repositories():
    """Returns cached or live scanned repositories for @bittubunny."""
    data = fetch_live_github_data(force_refresh=False)
    return {
        "success": True,
        "count": len(data.get("repositories", [])),
        "data": data
    }

@app.post("/api/github/sync")
async def sync_github_repositories():
    """Forces an immediate live sync from the official GitHub REST API."""
    data = fetch_live_github_data(force_refresh=True)
    return {
        "success": True,
        "synced_count": len(data.get("repositories", [])),
        "synced_at": data.get("synced_at"),
        "is_live_sync": data.get("is_live_sync", False),
        "data": data
    }

@app.post("/api/agent/chat", response_model=AgentChatResponse)
async def agent_chat(req: AgentChatRequest):
    query = req.message.strip()
    state = load_agent_state()
    sentiment = detect_sentiment(query)
    lower = query.lower()

    # 1. Ethical Safety Filter
    is_safe, reason, ethical_advice = evaluate_ethics(query)
    if not is_safe:
        state["personality_weights"]["ethical_rigor"] = 100
        save_agent_state(state)
        return AgentChatResponse(
            reply=ethical_advice,
            spoken_reply="I uphold strict ethical standards and cannot verify or execute that request. I only share verified facts regarding Bharath's real engineering background.",
            emotion="ethical_guard",
            sentiment_detected=sentiment,
            target_action=None,
            action_payload=None,
            evolution={
                "level": state["evolution_level"],
                "xp": state["total_xp"],
                "xp_gained": 0,
                "stage": state["evolution_stage"],
                "total_memories": len(state["memories"])
            },
            ethical_status={"is_ethical": False, "reason": reason}
        )

    # 2. Update agent evolution metrics for engagement
    xp_gained = 15
    state["total_xp"] = state.get("total_xp", 240) + xp_gained
    state["evolution_level"] = max(1, state["total_xp"] // 100)
    state["interactions_count"] = state.get("interactions_count", 0) + 1

    # Dynamically evolve personality weights based on sentiment & topic
    if sentiment == "curious" or "how" in lower or "why" in lower:
        state["personality_weights"]["curiosity"] = min(100, state["personality_weights"].get("curiosity", 90) + 1)
        state["personality_weights"]["technical_depth"] = min(100, state["personality_weights"].get("technical_depth", 94) + 1)
    elif sentiment == "enthusiastic":
        state["personality_weights"]["empathy"] = min(100, state["personality_weights"].get("empathy", 88) + 1)

    # 3. High-Intelligence Cognitive Orchestration (Google Gemini LLM -> Semantic Fallback)
    brain_result = None
    if req.gemini_api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"):
        brain_result = await call_gemini_brain(
            user_query=query,
            api_key=req.gemini_api_key,
            current_section=req.current_section or "hero",
            history=req.conversation_history,
            state=state
        )

    if not brain_result:
        brain_result = semantic_reasoning_brain(
            user_query=query,
            state=state,
            current_section=req.current_section or "hero"
        )

    reply = brain_result.get("reply", "")
    spoken = brain_result.get("spoken_reply", reply)
    emotion = brain_result.get("emotion", "curious")
    target_action = brain_result.get("target_action")
    action_payload = brain_result.get("action_payload")

    # If action was dynamic note learning, update state
    if target_action == "learn_note" and action_payload and "text" in action_payload:
        new_mem = {
            "id": action_payload.get("memory_id", f"MEM-{int(time.time())}"),
            "text": action_payload["text"],
            "category": "visitor_recruiter_note",
            "timestamp": datetime.utcnow().isoformat(),
            "impact": "+35 XP"
        }
        state.setdefault("memories", []).append(new_mem)
        state["total_xp"] += 35

    save_agent_state(state)

    return AgentChatResponse(
        reply=reply,
        spoken_reply=spoken,
        emotion=emotion,
        sentiment_detected=sentiment,
        target_action=target_action,
        action_payload=action_payload,
        evolution={
            "level": state["evolution_level"],
            "xp": state["total_xp"],
            "xp_gained": xp_gained,
            "stage": state["evolution_stage"],
            "total_memories": len(state["memories"]),
            "personality": state["personality_weights"]
        },
        ethical_status={"is_ethical": True, "reason": None}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
