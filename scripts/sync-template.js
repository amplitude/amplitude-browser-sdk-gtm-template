const fs = require('fs');
const { execSync } = require('child_process');

// Check for uncommitted changes in libs/ directory
const checkUncommittedChanges = () => {
    // Check if we're in a git repository
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    
    // Get git status for libs/ directory only
    const gitStatus = execSync('git status --porcelain libs/', { encoding: 'utf8' }).trim();
    
    if (gitStatus) {
        console.error('❌ Error: Cannot sync template.tpl while there are uncommitted changes in libs/ directory:');
        console.error(gitStatus);
        console.error('\nPlease commit or stash your changes before syncing.');
        console.error('This prevents accidentally overwriting your local modifications.');
        process.exit(1);
    }
    
    console.log('✓ No uncommitted changes in libs/ directory');
};

// Helper function to remove leading and trailing empty lines
const trimEmptyLines = (content) => {
    const lines = content.split('\n');
    
    // Remove leading empty lines
    let start = 0;
    while (start < lines.length && lines[start].trim() === '') {
        start++;
    }
    
    // Remove trailing empty lines
    let end = lines.length - 1;
    while (end >= 0 && lines[end].trim() === '') {
        end--;
    }
    
    return lines.slice(start, end + 1).join('\n');
};

console.log('Extracting libs from template.tpl...');

// Check for uncommitted changes before proceeding (unless --force is used)
checkUncommittedChanges();

// First, read the existing sandboxed-js.js to preserve the exports section
let exportsSection = '';
try {
    if (fs.existsSync('libs/sandboxed-js.js')) {
        const currentSandboxedJs = fs.readFileSync('libs/sandboxed-js.js', 'utf8');
        const exportsStart = currentSandboxedJs.indexOf('// exports:start');
        const exportsEnd = currentSandboxedJs.indexOf('// exports:end');
        
        if (exportsStart !== -1 && exportsEnd !== -1) {
            exportsSection = currentSandboxedJs.substring(
                exportsStart,
                exportsEnd + '// exports:end'.length
            );
            console.log('✓ Preserved existing exports section');
        }
    }
} catch (error) {
    console.log('Note: Could not read existing sandboxed-js.js, exports section will not be preserved');
}

// Read the template.tpl file
let templateContent;
try {
    templateContent = fs.readFileSync('template.tpl', 'utf8');
} catch (error) {
    console.error('Error reading template.tpl:', error.message);
    process.exit(1);
}

// Extract the INFO section
const infoStart = templateContent.indexOf('___INFO___');
const templateParamsStart = templateContent.indexOf('___TEMPLATE_PARAMETERS___');

if (infoStart === -1 || templateParamsStart === -1) {
    console.error('Could not find required sections in template.tpl');
    process.exit(1);
}

const infoContent = trimEmptyLines(templateContent.substring(
    infoStart + '___INFO___'.length,
    templateParamsStart
));

// Extract the TEMPLATE_PARAMETERS section
const sandboxedJsStart = templateContent.indexOf('___SANDBOXED_JS_FOR_WEB_TEMPLATE___');
if (sandboxedJsStart === -1) {
    console.error('Could not find SANDBOXED_JS section in template.tpl');
    process.exit(1);
}

const templateParamsContent = trimEmptyLines(templateContent.substring(
    templateParamsStart + '___TEMPLATE_PARAMETERS___'.length,
    sandboxedJsStart
));

// Extract the SANDBOXED_JS section
const webPermissionsStart = templateContent.indexOf('___WEB_PERMISSIONS___');
if (webPermissionsStart === -1) {
    console.error('Could not find WEB_PERMISSIONS section in template.tpl');
    process.exit(1);
}

const sandboxedJsContent = trimEmptyLines(templateContent.substring(
    sandboxedJsStart + '___SANDBOXED_JS_FOR_WEB_TEMPLATE___'.length,
    webPermissionsStart
));

// Ensure libs directory exists
if (!fs.existsSync('libs')) {
    fs.mkdirSync('libs');
    console.log('Created libs directory');
}

// Write the extracted content to libs files
try {
    fs.writeFileSync('libs/template-info.json', infoContent);
    console.log('✓ Extracted template-info.json');

    fs.writeFileSync('libs/template-parameters.json', templateParamsContent);
    console.log('✓ Extracted template-parameters.json');

    // For sandboxed-js.js, we need to add back the exports section that was removed during build
    let finalSandboxedJs = sandboxedJsContent;
    
    // Add back the preserved exports section if it exists
    if (exportsSection) {
        finalSandboxedJs += '\n\n' + exportsSection;
        console.log('✓ Restored exports section to sandboxed-js.js');
    }
    
    fs.writeFileSync('libs/sandboxed-js.js', finalSandboxedJs);
    console.log('✓ Extracted sandboxed-js.js');

    console.log('Successfully extracted all libs from template.tpl');
} catch (error) {
    console.error('Error writing libs files:', error.message);
    process.exit(1);
}
