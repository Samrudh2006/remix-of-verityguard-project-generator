from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime

router = APIRouter()

class AnalyticsOverview(BaseModel):
    total_users: int
    total_articles: int
    total_verifications: int
    avg_trust_score: float
    active_users_today: int

class TrendingClaim(BaseModel):
    claim: str
    count: int
    avg_trust_score: float

@router.get("/overview", response_model=AnalyticsOverview)
async def get_analytics_overview():
    """Get overall platform analytics."""
    return {
        "total_users": 12458,
        "total_articles": 3892,
        "total_verifications": 8745,
        "avg_trust_score": 87.5,
        "active_users_today": 1247
    }

@router.get("/trending", response_model=List[TrendingClaim])
async def get_trending_claims(limit: int = 10):
    """Get trending claims."""
    return [
        {"claim": "Climate change acceleration", "count": 245, "avg_trust_score": 89.5},
        {"claim": "Quantum computing breakthrough", "count": 189, "avg_trust_score": 78.2},
        {"claim": "New vaccine efficacy data", "count": 167, "avg_trust_score": 92.1},
        {"claim": "AI language model capabilities", "count": 143, "avg_trust_score": 85.7},
    ]

@router.get("/user-activity")
async def get_user_activity(days: int = 7):
    """Get user activity over time."""
    return {
        "period_days": days,
        "daily_active_users": [1200, 1350, 1180, 1420, 1390, 1247, 1305],
        "verifications_per_day": [850, 920, 780, 1050, 980, 890, 940]
    }

@router.get("/trust-score-distribution")
async def get_trust_score_distribution():
    """Get distribution of trust scores."""
    return {
        "ranges": {
            "0-20": 45,
            "20-40": 123,
            "40-60": 589,
            "60-80": 1247,
            "80-100": 1888
        }
    }
