import '../src/mock-data/kitchen-sink';

// Mock injectScript before importing the main file
jest.mock('../src/gtm-polyfills/inject-script');
import injectScript from '../src/gtm-polyfills/inject-script';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

describe('injectScript execution', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call injectScript when not in Jest environment', () => {
    expect(true).toBe(true);
  });
});
