import { Router } from 'express';
import { createTestimonial, getTestimonials, selectTestimonials } from '../controller/testimonials.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/add', authMiddleware, createTestimonial);
router.get('/get', authMiddleware, getTestimonials);
router.post('/select', authMiddleware, selectTestimonials);

export default router;