import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  // TODO: Implement user registration
  // 1. Validate input (email, password, name)
  // 2. Check if user exists
  // 3. Hash password with bcryptjs
  // 4. Create user in database
  // 5. Return success message
  res.status(201).json({ message: 'Register endpoint - to be implemented' });
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  // TODO: Implement user login
  // 1. Validate input (email, password)
  // 2. Find user by email
  // 3. Compare password with bcryptjs
  // 4. Generate JWT token
  // 5. Return token and user info
  res.status(200).json({ message: 'Login endpoint - to be implemented' });
}));

// POST /api/auth/refresh
router.post('/refresh', asyncHandler(async (req, res) => {
  // TODO: Implement token refresh
  // 1. Verify refresh token
  // 2. Generate new JWT
  // 3. Return new token
  res.status(200).json({ message: 'Refresh endpoint - to be implemented' });
}));

export default router;
