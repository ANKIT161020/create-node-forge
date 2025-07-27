// plop-helpers/actions/postInstall.js
import { execSync } from "child_process";

/**
 * Action to run npm install.
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {function} A Plop action function.
 */
export const runNpmInstallAction = (data, projectDestDir) => (answers) => {
  if (data.installDependencies) {
    try {
      console.log(`Installing Node.js dependencies in ${projectDestDir}...`);
      execSync("npm install", { cwd: projectDestDir, stdio: "inherit" });
      return `✓ Node.js dependencies installed successfully`;
    } catch (error) {
      return `⚠ Warning: Failed to install dependencies: ${error.message}. You can run 'npm install' manually.`;
    }
  }
  return `Skipped npm install.`;
};

/**
 * Action to initialize Git repository.
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {function} A Plop action function.
 */
export const initializeGitAction = (data, projectDestDir) => (answers) => {
  if (data.initializeGit) {
    try {
      console.log(`Initializing Git repository in ${projectDestDir}...`);
      execSync("git init", { cwd: projectDestDir, stdio: "inherit" });
      return `✓ Git repository initialized successfully`;
    } catch (error) {
      return `⚠ Warning: Failed to initialize Git repository: ${error.message}. You can run 'git init' manually.`;
    }
  }
  return `Skipped Git initialization.`;
};

/**
 * Action for the final success message.
 * @param {object} data - The answers object from Plop prompts.
 * @returns {function} A Plop action function.
 */
export const finalSuccessMessageAction = (data) => (answers) => {
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
};
