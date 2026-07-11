# Tenant Management System (MERN Stack)

**A full‑stack MERN application for comprehensive tenant, role, and site management**

---

## Project Overview
A production‑ready web app that enables administrators to manage users, roles, and sites with a clean UI and secure API. Built with **MongoDB, Express, React, and Node.js**, it demonstrates end‑to‑end CRUD operations, JWT authentication, and a real‑time dashboard.

---

## Key Features
- **User Management**: Create, edit, deactivate users; pagination & search; fields: name, email, role, site, status.
- **Role Management**: Define roles with granular permissions; protect against deletion of assigned roles.
- **Site Management**: Maintain site records (name, location, status).
- **Dashboard**: Real‑time stats – total users, active users, total roles, total sites.
- **Time‑zone API** integrated in user forms.
- **Secure Auth**: JWT‑based authentication with token expiry.

---

## Tech Stack
- **Backend**: Node.js, Express, JWT, Mongoose
- **Frontend**: React (hooks, functional components), Tailwind CSS
- **Database**: MongoDB Atlas (cloud) – schema‑validated with Mongoose
- **Testing**: Jest & Supertest (unit & integration), React Testing Library
- **CI/CD**: GitHub Actions for lint, test, and build pipelines
- **Deployment**: Backend on Render/Railway, Frontend on Vercel/Netlify

---

## Getting Started (Local Development)
### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB instance)
- Redis server (or Docker)
- Git

### Setup Steps
1. **Clone the repo**
   ```bash
   git clone <repository-url>
   cd tenant-app
   ```
2. **Backend**
   ```bash
   cd backend
   npm install
   cp .env.sample .env   # configure MONGODB_URI, JWT_SECRET, PORT
   npm run dev           # starts server with nodemon
   ```
3. **Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.sample .env   # set REACT_APP_API_URL=http://localhost:5000
   npm start             # runs React dev server
   ```

The app will be available at `http://localhost:3000`.
---

## Highlights for Resume
- Designed and implemented a **full‑stack MERN application** with role‑based access control.
- Integrated **JWT authentication** and **refresh‑token flow** for secure sessions.
- Built a **dashboard** showing key metrics, improving admin visibility.
- Achieved **80%+ test coverage** with unit and integration tests.
- Set up **CI/CD pipelines** (GitHub Actions) for automated linting, testing, and deployment.
- Implemented Redis caching layer with comprehensive unit tests.
- Deployed scalable services to **Render** (backend) and **Vercel** (frontend).

---

## Repository & Live Demo
- **Live Demo**: [https://tenant-app-fawn.vercel.app/](https://tenant-app-fawn.vercel.app/)
- **Admin credentials**: email `adminuser123@gmail.com`, password `Admin@123`

---

*For more details, refer to the project documentation in the `docs/` directory.*