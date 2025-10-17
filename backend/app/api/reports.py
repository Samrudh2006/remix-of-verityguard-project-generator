"""Reports API endpoints"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

from app.models.db import get_db
from app.models import Report, ReportStatus, Article
from app.services.gamification import award_points

router = APIRouter(prefix="/reports", tags=["reports"])


class CreateReportRequest(BaseModel):
    article_id: int
    user_id: int
    evidence_text: str
    evidence_url: Optional[HttpUrl] = None


@router.post("")
def create_report(request: CreateReportRequest, db: Session = Depends(get_db)):
    """Submit a report for an article"""
    # Verify article exists
    article = db.query(Article).filter(Article.id == request.article_id).first()
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    # Create report
    report = Report(
        article_id=request.article_id,
        user_id=request.user_id,
        evidence_text=request.evidence_text,
        evidence_url=str(request.evidence_url) if request.evidence_url else None,
        status=ReportStatus.PENDING
    )
    
    db.add(report)
    db.commit()
    db.refresh(report)
    
    # Award points for submitting report
    award_points(db, request.user_id, 50, "Submitted report with evidence")
    
    return {
        "id": report.id,
        "status": report.status.value,
        "message": "Report submitted successfully. You earned 50 points!"
    }


@router.get("/{report_id}")
def get_report(report_id: int, db: Session = Depends(get_db)):
    """Get report by ID"""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    return {
        "id": report.id,
        "article_id": report.article_id,
        "user_id": report.user_id,
        "evidence_text": report.evidence_text,
        "evidence_url": report.evidence_url,
        "status": report.status.value,
        "admin_notes": report.admin_notes,
        "created_at": report.created_at
    }
