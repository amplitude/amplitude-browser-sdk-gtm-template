import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

describe('getUserPropsBulkSetObject', () => {
  test('should be defined', () => {
    expect(win.__EXPORTS__.getUserPropsBulkSetObject).toBeDefined();
  });

  test('valid object with user_properties', () => {
    const data = {
      userPropertyOperationsObject: {
        user_properties: {
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          premium: true
        }
      }
    };
    const result = win.__EXPORTS__.getUserPropsBulkSetObject(data);
    expect(result).toMatchSnapshot();
  });

  test('object without user_properties key', () => {
    const data = {
      userPropertyOperationsObject: {
        some_other_key: 'value',
        another_key: 123
      }
    };
    const result = win.__EXPORTS__.getUserPropsBulkSetObject(data);
    expect(result).toMatchSnapshot();
  });
});
