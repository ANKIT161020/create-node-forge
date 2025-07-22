🛣️ src/routes/ - API Endpoint Definitions
This directory defines the specific API endpoints for different logical parts (domains) of your application. Each file groups related routes together (e.g., all authentication routes, all user management routes).

Purpose: To define the URL paths, HTTP methods (GET, POST, PUT, etc.), and the sequence of middleware and controller functions that handle specific API requests.

What you'll find here:

Files named [domain].routes.ts (e.g., auth.routes.ts, user.routes.ts).

Express Router instances that define your API endpoints.

Imports of controllers and middleware relevant to these routes.

A validations/ subdirectory for Joi schemas.

Key Rules & Best Practices for src/routes/:

RESTful Paths: Design clear and predictable API paths following REST principles (e.g., /users, /users/:id).

Apply Middleware: Attach necessary middleware (e.g., validate, auth) to individual routes or groups of routes. The order of middleware application is crucial.

Delegate to Controllers: Route handlers should directly call controller functions. Avoid putting any logic beyond simple middleware chaining here.

Modularity: Keep routes for different domains in separate files for better organization and readability.

No Business Logic: This layer is purely for routing and middleware application, not for implementing core application logic.
