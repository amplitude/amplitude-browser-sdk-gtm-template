function makeTableMap(table: Array<{ key: string; value: any }>): Record<string, any> {
  const map: Record<string, any> = {};
  if (Array.isArray(table)) {
    table.forEach(row => {
      if (row && row.key) {
        map[row.key] = row.value;
      }
    });
  }
  return map;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = makeTableMap;
}

export default makeTableMap;