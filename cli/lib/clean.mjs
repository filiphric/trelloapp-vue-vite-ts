import { rm, readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { readJSON, writeJSON, exists } from './helpers.mjs';

/**
 * Find all .spec.tsx files recursively in a directory.
 */
async function findSpecFiles(dir) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findSpecFiles(fullPath));
    } else if (entry.name.endsWith('.spec.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Remove test-related files and directories.
 */
async function removeTestFiles(projectDir) {
  const dirsToRemove = [
    'e2e',
    'src/test',
    'test-results',
    'coverage',
    '.nyc_output',
  ];

  const filesToRemove = [
    'vitest.config.ts',
    'playwright.config.ts',
    'codecov.yml',
    '.github/workflows/tests.yml',
    '.github/workflows/run-cypress.yml',
  ];

  for (const dir of dirsToRemove) {
    const fullPath = join(projectDir, dir);
    if (await exists(fullPath)) {
      await rm(fullPath, { recursive: true, force: true });
    }
  }

  for (const file of filesToRemove) {
    const fullPath = join(projectDir, file);
    if (await exists(fullPath)) {
      await unlink(fullPath);
    }
  }

  // Remove all .spec.tsx files from src/
  const specFiles = await findSpecFiles(join(projectDir, 'src'));
  for (const file of specFiles) {
    await unlink(file);
  }

  return specFiles.length;
}

/**
 * Patch package.json — remove test scripts and test dependencies.
 */
async function patchPackageJson(projectDir) {
  const pkgPath = join(projectDir, 'package.json');
  const pkg = await readJSON(pkgPath);

  // Remove test scripts
  delete pkg.scripts.test;
  delete pkg.scripts['test:e2e'];

  // Remove test devDependencies
  const devDepsToRemove = [
    '@playwright/test',
    '@testing-library/dom',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    '@vitest/coverage-v8',
    '@vitest/ui',
    'vitest',
    'jsdom',
    'eslint-plugin-no-only-tests',
  ];

  for (const dep of devDepsToRemove) {
    if (pkg.devDependencies) delete pkg.devDependencies[dep];
  }

  // Remove test dependencies
  const depsToRemove = ['vite-plugin-istanbul'];
  for (const dep of depsToRemove) {
    if (pkg.dependencies) delete pkg.dependencies[dep];
  }

  await writeJSON(pkgPath, pkg);
}

/**
 * Patch vite.config.ts — remove istanbul import and plugin.
 */
async function patchViteConfig(projectDir) {
  const configPath = join(projectDir, 'vite.config.ts');
  let content = await readFile(configPath, 'utf-8');

  // Remove the istanbul import line
  content = content.replace(/import istanbul from 'vite-plugin-istanbul';\n/, '');

  // Remove the istanbul plugin block (handles multi-line with trailing comma)
  content = content.replace(
    /\s*istanbul\(\{[\s\S]*?\}\),?\n/,
    '\n'
  );

  await writeFile(configPath, content, 'utf-8');
}

/**
 * Patch tsconfig.json — remove "vitest/globals" from types.
 */
async function patchTsConfig(projectDir) {
  const configPath = join(projectDir, 'tsconfig.json');
  const config = await readJSON(configPath);

  if (config.compilerOptions?.types) {
    config.compilerOptions.types = config.compilerOptions.types.filter(
      (t) => t !== 'vitest/globals'
    );
  }

  await writeJSON(configPath, config);
}

/**
 * Patch .eslintrc.js — remove no-only-tests plugin and rule.
 */
async function patchEslintConfig(projectDir) {
  const configPath = join(projectDir, '.eslintrc.js');
  let content = await readFile(configPath, 'utf-8');

  // Remove 'no-only-tests' from plugins array
  content = content.replace(/,?\s*'no-only-tests'/, '');

  // Remove the no-only-tests rule line
  content = content.replace(/\s*'no-only-tests\/no-only-tests':\s*'error',?\n/, '\n');

  await writeFile(configPath, content, 'utf-8');
}

/**
 * Patch .gitignore — remove test-specific entries.
 */
async function patchGitignore(projectDir) {
  const gitignorePath = join(projectDir, '.gitignore');
  let content = await readFile(gitignorePath, 'utf-8');

  const linesToRemove = [
    'e2e/.auth/',
    'test-results/',
    'playwright-report/',
    'coverage',
    '.nyc_output',
  ];

  const lines = content.split('\n');
  const filtered = lines.filter((line) => !linesToRemove.includes(line.trim()));
  await writeFile(gitignorePath, filtered.join('\n'), 'utf-8');
}

/**
 * Run the full clean install process.
 */
export async function runCleanInstall(projectDir) {
  const spinner = ora({ text: 'Removing test files...', color: 'cyan' }).start();

  try {
    const specCount = await removeTestFiles(projectDir);
    spinner.succeed(chalk.green(`Removed test files (${specCount} spec files, e2e/, config files)`));

    spinner.start('Patching configuration files...');
    await patchPackageJson(projectDir);
    await patchViteConfig(projectDir);
    await patchTsConfig(projectDir);
    await patchEslintConfig(projectDir);
    await patchGitignore(projectDir);
    spinner.succeed(chalk.green('Configuration files patched'));
  } catch (err) {
    spinner.fail(chalk.red('Clean install failed'));
    console.error(chalk.dim(err.message));
    process.exit(1);
  }
}
