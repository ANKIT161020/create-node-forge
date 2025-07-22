# 🚀 Node.js Monolithic Backend Template 🚀

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-black?style=for-the-badge&logo=husky&logoColor=white)](https://typicode.github.io/husky/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

This project serves as a **robust, production-ready monolithic Node.js backend template**. It's meticulously crafted with **TypeScript**, **Express.js**, and **MongoDB (Mongoose)**, integrating a comprehensive suite of best practices for security, logging, error handling, testing, and project structure.

Think of this as your ultimate starting point for any new backend application, designed to be highly scalable, maintainable, and developer-friendly from day one.

---

## ✨ Key Features

- **TypeScript First:** Full type safety across the entire application, enhancing code quality and developer experience.
- **Monolithic Architecture:** A well-defined layered structure (Controllers, Services, Repositories, Models) promoting modularity, clear separation of concerns, and easy scalability within a single codebase.
- **Express.js:** A minimalist, flexible, and fast web framework for building powerful RESTful APIs.
- **MongoDB & Mongoose:** Seamless integration with MongoDB using Mongoose, a powerful Object Data Modeling (ODM) library for schema definition and data validation.
- **Winston Logger:** Centralized, structured, and highly configurable logging for better observability in both development and production environments.
- **Husky & Lint-Staged:** Git hooks that enforce code style (ESLint, Prettier) on staged files before every commit, ensuring a clean and consistent codebase.
- **Robust Environment Handling:** Secure configuration management with `dotenv-safe`, which validates that all required environment variables are present, preventing critical runtime errors.
- **Comprehensive Testing Suite:**
  - **Jest:** A delightful JavaScript testing framework for unit and integration tests.
  - **Supertest:** For high-level API integration testing, simulating HTTP requests.
  - Dedicated test database setup and teardown for isolated and reliable integration tests.
- **API Security Best Practices:**
  - **Helmet:** Sets various HTTP headers to protect your app from common web vulnerabilities.
  - **CORS:** Configured for secure Cross-Origin Resource Sharing.
  - **Express Rate Limit:** Protects against brute-force attacks and API abuse.
  - **Bcryptjs:** Industry-standard library for secure password hashing.
  - **JSON Web Tokens (JWT):** For stateless, secure, and scalable authentication.
- **Advanced Error Handling:** Custom `ApiError` class, centralized error conversion, and a global error middleware for consistent, informative, and secure API error responses. `express-async-handler` eliminates repetitive `try-catch` blocks in async routes.
- **Input Validation:** Schema-based request validation using **Joi**, ensuring all incoming data conforms to expected formats and constraints.
- **Graceful Shutdown:** Implements proper handling of Node.js process signals (`SIGTERM`, `SIGINT`, `uncaughtException`, `unhandledRejection`) for clean application exits, releasing resources like database connections.
- **Enhanced Developer Experience:** `ts-node-dev` provides lightning-fast live reloading during development, boosting productivity.
- **Absolute Imports:** Configured for cleaner and more readable import paths (e.g., `@services/userService`).

---

## 🛠️ Getting Started

Follow these steps to get your development environment up and running.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** Latest LTS version recommended.
  - [Download Node.js](https://nodejs.org/en/download/)
- **npm** or **Yarn:** Node.js package manager. (npm comes with Node.js)
  - [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)
- **MongoDB:** A running MongoDB instance (local or remote).
  - [Install MongoDB Community Edition](https://docs.mongodb.com/manual/installation/)
  - Alternatively, use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

1.  **Clone this repository:**

    ```bash
    git clone [https://github.com/your-username/nodejs-monolith-template.git](https://github.com/your-username/nodejs-monolith-template.git) my-awesome-backend
    cd my-awesome-backend
    ```

    _(If you're using the custom CLI tool, it will handle this step for you!)_

2.  **Install project dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

### Environment Variables

This project uses `dotenv-safe` to manage environment variables securely. It ensures that all variables defined in `.env.example` are present in your `.env` file, preventing unexpected runtime errors.

1.  **Create your `.env` file:**

    ```bash
    cp .env.example .env
    ```

2.  **Edit the `.env` file:**
    Open the newly created `.env` file and fill in your actual configuration values. **Crucially, change `JWT_SECRET` to a strong, random string for production environments!**

    ```ini
    # .env
    NODE_ENV=development
    PORT=5000

    # MongoDB Configuration
    MONGODB_URI=mongodb://127.0.0.1:27017/your_database_name_dev
    MONGODB_URI_TEST=mongodb://127.0.0.1:27017/your_database_name_test # Used for integration tests

    # JWT Secret and Expiration (REQUIRED FOR AUTHENTICATION)
    JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_CHANGE_THIS_IN_PRODUCTION
    JWT_ACCESS_EXPIRATION_MINUTES=30
    JWT_REFRESH_EXPIRATION_DAYS=7

    # Other app-specific variables
    # APP_SECRET_KEY=another_secret_key_if_needed
    ```

### Running the Application

- **Development Mode (with live reloading):**

  ```bash
  npm run dev
  # or yarn dev
  ```

  The server will start on `http://localhost:<PORT>` (default: `http://localhost:5000`). Any changes to your TypeScript files will automatically restart the server.

- **Production Mode (Build and Run):**
  First, compile the TypeScript code to JavaScript:
  ```bash
  npm run build
  # or yarn build
  ```
  Then, start the compiled application:
  ```bash
  npm start
  # or yarn start
  ```

---

## 📂 Project Structure Explained

Understanding the project structure is key to navigating and extending this template effectively. Each directory and file has a specific role, adhering to a layered architectural pattern.

nodejs-monolith-template/
├── src/ # 🚀 All your application source code lives here
│ ├── api/ # Top-level API router, aggregates all domain routes
│ │ └── index.ts # ➡️ Main entry point for all /api routes.
│ ├── config/ # ⚙️ Application-wide configurations, constants, and logger setup
│ │ ├── index.ts # ➡️ Loads environment variables and defines global app settings. Modify for global config changes.
│ │ ├── logger.ts # ➡️ Winston logger instance configuration. Modify for logging behavior.
│ │ └── constants.ts # ➡️ Global immutable constants (e.g., roles, token types). Modify for app-wide constant values.
│ ├── controllers/ # 🌐 Handle incoming HTTP requests, delegate to services, send responses
│ │ ├── auth.controller.ts # ➡️ Handles authentication requests (login, register). Add/modify API request handling logic here.
│ │ └── user.controller.ts # ➡️ Handles user management requests (get, update, delete). Add/modify API request handling logic here.
│ ├── middleware/ # 🔗 Express middleware functions for request processing
│ │ ├── auth.middleware.ts # ➡️ JWT authentication protection. Modify for auth logic or add new authorization checks.
│ │ ├── error.middleware.ts # ➡️ Centralized error handling. Rarely modify, unless changing global error response format.
│ │ ├── notFound.middleware.ts# ➡️ 404 (Not Found) handler. Rarely modify.
│ │ ├── validation.middleware.ts # ➡️ Joi schema validation. Rarely modify, generic validator.
│ │ └── rateLimit.middleware.ts # ➡️ API rate limiting. Modify to adjust rate limiting rules.
│ ├── models/ # 📊 Mongoose schemas and models (Data Layer Definitions)
│ │ └── user.model.ts # ➡️ Defines the User schema, pre-save hooks, instance/static methods. Modify for schema changes, add new models here.
│ ├── repositories/ # 📦 Data Access Layer (Abstraction over Mongoose models)
│ │ └── user.repository.ts # ➡️ Encapsulates DB operations for User. Modify for specific DB queries, add new repositories for new models.
│ ├── routes/ # 🛣️ Defines API endpoints for specific domains
│ │ ├── auth.routes.ts # ➡️ Routes related to authentication. Add/modify auth endpoints, apply middleware.
│ │ ├── user.routes.ts # ➡️ Routes related to user management. Add/modify user endpoints, apply middleware.
│ │ └── validations/ # 📝 Joi validation schemas for request data
│ │ ├── auth.validation.ts # ➡️ Joi schemas for auth requests. Modify for auth input validation rules.
│ │ ├── user.validation.ts # ➡️ Joi schemas for user requests. Modify for user input validation rules.
│ │ └── custom.validation.ts # ➡️ Custom Joi validators (e.g., for ObjectId). Add new custom validation rules.
│ ├── services/ # 🧠 Business Logic Layer (Interacts with repositories, orchestrates tasks)
│ │ ├── auth.service.ts # ➡️ Authentication business logic. Add/modify core auth features.
│ │ └── user.service.ts # ➡️ User-related business logic. Add/modify core user features.
│ ├── types/ # ✍️ TypeScript custom types and interfaces
│ │ └── express.d.ts # ➡️ Extends Express Request type. Modify if adding new properties to req object.
│ ├── utils/ # 🧩 Helper functions and utilities
│ │ ├── apiError.ts # ➡️ Custom error class. Rarely modify.
│ │ ├── catchAsync.ts # ➡️ Wrapper for async Express route handlers. Rarely modify.
│ │ ├── jwt.ts # ➡️ JWT token generation/verification. Modify for JWT logic or token types.
│ │ ├── password.ts # ➡️ Password hashing/comparison. Rarely modify.
│ │ └── pick.ts # ➡️ Utility to pick object properties. Rarely modify.
│ ├── app.ts # ➡️ Express application setup (global middleware, main router mounting). Modify for global Express settings.
│ └── server.ts # ➡️ Main server entry point, DB connection, graceful shutdown. Modify for DB connection details, server start/stop.
├── tests/ # 🧪 Unit and Integration tests
│ ├── unit/ # Isolated tests for individual functions/modules
│ │ └── utils/
│ │ └── password.test.ts # ➡️ Example unit test. Add unit tests for new utilities/logic.
│ ├── integration/ # API integration tests (end-to-end API calls)
│ │ ├── setup.ts # ➡️ Global test setup (e.g., connecting to test DB). Modify for test DB config.
│ │ ├── teardown.ts # ➡️ Global test teardown (e.g., disconnecting from test DB). Modify for test DB cleanup.
│ │ └── auth.integration.test.ts # ➡️ Example API integration test. Add integration tests for new API endpoints.
├── .env.example # 📄 Example environment variables. Always update this when adding new env vars.
├── .eslintrc.cjs # 🧹 ESLint configuration for code linting. Modify for linting rules.
├── .gitignore # 🚫 Files/directories to be ignored by Git. Add new files/folders to ignore.
├── .husky/ # 🐶 Git hooks setup (e.g., pre-commit). Rarely modify directly.
│ └── pre-commit # ➡️ Script to run before committing.
├── .lintstagedrc.json # 🎯 Configuration for lint-staged (runs linters on staged files). Modify for pre-commit linting/formatting rules.
├── nodemon.json # 🔄 Configuration for ts-node-dev (development server). Modify for dev server behavior.
├── package.json # 📦 Project metadata and dependencies. Add/remove dependencies, define scripts.
├── tsconfig.json # 📝 TypeScript compiler configuration for development. Modify for TS compiler options.
├── tsconfig.build.json # 🏗️ TypeScript compiler configuration for production build. Rarely modify.
└── README.md # 📖 This file! Project documentation.

---

## 💡 Best Practices Implemented

This template is built upon a foundation of robust software engineering principles:

- **Clean Architecture (Layered Design):**
  - **Controllers** handle HTTP requests and responses.
  - **Services** encapsulate business logic.
  - **Repositories** manage data access.
  - **Models** define data structures.
    This separation makes the codebase highly modular, easier to understand, test, and scale.
- **Dependency Inversion Principle:** Services depend on abstractions (interfaces) rather than concrete implementations (e.g., `IUserRepository` in `UserService`), making components loosely coupled and easier to swap or mock for testing.
- **Asynchronous Error Handling:** `express-async-handler` wraps all async route handlers, automatically catching errors and passing them to the global error middleware, preventing unhandled promise rejections.
- **Centralized Error Handling:** A dedicated error middleware (`error.middleware.ts`) catches all errors, converts them into a consistent `ApiError` format, and sends appropriate HTTP responses, preventing sensitive information leaks in production.
- **Structured Logging with Winston:** Provides clear, actionable logs. Different log levels for development (`debug`) and production (`info`) ensure optimal verbosity. Logs are formatted for human readability in dev and machine parsing in production.
- **Robust Configuration with `dotenv-safe`:** Ensures that all required environment variables are present before the application starts, preventing common deployment issues due to missing configurations.
- **Automated Code Quality with Husky & Lint-Staged:**
  - **Husky** sets up Git hooks, allowing you to run scripts at specific points in the Git workflow.
  - **Lint-staged** runs ESLint and Prettier only on the files that are _staged_ for commit. This guarantees that only code conforming to your style guides and free of common errors makes it into your version control, maintaining a consistently high code quality.
- **Input Validation with Joi:** All incoming request data is rigorously validated against predefined schemas, protecting your API from malformed or malicious input.
- **Secure Authentication (JWT & Bcrypt):** Implements industry-standard practices for user authentication, including secure password hashing and stateless token-based authorization.
- **Comprehensive Security Headers (Helmet):** Automatically adds various HTTP headers to enhance the security of your Express application against common web vulnerabilities.
- **API Rate Limiting:** Protects your API endpoints from abuse, such as brute-force attacks, by limiting the number of requests a client can make within a specified timeframe.
- **Graceful Shutdown:** Ensures your server closes down cleanly when it receives termination signals (e.g., from Docker, Kubernetes, or Ctrl+C), allowing ongoing requests to complete and releasing resources like database connections.
- **Absolute Imports:** Configured in `tsconfig.json` to allow cleaner, more readable import statements (e.g., `import UserService from '@services/user.service';`), reducing relative path hell.

---

## 🧪 Testing

A robust testing strategy is integral to this template. We use **Jest** for all testing, with **Supertest** for API integration tests.

### Test Structure

- `__tests__/unit/`: Contains isolated unit tests for individual functions, utilities, and pure logic components. These tests should _not_ interact with the database or external services.
- `__tests__/integration/`: Contains higher-level integration tests for your API endpoints. These tests make actual HTTP requests to your Express application and interact with a dedicated test database.

### Test Database Setup

Integration tests connect to a separate MongoDB instance defined by `MONGODB_URI_TEST` in your `.env` file. This ensures that your development and production databases are never affected by tests.

- `__tests__/integration/setup.ts`: This file runs **once before all integration tests**. It connects to your `MONGODB_URI_TEST` database.
- `__tests__/integration/teardown.ts`: This file runs **once after all integration tests**. It drops the test database and closes the MongoDB connection, ensuring a clean slate for subsequent test runs.
- `beforeEach` in `setup.ts`: Before _each individual integration test_, all collections in the test database are cleared. This guarantees that each test runs in an isolated, predictable environment.

### Running Tests

- **Run all tests (unit and integration):**
  ```bash
  npm test
  # or yarn test
  ```
- **Run tests in watch mode (re-runs on file changes):**
  ```bash
  npm run test:watch
  # or yarn test:watch
  ```
- **Generate a test coverage report:**
  ```bash
  npm run test:coverage
  # or yarn test:coverage
  ```
  This will generate a `coverage/` folder with detailed reports on your code coverage.

---

## 📜 Scripts

Here are the essential `npm` scripts available in `package.json` to manage your project:

- `npm run dev`: Starts the server in **development mode** with live reloading using `ts-node-dev`. This is your primary command during development.
- `npm run start`: First, builds the TypeScript code, then starts the compiled JavaScript application in **production mode**. Use this for deploying your application.
- `npm run build`: Compiles TypeScript files from the `src` directory into JavaScript in the `dist` folder, using `tsconfig.build.json` for production-optimized compilation.
- `npm run lint`: Runs **ESLint** across all TypeScript files to check for code quality issues and style violations.
- `npm run lint:fix`: Runs ESLint and automatically fixes any fixable code quality or formatting issues.
- `npm run format`: Formats all `.ts` files in `src` and `__tests__` using **Prettier**, ensuring consistent code style.
- `npm test`: Executes all unit and integration tests with **Jest**.
- `npm run test:watch`: Runs Jest in interactive watch mode, re-running tests automatically when files change.
- `npm run test:coverage`: Runs all tests and generates a detailed code coverage report.
- `npm run prepare`: Sets up **Husky** Git hooks. This command is typically run automatically after `npm install`.

---

## 🤝 Contributing

We welcome contributions to make this template even better! If you have suggestions, bug reports, or want to contribute code, please feel free to:

1.  **Fork** this repository.
2.  **Create a new branch** for your feature or bug fix.
3.  **Commit your changes** following conventional commit messages.
4.  **Open a Pull Request** with a clear description of your changes.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Made with ❤️ by Ankit
