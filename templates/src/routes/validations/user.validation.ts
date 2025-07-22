// Joi validation schemas for User routes
import Joi from 'joi';
import { objectId } from '@routes/validations/custom.validation'; // Custom Joi validator for MongoDB ObjectId

const getUserSchema = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUserSchema = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/)
        .message('Password must contain at least one letter and one number'),
      role: Joi.string().valid('user', 'admin'), // Example roles, restrict updates by non-admins
    })
    .min(1), // At least one field is required for update
};

// Add schemas for creating user (if not through auth register), deleting user etc.

export { getUserSchema, updateUserSchema };
