// src/config/swagger.ts
import { Options } from 'swagger-jsdoc';
import config from '@config/index';

const swaggerDefinition = {
  openapi: '3.0.0', // OpenAPI specification version
  info: {
    title: 'Node.js Monolithic Backend API Documentation', // Title of your API
    version: '1.0.0', // Version of your API
    description:
      'This is the API documentation for the Node.js Monolithic Backend Template. It outlines all available endpoints, their request/response formats, and authentication requirements.', // Short description
    contact: {
      name: 'Your Name',
      email: 'your.email@example.com',
      url: 'https://yourwebsite.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`, // Development server URL
      description: 'Development Server',
    },
    // Add production server URL here when deployed
    // {
    //   url: 'https://api.yourproductiondomain.com/api',
    //   description: 'Production Server',
    // },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Bearer token **_only_**',
      },
    },
    // Define reusable schemas for common responses
    responses: {
      BadRequest: {
        description: 'Bad Request (e.g., validation errors)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: {
                  type: 'string',
                  example: 'Validation error: "email" must be a valid email.',
                },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: 'Unauthorized access (e.g., missing or invalid token)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 401 },
                message: {
                  type: 'string',
                  example: 'Unauthorized: Access token is missing or invalid.',
                },
              },
            },
          },
        },
      },
      Forbidden: {
        description: 'Forbidden (e.g., insufficient permissions)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 403 },
                message: {
                  type: 'string',
                  example: 'Forbidden: You do not have permission to perform this action.',
                },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Not Found - /api/users/nonexistentid' },
              },
            },
          },
        },
      },
      Conflict: {
        description: 'Conflict (e.g., resource already exists)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 409 },
                message: { type: 'string', example: 'Email already taken.' },
              },
            },
          },
        },
      },
      InternalServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Something went wrong.' },
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [], // Apply bearerAuth globally by default, can be overridden per endpoint
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions (JSDoc comments)
  // Ensure these paths correctly point to your source files
  apis: [
    './src/controllers/*.ts',
    './src/models/*.ts',
    // If you have specific JSDoc files for routes or other definitions, add them here
    // './src/routes/*.ts', // Only if route files contain top-level JSDoc
  ],
};

export default options;
