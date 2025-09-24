function logToConsole(...args: any[]): void {
  console.log("[GTM mock log]", ...args);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = logToConsole;
}

export default logToConsole;