const { loadConfig } = require('./config');

function lintCommit(message) {
  const config = loadConfig();
  const errors = [];
  
  // Skip validation for merge commits and automated commits
  if (message.startsWith('Merge ') || 
      message.startsWith('Revert ') ||
      /^Merge [a-f0-9]{7,40} into [a-f0-9]{7,40}/.test(message)) {
    return {
      valid: true,
      errors: [],
      skipped: 'automated commit'
    };
  }
  
  const typePattern = new RegExp(`^(${config.types.join('|')})(!?)?(\\(.+\\))?: .+`);
  
  if (!typePattern.test(message)) {
    errors.push(`Must start with: ${config.types.join(', ')}`);
  }
  
  if (message.length > config.maxLength) {
    errors.push(`Message too long (max ${config.maxLength} characters)`);
  }
  
  if (message.length < config.minLength) {
    errors.push(`Message too short (min ${config.minLength} characters)`);
  }
  
  if (message.trim().length === 0) {
    errors.push('Message cannot be empty');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { lintCommit };