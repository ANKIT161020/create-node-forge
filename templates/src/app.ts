// src/app.ts
// Express application setup
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import httpStatus from 'http-status';
import compression from 'compression'; // Import compression middleware
import mongoSanitize from 'express-mongo-sanitize';
import swaggerJsdoc from 'swagger-jsdoc'; // Import swagger-jsdoc
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express
import apiLimiter from '@middleware/rateLimit.middleware';
import { errorConverter, errorHandler } from '@middleware/error.middleware';
import notFound from '@middleware/notFound.middleware';
import apiRoutes from '@api/index';
import logger from '@utils/logger'; // For logging app setup
import config from '@config/index';
import swaggerOptions from '@config/swagger'; // Import swagger options
import fs from 'fs';
import path from 'path';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());
// For specific origins in production:
// app.use(cors({
//   origin: 'https://your-frontend.com',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   credentials: true
// }));

// This middleware will serve files like favicon.ico, images, etc.
// from the 'public' folder at the root of your project.
app.use(express.static(path.join(__dirname, '../', 'public')));

// HTTP request logger
if (config.env === 'development') {
  app.use(morgan('dev')); // Concise output colored by response status
} else if (config.env === 'production') {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// This should come after body parsers (express.json, express.urlencoded)
app.use(mongoSanitize());

// Compress all responses (should be placed early in the middleware chain)
app.use(compression());

app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, '../', 'README.md'); // Adjust path as needed
  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
      logger.error('Error reading README.md:', err);
      // Fallback to a simple message if README can't be read
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send('Welcome to the API! Documentation is available at /api-docs');
    }
    // Set content type to Markdown for better rendering in some tools/browsers
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // Use text/plain for raw markdown
    res.send(data);
  });
});

// Apply rate limiting to all API requests
app.use('/api', apiLimiter);

// API routes
app.use('/api', apiRoutes);

// Swagger API Documentation (only in development/non-production environments)
if (config.env !== 'production') {
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  logger.info(`SWAGGER: API Docs Available`,{
    meta:{
      DOC_URL:`http://localhost:${config.port}/api-docs`
    }});
}

// Catch 404 and forward to error handler
app.use(notFound);

// Convert errors to ApiError if necessary
app.use(errorConverter);

// Handle errors
app.use(errorHandler);

export default app;
