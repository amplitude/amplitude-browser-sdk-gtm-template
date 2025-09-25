if (typeof module !== 'undefined' && module.exports) {
  (window.Object.prototype as any).delete = (obj: any, prop: string) => { delete obj[prop]; };
  module.exports = window.Object;
}

export default window.Object;