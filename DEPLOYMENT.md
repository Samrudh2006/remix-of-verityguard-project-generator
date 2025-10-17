# VerityGuard Deployment Guide

This guide covers deploying VerityGuard to various platforms.

## Prerequisites

- Git repository
- PostgreSQL database (managed or self-hosted)
- Redis instance (optional but recommended)
- Docker (for containerized deployment)

## Environment Variables

### Backend
```env
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=generate-a-secure-random-key
REDIS_URL=redis://host:port/0
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Frontend
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Deployment Options

### Option 1: Railway (Recommended for Backend)

1. **Create New Project** on Railway
2. **Deploy from GitHub**
   - Connect your repository
   - Select the `backend` folder
3. **Add PostgreSQL** from Railway marketplace
4. **Set Environment Variables**
   - `DATABASE_URL` (auto-set by Railway)
   - `SECRET_KEY` (generate secure key)
   - `REDIS_URL` (if using Redis addon)
5. **Deploy**
   - Railway auto-deploys on git push

### Option 2: Vercel (Recommended for Frontend)

1. **Import Project** from GitHub
2. **Configure Build Settings**
   - Framework: Next.js
   - Root Directory: `frontend`
3. **Set Environment Variables**
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app`
4. **Deploy**
   - Vercel auto-deploys on git push

### Option 3: Render

#### Backend Service
1. Create new **Web Service**
2. Connect repository
3. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Root Directory: `backend`
4. Add PostgreSQL database
5. Set environment variables
6. Deploy

#### Frontend Service
1. Create new **Static Site**
2. Connect repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `.next`
   - Root Directory: `frontend`
4. Set environment variables
5. Deploy

### Option 4: Fly.io

#### Backend
```bash
cd backend
fly launch --name verityguard-api
fly secrets set SECRET_KEY=your-secret-key
fly secrets set DATABASE_URL=your-database-url
fly deploy
```

#### Frontend
```bash
cd frontend
fly launch --name verityguard-web
fly secrets set NEXT_PUBLIC_API_URL=https://verityguard-api.fly.dev
fly deploy
```

### Option 5: Docker + VPS

1. **Prepare VPS** (Ubuntu/Debian)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Clone Repository**
```bash
git clone your-repo-url
cd verityguard
```

3. **Configure Environment**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edit .env files with production values
```

4. **Deploy with Docker Compose**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

5. **Setup Nginx** (if not using nginx container)
```bash
sudo apt install nginx
# Copy nginx.conf to /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/verityguard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Database Setup

### Initialize Database
```bash
# Via Docker
docker-compose exec backend python /app/../scripts/init_db.py

# Direct
cd backend
python ../scripts/init_db.py
```

### Seed Sample Data
```bash
# Via Docker
docker-compose exec backend python /app/../scripts/seed_db.py

# Direct
cd backend
python ../scripts/seed_db.py
```

## Post-Deployment

### 1. Update CORS Origins
Update `backend/.env`:
```env
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 2. Change Default Admin Password
- Login with admin@verityguard.com / admin123
- Change password immediately

### 3. Configure External APIs (Optional)
```env
GOOGLE_TRANSLATE_KEY=your-key
REDDIT_CLIENT_ID=your-client-id
REDDIT_CLIENT_SECRET=your-secret
```

### 4. Setup Monitoring
- Enable error tracking (Sentry, etc.)
- Setup uptime monitoring
- Configure log aggregation

### 5. Backup Strategy
- Automated database backups
- Repository backups
- Configuration backups

## Scaling

### Horizontal Scaling
- Deploy multiple backend instances behind load balancer
- Use managed PostgreSQL with replication
- Use Redis for session storage and caching

### Performance Optimization
- Enable CDN for static assets
- Configure caching headers
- Optimize database queries
- Use connection pooling

## Monitoring

### Health Checks
- Backend: `GET /health`
- Database: Connection check
- Redis: Ping check

### Logging
- Application logs
- Error logs
- Access logs
- Audit logs

### Metrics to Track
- API response times
- Database query performance
- Error rates
- User activity
- Trust score accuracy

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Check firewall rules

2. **CORS Errors**
   - Update CORS_ORIGINS in backend
   - Check frontend API URL

3. **Build Failures**
   - Clear build cache
   - Verify dependencies
   - Check Node/Python versions

4. **ML Models Not Loading**
   - Ensure sufficient memory
   - Download spaCy models manually
   - Check model paths

## Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Change default admin password
- [ ] Enable HTTPS
- [ ] Configure firewall
- [ ] Set up rate limiting
- [ ] Enable CORS for specific origins only
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] Secure environment variables
- [ ] Monitor for suspicious activity

## Rollback Procedure

### Docker Deployment
```bash
# Revert to previous version
docker-compose pull
docker-compose up -d
```

### Git-based Deployment
```bash
# Rollback to previous commit
git revert HEAD
git push
```

## Support

For deployment issues:
1. Check application logs
2. Review deployment platform docs
3. Open GitHub issue
4. Check troubleshooting section

---

Need help? Open an issue on GitHub!
