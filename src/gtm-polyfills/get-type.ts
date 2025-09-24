function getType(value: any): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = getType;
}

export default getType;