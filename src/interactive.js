const inquirer = require('inquirer');
const { loadConfig } = require('./config');

async function buildCommit() {
  const config = loadConfig();
  
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select commit type:',
      choices: config.types.map(type => ({ name: type, value: type }))
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Scope (optional):',
      validate: input => !input || input.length < 20
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      validate: input => {
        if (!input) return 'Description required';
        if (input.length < 3) return 'Too short';
        if (input.length > 50) return 'Too long';
        return true;
      }
    }
  ]);
  
  const scope = answers.scope ? `(${answers.scope})` : '';
  return `${answers.type}${scope}: ${answers.description}`;
}

module.exports = { buildCommit };