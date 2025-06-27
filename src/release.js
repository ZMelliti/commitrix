const fs = require('fs');
const { execSync } = require('child_process');
const { generateChangelog, createRelease } = require('./changelog');

function createTag(version, message = null) {
  try {
    const tagMessage = message || `Release v${version}`;
    execSync(`git tag -a v${version} -m "${tagMessage}"`, { stdio: 'inherit' });
    console.log(`✅ Created tag v${version}`);
    return true;
  } catch (error) {
    console.error('❌ Error creating tag:', error.message);
    return false;
  }
}

function releaseVersion(version, push = false) {
  console.log(`🚀 Creating release v${version}...\n`);
  
  // Get last tag for changelog range
  let lastTag = null;
  try {
    lastTag = execSync('git describe --tags --abbrev=0 HEAD^', { encoding: 'utf8' }).trim();
  } catch {
    console.log('📝 No previous tags found, generating full changelog');
  }
  
  // Generate changelog
  const changelog = generateChangelog(lastTag);
  if (!changelog) return false;
  
  // Create release notes file
  const releaseFile = createRelease(version, changelog);
  
  // Update package.json version
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.version = version;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`📦 Updated package.json to v${version}`);
  
  // Commit version bump
  execSync(`git add package.json ${releaseFile}`);
  execSync(`git commit -m "chore: bump version to ${version}"`);
  
  // Create tag
  if (!createTag(version)) return false;
  
  // Push if requested
  if (push) {
    try {
      execSync('git push origin main --tags', { stdio: 'inherit' });
      console.log('✅ Pushed to remote with tags');
    } catch (error) {
      console.error('❌ Error pushing:', error.message);
    }
  }
  
  console.log(`\n🎉 Release v${version} created successfully!`);
  return true;
}

function listReleases() {
  try {
    const tags = execSync('git tag -l "v*" --sort=-version:refname', { encoding: 'utf8' })
      .trim().split('\n').filter(Boolean);
    
    console.log('📋 Available releases:');
    tags.forEach(tag => {
      try {
        const date = execSync(`git log -1 --format="%ai" ${tag}`, { encoding: 'utf8' }).trim();
        console.log(`  ${tag} (${date.split(' ')[0]})`);
      } catch {
        console.log(`  ${tag}`);
      }
    });
  } catch (error) {
    console.log('📝 No releases found');
  }
}

module.exports = { createTag, releaseVersion, listReleases };