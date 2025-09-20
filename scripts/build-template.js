const fs = require('fs');
const ejs = require('ejs');
const sandboxedJs = fs.readFileSync('libs/sandboxed-js.js', 'utf8');
const data = {
    sandboxedJs: sandboxedJs
};
const options = {
    filename: 'template.tpl.ejs'
};

ejs.renderFile('template.tpl.ejs', data, options, function(err, str){
    // str => Rendered HTML string
    fs.writeFileSync('template.tpl', str);
});
