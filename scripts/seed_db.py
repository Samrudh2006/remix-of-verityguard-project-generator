"""Seed database with sample data"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import (
    Base, User, Article, Source, Badge, ArticleStatus, UserRank
)
from app.services.auth import get_password_hash
from app.config import get_settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()


def seed_data():
    """Seed database with sample data"""
    logger.info("Connecting to database...")
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    try:
        # Create sample users
        logger.info("Creating sample users...")
        users_data = [
            {
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "password": "password123",
                "points": 1250,
                "rank": UserRank.SILVER
            },
            {
                "name": "Bob Smith",
                "email": "bob@example.com",
                "password": "password123",
                "points": 2500,
                "rank": UserRank.GOLD
            },
            {
                "name": "Admin User",
                "email": "admin@verityguard.com",
                "password": "admin123",
                "points": 10000,
                "rank": UserRank.VERIFIED_GUARDIAN,
                "is_admin": True
            }
        ]
        
        for user_data in users_data:
            existing = db.query(User).filter(User.email == user_data["email"]).first()
            if not existing:
                user = User(
                    name=user_data["name"],
                    email=user_data["email"],
                    password_hash=get_password_hash(user_data["password"]),
                    points=user_data["points"],
                    rank=user_data["rank"],
                    is_admin=user_data.get("is_admin", False)
                )
                db.add(user)
        
        db.commit()
        logger.info("Sample users created")
        
        # Create trusted sources
        logger.info("Creating trusted sources...")
        sources_data = [
            {"domain": "reuters.com", "trust_weight": 1.0},
            {"domain": "apnews.com", "trust_weight": 1.0},
            {"domain": "bbc.com", "trust_weight": 0.95},
            {"domain": "nytimes.com", "trust_weight": 0.9},
            {"domain": "theguardian.com", "trust_weight": 0.9},
            {"domain": "politifact.com", "trust_weight": 1.0},
            {"domain": "snopes.com", "trust_weight": 1.0},
            {"domain": "factcheck.org", "trust_weight": 1.0},
            {"domain": "npr.org", "trust_weight": 0.9},
            {"domain": "washingtonpost.com", "trust_weight": 0.85}
        ]
        
        for source_data in sources_data:
            existing = db.query(Source).filter(Source.domain == source_data["domain"]).first()
            if not existing:
                source = Source(**source_data)
                db.add(source)
        
        db.commit()
        logger.info("Trusted sources created")
        
        # Create badges
        logger.info("Creating badges...")
        badges_data = [
            {
                "name": "Fact Finder",
                "description": "Submit 5 verified reports",
                "required_action": "verified_reports",
                "required_count": 5,
                "required_points": 0
            },
            {
                "name": "Truth Explorer",
                "description": "Verify 50 different articles",
                "required_action": "verified_articles",
                "required_count": 50,
                "required_points": 0
            },
            {
                "name": "Community Helper",
                "description": "Help verify 20 community reports",
                "required_action": "helped_reports",
                "required_count": 20,
                "required_points": 0
            },
            {
                "name": "Bronze Achiever",
                "description": "Reach Bronze rank",
                "required_points": 0
            },
            {
                "name": "Silver Star",
                "description": "Reach Silver rank",
                "required_points": 500
            },
            {
                "name": "Gold Standard",
                "description": "Reach Gold rank",
                "required_points": 1500
            },
            {
                "name": "Platinum Elite",
                "description": "Reach Platinum rank",
                "required_points": 5000
            },
            {
                "name": "Verified Guardian",
                "description": "Reach Verified Guardian status",
                "required_points": 10000
            }
        ]
        
        for badge_data in badges_data:
            existing = db.query(Badge).filter(Badge.name == badge_data["name"]).first()
            if not existing:
                badge = Badge(**badge_data)
                db.add(badge)
        
        db.commit()
        logger.info("Badges created")
        
        # Create sample articles
        logger.info("Creating sample articles...")
        articles_data = [
            {
                "title": "Scientists Confirm Climate Change Impact on Ocean Temperatures",
                "url": "https://reuters.com/science/climate-ocean-2024",
                "content": "Leading climate scientists have confirmed that ocean temperatures have risen significantly over the past decade. Multiple studies from independent research institutions show consistent warming patterns across all major ocean basins. The data, collected from thousands of monitoring stations, demonstrates an average temperature increase of 0.8 degrees Celsius since 2010.",
                "source_domain": "reuters.com",
                "language": "en",
                "trust_score": 92.5,
                "status": ArticleStatus.VERIFIED,
                "explanation": "This article has a high trust score. Multiple claims were verified against trusted scientific sources."
            },
            {
                "title": "Study Shows Benefits of Mediterranean Diet",
                "url": "https://apnews.com/health/mediterranean-diet-study",
                "content": "A comprehensive 10-year study published in a leading medical journal has found that the Mediterranean diet, rich in olive oil, fish, and vegetables, is associated with reduced risk of cardiovascular disease. The research, involving 12,000 participants across multiple countries, showed a 25% reduction in heart disease among those following the diet.",
                "source_domain": "apnews.com",
                "language": "en",
                "trust_score": 88.3,
                "status": ArticleStatus.VERIFIED,
                "explanation": "This article cites peer-reviewed research and has been corroborated by multiple trusted sources."
            },
            {
                "title": "Miracle Cure Discovered: Eat This One Food to Lose 50 Pounds",
                "url": "https://suspicious-health.fake/miracle-cure",
                "content": "Doctors are shocked by this one weird trick that melts fat instantly! This revolutionary superfood discovered in the Amazon rainforest will make you lose 50 pounds in just 2 weeks without any exercise or diet changes. Big pharma doesn't want you to know about this!",
                "source_domain": "suspicious-health.fake",
                "language": "en",
                "trust_score": 8.5,
                "status": ArticleStatus.UNVERIFIED,
                "explanation": "This article has a very low trust score. The claims are sensational and could not be verified against any trusted medical sources. Multiple red flags for misinformation detected."
            },
            {
                "title": "नई तकनीक से बढ़ेगी फसल की पैदावार",
                "url": "https://hindi-news.example.com/agriculture-tech",
                "content": "कृषि वैज्ञानिकों ने एक नई तकनीक विकसित की है जो फसल की पैदावार को 30 प्रतिशत तक बढ़ा सकती है। यह तकनीक पानी की बचत करने के साथ-साथ मिट्टी की गुणवत्ता भी सुधारती है।",
                "source_domain": "hindi-news.example.com",
                "language": "hi",
                "trust_score": 65.0,
                "status": ArticleStatus.PENDING,
                "explanation": "This article has a moderate trust score. Some claims could be verified but need more corroboration from additional sources."
            },
            {
                "title": "Nuevo descubrimiento en arqueología maya",
                "url": "https://spanish-news.example.com/maya-discovery",
                "content": "Arqueólogos han descubierto una antigua ciudad maya en la selva de Guatemala. El sitio contiene templos y estructuras bien conservadas que datan del período clásico maya.",
                "source_domain": "spanish-news.example.com",
                "language": "es",
                "trust_score": 72.0,
                "status": ArticleStatus.PENDING,
                "explanation": "Archaeological discovery claims need verification from multiple academic sources."
            },
            {
                "title": "Tech Company Announces New AI Product",
                "url": "https://techcrunch.example.com/ai-product-2024",
                "content": "A major technology company today announced a new artificial intelligence product designed to help businesses automate customer service. The product uses advanced natural language processing and has been in development for three years. Beta testing showed a 40% improvement in customer satisfaction scores.",
                "source_domain": "techcrunch.example.com",
                "language": "en",
                "trust_score": 78.5,
                "status": ArticleStatus.VERIFIED,
                "explanation": "Product announcement verified through official company channels and corroborated by technology news sources."
            }
        ]
        
        for article_data in articles_data:
            existing = db.query(Article).filter(Article.url == article_data["url"]).first()
            if not existing:
                article = Article(**article_data)
                db.add(article)
        
        db.commit()
        logger.info("Sample articles created")
        
        logger.info("Database seeded successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
