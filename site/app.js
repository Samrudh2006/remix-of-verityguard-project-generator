// VerityGuard Project Generator - Main Application

// Configuration
const config = {
  features: {
    auth: {
      name: 'Authentication & Authorization',
      files: ['auth.service.js', 'jwt.middleware.js', 'user.model.js'],
      dependencies: ['jsonwebtoken', 'bcryptjs', 'passport']
    },
    docker: {
      name: 'Docker & Docker Compose',
      files: ['Dockerfile', 'docker-compose.yml', '.dockerignore'],
      dependencies: []
    },
    cicd: {
      name: 'CI/CD Pipeline',
      files: ['.github/workflows/ci.yml', '.github/workflows/deploy.yml'],
      dependencies: []
    },
    testing: {
      name: 'Testing Suite',
      files: ['jest.config.js', 'cypress.config.js', 'tests/'],
      dependencies: ['jest', 'supertest', 'cypress', '@testing-library/react']
    },
    monitoring: {
      name: 'Monitoring & Logging',
      files: ['winston.config.js', 'prometheus.config.js'],
      dependencies: ['winston', 'prom-client', 'morgan']
    },
    swagger: {
      name: 'API Documentation',
      files: ['swagger.config.js', 'docs/api.yml'],
      dependencies: ['swagger-ui-express', 'swagger-jsdoc']
    },
    websockets: {
      name: 'Real-time WebSockets',
      files: ['websocket.server.js', 'socket.client.js'],
      dependencies: ['socket.io', 'socket.io-client']
    },
    cache: {
      name: 'Caching Layer',
      files: ['redis.config.js', 'cache.service.js'],
      dependencies: ['redis', 'ioredis']
    },
    graphql: {
      name: 'GraphQL API',
      files: ['schema.graphql', 'resolvers.js', 'graphql.server.js'],
      dependencies: ['graphql', 'apollo-server-express', '@graphql-tools/schema']
    },
    microservices: {
      name: 'Microservices Architecture',
      files: ['services/', 'api-gateway/', 'message-broker/'],
      dependencies: ['express', 'amqplib', 'consul']
    },
    kubernetes: {
      name: 'Kubernetes Deployment',
      files: ['k8s/deployment.yml', 'k8s/service.yml', 'k8s/ingress.yml'],
      dependencies: []
    },
    email: {
      name: 'Email Service',
      files: ['email.service.js', 'templates/email/'],
      dependencies: ['nodemailer', 'handlebars']
    }
  },
  templates: {
    ecommerce: {
      name: 'E-Commerce Platform',
      description: 'Complete e-commerce solution with cart, checkout, and payments',
      frontend: 'react',
      backend: 'express',
      database: 'postgresql',
      features: ['auth', 'docker', 'cicd', 'testing', 'swagger', 'cache', 'email']
    },
    saas: {
      name: 'SaaS Starter',
      description: 'Multi-tenant SaaS with subscriptions and billing',
      frontend: 'vue',
      backend: 'fastapi',
      database: 'mongodb',
      features: ['auth', 'docker', 'cicd', 'testing', 'swagger', 'monitoring', 'email']
    },
    social: {
      name: 'Social Network',
      description: 'Social platform with posts, chat, and notifications',
      frontend: 'angular',
      backend: 'gin',
      database: 'postgresql',
      features: ['auth', 'docker', 'websockets', 'cache', 'monitoring', 'email']
    }
  }
};

