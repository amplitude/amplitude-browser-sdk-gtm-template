# Amplitude Analytics Browser SDK Template

Repository for the Amplitude Analytics Browser SDK google tag manager template. This is where the template is published to the GTM Gallery

## Getting Started

To build the template run install and build

```
yarn install
yarn build
```

## Local Dev Testing

To locally, run the dev server and visit the home page. The Amplitude SDK will be on that page and you can test it manually from Chrome devtools.

```
yarn dev
```

"libs/sandboxed-js.js" is the code that will be used in the template.

Local dev testing is good for testing sandboxed js locally, but the "template.tpl" should always be tested via "Live Preview Testing" before being published.

## Live preview testing

To test the "template.tpl"

* log into tagmanager.google.com
* open your container (make a new personal container if you don't have one already)
* navigate to "Templates"
* create a new template (or edit existing one)
* open the options (three dots) and select "Import"
* import ./template.tpl
* save the template
* navigate to "Tags"
* click "New" to create a new tag (or use pre-existing one that uses the above template)
* click "Preview"
* open a test page and test your changes

## Making changes to "fields" or "info"

If you wish to make changes to the fields (`___TEMPLATE_PARAMETERS___` in template.tpl) or info (`___INFO___` in template.tpl) it's better to make those changes in the tagmanager dashboard then it is to make those changes in "libs/template-parameters.json" or "libs/template-info.json"

Instructions
* make sure you don't have any uncommitted changes in "libs/"
* run `yarn build` to make sure "template.tpl" is the latest
* log into tagmanager.google.com
* open your container (make a new personal container if you don't have one already)
* navigate to "Templates"
* create a new template (or edit existing one)
* open the options (three dots) and select "Import"
* import ./template.tpl
* make any desired changes to "Info" or "Fields"
* open the options (three dots) and select "Export"
* download the contents of the ".tpl" file to your local machine
* take the contents of this exported ".tpl" file and add them to "template.tpl"
* run `yarn sync`, this will take your changes in "template.tpl" and add them to "libs/"
* run `yarn build` again
* test your new changes locally (`yarn test`, `yarn dev`)