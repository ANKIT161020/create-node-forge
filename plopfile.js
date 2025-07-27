// plopfile.js
// This file defines the project generator using Plop.js

import path from "path";
import { fileURLToPath } from "url";

// Import all modularized helpers
import {
  projectPrompts,
  setDestBasePathGetter,
  createProjectDirAction,
  copyCommonFilesAction,
  addRootLevelTemplatedFiles,
  addCommonSrcTemplatedFiles,
  addDockerActions,
  addTestsActions,
  addSwaggerActions,
  addDatabaseActions,
  runNpmInstallAction,
  initializeGitAction,
  finalSuccessMessageAction,
} from "./plop-helpers/index.js"; // Note the .js extension for ES Modules

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plop uses CommonJS style for its export, which is fine here.
export default function (plop) {
  // Set the getter for plop.getDestBasePath() in the prompts module
  // This is crucial for prompt validation that checks for existing project directories.
  setDestBasePathGetter(plop.getDestBasePath);

  // Helper to compare values in Handlebars templates
  plop.setHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  // Main generator for creating a new Node.js project
  plop.setGenerator("project", {
    description: "Create a new Node.js project from the robust template.",

    // Use the imported prompts array
    prompts: projectPrompts,

    // Actions to perform based on user answers
    actions: (data) => {
      // Determine the destination directory for the new project
      const projectDestDir = path.join(
        plop.getDestBasePath(),
        data.projectName
      );

      // Collect all actions by calling the modular helper functions.
      // The spread operator (...) is used for helper functions that return an array of actions.
      const allActions = [
        createProjectDirAction(data, projectDestDir), // Action to create the root project directory
        copyCommonFilesAction(data, projectDestDir), // Action to copy static common files

        // Actions for templated files (return arrays of 'add' actions)
        ...addRootLevelTemplatedFiles(data),
        ...addCommonSrcTemplatedFiles(data),

        // Actions for optional tools (return arrays of 'add' or custom copy actions)
        ...addDockerActions(data, projectDestDir),
        ...addTestsActions(data, projectDestDir),
        ...addSwaggerActions(data),

        // Actions for features (return arrays of custom copy actions)
        ...addDatabaseActions(data, projectDestDir),

        // Post-installation actions
        runNpmInstallAction(data, projectDestDir),
        initializeGitAction(data, projectDestDir),
        finalSuccessMessageAction(data), // Final success message
      ];

      return allActions;
    },
  });
}
