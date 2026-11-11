"""
=============================================================================
Bharath Chelimalla (@bittubunny) - GitHub Live Data Collector & Intelligence
Directly syncs live repositories, commit activity, and metadata from GitHub
=============================================================================
"""

import os
import time
import json
import logging
import urllib.request
from typing import Dict, Any, List, Optional
from pathlib import Path

logger = logging.getLogger("bharath_github_sync")

GITHUB_USERNAME = "bittubunny"
GITHUB_USER_API = f"https://api.github.com/users/{GITHUB_USERNAME}"
GITHUB_REPOS_API = f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100&sort=updated"

DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
CACHE_FILE = DATA_DIR / "github_cache.json"

CACHE_TTL_SECONDS = 3600  # 1 hour cache to respect GitHub unauthenticated rate limits (60/hr)

# Curated fallback dataset matching exact live GitHub response for offline resilience
DEFAULT_FALLBACK_REPOS = [
    {
        "name": "varahi-delivery-app",
        "description": "Android mobile delivery application built with Kotlin.",
        "language": "Kotlin",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/varahi-delivery-app",
        "pushed_at": "2026-11-03T07:42:51Z",
        "category": "Mobile App"
    },
    {
        "name": "weftin-project",
        "description": "Luxury atelier retail POS platform with <120ms optical camera barcode decoding and zero inventory drift.",
        "language": "JavaScript",
        "stars": 1,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/weftin-project",
        "pushed_at": "2026-10-27T18:02:10Z",
        "category": "Full-Stack Web"
    },
    {
        "name": "quiz-game",
        "description": "Dynamic state-machine gamified trivia engine with countdown multipliers.",
        "language": "JavaScript",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/quiz-game",
        "pushed_at": "2026-10-26T15:37:17Z",
        "category": "Web Experience"
    },
    {
        "name": "RAG_Implementation",
        "description": "Retrieval-Augmented Generation (RAG) system with semantic document chunking, embeddings, and vector search.",
        "language": "Python",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/RAG_Implementation",
        "pushed_at": "2026-05-04T13:19:43Z",
        "category": "Applied AI"
    },
    {
        "name": "AI-in-Mental-Health",
        "description": "Privacy-first sentiment valence analysis and NLP mental health screening with crisis triage routing.",
        "language": "Jupyter Notebook",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/AI-in-Mental-Health",
        "pushed_at": "2026-03-24T17:28:41Z",
        "category": "Applied AI"
    },
    {
        "name": "gesture-app",
        "description": "Wearable IoT dorsal hand patch controller with flex strain sensors and 6-DOF IMU gyroscopes.",
        "language": "JavaScript",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/gesture-app",
        "pushed_at": "2026-01-29T17:35:14Z",
        "category": "IoT / Embedded"
    },
    {
        "name": "SmartWave",
        "description": "Intelligent automated wave telemetry and audio/signal processing platform.",
        "language": "Python",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/SmartWave",
        "pushed_at": "2025-01-03T15:37:35Z",
        "category": "Signal Processing"
    },
    {
        "name": "Fraud-Detection-in-Banking-System",
        "description": "Enterprise-grade real-time transaction anomaly detector achieving 0.962 ROC-AUC on 0.17% class imbalance using SMOTE & PCA.",
        "language": "Jupyter Notebook",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/Fraud-Detection-in-Banking-System",
        "pushed_at": "2024-11-20T10:58:43Z",
        "category": "Machine Learning"
    },
    {
        "name": "DetectFraud-Streamlit-App",
        "description": "Interactive web dashboard built with Streamlit for real-time banking fraud classification.",
        "language": "Jupyter Notebook",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/DetectFraud-Streamlit-App",
        "pushed_at": "2024-11-20T10:46:27Z",
        "category": "Data & ML Web Apps"
    },
    {
        "name": "Hand-Sign-Language-Recognition",
        "description": "Computer vision and deep learning model translating American Sign Language hand gestures into text.",
        "language": "Python",
        "stars": 1,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/Hand-Sign-Language-Recognition",
        "pushed_at": "2024-09-04T12:37:50Z",
        "category": "Computer Vision"
    },
    {
        "name": "Stock-Price-Prediction1",
        "description": "Time-series predictive regression modeling historical equity data and volatility patterns.",
        "language": "Jupyter Notebook",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/Stock-Price-Prediction1",
        "pushed_at": "2024-07-29T05:44:22Z",
        "category": "Time Series / ML"
    },
    {
        "name": "BLMS",
        "description": "Full-stack Book & Library Management System with automated borrower checkout tracking.",
        "language": "JavaScript",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/BLMS",
        "pushed_at": "2026-07-12T09:52:02Z",
        "category": "Web Management"
    },
    {
        "name": "jportal",
        "description": "Enterprise job portal application managing candidate applications and recruiter listings.",
        "language": "JavaScript",
        "stars": 0,
        "forks": 0,
        "html_url": "https://github.com/bittubunny/jportal",
        "pushed_at": "2025-12-29T15:55:30Z",
        "category": "Web Application"
    }
]

