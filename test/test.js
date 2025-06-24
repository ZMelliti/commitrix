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
  const longMessage = 'feat: ' + 'x'.repeat(70);
  const result = lintCommit(longMessage);
  assert(!result.valid, 'Should reject long commit');
});

test('rejects short commits', () => {
  const result = lintCommit('fix: x');
  assert(!result.valid, 'Should reject short commit');
});

test('accepts all valid types', () => {
  const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'build', 'ci'];
  types.forEach(type => {
    const result = lintCommit(`${type}: valid message`);
    assert(result.valid, `Should accept ${type} commits`);
  });
});

test('rejects invalid types', () => {
  const result = lintCommit('invalid: message');
  assert(!result.valid, 'Should reject invalid type');
});

test('handles empty messages', () => {
  const result = lintCommit('');
  assert(!result.valid, 'Should reject empty message');
});

test('handles whitespace-only messages', () => {
  const result = lintCommit('   ');
  assert(!result.valid, 'Should reject whitespace-only message');
});

test('accepts messages with scopes', () => {
  const result = lintCommit('feat(auth): add login functionality');
  assert(result.valid, 'Should accept messages with scopes');
});

test('rejects messages without colon', () => {
  const result = lintCommit('feat add something');
  assert(!result.valid, 'Should reject messages without colon');
});

test('accepts breaking change format', () => {
  const result = lintCommit('feat!: breaking change');
  assert(result.valid, 'Should accept breaking change format');
});

test('handles unicode characters', () => {
  const result = lintCommit('feat: add émojis support 🎉');
  assert(result.valid, 'Should handle unicode characters');
});

console.log('Tests completed');