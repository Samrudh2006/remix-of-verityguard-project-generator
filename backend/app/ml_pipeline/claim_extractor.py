"""Claim extraction using spaCy and sentence segmentation"""
import spacy
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class ClaimExtractor:
    """Extract claims from article text"""
    
    def __init__(self, model_name: str = "en_core_web_sm"):
        try:
            self.nlp = spacy.load(model_name)
        except OSError:
            logger.warning(f"spaCy model {model_name} not found. Using blank model.")
            self.nlp = spacy.blank("en")
            # Add basic sentence segmentation
            if "sentencizer" not in self.nlp.pipe_names:
                self.nlp.add_pipe("sentencizer")
    
    def extract_claims(self, text: str) -> List[Dict]:
        """
        Extract potential claims from text
        
        Args:
            text: Article text content
            
        Returns:
            List of claim dictionaries with text and metadata
        """
        if not text or len(text.strip()) < 10:
            return []
        
        doc = self.nlp(text)
        claims = []
        
        for sent in doc.sents:
            # Skip very short sentences
            if len(sent.text.split()) < 5:
                continue
            
            # Calculate claim importance based on:
            # - Sentence length
            # - Presence of named entities
            # - Presence of numbers/statistics
            
            importance = 1.0
            
            # Named entities increase importance
            entities = [ent for ent in sent.ents if ent.label_ in ["PERSON", "ORG", "GPE", "EVENT"]]
            if entities:
                importance += len(entities) * 0.2
            
            # Numbers/statistics increase importance
            has_numbers = any(token.like_num for token in sent)
            if has_numbers:
                importance += 0.3
            
            # Longer sentences (up to a point) are more important
            word_count = len(sent.text.split())
            if word_count > 10:
                importance += 0.2
            
            claims.append({
                "text": sent.text.strip(),
                "importance": min(importance, 2.0),
                "entities": [{"text": ent.text, "label": ent.label_} for ent in entities],
                "has_numbers": has_numbers
            })
        
        return claims


def extract_claims(text: str) -> List[Dict]:
    """
    Convenience function to extract claims
    
    Args:
        text: Article text
        
    Returns:
        List of claims
    """
    extractor = ClaimExtractor()
    return extractor.extract_claims(text)
