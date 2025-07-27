// Global teardown for Jest integration tests (e.g., disconnecting from test DB)
import mongoose from 'mongoose';
import logger from '@utils/logger';

// Ensure this runs once after all tests are done
afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase(); // Clean up test database
    logger.info('Test database dropped.');
    await mongoose.connection.close(); // Disconnect from MongoDB
    logger.info('Disconnected from MongoDB.');
  } catch (error) {
    logger.error('Error during test teardown:', error);
    process.exit(1);
  }
});
