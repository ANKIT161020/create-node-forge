📝 src/routes/validations/ - Joi Validation Schemas
This directory contains all the Joi schemas used to validate incoming data for your API requests (e.g., request body, query parameters, path parameters).

Purpose: To define the expected structure, data types, and constraints for all incoming API request payloads. This is critical for ensuring data integrity and preventing common input-related vulnerabilities.

What you'll find here:

Files named [domain].validation.ts (e.g., auth.validation.ts, user.validation.ts).

Joi schema definitions using Joi.object().keys(...).

custom.validation.ts: For reusable custom Joi validation rules (e.g., for validating MongoDB Object IDs).

Key Rules & Best Practices for src/routes/validations/:

Strict Validation: Define your schemas as strictly as possible to match the exact input you expect.

Required Fields: Always mark required fields using .required().

Data Types & Formats: Specify data types (.string(), .number(), .boolean()) and formats (.email(), .uuid()) where appropriate.

Constraints: Add constraints like minlength, maxlength, min, max, pattern (for regular expressions) to enforce data quality.

Reusable Schemas: Create reusable schema parts or custom validation functions for common patterns to avoid duplication.

Clear Error Messages: Consider adding custom error messages for better API feedback to clients.

No Logic: This folder is strictly for schema definitions, not for any executable logic.
