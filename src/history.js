const { execSync } = require('child_process');
const { lintCommit } = require('./linter');

function analyzeHistory(count = 20) {
  try {
    const commits = execSync(`git log --oneline -n ${count}`, { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.substring(8));
    
    const analysis = {
      total: commits.length,
      valid: 0,
      invalid: 0,
      types: {},
      issues: []
    };
    
    commits.forEach((commit, index) => {
      const result = lintCommit(commit);
      if (result.valid) {
        analysis.valid++;
        if (!result.skipped) {
          const match = commit.match(/^(\w+)/);
          if (match) {
            const type = match[1];
            analysis.types[type] = (analysis.types[type] || 0) + 1;
          }
        }
      } else if (!result.skipped) {
        analysis.invalid++;
        analysis.issues.push({
          index: index + 1,
          message: commit,
          errors: result.errors
        });
      }
    });
    
    console.log(`📊 History Analysis (${count} commits):`);
    console.log(`✅ Valid: ${analysis.valid}/${analysis.total} (${Math.round(analysis.valid/analysis.total*100)}%)`);
    
    if (Object.keys(analysis.types).length > 0) {
      console.log('\n📈 Commit types:');
      Object.entries(analysis.types)
        .sort(([,a], [,b]) => b - a)
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });
    }
    
    if (analysis.issues.length > 0) {
      console.log(`\n❌ Invalid commits (${analysis.issues.length}):`);
      analysis.issues.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.index}. "${issue.message}"`);
        issue.errors.forEach(error => console.log(`     • ${error}`));
      });
      
      if (analysis.issues.length > 5) {
        console.log(`  ... and ${analysis.issues.length - 5} more`);
      }
    }
    
  } catch (e) {
    console.error('❌ Error reading git history');
  }
}

module.exports = { analyzeHistory };