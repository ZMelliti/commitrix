const { execSync } = require('child_process');
const { lintCommit } = require('./linter');

function scanRepository(count = 100) {
  console.log(`🔍 Scanning last ${count} commits...\n`);
  
  try {
    const commits = execSync(`git log --format="%s" -${count}`, { encoding: 'utf8' })
      .trim().split('\n').filter(Boolean);
    
    let valid = 0;
    let invalid = 0;
    const issues = [];
    
    commits.forEach((message, index) => {
      const result = lintCommit(message);
      if (result.valid) {
        valid++;
      } else {
        invalid++;
        issues.push({
          index: index + 1,
          message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
          errors: result.errors
        });
      }
    });
    
    console.log(`📊 Scan Results:`);
    console.log(`✅ Valid commits: ${valid}`);
    console.log(`❌ Invalid commits: ${invalid}`);
    console.log(`📈 Quality score: ${Math.round((valid / commits.length) * 100)}%\n`);
    
    if (issues.length > 0) {
      console.log('❌ Issues found:');
      issues.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.index}. ${issue.message}`);
        issue.errors.forEach(error => console.log(`     • ${error}`));
      });
      
      if (issues.length > 5) {
        console.log(`  ... and ${issues.length - 5} more issues`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error scanning repository:', error.message);
  }
}

module.exports = { scanRepository };