# Pediatric Simulation Trainer - Quick Start Guide

## Prerequisites

- Node.js 16+ installed ([Download](https://nodejs.org/))
- PostgreSQL 12+ installed ([Download](https://www.postgresql.org/))
- Git installed

## Installation & Running

### Step 1: Clone Repository

```bash
git clone https://github.com/drismaeilmaksoud/pediatric-simulation-trainer.git
cd pediatric-simulation-trainer
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# Windows: notepad .env
# Mac/Linux: nano .env

# Start backend server
npm run dev
```

**Expected output:**
```
✅ ========================================
🚀 Backend Server Running Successfully!
📍 URL: http://localhost:5000
💊 Health Check: http://localhost:5000/api/health
🌐 CORS Enabled for: http://localhost:5173, http://localhost:3000
========================================
```

### Step 3: Setup Frontend (NEW TERMINAL)

```bash
# From project root
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

**Expected output:**
```
➜  local:   http://localhost:5173/
➜  Network URL: use --host to expose
```

### Step 4: Open in Browser

Once you see both servers running, open your browser to:

```
http://localhost:5173
```

You should see the Pediatric Simulation Trainer home page! 🎉

---

## Database Setup (One-time)

```bash
cd database

# Create database and tables
psql -U postgres -f schema.sql

# Add sample data
psql -U postgres -f seed-data.sql
```

---

## Troubleshooting

### "Site can't be reached"

1. **Check both servers are running** - You need BOTH terminal windows active
2. **Check correct URLs:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`
3. **Clear browser cache** - Ctrl+Shift+Del (or Cmd+Shift+Delete)
4. **Try different browser** - Chrome, Firefox, Safari, Edge
5. **Check ports are free:**
   ```bash
   # Windows
   netstat -ano | findstr :5173
   netstat -ano | findstr :5000
   ```

### "Can't connect to backend"

1. **Check health endpoint:**
   ```bash
   curl http://localhost:5000/api/health
   # Or open in browser: http://localhost:5000/api/health
   ```
2. **Check .env file is configured** in backend directory
3. **Check dependencies installed** - `npm install` in backend folder

### Port Already in Use

```bash
# Kill process on port 5173
# Windows:
taskkill /F /IM node.exe
# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

---

## Project Structure

```
pediatric-simulation-trainer/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── server.js    # Main entry point
│   │   ├── config/      # Database config
│   │   ├── routes/      # API endpoints
│   │   └── middleware/  # Auth, error handling
│   ├── package.json
│   └── .env             # Environment variables
│
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── pages/       # Home, Cases, Upload, Progress
│   │   ├── components/  # Reusable components
│   │   └── styles/      # CSS styling
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── database/             # PostgreSQL
    ├── schema.sql       # Database tables
    └── seed-data.sql    # Sample data
```

---

## Next Steps

1. ✅ Servers running
2. ✅ Access app at `http://localhost:5173`
3. 📋 Create scenarios using "Upload Scenario" link
4. 🔐 Implement user authentication
5. 🎮 Build case branching engine

---

## Support

For issues, check the troubleshooting section above or open a GitHub issue.
