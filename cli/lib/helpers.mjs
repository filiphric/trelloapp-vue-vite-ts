import { spawn } from 'node:child_process';
import { copyFile, access, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import chalk from 'chalk';

/**
 * Run a command and capture output. Returns { code, stdout, stderr }.
 */
export function run(cmd, args = [], opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd || process.cwd(),
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      ...opts,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));

    child.on('close', (code) => resolve({ code, stdout, stderr }));
    child.on('error', (err) => resolve({ code: 1, stdout: '', stderr: err.message }));
  });
}

/**
 * Copy a file if the destination doesn't exist.
 */
export async function copyIfMissing(src, dest) {
  try {
    await access(dest, constants.F_OK);
    return false; // already exists
  } catch {
    await copyFile(src, dest);
    return true;
  }
}

/**
 * Check if a file or directory exists.
 */
export async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read a JSON file and parse it.
 */
export async function readJSON(path) {
  const raw = await readFile(path, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Write a JSON file with pretty formatting.
 */
export async function writeJSON(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

/**
 * Parse common npm install errors and return a human-friendly message.
 */
export function parseNpmError(stderr) {
  if (stderr.includes('EACCES')) {
    return 'Permission denied. Try running with sudo or fix npm permissions:\n  https://docs.npmjs.com/resolving-eacces-permissions-errors';
  }
  if (stderr.includes('ENETUNREACH') || stderr.includes('ENOTFOUND') || stderr.includes('EAI_AGAIN')) {
    return 'Network error. Check your internet connection and try again.';
  }
  if (stderr.includes('ERESOLVE') || stderr.includes('peer dep')) {
    return 'Dependency conflict. Try deleting node_modules and package-lock.json, then run npm install again.';
  }
  return null;
}

/**
 * Print a help message for attendees on restricted work machines.
 */
export function printSupportMessage() {
  console.log();
  console.log(chalk.yellow.bold('  ── Can\'t install? ──────────────────────────────────────'));
  console.log();
  console.log('  This often happens on work machines with restricted');
  console.log('  permissions. Here\'s what you can do:');
  console.log();
  console.log(chalk.bold('  1.') + ' Ask your system administrator to install:');
  console.log(chalk.dim('     • git'));
  console.log(chalk.dim('     • Node.js v20 or later'));
  console.log(chalk.dim('     • npm (comes with Node.js)'));
  console.log();
  console.log(chalk.bold('  2.') + ' If your company uses a ' + chalk.bold('VPN or proxy') + ', it may be');
  console.log('     blocking downloads. Ask IT to allowlist:');
  console.log(chalk.dim('     • github.com'));
  console.log(chalk.dim('     • registry.npmjs.org'));
  console.log();
  console.log(chalk.bold('  3.') + ' Contact the ' + chalk.bold('workshop instructor') + ' — we\'ll help');
  console.log('     you get set up before the session starts.');
  console.log();
}
