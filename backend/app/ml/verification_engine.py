import re
import numpy as np
from typing import List, Dict
from sentence_transformers import SentenceTransformer
from app.config import settings

class ClaimExtractor:
    """Extract and normalize claims from text."""
    
    def extract_claims(self, text: str) -> List[str]:
        """Extract potential claims from text."""
        # Simple sentence splitting
        sentences = re.split(r'[.!?]+', text)
        claims = [s.strip() for s in sentences if len(s.strip()) > 20]
        return claims
    
    def normalize_claim(self, claim: str) -> str:
        """Normalize claim text."""
        # Remove extra whitespace
        claim = ' '.join(claim.split())
        # Convert to lowercase for comparison
        claim = claim.lower()
        return claim

class EmbeddingService:
    """Generate embeddings for claims."""
    
    def __init__(self):
        self.model = SentenceTransformer(settings.MODEL_NAME)
    
    def generate_embedding(self, text: str) -> np.ndarray:
        """Generate embedding vector for text."""
        return self.model.encode(text)
    
    def batch_generate_embeddings(self, texts: List[str]) -> np.ndarray:
        """Generate embeddings for multiple texts."""
        return self.model.encode(texts)
    
    def similarity(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """Calculate cosine similarity between two embeddings."""
        dot_product = np.dot(embedding1, embedding2)
        norm1 = np.linalg.norm(embedding1)
        norm2 = np.linalg.norm(embedding2)
        return float(dot_product / (norm1 * norm2))

class TrustScorer:
    """Calculate trust scores for claims."""
    
    def __init__(self):
        self.embedding_service = EmbeddingService()
    
    def calculate_trust_score(
        self,
        claim: str,
        verified_sources: List[str],
        source_credibility: List[float]
    ) -> float:
        """
        Calculate trust score based on similarity to verified sources
        and source credibility.
        """
        if not verified_sources:
            return 0.5  # Neutral score
        
        # Generate embeddings
        claim_embedding = self.embedding_service.generate_embedding(claim)
        source_embeddings = self.embedding_service.batch_generate_embeddings(verified_sources)
        
        # Calculate similarities
        similarities = []
        for source_emb in source_embeddings:
            sim = self.embedding_service.similarity(claim_embedding, source_emb)
            similarities.append(sim)
        
        # Weight similarities by source credibility
        weighted_scores = [
            sim * cred for sim, cred in zip(similarities, source_credibility)
        ]
        
        # Calculate final score (0-100)
        avg_score = np.mean(weighted_scores) if weighted_scores else 0.5
        return min(100, max(0, avg_score * 100))
    
    def quick_score(self, claim: str, context: str = "") -> float:
        """Quick trust score estimation."""
        # Simple heuristic-based scoring for demo
        score = 50.0  # Start neutral
        
        # Check for common fact-checking indicators
        if any(word in claim.lower() for word in ['study', 'research', 'scientist']):
            score += 15
        
        if any(word in claim.lower() for word in ['claim', 'allegedly', 'reportedly']):
            score -= 10
        
        # Length heuristic
        if len(claim.split()) > 10 and len(claim.split()) < 50:
            score += 10
        
        return min(100, max(0, score))

class VerificationEngine:
    """Main verification engine combining all ML components."""
    
    def __init__(self):
        self.claim_extractor = ClaimExtractor()
        self.trust_scorer = TrustScorer()
        self.embedding_service = EmbeddingService()
    
    def verify_claim(self, claim: str, sources: List[Dict[str, any]] = None) -> Dict:
        """
        Verify a claim and return verification results.
        """
        # Extract and normalize claim
        normalized_claim = self.claim_extractor.normalize_claim(claim)
        
        # Generate embedding
        embedding = self.embedding_service.generate_embedding(normalized_claim)
        
        # Calculate trust score
        if sources:
            source_texts = [s.get('text', '') for s in sources]
            source_creds = [s.get('credibility', 0.7) for s in sources]
            trust_score = self.trust_scorer.calculate_trust_score(
                normalized_claim,
                source_texts,
                source_creds
            )
        else:
            trust_score = self.trust_scorer.quick_score(normalized_claim)
        
        # Determine verdict
        if trust_score >= 80:
            verdict = "verified"
        elif trust_score >= 60:
            verdict = "likely_true"
        elif trust_score >= 40:
            verdict = "uncertain"
        elif trust_score >= 20:
            verdict = "likely_false"
        else:
            verdict = "debunked"
        
        return {
            "claim": claim,
            "normalized_claim": normalized_claim,
            "embedding": embedding.tolist(),
            "trust_score": trust_score,
            "verdict": verdict,
            "confidence": min(100, abs(trust_score - 50) * 2)
        }
