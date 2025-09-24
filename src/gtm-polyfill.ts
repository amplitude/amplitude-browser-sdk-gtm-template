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
  if (module === 'Object') {
    return Object;
  }
  if (module === 'copyFromWindow') {
    return copyFromWindow;
  }
  if (module === 'getType') {
    return getType;
  }
  if (module === 'injectScript') {
    return injectScript;
  }
  if (module === 'logToConsole') {
    return logToConsole;
  }
  if (module === 'makeNumber') {
    return makeNumber;
  }
  if (module === 'makeString') {
    return makeString;
  }
  if (module === 'makeTableMap') {
    return makeTableMap;
  }
  if (module === 'JSON') {
    return JSONWrapper;
  }
}

const win = typeof globalThis !== 'undefined' ? globalThis : window;
(win as unknown as any).require = require;