module.exports = function (): ObjectConstructor {
  return typeof window !== 'undefined' ? window.Object : Object;
}
