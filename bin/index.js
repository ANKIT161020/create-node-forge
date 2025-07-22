#!/usr/bin/env node

// This is the main entry point for the 'create-node-forge' CLI tool.
// It uses Plop.js to scaffold a new project based on the defined generators.

import { Plop, run } from "plop";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url"; // Needed for __filename and __dirname in ES Modules

// Determine the path to the plopfile.js, which defines our generators.
// It's located in the parent directory relative to this bin script.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The root directory of the 'create_node_forge' package itself.
// This is where plopfile.js and the 'templates' folder are located.
const cliPackageRoot = path.resolve(__dirname, "..");
const plopfilePath = path.join(cliPackageRoot, "plopfile.js"); // Absolute path to plopfile.js

// The actual current working directory where the user invoked the 'npm create' command.
// This is where the *new project* should be created.
const projectCreationDest = process.env.INIT_CWD || process.cwd();

// Display a welcome message
console.log(
  chalk.blue.bold("\n🚀 Node.js Monolithic Template Project Creator 🚀\n")
);
console.log(chalk.cyan("Initializing project setup..."));

// Prepare Plop to run.
// - `cwd`: Set this to the root of your CLI package. Plop will use this as its internal working directory
//          to find `plopfile.js` and resolve `base: 'templates'` in `addMany` actions.
// - `plopfile`: Provide the absolute path to your plopfile.js.
Plop.prepare(
  {
    cwd: cliPackageRoot, // Plop's internal working directory for finding its config and templates
    updateLifecycles: true,
    plopfile: plopfilePath, // Absolute path to plopfile.js
  },
  (env) => {
    // Set `env.dest` to the directory where the *new project* should be created.
    // This is the user's original working directory.
    env.dest = projectCreationDest;

    // Execute Plop without chaining .then()
    try {
      Plop.execute(env, run);
    } catch (error) {
      console.error(
        chalk.red.bold("\nAn error occurred during project creation:")
      );
      console.error(chalk.red(error.message));
      console.error(
        chalk.red(
          "Please ensure you have necessary permissions and a valid project name."
        )
      );
      process.exit(1);
    }
  }
);
