const { execSync } = require('child_process');

function searchCommits(query, options = {}) {
  try {
    const { type, author, count = 50, since } = options;
    
    let gitCmd = `git log --oneline -n ${count}`;
    if (since) gitCmd += ` --since="${since}"`;
    if (author) gitCmd += ` --author="${author}"`;
    
    const output = execSync(gitCmd, { encoding: 'utf8' });
    const commits = output.trim().split('\n').filter(line => line);
    
    const results = commits
      .map(line => {
        const [hash, ...messageParts] = line.split(' ');
        const message = messageParts.join(' ');
        const typeMatch = message.match(/^(\w+)(\(.+\))?:/);
        const commitType = typeMatch ? typeMatch[1] : null;
        
        return { hash, message, type: commitType };
      })
      .filter(commit => {
        if (type && commit.type !== type) return false;
        if (query && !commit.message.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      });

    console.log(`🔍 Found ${results.length} matching commits:\n`);
    
    if (results.length === 0) {
      console.log('No commits found matching your criteria.');
      return;
    }

    results.forEach(({ hash, message, type }) => {
      const typeLabel = type ? `[${type}]` : '[?]';
      console.log(`${hash} ${typeLabel} ${message}`);
    });

    console.log(`\n📊 Search completed: ${results.length} results`);
    
  } catch (error) {
    console.error('❌ Error searching commits:', error.message);
  }
}

module.exports = { searchCommits };