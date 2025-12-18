#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const envExamplePath = path.join(rootDir, '.env.example');

function setupEnv() {
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log('✓ .env file already exists');
    return;
  }

  // Check if .env.example exists
  if (!fs.existsSync(envExamplePath)) {
    console.log('⚠️  No .env.example file found. Please create one first.');
    return;
  }

  try {
    // Read .env.example content
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
    
    // Replace $API_KEY with placeholder text
    const envContent = envExampleContent.replace(/\$API_KEY/g, '<Your Amplitude API Key>');
    
    // Write the modified content to .env
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('✓ Successfully copied .env.example to .env and replaced $API_KEY with placeholder');
  } catch (error) {
    console.error('❌ Error setting up .env file:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  setupEnv();
}

module.exports = setupEnv;
