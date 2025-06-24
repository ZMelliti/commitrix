const fs = require('fs');
const { execSync } = require('child_process');
const { lintCommit } = require('./linter');

function generateReport(format = 'console') {
  console.log('📋 Generating Commitrix Report...\n');
  
  try {
    const commits = execSync('git log --format="%s|%an|%ad" --date=short -50', { encoding: 'utf8' })
      .trim().split('\n').filter(Boolean);
    
    const data = {
      timestamp: new Date().toISOString(),
      totalCommits: commits.length,
      valid: 0,
      invalid: 0,
      authors: {},
      types: {},
      issues: []
    };
    
    commits.forEach(line => {
      const [message, author, date] = line.split('|');
      const result = lintCommit(message);
      
      if (result.valid) {
        data.valid++;
        const type = message.split(':')[0];
        data.types[type] = (data.types[type] || 0) + 1;
      } else {
        data.invalid++;
        data.issues.push({ message, author, date, errors: result.errors });
      }
      
      data.authors[author] = (data.authors[author] || 0) + 1;
    });
    
    if (format === 'json') {
      if (!fs.existsSync('reports')) {
        fs.mkdirSync('reports');
      }
      const filename = `reports/commitrix-report-${Date.now()}.json`;
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      console.log(`📄 Report saved to ${filename}`);
    } else {
      console.log('📊 Commit Quality Report');
      console.log(`📅 Generated: ${data.timestamp}`);
      console.log(`📈 Quality Score: ${Math.round((data.valid / data.totalCommits) * 100)}%`);
      console.log(`✅ Valid: ${data.valid} | ❌ Invalid: ${data.invalid}`);
      console.log(`👥 Authors: ${Object.keys(data.authors).length}`);
      console.log(`🏷️  Top Types: ${Object.entries(data.types).slice(0, 3).map(([k,v]) => `${k}(${v})`).join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ Error generating report:', error.message);
  }
}

module.exports = { generateReport };