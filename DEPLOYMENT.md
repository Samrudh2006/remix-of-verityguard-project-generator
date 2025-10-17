# VerityGuard Deployment Guide

This guide provides step-by-step instructions for deploying VerityGuard in various environments.

## 📋 Prerequisites

Before deploying, ensure you have:
- Docker 24+ and Docker Compose 2.20+
- Git
- At least 4GB RAM available
- 10GB disk space
- Ports 3000, 8000, 5432 available

## 🚀 Quick Start (Docker Compose)

### 1. Clone the Repository
```bash
git clone https://github.com/Samrudh2006/remix-of-verityguard-project-generator.git
cd remix-of-verityguard-project-generator
```

### 2. Set Up Environment Variables

**Backend (.env in backend directory):**
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

**Frontend (.env.local in frontend directory):**
```bash
cd ../frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 3. Build and Run
```bash
cd ..
docker-compose up -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: postgresql://postgres:postgres@localhost:5432/verityguard

### 5. Initialize Database (Optional)
```bash
docker-compose exec backend python -c "from app.models.database import Base; from sqlalchemy import create_engine; engine = create_engine('postgresql://postgres:postgres@postgres:5432/verityguard'); Base.metadata.create_all(engine)"
```

## 🔧 Development Deployment

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```
Access at http://localhost:3000

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Access at http://localhost:8000

### Database (Separate)
```bash
docker run -d \
  --name verityguard-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=verityguard \
  -p 5432:5432 \
  postgres:16-alpine
```

## 🌐 Production Deployment

### Option 1: Docker Compose (Recommended)

**1. Update Environment Variables**
```bash
# backend/.env
DATABASE_URL=postgresql://postgres:SECURE_PASSWORD@postgres:5432/verityguard
DEBUG=false
SECRET_KEY=your-very-secure-secret-key-here
```

**2. Use Production Docker Compose**
```yaml
# docker-compose.prod.yml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/verityguard
      - DEBUG=false
      - SECRET_KEY=${SECRET_KEY}
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=verityguard
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

**3. Deploy**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Kubernetes

**1. Create ConfigMaps**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: verityguard-config
data:
  DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/verityguard"
  NEXT_PUBLIC_API_URL: "http://backend-service:8000"
```

**2. Create Deployments**
```yaml
# frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: verityguard-frontend:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: verityguard-config
```

**3. Apply**
```bash
kubectl apply -f k8s/
```

### Option 3: Cloud Platforms

#### Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Railway/Render (Backend)
```bash
# railway.json or render.yaml
services:
  - type: web
    name: verityguard-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

#### Supabase (Database)
1. Create a Supabase project
2. Update `DATABASE_URL` in backend/.env
3. Run migrations

## 🔒 Security Checklist

Before production deployment:

- [ ] Change default passwords
- [ ] Set strong `SECRET_KEY`
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Review environment variables
- [ ] Enable container scanning

## 📊 Monitoring

### Health Checks
```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:8000/health

# Database
docker-compose exec postgres pg_isready
```

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 frontend
```

### Metrics
- Add Prometheus for metrics collection
- Use Grafana for visualization
- Monitor CPU, memory, disk usage
- Track API response times
- Monitor database connections

## 🔄 Updates and Rollbacks

### Update Application
```bash
git pull origin main
docker-compose down
docker-compose build
docker-compose up -d
```

### Rollback
```bash
git checkout <previous-commit>
docker-compose down
docker-compose build
docker-compose up -d
```

## 🗄️ Database Management

### Backup
```bash
docker-compose exec postgres pg_dump -U postgres verityguard > backup.sql
```

### Restore
```bash
docker-compose exec -T postgres psql -U postgres verityguard < backup.sql
```

### Migrations
```bash
# Using Alembic (to be set up)
docker-compose exec backend alembic upgrade head
```

## 🧪 Testing Deployment

### Smoke Tests
```bash
# Test frontend
curl http://localhost:3000

# Test backend
curl http://localhost:8000/health

# Test verification endpoint
curl -X POST http://localhost:8000/api/verification/verify \
  -H "Content-Type: application/json" \
  -d '{"claim": "Test claim"}'
```

### Load Testing
```bash
# Install Apache Bench
apt-get install apache2-utils

# Run load test
ab -n 1000 -c 10 http://localhost:8000/health
```

## 🛠️ Troubleshooting

### Frontend Issues
```bash
# Check logs
docker-compose logs frontend

# Rebuild
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### Backend Issues
```bash
# Check logs
docker-compose logs backend

# Enter container
docker-compose exec backend bash

# Test Python
docker-compose exec backend python -c "from app.main import app; print('OK')"
```

### Database Issues
```bash
# Check connection
docker-compose exec backend python -c "from app.config import settings; print(settings.DATABASE_URL)"

# Reset database
docker-compose down -v
docker-compose up -d
```

## 📞 Support

For deployment issues:
- Check logs first: `docker-compose logs`
- Review environment variables
- Verify ports are available
- Check disk space
- Open an issue on GitHub

## 🎯 Performance Optimization

### Frontend
- Enable Next.js caching
- Use CDN for static assets
- Optimize images
- Enable compression

### Backend
- Add Redis caching
- Use connection pooling
- Optimize database queries
- Enable response compression

### Database
- Create appropriate indexes
- Set up query optimization
- Configure connection pooling
- Regular VACUUM operations

---

**Last Updated**: January 2025
**Status**: Production Ready ✅
