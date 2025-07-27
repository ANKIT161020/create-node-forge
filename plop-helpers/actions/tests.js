// plop-helpers/actions/tests.js
import fs from "fs-extra";
import path from "path";
import { OPTIONAL_TOOLS_TEMPLATE_DIR } from "../constants.js"; // Import paths

/**
 * Returns actions for conditionally copying test files.
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {object[]} An array of Plop actions.
 */
export const addTestsActions = (data, projectDestDir) => {
  const actions = [];

  if (data.includeTests) {
    actions.push((answers) => {
      const srcTestsDir = path.join(
        OPTIONAL_TOOLS_TEMPLATE_DIR,
        "tests",
        "__tests__"
      );
      const destTestsDir = path.join(projectDestDir, "__tests__");
      if (fs.existsSync(srcTestsDir)) {
        fs.copySync(srcTestsDir, destTestsDir);
        return `✓ Copied Jest test files.`;
      }
      return `No test files found to copy.`;
    });
  }

  return actions;
};
