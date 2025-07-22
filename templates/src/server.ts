// Main server entry point, database connection, graceful shutdown
import mongoose from 'mongoose';
import config from '@config/index';
import logger from '@utils/logger';
import app from './app';

let server: any; // Type for the HTTP server instance

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Could not connect to MongoDB:', error);
    process.exit(1); // Exit process on DB connection failure
  }
};

const startServer = async () => {
  await connectToDatabase();

  server = app.listen(config.port, () => {
    logger.info('Server is running',{
      meta:{
        PORT: config.port,
        SERVER_URL : `http://localhost:${config.port}`,
        ENVIRONMENT: config.env
      }
    });
  });
};

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error('UNEXPECTED ERROR:', error);
  exitHandler();
};

// Handle uncaught exceptions (synchronous errors)
process.on('uncaughtException', unexpectedErrorHandler);

// Handle unhandled promise rejections (asynchronous errors)
process.on('unhandledRejection', (reason: Error) => {
  logger.error('UNHANDLED REJECTION:', reason);
  exitHandler();
});

// Handle SIGTERM signal (e.g., from Docker, Kubernetes)
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Process terminated!');
      // Optional: Close database connections here if they're not closed by server.close()
      mongoose.connection
        .close()
        .then(() => {
          logger.info('MongoDB connection closed.');
          process.exit(0);
        })
        .catch((err) => {
          logger.error('Error closing MongoDB connection:', err);
          process.exit(1);
        });
    });
  } else {
    process.exit(0);
  }
});

// Handle SIGINT signal (e.g., Ctrl+C)
process.on('SIGINT', () => {
  logger.info('SIGINT received');
  if (server) {
    server.close(() => {
      logger.info('Process terminated!');
      mongoose.connection
        .close()
        .then(() => {
          logger.info('MongoDB connection closed.');
          process.exit(0);
        })
        .catch((err) => {
          logger.error('Error closing MongoDB connection:', err);
          process.exit(1);
        });
    });
  } else {
    process.exit(0);
  }
});

// Start the application
startServer();
