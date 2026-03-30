# Frontend Engineer Assessment - Personal Milestone Tracker

This project implements a small full-stack milestone tracker using FastAPI for the backend and Next.js for the frontend. Users can view milestones, submit new ones, and see clear loading/error feedback in the UI.

## Tech Stack

- Backend: FastAPI (Python), in-memory storage
- Frontend: Next.js (App Router), React Hooks, Tailwind CSS
- API calls: `fetch` with `async/await`

## Prerequisites

- Python 3.10+ (tested with modern Python)
- Node.js 18+ and npm

## 1) Install Dependencies

### Backend

From the repository root:

```bash
cd backend
pip install -r requirements.txt
```

### Frontend

From the repository root:

```bash
cd frontend
npm install
```

## 2) Run the Backend Server

From the repository root:

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Backend URL: [http://localhost:8000](http://localhost:8000)

## 3) Run the Frontend Application

From the repository root:

```bash
cd frontend
npm run dev
```

Frontend URL: [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /milestones` - returns all milestones
- `POST /milestones` - creates a milestone with:
  - `title` (required, minimum 3 characters)
  - `category` (`Work`, `Personal`, or `Health`)

## Notes on Choices / Trade-offs

I used in-memory persistence to keep the backend intentionally simple and aligned with the 24-hour scope, trading durability for speed of implementation. I also separated API logic and UI components in the frontend to keep state flow and error handling easy to test and reason about.
