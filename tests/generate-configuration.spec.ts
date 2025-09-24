import '../src/mock-data/kitchen-sink.ts';
import '../libs/sandboxed-js.js';
import { GeneratedGtmParameters } from '@/generated-types.js';

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
});