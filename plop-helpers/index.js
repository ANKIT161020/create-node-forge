// plop-helpers/index.js

// Prompts
export { projectPrompts, setDestBasePathGetter } from "./prompts.js";

// Actions
export {
  createProjectDirAction,
  copyCommonFilesAction,
  addRootLevelTemplatedFiles,
  addCommonSrcTemplatedFiles,
} from "./actions/common.js";
export { addDockerActions } from "./actions/docker.js";
export { addTestsActions } from "./actions/tests.js";
export { addSwaggerActions } from "./actions/swagger.js";
export { addDatabaseActions } from "./actions/database.js";
export {
  runNpmInstallAction,
  initializeGitAction,
  finalSuccessMessageAction,
} from "./actions/postInstall.js";
// Export utils if needed elsewhere, though usually just for other actions
export { copyRecursive } from "./actions/utils.js";
