window.data = {
  apiKey: window.AMPLITUDE_API_KEY,
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