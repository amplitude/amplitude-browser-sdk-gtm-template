export type GtmData = {
  // Core properties
  apiKey: string;
  type: 'init' | 'track' | 'identify' | 'group' | 'pageView' | 'session' | 'setUserId' | 'setGroup' | 'groupIdentify' | 'revenue' | 'flush' | 'setDeviceId' | 'setSessionId' | 'reset' | 'setOptOut';
  instanceName?: string;
  gtmOnSuccess: () => void;
  gtmOnFailure: () => void;

  // Initialization properties
  initUserId?: string | null;
  initOptions?: string | object;
  initManualOptions?: Array<{key: string, value: any}>;
  initTrackingOptions?: Array<{key: string, value: any}>;
  initCookieOptions?: Array<{key: string, value: any}>;
  euData?: boolean;

  // User agent enrichment
  userAgentEnrichment?: boolean;
  osName?: string;
  osVersion?: string;
  deviceManufacturer?: string;
  deviceModel?: string;

  // Plugins
  sessionReplay?: boolean;
  guidesSurveys?: boolean;

  // Default event tracking
  defaultEventTracking?: boolean;
  
  // Attribution tracking
  detAttribution?: boolean;
  attributionExcludeReferrers?: string | string[];
  attributionExcludeReferrersRegex?: string | string[];
  attributionResetSession?: boolean;
  attributionInitialEmptyValue?: string;

  // Page view tracking
  detPageView?: boolean;
  pageViewLegacy?: boolean;
  pageViewType?: string;
  pageHistoryTracking?: string;

  // Session tracking
  detSession?: boolean;

  // File download tracking
  detFileDownload?: boolean;

  // Form interaction tracking
  detFormInteraction?: boolean;

  // Element interactions
  autocaptureElementInteractions?: boolean;
  elementInteractionsCssSelectorAllowlist?: string | string[];
  elementInteractionsActionClickAllowlist?: string | string[];
  elementInteractionsPageUrlAllowlistString?: string | string[];
  elementInteractionsPageUrlAllowlistRegex?: string | string[];
  elementInteractionsDataAttributePrefixString?: string | string[];
  elementInteractionsDataAttributePrefixRegex?: string | string[];

  // Network tracking
  autocaptureNetworkTracking?: boolean;
  networkTrackingIgnoreAmplitudeRequests?: string | boolean;
  networkTrackingIgnoreHosts?: string;
  networkTrackingCaptureRules?: Array<{
    urls?: string;
    urlsRegex?: string;
    methods?: string;
    statusCodeRange?: string;
  }>;

  // User properties
  userPropertyOperations?: Array<{
    command: string;
    userProperty: string;
    value: any;
  }>;
  userPropertyOperationsObject?: {
    user_properties?: {[key: string]: any};
  };

  // Event tracking
  eventType?: string;
  eventProperties?: Array<{name: string, value: any}>;
  eventPropertiesObject?: {[key: string]: any};
  trackWithGroups?: boolean;
  trackEventGroups?: Array<{
    eventGroupType: string;
    eventGroupName: string;
  }>;
  trackTimestamp?: any;

  // Group operations
  groupType?: string;
  groupName?: string;
  identifyGroupType?: string;
  identifyGroupName?: string;

  // Revenue tracking
  revenueFromVariable?: boolean;
  revenueVariable?: {
    productId?: string;
    id?: string;
    price?: number;
    quantity?: number;
    revenue?: number;
    revenueType?: string;
    eventProperties?: {[key: string]: any};
    currency?: string;
    receipt?: string;
    receiptSig?: string;
  };
  revenueId?: string;
  revenuePrice?: number;
  revenueQuantity?: number;
  revenue?: number;
  revenueType?: string;
  revenueEventProperties?: Array<{name: string, value: any}>;
  revenueCurrency?: string;
  revenueReceipt?: string;
  revenueReceiptSignature?: string;

  // Device ID
  setDeviceId?: string | null | undefined;

  // Session ID
  setSessionId?: string;

  // User ID
  setUserId?: string;

  // Opt Out
  setOptOut?: boolean;

  // Dynamic property access for type-specific operations
  [key: string]: any;
}
