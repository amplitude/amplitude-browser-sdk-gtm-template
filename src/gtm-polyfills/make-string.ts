function makeString(value: any): string {
  return value !== null ? String(value) : '';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = makeString;
}

export default makeString;
