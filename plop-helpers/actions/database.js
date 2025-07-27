// plop-helpers/actions/database.js
import fs from "fs-extra";
import path from "path";
import { FEATURES_TEMPLATE_DIR } from "../constants.js"; // Import paths

/**
 * Returns actions for conditionally copying database specific files (e.g., Mongoose).
 * @param {object} data - The answers object from Plop prompts.
 * @param {string} projectDestDir - The destination directory for the project.
 * @returns {object[]} An array of Plop actions.
 */
export const addDatabaseActions = (data, projectDestDir) => {
  const actions = [];

  if (data.includeDbMongo) {
    actions.push((answers) => {
      const srcMongooseDir = path.join(
        FEATURES_TEMPLATE_DIR,
        "database",
        "Mongo"
      ); // Corrected to 'mongoose'
      const destMongooseDir = path.join(projectDestDir, "src");
      if (fs.existsSync(srcMongooseDir)) {
        fs.copySync(srcMongooseDir, destMongooseDir);
        return `✓ Copied MongoDB (Mongoose) setup files.`;
      }
      return `No Mongoose files found to copy.`;
    });
  }

  return actions;
};
