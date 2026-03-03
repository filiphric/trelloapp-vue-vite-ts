import chalk from 'chalk';

export function printBanner() {
  const cyan = chalk.cyan.bold;
  const white = chalk.white.bold;

  console.log();
  console.log(cyan('  ┌───────────────────────────────────┐'));
  console.log(cyan('  │                                   │'));
  console.log(cyan('  │') + white('   Trello App Workshop Setup   ') + cyan('    │'));
  console.log(cyan('  │                                   │'));
  console.log(cyan('  └───────────────────────────────────┘'));
  console.log();
}
