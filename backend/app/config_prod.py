"""Production configuration"""
import os
from app.config import Settings


class ProductionSettings(Settings):
    """Production-specific settings"""
    
    # Override with production values
    DEBUG: bool = False
    
    # CORS - update with your production domains
    CORS_ORIGINS: list = [
        "https://verityguard.example.com",
        "https://www.verityguard.example.com"
    ]
    
    # Database - use environment variable
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # Redis - use environment variable
    REDIS_URL: str = os.getenv("REDIS_URL", "")
    
    class Config:
        env_file = ".env.production"
