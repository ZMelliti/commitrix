const fs = require('fs');

const DEFAULT_CONFIG = {
  "types": ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
  "maxLength": 72,
  "minLength": 10,
  "scopes": [],
  "enforceScope": false
};

function resetConfig() {
  const configPath = '.commitrix.json';
  
  if (!fs.existsSync(configPath)) {
    console.log('⚠️  No config file found, creating default...');
  } else {
    console.log('🔄 Resetting configuration to defaults...');
  }
  
  fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2));
  console.log('✅ Configuration reset to defaults');
  
  console.log('\n📋 Default configuration:');
  console.log(JSON.stringify(DEFAULT_CONFIG, null, 2));
}

module.exports = { resetConfig };