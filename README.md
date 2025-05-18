# Commitrix 🎯

A powerful Git commit quality linter that enforces semantic commit conventions with intelligent suggestions and team collaboration features.

[![npm version](https://badge.fury.io/js/commitrix.svg)](https://www.npmjs.com/package/commitrix)
[![CI](https://github.com/zmelliti/commitrix/workflows/CI/badge.svg)](https://github.com/zmelliti/commitrix/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔍 **Semantic Commit Validation** - Enforces conventional commit format
- 🪝 **Git Hook Integration** - Automatic validation on commit
- 🎨 **Interactive Builder** - Guided commit message creation
- 💡 **Smart Suggestions** - Intelligent commit message fixes
- 📊 **Team Analytics** - Repository commit statistics
- ⚙️ **Configurable Rules** - Customize for your team
- 🚀 **CI/CD Ready** - Validate commits in pipelines

## 🚀 Quick Start

```bash
# Install globally
npm install -g commitrix

# Initialize in your project
commitrix init

# Install git hooks (auto-runs on npm install)
commitrix install
```

## 🎥 Demo

```bash
# ❌ Invalid commit gets rejected
$ git commit -m "fix bug"
❌ Commit message issues:
  • Must start with: feat, fix, docs, style, refactor, test, chore

💡 Suggested fix:
  fix: bug

# ✅ Valid commit passes
$ git commit -m "fix: resolve authentication timeout"
✅ Commit message looks good!
```

## 📖 Usage

```bash
# Lint a commit message
commitrix "feat: add user authentication"

# Interactive commit builder
commitrix build

# Get suggestions for invalid commits
commitrix suggest "fix bug"

# View repository statistics
commitrix stats

# Validate recent commits (CI/CD)
commitrix validate --count 10
```

## ⚙️ Configuration

Create `.commitrix.json` in your project root:

```json
{
  "types": ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
  "maxLength": 72,
  "minLength": 10,
  "scopes": ["api", "ui", "docs"],
  "enforceScope": false
}
```

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `commitrix <message>` | Lint commit message |
| `commitrix build` | Interactive commit builder |
| `commitrix install` | Install git hooks |
| `commitrix init` | Initialize project |
| `commitrix stats` | Show commit statistics |
| `commitrix suggest <message>` | Get suggestions |
| `commitrix validate` | Validate recent commits |
| `commitrix check` | Check project setup |
| `commitrix config [key] [value]` | Show/set configuration |
| `commitrix template --type <type>` | Generate commit template |
| `commitrix history --count <n>` | Analyze commit history |
| `commitrix help` | Show help information |
| `commitrix lint <message>` | Lint specific message |
| `commitrix fix <message>` | Auto-fix commit message |
| `commitrix reset` | Reset config to defaults |

## 🏗️ CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Validate Commits
  run: npx commitrix validate --count 10
```

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/zmelliti/commitrix.git
cd commitrix

# Install dependencies
npm install

# Run tests
npm test

# Test locally
node src/index.js "feat: test message"
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

MIT © [zmelliti](https://github.com/zmelliti)