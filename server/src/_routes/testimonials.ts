import { Router } from 'express';
import { createTestimonial, getTestimonials, selectTestimonials, selectedTestimonials } from '../controller/testimonials.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/add', createTestimonial);
router.get('/get', authMiddleware, getTestimonials);
router.post('/select', authMiddleware, selectTestimonials);
router.get('/selectedTestimonials', selectedTestimonials);

export default router;