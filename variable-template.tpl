___TERMS_OF_SERVICE___

By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.


___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "categories": [
    "ANALYTICS"
  ],
  "displayName": "Amplitude Configuration",
  "description": "Builds an Amplitude Browser SDK configuration object for use with the Amplitude Analytics Browser SDK tag template's Configuration field.",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "LABEL",
    "name": "description",
    "displayName": "Fill in only the options you want to override. Empty fields are omitted from the returned object. See the <a href=\"https://www.docs.developers.amplitude.com/data/sdks/browser-2/#configuration\">Browser SDK configuration reference</a>."
  },
  {
    "type": "GROUP",
    "name": "coreGroup",
    "displayName": "Core",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "SELECT",
        "name": "logLevel",
        "displayName": "Log level",
        "simpleValueType": true,
        "selectItems": [
          { "value": "", "displayValue": "(default)" },
          { "value": "0", "displayValue": "None (0)" },
          { "value": "1", "displayValue": "Error (1)" },
          { "value": "2", "displayValue": "Warn (2)" },
          { "value": "3", "displayValue": "Verbose (3)" },
          { "value": "4", "displayValue": "Debug (4)" }
        ],
        "defaultValue": ""
      },
      {
        "type": "TEXT",
        "name": "serverUrl",
        "displayName": "Server URL",
        "simpleValueType": true,
        "valueHint": "https://api2.amplitude.com/2/httpapi"
      },
      {
        "type": "TEXT",
        "name": "appVersion",
        "displayName": "App version",
        "simpleValueType": true
      },
      {
        "type": "TEXT",
        "name": "partnerId",
        "displayName": "Partner ID",
        "simpleValueType": true
      },
      {
        "type": "TEXT",
        "name": "minIdLength",
        "displayName": "Minimum ID length",
        "simpleValueType": true,
        "valueValidators": [
          { "type": "POSITIVE_NUMBER" }
        ]
      },
      {
        "type": "SELECT",
        "name": "transport",
        "displayName": "Transport",
        "simpleValueType": true,
        "selectItems": [
          { "value": "", "displayValue": "(default)" },
          { "value": "fetch", "displayValue": "fetch" },
          { "value": "xhr", "displayValue": "xhr" },
          { "value": "beacon", "displayValue": "beacon" }
        ],
        "defaultValue": ""
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "flushGroup",
    "displayName": "Event flushing",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "flushIntervalMillis",
        "displayName": "Flush interval (ms)",
        "simpleValueType": true,
        "valueValidators": [
          { "type": "POSITIVE_NUMBER" }
        ]
      },
      {
        "type": "TEXT",
        "name": "flushQueueSize",
        "displayName": "Flush queue size",
        "simpleValueType": true,
        "valueValidators": [
          { "type": "POSITIVE_NUMBER" }
        ]
      },
      {
        "type": "TEXT",
        "name": "flushMaxRetries",
        "displayName": "Flush max retries",
        "simpleValueType": true,
        "valueValidators": [
          { "type": "POSITIVE_NUMBER" }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "useBatch",
        "checkboxText": "Use batch endpoint",
        "simpleValueType": true,
        "defaultValue": false
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "identityGroup",
    "displayName": "Identity",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "userId",
        "displayName": "User ID",
        "simpleValueType": true
      },
      {
        "type": "TEXT",
        "name": "deviceId",
        "displayName": "Device ID",
        "simpleValueType": true
      },
      {
        "type": "CHECKBOX",
        "name": "optOut",
        "checkboxText": "Opt out of tracking",
        "simpleValueType": true,
        "defaultValue": false
      },
      {
        "type": "SELECT",
        "name": "identityStorage",
        "displayName": "Identity storage",
        "simpleValueType": true,
        "selectItems": [
          { "value": "", "displayValue": "(default)" },
          { "value": "cookie", "displayValue": "cookie" },
          { "value": "localStorage", "displayValue": "localStorage" },
          { "value": "sessionStorage", "displayValue": "sessionStorage" },
          { "value": "none", "displayValue": "none" }
        ],
        "defaultValue": ""
      },
      {
        "type": "TEXT",
        "name": "sessionTimeout",
        "displayName": "Session timeout (ms)",
        "simpleValueType": true,
        "valueValidators": [
          { "type": "POSITIVE_NUMBER" }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "trackingOptionsGroup",
    "displayName": "Tracking options",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "LABEL",
        "name": "trackingOptionsHelp",
        "displayName": "Leave unchecked to use SDK defaults (all enabled). Check a box to disable that field."
      },
      {
        "type": "CHECKBOX",
        "name": "disableIpAddress",
        "checkboxText": "Disable ipAddress",
        "simpleValueType": true,
        "defaultValue": false
      },
      {
        "type": "CHECKBOX",
        "name": "disableLanguage",
        "checkboxText": "Disable language",
        "simpleValueType": true,
        "defaultValue": false
      },
      {
        "type": "CHECKBOX",
        "name": "disablePlatform",
        "checkboxText": "Disable platform",
        "simpleValueType": true,
        "defaultValue": false
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "autocaptureGroup",
    "displayName": "Autocapture",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "SELECT",
        "name": "autocaptureMode",
        "displayName": "Autocapture mode",
        "simpleValueType": true,
        "selectItems": [
          { "value": "default", "displayValue": "(use SDK defaults)" },
          { "value": "enable_all", "displayValue": "Enable all" },
          { "value": "disable_all", "displayValue": "Disable all" },
          { "value": "custom", "displayValue": "Customize per-feature" }
        ],
        "defaultValue": "default"
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureAttribution",
        "checkboxText": "attribution",
        "simpleValueType": true,
        "defaultValue": true,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ],
        "subParams": [
          {
            "type": "GROUP",
            "name": "attributionOptionsGroup",
            "displayName": "Attribution options",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "CHECKBOX",
                "name": "attributionExcludeInternalReferrers",
                "checkboxText": "Exclude internal referrers",
                "simpleValueType": true,
                "defaultValue": false,
                "subParams": [
                  {
                    "type": "RADIO",
                    "name": "attributionExcludeInternalReferrersCondition",
                    "displayName": "Condition",
                    "simpleValueType": true,
                    "radioItems": [
                      { "value": "always", "displayValue": "Always" },
                      { "value": "ifEmptyCampaign", "displayValue": "If Empty Campaign" }
                    ],
                    "defaultValue": "always"
                  }
                ]
              },
              {
                "type": "TEXT",
                "name": "attributionInitialEmptyValue",
                "displayName": "Initial empty value",
                "simpleValueType": true,
                "valueHint": "EMPTY"
              },
              {
                "type": "TEXT",
                "name": "attributionExcludeReferrers",
                "displayName": "Exclude referrers (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "attributionExcludeReferrersRegex",
                "displayName": "Exclude referrers regex (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "CHECKBOX",
                "name": "attributionResetSession",
                "checkboxText": "Reset session on new campaign",
                "simpleValueType": true,
                "defaultValue": false
              }
            ]
          }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocapturePageViews",
        "checkboxText": "pageViews",
        "simpleValueType": true,
        "defaultValue": true,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ],
        "subParams": [
          {
            "type": "GROUP",
            "name": "pageViewOptionsGroup",
            "displayName": "Page view options",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "CHECKBOX",
                "name": "pageViewLegacy",
                "checkboxText": "Use legacy page view event type and properties",
                "simpleValueType": true,
                "defaultValue": false
              },
              {
                "type": "TEXT",
                "name": "pageViewType",
                "displayName": "Page view event type",
                "simpleValueType": true,
                "valueHint": "[Amplitude] Page Viewed"
              },
              {
                "type": "SELECT",
                "name": "pageHistoryTracking",
                "displayName": "History changes to track",
                "simpleValueType": true,
                "selectItems": [
                  { "value": "all", "displayValue": "All (default)" },
                  { "value": "path", "displayValue": "Path only" }
                ],
                "defaultValue": "all"
              }
            ]
          }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureSessions",
        "checkboxText": "sessions",
        "simpleValueType": true,
        "defaultValue": true,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureFileDownloads",
        "checkboxText": "fileDownloads",
        "simpleValueType": true,
        "defaultValue": true,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureFormInteractions",
        "checkboxText": "formInteractions",
        "simpleValueType": true,
        "defaultValue": true,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureElementInteractions",
        "checkboxText": "elementInteractions",
        "simpleValueType": true,
        "defaultValue": true,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ],
        "subParams": [
          {
            "type": "GROUP",
            "name": "elementInteractionsOptionsGroup",
            "displayName": "Element interactions options",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "TEXT",
                "name": "elementInteractionsCssSelectorAllowlist",
                "displayName": "CSS selector allowlist (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "elementInteractionsActionClickAllowlist",
                "displayName": "Action click allowlist (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "elementInteractionsPageUrlAllowlistString",
                "displayName": "Page URL allowlist (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "elementInteractionsPageUrlAllowlistRegex",
                "displayName": "Page URL allowlist regex (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "elementInteractionsDataAttributePrefixString",
                "displayName": "Data attribute prefix (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "elementInteractionsDataAttributePrefixRegex",
                "displayName": "Data attribute prefix regex (comma separated)",
                "simpleValueType": true
              }
            ]
          }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureFrustrationInteractions",
        "checkboxText": "frustrationInteractions",
        "simpleValueType": true,
        "defaultValue": false,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ],
        "subParams": [
          {
            "type": "GROUP",
            "name": "frustrationInteractionsOptionsGroup",
            "displayName": "Frustration interactions options",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "TEXT",
                "name": "rageClicksCssSelectorAllowlist",
                "displayName": "Rage clicks CSS selector allowlist (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "TEXT",
                "name": "deadClicksCssSelectorAllowlist",
                "displayName": "Dead clicks CSS selector allowlist (comma separated)",
                "simpleValueType": true
              }
            ]
          }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureNetworkTracking",
        "checkboxText": "networkTracking",
        "simpleValueType": true,
        "defaultValue": false,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ],
        "subParams": [
          {
            "type": "GROUP",
            "name": "networkTrackingOptionsGroup",
            "displayName": "Network tracking options",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "CHECKBOX",
                "name": "networkTrackingIgnoreAmplitudeRequests",
                "checkboxText": "Ignore requests made to Amplitude APIs",
                "simpleValueType": true,
                "defaultValue": true
              },
              {
                "type": "TEXT",
                "name": "networkTrackingIgnoreHosts",
                "displayName": "Ignore hosts (comma separated)",
                "simpleValueType": true
              },
              {
                "type": "PARAM_TABLE",
                "name": "networkTrackingCaptureRules",
                "displayName": "Capture rules",
                "paramTableColumns": [
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "urls",
                      "displayName": "URLs",
                      "simpleValueType": true
                    },
                    "isUnique": true
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "methods",
                      "displayName": "Methods",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "statusCodeRange",
                      "displayName": "Status Code Range",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "urlsRegex",
                      "displayName": "URLs Regex",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "responseHeaders",
                      "displayName": "Response Headers",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "responseBody",
                      "displayName": "Response Body",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "requestHeaders",
                      "displayName": "Request Headers",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  },
                  {
                    "param": {
                      "type": "TEXT",
                      "name": "requestBody",
                      "displayName": "Request Body",
                      "simpleValueType": true
                    },
                    "isUnique": false
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocaptureWebVitals",
        "checkboxText": "webVitals",
        "simpleValueType": true,
        "defaultValue": false,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "autocapturePageUrlEnrichment",
        "checkboxText": "pageUrlEnrichment",
        "simpleValueType": true,
        "defaultValue": false,
        "enablingConditions": [
          { "paramName": "autocaptureMode", "paramValue": "custom", "type": "EQUALS" }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "cookieOptionsGroup",
    "displayName": "Cookie options",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "cookieDomain",
        "displayName": "Cookie domain",
        "simpleValueType": true
      },
      {
        "type": "TEXT",
        "name": "cookieExpiration",
        "displayName": "Cookie expiration (days)",
        "simpleValueType": true,
        "valueValidators": [
          { "type": "POSITIVE_NUMBER" }
        ]
      },
      {
        "type": "SELECT",
        "name": "cookieSameSite",
        "displayName": "SameSite",
        "simpleValueType": true,
        "selectItems": [
          { "value": "", "displayValue": "(default)" },
          { "value": "Strict", "displayValue": "Strict" },
          { "value": "Lax", "displayValue": "Lax" },
          { "value": "None", "displayValue": "None" }
        ],
        "defaultValue": ""
      },
      {
        "type": "CHECKBOX",
        "name": "cookieSecure",
        "checkboxText": "Secure",
        "simpleValueType": true,
        "defaultValue": false
      },
      {
        "type": "CHECKBOX",
        "name": "cookieUpgrade",
        "checkboxText": "Upgrade legacy cookie",
        "simpleValueType": true,
        "defaultValue": false
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const makeNumber = require('makeNumber');

const config = {};

const setIfPresent = (key, value) => {
  if (value !== undefined && value !== null && value !== '') {
    config[key] = value;
  }
};

const setNumberIfPresent = (key, value) => {
  if (value !== undefined && value !== null && value !== '') {
    config[key] = makeNumber(value);
  }
};

// Core
setNumberIfPresent('logLevel', data.logLevel);
setIfPresent('serverUrl', data.serverUrl);
setIfPresent('appVersion', data.appVersion);
setIfPresent('partnerId', data.partnerId);
setNumberIfPresent('minIdLength', data.minIdLength);
setIfPresent('transport', data.transport);

// Event flushing
setNumberIfPresent('flushIntervalMillis', data.flushIntervalMillis);
setNumberIfPresent('flushQueueSize', data.flushQueueSize);
setNumberIfPresent('flushMaxRetries', data.flushMaxRetries);
if (data.useBatch === true) config.useBatch = true;

// Identity
setIfPresent('userId', data.userId);
setIfPresent('deviceId', data.deviceId);
if (data.optOut === true) config.optOut = true;
setIfPresent('identityStorage', data.identityStorage);
setNumberIfPresent('sessionTimeout', data.sessionTimeout);

// Tracking options (only emit keys the user explicitly disabled)
const trackingOptions = {};
if (data.disableIpAddress === true) trackingOptions.ipAddress = false;
if (data.disableLanguage === true) trackingOptions.language = false;
if (data.disablePlatform === true) trackingOptions.platform = false;
for (const k in trackingOptions) {
  config.trackingOptions = trackingOptions;
  break;
}

// Autocapture
const splitList = (value) => {
  if (!value) return undefined;
  const parts = value.split(',');
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const trimmed = parts[i].trim();
    if (trimmed) out.push(trimmed);
  }
  return out.length > 0 ? out : undefined;
};

const buildAttribution = () => {
  if (data.autocaptureAttribution !== true) return false;
  const opts = {};
  const excludeReferrers = splitList(data.attributionExcludeReferrers);
  if (excludeReferrers) opts.excludeReferrersText = excludeReferrers;
  const excludeReferrersRegex = splitList(data.attributionExcludeReferrersRegex);
  if (excludeReferrersRegex) opts.excludeReferrersRegex = excludeReferrersRegex;
  if (data.attributionExcludeInternalReferrers === true) {
    opts.excludeInternalReferrers = {
      condition: data.attributionExcludeInternalReferrersCondition || 'always'
    };
  }
  if (data.attributionResetSession === true) opts.resetSessionOnNewCampaign = true;
  if (data.attributionInitialEmptyValue) opts.initialEmptyValue = data.attributionInitialEmptyValue;
  let hasAny = false;
  for (const k in opts) { hasAny = true; break; }
  return hasAny ? opts : true;
};

const buildPageViews = () => {
  if (data.autocapturePageViews !== true) return false;
  const opts = {};
  if (data.pageViewType) opts.eventType = data.pageViewType;
  switch (data.pageHistoryTracking) {
    case 'path':
      opts.trackHistoryChanges = 'pathOnly';
      break;
    case 'all':
      opts.trackHistoryChanges = 'all';
      break;
  }
  let hasAny = false;
  for (const k in opts) { hasAny = true; break; }
  return hasAny ? opts : true;
};

const buildElementInteractions = () => {
  if (data.autocaptureElementInteractions !== true) return false;
  const opts = {};
  const css = splitList(data.elementInteractionsCssSelectorAllowlist);
  if (css) opts.cssSelectorAllowlist = css;
  const action = splitList(data.elementInteractionsActionClickAllowlist);
  if (action) opts.actionClickAllowlist = action;
  const pageUrl = splitList(data.elementInteractionsPageUrlAllowlistString);
  if (pageUrl) opts.pageUrlAllowlistString = pageUrl;
  const pageUrlRe = splitList(data.elementInteractionsPageUrlAllowlistRegex);
  if (pageUrlRe) opts.pageUrlAllowlistRegex = pageUrlRe;
  const dataAttr = splitList(data.elementInteractionsDataAttributePrefixString);
  if (dataAttr) opts.dataAttributePrefixString = dataAttr;
  const dataAttrRe = splitList(data.elementInteractionsDataAttributePrefixRegex);
  if (dataAttrRe) opts.dataAttributePrefixRegex = dataAttrRe;
  let hasAny = false;
  for (const k in opts) { hasAny = true; break; }
  return hasAny ? opts : true;
};

const buildFrustrationInteractions = () => {
  if (data.autocaptureFrustrationInteractions !== true) return false;
  const rage = splitList(data.rageClicksCssSelectorAllowlist);
  const dead = splitList(data.deadClicksCssSelectorAllowlist);
  if (!rage && !dead) return true;
  const opts = {};
  if (rage) opts.rageClicks = { cssSelectorAllowlist: rage };
  if (dead) opts.deadClicks = { cssSelectorAllowlist: dead };
  return opts;
};

const buildNetworkTracking = () => {
  if (data.autocaptureNetworkTracking !== true) return false;
  const opts = {};
  if (data.networkTrackingIgnoreAmplitudeRequests === true) {
    opts.ignoreAmplitudeRequests = true;
  }
  const ignoreHosts = splitList(data.networkTrackingIgnoreHosts);
  if (ignoreHosts) opts.ignoreHosts = ignoreHosts;
  if (data.networkTrackingCaptureRules && data.networkTrackingCaptureRules.length > 0) {
    const rules = [];
    for (let i = 0; i < data.networkTrackingCaptureRules.length; i++) {
      const rule = data.networkTrackingCaptureRules[i];
      const captureRule = {};
      const urls = splitList(rule.urls);
      if (urls) captureRule.urls = urls;
      const urlsRegex = splitList(rule.urlsRegex);
      if (urlsRegex) captureRule.urlsRegex = urlsRegex;
      const methods = splitList(rule.methods);
      if (methods) captureRule.methods = methods;
      if (rule.statusCodeRange) captureRule.statusCodeRange = rule.statusCodeRange;
      const responseHeaders = splitList(rule.responseHeaders);
      if (responseHeaders) captureRule.responseHeaders = responseHeaders;
      if (rule.responseBody) {
        captureRule.responseBody = { allowlist: splitList(rule.responseBody) };
      }
      const requestHeaders = splitList(rule.requestHeaders);
      if (requestHeaders) captureRule.requestHeaders = requestHeaders;
      if (rule.requestBody) {
        captureRule.requestBody = { allowlist: splitList(rule.requestBody) };
      }
      rules.push(captureRule);
    }
    opts.captureRules = rules;
  }
  let hasAny = false;
  for (const k in opts) { hasAny = true; break; }
  return hasAny ? opts : true;
};

if (data.autocaptureMode === 'enable_all') {
  config.autocapture = true;
} else if (data.autocaptureMode === 'disable_all') {
  config.autocapture = false;
} else if (data.autocaptureMode === 'custom') {
  config.autocapture = {
    attribution: buildAttribution(),
    pageViews: buildPageViews(),
    sessions: data.autocaptureSessions === true,
    fileDownloads: data.autocaptureFileDownloads === true,
    formInteractions: data.autocaptureFormInteractions === true,
    elementInteractions: buildElementInteractions(),
    frustrationInteractions: buildFrustrationInteractions(),
    networkTracking: buildNetworkTracking(),
    webVitals: data.autocaptureWebVitals === true,
    pageUrlEnrichment: data.autocapturePageUrlEnrichment === true
  };
}

// Cookie options (only emit keys the user set)
const cookieOptions = {};
if (data.cookieDomain) cookieOptions.domain = data.cookieDomain;
if (data.cookieExpiration !== undefined && data.cookieExpiration !== '') {
  cookieOptions.expiration = makeNumber(data.cookieExpiration);
}
if (data.cookieSameSite) cookieOptions.sameSite = data.cookieSameSite;
if (data.cookieSecure === true) cookieOptions.secure = true;
if (data.cookieUpgrade === true) cookieOptions.upgrade = true;
for (const k in cookieOptions) {
  config.cookieOptions = cookieOptions;
  break;
}

return config;


___WEB_PERMISSIONS___

[]


___TESTS___

scenarios: []


___NOTES___

Prototype: companion Variable Template for the Amplitude Analytics Browser SDK
tag template's "Configuration" init option. Users select this variable in the
tag template's Configuration field (which already has macrosInSelect: true).

This template has its own 100-field budget independent of the tag template,
allowing complex configuration UIs to live here rather than consuming slots
in the tag template.
