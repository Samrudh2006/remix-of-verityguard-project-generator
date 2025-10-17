# ⚡ VerityGuard - Quick Start Guide

Get VerityGuard running in 5 minutes!

## 🎯 Prerequisites

- Docker Desktop installed and running
- 4GB RAM available
- Ports 3000, 8000, 5432 available

## 🚀 One-Command Deployment

```bash
# Clone and start
git clone https://github.com/Samrudh2006/remix-of-verityguard-project-generator.git
cd remix-of-verityguard-project-generator
docker-compose up -d
```

**That's it!** 🎉

## 📍 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/docs
- **Database**: localhost:5432

## 🎨 Explore the Features

### 1. Homepage
Navigate to http://localhost:3000
- See the animated hero section
- Watch floating orbs
- Experience glassmorphism UI

### 2. Feed
Visit http://localhost:3000/feed
- Browse fact-checked articles
- See trust scores
- View verification status

### 3. Leaderboard
Check http://localhost:3000/leaderboard
- Top contributors
- Points and badges
- Streak tracking

### 4. Profile
View http://localhost:3000/profile
- User statistics
- Earned badges
- Activity history

### 5. Admin Dashboard
Access http://localhost:3000/admin
- Platform analytics
- Trending claims
- User activity

### 6. API Playground
Open http://localhost:8000/docs
- Try the verification API
- Test endpoints
- See real-time responses

## 🌍 Multi-Language Support

Try different languages:
- http://localhost:3000/en (English)
- http://localhost:3000/hi (Hindi)
- http://localhost:3000/es (Spanish)
- http://localhost:3000/fr (French)
- http://localhost:3000/ar (Arabic)

## 🎮 Test the ML Verification

1. Go to http://localhost:8000/docs
2. Find `/api/verification/verify`
3. Click "Try it out"
4. Enter a claim: `"Climate change is accelerating"`
5. See the AI-powered verification result!

## 🛑 Stop the Application

```bash
docker-compose down
```

## 🔧 Development Mode

### Frontend Only
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

### Backend Only
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API at http://localhost:8000

## 📚 Need More Details?

- Full documentation: [README.md](README.md)
- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)

## 🐛 Troubleshooting

### Ports Already in Use
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8000
lsof -i :5432

# Kill the processes or change ports in docker-compose.yml
```

### Docker Issues
```bash
# Rebuild everything
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

## 🎯 What to Try

1. ✅ Create a verification request
2. ✅ Check the leaderboard
3. ✅ Switch languages
4. ✅ Toggle dark/light theme
5. ✅ View an article detail
6. ✅ Check admin analytics
7. ✅ Test the API endpoints

## �� Get Help

- GitHub Issues: [Report a bug](https://github.com/Samrudh2006/remix-of-verityguard-project-generator/issues)
- Discussions: [Ask questions](https://github.com/Samrudh2006/remix-of-verityguard-project-generator/discussions)

---

**Enjoy VerityGuard!** 🚀✨

*Revolutionizing truth verification with AI and beautiful design.*
