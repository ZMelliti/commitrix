const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  types: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
  maxLength: 72,
  minLength: 10,
  scopes: [],
  enforceScope: false
};

function normalizeConfig(userConfig) {
  const cfg = { ...DEFAULT_CONFIG };
  if (!userConfig || typeof userConfig !== 'object') return cfg;

  if (Array.isArray(userConfig.types) && userConfig.types.every(t => typeof t === 'string')) {
    cfg.types = userConfig.types;
  }

  if (typeof userConfig.maxLength === 'number' && userConfig.maxLength > 0) {
    cfg.maxLength = userConfig.maxLength;
  }

  if (typeof userConfig.minLength === 'number' && userConfig.minLength >= 0) {
    cfg.minLength = userConfig.minLength;
  }

  if (Array.isArray(userConfig.scopes) && userConfig.scopes.every(s => typeof s === 'string')) {
    cfg.scopes = userConfig.scopes;
  }

  if (typeof userConfig.enforceScope === 'boolean') {
    cfg.enforceScope = userConfig.enforceScope;
  }

  return cfg;
}

function loadConfig() {
  const configPath = path.join(process.cwd(), '.commitrix.json');

  if (fs.existsSync(configPath)) {
    try {
      const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return normalizeConfig(userConfig);
    } catch (e) {
      console.warn('⚠️  Invalid config file, using defaults');
    }
  }

  return DEFAULT_CONFIG;
}

module.exports = { loadConfig };