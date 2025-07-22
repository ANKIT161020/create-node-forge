# 🚀 Create Node Forge

[![npm version](https://badge.fury.io/js/create-node-forge.svg)](https://badge.fury.io/js/create-node-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

A powerful CLI tool to scaffold robust, production-ready Node.js backend applications with TypeScript, Express, and industry best practices. Get your API project up and running in seconds!

## ✨ Features

- 🎯 **Production-Ready Template** - Full-featured Node.js backend with TypeScript, Express, and MongoDB
- 🏗️ **Clean Architecture** - Layered structure with Controllers, Services, Repositories, and Models
- 🔐 **Security First** - JWT authentication, bcrypt hashing, helmet, CORS, and rate limiting
- 📝 **Input Validation** - Comprehensive Joi validation schemas
- 🧪 **Testing Suite** - Jest setup with unit and integration tests
- 📊 **API Documentation** - Auto-generated Swagger/OpenAPI docs
- 🔧 **Developer Tools** - ESLint, Prettier, Husky git hooks, and lint-staged
- 🐳 **Docker Ready** - Optional Docker and docker-compose configuration
- 📈 **Observability** - Winston logging with structured output
- ⚡ **Performance** - Response compression and optimized middleware setup

## 🚀 Quick Start

### Using npm (Recommended)

```bash
npm create node-forge my-api
# or
npx create-node-forge my-api
```

### Using yarn

```bash
yarn create node-forge my-api
```

### Interactive Setup

The CLI will guide you through the setup process:

```bash
🚀 Node.js Monolithic Template Project Creator 🚀

? What is the name of your new project? my-awesome-api
? A short description for your project: My awesome API built with best practices
? Author's name: John Doe <john@example.com>
? Install Node.js dependencies now (npm install)? Yes
? Initialize a Git repository (git init)? Yes
? Include Docker setup (Dockerfile, docker-compose.yml)? Yes
? Include Jest unit and integration tests (__tests__/ folder)? Yes
? Include Swagger API documentation setup? Yes
```

## 📂 Generated Project Structure

```
my-awesome-api/
├── src/
│   ├── api/              # API router aggregation
│   ├── config/           # App configuration & constants
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose schemas
│   ├── repositories/     # Data access layer
│   ├── routes/           # Route definitions
│   │   └── validations/  # Joi validation schemas
│   ├── services/         # Business logic layer
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── __tests__/           # Test files
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── public/              # Static assets
├── logs/                # Application logs
├── .env.example         # Environment variables template
├── .env                 # Your environment variables
├── docker-compose.yml   # Docker compose configuration
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ What's Included

### Core Technologies

- **Node.js** 18+ with TypeScript
- **Express.js** - Fast, minimalist web framework
- **MongoDB** with Mongoose ODM
- **JWT** authentication with refresh tokens
- **bcryptjs** for secure password hashing

### Development Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting with Airbnb config
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates
- **lint-staged** - Run linters on staged files
- **ts-node-dev** - Fast development server

### Testing & Quality

- **Jest** - Testing framework
- **Supertest** - HTTP testing library
- **Test database** setup and teardown
- **Code coverage** reporting

### Security & Performance

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate limiting** - Prevent abuse
- **Request compression** - Optimize responses
- **Input sanitization** - Prevent injection attacks

### Documentation & Deployment

- **Swagger/OpenAPI** - Interactive API documentation
- **Docker** support with multi-stage builds
- **Environment-based** configuration
- **Structured logging** with Winston

## 🎯 Getting Started with Your Project

After creating your project:

```bash
cd my-awesome-api

# If you didn't auto-install dependencies
npm install

# Set up your environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run lint         # Check code style
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

## 🔧 Configuration

### Environment Variables

Your project comes with a comprehensive `.env.example` file. Key variables include:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-app
JWT_SECRET=your-super-secret-jwt-key
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
```

### API Endpoints

The generated project includes these example endpoints:

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

API documentation is available at `/api-docs` when running in development.

## 📚 Project Architecture

The generated project follows clean architecture principles:

- **Controllers** - Handle HTTP requests/responses
- **Services** - Contain business logic
- **Repositories** - Handle data access
- **Models** - Define data structures
- **Middleware** - Handle cross-cutting concerns
- **Utils** - Reusable helper functions

This structure promotes:

- ✅ Separation of concerns
- ✅ Easy testing and mocking
- ✅ Maintainable and scalable code
- ✅ Clear dependency flow

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/ANKIT161020/create-node-forge/blob/main/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by create-react-app and other scaffolding tools
- Built with the amazing Node.js and TypeScript ecosystems
- Uses industry-standard libraries and best practices

## 📞 Support

- 🐛 [Report Issues](https://github.com/ANKIT161020/create-node-forge/issues)
- 💬 [Discussions](https://github.com/ANKIT161020/create-node-forge/discussions)
- 📧 Email: [Contact](mailto:your-email@example.com)

---

**Made with ❤️ by [Ankit](https://github.com/ANKIT161020)**

_Happy coding! 🚀_
