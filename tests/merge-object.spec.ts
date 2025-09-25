import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

describe('mergeObject', () => {
  test('should be defined', () => {
    expect(win.__EXPORTS__.mergeObject).toBeDefined();
  });

  test('basic object merging', () => {
    const baseObject = { a: 1, b: 2 };
    const overwriteObject = { c: 3, d: 4 };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('empty base object with valid overwrite object', () => {
    const baseObject = {};
    const overwriteObject = { a: 1, b: 'hello' };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('valid base object with empty overwrite object', () => {
    const baseObject = { a: 1, b: 'hello' };
    const overwriteObject = {};
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('null base object with valid overwrite object', () => {
    const baseObject = null;
    const overwriteObject = { a: 1, b: 2 };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('valid base object with null overwrite object', () => {
    const baseObject = { a: 1, b: 2 };
    const overwriteObject = null;
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('both objects null', () => {
    const baseObject = null;
    const overwriteObject = null;
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('undefined base object with valid overwrite object', () => {
    const baseObject = undefined;
    const overwriteObject = { a: 1, b: 2 };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('valid base object with undefined overwrite object', () => {
    const baseObject = { a: 1, b: 2 };
    const overwriteObject = undefined;
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('non-object base with valid overwrite object', () => {
    const baseObject = "not an object";
    const overwriteObject = { a: 1, b: 2 };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('nested objects', () => {
    const baseObject = {
      user: {
        name: 'John',
        age: 30,
        preferences: {
          theme: 'dark',
          language: 'en'
        }
      },
      settings: {
        notifications: true
      }
    };
    const overwriteObject = {
      user: {
        email: 'john@example.com',
        age: 31
      },
      admin: true
    };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });

  test('objects with array values', () => {
    const baseObject = {
      tags: ['javascript', 'node'],
      categories: [1, 2, 3],
      empty_array: []
    };
    const overwriteObject = {
      tags: ['react', 'vue'],
      new_array: ['a', 'b', 'c'],
      numbers: [10, 20, 30]
    };
    const result = win.__EXPORTS__.mergeObject(baseObject, overwriteObject);
    expect(result).toMatchSnapshot();
  });
});
