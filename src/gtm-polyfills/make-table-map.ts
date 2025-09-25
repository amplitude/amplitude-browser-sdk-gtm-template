function makeTableMap(table: Array<{ key: string; value: any }>, keyName: string, valueName: string) {
  const map: Record<string, any> = {};
  if (Array.isArray(table)) {
    table.forEach(row => {
      if (row && (row as any)[keyName]) {
        map[(row as any)[keyName]] = (row as any)[valueName];
      }
    });
  }
  return map;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = makeTableMap;
}

export default makeTableMap;