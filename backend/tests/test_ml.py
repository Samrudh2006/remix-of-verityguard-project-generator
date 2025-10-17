import pytest
from app.ml.verification_engine import (
    ClaimExtractor,
    EmbeddingService,
    TrustScorer,
    VerificationEngine
)

def test_claim_extractor():
    """Test claim extraction."""
    extractor = ClaimExtractor()
    text = "This is a test claim. Another statement here. Third one."
    claims = extractor.extract_claims(text)
    assert len(claims) > 0

def test_claim_normalization():
    """Test claim normalization."""
    extractor = ClaimExtractor()
    claim = "  This IS a   TEST  "
    normalized = extractor.normalize_claim(claim)
    assert normalized == "this is a test"

def test_trust_scorer_quick_score():
    """Test quick trust scoring."""
    scorer = TrustScorer()
    claim = "A new scientific study shows promising results"
    score = scorer.quick_score(claim)
    assert 0 <= score <= 100

def test_verification_engine():
    """Test complete verification pipeline."""
    engine = VerificationEngine()
    result = engine.verify_claim("Climate change is accelerating according to new research")
    
    assert "claim" in result
    assert "trust_score" in result
    assert "verdict" in result
    assert 0 <= result["trust_score"] <= 100
