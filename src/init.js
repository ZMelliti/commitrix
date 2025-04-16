const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  "types": ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
  "maxLength": 72,
  "minLength": 10,
  "scopes": [],
  "enforceScope": false
};

const PACKAGE_JSON_SCRIPT = {
  "prepare": "commitrix install"
};

function initProject() {
  // Create .commitrix.json
  const configPath = '.commitrix.json';
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.log('✅ Created .commitrix.json');
  }
  
  // Update package.json
  const pkgPath = 'package.json';
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.scripts = { ...pkg.scripts, ...PACKAGE_JSON_SCRIPT };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('✅ Added prepare script to package.json');
  }
  
  console.log('\n🎉 Project initialized! Run "npm install" to auto-install hooks.');
}

module.exports = { initProject };