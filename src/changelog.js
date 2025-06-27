const fs = require('fs');
const { execSync } = require('child_process');

function generateChangelog(fromTag = null, toTag = 'HEAD') {
  try {
    const range = fromTag ? `${fromTag}..${toTag}` : toTag;
    const commits = execSync(`git log --format="%s (%h)" ${range}`, { encoding: 'utf8' })
      .trim().split('\n').filter(Boolean);
    
    const changelog = {
      features: [],
      fixes: [],
      docs: [],
      chores: [],
      other: []
    };
    
    commits.forEach(commit => {
      if (commit.startsWith('feat')) changelog.features.push(commit);
      else if (commit.startsWith('fix')) changelog.fixes.push(commit);
      else if (commit.startsWith('docs')) changelog.docs.push(commit);
      else if (commit.startsWith('chore') || commit.startsWith('ci')) changelog.chores.push(commit);
      else changelog.other.push(commit);
    });
    
    let output = `# Changelog\n\n`;
    
    if (changelog.features.length) {
      output += `## ✨ Features\n${changelog.features.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    if (changelog.fixes.length) {
      output += `## 🐛 Bug Fixes\n${changelog.fixes.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    if (changelog.docs.length) {
      output += `## 📚 Documentation\n${changelog.docs.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    if (changelog.chores.length) {
      output += `## 🔧 Maintenance\n${changelog.chores.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    if (changelog.other.length) {
      output += `## 📦 Other\n${changelog.other.map(c => `- ${c}`).join('\n')}\n\n`;
    }
    
    return output;
    
  } catch (error) {
    console.error('❌ Error generating changelog:', error.message);
    return null;
  }
}

function createRelease(version, changelog) {
  if (!fs.existsSync('releases')) {
    fs.mkdirSync('releases');
  }
  
  const filename = `releases/RELEASE-${version}.md`;
  fs.writeFileSync(filename, changelog);
  console.log(`📄 Release notes saved to ${filename}`);
  
  return filename;
}

module.exports = { generateChangelog, createRelease };