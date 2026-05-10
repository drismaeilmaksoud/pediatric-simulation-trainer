import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// GET /api/cases - List all available cases
router.get('/', asyncHandler(async (req, res) => {
  // TODO: Fetch cases from database
  // 1. Query cases table
  // 2. Filter by specialty if provided
  // 3. Filter by difficulty level if provided
  // 4. Return paginated results
  res.json({ message: 'Get cases endpoint - to be implemented', cases: [] });
}));

// GET /api/cases/:id - Get specific case with branching logic
router.get('/:id', asyncHandler(async (req, res) => {
  // TODO: Fetch case and its branching logic
  // 1. Query case by ID
  // 2. Get case content (JSONB with branching logic)
  // 3. Get associated competencies
  // 4. Return case structure
  res.json({ message: 'Get case details endpoint - to be implemented' });
}));

// POST /api/cases/:id/attempt - Start a case attempt
router.post('/:id/attempt', verifyToken, asyncHandler(async (req, res) => {
  // TODO: Create new case attempt record
  // 1. Verify case exists
  // 2. Create case_attempts entry
  // 3. Return attempt ID and initial case state
  res.status(201).json({ message: 'Start case attempt endpoint - to be implemented' });
}));

// POST /api/cases/:id/submit - Submit case answers
router.post('/:id/submit', verifyToken, asyncHandler(async (req, res) => {
  // TODO: Evaluate responses and generate feedback
  // 1. Get user's responses from request body
  // 2. Compare against correct decision path
  // 3. Calculate score based on competencies
  // 4. Generate feedback with evidence
  // 5. Update case_attempts with results
  // 6. Return score and feedback
  res.json({ message: 'Submit case endpoint - to be implemented' });
}));

export default router;
