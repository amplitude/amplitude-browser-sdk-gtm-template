import { GeneratedGtmParameters } from '../generated-types';

const win: any = typeof globalThis !== 'undefined' ? globalThis : window;

type GtmCallbacks = {
  gtmOnSuccess: () => void;
  gtmOnFailure: () => void;
};

type GtmParameters = GeneratedGtmParameters | GtmCallbacks;

const data: GtmParameters = {
  apiKey: win.AMPLITUDE_API_KEY,
  type: 'init',
  defaultEventTracking: true,
  autocaptureNetworkTracking: true,
  networkTrackingIgnoreAmplitudeRequests: true,
  networkTrackingIgnoreHosts: '*',
  networkTrackingCaptureRules: [
    {
      methods: '*',
      responseHeaders: 'access-control-allow-headers,access-control-allow-methods',
      responseBody: 'status,message',
      requestHeaders: 'accept-encoding,accept-language',
      requestBody: 'status,message/*',
    },
  ],
  detPageView: true,
  detSession: true,
  autocaptureFrustrationInteractions: true,
  rageClicksCssSelectorAllowlist: '*,*,*',
  deadClicksCssSelectorAllowlist: '*,*,*',
  autocaptureWebVitals: true,
  gtmOnSuccess: function () {
    console.log('gtmOnSuccess');
  },
  gtmOnFailure: function () {
    console.log('gtmOnFailure');
  },
};

win.data = data;
