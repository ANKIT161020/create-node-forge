// plop-helpers/actions/swagger.js
import path from "path";
import { OPTIONAL_TOOLS_TEMPLATE_DIR } from "../constants.js"; // Import paths

/**
 * Returns actions for conditionally adding Swagger files.
 * @param {object} data - The answers object from Plop prompts.
 * @returns {object[]} An array of Plop actions.
 */
export const addSwaggerActions = (data) => {
  const actions = [];

  if (data.includeSwagger) {
    actions.push({
      type: "add",
      path: "{{projectName}}/src/config/swagger.ts",
      templateFile: path.join(
        OPTIONAL_TOOLS_TEMPLATE_DIR,
        "swagger",
        "swagger.ts.hbs"
      ),
      data: {
        projectName: data.projectName,
        projectDescription: data.projectDescription,
        projectAuthor: data.projectAuthor,
      },
      force: true,
    });
  }

  return actions;
};
