const fs = require('fs');
const path = require('path');

function installHook() {
  const gitDir = path.join(process.cwd(), '.git');
  const hooksDir = path.join(gitDir, 'hooks');
  const hookPath = path.join(hooksDir, 'commit-msg');

  if (!fs.existsSync(gitDir)) {
    console.error('❌ Not a git repository');
    process.exit(1);
  }

  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  const invocation = 'npx commitrix "$(cat $1)"';
  const header = '#!/bin/sh\n';

  if (fs.existsSync(hookPath)) {
    const existing = fs.readFileSync(hookPath, 'utf8');
    if (existing.includes('commitrix')) {
      console.log('✅ Git hook already configured for Commitrix');
      return;
    }

    // Prepend our invocation so existing hook still runs
    const newContent = header + invocation + '\n' + existing;
    fs.writeFileSync(hookPath, newContent, 'utf8');
  } else {
    const hookContent = header + invocation + '\n';
    fs.writeFileSync(hookPath, hookContent, 'utf8');
  }

  // Make executable on Unix systems (ignore errors on Windows)
  try {
    fs.chmodSync(hookPath, 0o755);
  } catch (e) {
    // ignore
  }

  console.log('✅ Git hook installed successfully');
}

module.exports = { installHook };