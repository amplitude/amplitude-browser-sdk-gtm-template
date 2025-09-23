const fs = require('fs');
const ejs = require('ejs');
const sandboxedJs = fs.readFileSync('libs/sandboxed-js.js', 'utf8');

// assert that the variable sandboxedJs is in the template
const template = fs.readFileSync('template.tpl.ejs', 'utf8');
if (!template.includes('<%- sandboxedJs %>')) {
    throw new Error('sandboxedJs is not in the template');
}

const data = {
    sandboxedJs: sandboxedJs
};
const options = {
    filename: 'template.tpl.ejs',
};

ejs.renderFile('template.tpl.ejs', data, options, function(err, str){
    // str => Rendered HTML string
    fs.writeFileSync('template.tpl', str);
});
