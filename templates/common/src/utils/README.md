🧩 src/utils/ - Helper Functions & Utilities
This directory contains small, reusable helper functions and utilities that perform common, non-business-specific tasks. Think of them as your application's toolbox.

Purpose: To provide a collection of generic, reusable functions that support various parts of the application without containing core business logic or direct database interactions.

What you'll find here:

Files named [purpose].ts (e.g., apiError.ts, catchAsync.ts, jwt.ts, password.ts, pick.ts, apiResponse.ts).

Functions that are often "pure" (given the same input, always return the same output, no side effects) or perform simple, isolated tasks.

Key Rules & Best Practices for src/utils/:

Generality: Utilities should be generic and not tied to a specific domain (e.g., pick is for general object manipulation, not specific to users or products).

Reusability: Design functions to be easily reusable across different modules of the application.

Testability: Utilities should be easy to unit test in isolation.

No Business Logic: Avoid placing complex business rules here. If a function starts accumulating complex domain-specific logic, it likely belongs in a service/ instead.
