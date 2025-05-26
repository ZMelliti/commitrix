const { loadConfig } = require('./config');

function generateTemplate(type, scope) {
  const config = loadConfig();
  
  if (type && !config.types.includes(type)) {
    console.error(`❌ Invalid type. Available: ${config.types.join(', ')}`);
    process.exit(1);
  }
  
  const selectedType = type || '<type>';
  const selectedScope = scope ? `(${scope})` : '(scope)';
  const template = `${selectedType}${selectedScope}: <description>`;
  
  console.log('📝 Commit template:');
  console.log(template);
  
  if (!type) {
    console.log(`\n💡 Available types: ${config.types.join(', ')}`);
  }
}

module.exports = { generateTemplate };