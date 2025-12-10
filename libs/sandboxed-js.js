// APIs
const copyFromWindow = require('copyFromWindow');
const getType = require('getType');
const Object = require('Object');
const injectScript = require('injectScript');
const log = require('logToConsole');
const makeNumber = require('makeNumber');
const makeString = require('makeString');
const makeTableMap = require('makeTableMap');
const JSON = require('JSON');

// Constants
const WRAPPER_VERSION = '3.24.0';
const JS_URL = 'https://cdn.amplitude.com/libs/analytics-browser-gtm-wrapper-'+WRAPPER_VERSION+'.js.br';
const LOG_PREFIX = '[Amplitude / GTM] ';
const WRAPPER_NAMESPACE = '_amplitude';

// Helpers

// Print a log message and set the tag to failed state
const fail = msg => {
  log(LOG_PREFIX + 'Error: ' + msg);
  return data.gtmOnFailure();
};

// Merge two Objects
const mergeObject = (baseObject, overwriteObject) => {
  if (!baseObject || !isValidObject(baseObject) || Object.keys(baseObject).length == 0) {
    return  isValidObject(overwriteObject) ? overwriteObject : {};
  }

  if (!overwriteObject ||  !isValidObject(overwriteObject) || Object.keys(overwriteObject).length == 0) {
    return baseObject;
  }

  // Clone
  const newObject = JSON.parse(JSON.stringify(baseObject));

  Object.entries(overwriteObject).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    newObject[key] = value;
  });

  return newObject;
};

const isValidObject = (input) => {
  const isObject = getType(input) == 'object';
  if (!isObject) {
    log(LOG_PREFIX + 'Error: Invalid object input.');
  }
  return isObject;
};

// Normalize options' values
const normalizeOptionsValues = options => {
  return options && options.length ?
      options.map(opt => {
        return {
          key: opt.key,
          value: normalize(opt.value)
        };
      }) : [];
};

// Normalize the input and return it
const normalize = val => {
  if (val === 'null') return null;
  if (val === 'true' || val === true) return true;
  if (val === 'false' || val === false) return false;
  return makeNumber(val) || val;
};

// Normalize device Id
const normalizeDeviceId = val => {
  if (val === 'null') return null;
  if (val === 'undefined') return undefined;
  return val;
};

// Split a string into an array and trim the constituents of leading and trailing whitespace
const stringToArrayAndTrim = str => str.split(',').map(n => makeString(n.trim()));

// User input
const initUserId = data.initUserId || null;

let _amplitude;

