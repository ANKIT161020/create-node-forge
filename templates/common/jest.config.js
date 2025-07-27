// Jest configuration
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src', '<rootDir>/__tests__'], // Look for tests in src and __tests__
  testRegex: '(__tests__/(unit|integration)/.*|(\\.|/)(test|spec))\\.ts$', // Only test .ts files in these folders
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }), // Map TS paths
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/app.ts",
    "!src/server.ts",
    "!src/api/**/*.ts",
    "!src/routes/validations/**/*.ts",
    "!src/config/**/*.ts",
    "!src/types/**/*.ts",
    "!src/models/**/*.ts", // Exclude models unless you have specific model methods to test
    "!**/node_modules/**"
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/integration/setup.ts'], // Global setup for integration tests
  globalTeardown: '<rootDir>/__tests__/integration/teardown.ts',     // Global teardown for integration tests
};