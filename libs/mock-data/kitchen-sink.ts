import { GtmData } from "../types";

const win = typeof globalThis !== 'undefined' ? globalThis : window;

const data: GtmData = {
  apiKey: win.AMPLITUDE_API_KEY,
  type: 'init',
  defaultEventTracking: true,
  autocaptureNetworkTracking: true,
  detPageView: true,
  gtmOnSuccess: function () {
    console.log('gtmOnSuccess');
  },
  gtmOnFailure: function () {
    console.log('gtmOnFailure');
  },
};

win.data = data;
