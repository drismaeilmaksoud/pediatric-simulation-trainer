# Pediatric Simulation Trainer

An interactive web-based platform for training pediatric residents with branching clinical scenarios and real-time feedback.

## Features

- 🎓 **Interactive Clinical Cases** - Branching scenarios with evidence-based outcomes
- 📊 **Progress Tracking** - Monitor competency development across specialties
- 📄 **Case Management** - Upload and manage simulation scenarios
- 👥 **Multi-user Support** - Faculty and resident roles
- 📱 **Mobile Responsive** - Access from any device
- 🔐 **HIPAA Compliant** - Secure data handling

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Multer for file uploads

### Deployment
- Docker containers
- AWS/Google Cloud compatible

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/drismaeilmaksoud/pediatric-simulation-trainer.git
cd pediatric-simulation-trainer

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev

# Setup frontend (in new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend will be at `http://localhost:5173`
Backend API will be at `http://localhost:5000`

## Database Setup

```bash
cd database
psql -U postgres -f schema.sql
psql -U postgres -f seed-data.sql
```

## Project Structure

```
pediatric-simulation-trainer/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── server.js
│   │   ├── config/          # Database config
│   │   ├── middleware/      # Auth, error handling
│   │   └── routes/          # API endpoints
│   ├── package.json
│   └── .env.example
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── database/                # PostgreSQL schemas
│   ├── schema.sql
│   └── seed-data.sql
└── docs/                    # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Cases
- `GET /api/cases` - List all cases
- `GET /api/cases/:id` - Get case details
- `POST /api/cases/:id/attempt` - Start case attempt
- `POST /api/cases/:id/submit` - Submit case responses

### Scenarios
- `POST /api/scenarios` - Upload new scenario (faculty/admin)
- `GET /api/scenarios` - List scenarios (faculty/admin)
- `DELETE /api/scenarios/:id` - Delete scenario (faculty/admin)

### Progress
- `GET /api/progress` - Get user progress
- `GET /api/progress/analytics` - Get analytics data

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

## License

MIT License - See [LICENSE](LICENSE)

## Support

For issues and questions, please open a GitHub issue.
