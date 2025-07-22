// Authentication related routes
import { Router } from 'express';
import validate from '@middleware/validation.middleware';
import { register, login, logout, getMe } from '@controllers/auth.controller';
import { registerSchema, loginSchema } from '@routes/validations/auth.validation'; // Import validation schemas
import auth from '@middleware/auth.middleware';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', auth(), logout); // Auth required if server-side token management
router.get('/me', auth(), getMe);

export default router;
