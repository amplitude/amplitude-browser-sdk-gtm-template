#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the template parameters JSON file
function readTemplateParameters() {
  const filePath = path.join(__dirname, '../libs/template-parameters.json');
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

// Map GTM parameter types to TypeScript types
function mapParameterType(param) {
  switch (param.type) {
    case 'CHECKBOX':
      return 'boolean';
    
    case 'TEXT':
      return 'string';
    
    case 'SELECT':
      if (param.selectItems && param.selectItems.length > 0) {
        const values = param.selectItems
          .map(item => `'${item.value}'`)
          .join(' | ');
        return values;
      }
      return 'Record<string, string>';
    
    case 'SIMPLE_TABLE':
      if (param.simpleTableColumns) {
        const columnTypes = param.simpleTableColumns
          .map(col => `${col.name}: ${mapParameterType(col)}`)
          .join('; ');
        return `Array<{${columnTypes}}>`;
      }
      return 'Array<{[key: string]: any}>';
    
    case 'PARAM_TABLE':
      if (param.paramTableColumns) {
        const columnTypes = param.paramTableColumns
          .map(col => `${col.param.name}?: ${mapParameterType(col.param)}`)
          .join('; ');
        return `Array<{${columnTypes}}>`;
      }
      return 'Array<{[key: string]: any}>';
    
    case 'GROUP':
      // GROUP types should not generate their own fields, only their subParams
      return null;
    
    case 'LABEL':
      // Labels are not data fields, skip them
      return null;
    
    default:
      return 'any';
  }
}

// Check if parameter should be optional
function isOptional(param) {
  // Parameters are optional unless they have NON_EMPTY validator or are explicitly required
  if (param.valueValidators) {
    return !param.valueValidators.some(validator => validator.type === 'NON_EMPTY');
  }
  return true;
}

// Recursively process parameters and their subParams
function processParameterRecursively(param, interfaceLines, processedNames = new Set(), parentType = null) {
  // Skip LABEL types as they're not data fields
  if (param.type === 'LABEL') {
    return;
  }
  
  // Skip GROUP types entirely - flatten their subParams to top-level parameters
  if (param.type === 'GROUP') {
    // Process the GROUP's subParams directly without adding the GROUP itself
    if (param.subParams) {
      for (const subParam of param.subParams) {
        processParameterRecursively(subParam, interfaceLines, processedNames, param.type);
      }
    }
    return;
  }
  
  const tsType = mapParameterType(param);
  if (tsType === null) {
    return;
  }
  
  // Avoid duplicate parameter names
  if (!processedNames.has(param.name)) {
    const optional = isOptional(param) ? '?' : '';
    interfaceLines.push(`  ${param.name}${optional}: ${tsType};`);
    processedNames.add(param.name);
  }
  
  // Recursively process subParams
  if (param.subParams) {
    for (const subParam of param.subParams) {
      processParameterRecursively(subParam, interfaceLines, processedNames, param.type);
    }
  }
}

// Generate TypeScript interface
function generateTypeScriptInterface(parameters) {
  const interfaceLines = ['export interface GeneratedGtmParameters {'];
  const processedNames = new Set();
  
  // Process each parameter recursively
  for (const param of parameters) {
    processParameterRecursively(param, interfaceLines, processedNames, null);
  }
  
  interfaceLines.push('}');
  return interfaceLines.join('\n');
}

// Main function
function main() {
  try {
    console.log('Reading template parameters...');
    const parameters = readTemplateParameters();
    
    console.log(`Found ${parameters.length} parameters`);
    
    console.log('Generating TypeScript interface...');
    const tsInterface = generateTypeScriptInterface(parameters);
    
    // Write to output file
    const outputPath = path.join(__dirname, '../src/generated-types.ts');
    const header = `// This file is auto-generated from template-parameters.json
// Do not edit manually - run 'yarn build' to regenerate

`;
    
    fs.writeFileSync(outputPath, header + tsInterface);
    
    console.log(`TypeScript interface generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating types:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  readTemplateParameters,
  mapParameterType,
  generateTypeScriptInterface
};
