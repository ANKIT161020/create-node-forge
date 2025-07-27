🛣️ src/api/ - API Router Entry Point
This directory acts as the central hub for all your API routes. It's where all the individual domain-specific routers (like auth.routes or user.routes) are gathered and exposed under the main /api URL prefix.

Purpose: To provide a single, organized place to define and mount all your top-level API routes, making it easy to see the overall structure of your API.

What you'll find here:

index.ts: This file contains the main Express router that imports and uses all other domain-specific routers from the src/routes/ directory.

Key Rules & Best Practices for src/api/:

Aggregation Only: This file should only focus on importing and mounting other routers. Do not define specific endpoint logic (like app.get('/users', ...)) directly in this file.

API Prefix: Remember that all routes mounted here will automatically be accessible under the /api/ URL prefix (e.g., if you mount auth.routes, its /login endpoint becomes /api/auth/login). This prefix is set in src/app.ts.

Keep it Clean: The index.ts file should remain concise and easy to read, acting as a clear map of your API's top-level structure.
