const { execSync } = require('child_process');
const { lintCommit } = require('./linter');

function validateRepo(count = 10) {
  try {
    const commits = execSync(`git log --oneline -n ${count}`, { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.substring(8));
    
    const results = commits.map(commit => ({
      message: commit,
      result: lintCommit(commit)
    }));
    
    const invalid = results.filter(r => !r.result.valid && !r.result.skipped);
    
    console.log(`📋 Validated ${results.length} commits:`);
    console.log(`✅ Valid: ${results.length - invalid.length}`);
    console.log(`❌ Invalid: ${invalid.length}`);
    
    if (invalid.length > 0) {
      console.log('\n❌ Invalid commits:');
      invalid.forEach(({ message, result }) => {
        console.log(`  "${message}"`);
        result.errors.forEach(error => console.log(`    • ${error}`));
      });
      process.exit(1);
    }
    
    console.log('\n🎉 All commits follow conventions!');
  } catch (e) {
    console.error('❌ Error reading git history');
    process.exit(1);
  }
}

module.exports = { validateRepo };