const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  types: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
  maxLength: 72,
  minLength: 10
};

function loadConfig() {
  const configPath = path.join(process.cwd(), '.commitrix.json');
  
  if (fs.existsSync(configPath)) {
    try {
      const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return { ...DEFAULT_CONFIG, ...userConfig };
    } catch (e) {
      console.warn('⚠️  Invalid config file, using defaults');
    }
  }
  
  return DEFAULT_CONFIG;
}

module.exports = { loadConfig };