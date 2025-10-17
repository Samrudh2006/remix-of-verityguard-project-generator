from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Gamification fields
    points = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak_days = Column(Integer, default=0)
    last_activity = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    articles = relationship("Article", back_populates="author")
    badges = relationship("UserBadge", back_populates="user")

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    claim = Column(Text)
    source = Column(String)
    url = Column(String, nullable=True)
    
    # Author
    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User", back_populates="articles")
    
    # Verification
    trust_score = Column(Float, default=0.0)
    status = Column(String, default="pending")  # pending, verified, debunked
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # ML fields
    embedding = Column(Text, nullable=True)  # JSON string of embedding vector
    
    # Relationships
    verifications = relationship("Verification", back_populates="article")

class Verification(Base):
    __tablename__ = "verifications"
    
    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"))
    article = relationship("Article", back_populates="verifications")
    
    # Verification details
    claim_extracted = Column(Text)
    sources_checked = Column(Text)  # JSON string
    confidence_score = Column(Float)
    verdict = Column(String)  # true, false, mixed, unverifiable
    
    # ML results
    similarity_scores = Column(Text, nullable=True)  # JSON string
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Badge(Base):
    __tablename__ = "badges"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    description = Column(Text)
    icon = Column(String)
    points_required = Column(Integer)
    
    users = relationship("UserBadge", back_populates="badge")

class UserBadge(Base):
    __tablename__ = "user_badges"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    badge_id = Column(Integer, ForeignKey("badges.id"))
    earned_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="badges")
    badge = relationship("Badge", back_populates="users")

class Leaderboard(Base):
    __tablename__ = "leaderboard"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    period = Column(String)  # daily, weekly, monthly, all-time
    rank = Column(Integer)
    points = Column(Integer)
    updated_at = Column(DateTime, default=datetime.utcnow)
