⚙️ src/config/ - Application Configuration
This directory is the central hub for all your application's settings, environment variables, and global constants. It's vital for making your application adaptable to different environments (development, testing, production) and for managing sensitive information securely.

Purpose: To centralize and securely manage all application configurations, ensuring consistent behavior across different deployment environments.

What you'll find here:

index.ts: This file loads environment variables from your .env file (using dotenv-safe) and defines core application settings like the PORT, MONGODB_URI, and JWT_SECRET.

logger.ts: Configures the Winston logger, setting up how and where your application logs messages (e.g., console, files).

constants.ts: Defines global, unchanging values used throughout the application (e.g., USER_ROLES, TOKEN_TYPES).

swagger.config.ts: Contains the configuration for your API's interactive Swagger/OpenAPI documentation.

Key Rules & Best Practices for src/config/:

Environment Variables are King: Never hardcode sensitive information (like API keys, database passwords, JWT secrets) directly into your code. Always load them from process.env via index.ts.

Use .env.example: Ensure your index.ts validates that all required environment variables (defined in .env.example) are present. This prevents silent failures in different environments.

Constants for Fixed Values: Use constants.ts for values that are fixed and shared across the application (e.g., USER_ROLES.ADMIN).

Centralization: All configuration logic should reside here. Avoid scattering configuration values across different files in other directories.

No Logic Here: This folder is strictly for defining configurations, not for implementing business logic or complex operations.
