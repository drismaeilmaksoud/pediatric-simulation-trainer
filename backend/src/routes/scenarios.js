import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';
import { validateScenarioJSON, extractScenarioMetadata } from '../utils/scenarioValidator.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = process.env.UPLOAD_DIR || 'uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/json', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JSON and PDF files are allowed'));
    }
  }
});

// POST /api/scenarios - Upload new scenario
router.post('/', verifyToken, verifyRole(['admin', 'faculty']), upload.single('file'), 
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, specialty, difficultyLevel, description } = req.body;

    // Validate required fields
    if (!title || !specialty || !difficultyLevel) {
      // Clean up uploaded file
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ error: 'Missing required fields: title, specialty, difficultyLevel' });
    }

    // If JSON file, validate structure
    let scenarioContent = null;
    let metadata = null;
    if (req.file.mimetype === 'application/json') {
      try {
        const fileContent = fs.readFileSync(req.file.path, 'utf-8');
        const validation = validateScenarioJSON(fileContent);
        
        if (!validation.valid) {
          fs.unlink(req.file.path, () => {});
          return res.status(400).json({ error: `Invalid scenario JSON: ${validation.error}` });
        }
        
        scenarioContent = validation.scenario;
        metadata = extractScenarioMetadata(scenarioContent);
      } catch (error) {
        fs.unlink(req.file.path, () => {});
        return res.status(400).json({ error: `File read error: ${error.message}` });
      }
    }

    try {
      // Create case record
      const caseResult = await pool.query(
        `INSERT INTO cases (title, description, specialty, difficulty_level, created_by, content)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          title,
          description || null,
          specialty,
          difficultyLevel,
          req.user.id,
          JSON.stringify(scenarioContent || { title, metadata })
        ]
      );

      const caseId = caseResult.rows[0].id;

      // Create scenario record
      const scenarioResult = await pool.query(
        `INSERT INTO scenarios (case_id, file_path, file_type, uploaded_by, uploaded_at)
         VALUES ($1, $2, $3, $4, NOW())
         RETURNING id, uploaded_at`,
        [
          caseId,
          req.file.path,
          req.file.mimetype,
          req.user.id
        ]
      );

      res.status(201).json({
        id: scenarioResult.rows[0].id,
        caseId: caseId,
        title: title,
        specialty: specialty,
        difficultyLevel: difficultyLevel,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        uploadedAt: scenarioResult.rows[0].uploaded_at,
        metadata: metadata
      });
    } catch (error) {
      // Clean up uploaded file on database error
      fs.unlink(req.file.path, () => {});
      throw error;
    }
  })
);

// GET /api/scenarios - List all scenarios (faculty only)
router.get('/', verifyToken, verifyRole(['admin', 'faculty']), 
  asyncHandler(async (req, res) => {
    let query = `
      SELECT 
        s.id,
        s.case_id,
        s.file_path,
        s.file_type,
        s.uploaded_at,
        c.title,
        c.specialty,
        c.difficulty_level,
        c.description,
        u.first_name,
        u.last_name
      FROM scenarios s
      JOIN cases c ON s.case_id = c.id
      JOIN users u ON s.uploaded_by = u.id
    `;
    
    const params = [];
    
    // If user is not admin, only show their scenarios
    if (req.user.role !== 'admin') {
      query += ' WHERE s.uploaded_by = $1';
      params.push(req.user.id);
    }
    
    query += ' ORDER BY s.uploaded_at DESC';
    
    const result = await pool.query(query, params);
    
    res.json({
      count: result.rows.length,
      scenarios: result.rows
    });
  })
);

// GET /api/scenarios/:id - Get scenario details
router.get('/:id', verifyToken, verifyRole(['admin', 'faculty']),
  asyncHandler(async (req, res) => {
    const result = await pool.query(
      `SELECT 
        s.id,
        s.case_id,
        s.file_path,
        s.file_type,
        s.uploaded_at,
        c.title,
        c.specialty,
        c.difficulty_level,
        c.description,
        c.content,
        u.first_name,
        u.last_name
      FROM scenarios s
      JOIN cases c ON s.case_id = c.id
      JOIN users u ON s.uploaded_by = u.id
      WHERE s.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    const scenario = result.rows[0];
    
    // Check ownership
    if (req.user.role !== 'admin' && scenario.uploaded_by !== req.user.id) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    res.json(scenario);
  })
);

// DELETE /api/scenarios/:id - Delete scenario
router.delete('/:id', verifyToken, verifyRole(['admin', 'faculty']), 
  asyncHandler(async (req, res) => {
    // Get scenario details first
    const scenarioResult = await pool.query(
      'SELECT s.file_path, s.case_id, s.uploaded_by FROM scenarios s WHERE s.id = $1',
      [req.params.id]
    );

    if (scenarioResult.rows.length === 0) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    const { file_path, case_id, uploaded_by } = scenarioResult.rows[0];

    // Check ownership
    if (req.user.role !== 'admin' && uploaded_by.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    try {
      // Delete from database (cascades to scenarios)
      await pool.query('DELETE FROM cases WHERE id = $1', [case_id]);

      // Delete file from storage
      if (file_path && fs.existsSync(file_path)) {
        fs.unlinkSync(file_path);
      }

      res.json({ message: 'Scenario deleted successfully' });
    } catch (error) {
      throw error;
    }
  })
);

export default router;
