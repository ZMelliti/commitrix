const { execSync } = require('child_process');

function getCommitStats() {
  try {
    const commits = execSync('git log --oneline -n 20', { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.substring(8)); // Remove hash
    
    const typeCount = {};
    const validCount = { valid: 0, invalid: 0 };
    
    commits.forEach(commit => {
      const match = commit.match(/^(\w+)(\([^)]+\))?:/);
      if (match) {
        const type = match[1];
        typeCount[type] = (typeCount[type] || 0) + 1;
        validCount.valid++;
      } else {
        validCount.invalid++;
      }
    });
    
    return { typeCount, validCount, total: commits.length };
  } catch (e) {
    return null;
  }
}

function displayStats() {
  const stats = getCommitStats();
  if (!stats) {
    console.log('❌ Not a git repository or no commits found');
    return;
  }
  
  console.log('📊 Commit Statistics (last 20 commits):');
  console.log(`Valid: ${stats.validCount.valid}/${stats.total}`);
  
  if (Object.keys(stats.typeCount).length > 0) {
    console.log('\\nCommit types:');
    Object.entries(stats.typeCount)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
      });
  }
}

module.exports = { displayStats };