"""Embedding generation using sentence transformers"""
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Union
import logging

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """Generate embeddings for text using sentence transformers"""
    
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        """
        Initialize embedding generator
        
        Args:
            model_name: Hugging Face model name
        """
        try:
            self.model = SentenceTransformer(model_name)
            logger.info(f"Loaded embedding model: {model_name}")
        except Exception as e:
            logger.error(f"Failed to load model {model_name}: {e}")
            raise
    
    def embed_claims(self, claims: List[Union[str, dict]]) -> np.ndarray:
        """
        Generate embeddings for claims
        
        Args:
            claims: List of claim texts or claim dictionaries
            
        Returns:
            Numpy array of embeddings
        """
        if not claims:
            return np.array([])
        
        # Extract text if claims are dictionaries
        texts = []
        for claim in claims:
            if isinstance(claim, dict):
                texts.append(claim.get("text", ""))
            else:
                texts.append(claim)
        
        # Filter out empty texts
        texts = [t for t in texts if t.strip()]
        
        if not texts:
            return np.array([])
        
        # Generate embeddings
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        return embeddings
    
    def embed_text(self, text: str) -> np.ndarray:
        """
        Generate embedding for a single text
        
        Args:
            text: Text to embed
            
        Returns:
            Embedding vector
        """
        return self.model.encode([text], convert_to_numpy=True)[0]


def embed_claims(claims: List[Union[str, dict]], model_name: str = "sentence-transformers/all-MiniLM-L6-v2") -> np.ndarray:
    """
    Convenience function to generate embeddings
    
    Args:
        claims: List of claims
        model_name: Model to use
        
    Returns:
        Embeddings array
    """
    generator = EmbeddingGenerator(model_name)
    return generator.embed_claims(claims)
