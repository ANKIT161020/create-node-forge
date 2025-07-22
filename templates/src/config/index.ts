// Centralized application configuration
import 'dotenv-safe/config'; // Corrected import for dotenv-safe
import { ConnectOptions } from 'mongoose'; // Import ConnectOptions

interface Config {
  env: string;
  port: number;
  mongoose: {
    url: string;
    options: ConnectOptions; // Use ConnectOptions here
  };
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoose: {
    url:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGODB_URI_TEST || ''
        : process.env.MONGODB_URI || '',
    options: {
      // Explicitly define some common options to help TypeScript infer the correct type.
      // These options are valid for Mongoose 6+ and are often good defaults.
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Minimum of 1 connection in the pool
      // autoIndex: true, // Set to false in production to prevent performance issues
    } as ConnectOptions, // Explicitly assert type here to ensure correctness
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretjwtkey_please_change_this_in_production',
    accessExpirationMinutes: parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES || '30', 10),
    refreshExpirationDays: parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS || '7', 10),
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  },
};

export default config;
