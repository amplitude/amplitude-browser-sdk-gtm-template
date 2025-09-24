function copyFromWindow (key: string): any {
  if (typeof window !== 'undefined' && key in window) {
    return window[key as keyof Window];
  }
  return undefined;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = copyFromWindow;
}

export default copyFromWindow;