const generateConfiguration = (data) => {
  // Build and normalize initialization options map, if manual configuration was selected
  const manualOptions = normalizeOptionsValues(data.initManualOptions);

  // Use manual configuration if it exists – otherwise use what was passed in the variable or an empty object
  const initOptions = (data.initOptions === 'manual' ? makeTableMap(manualOptions, 'key', 'value') : data.initOptions) || {};

  // Configuration for trackingOptions
  if (!!data.initTrackingOptions) {
    initOptions.trackingOptions = makeTableMap(normalizeOptionsValues(data.initTrackingOptions), 'key', 'value');
  }

  // Configuration for cookieOptions
  if (!!data.initCookieOptions) {
    initOptions.cookieOptions = makeTableMap(normalizeOptionsValues(data.initCookieOptions), 'key', 'value');
  }

  // Configuration for EU Data Residency
  if (data.euData) {
    initOptions.serverZone = 'EU';
  }

  // Configuration for user agent enrichment plugin
  if (!!data.userAgentEnrichment) {
    initOptions.userAgentEnrichmentOptions = {
      osName: data.osName,
      osVersion: data.osVersion,
      deviceManufacturer: data.deviceManufacturer,
      deviceModel: data.deviceModel,
    };
  }

  // Configuration for Session Replay Plugin
  if (!!data.sessionReplay) {
    initOptions.sessionReplay = true;
  } else {
    initOptions.sessionReplay = false;
  }

  // Configuration for Guides and Surveys Plugin
  if (!!data.guidesSurveys) {
    initOptions.guidesSurveys = true;
  } else {
    initOptions.guidesSurveys = false;
  }

  if (!!data.defaultEventTracking) {
    initOptions.autocapture = {};

    if (!!data.detAttribution) {
      initOptions.autocapture.attribution = {};

      if (!!data.attributionExcludeReferrers) {
        initOptions.autocapture.attribution.excludeReferrersText = getType(data.attributionExcludeReferrers) === 'array' ? data.attributionExcludeReferrers : stringToArrayAndTrim(data.attributionExcludeReferrers);
      }

      if (!!data.attributionExcludeReferrersRegex) {
        initOptions.autocapture.attribution.excludeReferrersRegex = getType(data.attributionExcludeReferrersRegex) === 'array' ? data.attributionExcludeReferrersRegex : stringToArrayAndTrim(data.attributionExcludeReferrersRegex);
      }

      initOptions.autocapture.attribution.resetSessionOnNewCampaign = data.attributionResetSession;
      initOptions.autocapture.attribution.initialEmptyValue = data.attributionInitialEmptyValue || 'EMPTY';
    } else {
       initOptions.autocapture.attribution = false;
    }

    if (!!data.detPageView) {
      initOptions.autocapture.pageViews = {};

      if (!!data.pageViewLegacy) {
        // pass the pageViewLegacy option into the SDK wrapper and use plugin in to make the page view event using legacy properties.
        initOptions.pageViewLegacy = true;
      } else {
        if (!!data.pageViewType) {
          initOptions.autocapture.pageViews.eventType = data.pageViewType;
        }
      }

      initOptions.autocapture.pageViews = {
        trackOn: undefined
      };

      switch (data.pageHistoryTracking) {
        case 'path':
          initOptions.autocapture.pageViews.trackHistoryChanges = 'pathOnly';
          break;
        default:
          initOptions.autocapture.pageViews.trackHistoryChanges = 'all';
          break;
      }
    } else {
      initOptions.autocapture.pageViews = false;
    }

    // Session events are enable by default
    if (!data.detSession) {
      initOptions.autocapture.sessions = false;
    }

    // fileDownloads events are enable by default
    if (!data.detFileDownload) {
       initOptions.autocapture.fileDownloads = false;
    }

    // fileDownloads events are enable by default
    if (!data.detFormInteraction) {
      initOptions.autocapture.formInteractions = false;
    }

    // webVitals are not enabled by default
    if (data.autocaptureWebVitals) {
      initOptions.autocapture.webVitals = true;
    }

    if (!!data.autocaptureElementInteractions) {
      initOptions.autocapture.elementInteractions = {};

      if (!!data.elementInteractionsCssSelectorAllowlist) {
        initOptions.autocapture.elementInteractions.cssSelectorAllowlist = getType(data.elementInteractionsCssSelectorAllowlist) === 'array' ? data.elementInteractionsCssSelectorAllowlist : stringToArrayAndTrim(data.elementInteractionsCssSelectorAllowlist);
      }

      if (!!data.elementInteractionsActionClickAllowlist) {
        initOptions.autocapture.elementInteractions.actionClickAllowlist = getType(data.elementInteractionsActionClickAllowlist) === 'array' ? data.elementInteractionsActionClickAllowlist : stringToArrayAndTrim(data.elementInteractionsActionClickAllowlist);
      }

      if (!!data.elementInteractionsPageUrlAllowlistString) {
        initOptions.autocapture.elementInteractions.pageUrlAllowlistString = getType(data.elementInteractionsPageUrlAllowlistString) === 'array' ? data.elementInteractionsPageUrlAllowlistString : stringToArrayAndTrim(data.elementInteractionsPageUrlAllowlistString);
      }

      if (!!data.elementInteractionsPageUrlAllowlistRegex) {
        initOptions.autocapture.elementInteractions.pageUrlAllowlistRegex = getType(data.elementInteractionsPageUrlAllowlistRegex) === 'array' ? data.elementInteractionsPageUrlAllowlistRegex : stringToArrayAndTrim(data.elementInteractionsPageUrlAllowlistRegex);
      }

      if (!!data.elementInteractionsDataAttributePrefixString) {
        initOptions.autocapture.elementInteractions.dataAttributePrefixString = getType(data.elementInteractionsDataAttributePrefixString) === 'array' ? data.elementInteractionsDataAttributePrefixString : stringToArrayAndTrim(data.elementInteractionsDataAttributePrefixString);
      }

      if (!!data.elementInteractionsDataAttributePrefixRegex) {
        initOptions.autocapture.elementInteractions.dataAttributePrefixRegex = getType(data.elementInteractionsDataAttributePrefixRegex) === 'array' ? data.elementInteractionsDataAttributePrefixRegex : stringToArrayAndTrim(data.elementInteractionsDataAttributePrefixRegex);
      }
    }

    if (!!data.autocaptureFrustrationInteractions) {
      let rageClicks;
      let deadClicks;
      
      if (!!data.rageClicksCssSelectorAllowlist) {
        rageClicks = {};
        rageClicks.cssSelectorAllowlist = getType(data.rageClicksCssSelectorAllowlist) === 'array' ? data.rageClicksCssSelectorAllowlist : stringToArrayAndTrim(data.rageClicksCssSelectorAllowlist);
      }
    
      if (!!data.deadClicksCssSelectorAllowlist) {
        deadClicks = {};
        deadClicks.cssSelectorAllowlist = getType(data.deadClicksCssSelectorAllowlist) === 'array' ? data.deadClicksCssSelectorAllowlist : stringToArrayAndTrim(data.deadClicksCssSelectorAllowlist);
      }
    
      const hasFrustrationInteractionsOptions = !!rageClicks || !!deadClicks;
      if (!hasFrustrationInteractionsOptions) {
        initOptions.autocapture.frustrationInteractions = true; 
      } else {
        initOptions.autocapture.frustrationInteractions = {
          rageClicks: rageClicks,
          deadClicks: deadClicks,
        };
      }
    }

    if (!!data.autocaptureNetworkTracking) {
      let ignoreAmplitudeRequests;
      if (typeof data.networkTrackingIgnoreAmplitudeRequests === 'string' && data.networkTrackingIgnoreAmplitudeRequests.toLowerCase() === 'true') {
        ignoreAmplitudeRequests = true;
      }
      let ignoreHosts;
      if (typeof data.networkTrackingIgnoreHosts === 'string') {
        ignoreHosts = data.networkTrackingIgnoreHosts.split(',').map((host) => host.trim());
      }

      let captureRules;
      if (data.networkTrackingCaptureRules) {
        captureRules = [];
        data.networkTrackingCaptureRules.forEach(rule => {
          let urls = rule.urls ? rule.urls.split(',').map(url => url.trim()) : undefined;
          let urlsRegex = rule.urlsRegex ? rule.urlsRegex.split(',').map(url => url.trim()) : [];
          const captureRule = {
            urls: urls,
            urlsRegex: urlsRegex.length > 0 ? urlsRegex : undefined,
            methods: rule.methods ? rule.methods.split(',').map(method => method.trim()) : undefined,
            statusCodeRange: rule.statusCodeRange,
            responseHeaders: rule.responseHeaders ? rule.responseHeaders.split(',').map(header => header.trim()) : undefined,
            responseBody: rule.responseBody ? {
              allowlist: rule.responseBody.split(',').map(body => body.trim()),
            } : undefined,
            requestHeaders: rule.requestHeaders ? rule.requestHeaders.split(',').map(header => header.trim()) : undefined,
            requestBody: rule.requestBody ? {
              allowlist: rule.requestBody.split(',').map(body => body.trim()),
            } : undefined,
          };  
          captureRules.push(captureRule);
        });
      }

      initOptions.autocapture.networkTracking = {
        ignoreAmplitudeRequests: ignoreAmplitudeRequests,
        ignoreHosts: ignoreHosts,
        captureRules: captureRules,
      };
    }

  } else {
    initOptions.autocapture = false;
  }

  if(initOptions.logLevel == 4){
    log(LOG_PREFIX + 'INFO: ' + "Amplitude instance will be initialized by configuration: " + JSON.stringify(initOptions));
  }

  return initOptions;
};

