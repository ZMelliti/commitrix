#!/usr/bin/env node
const { program } = require('commander');
const { lintCommit } = require('./linter');

program
  .version('0.1.0')
  .argument('<message>', 'commit message to lint')
  .action((message) => {
    const result = lintCommit(message);
    if (!result.valid) {
      console.error('❌ Commit message issues:');
      result.errors.forEach(error => console.error(`  • ${error}`));
      process.exit(1);
    }
    console.log('✅ Commit message looks good!');
  });

program.parse();