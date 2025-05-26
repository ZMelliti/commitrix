const { lintCommit } = require('./linter');
const { suggestFix } = require('./suggest');

function lintMessage(message) {
  const result = lintCommit(message);
  
  if (result.valid) {
    console.log('✅ Commit message looks good!');
    return;
  }
  
  console.error('❌ Commit message issues:');
  result.errors.forEach(error => console.error(`  • ${error}`));
  
  const suggestions = suggestFix(message);
  if (suggestions.length > 0) {
    console.log('\n💡 Suggested fix:');
    console.log(`  ${suggestions[0]}`);
  }
  
  process.exit(1);
}

module.exports = { lintMessage };