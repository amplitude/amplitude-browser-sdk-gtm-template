module.exports = function logToConsole(...args: any[]): void {
  console.log("[GTM mock log]", ...args);
}
