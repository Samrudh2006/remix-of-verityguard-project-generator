from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    email: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    points: int
    level: int
    streak_days: int
    created_at: datetime

# Mock user data
mock_users = [
    {
        "id": 1,
        "username": "johndoe",
        "email": "john@example.com",
        "points": 2450,
        "level": 12,
        "streak_days": 15,
        "created_at": datetime.utcnow()
    }
]

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Create a new user."""
    new_user = {
        "id": len(mock_users) + 1,
        **user.dict(),
        "points": 0,
        "level": 1,
        "streak_days": 0,
        "created_at": datetime.utcnow()
    }
    mock_users.append(new_user)
    return new_user

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """Get user by ID."""
    user = next((u for u in mock_users if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/{user_id}/stats")
async def get_user_stats(user_id: int):
    """Get detailed user statistics."""
    user = next((u for u in mock_users if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        **user,
        "total_verifications": 127,
        "badges_earned": 8,
        "accuracy_rate": 94.5,
        "contributions_this_week": 23
    }
