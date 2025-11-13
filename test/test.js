const { lintCommit } = require('../src/linter');

describe('lintCommit', () => {
  test('accepts valid semantic commits', () => {
    const result = lintCommit('feat: add user login');
    expect(result.valid).toBe(true);
  });

  test('rejects invalid commits', () => {
    const result = lintCommit('fix bug');
    expect(result.valid).toBe(false);
  });

  test('rejects long commits', () => {
    const longMessage = 'feat: ' + 'x'.repeat(70);
    const result = lintCommit(longMessage);
    expect(result.valid).toBe(false);
  });

  test('rejects short commits', () => {
    const result = lintCommit('fix: x');
    expect(result.valid).toBe(false);
  });

  test('accepts all valid types', () => {
    const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'build', 'ci'];
    types.forEach(type => {
      const result = lintCommit(`${type}: valid message`);
      expect(result.valid).toBe(true);
    });
  });

  test('rejects invalid types', () => {
    const result = lintCommit('invalid: message');
    expect(result.valid).toBe(false);
  });

  test('handles empty messages', () => {
    const result = lintCommit('');
    expect(result.valid).toBe(false);
  });

  test('handles whitespace-only messages', () => {
    const result = lintCommit('   ');
    expect(result.valid).toBe(false);
  });

  test('accepts messages with scopes', () => {
    const result = lintCommit('feat(auth): add login functionality');
    expect(result.valid).toBe(true);
  });

  test('rejects messages without colon', () => {
    const result = lintCommit('feat add something');
    expect(result.valid).toBe(false);
  });

  test('accepts breaking change format', () => {
    const result = lintCommit('feat!: breaking change');
    expect(result.valid).toBe(true);
  });

  test('handles unicode characters', () => {
    const result = lintCommit('feat: add émojis support 🎉');
    expect(result.valid).toBe(true);
  });
});
