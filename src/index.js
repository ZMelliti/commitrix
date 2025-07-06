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
const { runDoctor } = require('./doctor');
const { scanRepository } = require('./scan');
const { runBenchmark } = require('./benchmark');
const { generateReport } = require('./report');
const { searchCommits } = require('./search');

program.version('0.5.0');

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
  .command('doctor')
  .description('run health check on project setup')
  .action(runDoctor);

program
  .command('scan')
  .description('scan repository for commit quality issues')
  .option('-n, --count <number>', 'number of commits to scan', '100')
  .action((options) => scanRepository(parseInt(options.count)));

program
  .command('benchmark')
  .description('run performance benchmark')
  .action(runBenchmark);

program
  .command('report')
  .description('generate detailed quality report')
  .option('-f, --format <format>', 'output format (console|json)', 'console')
  .action((options) => generateReport(options.format));

program
  .command('search <query>')
  .description('search commit messages')
  .option('-t, --type <type>', 'filter by commit type')
  .option('-a, --author <author>', 'filter by author')
  .option('-n, --count <number>', 'number of commits to search', '50')
  .option('-s, --since <date>', 'search commits since date')
  .action((query, options) => {
    searchCommits(query, {
      type: options.type,
      author: options.author,
      count: parseInt(options.count),
      since: options.since
    });
  });

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