// plop-helpers/prompts.js
import fs from "fs-extra";
import path from "path";

// Function to get Plop's destination base path (needed for validation)
// This needs to be passed from plopfile.js as plop.getDestBasePath()
let _getDestBasePath;
export const setDestBasePathGetter = (getter) => {
  _getDestBasePath = getter;
};

export const projectPrompts = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your new project?",
    validate: (input) => {
      if (!input.match(/^[a-z0-9-]+$/i)) {
        return "Project name must be alphanumeric and can include hyphens (e.g., my-new-api).";
      }
      // Ensure _getDestBasePath is available
      if (!_getDestBasePath) {
        throw new Error("Plop dest base path getter not set.");
      }
      const targetPath = path.join(_getDestBasePath(), input);
      if (fs.existsSync(targetPath)) {
        return `A directory named "${input}" already exists here. Please choose a different name.`;
      }
      return true;
    },
  },
  {
    type: "input",
    name: "projectDescription",
    message: "A short description for your project:",
    default: "A robust Node.js API built with best practices.",
  },
  {
    type: "input",
    name: "projectAuthor",
    message: "Author's name (e.g., Your Name <your.email@example.com>):",
    default: "Your Name <your.email@example.com>",
  },
  {
    type: "confirm",
    name: "installDependencies",
    message: "Install Node.js dependencies now (npm install)?",
    default: true,
  },
  {
    type: "confirm",
    name: "initializeGit",
    message: "Initialize a Git repository (git init)?",
    default: true,
  },
  {
    type: "confirm",
    name: "includeDocker",
    message: "Include Docker setup (Dockerfile, docker-compose.yml)?",
    default: true,
  },
  {
    type: "confirm",
    name: "includeTests",
    message: "Include Jest unit and integration tests (__tests__/ folder)?",
    default: true,
  },
  {
    type: "confirm",
    name: "includeSwagger",
    message: "Include Swagger API documentation setup?",
    default: true,
  },
  {
    type: "confirm",
    name: "includeDbMongo",
    message: "Include MongoDB (Mongoose) setup?",
    default: true,
  },
];
