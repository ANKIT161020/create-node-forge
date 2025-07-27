🌐 src/controllers/ - API Controllers
Controllers are the first point of contact for incoming HTTP requests. Think of them as the "traffic cops" of your API. They receive requests, extract necessary data, and then hand off the actual work to the service layer.

Purpose: To handle incoming HTTP requests, parse request data, delegate business logic to services, and format HTTP responses.

What you'll find here:

Files named [domain].controller.ts (e.g., auth.controller.ts, user.controller.ts).

Functions that correspond to your API endpoints (e.g., register, login, getUser).

Key Rules & Best Practices for src/controllers/:

Keep it Thin: Controllers should be as minimal as possible. Their main job is to coordinate, not to perform complex logic.

Delegate to Services: Always pass the request to the appropriate service for any business logic. Never put complex calculations or database interactions directly in a controller.

Assume Valid Input: Controllers should trust that input has already been validated by middleware (like validation.middleware.ts). They don't need to re-validate.

Handle Errors Gracefully: Use catchAsync to wrap your asynchronous controller functions. This ensures any errors are automatically caught and sent to the global error handler.

Standardized Responses: Use the apiResponse utility for all successful responses. This ensures consistent JSON output across your API, making it easier for clients to consume.

Document with JSDoc: Add JSDoc comments to each controller function. These comments are used by Swagger to automatically generate your API documentation.
