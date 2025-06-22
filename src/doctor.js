const fs = require('fs');
const { execSync } = require('child_process');

function runDoctor() {
  console.log('🩺 Running Commitrix Health Check...\n');
  
  let issues = 0;
  
  // Check git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    console.log('✅ Git repository detected');
  } catch {
    console.log('❌ Not a git repository');
    issues++;
  }
  
  // Check config file
  if (fs.existsSync('.commitrix.json')) {
    console.log('✅ Configuration file found');
  } else {
    console.log('⚠️  No .commitrix.json found (using defaults)');
  }
  
  // Check git hooks
  if (fs.existsSync('.git/hooks/commit-msg')) {
    console.log('✅ Git hook installed');
  } else {
    console.log('❌ Git hook not installed');
    issues++;
  }
  
  // Check package.json
  if (fs.existsSync('package.json')) {
    console.log('✅ Package.json found');
  } else {
    console.log('⚠️  No package.json found');
  }
  
  console.log(`\n${issues === 0 ? '🎉' : '⚠️'} Health check complete: ${issues} issue(s) found`);
  
  if (issues > 0) {
    console.log('\n💡 Run `commitrix init` to fix setup issues');
  }
}

module.exports = { runDoctor };