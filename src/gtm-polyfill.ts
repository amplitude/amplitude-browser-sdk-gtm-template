// --- Mock GTM Template APIs --- //

// Copies a property from window
(function () {
    function copyFromWindow(key) {
        if (typeof window !== "undefined" && key in window) {
        return window[key];
        }
        return undefined;
    }
    
    // Returns type of a variable (like GTM getType)
    function getType(value) {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        return typeof value;
    }
    
    // Injects a script tag
    function injectScript(url, onSuccess, onFailure) {
        if (typeof document !== "undefined") {
            const script = document.createElement("script");
            script.src = url;
            script.onload = () => onSuccess && onSuccess();
            script.onerror = () => onFailure && onFailure();
            document.head.appendChild(script);
        } else {
            console.warn("injectScript called outside browser:", url);
            if (onFailure) onFailure();
        }
    }
    
    // Logs to console (GTM sandboxed version just maps to this)
    function logToConsole(...args) {
        console.log("[GTM mock log]", ...args);
    }
    
    // Converts to number
    function makeNumber(value) {
        const n = Number(value);
        return isNaN(n) ? 0 : n;
    }
    
    // Converts to string
    function makeString(value) {
        return value != null ? String(value) : "";
    }
    
    // Builds a map from a table-like array of {key, value}
    function makeTableMap(table) {
        const map = {};
        if (Array.isArray(table)) {
        table.forEach(row => {
            if (row && row.key) {
            map[row.key] = row.value;
            }
        });
        }
        return map;
    }
    
    // Safe JSON wrapper
    const JSONWrapper = {
        parse: JSON.parse,
        stringify: JSON.stringify,
    };
    

    function require(module) {
    if (module === 'copyFromWindow') {
        return copyFromWindow;
    }
    if (module === 'getType') {
        return getType;
    }
    if (module === 'Object') {
        return window.Object;
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

})();