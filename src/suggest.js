const { loadConfig } = require('./config');

function suggestFix(message) {
  const config = loadConfig();
  const suggestions = [];
  
  // Extract potential type from message
  const words = message.toLowerCase().split(' ');
  const typeMap = {
    'add': 'feat', 'new': 'feat', 'create': 'feat',
    'fix': 'fix', 'bug': 'fix', 'patch': 'fix',
    'update': 'chore', 'change': 'chore', 'modify': 'chore',
    'remove': 'refactor', 'delete': 'refactor',
    'test': 'test', 'spec': 'test',
    'doc': 'docs', 'readme': 'docs'
  };
  
  let suggestedType = 'feat';
  for (const word of words) {
    if (typeMap[word]) {
      suggestedType = typeMap[word];
      break;
    }
  }
  
  // Clean description - don't remove if it's already a valid type
  let description = message;
  if (!config.types.some(type => message.toLowerCase().startsWith(type))) {
    description = message
      .replace(/^(add|new|create)\s*/i, '')
      .replace(/^(update|change|modify)\s*/i, '')
      .replace(/^(remove|delete)\s*/i, '')
      .replace(/^(bug|issue)\s*/i, '')
      .trim();
  }
  
  if (description.length > 50) {
    description = description.substring(0, 47) + '...';
  }
  
  suggestions.push(`${suggestedType}: ${description}`);
  
  return suggestions;
}

module.exports = { suggestFix };