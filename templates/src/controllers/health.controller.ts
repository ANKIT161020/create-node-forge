// src/controllers/health.controller.ts
// Health check controller
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose'; // To check DB connection
import catchAsync from '@utils/catchAsync';
import apiResponse from '@utils/apiResponse'; // Assuming you have this from previous steps
import healthCheck from '@utils/healthCheck'; // Import the new health check utility

/**
 * @desc    Checks the health of the API and its dependencies
 * @route   GET /api/health
 * @access  Public
 */
export const getHealthStatus = catchAsync(async (req: Request, res: Response, _: NextFunction) => {
  // Database Health Check
  // mongoose.connection.readyState:
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const dbLatency = dbStatus === 'connected' ? 'N/A (connected)' : 'N/A (disconnected)'; // Indicate status without precise ms

  // Get System Health Metrics
  const systemHealth = healthCheck.getSystemHealth();

  // Get Application Health Metrics
  const applicationHealth = healthCheck.getApplicationHealth();

  // Combine all health data
  const healthData = {
    timestamp: new Date().toISOString(),
    status: 'healthy', // Overall status
    database: {
      status: dbStatus,
      connectionLatency: dbLatency,
    },
    application: applicationHealth,
    system: systemHealth,
    // You can add more checks here for external services if needed
    // e.g., 'redis': { status: 'connected' }, 'emailService': { status: 'operational' }
  };

  // If DB is disconnected, set overall status to unhealthy
  if (dbStatus === 'disconnected') {
    healthData.status = 'unhealthy';
  }

  // Use the standardized apiResponse utility
  res.status(httpStatus.OK).send(apiResponse(healthData, 'API health status retrieved successfully.'));
});
