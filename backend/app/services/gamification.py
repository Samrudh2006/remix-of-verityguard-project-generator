"""Gamification service for points, badges, and leaderboard"""
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Dict
from datetime import datetime
from app.models import User, UserBadge, Badge, UserRank, LeaderboardCache
import json


def award_points(db: Session, user_id: int, points: int, reason: str = "") -> User:
    """
    Award points to a user and update their rank
    
    Args:
        db: Database session
        user_id: User ID
        points: Points to award
        reason: Reason for awarding points
        
    Returns:
        Updated user object
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError(f"User {user_id} not found")
    
    user.points += points
    
    # Update rank based on points
    if user.points >= 10000:
        user.rank = UserRank.VERIFIED_GUARDIAN
    elif user.points >= 5000:
        user.rank = UserRank.PLATINUM
    elif user.points >= 1500:
        user.rank = UserRank.GOLD
    elif user.points >= 500:
        user.rank = UserRank.SILVER
    else:
        user.rank = UserRank.BRONZE
    
    db.commit()
    db.refresh(user)
    
    # Check for badge eligibility
    check_and_award_badges(db, user)
    
    return user


def check_and_award_badges(db: Session, user: User) -> List[Badge]:
    """
    Check if user is eligible for any badges and award them
    
    Args:
        db: Database session
        user: User object
        
    Returns:
        List of newly awarded badges
    """
    # Get all badges
    all_badges = db.query(Badge).all()
    
    # Get user's current badges
    user_badge_ids = [ub.badge_id for ub in user.badges]
    
    newly_awarded = []
    
    for badge in all_badges:
        # Skip if user already has this badge
        if badge.id in user_badge_ids:
            continue
        
        # Check eligibility based on points
        if badge.required_points > 0 and user.points >= badge.required_points:
            user_badge = UserBadge(user_id=user.id, badge_id=badge.id)
            db.add(user_badge)
            newly_awarded.append(badge)
    
    if newly_awarded:
        db.commit()
    
    return newly_awarded


def get_leaderboard(
    db: Session,
    timeframe: str = "all_time",
    region: str = "global",
    limit: int = 100
) -> List[Dict]:
    """
    Get leaderboard rankings
    
    Args:
        db: Database session
        timeframe: Time period (all_time, weekly, monthly)
        region: Region filter (global or specific)
        limit: Number of users to return
        
    Returns:
        List of user rankings
    """
    # Check cache first
    cache = db.query(LeaderboardCache).filter(
        LeaderboardCache.timeframe == timeframe,
        LeaderboardCache.region == region
    ).first()
    
    # Use cache if recent (within 5 minutes)
    if cache:
        cache_age = (datetime.utcnow() - cache.updated_at).total_seconds()
        if cache_age < 300:  # 5 minutes
            return json.loads(cache.cached_json)
    
    # Query leaderboard
    query = db.query(User).filter(User.points > 0)
    
    # Order by points descending
    query = query.order_by(desc(User.points))
    
    # Limit results
    users = query.limit(limit).all()
    
    # Format leaderboard
    leaderboard = []
    for rank, user in enumerate(users, 1):
        leaderboard.append({
            "rank": rank,
            "user_id": user.id,
            "name": user.name,
            "avatar_url": user.avatar_url,
            "points": user.points,
            "rank_tier": user.rank.value,
            "badge_count": len(user.badges)
        })
    
    # Update cache
    cache_json = json.dumps(leaderboard)
    if cache:
        cache.cached_json = cache_json
        cache.updated_at = datetime.utcnow()
    else:
        cache = LeaderboardCache(
            region=region,
            timeframe=timeframe,
            cached_json=cache_json
        )
        db.add(cache)
    
    db.commit()
    
    return leaderboard


def get_user_stats(db: Session, user_id: int) -> Dict:
    """
    Get detailed statistics for a user
    
    Args:
        db: Database session
        user_id: User ID
        
    Returns:
        User statistics dictionary
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError(f"User {user_id} not found")
    
    # Get user's rank on leaderboard
    higher_ranked = db.query(func.count(User.id)).filter(User.points > user.points).scalar()
    leaderboard_rank = higher_ranked + 1
    
    # Get badges
    badges = [
        {
            "id": ub.badge.id,
            "name": ub.badge.name,
            "description": ub.badge.description,
            "icon_url": ub.badge.icon_url,
            "awarded_at": ub.awarded_at.isoformat()
        }
        for ub in user.badges
    ]
    
    # Points to next rank
    rank_thresholds = {
        UserRank.BRONZE: 500,
        UserRank.SILVER: 1500,
        UserRank.GOLD: 5000,
        UserRank.PLATINUM: 10000,
        UserRank.VERIFIED_GUARDIAN: None
    }
    
    next_rank_points = rank_thresholds.get(user.rank)
    points_to_next = next_rank_points - user.points if next_rank_points else 0
    
    return {
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "avatar_url": user.avatar_url,
        "points": user.points,
        "rank": user.rank.value,
        "leaderboard_rank": leaderboard_rank,
        "badges": badges,
        "badge_count": len(badges),
        "points_to_next_rank": max(0, points_to_next),
        "created_at": user.created_at.isoformat()
    }
