const fs = require('fs');
const { loadConfig } = require('./config');

function showConfig() {
  const config = loadConfig();
  console.log('📋 Current configuration:');
  console.log(JSON.stringify(config, null, 2));
  
  const configPath = '.commitrix.json';
  if (fs.existsSync(configPath)) {
    console.log(`\n📁 Config file: ${configPath}`);
  } else {
    console.log('\n📁 Using default configuration (no .commitrix.json found)');
  }
}

function setConfig(key, value) {
  const configPath = '.commitrix.json';
  let config = {};
  
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  
  // Parse value
  let parsedValue = value;
  if (value === 'true') parsedValue = true;
  else if (value === 'false') parsedValue = false;
  else if (!isNaN(value)) parsedValue = parseInt(value);
  else if (value.includes(',')) parsedValue = value.split(',').map(s => s.trim());
  
  config[key] = parsedValue;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Set ${key} = ${JSON.stringify(parsedValue)}`);
}

module.exports = { showConfig, setConfig };