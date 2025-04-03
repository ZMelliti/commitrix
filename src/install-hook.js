const fs = require('fs');
const path = require('path');

function installHook() {
  const hookPath = '.git/hooks/commit-msg';
  
  if (!fs.existsSync('.git')) {
    console.error('❌ Not a git repository');
    process.exit(1);
  }
  
  const hookContent = `#!/bin/sh
npx commitrix "$(cat $1)"
`;
  
  fs.writeFileSync(hookPath, hookContent);
  
  // Make executable on Unix systems
  try {
    fs.chmodSync(hookPath, '755');
  } catch (e) {
    // Windows doesn't need chmod
  }
  
  console.log('✅ Git hook installed successfully');
}

module.exports = { installHook };