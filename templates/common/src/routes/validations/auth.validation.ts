// Joi validation schemas for Auth routes
import Joi from 'joi';

const registerSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/) // At least one letter and one number
      .message('Password must contain at least one letter and one number'),
  }),
};

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

// Add schemas for other auth operations like forgot password, reset password etc.

export { registerSchema, loginSchema };
