// plop-helpers/actions/common.js
import fs from "fs-extra";
import path from "path";
import { copyRecursive } from "./utils.js"; // Import the utility copier
import { COMMON_TEMPLATE_DIR, ROOT_LEVEL_TEMPLATED_DIR } from "../constants.js"; // Import paths

/**
 * Ensures the main project directory exists.
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {function} A Plop action function.
 */
export const createProjectDirAction = (data, projectDestDir) => (answers) => {
  fs.ensureDirSync(projectDestDir);
  return `Ensured project directory exists: ${data.projectName}/`;
};

/**
 * Action to copy common (static) files from the 'common' template directory.
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {function} A Plop action function.
 */
export const copyCommonFilesAction = (data, projectDestDir) => (answers) => {
  const commonSkipList = [
    "src/app.ts",
    "src/app.ts.hbs",
    "src/server.ts",
    "src/server.ts.hbs",
    "src/config/index.ts",
    "src/config/index.ts.hbs",
    // Add any other files from 'common' that are handled by explicit 'add' actions
  ];

  try {
    copyRecursive(
      COMMON_TEMPLATE_DIR,
      projectDestDir,
      COMMON_TEMPLATE_DIR,
      commonSkipList
    );
    return `✓ Copied common core project files.`;
  } catch (error) {
    throw new Error(`Failed to copy common files: ${error.message}`);
  }
};

/**
 * Returns actions for adding templated files from 'root-level-templated'.
 * @param {object} data - The answers object from Plop prompts.
 * @returns {object[]} An array of Plop add actions.
 */
export const addRootLevelTemplatedFiles = (data) => [
  {
    type: "add",
    path: "{{projectName}}/package.json",
    templateFile: path.join(ROOT_LEVEL_TEMPLATED_DIR, "package.json.hbs"),
    data: {
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      projectAuthor: data.projectAuthor,
      includeTests: data.includeTests,
      includeSwagger: data.includeSwagger,
      includeDbMongo: data.includeDbMongo,
    },
    force: true,
  },
  {
    type: "add",
    path: "{{projectName}}/.env.example",
    templateFile: path.join(ROOT_LEVEL_TEMPLATED_DIR, ".env.example.hbs"),
    data: {
      projectName: data.projectName,
      includeDbMongo: data.includeDbMongo,
    },
    force: true,
  },
  {
    type: "add",
    path: "{{projectName}}/README.md",
    templateFile: path.join(ROOT_LEVEL_TEMPLATED_DIR, "README.md.hbs"),
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
  },
];

/**
 * Returns actions for adding templated files within the 'src' directory (from common).
 * @param {object} data - The answers object from Plop prompts.
 * @returns {object[]} An array of Plop add actions.
 */
export const addCommonSrcTemplatedFiles = (data) => [
  {
    type: "add",
    path: "{{projectName}}/src/app.ts",
    templateFile: path.join(COMMON_TEMPLATE_DIR, "src", "app.ts.hbs"),
    data: {
      includeSwagger: data.includeSwagger,
      includeDbMongo: data.includeDbMongo,
    },
    force: true,
  },
  {
    type: "add",
    path: "{{projectName}}/src/server.ts",
    templateFile: path.join(COMMON_TEMPLATE_DIR, "src", "server.ts.hbs"),
    data: {
      includeDbMongo: data.includeDbMongo,
    },
    force: true,
  },
  {
    type: "add",
    path: "{{projectName}}/src/config/index.ts",
    templateFile: path.join(
      COMMON_TEMPLATE_DIR,
      "src",
      "config",
      "index.ts.hbs"
    ),
    data: {
      includeDbMongo: data.includeDbMongo,
      projectName: data.projectName,
    },
    force: true,
  },
];
