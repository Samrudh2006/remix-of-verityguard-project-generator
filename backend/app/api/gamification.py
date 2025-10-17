from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

class UserStats(BaseModel):
    user_id: int
    username: str
    points: int
    level: int
    streak_days: int
    badges_count: int

class Badge(BaseModel):
    id: int
    name: str
    description: str
    icon: str

class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    points: int
    badges: int
    streak: int

# Mock data
mock_leaderboard = [
    {"rank": 1, "username": "Alex Johnson", "points": 15420, "badges": 12, "streak": 45},
    {"rank": 2, "username": "Maria Garcia", "points": 14850, "badges": 10, "streak": 38},
    {"rank": 3, "username": "Chen Wei", "points": 13920, "badges": 11, "streak": 42},
    {"rank": 4, "username": "Sarah Ahmed", "points": 12450, "badges": 9, "streak": 30},
    {"rank": 5, "username": "John Smith", "points": 11890, "badges": 8, "streak": 28},
]

mock_badges = [
    {"id": 1, "name": "First Verification", "description": "Complete your first fact check", "icon": "🏆"},
    {"id": 2, "name": "Streak Master", "description": "Maintain a 7-day streak", "icon": "🔥"},
    {"id": 3, "name": "Truth Seeker", "description": "Verify 100 claims", "icon": "⭐"},
]

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(period: str = "all-time", limit: int = 10):
    """Get leaderboard rankings."""
    return mock_leaderboard[:limit]

@router.get("/badges", response_model=List[Badge])
async def get_badges():
    """Get all available badges."""
    return mock_badges

@router.post("/award-points")
async def award_points(user_id: int, points: int, reason: str):
    """Award points to a user."""
    return {
        "user_id": user_id,
        "points_awarded": points,
        "reason": reason,
        "timestamp": datetime.utcnow()
    }

@router.post("/check-streak")
async def check_user_streak(user_id: int):
    """Check and update user streak."""
    # Mock implementation
    return {
        "user_id": user_id,
        "current_streak": 5,
        "streak_updated": True,
        "bonus_points": 10
    }
