import os
import sys
import json
from pathlib import Path

# Configure utf-8 stdout for Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

import main
from main import (
    ContactMessageRequest,
    MESSAGES_FILE
)

def run_tests():
    print("=" * 60)
    print("⛩️ RUNNING ANIME GUILD BACKEND TEST SUITE")
    print("=" * 60)

    # 1. Test Root
    root_res = main.root()
    assert "Guild" in root_res["guild"]
    print("✓ [GET /] Guild gatehouse root returned status:", root_res["status"])

    # 2. Test Health Check
    health = main.health_check()
    assert health.status == "healthy"
    print(f"✓ [GET /health] Status: {health.status} | Guild: {health.guild} | Version: {health.version}")

    # 3. Test Character Sheet
    char = main.get_character_sheet()
    assert char["name"] == "Bharath Chelimalla"
    assert char["level"] == 24
    print(f"✓ [GET /api/character-sheet] Character: {char['name']} | Class: {char['class']} | Level: {char['level']}")

    # 4. Test Quests Board
    quests = main.get_quests()
    assert len(quests) >= 5
    print(f"✓ [GET /api/quests] Verified {len(quests)} completed guild quests")

    # 5. Test Gacha Summon
    gacha = main.pull_gacha()
    assert gacha["success"] is True
    print(f"✓ [POST /api/gacha/pull] Summoned [{gacha['item']['rarity']}] {gacha['item']['name']}")

    # 6. Test Lo-Fi Playlist
    lofi = main.get_lofi_playlist()
    assert len(lofi["tracks"]) >= 3
    print(f"✓ [GET /api/lofi-playlist] Station: {lofi['station']}")

    # 7. Test Contact Form Submission
    test_contact = ContactMessageRequest(
        name="Asuka Langley",
        email="asuka@nerv.jp",
        subject="Urgent S-Rank Software Project",
        message="Bharath, we require your full-stack Sorcery and ML skills for our pilot engineering team."
    )
    contact_res = main.submit_contact_form(test_contact)
    assert contact_res.success is True
    assert "GUILD-Q" in contact_res.quest_token
    print(f"✓ [POST /api/contact] Courier delivered! Quest Token: {contact_res.quest_token}")

    print("=" * 60)
    print("🎉 ALL ANIME GUILD BACKEND TESTS PASSED WITH 100% SUCCESS!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