const getAllUserProps = (data) => {
  const userProps = data.userPropertyOperations || [];
  const userPropsBulk = getUserPropsBulkSetObject(data);
  const userPropsIndividual = userProps.map(op => {
        return [op.command, op.userProperty, op.value];
      });
  const mergedGroupUserProps = userPropsIndividual.concat(userPropsBulk);
  return mergedGroupUserProps;
};

const getUserPropsBulkSetObject = (data) => {
  const userPropsObject = data.userPropertyOperationsObject;
  if (!userPropsObject || !isValidObject(userPropsObject)) {
    return [];
  }

  if (Object.entries(userPropsObject).length != 0 && !userPropsObject.user_properties) {
    log(LOG_PREFIX + 'Error: The bulk set operation for user properties was ignored because the expected`user_properties` key is missing in the identify input.');
    return [];
  }

  const userPropsBulk = [];
  Object.entries(userPropsObject.user_properties).forEach((entry) => {
    const propKey = entry[0];
    const propValue = entry[1];
    userPropsBulk.push(["set", propKey, propValue]);
  });
  return userPropsBulk;
};

const onfailure = () => {
  return fail('Failed to load the Amplitude JavaScript library');
};

const onsuccess = () => {

  _amplitude = copyFromWindow(WRAPPER_NAMESPACE);
  /* istanbul ignore if */
  if (!_amplitude) return fail('Failed to load the Amplitude namespace');

  const instanceName = data.instanceName;

  switch (data.type) {
    case 'init':
      _amplitude(instanceName, 'init', data.apiKey, initUserId, generateConfiguration(data));
      break;

    case 'track':
      const propertiesBaisc = makeTableMap(data.eventProperties || [], 'name', 'value');
      const isValidPropertiesObject = data.eventPropertiesObject && isValidObject(data.eventPropertiesObject);
      let eventProperties = propertiesBaisc;
      if (isValidPropertiesObject) {
        // Clone
        const cleanedPropertiesObject = JSON.parse(JSON.stringify(data.eventPropertiesObject));
        // remove the user_properties
        Object.delete(cleanedPropertiesObject, 'user_properties');
        eventProperties = mergeObject(propertiesBaisc, cleanedPropertiesObject);
      }

      // Convert comma-separated groupName into an array of groupNames
      const groups = makeTableMap((data.trackEventGroups || []).map(group => {
        return {
          eventGroupType: group.eventGroupType,
          eventGroupName: group.eventGroupName && group.eventGroupName.indexOf(',') > -1 ? stringToArrayAndTrim(group.eventGroupName) : group.eventGroupName
        };
      }), 'eventGroupType', 'eventGroupName') || {};

      const eventOptions = {};

      if (data.trackTimestamp) {
        eventOptions.time = normalize(data.trackTimestamp);
      }

      _amplitude(instanceName, 'track', {
        event_type: data.eventType,
        groups: groups
      }, eventProperties, eventOptions);
      break;

    case 'identify':
      const mergedUserProps = getAllUserProps(data);
      _amplitude(instanceName, 'identify', mergedUserProps);
      break;

    case 'setGroup':
      const groupName = data.groupName.indexOf(',') > -1 ? stringToArrayAndTrim(data.groupName) : data.groupName;
      _amplitude(instanceName, 'setGroup', data.groupType, groupName);
      break;

    case 'groupIdentify':
      const mergedGroupUserProps = getAllUserProps(data);
      _amplitude(instanceName, 'groupIdentify', data.identifyGroupType, data.identifyGroupName, mergedGroupUserProps);
      break;

    case 'revenue':
      const revenueObject = data.revenueVariable || {
        productId: data.revenueId,
        price: data.revenuePrice,
        quantity: data.revenueQuantity || 1,
        revenue: data.revenue,
        revenueType: data.revenueType,
        eventProperties: makeTableMap(data.revenueEventProperties || [], 'name', 'value'),
        currency: data.revenueCurrency,
        receipt: data.revenueReceipt,
        receiptSig: data.revenueReceiptSignature
      };

      // Allow for legacy format
      if (revenueObject.id) revenueObject.productId = revenueObject.id;

      // Validate revenueObject
      if (!revenueObject.productId || !revenueObject.price) return fail('Missing required "productId" and/or "price" from the Revenue object');

      revenueObject.productId = makeString(revenueObject.productId);
      revenueObject.price = makeNumber(revenueObject.price);
      revenueObject.quantity = makeNumber(revenueObject.quantity);
      revenueObject.revenue = makeNumber(revenueObject.revenue);
      if (revenueObject.currency) {
        revenueObject.currency = makeString(revenueObject.currency);
      }
      if (revenueObject.receipt) {
        revenueObject.receipt = makeString(revenueObject.receipt);
      }
      if (revenueObject.receiptSig) {
        revenueObject.receiptSig = makeString(revenueObject.receiptSig);
      }
      _amplitude(instanceName, 'revenue', revenueObject);
      break;

    case 'setDeviceId':
      _amplitude(instanceName, 'setDeviceId', normalizeDeviceId(data.setDeviceId));
      break;

    default:
      _amplitude(instanceName, data.type, normalize(data[data.type]));
      break;
  }

  data.gtmOnSuccess();
};

injectScript(JS_URL, onsuccess, onfailure, 'amplitude');

// exports:start
window.__EXPORTS__ = {
  onsuccess,
  onfailure,
  mergeObject,
  generateConfiguration,
  getUserPropsBulkSetObject,
  getAllUserProps,
  normalize,
  normalizeDeviceId,
};
// exports:end