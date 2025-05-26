const { lintCommit } = require('./linter');
const { suggestFix } = require('./suggest');

function autoFix(message) {
  const result = lintCommit(message);
  
  if (result.valid) {
    console.log('✅ Message is already valid:');
    console.log(`  ${message}`);
    return;
  }
  
  const suggestions = suggestFix(message);
  
  if (suggestions.length === 0) {
    console.log('❌ Cannot auto-fix this message');
    console.log('💡 Try using: commitrix build');
    return;
  }
  
  const fixed = suggestions[0];
  const fixedResult = lintCommit(fixed);
  
  console.log('🔧 Auto-fixed commit message:');
  console.log(`  Original: ${message}`);
  console.log(`  Fixed:    ${fixed}`);
  
  if (fixedResult.valid) {
    console.log('✅ Fixed message is valid!');
  } else {
    console.log('⚠️  Fixed message still has issues - use commitrix build');
  }
}

module.exports = { autoFix };