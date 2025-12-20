import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

describe('normalize', () => {
  test('should be defined', () => {
    expect(win.__EXPORTS__.normalize).toBeDefined();
  });

  test('should convert string "null" to null', () => {
    const result = win.__EXPORTS__.normalize('null');
    expect(result).toBeNull();
  });

  test('should convert string "undefined" to undefined', () => {
    const result = win.__EXPORTS__.normalize('undefined');
    expect(result).toBeUndefined();
  });

  test('should convert string "true" to boolean true', () => {
    const result = win.__EXPORTS__.normalize('true');
    expect(result).toBe(true);
  });

  test('should keep boolean true as true', () => {
    const result = win.__EXPORTS__.normalize(true);
    expect(result).toBe(true);
  });

  test('should convert string "false" to boolean false', () => {
    const result = win.__EXPORTS__.normalize('false');
    expect(result).toBe(false);
  });

  test('should keep boolean false as false', () => {
    expect(win.__EXPORTS__.normalize(false)).toBe(false);
  });

  test('should convert numeric strings to numbers', () => {
    expect(win.__EXPORTS__.normalize('123')).toBe(123);
  });

  test('should keep numbers as numbers', () => {
    expect(win.__EXPORTS__.normalize(123)).toBe(123);
  });

  test('should keep non-numeric strings as strings', () => {
    expect(win.__EXPORTS__.normalize('hello')).toBe('hello');
  });

  test('should handle null input', () => {
    expect(win.__EXPORTS__.normalize(null)).toBeNull();
  });

  test('should handle undefined input', () => {
    expect(win.__EXPORTS__.normalize(undefined)).toBeUndefined();
  });

  test('should handle object input', () => {
    const obj = { key: 'value' };
    expect(win.__EXPORTS__.normalize(obj)).toBe(obj);
  });

  test('should handle array input', () => {
    const arr = [1, 2, 3];
    expect(win.__EXPORTS__.normalize(arr)).toBe(arr);
  });
});
