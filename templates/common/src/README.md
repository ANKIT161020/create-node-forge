📁 src/ - Application Source Code
This directory is the core of your entire Node.js backend application. All the TypeScript code that powers your API lives here, organized into distinct architectural layers.

Purpose: To house all the primary source code for your application, ensuring a clear and organized structure for development and maintenance.

What you'll find here:

All your TypeScript files (.ts).

Subdirectories that represent the different layers of your application (like controllers, services, models, etc.).

The main application setup and server startup files (app.ts, server.ts).

Key Rules & Best Practices for src/:

Stay Organized: Always place files in their correct subdirectories. Avoid putting files directly into src/ unless they are global entry points like app.ts or server.ts.

TypeScript First: Write all new code in TypeScript. Embrace type safety to catch errors early.

Absolute Imports: Use the @ aliases (e.g., @services/userService) for importing modules. This keeps import paths clean and readable.

Respect the Layers: Follow the established layered architecture:

Controllers handle requests and delegate.

Services contain business logic.

Repositories manage database interactions.

Models define data structures.

No Direct Database Access outside Repositories: Your services should never directly call Mongoose methods (like User.find()). They must go through the repository layer.

Keep Main Files Clean: app.ts and server.ts should primarily focus on setting up middleware, routes, and starting the server, not on complex business logic.
