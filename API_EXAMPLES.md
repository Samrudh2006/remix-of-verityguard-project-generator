# VerityGuard API Collection
# Import this into Postman or use with any HTTP client

## Authentication

### Signup
POST http://localhost:8000/api/v1/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "locale": "en"
}

### Login
POST http://localhost:8000/api/v1/auth/login
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "password123"
}

### Verify Token
POST http://localhost:8000/api/v1/auth/verify
Content-Type: application/json

{
  "token": "YOUR_JWT_TOKEN_HERE"
}

## Articles

### List Articles
GET http://localhost:8000/api/v1/articles?limit=10&skip=0

### Get Article
GET http://localhost:8000/api/v1/articles/1

### Analyze Article
POST http://localhost:8000/api/v1/articles/analyze
Content-Type: application/json

{
  "text": "Scientists have confirmed that climate change is affecting ocean temperatures globally. Multiple independent studies show consistent warming patterns.",
  "source": "manual"
}

### Ingest Article
POST http://localhost:8000/api/v1/articles/ingest
Content-Type: application/json

{
  "url": "https://example.com/article",
  "title": "Sample Article Title",
  "content": "Article content goes here...",
  "source": "manual",
  "language": "en"
}

## Users & Gamification

### Get Leaderboard
GET http://localhost:8000/api/v1/leaderboard?timeframe=all_time&limit=100

### Get User Profile
GET http://localhost:8000/api/v1/users/1

## Reports

### Submit Report
POST http://localhost:8000/api/v1/reports
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE

{
  "article_id": 1,
  "user_id": 1,
  "evidence_text": "This article contains misinformation because...",
  "evidence_url": "https://factcheck.org/debunk"
}

### Get Report
GET http://localhost:8000/api/v1/reports/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
