import express from 'express';
import { tailorResume, analyzeResume } from '../controllers/resumeControllers.js';

const router = express.Router();

router.post('/analyze', tailorResume); // /api/resume/analyze
router.post('/parse', analyzeResume); // /api/resume/parse


export default router;