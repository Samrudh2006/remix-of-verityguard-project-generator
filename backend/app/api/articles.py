"""Articles API endpoints"""
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime

from app.models.db import get_db
from app.models import Article, ArticleStatus, Claim
from app.ml_pipeline.trust_scorer import calculate_trust_score

router = APIRouter(prefix="/articles", tags=["articles"])


class IngestRequest(BaseModel):
    url: HttpUrl
    title: str
    content: str
    source: str = "manual"
    language: str = "en"


class AnalyzeRequest(BaseModel):
    url: Optional[HttpUrl] = None
    text: str
    source: str = "manual"


class ArticleResponse(BaseModel):
    id: int
    title: str
    url: str
    content: str
    source_domain: str
    language: str
    trust_score: float
    status: str
    explanation: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


@router.get("", response_model=List[ArticleResponse])
def list_articles(
    skip: int = 0,
    limit: int = 20,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List articles with optional filtering"""
    query = db.query(Article)
    
    if status_filter:
        try:
            status_enum = ArticleStatus(status_filter)
            query = query.filter(Article.status == status_enum)
        except ValueError:
            pass
    
    query = query.order_by(Article.created_at.desc())
    articles = query.offset(skip).limit(limit).all()
    
    return articles


@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    """Get article by ID"""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    return article


@router.post("/ingest")
def ingest_article(
    request: IngestRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Ingest a new article for verification"""
    # Extract domain from URL
    from urllib.parse import urlparse
    parsed_url = urlparse(str(request.url))
    source_domain = parsed_url.netloc
    
    # Check if article already exists
    existing = db.query(Article).filter(Article.url == str(request.url)).first()
    if existing:
        return {
            "id": existing.id,
            "message": "Article already exists",
            "trust_score": existing.trust_score,
            "status": existing.status.value
        }
    
    # Create article
    article = Article(
        title=request.title,
        url=str(request.url),
        content=request.content,
        source_domain=source_domain,
        language=request.language,
        status=ArticleStatus.PENDING
    )
    
    db.add(article)
    db.commit()
    db.refresh(article)
    
    # Schedule background analysis
    # For now, we'll do it synchronously, but in production use Celery
    # background_tasks.add_task(analyze_article_background, article.id)
    
    return {
        "id": article.id,
        "message": "Article ingested successfully",
        "status": article.status.value
    }


@router.post("/analyze")
def analyze_article(request: AnalyzeRequest, db: Session = Depends(get_db)):
    """
    Analyze article text and return trust score
    
    This endpoint runs the ML pipeline to:
    1. Extract claims from the text
    2. Search for corroboration in trusted sources
    3. Calculate trust score
    4. Return detailed results
    """
    # Get trusted sources from database
    from app.models import Source
    trusted_sources = db.query(Source).filter(Source.is_trusted == True).all()
    
    # Build source weights
    source_weights = {
        source.domain: source.trust_weight
        for source in trusted_sources
    }
    
    # For demo purposes, add some default trusted sources if empty
    if not source_weights:
        source_weights = {
            "reuters.com": 1.0,
            "apnews.com": 1.0,
            "bbc.com": 0.95,
            "nytimes.com": 0.9,
            "politifact.com": 1.0,
            "snopes.com": 1.0,
            "factcheck.org": 1.0
        }
    
    # Build trusted corpus (simplified for demo)
    # In production, this would query a larger database of verified articles
    trusted_corpus = [
        {
            "text": "Climate change is a real and pressing issue according to scientific consensus.",
            "domain": "reuters.com"
        },
        {
            "text": "Vaccines have been proven safe and effective through rigorous clinical trials.",
            "domain": "apnews.com"
        },
        {
            "text": "The Earth is approximately 4.5 billion years old based on radiometric dating.",
            "domain": "bbc.com"
        }
    ]
    
    # Run ML pipeline
    try:
        result = calculate_trust_score(
            article_text=request.text,
            trusted_corpus=trusted_corpus,
            source_weights=source_weights
        )
        
        # If URL provided, try to save or update article
        article_id = None
        if request.url:
            from urllib.parse import urlparse
            parsed_url = urlparse(str(request.url))
            source_domain = parsed_url.netloc
            
            article = db.query(Article).filter(Article.url == str(request.url)).first()
            if not article:
                # Create new article
                article = Article(
                    title="Analyzed Article",
                    url=str(request.url),
                    content=request.text[:1000],  # Store first 1000 chars
                    source_domain=source_domain,
                    trust_score=result["trust_score"],
                    status=ArticleStatus(result["status"]),
                    explanation=result["explanation"],
                    verified_points=result["verified_points"],
                    unverified_points=result["unverified_points"]
                )
                db.add(article)
            else:
                # Update existing
                article.trust_score = result["trust_score"]
                article.status = ArticleStatus(result["status"])
                article.explanation = result["explanation"]
                article.verified_points = result["verified_points"]
                article.unverified_points = result["unverified_points"]
                article.last_checked = datetime.utcnow()
            
            db.commit()
            db.refresh(article)
            article_id = article.id
            
            # Save claims
            for claim_data in result.get("claims", []):
                claim = Claim(
                    article_id=article.id,
                    claim_text=claim_data["text"],
                    verified=len(claim_data.get("matches", [])) > 0,
                    confidence=claim_data.get("matches", [{}])[0].get("similarity", 0.0) if claim_data.get("matches") else 0.0
                )
                db.add(claim)
            
            db.commit()
        
        return {
            "id": article_id,
            "trust_score": result["trust_score"],
            "status": result["status"],
            "explanation": result["explanation"],
            "verified_points": result["verified_points"],
            "unverified_points": result["unverified_points"],
            "claims": result.get("claims", [])
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )
