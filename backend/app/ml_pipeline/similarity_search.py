"""Similarity search and matching for claims"""
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Tuple
import logging

logger = logging.getLogger(__name__)


class SimilaritySearcher:
    """Search for similar claims using TF-IDF and embeddings"""
    
    def __init__(self, threshold: float = 0.7):
        """
        Initialize similarity searcher
        
        Args:
            threshold: Minimum similarity score to consider a match
        """
        self.threshold = threshold
        self.tfidf = TfidfVectorizer(max_features=1000, stop_words='english')
    
    def search_tfidf(self, query: str, corpus: List[str]) -> List[Tuple[int, float]]:
        """
        Search using TF-IDF vectorization
        
        Args:
            query: Query text
            corpus: List of documents to search
            
        Returns:
            List of (index, similarity_score) tuples
        """
        if not corpus:
            return []
        
        try:
            # Fit TF-IDF on corpus + query
            all_texts = corpus + [query]
            tfidf_matrix = self.tfidf.fit_transform(all_texts)
            
            # Query is the last vector
            query_vector = tfidf_matrix[-1]
            corpus_vectors = tfidf_matrix[:-1]
            
            # Compute cosine similarity
            similarities = cosine_similarity(query_vector, corpus_vectors)[0]
            
            # Return matches above threshold
            matches = [
                (idx, float(score))
                for idx, score in enumerate(similarities)
                if score >= self.threshold
            ]
            
            # Sort by similarity descending
            matches.sort(key=lambda x: x[1], reverse=True)
            
            return matches
        except Exception as e:
            logger.error(f"TF-IDF search failed: {e}")
            return []
    
    def search_embeddings(
        self,
        query_embedding: np.ndarray,
        corpus_embeddings: np.ndarray
    ) -> List[Tuple[int, float]]:
        """
        Search using pre-computed embeddings
        
        Args:
            query_embedding: Query embedding vector
            corpus_embeddings: Array of corpus embeddings
            
        Returns:
            List of (index, similarity_score) tuples
        """
        if corpus_embeddings.size == 0:
            return []
        
        try:
            # Ensure proper shape
            if len(query_embedding.shape) == 1:
                query_embedding = query_embedding.reshape(1, -1)
            
            # Compute cosine similarity
            similarities = cosine_similarity(query_embedding, corpus_embeddings)[0]
            
            # Return matches above threshold
            matches = [
                (idx, float(score))
                for idx, score in enumerate(similarities)
                if score >= self.threshold
            ]
            
            # Sort by similarity descending
            matches.sort(key=lambda x: x[1], reverse=True)
            
            return matches
        except Exception as e:
            logger.error(f"Embedding search failed: {e}")
            return []


def search_matches(
    claim_text: str,
    claim_embedding: np.ndarray,
    corpus_texts: List[str],
    corpus_embeddings: np.ndarray,
    threshold: float = 0.7
) -> List[Dict]:
    """
    Search for matching claims using both TF-IDF and embeddings
    
    Args:
        claim_text: Claim text to search for
        claim_embedding: Claim embedding vector
        corpus_texts: Corpus of texts to search
        corpus_embeddings: Corpus embeddings
        threshold: Similarity threshold
        
    Returns:
        List of match dictionaries with index and scores
    """
    searcher = SimilaritySearcher(threshold)
    
    # Get TF-IDF matches
    tfidf_matches = searcher.search_tfidf(claim_text, corpus_texts)
    
    # Get embedding matches
    embedding_matches = searcher.search_embeddings(claim_embedding, corpus_embeddings)
    
    # Combine results (use max of both scores)
    combined = {}
    for idx, score in tfidf_matches:
        combined[idx] = {"tfidf": score, "embedding": 0.0}
    
    for idx, score in embedding_matches:
        if idx in combined:
            combined[idx]["embedding"] = score
        else:
            combined[idx] = {"tfidf": 0.0, "embedding": score}
    
    # Create final match list with combined score
    matches = []
    for idx, scores in combined.items():
        combined_score = max(scores["tfidf"], scores["embedding"])
        matches.append({
            "index": idx,
            "similarity": combined_score,
            "tfidf_score": scores["tfidf"],
            "embedding_score": scores["embedding"]
        })
    
    # Sort by combined score
    matches.sort(key=lambda x: x["similarity"], reverse=True)
    
    return matches
