import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { printBanner } from './lib/banner.mjs';
import { run, copyIfMissing, parseNpmError, printSupportMessage, isPortInUse, getPortProcess, killProcess } from './lib/helpers.mjs';
import { runCleanInstall } from './lib/clean.mjs';
import { runVerification } from './lib/verify.mjs';

const projectDir = resolve(process.cwd());
const dirName = process.argv[2] || 'trelloapp';

// Handle Ctrl+C gracefully
prompts.override({});
const onCancel = () => {
  console.log(chalk.yellow('\n  Setup cancelled.\n'));
  process.exit(1);
};

async function main() {
  printBanner();

  // ── Choose install type ──────────────────────────────────────
  const { installType } = await prompts({
    type: 'select',
    name: 'installType',
    message: 'Choose install type',
    choices: [
      {
        title: 'Full install',
        description: 'Includes test framework and example tests',
        value: 'full',
      },
      {
        title: 'Clean install',
        description: 'App only — no test files or test dependencies',
        value: 'clean',
      },
    ],
  }, { onCancel });

  // ── Clean install: remove test files ─────────────────────────
  if (installType === 'clean') {
    await runCleanInstall(projectDir);
  }

  // ── Install dependencies ─────────────────────────────────────
  const spinner = ora({ text: 'Installing dependencies...', color: 'cyan' }).start();
  const npmResult = await run('npm', ['install'], { cwd: projectDir });

  if (npmResult.code !== 0) {
    spinner.fail(chalk.red('npm install failed'));
    const hint = parseNpmError(npmResult.stderr);
    if (hint) {
      console.log(chalk.yellow(`\n  ${hint}\n`));
    } else {
      console.log(chalk.dim(npmResult.stderr.slice(0, 500)));
    }
    printSupportMessage();
    process.exit(1);
  }
  spinner.succeed(chalk.green('Dependencies installed'));

  // ── Full install: install Playwright browsers ────────────────
  if (installType === 'full') {
    const pwSpinner = ora({ text: 'Installing test browsers (this may take a minute)...', color: 'cyan' }).start();
    const pwResult = await run('npx', ['playwright', 'install', '--with-deps', 'chromium'], { cwd: projectDir });

    if (pwResult.code !== 0) {
      pwSpinner.warn(chalk.yellow('Playwright browser install had issues'));
      console.log(chalk.dim('  You can install browsers later with: npx playwright install chromium'));
    } else {
      pwSpinner.succeed(chalk.green('Test browsers installed'));
    }
  }

  // ── Copy .env file ──────────────────────────────────────────
  const envCopied = await copyIfMissing(
    resolve(projectDir, '.env_example'),
    resolve(projectDir, '.env')
  );
  if (envCopied) {
    console.log(chalk.green('  ✔') + '  .env file created from .env_example');
  }

  // ── Check ports 3000 & 3001 ─────────────────────────────────
  console.log();
  const portsToCheck = [
    { port: 3000, label: 'App (Vite)' },
    { port: 3001, label: 'Backend (API server)' },
  ];
  const busyPorts = [];

  for (const { port, label } of portsToCheck) {
    if (await isPortInUse(port)) {
      const info = await getPortProcess(port);
      busyPorts.push({ port, label, info });
    }
  }

  if (busyPorts.length > 0) {
    for (const { port, label, info } of busyPorts) {
      console.log(chalk.yellow('  ⚠') + `  Port ${port} is already in use (${label})`);
      if (info) {
        console.log(chalk.dim(`     PID ${info.pid}: ${info.command}`));
      }
    }
    console.log();

    const { portAction } = await prompts({
      type: 'select',
      name: 'portAction',
      message: `Free ${busyPorts.length === 1 ? 'the port' : 'both ports'}?`,
      choices: [
        {
          title: `Kill ${busyPorts.length === 1 ? 'the process' : 'the processes'} and free ${busyPorts.length === 1 ? 'port ' + busyPorts[0].port : 'ports ' + busyPorts.map(p => p.port).join(' & ')}`,
          value: 'kill',
        },
        {
          title: 'Skip — I\'ll handle it myself later',
          value: 'skip',
        },
      ],
    }, { onCancel });

    if (portAction === 'kill') {
      for (const { port, info } of busyPorts) {
        if (info) {
          try {
            await killProcess(info.pid);
            console.log(chalk.green('  ✔') + `  Process ${info.pid} killed, port ${port} is free`);
          } catch {
            console.log(chalk.red('  ✖') + `  Could not kill process ${info.pid} (port ${port})`);
            console.log(chalk.dim('     Try running manually: sudo kill -9 ' + info.pid));
          }
        } else {
          console.log(chalk.yellow('  ⚠') + `  Could not identify process on port ${port}`);
          console.log(chalk.dim(`     Try running manually: kill -9 $(lsof -t -i :${port})`));
        }
      }
    } else {
      console.log(chalk.dim('     Remember to free ports 3000 and 3001 before running npm start'));
    }
  }

  // ── Verification ────────────────────────────────────────────
  const verified = await runVerification(projectDir);

  if (verified === false) {
    printSupportMessage();
    process.exit(1);
  }

  // ── Success summary ─────────────────────────────────────────
  console.log();
  console.log(chalk.green.bold('  ✔ Setup complete!'));
  console.log();

  // ── Ask to start the app ──────────────────────────────────
  const { startNow } = await prompts({
    type: 'confirm',
    name: 'startNow',
    message: 'Start the app now?',
    initial: true,
  }, { onCancel });

  if (startNow) {
    console.log();
    console.log(chalk.cyan('  Starting the app...'));
    console.log(chalk.dim(`  App will be running at http://localhost:3000`));
    console.log();

    spawn('npm', ['start'], {
      cwd: projectDir,
      stdio: 'inherit',
      shell: true,
    });
  } else {
    console.log();
    console.log(chalk.bold('  To start the app later:'));
    console.log();
    console.log(chalk.cyan(`    cd ${dirName}`));
    console.log(chalk.cyan('    npm start'));
    console.log();
    console.log(chalk.dim(`    App will be running at http://localhost:3000`));

    if (installType === 'full') {
      console.log();
      console.log(chalk.dim('    Run tests:'));
      console.log(chalk.dim('      npm test          (unit tests)'));
      console.log(chalk.dim('      npm run test:e2e   (e2e tests)'));
    }

    console.log();
  }
}

main().catch((err) => {
  console.error(chalk.red(`\n  Unexpected error: ${err.message}\n`));
  process.exit(1);
});
