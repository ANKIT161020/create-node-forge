// plop-helpers/actions/utils.js
import fs from "fs-extra";
import path from "path";

/**
 * Recursively copies files from a source directory to a destination,
 * skipping files/folders specified in a skip list.
 * @param {string} src - Source directory.
 * @param {string} dest - Destination directory.
 * @param {string} baseSrcForRelative - The base path to calculate relative paths for the skip list.
 * @param {string[]} skipList - Array of relative paths or item names to skip.
 */
export const copyRecursive = (src, dest, baseSrcForRelative, skipList) => {
  const items = fs.readdirSync(src);

  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);

    const relativeSrcPath = path
      .relative(baseSrcForRelative, srcPath)
      .replace(/\\/g, "/");

    if (skipList.includes(relativeSrcPath) || skipList.includes(item)) {
      continue; // Skip this item
    }

    if (stat.isDirectory()) {
      fs.ensureDirSync(destPath);
      copyRecursive(srcPath, destPath, baseSrcForRelative, skipList); // Recurse
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};
