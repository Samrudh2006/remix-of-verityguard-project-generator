"""Database initialization script"""
from sqlalchemy import create_engine
from app.models.database import Base
from app.config import get_settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()


def init_db():
    """Initialize database tables"""
    logger.info(f"Connecting to database: {settings.DATABASE_URL}")
    
    engine = create_engine(settings.DATABASE_URL)
    
    logger.info("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    logger.info("Database initialized successfully!")


if __name__ == "__main__":
    init_db()
