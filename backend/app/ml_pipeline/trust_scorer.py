"""Trust score calculation and verification pipeline"""
from typing import List, Dict, Tuple
import logging
from app.ml_pipeline.claim_extractor import extract_claims
from app.ml_pipeline.embeddings import EmbeddingGenerator
from app.ml_pipeline.similarity_search import search_matches

logger = logging.getLogger(__name__)


class TrustScorer:
    """Calculate trust scores for articles based on claim verification"""
    
    def __init__(
        self,
        similarity_threshold: float = 0.7,
        min_trust_score: float = 75.0,
        base_unverified_weight: float = 30.0
    ):
        """
        Initialize trust scorer
        
        Args:
            similarity_threshold: Minimum similarity for a match
            min_trust_score: Minimum score to mark as verified
            base_unverified_weight: Base penalty for unverified claims
        """
        self.similarity_threshold = similarity_threshold
        self.min_trust_score = min_trust_score
        self.base_unverified_weight = base_unverified_weight
    
    def score_claims(
        self,
        claims: List[Dict],
        matches: List[List[Dict]],
        source_weights: Dict[str, float]
    ) -> Tuple[float, float]:
        """
        Score individual claims based on matches to trusted sources
        
        Args:
            claims: List of claim dictionaries
            matches: List of match lists for each claim
            source_weights: Dictionary of domain -> trust weight
            
        Returns:
            Tuple of (verified_points, unverified_points)
        """
        verified_points = 0.0
        unverified_points = 0.0
        
        for claim, claim_matches in zip(claims, matches):
            claim_importance = claim.get("importance", 1.0)
            
            if claim_matches:
                # Has matches - accumulate verified points
                for match in claim_matches:
                    source_domain = match.get("source_domain", "unknown")
                    source_trust = source_weights.get(source_domain, 0.5)
                    similarity = match.get("similarity", 0.0)
                    
                    # Verified points = similarity × source_trust × claim_importance
                    verified_points += similarity * source_trust * claim_importance
            else:
                # No matches - accumulate unverified points
                unverified_points += self.base_unverified_weight * claim_importance
        
        return verified_points, unverified_points
    
    def aggregate_score(
        self,
        verified_points: float,
        unverified_points: float
    ) -> Dict:
        """
        Aggregate verified and unverified points into final trust score
        
        Args:
            verified_points: Total verified points
            unverified_points: Total unverified points
            
        Returns:
            Dictionary with trust_score, status, and explanation
        """
        epsilon = 0.01  # Prevent division by zero
        
        # Trust Score = verified / (verified + unverified) * 100
        denominator = verified_points + unverified_points + epsilon
        trust_score = (verified_points / denominator) * 100.0
        
        # Determine status
        if trust_score >= self.min_trust_score:
            status = "verified"
            explanation = f"This article has a high trust score ({trust_score:.1f}%). Multiple claims were verified against trusted sources."
        elif trust_score >= 50.0:
            status = "pending"
            explanation = f"This article has a moderate trust score ({trust_score:.1f}%). Some claims were verified, but others need more corroboration."
        else:
            status = "unverified"
            explanation = f"This article has a low trust score ({trust_score:.1f}%). Many claims could not be verified against trusted sources."
        
        return {
            "trust_score": round(trust_score, 2),
            "status": status,
            "explanation": explanation,
            "verified_points": round(verified_points, 2),
            "unverified_points": round(unverified_points, 2)
        }


def calculate_trust_score(
    article_text: str,
    trusted_corpus: List[Dict],
    source_weights: Dict[str, float],
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2"
) -> Dict:
    """
    Complete trust scoring pipeline
    
    Args:
        article_text: Text content of the article
        trusted_corpus: List of trusted article dictionaries with 'text' and 'domain'
        source_weights: Domain to trust weight mapping
        model_name: Embedding model to use
        
    Returns:
        Trust score result dictionary
    """
    try:
        # Step 1: Extract claims
        claims = extract_claims(article_text)
        
        if not claims:
            return {
                "trust_score": 0.0,
                "status": "pending",
                "explanation": "No verifiable claims found. Article may need human review.",
                "verified_points": 0.0,
                "unverified_points": 0.0,
                "claims": []
            }
        
        # Step 2: Generate embeddings
        embedding_gen = EmbeddingGenerator(model_name)
        claim_embeddings = embedding_gen.embed_claims(claims)
        
        # Get corpus texts and embeddings
        corpus_texts = [doc.get("text", "") for doc in trusted_corpus]
        corpus_domains = [doc.get("domain", "unknown") for doc in trusted_corpus]
        
        if corpus_texts:
            corpus_embeddings = embedding_gen.embed_claims(corpus_texts)
        else:
            corpus_embeddings = []
        
        # Step 3: Search for matches
        all_matches = []
        for i, claim in enumerate(claims):
            claim_text = claim.get("text", "")
            claim_embedding = claim_embeddings[i] if len(claim_embeddings) > i else None
            
            if claim_embedding is not None and len(corpus_embeddings) > 0:
                matches = search_matches(
                    claim_text,
                    claim_embedding,
                    corpus_texts,
                    corpus_embeddings,
                    threshold=0.7
                )
                
                # Add source domain to matches
                for match in matches:
                    idx = match["index"]
                    match["source_domain"] = corpus_domains[idx] if idx < len(corpus_domains) else "unknown"
                
                all_matches.append(matches[:5])  # Top 5 matches per claim
            else:
                all_matches.append([])
        
        # Step 4: Score claims
        scorer = TrustScorer()
        verified_points, unverified_points = scorer.score_claims(
            claims,
            all_matches,
            source_weights
        )
        
        # Step 5: Aggregate score
        result = scorer.aggregate_score(verified_points, unverified_points)
        
        # Add claims with their matches
        result["claims"] = [
            {
                "text": claim.get("text", ""),
                "importance": claim.get("importance", 1.0),
                "matches": all_matches[i][:3]  # Top 3 matches
            }
            for i, claim in enumerate(claims)
        ]
        
        return result
        
    except Exception as e:
        logger.error(f"Trust scoring failed: {e}")
        return {
            "trust_score": 0.0,
            "status": "error",
            "explanation": f"Error during analysis: {str(e)}",
            "verified_points": 0.0,
            "unverified_points": 0.0,
            "claims": []
        }
