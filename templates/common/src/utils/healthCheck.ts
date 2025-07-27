// src/utils/healthCheck.ts
import os from 'os';
import config from '@config/index'; // Corrected import path for config

/**
 * Provides system-level health metrics.
 * @returns {object} CPU usage, total memory, free memory.
 */
const getSystemHealth = () => {
  const response = {
    cpuUsage: os.loadavg(), // Average system load over 1, 5, and 15 minutes
    totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, // Total system memory in MB
    freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`, // Free system memory in MB
  };
  return response;
};

/**
 * Provides application-level health metrics.
 * @returns {object} Environment, uptime, memory usage (heap).
 */
const getApplicationHealth = () => {
  const response = {
    environment: config.env, // Application environment (e.g., 'development', 'production')
    uptime: `${process.uptime().toFixed(2)} seconds`, // Application uptime in seconds
    memoryUsage: {
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`, // Total V8 heap allocated
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, // Actual V8 heap used
    },
  };
  return response;
};

export default {
  getSystemHealth,
  getApplicationHealth,
};
