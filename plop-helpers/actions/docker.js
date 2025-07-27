// plop-helpers/actions/docker.js
import fs from "fs-extra";
import path from "path";
import { OPTIONAL_TOOLS_TEMPLATE_DIR } from "../constants.js"; // Import paths

/**
 * Returns actions for conditionally adding/copying Docker files.
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {object[]} An array of Plop actions.
 */
export const addDockerActions = (data, projectDestDir) => {
  const actions = [];

  if (data.includeDocker) {
    actions.push({
      type: "add",
      path: "{{projectName}}/Dockerfile",
      templateFile: path.join(
        OPTIONAL_TOOLS_TEMPLATE_DIR,
        "docker",
        "Dockerfile.hbs"
      ),
      data: {
        projectName: data.projectName,
        projectDescription: data.projectDescription,
      },
      force: true,
    });
    actions.push({
      type: "add",
      path: "{{projectName}}/docker-compose.yml",
      templateFile: path.join(
        OPTIONAL_TOOLS_TEMPLATE_DIR,
        "docker",
        "docker-compose.yml.hbs"
      ),
      data: {
        projectName: data.projectName,
        includeDbMongo: data.includeDbMongo,
      },
      force: true,
    });
    actions.push((answers) => {
      const srcDockerignore = path.join(
        OPTIONAL_TOOLS_TEMPLATE_DIR,
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

  return actions;
};
