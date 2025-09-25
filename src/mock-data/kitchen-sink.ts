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
  detPageView: true,
  detSession: true,
  autocaptureFrustrationInteractions: true,
  frustrationInteractionsOptions: {
    rageClicksCssSelectorAllowlist: '*',
    deadClicksCssSelectorAllowlist: '*',
  },
  gtmOnSuccess: function () {
    console.log('gtmOnSuccess');
  },
  gtmOnFailure: function () {
    console.log('gtmOnFailure');
  },
};

win.data = data;
