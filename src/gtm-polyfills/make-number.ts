module.exports = function makeNumber(value: any): number {
  const n = Number(value);
  return isNaN(n) ? 0 : n;
}
