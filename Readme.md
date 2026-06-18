<p align="center">
  <img src="./frontend/public/favicon.svg" width="64" alt="GetHired Logo"/>
</p>

<h1 align="center">⚡ GetHired</h1>

<p align="center">
  <b>Job Application Tracker</b>
  <br />
  Track · Manage · Analyze
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-0.137-009688?style=flat-square&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/SQLAlchemy-2.0-4479A1?style=flat-square" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer" alt="Framer Motion" />
</p>

---

## 📋 Overview

GetHired is a full-stack job application tracker built with **FastAPI** on the backend and **React** on the frontend. It helps you manage job applications, track their status through the pipeline, and gain insights through analytics.

---

## 🖥 Backend — FastAPI + PostgreSQL

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | **FastAPI 0.137** |
| ORM | **SQLAlchemy 2.0** |
| Database | **PostgreSQL** (Neon serverless) |
| Validation | **Pydantic v2** |
| Server | **Uvicorn** |

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/JOBS/Create_Job` | Create a job application |
| `GET` | `/JOBS/Read_Jobs` | List all job applications |
| `GET` | `/JOBS/Read_Job/{id}` | Get a single job by ID |
| `PUT` | `/JOBS/Update_Job/{id}` | Update a job application |
| `DELETE` | `/JOBS/Delete_Job/{id}` | Delete a job application |
| `GET` | `/JOBS/Analytics` | Get aggregate stats (total, offers, interviews, rates) |

### Database Schema

**Table: `jobs`**

| Column | Type | Notes |
|---|---|---|
| `Id` | `INTEGER PK` | Auto-increment |
| `Company` | `VARCHAR(100)` | |
| `Position` | `VARCHAR(100)` | |
| `Company_Location` | `VARCHAR(100)` | |
| `Application_Date` | `DATE` | |
| `Status` | `VARCHAR(100)` | Enum: Applied, Online Assessment, Interview Scheduled, Interviewing, Rejected, Accepted |
| `Job_Type` | `VARCHAR(100)` | Enum: Full Time, Part Time, Internship, Contract |
| `Work_Mode` | `VARCHAR(100)` | Enum: Remote, On-site, Hybrid |
| `Job_URL` | `VARCHAR(200)` | Nullable |
| `Notes` | `VARCHAR(500)` | Nullable |

### Project Structure

```
app/
├── main.py              # FastAPI app entry, CORS, router mount
├── database.py          # Engine, session, Base declarative
├── models.py            # SQLAlchemy Jobs model
├── schemas.py           # Pydantic models + enums (Status, Job_Type, Work_Mode)
└── routers/
    └── router.py        # All 7 endpoints with DB logic
```

### Running the Backend

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # macOS/Linux

pip install -r requirements.txt

# Configure .env with your database URL
echo 'DATABASE_URL="postgresql://user:pass@host/db"' > .env

uvicorn app.main:app --reload
```

The API docs are available at `http://localhost:8000/docs`.

---

## 🎨 Frontend — React + Vite

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | **React 19** |
| Language | **JavaScript (JSX)** |
| Build Tool | **Vite 8** |
| Styling | **Tailwind CSS v4** |
| Animation | **Framer Motion 12** |
| UI Components | **shadcn/ui** (Radix primitives) |
| Forms | **React Hook Form + Zod** |
| Charts | **Recharts** |
| HTTP | **Axios** |
| Icons | **Lucide React** |

### Pages

- **Dashboard** — Overview with stat cards, status breakdown bars, recent applications, latest offers
- **Jobs Table** — Full CRUD with search, multi-filter (status/type/mode), sortable columns, pagination
- **Create Job** — Validated form with dropdowns for all enum fields
- **Edit Job** — Prefilled form for updating existing entries
- **Analytics** — Pie charts (status & type distribution), stacked bar chart (monthly trends), performance metrics with animated progress bars
- **Settings** — Theme, notification toggles, API connection status

### Project Structure

```
frontend/src/
├── components/
│   ├── layout/          # Sidebar, DashboardLayout
│   ├── shared/          # StatCard, AnimatedCard, EmptyState, LoadingSkeleton
│   └── ui/              # Button, Input, Select, Card, Dialog, Toast, Badge, etc.
├── hooks/               # useToast
├── lib/                 # Axios client, constants, utilities
├── pages/               # Dashboard, JobsTable, CreateJob, UpdateJob, Analytics, Settings
├── App.jsx              # Router setup
└── main.jsx             # Entry point
```

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. The Vite dev server proxies `/JOBS/*` requests to the backend at `http://localhost:8000`.

---

## 🧬 Data Flow

```
User Action → React Component → Axios → FastAPI Endpoint → SQLAlchemy → PostgreSQL
                  ↕                                      ↕
           Recharts (charts)                     Pydantic (validation)
           Framer Motion (UI)                    Enum (status/type/mode)
```

---

## 🚦 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 22+
- PostgreSQL database (or [Neon](https://neon.tech) connection string)

### 1. Backend

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
echo 'DATABASE_URL="postgresql://..."' > .env
uvicorn app.main:app --reload
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open

**→ http://localhost:5173**

---

## 📦 Dependencies

### Backend (`requirements.txt`)

| Package | Version |
|---|---|
| `fastapi` | 0.137.1 |
| `uvicorn` | 0.49.0 |
| `SQLAlchemy` | 2.0.51 |
| `pydantic` | 2.13.4 |
| `python-dotenv` | 1.2.2 |

### Frontend (`package.json`)

| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client |
| `framer-motion` | Animations |
| `react-hook-form` + `zod` | Form validation |
| `recharts` | Charts |
| `lucide-react` | Icons |
| `tailwindcss` | Styling |
| `@radix-ui/*` | Accessible UI primitives |
