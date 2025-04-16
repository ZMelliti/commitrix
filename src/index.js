#!/usr/bin/env node
const { program } = require('commander');
const { lintCommit } = require('./linter');
const { installHook } = require('./install-hook');
const { buildCommit } = require('./interactive');
const { suggestFix } = require('./suggest');
const { displayStats } = require('./stats');
const { initProject } = require('./init');
const { validateRepo } = require('./validate-repo');

program.version('0.3.0');

program
  .command('install')
  .description('install git commit hook')
  .action(installHook);

program
  .command('build')
  .description('interactively build commit message')
  .action(async () => {
    const message = await buildCommit();
    console.log('\n📝 Generated commit message:');
    console.log(message);
  });

program
  .command('suggest <message>')
  .description('suggest fixes for commit message')
  .action((message) => {
    const suggestions = suggestFix(message);
    console.log('💡 Suggested fixes:');
    suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  });

program
  .command('stats')
  .description('show commit statistics')
  .action(displayStats);

program
  .command('init')
  .description('initialize project with commitrix')
  .action(initProject);

program
  .command('validate')
  .description('validate recent commits')
  .option('-n, --count <number>', 'number of commits to check', '10')
  .action((options) => validateRepo(parseInt(options.count)));

program
  .argument('[message]', 'commit message to lint')
  .action((message) => {
    if (message) {
      const result = lintCommit(message);
      if (!result.valid) {
        console.error('❌ Commit message issues:');
        result.errors.forEach(error => console.error(`  • ${error}`));
        
        const suggestions = suggestFix(message);
        if (suggestions.length > 0) {
          console.log('\n💡 Suggested fix:');
          console.log(`  ${suggestions[0]}`);
        }
        process.exit(1);
      }
      console.log('✅ Commit message looks good!');
    }
  });

program.parse();