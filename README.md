# Heart Health Advisory Web System

A beginner-friendly full-stack web app that allows users to register, log in, enter health metrics, and receive a heart-risk assessment (Low/Medium/High) with recommendations.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Recharts
- **Backend**: Node.js + Express + session-based auth
- **Database**: MongoDB + Mongoose

## Project Structure
```
heart-health-app/
  backend/
  frontend/
```

## Features
- Signup/login/logout with hashed passwords (`bcryptjs`) and server sessions.
- Health dashboard input form with validations.
- Rule-based risk analysis engine + recommendation generator.
- Results page with color-coded risk and disclaimer.
- Historical report storage per user and risk trend chart.

## Local Setup

### 1) Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```
Backend runs at `http://localhost:5000`.

### 2) Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs at `http://localhost:5173`.

### 3) MongoDB
Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017` (or update `MONGO_URI` in backend `.env`).

## API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/records`
- `POST /api/records`

## Risk Rules (core)
- BP > 130/80
- Cholesterol > 200
- BMI > 25
- Smoking
- Low activity
- Diabetes
- Family history
- Optional modifiers: stress, diet, alcohol

## Disclaimer
This system is educational and advisory only. It is **not a medical diagnosis**.
