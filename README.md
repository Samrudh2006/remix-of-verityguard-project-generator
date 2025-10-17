# VerityGuard 🛡️

**AI-Powered Misinformation Detection & Verification Platform**

VerityGuard is a complete, production-oriented web application that uses artificial intelligence to detect and verify news articles, helping users combat misinformation with gamification, multilingual support, and real-time updates.

![Trust Score](https://img.shields.io/badge/Trust%20Score-92.5%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/python-3.11-blue)
![Next.js](https://img.shields.io/badge/next.js-14.0-black)

## 🌟 Features

### Core Functionality
- **AI-Powered Verification**: Advanced ML pipeline using MiniLM embeddings and TF-IDF for claim extraction and verification
- **Trust Score System**: Transparent scoring algorithm that cross-checks claims against trusted sources
- **Multi-Source Ingestion**: Support for RSS feeds, Reddit, Twitter/X, and manual submissions
- **Real-time Analysis**: Fast verification with detailed explanations and source citations

### Gamification
- **Points & Rewards**: Earn points for verifying articles, submitting reports, and daily activity
- **Rank System**: Progress through Bronze, Silver, Gold, Platinum, and Verified Guardian tiers
- **Badges & Achievements**: Unlock badges like Fact Finder, Truth Explorer, and Community Helper
- **Leaderboard**: Weekly and all-time rankings with region filters

### Multilingual Support
- **5 Languages**: English, Hindi, Spanish, French, and Arabic
- **RTL Support**: Proper right-to-left layout for Arabic
- **Auto-translation**: Automatic content translation for non-English articles

### Modern UI/UX
- **Beautiful Design**: Modern, energetic interface with Tailwind CSS
- **Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Dark Mode**: Complete dark theme support
- **Responsive**: Works seamlessly on desktop, tablet, and mobile

### Security & Privacy
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Rate Limiting**: Protection against abuse
- **Privacy-First**: Minimal PII storage with clear privacy policies
- **Role-Based Access**: Admin panel with RBAC for content moderation

## 📁 Project Structure

```
verityguard/
├── backend/              # FastAPI Python backend
│   ├── app/
│   │   ├── api/         # API endpoints
│   │   ├── models/      # Database models
│   │   ├── services/    # Business logic
│   │   ├── ml_pipeline/ # ML verification pipeline
│   │   └── main.py      # FastAPI application
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/            # Next.js React frontend
│   ├── src/
│   │   ├── app/        # Next.js app router
│   │   ├── components/ # React components
│   │   ├── i18n/       # Internationalization
│   │   ├── lib/        # Utilities & API client
│   │   └── styles/     # CSS styles
│   ├── package.json
│   └── Dockerfile
├── infra/              # Infrastructure & database
│   └── schema.sql      # PostgreSQL schema
├── scripts/            # Utility scripts
│   ├── init_db.py     # Database initialization
│   └── seed_db.py     # Sample data seeding
├── .github/
│   └── workflows/
│       └── ci.yml     # CI/CD pipeline
└── docker-compose.yml  # Docker orchestration
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (recommended)
- OR: Python 3.11+, Node.js 18+, PostgreSQL 15+

### Option 1: Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd remix-of-verityguard-project-generator
```

2. **Start all services**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

4. **Initialize database with sample data**
```bash
docker-compose exec backend python /app/../scripts/seed_db.py
```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Download spaCy model (optional but recommended)**
```bash
python -m spacy download en_core_web_sm
```

5. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

6. **Initialize database**
```bash
cd ..
python scripts/init_db.py
python scripts/seed_db.py
```

7. **Run the backend**
```bash
cd backend
uvicorn app.main:app --reload
```

#### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local if needed
```

4. **Run the frontend**
```bash
npm run dev
# or
pnpm dev
```

5. **Access the application**
Open http://localhost:3000 in your browser

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/verityguard
SECRET_KEY=your-secret-key-change-in-production
REDIS_URL=redis://localhost:6379/0

# Optional External APIs
GOOGLE_TRANSLATE_KEY=
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User accounts, points, and ranks
- **articles**: News articles with trust scores
- **claims**: Extracted claims from articles
- **sources**: Trusted source domains and weights
- **reports**: User-submitted evidence reports
- **badges**: Achievement badges
- **user_badges**: Badge awards to users
- **leaderboard_cache**: Cached leaderboard rankings

See `infra/schema.sql` for complete schema.

## 🤖 ML Pipeline

The verification pipeline consists of:

1. **Claim Extraction**: Uses spaCy for NLP and sentence segmentation
2. **Embedding Generation**: Sentence-transformers (MiniLM-L6-v2) for semantic embeddings
3. **Similarity Search**: TF-IDF and cosine similarity for matching claims
4. **Trust Scoring**: Weighted algorithm based on source trust and claim matches

### Trust Score Formula

```
Trust Score = (Verified Points) / (Verified Points + Unverified Points) * 100

Where:
- Verified Points = Σ (similarity × source_trust × claim_importance)
- Unverified Points = Σ (base_weight × claim_importance)
```

## 🎮 Gamification System

### Point Awards
- Submit report with proof: +50 pts
- Verified report (admin approved): +100 pts
- Correctly flag false story: +150 pts
- Daily login streak: +5 pts
- Share verified article: +10 pts

### Rank Tiers
- **Bronze**: 0-499 points
- **Silver**: 500-1,499 points
- **Gold**: 1,500-4,999 points
- **Platinum**: 5,000-9,999 points
- **Verified Guardian**: 10,000+ points

### Badges
- Fact Finder (5 verified reports)
- Truth Explorer (50 verified articles)
- Community Helper (20 resolved disputes)
- Weekly Top (Leaderboard #1)

## 🌍 Internationalization

Supported languages:
- English (en)
- Hindi (hi)
- Spanish (es)
- French (fr)
- Arabic (ar) - with RTL support

Translation files located in `frontend/src/i18n/locales/`

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 API Documentation

When the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify` - Verify JWT token

#### Articles
- `GET /api/v1/articles` - List articles (with filters)
- `GET /api/v1/articles/{id}` - Get article details
- `POST /api/v1/articles/analyze` - Analyze article with ML pipeline
- `POST /api/v1/articles/ingest` - Ingest new article

#### Users & Gamification
- `GET /api/v1/leaderboard` - Get leaderboard rankings
- `GET /api/v1/users/{id}` - Get user profile and stats

#### Reports
- `POST /api/v1/reports` - Submit article report
- `GET /api/v1/reports/{id}` - Get report details

## 🚢 Deployment

### Docker Production

Build production images:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment

#### Backend (Railway/Render/Fly.io)
1. Connect your repository
2. Set environment variables
3. Deploy from main branch

#### Frontend (Vercel)
1. Import project from GitHub
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy

## 🔐 Security Considerations

- Change `SECRET_KEY` in production
- Use strong passwords for database
- Enable HTTPS in production
- Configure CORS for your domain
- Regularly update dependencies
- Review and sanitize user inputs
- Implement rate limiting
- Monitor for suspicious activity

## 📝 Sample Data

The `scripts/seed_db.py` script creates:
- 3 sample users (including admin)
- 10 trusted sources
- 8 achievement badges
- 6 sample articles (various trust scores and languages)

**Default Admin Credentials:**
- Email: admin@verityguard.com
- Password: admin123

⚠️ **Change these in production!**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Hugging Face for transformer models
- spaCy for NLP capabilities
- FastAPI for the excellent Python framework
- Next.js for the React framework
- Tailwind CSS for styling
- Framer Motion for animations

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation at /docs

## 🗺️ Roadmap

- [ ] Browser extension for instant verification
- [ ] Mobile app (React Native)
- [ ] Integration with fact-checking APIs (Snopes, PolitiFact)
- [ ] Advanced ML models (fine-tuned BERT)
- [ ] Social media integration (Twitter, Facebook)
- [ ] Telegram/WhatsApp bot
- [ ] Vector database (Milvus/Pinecone) for faster similarity search
- [ ] Webhook system for third-party integrations

---

Built with ❤️ for a more truthful internet
