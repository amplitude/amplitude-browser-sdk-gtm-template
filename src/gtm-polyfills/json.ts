const JSONWrapper = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = JSONWrapper;
}

export default JSONWrapper;
