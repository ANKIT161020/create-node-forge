// plopfile.js
// This file defines the project generator using Plop.js

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plop uses CommonJS style for its export, which is fine here.
export default function (plop) {
  // Helper to compare values in Handlebars templates
  plop.setHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  // Main generator for creating a new Node.js project
  plop.setGenerator("project", {
    description: "Create a new Node.js project from the robust template.",

    // Questions to ask the user
    prompts: [
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your new project?",
        validate: (input) => {
          if (!input.match(/^[a-z0-9-]+$/i)) {
            return "Project name must be alphanumeric and can include hyphens (e.g., my-new-api).";
          }
          // Check if directory already exists in the target destination (userCwd)
          const targetPath = path.join(plop.getDestBasePath(), input);
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
    ],

    // Actions to perform based on user answers
    actions: (data) => {
      const actions = [];

      // 1. Custom action to copy files without Handlebars processing
      actions.push((answers) => {
        // Use __dirname which is the directory containing this plopfile.js
        const templateDir = path.join(__dirname, "templates");
        const destDir = path.join(plop.getDestBasePath(), answers.projectName);

        // Debug logging
        console.log(`Plopfile directory: ${__dirname}`);
        console.log(`Looking for templates at: ${templateDir}`);
        console.log(`Templates exist: ${fs.existsSync(templateDir)}`);

        if (!fs.existsSync(templateDir)) {
          throw new Error(`Template directory not found at: ${templateDir}`);
        }

        // Ensure destination directory exists
        fs.ensureDirSync(destDir);

        // Function to copy files recursively
        const copyFiles = (src, dest) => {
          const items = fs.readdirSync(src);

          for (const item of items) {
            const srcPath = path.join(src, item);
            const destPath = path.join(dest, item);
            const stat = fs.statSync(srcPath);

            if (stat.isDirectory()) {
              // Skip directories based on user choices
              if (
                !answers.includeDocker &&
                (item === "docker" || item.includes("docker"))
              ) {
                continue;
              }
              if (!answers.includeTests && item === "__tests__") {
                continue;
              }
              if (item === ".git" || item === "node_modules") {
                continue;
              }

              fs.ensureDirSync(destPath);
              copyFiles(srcPath, destPath);
            } else {
              // Skip specific files that will be handled separately
              if (item === "package.json" || item === ".env.example") {
                continue;
              }

              // Skip Docker files if not wanted
              if (
                !answers.includeDocker &&
                (item === "Dockerfile" || item === "docker-compose.yml")
              ) {
                continue;
              }

              // Copy file without any processing
              fs.copyFileSync(srcPath, destPath);
            }
          }
        };

        try {
          copyFiles(templateDir, destDir);
          return `✓ Copied template files to ${answers.projectName}/`;
        } catch (error) {
          throw new Error(`Failed to copy template files: ${error.message}`);
        }
      });

      // 2. Handle package.json with templating
      actions.push({
        type: "add",
        path: "{{projectName}}/package.json",
        templateFile: "templates/package.json",
        data: {
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          projectAuthor: data.projectAuthor,
        },
        force: true,
      });

      // 3. Handle .env.example with templating
      actions.push({
        type: "add",
        path: "{{projectName}}/.env.example",
        templateFile: "templates/.env.example",
        data: {
          projectName: data.projectName,
        },
        force: true,
      });

      // 4. Conditionally remove Swagger-related code
      if (!data.includeSwagger) {
        actions.push((answers) => {
          const appTsPath = path.join(
            plop.getDestBasePath(),
            answers.projectName,
            "src/app.ts"
          );
          const swaggerConfigPath = path.join(
            plop.getDestBasePath(),
            answers.projectName,
            "src/config/swagger.ts"
          );

          try {
            // Remove swagger imports and setup from app.ts
            if (fs.existsSync(appTsPath)) {
              let content = fs.readFileSync(appTsPath, "utf8");

              // Remove swagger imports
              content = content.replace(
                /import swaggerJsdoc from 'swagger-jsdoc';\s*/g,
                ""
              );
              content = content.replace(
                /import swaggerUi from 'swagger-ui-express';\s*/g,
                ""
              );
              content = content.replace(
                /import swaggerOptions from '@config\/swagger';\s*/g,
                ""
              );

              // Remove swagger setup block
              content = content.replace(
                /\/\/ Swagger API Documentation[\s\S]*?logger\.info\(`⚡️\[server\]: API Docs available at.*?\`\);\s*}/,
                "// Swagger API Documentation removed"
              );

              fs.writeFileSync(appTsPath, content);
            }

            // Remove swagger config file
            if (fs.existsSync(swaggerConfigPath)) {
              fs.removeSync(swaggerConfigPath);
            }

            return `✓ Removed Swagger documentation setup`;
          } catch (error) {
            return `⚠ Warning: Could not fully remove Swagger setup: ${error.message}`;
          }
        });
      }

      // 5. Custom action to run npm install
      if (data.installDependencies) {
        actions.push((answers) => {
          try {
            const projectPath = path.join(
              plop.getDestBasePath(),
              answers.projectName
            );
            console.log(`Installing Node.js dependencies in ${projectPath}...`);

            execSync("npm install", {
              cwd: projectPath,
              stdio: "inherit",
            });

            return `✓ Node.js dependencies installed successfully`;
          } catch (error) {
            return `⚠ Warning: Failed to install dependencies: ${error.message}. You can run 'npm install' manually.`;
          }
        });
      }

      // 6. Custom action to initialize Git
      if (data.initializeGit) {
        actions.push((answers) => {
          try {
            const projectPath = path.join(
              plop.getDestBasePath(),
              answers.projectName
            );
            console.log(`Initializing Git repository in ${projectPath}...`);

            execSync("git init", {
              cwd: projectPath,
              stdio: "inherit",
            });

            return `✓ Git repository initialized successfully`;
          } catch (error) {
            return `⚠ Warning: Failed to initialize Git repository: ${error.message}. You can run 'git init' manually.`;
          }
        });
      }

      // 7. Final success message
      actions.push((answers) => {
        return (
          `\n🎉 Project "${answers.projectName}" created successfully! 🎉\n\n` +
          `To get started, navigate to your new project:\n` +
          `  cd ${answers.projectName}\n` +
          (data.installDependencies
            ? ""
            : `  Then install dependencies: npm install\n`) +
          `  And start the development server: npm run dev\n\n` +
          `Happy coding!`
        );
      });

      return actions;
    },
  });
}
