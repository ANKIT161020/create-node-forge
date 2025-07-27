✍️ src/types/ - TypeScript Custom Types
This directory is dedicated to defining custom TypeScript types, interfaces, and declaration merging that are used across different parts of your application.

Purpose: To centralize and manage all custom TypeScript type definitions, ensuring type consistency, improving code readability, and enhancing developer experience through better autocompletion and error checking.

What you'll find here:

Files named [purpose].d.ts (for declaration merging, e.g., express.d.ts).

Files named [purpose].ts (for custom types or interfaces that don't directly map to Mongoose models).

express.d.ts: Extends Express's Request object to add custom properties (e.g., req.user, req.token) after authentication.

Any other shared interfaces or types that are not directly tied to a specific Mongoose model or a single utility.

Key Rules & Best Practices for src/types/:

Clear & Precise: Define types clearly and precisely to reflect the exact shape of your data.

Reusability: Create types that can be reused across different modules to avoid duplication.

Declaration Merging: Use declare global and namespace for extending third-party library types (like Express) when you need to add properties to their existing interfaces.

No Logic: This directory should only contain type definitions. No executable code belongs here.
