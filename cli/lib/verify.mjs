import { join } from 'node:path';
import { createServer } from 'node:net';
import { get } from 'node:http';
import { spawn } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { exists } from './helpers.mjs';

/**
 * Wait for a URL to respond with a 200-level status.
 */
function waitForServer(url, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(true);
        } else if (Date.now() - start > timeoutMs) {
          reject(new Error('Timeout'));
        } else {
          setTimeout(check, 500);
        }
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error('Timeout'));
        } else {
          setTimeout(check, 500);
        }
      });
    };

    check();
  });
}

/**
 * Run all verification checks.
 */
export async function runVerification(projectDir) {
  const spinner = ora({ text: 'Verifying installation...', color: 'cyan' }).start();
  let allPassed = true;

  // 1. Check node_modules exists
  const nodeModulesPath = join(projectDir, 'node_modules');
  if (!(await exists(nodeModulesPath))) {
    spinner.fail(chalk.red('node_modules not found'));
    return false;
  }

  // 2. Check vite binary exists
  const viteBinPath = join(projectDir, 'node_modules', '.bin', 'vite');
  if (!(await exists(viteBinPath))) {
    spinner.fail(chalk.red('vite binary not found in node_modules'));
    return false;
  }

  spinner.succeed(chalk.green('Dependencies installed correctly'));

  // 3. Check port 3000 availability
  spinner.start('Checking port 3000...');
  const portInUse = await new Promise((resolve) => {
    const server = createServer();
    server.once('error', (err) => {
      resolve(err.code === 'EADDRINUSE');
    });
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(3000);
  });

  if (portInUse) {
    spinner.warn(chalk.yellow('Port 3000 is already in use'));
    console.log(chalk.dim('  Find what\'s using it: lsof -i :3000'));
    console.log(chalk.dim('  Kill it: kill -9 $(lsof -t -i :3000)'));
    return true; // non-fatal
  }

  // 4. Start dev server and check it responds
  spinner.start('Starting dev server for verification...');

  const devServer = spawn('npm', ['start'], {
    cwd: projectDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    detached: true,
  });

  try {
    await waitForServer('http://localhost:3000', 30000);
    spinner.succeed(chalk.green('Dev server starts successfully'));
  } catch {
    spinner.warn(chalk.yellow('Dev server verification timed out (this may be fine)'));
    allPassed = false;
  } finally {
    // Kill the dev server process group
    try {
      process.kill(-devServer.pid, 'SIGTERM');
    } catch {
      // process may have already exited
    }
  }

  return allPassed;
}