// Utility Functions
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type} show`;
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

function scrollToGenerator() {
  const generator = document.getElementById('generator');
  generator.scrollIntoView({ behavior: 'smooth' });
}

function showFeatures() {
  const features = document.getElementById('features');
  features.scrollIntoView({ behavior: 'smooth' });
}

// Project Generation
function generateProject(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const projectName = formData.get('projectName');
  const projectType = formData.get('projectType');
  const frontend = formData.get('frontend');
  const backend = formData.get('backend');
  const database = formData.get('database');
  const features = formData.getAll('features');
  
  // Validate inputs
  if (!projectName || !projectType || !frontend || !backend || !database) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  // Generate project structure
  const projectStructure = generateProjectStructure({
    projectName,
    projectType,
    frontend,
    backend,
    database,
    features
  });
  
  // Show success message
  showNotification('Project structure generated successfully! Check the console for details.');
  
  // Log the project structure
  console.log('Generated Project Structure:', projectStructure);
  
  // Download project files
  downloadProjectFiles(projectStructure);
}

function generateProjectStructure(options) {
  const { projectName, projectType, frontend, backend, database, features } = options;
  
  const structure = {
    projectName,
    projectType,
    frontend,
    backend,
    database,
    features,
    directories: [],
    files: []
  };
  
  // Add base directories
  structure.directories.push(
    projectName,
    `${projectName}/frontend`,
    `${projectName}/backend`,
    `${projectName}/database`,
    `${projectName}/docs`,
    `${projectName}/scripts`,
    `${projectName}/.github`,
    `${projectName}/.github/workflows`
  );
  
  // Add frontend structure
  const frontendDirs = generateFrontendStructure(frontend, projectName);
  structure.directories.push(...frontendDirs.directories);
  structure.files.push(...frontendDirs.files);
  
  // Add backend structure
  const backendDirs = generateBackendStructure(backend, projectName);
  structure.directories.push(...backendDirs.directories);
  structure.files.push(...backendDirs.files);
  
  // Add database structure
  const dbFiles = generateDatabaseStructure(database, projectName);
  structure.files.push(...dbFiles);
  
  // Add feature-specific files
  features.forEach(feature => {
    if (config.features[feature]) {
      const featureFiles = config.features[feature].files.map(file => 
        `${projectName}/backend/${file}`
      );
      structure.files.push(...featureFiles);
    }
  });
  
  // Add common files
  structure.files.push(
    `${projectName}/README.md`,
    `${projectName}/.gitignore`,
    `${projectName}/.env.example`,
    `${projectName}/LICENSE`,
    `${projectName}/package.json`
  );
  
  return structure;
}

function generateFrontendStructure(framework, projectName) {
  const base = `${projectName}/frontend`;
  
  const common = {
    directories: [
      `${base}/src`,
      `${base}/src/components`,
      `${base}/src/pages`,
      `${base}/src/services`,
      `${base}/src/utils`,
      `${base}/src/hooks`,
      `${base}/src/assets`,
      `${base}/src/styles`,
      `${base}/public`
    ],
    files: [
      `${base}/package.json`,
      `${base}/tsconfig.json`,
      `${base}/.eslintrc.js`,
      `${base}/.prettierrc`,
      `${base}/vite.config.ts`,
      `${base}/index.html`,
      `${base}/src/main.tsx`,
      `${base}/src/App.tsx`,
      `${base}/src/vite-env.d.ts`
    ]
  };
  
  // Framework-specific additions
  switch (framework) {
    case 'react':
      common.files.push(
        `${base}/src/components/Header.tsx`,
        `${base}/src/components/Footer.tsx`,
        `${base}/src/pages/Home.tsx`,
        `${base}/src/pages/About.tsx`
      );
      break;
    case 'vue':
      common.files.push(
        `${base}/src/components/Header.vue`,
        `${base}/src/components/Footer.vue`,
        `${base}/src/views/Home.vue`,
        `${base}/src/views/About.vue`
      );
      break;
    case 'angular':
      common.directories.push(
        `${base}/src/app`,
        `${base}/src/app/components`,
        `${base}/src/app/services`
      );
      common.files.push(
        `${base}/angular.json`,
        `${base}/src/app/app.module.ts`,
        `${base}/src/app/app.component.ts`
      );
      break;
    case 'svelte':
      common.files.push(
        `${base}/svelte.config.js`,
        `${base}/src/routes/+page.svelte`,
        `${base}/src/routes/+layout.svelte`
      );
      break;
  }
  
  return common;
}

function generateBackendStructure(framework, projectName) {
  const base = `${projectName}/backend`;
  
  const common = {
    directories: [
      `${base}/src`,
      `${base}/src/controllers`,
      `${base}/src/models`,
      `${base}/src/routes`,
      `${base}/src/middleware`,
      `${base}/src/services`,
      `${base}/src/utils`,
      `${base}/src/config`,
      `${base}/tests`
    ],
    files: [
      `${base}/package.json`,
      `${base}/tsconfig.json`,
      `${base}/.eslintrc.js`,
      `${base}/.env.example`,
      `${base}/src/index.ts`,
      `${base}/src/app.ts`
    ]
  };
  
  // Framework-specific additions
  switch (framework) {
    case 'express':
      common.files.push(
        `${base}/src/server.ts`,
        `${base}/src/routes/index.ts`,
        `${base}/src/middleware/error.middleware.ts`,
        `${base}/src/controllers/user.controller.ts`,
        `${base}/src/models/user.model.ts`
      );
      break;
    case 'fastapi':
      common.files.push(
        `${base}/main.py`,
        `${base}/requirements.txt`,
        `${base}/src/routers/__init__.py`,
        `${base}/src/models/__init__.py`,
        `${base}/src/schemas/__init__.py`
      );
      break;
    case 'gin':
      common.files.push(
        `${base}/go.mod`,
        `${base}/main.go`,
        `${base}/src/handlers/user.go`,
        `${base}/src/models/user.go`,
        `${base}/src/middleware/auth.go`
      );
      break;
    case 'spring':
      common.files.push(
        `${base}/pom.xml`,
        `${base}/src/main/java/Application.java`,
        `${base}/src/main/resources/application.properties`
      );
      break;
  }
  
  return common;
}

function generateDatabaseStructure(database, projectName) {
  const base = `${projectName}/database`;
  
  const files = [
    `${base}/schema.sql`,
    `${base}/migrations/`,
    `${base}/seeds/`
  ];
  
  switch (database) {
    case 'postgresql':
      files.push(
        `${base}/init.sql`,
        `${base}/migrations/001_create_users_table.sql`,
        `${base}/migrations/002_create_sessions_table.sql`
      );
      break;
    case 'mongodb':
      files.push(
        `${base}/schemas/user.schema.js`,
        `${base}/schemas/session.schema.js`
      );
      break;
    case 'mysql':
      files.push(
        `${base}/init.sql`,
        `${base}/migrations/001_create_users_table.sql`
      );
      break;
    case 'redis':
      files.push(
        `${base}/redis.conf`,
        `${base}/keys.example`
      );
      break;
  }
  
  return files;
}

function downloadProjectFiles(structure) {
  // Generate README content
  const readme = generateReadme(structure);
  
  // Generate package.json
  const packageJson = generatePackageJson(structure);
  
  // Generate docker-compose.yml
  const dockerCompose = generateDockerCompose(structure);
  
  // Generate .gitignore
  const gitignore = generateGitignore();
  
  // Create a comprehensive project archive
  const projectFiles = {
    'README.md': readme,
    'package.json': packageJson,
    'docker-compose.yml': dockerCompose,
    '.gitignore': gitignore,
    '.env.example': generateEnvExample(structure),
    'LICENSE': generateLicense(),
    '.github/workflows/ci.yml': generateCIWorkflow(structure),
    '.github/workflows/deploy.yml': generateDeployWorkflow(structure)
  };
  
  // Log the files
  console.log('Project Files Generated:');
  Object.keys(projectFiles).forEach(file => {
    console.log(`  - ${file}`);
  });
  
  // Create download package info
  const downloadInfo = {
    projectName: structure.projectName,
    files: Object.keys(projectFiles),
    structure: structure,
    generatedAt: new Date().toISOString()
  };
  
  console.log('Download Info:', downloadInfo);
  
  // Show download instructions
  showDownloadInstructions(structure.projectName);
}

function generateReadme(structure) {
  return `# ${structure.projectName}

