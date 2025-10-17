# VerityGuard - AI-Powered Fact Verification Platform

![VerityGuard Banner](https://via.placeholder.com/1200x300/6366f1/ffffff?text=VerityGuard+-+Truth+Through+Technology)

## 🚀 Overview

VerityGuard is a cutting-edge, AI-powered fact verification platform that revolutionizes how we validate information. Built with advanced machine learning models, gamification mechanics, and a stunning futuristic UI, VerityGuard makes fact-checking engaging and accessible.

## ✨ Key Features

### 🎨 Futuristic Frontend
- **Next.js 15** with TypeScript and Tailwind CSS
- **Glassmorphism & Neumorphism** design patterns
- **Framer Motion** animations for smooth, engaging interactions
- **Multi-language support** (en, hi, es, fr, ar) with next-intl
- **Dark/Light theme** with seamless transitions
- **Responsive design** optimized for all devices

### 🤖 Intelligent Backend
- **FastAPI** high-performance Python backend
- **ML Pipeline** with sentence transformers for claim analysis
- **Trust scoring** algorithm using semantic similarity
- **Real-time verification** with confidence scores
- **RESTful API** with OpenAPI documentation

### 🎮 Gamification System
- **Points & Levels** reward system
- **Badges & Achievements** for milestones
- **Leaderboards** with daily, weekly, and all-time rankings
- **Streak tracking** to encourage daily engagement
- **Activity rewards** for contributions

### 📊 Analytics Dashboard
- **User statistics** and engagement metrics
- **Trending claims** and verification patterns
- **Trust score distribution** analysis
- **Activity tracking** and reporting

## 🏗️ Architecture

```
verityguard/
├── frontend/              # Next.js 15 application
│   ├── app/              # App router pages
│   │   └── [locale]/     # Internationalized routes
│   ├── components/       # React components
│   │   ├── ui/          # UI components
│   │   ├── animations/  # Animation components
│   │   ├── layout/      # Layout components
│   │   └── features/    # Feature components
│   ├── lib/             # Utilities and i18n
│   └── messages/        # Translation files
│
├── backend/             # FastAPI application
│   ├── app/
│   │   ├── api/        # API routes
│   │   ├── ml/         # ML pipeline
│   │   ├── models/     # Database models
│   │   └── services/   # Business logic
│   └── tests/          # Backend tests
│
├── .github/
│   └── workflows/      # CI/CD pipelines
│
└── docker-compose.yml  # Multi-container setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose (optional)

### Development Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit http://localhost:3000

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API docs at http://localhost:8000/docs

### Docker Deployment
```bash
docker-compose up -d
```

## 🎯 Feature Breakdown

### PR 1: Futuristic Frontend & Homepage ✅
- [x] Next.js project with TypeScript
- [x] Animated hero section with moving backgrounds
- [x] Glassmorphism UI components
- [x] Responsive navigation with theme toggle
- [x] Multi-language support (5 languages)
- [x] Feed, Profile, Admin, Leaderboard pages
- [x] Framer Motion animations throughout

### PR 2: ML & Intelligent Backend ✅
- [x] FastAPI backend structure
- [x] ML verification engine with embeddings
- [x] Trust scoring algorithm
- [x] Gamification endpoints
- [x] Analytics API
- [x] Mock data for testing

### PR 3: Advanced Features (Planned)
- [ ] Infinite scroll on feed
- [ ] Advanced filters and search
- [ ] Real-time notifications
- [ ] User achievements timeline
- [ ] Enhanced admin charts
- [ ] Multi-media embedding

### PR 4: Infrastructure & CI/CD ✅
- [x] Dockerfile for frontend
- [x] Dockerfile for backend
- [x] Docker Compose setup
- [x] GitHub Actions CI/CD
- [x] Environment configuration
- [x] Database models

### PR 5: Polish & Documentation ✅
- [x] Comprehensive README
- [x] Code documentation
- [x] Testing infrastructure
- [x] Legal placeholders
- [ ] Accessibility improvements
- [ ] Performance optimization

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
pytest tests/ -v --cov=app
```

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend** (`.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/verityguard
MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
DEBUG=true
SECRET_KEY=your-secret-key
```

## 📚 API Documentation

Once the backend is running, visit:
- **Interactive API docs**: http://localhost:8000/docs
- **Alternative docs**: http://localhost:8000/redoc

## 🎨 Design System

### Colors
- **Primary**: Purple (#8B5CF6) → Blue (#3B82F6)
- **Accent**: Cyan (#06B6D4) → Teal (#14B8A6)
- **Background**: Dark gradient (#0a0a0a → #1a0f2e → #0a1929)

### Effects
- Glassmorphism with backdrop blur
- Neumorphism with dual shadows
- Gradient overlays and animated orbs
- Smooth hover transitions with glow effects

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔐 Security

Please report security vulnerabilities to security@verityguard.example.com

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [FastAPI](https://fastapi.tiangolo.com/)
- ML by [Sentence Transformers](https://www.sbert.net/)
- Icons by [Heroicons](https://heroicons.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

- **Documentation**: [docs.verityguard.example.com](https://docs.verityguard.example.com)
- **Issues**: [GitHub Issues](https://github.com/Samrudh2006/remix-of-verityguard-project-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Samrudh2006/remix-of-verityguard-project-generator/discussions)

---

**Made with ❤️ by the VerityGuard Team**

*Revolutionizing truth verification, one claim at a time.*
