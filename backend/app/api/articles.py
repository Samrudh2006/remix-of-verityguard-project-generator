from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class ArticleCreate(BaseModel):
    title: str
    content: str
    claim: str
    source: str
    url: Optional[str] = None

class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    claim: str
    source: str
    url: Optional[str]
    trust_score: float
    status: str
    created_at: datetime

# Mock data for demo
mock_articles = [
    {
        "id": 1,
        "title": "Breaking: New Climate Study Released",
        "content": "A comprehensive study shows accelerating climate change.",
        "claim": "Global temperatures rising faster than predicted",
        "source": "Science Daily",
        "url": "https://example.com",
        "trust_score": 92.0,
        "status": "verified",
        "created_at": datetime.utcnow(),
    },
    {
        "id": 2,
        "title": "Tech Innovation Announcement",
        "content": "Major breakthrough in quantum computing achieved.",
        "claim": "Quantum computer breakthrough achieved",
        "source": "Tech News",
        "url": "https://example.com",
        "trust_score": 78.0,
        "status": "pending",
        "created_at": datetime.utcnow(),
    },
]

@router.get("/", response_model=List[ArticleResponse])
async def get_articles(skip: int = 0, limit: int = 10):
    """Get list of articles."""
    return mock_articles[skip : skip + limit]

@router.get("/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: int):
    """Get specific article by ID."""
    article = next((a for a in mock_articles if a["id"] == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.post("/", response_model=ArticleResponse)
async def create_article(article: ArticleCreate):
    """Create new article."""
    new_article = {
        "id": len(mock_articles) + 1,
        **article.dict(),
        "trust_score": 0.0,
        "status": "pending",
        "created_at": datetime.utcnow(),
    }
    mock_articles.append(new_article)
    return new_article
