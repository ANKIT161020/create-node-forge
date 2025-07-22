📦 src/repositories/ - Data Access Layer
Repositories act as a shield between your business logic (services) and your database. They contain all the code for interacting directly with your Mongoose models and performing database operations.

Purpose: To provide a clean, abstracted interface for performing CRUD (Create, Read, Update, Delete) and other database-related operations. This decouples your services from knowing the exact database technology being used.

What you'll find here:

Files named [domain].repository.ts (e.g., user.repository.ts).

Classes that contain methods for interacting with Mongoose models (e.g., createUser, getUserById, updateUserById).

Key Rules & Best Practices for src/repositories/:

Abstraction is Key: Services should only call methods on repositories, never directly interact with Mongoose models or raw database drivers. This makes it easier to swap databases later (e.g., from MongoDB to PostgreSQL) with minimal changes to your services/ layer.

Encapsulate DB Logic: All database queries, Mongoose calls, and database-specific error handling should be contained within repository methods.

Focus on Data: Repositories are about how data is stored and retrieved. They should not contain complex business rules or validations (those belong in services/ or middleware/).

Clear Return Types: Always define clear return types for your methods (e.g., Promise<IUser | null>).

Handle DB Errors: Convert raw database errors (e.g., unique constraint violations) into more generic ApiError instances that your global error handler can process.
