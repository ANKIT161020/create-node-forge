// Top-level API router, aggregates all domain routes
import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
import userRoutes from '@routes/user.routes';
import { getHealthStatus } from '@controllers/health.controller';

const router = Router();

// Define API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Health check endpoint (public, no authentication needed)
router.get('/health', getHealthStatus);

export default router;
