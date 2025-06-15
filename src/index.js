#!/usr/bin/env node
const { program } = require('commander');
const { lintCommit } = require('./linter');
const { installHook } = require('./install-hook');
const { buildCommit } = require('./interactive');
const { suggestFix } = require('./suggest');
const { displayStats } = require('./stats');
const { initProject } = require('./init');
const { validateRepo } = require('./validate-repo');
const { checkSetup } = require('./check');
const { showConfig, setConfig } = require('./config-cmd');
const { generateTemplate } = require('./template');
const { analyzeHistory } = require('./history');
const { showHelp } = require('./help');
const { lintMessage } = require('./lint-cmd');
const { autoFix } = require('./fix');
const { resetConfig } = require('./reset');

program.version('0.4.0');

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
  .command('check')
  .description('check project setup')
  .action(checkSetup);

program
  .command('config [key] [value]')
  .description('show or set configuration')
  .action((key, value) => {
    if (!key) showConfig();
    else if (!value) console.log('❌ Value required');
    else setConfig(key, value);
  });

program
  .command('template')
  .description('generate commit template')
  .option('-t, --type <type>', 'commit type')
  .option('-s, --scope <scope>', 'commit scope')
  .action((options) => generateTemplate(options.type, options.scope));

program
  .command('history')
  .description('analyze commit history')
  .option('-n, --count <number>', 'number of commits to analyze', '20')
  .action((options) => analyzeHistory(parseInt(options.count)));

program
  .command('help')
  .description('show help information')
  .action(showHelp);

program
  .command('lint <message>')
  .description('lint specific commit message')
  .action(lintMessage);

program
  .command('fix <message>')
  .description('auto-fix commit message')
  .action(autoFix);

program
  .command('reset')
  .description('reset configuration to defaults')
  .action(resetConfig);

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