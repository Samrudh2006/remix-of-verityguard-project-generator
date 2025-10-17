# VerityGuard Backend API

Backend API server for the VerityGuard Project Generator.

## Features

- Express.js server
- RESTful API endpoints
- JWT authentication
- Request validation
- Rate limiting
- Security middleware
- Error handling
- Logging

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Run Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### API Endpoints

- `GET /health` - Health check
- `GET /api` - API information
- `GET /api/projects` - List projects
- `POST /api/projects/generate` - Generate new project
- `GET /api/templates` - List templates
- `GET /api/features` - List available features

## Testing

```bash
npm test
```

## Docker

```bash
docker build -t verityguard-backend .
docker run -p 5000:5000 verityguard-backend
```

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Main entry point
│   ├── controllers/      # Route controllers
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── services/        # Business logic
│   ├── config/          # Configuration
│   └── utils/           # Utility functions
├── tests/               # Test files
├── .env.example         # Environment template
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies
```
