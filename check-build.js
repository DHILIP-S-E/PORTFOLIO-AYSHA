const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build configuration...');

// Check if build directory exists
const buildDir = path.join(__dirname, 'build');
if (fs.existsSync(buildDir)) {
  console.log('✅ Build directory exists');
  
  // Check if index.html exists
  const indexPath = path.join(buildDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists in build');
  } else {
    console.log('❌ index.html missing in build');
  }
  
  // Check build size
  const stats = fs.statSync(buildDir);
  console.log(`📁 Build directory created: ${stats.birthtime}`);
} else {
  console.log('❌ Build directory does not exist - run npm run build first');
}

// Check package.json scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('📦 Build script:', packageJson.scripts.build);

// Check for common issues
console.log('\n🔧 Checking for common issues:');

// Check if all dependencies are installed
try {
  require.resolve('react');
  console.log('✅ React is installed');
} catch (e) {
  console.log('❌ React not found');
}

// Check for webpack config
if (fs.existsSync('config-overrides.js')) {
  console.log('✅ Webpack override config found');
} else {
  console.log('⚠️  No webpack override config');
}

console.log('\n🚀 Run this before deploying to Amplify:');
console.log('1. npm run build');
console.log('2. Check build/index.html exists');
console.log('3. Test locally: npx serve -s build');