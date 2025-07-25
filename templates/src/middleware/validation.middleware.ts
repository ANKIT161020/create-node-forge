// Joi schema validation middleware
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '@utils/pick';
import ApiError from '@utils/apiError';

/**
 * Validates request data against Joi schemas.
 * @param {object} schema - Joi schema object with keys for body, query, params etc.
 */
const validate =
  (schema: Record<string, Joi.Schema>) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    // Cast 'req' to 'any' to satisfy TypeScript's strictness for indexing.
    // We know 'req' will have 'params', 'query', 'body' at runtime.
    const object = pick(req as any, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
