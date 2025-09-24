import copyFromWindow from './gtm-polyfills/copy-from-window';
import getType from './gtm-polyfills/get-type';
import Object from './gtm-polyfills/Object';
import injectScript from './gtm-polyfills/inject-script';
import logToConsole from './gtm-polyfills/log-to-console';
import makeNumber from './gtm-polyfills/make-number';
import makeString from './gtm-polyfills/make-string';
import makeTableMap from './gtm-polyfills/make-table-map';
import JSONWrapper from './gtm-polyfills/JSON.ts';

  // override "require" to return the polyfills
function require(module) {
  switch (module) {
    case 'Object':
      return Object;
    case 'copyFromWindow':
      return copyFromWindow;
    case 'getType':
      return getType;
    case 'injectScript':
      return injectScript;
    case 'logToConsole':
      return logToConsole;
    case 'makeNumber':
      return makeNumber;
    case 'makeString':
      return makeString;
    case 'makeTableMap':
      return makeTableMap;
    case 'JSON':
      return JSONWrapper;
    default:
      throw new Error(`Unknown module: ${module}. Add it to src/gtm-polyfills/${module}.ts and update it in jets.config.js`);
  }
}

const win = typeof globalThis !== 'undefined' ? globalThis : window;
(win as unknown as any).require = require;