import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Routes
import authRoutes from './routes/auth.js';
import caseRoutes from './routes/cases.js';
import scenarioRoutes from './routes/scenarios.js';
import progressRoutes from './routes/progress.js';

// Middleware
import { errorHandler } from './middleware/errorHandler.js';

// Initialize env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Backend is running successfully'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/progress', progressRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ ========================================`);
  console.log(`🚀 Backend Server Running Successfully!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS Enabled for: ${CORS_ORIGIN.join(', ')}`);
  console.log(`========================================\n`);
});

export default app;
