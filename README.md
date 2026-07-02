# EMB Ayub Enterprises — Full Stack Website

A premium corporate website for **EMB Ayub Enterprises**, a diversified holding company. Built with Next.js 15, Node.js/Express, and MongoDB. Inspired by Arc Browser × Apple × Stripe × Linear.

---

## 🏗️ Project Structure

```
emb-ayub-enterprises/
├── frontend/               # Next.js 15 App Router
│   ├── app/
│   │   ├── page.tsx        # Homepage
│   │   ├── blog/           # Blog listing & post pages
│   │   └── admin/          # Admin dashboard (auth-protected)
│   │       ├── page.tsx    # Login
│   │       ├── dashboard/  # Analytics overview
│   │       ├── contacts/   # Contact management
│   │       ├── blog/       # Blog CMS (create/edit/delete)
│   │       └── ventures/   # Ventures management
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Hero, About, Ventures, Services, etc.
│   │   └── admin/          # BlogForm, VentureForm
│   └── lib/
│       ├── api.ts          # API client + TypeScript types
│       └── utils.ts        # Helpers, formatters
│
├── backend/                # Node.js + Express REST API
│   ├── server.js           # Entry point
│   ├── models/             # Mongoose schemas
│   │   ├── Admin.js
│   │   ├── Contact.js
│   │   ├── Blog.js
│   │   └── Venture.js
│   ├── controllers/        # Business logic
│   ├── routes/index.js     # All API routes
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   └── errorHandler.js
│   ├── config/database.js
│   └── utils/seed.js       # Database seeder
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd emb-ayub-enterprises

# Install all dependencies
cd backend && npm install
cd ../frontend && npm install
```

---

### 2. Configure Environment

**Backend** — create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/emb-ayub
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@embayub.com
ADMIN_PASSWORD=Admin@123456
FRONTEND_URL=http://localhost:3000
```

**Frontend** — create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user (email/password from `.env`)
- 2 active ventures (AdzSquare, Masala Udyog)
- 3 future ventures (Tax & Audit, Consulting, Technology, Finance)
- 3 sample blog posts

---

### 4. Run Development Servers

```bash
# Backend (port 5000)
cd backend && npm run dev

# Frontend (port 3000) — in a new terminal
cd frontend && npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **API Health**: http://localhost:5000/health

---

## 🔐 Admin Panel

URL: `http://localhost:3000/admin`

Default credentials (from seed):
- Email: `admin@embayub.com`
- Password: `Admin@123456`

**Admin Features:**
- 📊 Dashboard with analytics and recent contacts
- 📬 Contact management — view, filter, update status, reply, delete
- ✍️ Blog CMS — create/edit/delete posts, upload featured images, publish/draft
- 🏢 Ventures management — add/edit/delete ventures, set status (active/coming soon)

---

## 📡 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Submit contact form |
| GET | `/api/blogs` | List published blogs |
| GET | `/api/blogs/:slug` | Get blog post |
| GET | `/api/ventures` | List active ventures |

### Admin (requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth/login` | Login |
| GET | `/api/admin/auth/me` | Current admin |
| GET | `/api/admin/contacts` | All contacts (paginated) |
| GET | `/api/admin/contacts/analytics` | Contact stats |
| PATCH | `/api/admin/contacts/:id` | Update status/notes |
| DELETE | `/api/admin/contacts/:id` | Delete contact |
| GET | `/api/admin/blogs` | All blog posts |
| POST | `/api/admin/blogs` | Create post (multipart) |
| PUT | `/api/admin/blogs/:id` | Update post (multipart) |
| DELETE | `/api/admin/blogs/:id` | Delete post |
| GET | `/api/admin/ventures` | All ventures |
| POST | `/api/admin/ventures` | Create venture (multipart) |
| PUT | `/api/admin/ventures/:id` | Update venture |
| DELETE | `/api/admin/ventures/:id` | Delete venture |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `#FFFFFF` | White | Primary background |
| `#F5F5F5` | Light Gray | Secondary surfaces |
| `#0A0A0A` | Near Black | Primary text |
| `#6B6B6B` | Gray | Secondary text |
| `#2563EB` | Blue | Accent / CTAs |
| `#E5E5E5` | Border | Dividers |

**Font**: Inter (Google Fonts)

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend
npx vercel deploy
```
Set environment variable: `NEXT_PUBLIC_API_URL=https://your-api.onrender.com`

### Backend → Render / Railway / VPS
```bash
# Set env vars in Render dashboard, then:
npm start
```

Set `MONGODB_URI` to your MongoDB Atlas connection string.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken) |
| Security | Helmet, CORS, Rate Limiting |
| File Upload | Multer |

---

## 📦 Adding a New Venture

1. Go to Admin → Ventures → "Add Venture"
2. Fill in: name, category, description, services, website URL
3. Set status: **Active** or **Coming Soon**
4. Upload a logo
5. Save — it instantly appears on the website

No code changes needed! ✅

---

© 2024 EMB Ayub Enterprises. All rights reserved.
