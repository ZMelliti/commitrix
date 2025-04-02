const SEMANTIC_PATTERN = /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}/;

function lintCommit(message) {
  const errors = [];
  
  if (!SEMANTIC_PATTERN.test(message)) {
    errors.push('Must follow format: type(scope): description');
  }
  
  if (message.length > 72) {
    errors.push('Message too long (max 72 characters)');
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