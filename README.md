# Task Management App

A modern task management application built with a microservices architecture, featuring a React frontend and NestJS backend.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS
- Docker

### Backend
- NestJS
- TypeScript
- PostgreSQL database
- JWT authentication
- Docker

### Infrastructure
- Docker Compose
- PostgreSQL
- PgAdmin

## Project Setup

### Prerequisites
- Docker and Docker Compose installed
- Node.js (v16 or higher) for local development
- Git

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/custapq/Task-Management-App.git
cd Task-Management-App
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

This will start:
- Frontend on http://localhost:5173
- Backend API on http://localhost:3000
- PostgreSQL database on port 5432
- PgAdmin on http://localhost:8888

### Development Setup

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

#### Backend Development
```bash
cd backend
npm install
npm run start:dev
```

## Environment Variables

### Backend
- `PORT`: 3000
- `DB_HOST`: localhost
- `DB_PORT`: 5432
- `DB_USERNAME`: root
- `DB_PASSWORD`: 1234
- `DB_NAME`: local_db
- `JWT_SECRET`: teeradon
- `CONNECTION_STRING`: postgresql://root:1234@localhost:5432/local_db

### Frontend
- `http://localhost:3000/`: Backend API URL