Generated with VerityGuard Project Generator

## Tech Stack

- **Frontend**: ${structure.frontend}
- **Backend**: ${structure.backend}
- **Database**: ${structure.database}

## Features

${structure.features.map(f => `- ${config.features[f]?.name || f}`).join('\n')}

## Getting Started

### Prerequisites

- Node.js 18+ (for frontend/backend)
- Docker & Docker Compose
- ${structure.database} database

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Start development servers:
   \`\`\`bash
   npm run dev
   \`\`\`

### Docker

Run with Docker Compose:
\`\`\`bash
docker-compose up
\`\`\`

## Project Structure

\`\`\`
${structure.projectName}/
├── frontend/          # Frontend application
├── backend/           # Backend API
├── database/          # Database scripts
├── docs/              # Documentation
└── scripts/           # Utility scripts
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## Deployment

\`\`\`bash
npm run build
npm run deploy
\`\`\`

## License

MIT

## Generated

${new Date().toISOString()}
`;
}

function generatePackageJson(structure) {
  const dependencies = {};
  const devDependencies = {};
  
  // Add feature dependencies
  structure.features.forEach(feature => {
    if (config.features[feature]) {
      config.features[feature].dependencies.forEach(dep => {
        dependencies[dep] = 'latest';
      });
    }
  });
  
  return JSON.stringify({
    name: structure.projectName,
    version: '1.0.0',
    description: `Generated with VerityGuard - ${structure.projectType}`,
    scripts: {
      dev: 'concurrently "npm run dev:frontend" "npm run dev:backend"',
      'dev:frontend': 'cd frontend && npm run dev',
      'dev:backend': 'cd backend && npm run dev',
      build: 'npm run build:frontend && npm run build:backend',
      'build:frontend': 'cd frontend && npm run build',
      'build:backend': 'cd backend && npm run build',
      test: 'npm run test:frontend && npm run test:backend',
      'test:frontend': 'cd frontend && npm test',
      'test:backend': 'cd backend && npm test',
      lint: 'npm run lint:frontend && npm run lint:backend',
      docker: 'docker-compose up',
      'docker:build': 'docker-compose build'
    },
    dependencies,
    devDependencies: {
      concurrently: 'latest',
      ...devDependencies
    }
  }, null, 2);
}

