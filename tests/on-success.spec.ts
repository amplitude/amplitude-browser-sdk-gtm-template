import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';
import { GeneratedGtmParameters } from '../src/generated-types';

jest.mock('../src/gtm-polyfills/copy-from-window');

import copyFromWindow from '../src/gtm-polyfills/copy-from-window';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

// Mock amplitude function that captures calls
const mockAmplitude = jest.fn();

// Mock data.gtmOnSuccess and data.gtmOnFailure
const mockGtmOnSuccess = jest.fn();
const mockGtmOnFailure = jest.fn();

// Base GTM data template
const BASE_DATA: Partial<GeneratedGtmParameters> & { 
  gtmOnSuccess: () => void;
  gtmOnFailure: () => void;
  instanceName: string;
  type: string;
} = {
  apiKey: 'test-api-key',
  instanceName: 'amplitude',
  type: 'init',
  gtmOnSuccess: mockGtmOnSuccess,
  gtmOnFailure: mockGtmOnFailure,
};

describe('onsuccess', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock copyFromWindow to return our mock amplitude function
    copyFromWindow.mockReturnValue(mockAmplitude);
    
    // Set global data object that onsuccess function uses
    win.data = BASE_DATA;
  });

  test('should be defined', () => {
    expect(win.__EXPORTS__.onsuccess).toBeDefined();
  });

  test('init operation with basic configuration', () => {
    win.data = {
      ...BASE_DATA,
      type: 'init',
      apiKey: 'test-api-key',
      instanceName: 'amplitude',
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('track operation with event properties and groups', () => {
    win.data = {
      ...BASE_DATA,
      type: 'track',
      eventType: 'Button Click',
      eventProperties: [
        { name: 'button_text', value: 'Sign Up' },
        { name: 'page', value: 'landing' }
      ],
      trackEventGroups: [
        { eventGroupType: 'company', eventGroupName: 'acme-corp' }
      ],
      trackTimestamp: 1634567890123,
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('track operation with comma-separated group names', () => {
    win.data = {
      ...BASE_DATA,
      type: 'track',
      eventType: 'Purchase',
      trackEventGroups: [
        { eventGroupType: 'category', eventGroupName: 'electronics,gadgets,tech' }
      ],
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
    expect(mockGtmOnSuccess).toHaveBeenCalledTimes(1);
  });

  test('track operation with event properties object', () => {
    win.data = {
      ...BASE_DATA,
      type: 'track',
      eventType: 'Page View',
      eventPropertiesObject: {
        page_title: 'Home Page',
        page_url: '/home',
        referrer: 'google.com',
        user_properties: { should_be_removed: true }
      },
      eventProperties: [
        { name: 'utm_source', value: 'newsletter' }
      ]
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('identify operation with user properties', () => {
    win.data = {
      ...BASE_DATA,
      type: 'identify',
      userPropertiesVariable: {
        email: 'user@example.com',
        plan: 'premium'
      }
    };

    // Mock the getAllUserProps function by setting it up
    const mockGetAllUserProps = jest.fn().mockReturnValue({
      email: 'user@example.com',
      plan: 'premium'
    });
    win.getAllUserProps = mockGetAllUserProps;

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('setGroup operation with single group', () => {
    win.data = {
      ...BASE_DATA,
      type: 'setGroup',
      groupType: 'company',
      groupName: 'amplitude'
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('setGroup operation with comma-separated groups', () => {
    win.data = {
      ...BASE_DATA,
      type: 'setGroup',
      groupType: 'team',
      groupName: 'engineering,product,design'
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('groupIdentify operation', () => {
    win.data = {
      ...BASE_DATA,
      type: 'groupIdentify',
      identifyGroupType: 'company',
      identifyGroupName: 'amplitude',
      userPropertiesVariable: {
        industry: 'analytics',
        size: 'large'
      }
    };

    const mockGetAllUserProps = jest.fn().mockReturnValue({
      industry: 'analytics',
      size: 'large'
    });
    win.getAllUserProps = mockGetAllUserProps;

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('revenue operation with required fields', () => {
    win.data = {
      ...BASE_DATA,
      type: 'revenue',
      revenueId: 'product-123',
      revenuePrice: '29.99',
      revenueQuantity: 2,
      revenue: '59.98',
      revenueType: 'purchase',
      revenueCurrency: 'USD'
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
    expect(mockGtmOnSuccess).toHaveBeenCalledTimes(1);
  });

  test('revenue operation with revenue variable object', () => {
    win.data = {
      ...BASE_DATA,
      type: 'revenue',
      revenueVariable: {
        productId: 'custom-product',
        price: 49.99,
        quantity: 1,
        revenue: 49.99,
        eventProperties: { category: 'subscription' },
        receipt: 'receipt-abc123',
        receiptSig: 'signature-xyz'
      }
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('revenue operation with legacy id field', () => {
    win.data = {
      ...BASE_DATA,
      type: 'revenue',
      revenueVariable: {
        id: 'legacy-product-id', // Legacy field
        price: 19.99
      }
    };

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('setDeviceId operation', () => {
    win.data = {
      ...BASE_DATA,
      type: 'setDeviceId',
      setDeviceId: 'device-123'
    };

    // Mock normalizeDeviceId function
    win.normalizeDeviceId = jest.fn().mockReturnValue('device-123');

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('default case for unknown operation type', () => {
    win.data = {
      ...BASE_DATA,
      type: 'customOperation',
      customOperation: 'custom-value'
    };

    // Mock normalize function
    win.normalize = jest.fn().mockReturnValue('normalized-custom-value');

    win.__EXPORTS__.onsuccess();

    expect(mockAmplitude).toMatchSnapshot();
  });

  test('revenue operation should fail with missing price in revenueVariable', () => {
    win.data = {
      ...BASE_DATA,
      type: 'revenue',
      revenueVariable: {
        productId: 'test-product'
        // Missing price
      }
    };

    win.__EXPORTS__.onsuccess();

    expect(mockGtmOnFailure).toHaveBeenCalledTimes(1);
    expect(mockAmplitude).not.toHaveBeenCalled();
  });
});
