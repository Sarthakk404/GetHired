<p align="center">
  <img src="./frontend/public/favicon.svg" width="64" alt="GetHired Logo"/>
</p>

<h1 align="center">⚡ GetHired</h1>

<p align="center">
  <b>Your Ultimate Job Application Command Center</b>
  <br />
  Track · Manage · Analyze · Conquer
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-0.137-009688?style=flat-square&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/shadcn/ui-Radix-000000?style=flat-square" alt="shadcn/ui" />
</p>

---

## 🚀 The Ultimate Job Search OS

**GetHired** isn't just another job tracker — it's a **battle-tested command center** designed for serious candidates who want data-driven control over their job search. Built with a **luxury dark glassmorphism** aesthetic inspired by Linear, Vercel, and Stripe Dashboard.

> ✨ Because your job search deserves the same polish as the products you'll build.

---

## 👑 What Makes It Elite

| 🔥 Feature | 💎 What It Does |
|---|---|
| **Glassmorphism UI** | Premium dark theme with blur effects, glow accents, and smooth gradients |
| **Smooth Animations** | Every card, row, and page transitions like butter with Framer Motion |
| **Interactive Analytics** | Real-time pie charts, bar charts, and animated progress bars — powered by Recharts |
| **Battle-Ready Tables** | Search, multi-filter, sort, pagination, and bulk actions at your fingertips |
| **Zod Validation** | Bulletproof forms with instant error feedback — zero bad data gets through |
| **Toast Notifications** | Gorgeous sliding toasts for every success, error, and warning |
| **Loading Skeletons** | Pulse-animated placeholders that make waiting feel instant |
| **Responsive Core** | Desktop-first perfection, built for the modern workflow |

---

## 🧠 Tech Stack That Slaps

### 🖥 Backend — *FastAPI Excellence*

| Layer | Technology | Why It's There |
|---|---|---|
| Framework | **FastAPI 0.137** | Async Python, auto-docs, blistering speed |
| ORM | **SQLAlchemy 2.0** | Battle-proven, type-safe database wizardry |
| Database | **PostgreSQL on Neon** | Serverless, auto-scaling, always on |
| Validation | **Pydantic v2** | Zero-effort schema enforcement |

### 🎨 Frontend — *React Perfection*

| Layer | Technology | Why It's There |
|---|---|---|
| Framework | **React 19** | Latest and greatest, blazingly fast |
| Language | **TypeScript 6** | Strict typing, zero surprises |
| Build Tool | **Vite 8** | Sub-second HMR, instant builds |
| Styling | **Tailwind CSS v4** | Utility-first, infinitely composable |
| Animation | **Framer Motion 12** | Buttery smooth, production-grade motion |
| UI Kit | **shadcn/ui + Radix** | Accessible headless primitives, gorgeous out of the box |
| Forms | **React Hook Form + Zod** | Performant, validated, developer-friendly |
| Charts | **Recharts** | Declarative, responsive, beautiful |
| HTTP | **Axios** | Interceptors, error handling, clean API layer |
| Icons | **Lucide React** | Crisp, consistent, comprehensive icon set |

---

## 🎯 Features That Deliver

### 📊 Dashboard
- **Live stat cards** — Total apps, interviews, offers, rejections at a glance
- **Status breakdown** — Animated progress bars for every pipeline stage
- **Response metrics** — Offer rate, interview rate, response rate, rejection rate
- **Recent activity feed** — Latest applications and offers, always in view

### 📋 Jobs Table
- **Full CRUD** — Create, read, update, delete with instant toast feedback
- **Smart search** — Fuzzy match across company, position, and location
- **Triple filter** — Status, employment type, and work mode dropdowns
- **Sortable columns** — Click any header to sort asc/desc
- **Paginated** — 10 per page with clean pagination controls
- **Row actions** — Edit, delete, and open job URL from each row
- **Empty states** — Beautiful zero-state with CTA to create your first job

### ✏️ Smart Forms
- **Zod validation** — Required fields, URL validation, error messages that actually help
- **Dropdown selects** — Status, Job Type, Work Mode — all matching backend enums
- **Date picker** — Native date input pre-filled with today
- **Loading states** — Submit button shows spinner, form disables during save
- **Prefilled edit** — Update form loads existing data, ready to modify

