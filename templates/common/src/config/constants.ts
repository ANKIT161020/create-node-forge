// Global application constants
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
};

export const AUTH_MESSAGES = {
  AUTH_SUCCESS: 'Authentication successful.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'Unauthorized: Access token is missing or invalid.',
  FORBIDDEN: 'Forbidden: You do not have permission to perform this action.',
  EMAIL_ALREADY_TAKEN: 'Email already taken.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
};

export const APP_ENV = {
  APP_NAME: 'zoppli',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
}
