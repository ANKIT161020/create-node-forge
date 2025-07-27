// plop-helpers/constants.js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define base paths for the template structure
export const TEMPLATES_BASE_DIR = path.join(__dirname, "..", "templates");
export const COMMON_TEMPLATE_DIR = path.join(TEMPLATES_BASE_DIR, "common");
export const ROOT_LEVEL_TEMPLATED_DIR = path.join(
  TEMPLATES_BASE_DIR,
  "root-level-templated"
);
export const OPTIONAL_TOOLS_TEMPLATE_DIR = path.join(
  TEMPLATES_BASE_DIR,
  "optional-tools"
);
export const FEATURES_TEMPLATE_DIR = path.join(TEMPLATES_BASE_DIR, "features");
