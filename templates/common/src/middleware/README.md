🔗 src/middleware/ - Express Middleware
Middleware functions are like checkpoints that every incoming request passes through before reaching its final destination (a controller). They can inspect, modify, or even stop the request/response cycle.

Purpose: To handle "cross-cutting concerns" – tasks that apply to many parts of your application, such as authentication, error handling, input validation, rate limiting, and setting security headers.

What you'll find here:

Files named [purpose].middleware.ts (e.g., auth.middleware.ts, error.middleware.ts, validation.middleware.ts, rateLimit.middleware.ts).

Functions that follow the Express middleware signature: (req, res, next) => { ... }.

Key Rules & Best Practices for src/middleware/:

Single Job: Each middleware should focus on doing one thing well (e.g., auth.middleware handles only authentication and authorization).

Order Matters: The sequence in which middleware is applied in src/app.ts is critical. For example, body parsers must run before validation, and validation before the controller.

Always Call next() (Unless Stopping): If your middleware doesn't send a response or throw an error, it must call next() to pass control to the next function in the chain.

Error-Handling Middleware: These are special middleware functions that take (err, req, res, next) as arguments and should be placed at the very end of your app.ts middleware chain.

Reusability: Design middleware to be generic and reusable across different routes or even different projects.
