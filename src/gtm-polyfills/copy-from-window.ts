module.exports = function (key: string): any {
  if (typeof window !== "undefined" && key in window) {
    return window[key as keyof Window];
  }
  return undefined;
}