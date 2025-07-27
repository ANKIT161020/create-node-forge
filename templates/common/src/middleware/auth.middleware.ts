// JWT authentication middleware
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '@utils/apiError';
import { verifyToken } from '@utils/jwt';
import catchAsync from '@utils/catchAsync';
import { TOKEN_TYPES, AUTH_MESSAGES } from '@config/constants';
import User from '@models/user.model'; // Assuming User model is defined

/**
 * Authenticates user based on JWT token and checks roles.
 * @param {string[]} requiredRoles - Array of roles required to access the route.
 */
const auth = (...requiredRoles: string[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(httpStatus.UNAUTHORIZED, AUTH_MESSAGES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await verifyToken(token);

      if (payload.type !== TOKEN_TYPES.ACCESS) {
        throw new ApiError(httpStatus.UNAUTHORIZED, AUTH_MESSAGES.UNAUTHORIZED);
      }

      const user = await User.findById(payload.sub);

      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, AUTH_MESSAGES.UNAUTHORIZED);
      }

      // Check if user has required roles
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, AUTH_MESSAGES.FORBIDDEN);
      }

      req.user = user; // Attach user object to request
      req.token = token; // Attach token to request
      next();
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Access token expired.');
      }
      next(error); // Pass other JWT errors to global error handler
    }
  });

export default auth;
