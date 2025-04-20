# Commitrix 🎯

A lightweight Git commit quality linter that enforces semantic commit conventions and provides intelligent suggestions.

[![npm version](https://badge.fury.io/js/commitrix.svg)](https://www.npmjs.com/package/commitrix)
[![CI](https://github.com/yourusername/commitrix/workflows/CI/badge.svg)](https://github.com/yourusername/commitrix/actions)

## ✨ Features

- 🔍 **Semantic Commit Validation** - Enforces conventional commit format
- 🪝 **Git Hook Integration** - Automatic validation on commit
- 🎨 **Interactive Builder** - Guided commit message creation
- 💡 **Smart Suggestions** - AI-powered commit message fixes
- 📊 **Team Analytics** - Repository commit statistics
- ⚙️ **Configurable Rules** - Customize for your team
- 🚀 **CI/CD Ready** - Validate commits in pipelines

## 🚀 Quick Start

```bash
# Install globally
npm install -g commitrix

# Initialize in your project
commitrix init

# Install git hooks
commitrix install
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

## 🏗️ CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Validate Commits
  run: npx commitrix validate --count 10
```

## 📝 License

MIT © [Your Name]