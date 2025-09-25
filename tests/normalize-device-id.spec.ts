import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

describe('normalizeDeviceId', () => {
  test('should be defined', () => {
    expect(win.__EXPORTS__.normalizeDeviceId).toBeDefined();
  });

  test('should convert string "null" to null', () => {
    const result = win.__EXPORTS__.normalizeDeviceId('null');
    expect(result).toBeNull();
  });

  test('should convert string "undefined" to undefined', () => {
    const result = win.__EXPORTS__.normalizeDeviceId('undefined');
    expect(result).toBeUndefined();
  });

  test('should keep regular strings unchanged', () => {
    expect(win.__EXPORTS__.normalizeDeviceId('device-123')).toBe('device-123');
    expect(win.__EXPORTS__.normalizeDeviceId('abc123def')).toBe('abc123def');
    expect(win.__EXPORTS__.normalizeDeviceId('')).toBe('');
    expect(win.__EXPORTS__.normalizeDeviceId('true')).toBe('true');
    expect(win.__EXPORTS__.normalizeDeviceId('false')).toBe('false');
  });

  test('should keep numbers unchanged', () => {
    expect(win.__EXPORTS__.normalizeDeviceId(123)).toBe(123);
    expect(win.__EXPORTS__.normalizeDeviceId(0)).toBe(0);
    expect(win.__EXPORTS__.normalizeDeviceId(-456)).toBe(-456);
    expect(win.__EXPORTS__.normalizeDeviceId(78.9)).toBe(78.9);
  });

  test('should keep boolean values unchanged', () => {
    expect(win.__EXPORTS__.normalizeDeviceId(true)).toBe(true);
    expect(win.__EXPORTS__.normalizeDeviceId(false)).toBe(false);
  });

  test('should keep null unchanged', () => {
    const result = win.__EXPORTS__.normalizeDeviceId(null);
    expect(result).toBeNull();
  });

  test('should keep undefined unchanged', () => {
    const result = win.__EXPORTS__.normalizeDeviceId(undefined);
    expect(result).toBeUndefined();
  });

  test('should keep objects unchanged', () => {
    const obj = { key: 'value' };
    const result = win.__EXPORTS__.normalizeDeviceId(obj);
    expect(result).toBe(obj);
  });

  test('should keep arrays unchanged', () => {
    const arr = [1, 2, 3];
    const result = win.__EXPORTS__.normalizeDeviceId(arr);
    expect(result).toBe(arr);
  });

  test('should handle UUID-like device IDs', () => {
    const uuid = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    expect(win.__EXPORTS__.normalizeDeviceId(uuid)).toBe(uuid);
  });

  test('should handle numeric string device IDs', () => {
    expect(win.__EXPORTS__.normalizeDeviceId('123456789')).toBe('123456789');
  });
});
