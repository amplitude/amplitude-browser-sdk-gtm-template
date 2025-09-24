const fs = require('fs');
const ejs = require('ejs');
const sandboxedJs = fs.readFileSync('libs/sandboxed-js.js', 'utf8');
const templateParametersJson = fs.readFileSync('libs/template-parameters.json', 'utf8');
const infoJson = fs.readFileSync('libs/template-info.json', 'utf8');

// assert that the variable sandboxedJs is in the template
const template = fs.readFileSync('template.tpl.ejs', 'utf8');
if (!template.includes('<%- sandboxedJs %>')) {
    throw new Error('sandboxedJs is not in the template');
}
if (!template.includes('<%- templateParametersJson %>')) {
    throw new Error('templateParametersJson is not in the template');
}
if (!template.includes('<%- infoJson %>')) {
    throw new Error('infoJson is not in the template');
}

const data = {
    sandboxedJs: sandboxedJs,
    templateParametersJson: templateParametersJson,
    infoJson: infoJson,
};
const options = {
    filename: 'template.tpl.ejs',
};

ejs.renderFile('template.tpl.ejs', data, options, function(err, str){
    if (err) {
        console.error('Error building template:', err);
        process.exit(1);
    }
    // str => Rendered HTML string
    fs.writeFileSync('template.tpl', str);
    console.log('Template built successfully');
});
