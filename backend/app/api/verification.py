from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional

router = APIRouter()

class VerificationRequest(BaseModel):
    claim: str
    sources: Optional[List[Dict[str, any]]] = None

class VerificationResponse(BaseModel):
    claim: str
    trust_score: float
    verdict: str
    confidence: float
    details: Optional[Dict] = None

@router.post("/verify", response_model=VerificationResponse)
async def verify_claim(request: VerificationRequest):
    """Verify a claim using ML pipeline."""
    from app.ml.verification_engine import VerificationEngine
    
    engine = VerificationEngine()
    result = engine.verify_claim(request.claim, request.sources)
    
    return {
        "claim": result["claim"],
        "trust_score": result["trust_score"],
        "verdict": result["verdict"],
        "confidence": result["confidence"],
        "details": {
            "normalized_claim": result["normalized_claim"],
            "embedding_size": len(result["embedding"])
        }
    }

@router.post("/batch-verify")
async def batch_verify_claims(claims: List[str]):
    """Verify multiple claims at once."""
    from app.ml.verification_engine import VerificationEngine
    
    engine = VerificationEngine()
    results = []
    
    for claim in claims:
        result = engine.verify_claim(claim)
        results.append({
            "claim": claim,
            "trust_score": result["trust_score"],
            "verdict": result["verdict"]
        })
    
    return {"results": results}