### 📈 Analytics Engine
- **Status distribution** — Interactive donut chart (Recharts PieChart)
- **Employment type breakdown** — Visualize Full Time vs Contract vs Internship
- **Monthly trends** — Stacked bar chart showing Applied → Interviewing → Accepted → Rejected over time
- **Performance metrics** — Animated gradient progress bars for:
  - 🎯 Interview Rate
  - 💰 Offer Rate
  - 📈 Success Rate
  - ⚡ Response Rate

### ⚙️ Settings
- **Theme preference** — Dark mode (the only way 😎)
- **Notification toggles** — Email, reminders, interview alerts
- **API status** — Live connection indicator
- **Danger zone** — Clear all data (with safety confirmation)

---

## 🏗 Architecture at a Glance

```
GetHired/
├── app/
│   ├── main.py                 ⚡ FastAPI entry point
│   ├── database.py             🗄 DB engine, session, Base
│   ├── models.py               🧱 SQLAlchemy Job model
│   ├── schemas.py              📋 Pydantic schemas & enums
│   └── routers/
│       └── router.py           🛣 All 6 REST endpoints
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/         🧩 Sidebar, DashboardLayout
│       │   ├── shared/         💎 StatCard, AnimatedCard, EmptyState, Skeleton
│       │   └── ui/             🎨 Button, Input, Select, Card, Dialog, Toast, etc.
│       ├── hooks/              🪝 useToast
│       ├── lib/                🔌 Axios client, cn() utility
│       ├── pages/              📄 Dashboard, JobsTable, CreateJob, UpdateJob, Analytics, Settings
│       └── types/              📐 TS interfaces, constants, color maps
├── .env                        🔑 Database connection
└── requirements.txt            📦 Python dependencies
```

---

## 🛣 API Reference

| Method | Endpoint | Description | Response |
|---|---|---|---|
| `GET` | `/` | Health check | `{ "Message": "Hello World" }` |
| `POST` | `/JOBS/Create_Job` | Create a job application | `Job` object |
| `GET` | `/JOBS/Read_Jobs` | List all jobs | `[Job]` array |
| `GET` | `/JOBS/Read_Job/{id}` | Get a single job | `Job` object |
| `PUT` | `/JOBS/Update_Job/{id}` | Update a job | `Job` object |
| `DELETE` | `/JOBS/Delete_Job/{id}` | Delete a job | `{ "message": "deleted" }` |
| `GET` | `/JOBS/Analytics` | Get aggregate stats | `{ Total_Jobs, Offers, Interviews, Offer_Rate, Interview_Rate }` |

---

## 🚦 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 22+
- A PostgreSQL database (Neon recommended)

### 1️⃣ Backend Setup

```bash
# Clone & enter
git clone <repo-url> && cd GetHired

# Virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows

# Install
pip install -r requirements.txt

# Configure
echo 'DATABASE_URL="postgresql://user:pass@host/db"' > .env

# Launch
uvicorn app.main:app --reload
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server auto-proxies `/JOBS/*` to `http://localhost:8000`.

### 3️⃣ Open

**→ http://localhost:5173** — Welcome to your new job search command center.

---

## 🧬 Job Schema

| Field | Type | Options |
|---|---|---|
| `Status` | enum | `Applied`, `Online Assessment`, `Interview Scheduled`, `Interviewing`, `Rejected`, `Accepted` |
| `Job_Type` | enum | `Full Time`, `Part Time`, `Internship`, `Contract` |
| `Work_Mode` | enum | `Remote`, `On-site`, `Hybrid` |
| `Application_Date` | date | `YYYY-MM-DD` |
| `Job_URL` | string | Link to posting (optional) |
| `Notes` | text | Free text up to 500 chars (optional) |

---

## 🤝 Contributing

PRs are welcome. Keep the glassmorphism dream alive.

---

<p align="center">
  Made with ❤️ and an unhealthy amount of caffeine<br/>
  <sub>Built for job seekers who refuse to settle.</sub>
</p>
