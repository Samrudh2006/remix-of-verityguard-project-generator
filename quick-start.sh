#!/bin/bash

# VerityGuard Quick Start Script

echo "🛡️  Starting VerityGuard..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env.local ]; then
    echo "📝 Creating frontend .env.local file..."
    cp frontend/.env.example frontend/.env.local
fi

# Start services
echo "🚀 Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Initialize database
echo "🗄️  Initializing database..."
docker-compose exec -T backend python /app/../scripts/init_db.py

# Seed database
echo "🌱 Seeding database with sample data..."
docker-compose exec -T backend python /app/../scripts/seed_db.py

echo ""
echo "✅ VerityGuard is ready!"
echo ""
echo "📍 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "👤 Sample Admin Login:"
echo "   Email: admin@verityguard.com"
echo "   Password: admin123"
echo ""
echo "🛑 To stop: docker-compose down"
echo "📊 View logs: docker-compose logs -f"
