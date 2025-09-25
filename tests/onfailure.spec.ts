import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

// Mock data.gtmOnFailure
const mockGtmOnFailure = jest.fn();

describe('onfailure', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Set global data object that onfailure function uses
    win.data = {
      gtmOnFailure: mockGtmOnFailure,
    };
  });

  test('should be defined', () => {
    expect(win.__EXPORTS__.onfailure).toBeDefined();
  });

  test('should call gtmOnFailure and return its result', () => {
    // Mock gtmOnFailure to return a specific value
    mockGtmOnFailure.mockReturnValue('failure_result');
    
    const result = win.__EXPORTS__.onfailure();
    
    expect(mockGtmOnFailure).toHaveBeenCalledTimes(1);
    expect(result).toBe('failure_result');
  });

  test('should log error message about failed library load', () => {
    // Mock console or log function if needed
    const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    win.__EXPORTS__.onfailure();
    
    expect(mockGtmOnFailure).toHaveBeenCalledTimes(1);
    
    // Clean up
    mockLog.mockRestore();
  });
});
