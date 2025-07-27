🧠 src/services/ - Business Logic Layer
Services are the brain of your application. They contain all the core business logic, orchestrating operations and applying business rules to achieve specific functional goals (e.g., registering a user, processing an order).

Purpose: To encapsulate the application's core business rules and logic, acting as an intermediary between controllers and repositories. This layer orchestrates data flow and applies domain-specific operations.

What you'll find here:

Files named [domain].service.ts (e.g., auth.service.ts, user.service.ts).

Classes that contain methods representing your application's use cases or business functionalities.

Key Rules & Best Practices for src/services/:

Business Logic Hub: This is where the "what" and "how" of your application's features are implemented.

Orchestration: Services can call multiple repositories, other services, or external APIs to complete a task.

Dependency Injection: Services should receive their dependencies (e.g., repositories, other services, external API clients) through their constructors. This makes your code highly testable and flexible.

No Direct HTTP/Express Interaction: Services should be completely unaware of HTTP requests or Express.js. They receive plain data as input and return plain data as output.

Business Error Handling: Services should throw ApiError instances when business rules are violated (e.g., "Email already taken", "User not found").

Transaction Management: If complex multi-document operations require atomicity, transactions should be managed at this layer.
