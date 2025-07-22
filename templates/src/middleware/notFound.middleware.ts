// 404 (Not Found) error handling middleware
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '@utils/apiError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(httpStatus.NOT_FOUND, `Not Found - ${req.originalUrl}`);
  next(error); // Pass the error to the global error handler
};

export default notFound;
