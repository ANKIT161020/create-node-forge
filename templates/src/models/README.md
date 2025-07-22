📊 src/models/ - Mongoose Models
This directory defines how your application's data is structured and behaves within your MongoDB database. These are your Mongoose schemas and models, representing the blueprints for your collections.

Purpose: To define the data schema for your MongoDB collections, including field types, validations, virtuals, hooks (pre/post save), and instance/static methods.

What you'll find here:

Files named [collectionName].model.ts (e.g., user.model.ts).

Mongoose Schema definitions and the mongoose.model() calls that create your database models.

TypeScript interfaces (e.g., IUser, IUserModel) that strictly define the shape of your documents and the model's methods/statics for TypeScript's benefit.

Key Rules & Best Practices for src/models/:

Clear Schema: Define all fields precisely with their types (String, Number, Boolean), whether they are required, unique, trim, lowercase, enum, timestamps, etc.

Data Validation: Use Mongoose's built-in validators or custom validate functions for field-level checks (e.g., validator.isEmail).

Hooks (pre/post): Implement hooks for actions like password hashing (pre('save')) or data manipulation before/after database operations.

Important: For pre, methods, and statics callbacks, use traditional function () { ... } expressions to ensure this correctly refers to the Mongoose document or model.

Instance Methods: Define methods that operate on a single document (e.g., user.isPasswordMatch()).

Static Methods: Define methods that operate on the model itself (e.g., User.isEmailTaken()).

No Business Logic: This folder is for data definition and persistence logic only. Complex business rules belong in the services/ layer.

Security: Mark sensitive fields (like password) as private: true in the schema and ensure they are removed from toJSON output to prevent accidental exposure in API responses.