function generateDockerCompose(structure) {
  let services = {
    frontend: {
      build: './frontend',
      ports: ['3000:3000'],
      environment: ['NODE_ENV=development'],
      volumes: ['./frontend:/app', '/app/node_modules']
    },
    backend: {
      build: './backend',
      ports: ['5000:5000'],
      environment: ['NODE_ENV=development', 'DATABASE_URL=${DATABASE_URL}'],
      volumes: ['./backend:/app', '/app/node_modules'],
      depends_on: ['database']
    }
  };
  
  // Add database service
  switch (structure.database) {
    case 'postgresql':
      services.database = {
        image: 'postgres:15',
        environment: ['POSTGRES_PASSWORD=password', 'POSTGRES_DB=mydb'],
        ports: ['5432:5432'],
        volumes: ['postgres_data:/var/lib/postgresql/data']
      };
      break;
    case 'mongodb':
      services.database = {
        image: 'mongo:6',
        environment: ['MONGO_INITDB_ROOT_USERNAME=admin', 'MONGO_INITDB_ROOT_PASSWORD=password'],
        ports: ['27017:27017'],
        volumes: ['mongo_data:/data/db']
      };
      break;
    case 'mysql':
      services.database = {
        image: 'mysql:8',
        environment: ['MYSQL_ROOT_PASSWORD=password', 'MYSQL_DATABASE=mydb'],
        ports: ['3306:3306'],
        volumes: ['mysql_data:/var/lib/mysql']
      };
      break;
    case 'redis':
      services.database = {
        image: 'redis:7',
        ports: ['6379:6379'],
        volumes: ['redis_data:/data']
      };
      break;
  }
  
  const compose = {
    version: '3.8',
    services,
    volumes: {
      postgres_data: null,
      mongo_data: null,
      mysql_data: null,
      redis_data: null
    }
  };
  
  return JSON.stringify(compose, null, 2);
}

function generateGitignore() {
  return `# Dependencies
node_modules/
vendor/
__pycache__/
*.pyc

# Build outputs
dist/
build/
*.exe
*.dll
*.so

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Docker
*.dockerfile
`;
}

function generateEnvExample(structure) {
  return `# Application
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=${getDatabaseUrl(structure.database)}

# Authentication
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRES_IN=7d

# Email (if using email feature)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password

# Redis (if using cache)
REDIS_URL=redis://localhost:6379

# Monitoring
LOG_LEVEL=info
`;
}

function getDatabaseUrl(database) {
  switch (database) {
    case 'postgresql':
      return 'postgresql://user:password@localhost:5432/mydb';
    case 'mongodb':
      return 'mongodb://admin:password@localhost:27017/mydb';
    case 'mysql':
      return 'mysql://user:password@localhost:3306/mydb';
    case 'redis':
      return 'redis://localhost:6379';
    default:
      return 'DATABASE_URL_HERE';
  }
}

function generateLicense() {
  return `MIT License

Copyright (c) ${new Date().getFullYear()}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

function generateCIWorkflow(structure) {
  return `name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
`;
}

function generateDeployWorkflow(structure) {
  return `name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: echo "Deploy to your platform"
`;
}

function showDownloadInstructions(projectName) {
  const instructions = `
Project ${projectName} generated successfully!

To download your project:
1. Check the browser console for the complete file structure
2. Copy the generated files to your local machine
3. Run 'npm install' in the project directory
4. Configure your .env file
5. Run 'npm run dev' to start development

For a complete download, you can use the project generator CLI:
npm install -g verityguard-generator
verityguard generate ${projectName}
`;
  
  console.log(instructions);
  alert(instructions);
}

// Template Functions
function useTemplate(templateName) {
  const template = config.templates[templateName];
  
  if (!template) {
    showNotification('Template not found', 'error');
    return;
  }
  
  // Auto-fill the form
  document.getElementById('projectName').value = `${templateName}-project`;
  document.getElementById('projectType').value = 'fullstack';
  
  // Set radio buttons
  document.querySelector(`input[name="frontend"][value="${template.frontend}"]`).checked = true;
  document.querySelector(`input[name="backend"][value="${template.backend}"]`).checked = true;
  document.querySelector(`input[name="database"][value="${template.database}"]`).checked = true;
  
  // Set checkboxes
  document.querySelectorAll('input[name="features"]').forEach(checkbox => {
    checkbox.checked = template.features.includes(checkbox.value);
  });
  
  // Scroll to generator
  scrollToGenerator();
  
  showNotification(`Template "${template.name}" loaded!`);
}

function downloadTemplate() {
  const form = document.getElementById('projectForm');
  const formData = new FormData(form);
  
  const config = {
    projectName: formData.get('projectName'),
    projectType: formData.get('projectType'),
    frontend: formData.get('frontend'),
    backend: formData.get('backend'),
    database: formData.get('database'),
    features: formData.getAll('features')
  };
  
  // Create JSON blob
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = `${config.projectName}-config.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification('Template configuration downloaded!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('VerityGuard Project Generator initialized');
  console.log('Available features:', Object.keys(config.features));
  console.log('Available templates:', Object.keys(config.templates));
});
