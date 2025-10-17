from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import articles, verification, gamification, analytics, users

app = FastAPI(
    title="VerityGuard API",
    description="AI-Powered Fact Verification Platform Backend",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(articles.router, prefix="/api/articles", tags=["articles"])
app.include_router(verification.router, prefix="/api/verification", tags=["verification"])
app.include_router(gamification.router, prefix="/api/gamification", tags=["gamification"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to VerityGuard API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
