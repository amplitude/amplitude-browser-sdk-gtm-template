# Amplitude Analytics Browser SDK Template

Repository for the Amplitude Analytics Browser SDK google tag manager template. This is where the template is published to the GTM Gallery

## Getting Started

To build the template run install and build

```
yarn install
yarn build
```

## Local Testing

To test it locally, run the dev server. "libs/sandboxed-js.js" is the code that will be used in the template.

```
yarn dev
```

## Live preview testing

To test it in GTM
* log into tagmanager.google.com
* navigate to "Templates"
* create a new template
* open the options (three dots) and select "Import"
* import ./template.tpl
* start preview

## Making changes to "fields" or "info"

If you wish to make changes to fields (`___TEMPLATE_PARAMETERS___` in template.tpl) or info (`___INFO___` in template.tpl) the changes need to be made in the tagmanager dashboard (`Fields` tab and `Info` tab), exported as a template, and then the contents of those need to be pasted into `template.tpl.ejs`.