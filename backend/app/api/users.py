"""User and gamification API endpoints"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.models.db import get_db
from app.services.gamification import get_leaderboard, get_user_stats
from app.services.auth import get_user_by_id

router = APIRouter(tags=["users"])


@router.get("/leaderboard")
def leaderboard(
    timeframe: str = "all_time",
    region: str = "global",
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get leaderboard rankings"""
    return get_leaderboard(db, timeframe, region, limit)


@router.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user profile and statistics"""
    try:
        stats = get_user_stats(db, user_id)
        return stats
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
