module.exports = function makeString(value: any): string {
  return value != null ? String(value) : "";
}
