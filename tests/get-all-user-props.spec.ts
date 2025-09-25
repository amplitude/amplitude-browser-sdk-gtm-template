import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

describe('getAllUserProps', () => {
  test('should be defined', () => {
    expect(win.__EXPORTS__.getAllUserProps).toBeDefined();
  });

  test('with individual user property operations to cover line 275', () => {
    const data = {
      userPropertyOperations: [
        { command: 'set', userProperty: 'email', value: 'test@example.com' },
        { command: 'add', userProperty: 'login_count', value: 1 },
        { command: 'unset', userProperty: 'temp_flag', value: undefined },
      ]
    };
    const result = win.__EXPORTS__.getAllUserProps(data);
    expect(result).toMatchSnapshot();
  });

  test('with both individual and bulk user property operations', () => {
    const data = {
      userPropertyOperations: [
        { command: 'set', userProperty: 'plan', value: 'premium' },
        { command: 'append', userProperty: 'interests', value: 'technology' },
      ],
      userPropertyOperationsObject: {
        user_properties: {
          name: 'John Doe',
          age: 30,
        }
      }
    };
    const result = win.__EXPORTS__.getAllUserProps(data);
    expect(result).toMatchSnapshot();
  });

  test('with empty user property operations array', () => {
    const data = {
      userPropertyOperations: [],
      userPropertyOperationsObject: {
        user_properties: {
          country: 'USA',
        }
      }
    };
    const result = win.__EXPORTS__.getAllUserProps(data);
    expect(result).toMatchSnapshot();
  });

  test('with no user property operations defined', () => {
    const data = {};
    const result = win.__EXPORTS__.getAllUserProps(data);
    expect(result).toMatchSnapshot();
  });
});
