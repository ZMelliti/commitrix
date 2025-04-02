const { lintCommit } = require('../src/linter');

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// Tests
test('accepts valid semantic commits', () => {
  const result = lintCommit('feat: add user login');
  assert(result.valid, 'Should accept valid commit');
});

test('rejects invalid commits', () => {
  const result = lintCommit('fix bug');
  assert(!result.valid, 'Should reject invalid commit');
});

test('rejects long commits', () => {
  const result = lintCommit('feat: this is a very long commit message that exceeds the maximum length');
  assert(!result.valid, 'Should reject long commit');
});

console.log('Tests completed');