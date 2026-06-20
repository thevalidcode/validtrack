#!/usr/bin/env node
/**
 * Ensures build output directories are writable.
 * Running Expo with sudo can root-own public/ and dist/ — fix with:
 *   sudo chown -R "$(whoami)" .
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const targets = [
  path.join(root, "dist"),
  path.join(root, "public"),
  path.join(root, "public", "fonts"),
];

for (const target of targets) {
  fs.mkdirSync(target, { recursive: true });

  try {
    fs.accessSync(target, fs.constants.W_OK);
  } catch {
    console.error(
      `\nPermission denied: ${path.relative(root, target)}\n` +
        'This usually happens after running Expo with sudo.\n' +
        'Fix it once with:\n\n  sudo chown -R "$(whoami)" .\n'
    );
    process.exit(1);
  }
}
