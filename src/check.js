const fs = require('fs');
const { loadConfig } = require('./config');

function checkSetup() {
  const issues = [];
  
  // Check git repository
  if (!fs.existsSync('.git')) {
    issues.push('❌ Not a git repository');
  }
  
  // Check config file
  const configExists = fs.existsSync('.commitrix.json');
  if (configExists) {
    console.log('✅ Configuration file found');
  } else {
    issues.push('⚠️  No .commitrix.json found (using defaults)');
  }
  
  // Check git hook
  const hookExists = fs.existsSync('.git/hooks/commit-msg');
  if (hookExists) {
    console.log('✅ Git hook installed');
  } else {
    issues.push('❌ Git hook not installed (run: commitrix install)');
  }
  
  // Check package.json
  if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (pkg.scripts && pkg.scripts.prepare) {
      console.log('✅ Auto-install script configured');
    } else {
      issues.push('⚠️  No prepare script in package.json');
    }
  }
  
  if (issues.length === 0) {
    console.log('\n🎉 Setup looks good!');
  } else {
    console.log('\n📋 Setup issues:');
    issues.forEach(issue => console.log(`  ${issue}`));
  }
}

module.exports = { checkSetup };