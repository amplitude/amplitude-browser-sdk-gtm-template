import '../src/mock-data/kitchen-sink';
import '../libs/sandboxed-js.js';
import { GeneratedGtmParameters } from '../src/generated-types';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

const BASE_DATA: GeneratedGtmParameters = {
  apiKey: 'test',
  setSessionId: 'test',
  groupType: 'test',
  groupName: 'test',
  identifyGroupType: 'test',
  identifyGroupName: 'test',
  defaultEventTracking: true,
  setDeviceId: 'test',
  eventType: 'test',
  revenueId: 'test',
  revenuePrice: 'test',
};

describe('generateConfiguration', () => {
  beforeAll(() => {
  });

  test('kitchen sink example', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureElementInteractions: true,
      elementInteractionsCssSelectorAllowlist: 'test',
      elementInteractionsActionClickAllowlist: 'test',
      elementInteractionsPageUrlAllowlistString: 'test',
      elementInteractionsPageUrlAllowlistRegex: 'test',
      elementInteractionsDataAttributePrefixString: 'test',
      elementInteractionsDataAttributePrefixRegex: 'test',
      initTrackingOptions: [{ key: 'ipAddress', value: 'test' }],
      initCookieOptions: [{ key: 'domain', value: 'test' }],
      euData: true,
      userAgentEnrichment: true,
      osName: true,
      osVersion: true,
      deviceManufacturer: true,
      deviceModel: true,
      sessionReplay: true,
      guidesSurveys: true,
      detAttribution: true,
      attributionExcludeReferrers: 'test',
      attributionExcludeReferrersRegex: 'test',
      attributionResetSession: true,
      detPageView: true,
      pageViewLegacy: true,
      pageHistoryTracking: 'path',
      autocaptureNetworkTracking: true,
      networkTrackingIgnoreAmplitudeRequests: true,
      networkTrackingIgnoreHosts: 'test',
      networkTrackingCaptureRules: [{ urls: 'hello.com', methods: 'GET', statusCodeRange: '400-599' }],
    }
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('basic autocapture options', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
    }
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('manual configuration options', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      initOptions: 'manual',
      initManualOptions: [{ key: 'serverUrl', value: 'https://api2.amplitude.com' }],
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('eu data disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      euData: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('user agent enrichment disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      userAgentEnrichment: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('session replay and guides surveys explicitly disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      sessionReplay: false,
      guidesSurveys: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('default event tracking disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      defaultEventTracking: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('attribution tracking disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detAttribution: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('page view tracking disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detPageView: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('page history tracking all changes', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detPageView: true,
      pageHistoryTracking: 'all',
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('session, file download, and form interaction disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detSession: false,
      detFileDownload: false,
      detFormInteraction: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('element interactions disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureElementInteractions: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('network tracking with string ignore amplitude requests', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureNetworkTracking: true,
      networkTrackingIgnoreAmplitudeRequests: true,
      networkTrackingIgnoreHosts: 'localhost,example.com',
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('network tracking disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureNetworkTracking: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('comma-separated strings for attribution exclude referrers', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detAttribution: true,
      attributionExcludeReferrers: 'google.com,facebook.com',
      attributionExcludeReferrersRegex: '.*\\.ads\\..*,.*\\.marketing\\..*',
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('comma-separated strings for element interactions', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureElementInteractions: true,
      elementInteractionsCssSelectorAllowlist: '.button,.link',
      elementInteractionsActionClickAllowlist: 'click,submit',
      elementInteractionsPageUrlAllowlistString: '/checkout,/product',
      elementInteractionsPageUrlAllowlistRegex: '/product/.*,/category/.*',
      elementInteractionsDataAttributePrefixString: 'data-track,data-event',
      elementInteractionsDataAttributePrefixRegex: 'data-.*-track,data-.*-event',
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('network tracking with complex capture rules', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureNetworkTracking: true,
      networkTrackingCaptureRules: [
        { 
          urls: 'api.example.com,api2.example.com', 
          urlsRegex: '.*\\.api\\..*',
          methods: 'GET,POST,PUT', 
          statusCodeRange: '200-299' 
        },
        {
          urls: 'error.example.com',
          methods: 'GET',
          statusCodeRange: '400-599'
        }
      ],
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('page view with legacy option disabled', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detPageView: true,
      pageViewLegacy: false,
      pageViewType: 'Page View Custom',
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('attribution with custom initial empty value', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      detAttribution: true,
      attributionInitialEmptyValue: 'NO_VALUE',
      attributionResetSession: false,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('partial user agent enrichment options', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      userAgentEnrichment: true,
      osName: true,
      osVersion: false,
      deviceManufacturer: false,
      deviceModel: true,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('empty and undefined optional fields', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      initTrackingOptions: undefined,
      initCookieOptions: undefined,
      userAgentEnrichment: undefined,
      sessionReplay: undefined,
      guidesSurveys: undefined,
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('network tracking with string networkTrackingIgnoreAmplitudeRequests set to "true"', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      autocaptureNetworkTracking: true,
      networkTrackingIgnoreAmplitudeRequests: 'true',
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });

  test('configuration with logLevel 4 to trigger info logging', () => {
    expect(win.__EXPORTS__.generateConfiguration).toBeDefined();
    const data: GeneratedGtmParameters = {
      ...BASE_DATA,
      initOptions: { logLevel: 4 },
    };
    expect(win.__EXPORTS__.generateConfiguration(data)).toMatchSnapshot();
  });
});