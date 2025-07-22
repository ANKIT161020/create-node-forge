// JWT token generation and verification utilities
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '@config/index';
import { TOKEN_TYPES } from '@config/constants';

interface TokenPayload {
  sub: string; // User ID
  iat: number; // Issued at
  exp: number; // Expiration time
  type: string; // Token type (e.g., access, refresh)
}

/**
 * Generates a JWT token.
 * @param {string} userId - The user ID.
 * @param {number} expires - Expiration time in milliseconds.
 * @param {string} type - Type of token (e.g., 'access', 'refresh').
 * @param {string} [secret=config.jwt.secret] - JWT secret.
 * @returns {string} The generated JWT token.
 */
export const generateToken = (
  userId: string,
  expires: moment.Moment,
  type: string,
  secret: string = config.jwt.secret,
): string => {
  const payload: TokenPayload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generates access and refresh tokens for a user.
 * @param {string} userId - The user ID.
 * @returns {Object} Object containing accessToken and refreshToken strings.
 */
export const generateAuthTokens = (userId: string) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(userId, accessTokenExpires, TOKEN_TYPES.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(userId, refreshTokenExpires, TOKEN_TYPES.REFRESH);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @param {string} [secret=config.jwt.secret] - JWT secret.
 * @returns {Promise<TokenPayload>} The decoded token payload.
 */
export const verifyToken = (
  token: string,
  secret: string = config.jwt.secret,
): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded as TokenPayload);
    });
  });
};
