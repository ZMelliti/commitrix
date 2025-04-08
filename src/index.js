#!/usr/bin/env node
const { program } = require('commander');
const { lintCommit } = require('./linter');
const { installHook } = require('./install-hook');

program.version('0.2.0');

program
  .command('install')
  .description('install git commit hook')
  .action(installHook);

program
  .argument('[message]', 'commit message to lint')
  .action((message) => {
    if (message) {
      const result = lintCommit(message);
      if (!result.valid) {
        console.error('❌ Commit message issues:');
        result.errors.forEach(error => console.error(`  • ${error}`));
        process.exit(1);
      }
      console.log('✅ Commit message looks good!');
    }
  });

program.parse();