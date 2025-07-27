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
      // Database choice (MongoDB/Mongoose for now)
      {
        type: "confirm",
        name: "includeDbMongo",
        message: "Include MongoDB (Mongoose) setup?",
        default: true,
      },
    ],

    // Actions to perform based on user answers
    actions: (data) => {
      const actions = [];
      // Define base paths for the new template structure
      const commonTemplateDir = path.join(__dirname, "templates", "common");
      const rootLevelTemplatedDir = path.join(
        __dirname,
        "templates",
        "root-level-templated"
      );
      const optionalToolsTemplateDir = path.join(
        __dirname,
        "templates",
        "optional-tools"
      );
      const featuresTemplateDir = path.join(__dirname, "templates", "features");

      const projectDestDir = path.join(
        plop.getDestBasePath(),
        data.projectName
      );

      // 1. Ensure project directory exists
      actions.push((answers) => {
        fs.ensureDirSync(projectDestDir);
        return `Ensured project directory exists: ${data.projectName}/`;
      });

      // 2. Copy Common Files (all static files from templates/common)
      // This function recursively copies files from 'common' to destination,
      // skipping files that will be handled by explicit 'add' actions.
      actions.push((answers) => {
        // Define files/folders within 'common' that need specific 'add' actions
        // or should not be copied by the generic common copier
        const commonSkipList = [
          "src/app.ts", // Original name if not renamed, but app.ts.hbs is the source
          "src/app.ts.hbs", // Handled by explicit add action
          "src/server.ts", // Handled by explicit add action
          "src/server.ts.hbs", // Handled by explicit add action
          "src/config/index.ts", // Handled by explicit add action
          "src/config/index.ts.hbs", // Handled by explicit add action
          // Add any other files from 'common' that you want to specifically manage via 'add'
        ];

        const copyRecursive = (src, dest) => {
          const items = fs.readdirSync(src);

          for (const item of items) {
            const srcPath = path.join(src, item);
            const destPath = path.join(dest, item);
            const stat = fs.statSync(srcPath);

            // Construct relative path from commonTemplateDir for skipList check
            const relativeSrcPath = path
              .relative(commonTemplateDir, srcPath)
              .replace(/\\/g, "/");

            if (
              commonSkipList.includes(relativeSrcPath) ||
              commonSkipList.includes(item)
            ) {
              continue; // Skip this item
            }

            if (stat.isDirectory()) {
              fs.ensureDirSync(destPath);
              copyRecursive(srcPath, destPath); // Recurse
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        };

        try {
          copyRecursive(commonTemplateDir, projectDestDir);
          return `✓ Copied common core project files.`;
        } catch (error) {
          throw new Error(`Failed to copy common files: ${error.message}`);
        }
      });

      // 3. Add templated root-level files (package.json, .env.example, README.md)
      actions.push({
        type: "add",
        path: "{{projectName}}/package.json",
        templateFile: path.join(rootLevelTemplatedDir, "package.json.hbs"),
        data: {
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          projectAuthor: data.projectAuthor,
          includeTests: data.includeTests,
          includeSwagger: data.includeSwagger,
          includeDbMongo: data.includeDbMongo, // Pass DB choice
        },
        force: true,
      });

      actions.push({
        type: "add",
        path: "{{projectName}}/.env.example",
        templateFile: path.join(rootLevelTemplatedDir, ".env.example.hbs"),
        data: {
          projectName: data.projectName,
          includeDbMongo: data.includeDbMongo, // Pass DB choice for connection string
        },
        force: true,
      });

      actions.push({
        type: "add",
        path: "{{projectName}}/README.md",
        templateFile: path.join(rootLevelTemplatedDir, "README.md.hbs"),
        data: {
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          projectAuthor: data.projectAuthor,
          includeDbMongo: data.includeDbMongo,
          includeTests: data.includeTests,
          includeSwagger: data.includeSwagger,
          includeDocker: data.includeDocker,
        },
        force: true,
      });

      // Add app.ts (main express app with conditional logic inside)
      actions.push({
        type: "add",
        path: "{{projectName}}/src/app.ts",
        templateFile: path.join(commonTemplateDir, "src", "app.ts.hbs"),
        data: {
          includeSwagger: data.includeSwagger,
          includeDbMongo: data.includeDbMongo, // Pass DB choice if app.ts needs it
        },
        force: true,
      });

      // Add server.ts (main server entry point with conditional DB logic)
      actions.push({
        type: "add",
        path: "{{projectName}}/src/server.ts",
        templateFile: path.join(commonTemplateDir, "src", "server.ts.hbs"),
        data: {
          includeDbMongo: data.includeDbMongo,
        },
        force: true,
      });

      // Add index.ts (config file with conditional DB env vars)
      actions.push({
        type: "add",
        path: "{{projectName}}/src/config/index.ts",
        templateFile: path.join(
          commonTemplateDir,
          "src",
          "config",
          "index.ts.hbs"
        ),
        data: {
          includeDbMongo: data.includeDbMongo,
          projectName: data.projectName, // Pass project name if needed in index.ts for default values
        },
        force: true,
      });

      // 4. Conditionally add/copy optional tools
      if (data.includeDocker) {
        // Add Dockerfile (templated)
        actions.push({
          type: "add",
          path: "{{projectName}}/Dockerfile",
          templateFile: path.join(
            optionalToolsTemplateDir,
            "docker",
            "Dockerfile.hbs"
          ),
          data: {
            projectName: data.projectName,
            projectDescription: data.projectDescription,
          },
          force: true,
        });

        // Add docker-compose.yml (templated)
        actions.push({
          type: "add",
          path: "{{projectName}}/docker-compose.yml",
          templateFile: path.join(
            optionalToolsTemplateDir,
            "docker",
            "docker-compose.yml.hbs"
          ),
          data: {
            projectName: data.projectName,
            includeDbMongo: data.includeDbMongo,
          },
          force: true,
        });

        // Copy .dockerignore (static file)
        actions.push((answers) => {
          const srcDockerignore = path.join(
            optionalToolsTemplateDir,
            "docker",
            ".dockerignore"
          );
          const destDockerignore = path.join(projectDestDir, ".dockerignore");
          if (fs.existsSync(srcDockerignore)) {
            fs.copyFileSync(srcDockerignore, destDockerignore);
            return `✓ Copied .dockerignore file.`;
          }
          return `No .dockerignore file found to copy.`;
        });
      }

      if (data.includeTests) {
        // Copy __tests__ folder (static content, but conditional)
        actions.push((answers) => {
          const srcTestsDir = path.join(
            optionalToolsTemplateDir,
            "tests",
            "__tests__"
          );
          const destTestsDir = path.join(projectDestDir, "__tests__");
          if (fs.existsSync(srcTestsDir)) {
            fs.copySync(srcTestsDir, destTestsDir); // fs-extra's copySync handles directories recursively
            return `✓ Copied Jest test files.`;
          }
          return `No test files found to copy.`;
        });
        // jest.config.js is now in common/ so it's always copied. Its dependencies are conditional in package.json.
      }

      if (data.includeSwagger) {
        // Add swagger config file (templated)
        actions.push({
          type: "add",
          path: "{{projectName}}/src/config/swagger.ts", // Destination path
          templateFile: path.join(
            optionalToolsTemplateDir,
            "swagger",
            "swagger.ts.hbs"
          ), // Source template file
          data: {
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            projectAuthor: data.projectAuthor,
          },
          force: true,
        });
      }

      // 5. Conditionally copy database specific files (e.g., Mongoose)
      if (data.includeDbMongo) {
        actions.push((answers) => {
          const srcMongooseDir = path.join(
            featuresTemplateDir,
            "database",
            "Mongo"
          );
          const destMongooseDir = path.join(projectDestDir, "src"); // Example: src/database/mongoose
          if (fs.existsSync(srcMongooseDir)) {
            fs.copySync(srcMongooseDir, destMongooseDir);
            return `✓ Copied MongoDB (Mongoose) setup files.`;
          }
          return `No Mongoose files found to copy.`;
        });
      }

      // 6. Run npm install
      if (data.installDependencies) {
        actions.push((answers) => {
          try {
            const projectPath = path.join(
              plop.getDestBasePath(),
              answers.projectName
            );
            console.log(`Installing Node.js dependencies in ${projectPath}...`);
            execSync("npm install", { cwd: projectPath, stdio: "inherit" });
            return `✓ Node.js dependencies installed successfully`;
          } catch (error) {
            return `⚠ Warning: Failed to install dependencies: ${error.message}. You can run 'npm install' manually.`;
          }
        });
      }

      // 7. Initialize Git
      if (data.initializeGit) {
        actions.push((answers) => {
          try {
            const projectPath = path.join(
              plop.getDestBasePath(),
              answers.projectName
            );
            console.log(`Initializing Git repository in ${projectPath}...`);
            execSync("git init", { cwd: projectPath, stdio: "inherit" });
            return `✓ Git repository initialized successfully`;
          } catch (error) {
            return `⚠ Warning: Failed to initialize Git repository: ${error.message}. You can run 'git init' manually.`;
          }
        });
      }

      // 8. Final success message
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
