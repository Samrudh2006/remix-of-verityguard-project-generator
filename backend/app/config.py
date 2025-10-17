from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/verityguard"
    
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # ML Models
    MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"
    
    # OpenAI (optional)
    OPENAI_API_KEY: str = ""
    
    # App Settings
    DEBUG: bool = True
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    
    class Config:
        env_file = ".env"

settings = Settings()
