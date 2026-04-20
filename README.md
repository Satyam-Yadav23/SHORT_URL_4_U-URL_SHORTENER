# ShortUrl4U — URL Shortener

A full-stack URL shortener with QR code generation, click analytics, and user authentication.

## Tech Stack

**Frontend:** React 19, TanStack Router, Redux Toolkit, Vite, Tailwind CSS  
**Backend:** Express 5, MongoDB (Mongoose), JWT Auth, Nodemailer, nanoid

## Features

- Shorten any URL instantly (no sign-up required)
- Generate QR codes for any link
- User registration & login with JWT
- Dashboard to view and manage your shortened URLs
- Click tracking analytics
- Forgot / reset password via email

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd BACKEND
npm install
# create a .env file with your MongoDB URI, JWT secret, email config, etc.
npm run dev
```

### Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000` by default.

## Project Structure

```
BACKEND/          Express REST API
  src/
    config/       App & database config
    controller/   Route handlers
    dao/          Data access layer
    middleware/   Auth middleware
    models/       Mongoose schemas
    routes/       API routes
    services/     Business logic
    utils/        Helpers & error handling

FRONTEND/         React SPA
  src/
    api/          Axios API calls
    components/   Reusable UI components
    pages/        Page components
    routing/      TanStack Router config
    store/        Redux store & slices
    utils/        Axios instance & helpers
```

## License

MIT