import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'VerityGuard API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      projects: '/api/projects',
      templates: '/api/templates',
      features: '/api/features'
    }
  });
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        type: 'fullstack',
        frontend: 'react',
        backend: 'express',
        database: 'postgresql',
        features: ['auth', 'docker', 'cicd', 'testing'],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Social Network',
        type: 'fullstack',
        frontend: 'vue',
        backend: 'fastapi',
        database: 'mongodb',
        features: ['auth', 'websockets', 'cache'],
        createdAt: new Date().toISOString()
      }
    ]
  });
});

// Templates endpoint
app.get('/api/templates', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'ecommerce',
        name: 'E-Commerce Platform',
        description: 'Complete e-commerce solution',
        frontend: 'react',
        backend: 'express',
        database: 'postgresql',
        features: ['auth', 'docker', 'cicd', 'testing', 'swagger', 'cache', 'email']
      },
      {
        id: 'saas',
        name: 'SaaS Starter',
        description: 'Multi-tenant SaaS application',
        frontend: 'vue',
        backend: 'fastapi',
        database: 'mongodb',
        features: ['auth', 'docker', 'cicd', 'testing', 'swagger', 'monitoring', 'email']
      },
      {
        id: 'social',
        name: 'Social Network',
        description: 'Social platform with real-time features',
        frontend: 'angular',
        backend: 'gin',
        database: 'postgresql',
        features: ['auth', 'docker', 'websockets', 'cache', 'monitoring', 'email']
      }
    ]
  });
});

// Features endpoint
app.get('/api/features', (req, res) => {
  res.json({
    success: true,
    data: {
      auth: {
        name: 'Authentication & Authorization',
        description: 'JWT, OAuth2, 2FA, role-based access control',
        category: 'security'
      },
      docker: {
        name: 'Docker & Docker Compose',
        description: 'Containerization with Docker',
        category: 'devops'
      },
      cicd: {
        name: 'CI/CD Pipeline',
        description: 'Automated testing and deployment',
        category: 'devops'
      },
      testing: {
        name: 'Testing Suite',
        description: 'Unit, integration, and E2E tests',
        category: 'quality'
      },
      monitoring: {
        name: 'Monitoring & Logging',
        description: 'Application monitoring and log management',
        category: 'observability'
      },
      swagger: {
        name: 'API Documentation',
        description: 'Auto-generated API documentation',
        category: 'documentation'
      },
      websockets: {
        name: 'Real-time WebSockets',
        description: 'Real-time bi-directional communication',
        category: 'features'
      },
      cache: {
        name: 'Caching Layer',
        description: 'Redis-based caching for performance',
        category: 'performance'
      },
      graphql: {
        name: 'GraphQL API',
        description: 'GraphQL API with Apollo Server',
        category: 'api'
      },
      microservices: {
        name: 'Microservices Architecture',
        description: 'Microservices with message broker',
        category: 'architecture'
      },
      kubernetes: {
        name: 'Kubernetes Deployment',
        description: 'Container orchestration with K8s',
        category: 'devops'
      },
      email: {
        name: 'Email Service',
        description: 'Email sending with templates',
        category: 'features'
      }
    }
  });
});

// Generate project endpoint
app.post('/api/projects/generate', (req, res) => {
  const { projectName, projectType, frontend, backend, database, features } = req.body;
  
  // Validation
  if (!projectName || !projectType || !frontend || !backend || !database) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }
  
  // Generate project structure
  const project = {
    id: Date.now().toString(),
    projectName,
    projectType,
    frontend,
    backend,
    database,
    features: features || [],
    createdAt: new Date().toISOString(),
    status: 'generated',
    structure: {
      directories: [
        `${projectName}/frontend`,
        `${projectName}/backend`,
        `${projectName}/database`,
        `${projectName}/docs`
      ],
      files: [
        `${projectName}/README.md`,
        `${projectName}/docker-compose.yml`,
        `${projectName}/.gitignore`,
        `${projectName}/.env.example`
      ]
    }
  };
  
  res.json({
    success: true,
    data: project,
    message: 'Project generated successfully'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 VerityGuard API running on http://localhost:${PORT}`);
    console.log(`📚 API documentation: http://localhost:${PORT}/api`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
  });
}

export default app;