def fetch_live_github_data(force_refresh: bool = False) -> Dict[str, Any]:
    """Fetches live GitHub profile and repository metadata with disk caching."""
    now = time.time()

    # Check cache first if not forced
    if not force_refresh and CACHE_FILE.exists():
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                cached = json.load(f)
                if now - cached.get("cached_at", 0) < CACHE_TTL_SECONDS:
                    return cached["data"]
        except Exception as e:
            logger.warning(f"Error reading GitHub cache: {e}")

    headers = {
        "User-Agent": "Bharath-Portfolio-AI-Agent/4.0",
        "Accept": "application/vnd.github.v3+json"
    }
    pat = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if pat:
        headers["Authorization"] = f"token {pat}"

    try:
        # 1. Fetch user profile
        user_req = urllib.request.Request(GITHUB_USER_API, headers=headers)
        with urllib.request.urlopen(user_req, timeout=8) as res:
            user_data = json.loads(res.read().decode())

        # 2. Fetch repos
        repos_req = urllib.request.Request(GITHUB_REPOS_API, headers=headers)
        with urllib.request.urlopen(repos_req, timeout=10) as res:
            raw_repos = json.loads(res.read().decode())

        processed_repos = []
        for r in raw_repos:
            processed_repos.append({
                "name": r.get("name"),
                "description": r.get("description") or "Open-source software repository",
                "language": r.get("language") or "Code",
                "stars": r.get("stargazers_count", 0),
                "forks": r.get("forks_count", 0),
                "html_url": r.get("html_url"),
                "pushed_at": r.get("pushed_at"),
                "updated_at": r.get("updated_at"),
                "created_at": r.get("created_at")
            })

        payload = {
            "username": GITHUB_USERNAME,
            "name": user_data.get("name", "Bharath Chelimalla"),
            "avatar_url": user_data.get("avatar_url"),
            "html_url": user_data.get("html_url"),
            "bio": user_data.get("bio", "Full-Stack Developer & AI/ML Engineer"),
            "public_repos_count": len(processed_repos),
            "followers": user_data.get("followers", 0),
            "following": user_data.get("following", 0),
            "synced_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "is_live_sync": True,
            "repositories": processed_repos
        }

        # Save to cache
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump({"cached_at": now, "data": payload}, f, indent=2)

        logger.info(f"Successfully synced {len(processed_repos)} repositories from GitHub for @{GITHUB_USERNAME}")
        return payload

    except Exception as e:
        logger.warning(f"Live GitHub fetch unavailable ({e}), using verified local repository knowledge base.")

        # Fallback to rich offline dataset
        payload = {
            "username": GITHUB_USERNAME,
            "name": "Bharath Chelimalla",
            "avatar_url": "https://avatars.githubusercontent.com/u/108507850?v=4",
            "html_url": f"https://github.com/{GITHUB_USERNAME}",
            "bio": "M.Tech Computer Science Scholar | Full-Stack & AI/ML Engineer",
            "public_repos_count": len(DEFAULT_FALLBACK_REPOS),
            "followers": 1,
            "following": 0,
            "synced_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "is_live_sync": False,
            "repositories": DEFAULT_FALLBACK_REPOS
        }
        return payload

def get_repo_details(repo_name: str) -> Optional[Dict[str, Any]]:
    """Gets details of a specific repository by name."""
    data = fetch_live_github_data()
    repos = data.get("repositories", [])
    target = repo_name.lower().strip()
    for r in repos:
        if r["name"].lower() == target or target in r["name"].lower():
            return r
    return None

