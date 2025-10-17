"""Database models for VerityGuard"""
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()


class UserRank(str, enum.Enum):
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"
    PLATINUM = "platinum"
    VERIFIED_GUARDIAN = "verified_guardian"


class ArticleStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    UNVERIFIED = "unverified"
    FLAGGED = "flagged"


class ReportStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    password_hash = Column(String(255), nullable=False)
    locale = Column(String(10), default="en")
    avatar_url = Column(String(500), nullable=True)
    points = Column(Integer, default=0)
    rank = Column(Enum(UserRank), default=UserRank.BRONZE)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    reports = relationship("Report", back_populates="user")
    badges = relationship("UserBadge", back_populates="user")


class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    url = Column(String(1000), unique=True, nullable=False)
    content = Column(Text, nullable=False)
    source_domain = Column(String(255), nullable=False, index=True)
    language = Column(String(10), default="en")
    trust_score = Column(Float, default=0.0)
    status = Column(Enum(ArticleStatus), default=ArticleStatus.PENDING)
    explanation = Column(Text, nullable=True)
    verified_points = Column(Float, default=0.0)
    unverified_points = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_checked = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    claims = relationship("Claim", back_populates="article")
    reports = relationship("Report", back_populates="article")


class Claim(Base):
    __tablename__ = "claims"
    
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"), nullable=False)
    claim_text = Column(Text, nullable=False)
    embedding_id = Column(String(100), nullable=True)
    status = Column(String(50), default="pending")
    verified = Column(Boolean, default=False)
    confidence = Column(Float, default=0.0)
    
    # Relationships
    article = relationship("Article", back_populates="claims")
    matches = relationship("ClaimMatch", back_populates="claim")


class ClaimMatch(Base):
    __tablename__ = "claim_matches"
    
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False)
    source_id = Column(Integer, ForeignKey("sources.id"), nullable=False)
    match_title = Column(String(500), nullable=True)
    match_url = Column(String(1000), nullable=True)
    similarity_score = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    claim = relationship("Claim", back_populates="matches")
    source = relationship("Source")


class Source(Base):
    __tablename__ = "sources"
    
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String(255), unique=True, nullable=False)
    trust_weight = Column(Float, default=1.0)
    is_trusted = Column(Boolean, default=True)
    last_checked = Column(DateTime, default=datetime.utcnow)


class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    evidence_text = Column(Text, nullable=False)
    evidence_url = Column(String(1000), nullable=True)
    status = Column(Enum(ReportStatus), default=ReportStatus.PENDING)
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    reviewed_at = Column(DateTime, nullable=True)
    
    # Relationships
    article = relationship("Article", back_populates="reports")
    user = relationship("User", back_populates="reports")


class Badge(Base):
    __tablename__ = "badges"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    icon_url = Column(String(500), nullable=True)
    required_points = Column(Integer, default=0)
    required_action = Column(String(100), nullable=True)
    required_count = Column(Integer, default=0)


class UserBadge(Base):
    __tablename__ = "user_badges"
    
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    badge_id = Column(Integer, ForeignKey("badges.id"), primary_key=True)
    awarded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="badges")
    badge = relationship("Badge")


class LeaderboardCache(Base):
    __tablename__ = "leaderboard_cache"
    
    id = Column(Integer, primary_key=True, index=True)
    region = Column(String(50), default="global")
    timeframe = Column(String(50), default="all_time")
    cached_json = Column(Text, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow)
