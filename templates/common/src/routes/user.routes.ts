// User management related routes
import { Router } from 'express';
import validate from '@middleware/validation.middleware';
import { getUser, updateUser, deleteUser } from '@controllers/user.controller';
import { getUserSchema, updateUserSchema } from '@routes/validations/user.validation'; // Import validation schemas
import auth from '@middleware/auth.middleware';
import { USER_ROLES } from '@config/constants';

const router = Router();

// Routes requiring authentication and potentially specific roles
router
  .route('/:userId')
  .get(auth(USER_ROLES.ADMIN, USER_ROLES.USER), validate(getUserSchema), getUser) // User can get their own, admin any
  .patch(auth(USER_ROLES.ADMIN, USER_ROLES.USER), validate(updateUserSchema), updateUser) // User can update their own, admin any
  .delete(auth(USER_ROLES.ADMIN), validate(getUserSchema), deleteUser); // Only admin can delete users

export default router;
