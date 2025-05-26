function showHelp() {
  console.log(`
🎯 Commitrix - Git Commit Quality Linter

USAGE:
  commitrix <command> [options]

COMMANDS:
  <message>                 Lint commit message
  build                     Interactive commit builder
  install                   Install git hooks
  init                      Initialize project
  stats                     Show commit statistics
  suggest <message>         Get suggestions for message
  validate [--count n]      Validate recent commits
  check                     Check project setup
  config [key] [value]      Show/set configuration
  template [--type t]       Generate commit template
  history [--count n]       Analyze commit history
  lint <message>            Lint specific message
  fix <message>             Auto-fix commit message
  reset                     Reset configuration to defaults
  help                      Show this help

EXAMPLES:
  commitrix "feat: add login"
  commitrix build
  commitrix config maxLength 80
  commitrix template --type fix
  commitrix history --count 10

For more info: https://github.com/zmelliti/commitrix
`);
}

module.exports = { showHelp };