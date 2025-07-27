// Centralized error handling middleware
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status'; // Import httpStatus as a default export
import ApiError from '@utils/apiError';
import logger from '@utils/logger';

/**
 * Converts any non-ApiError into an ApiError.
 */
const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    // Access status text using bracket notation, casting httpStatus to any for TypeScript
    const message = error.message || (httpStatus as any)[statusCode];
    error = new ApiError(statusCode, message, false, err.stack); // Mark as non-operational
  }
  next(error);
};

/**
 * Handles errors and sends appropriate response.
 */
const errorHandler = (err: ApiError, req: Request, res: Response, _: NextFunction) => {
  let { statusCode, message } = err;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    // Access status text using bracket notation, casting httpStatus to any for TypeScript
    message = (httpStatus as any)[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Stack trace only in dev
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(err); // Log full error in development
  } else {
    logger.error(`${statusCode} - ${message} - ${err.stack}`); // Log concise error in production
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
