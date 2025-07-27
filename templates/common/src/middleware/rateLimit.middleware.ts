// API Rate Limiting middleware
import rateLimit from 'express-rate-limit';
import config from '@config/index';
import httpStatus from 'http-status';
import ApiError from '@utils/apiError';

const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutes
  max: config.rateLimit.max, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    next(
      new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        'Too many requests from this IP, please try again after 15 minutes',
      ),
    );
  },
});

export default apiLimiter;
