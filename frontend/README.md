# VerityGuard Frontend

Frontend application for the VerityGuard Project Generator.

## Features

- React with Vite
- Modern UI/UX
- Responsive design
- TypeScript support
- Component-based architecture

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Testing

```bash
npm test
```

## Docker

```bash
docker build -t verityguard-frontend .
docker run -p 3000:3000 verityguard-frontend
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   └── styles/         # CSS styles
├── public/             # Static assets
├── .env.example        # Environment template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```
