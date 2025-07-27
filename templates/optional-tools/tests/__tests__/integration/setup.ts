// Global setup for Jest integration tests (e.g., connecting to test DB)
import mongoose from 'mongoose';
import config from '@config/index';
import logger from '@utils/logger';

// Ensure this runs once before all tests
beforeAll(async () => {
  // Connect to a dedicated test database
  try {
    await mongoose.connect(config.mongoose.url);
    logger.info(`Connected to test MongoDB: ${config.mongoose.url}`);
  } catch (error) {
    logger.error('Failed to connect to test MongoDB:', error);
    process.exit(1);
  }
});

// Clean up database before each test
beforeEach(async () => {
  // Clear all collections to ensure a clean state for each test
  const { collections } = mongoose.connection;
  await Promise.all(
    Object.keys(collections).map(async (key) => {
      const collection = collections[key];
      await collection.deleteMany({}); // Clears all documents from the collection
    }),
  );
  logger.debug('[Test Setup] All collections cleared.');
});
