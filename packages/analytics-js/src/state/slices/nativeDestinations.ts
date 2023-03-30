import { Signal, signal } from '@preact/signals-core';
import { DestinationConfig } from '@rudderstack/analytics-js/components/configManager/types';
import { IntegrationOpts } from './loadOptions';

export type ClientIntegrations = {
  name: string;
  config: DestinationConfig;
};

export type IntegrationInstance = {
  isLoaded: () => boolean;
  isReady?: () => boolean;
};

// TODO: is this still used? only lotame used it
export type ClientSuppliedCallbacks = {
  syncPixel?: () => void;
};

// TODO: is this still used? only lotame used it
export type MethodToCallbackMap = {
  syncPixel: string;
};

// TODO: is this still used? const intMod = window[pluginName];
export type DynamicallyLoadedIntegration = Record<string, any>;

export type NativeDestinationsState = {
  clientIntegrations: Signal<ClientIntegrations[]>;
  loadOnlyIntegrations: Signal<IntegrationOpts>;
  clientIntegrationObjects: Signal<IntegrationInstance[] | undefined>;
  successfullyLoadedIntegration: Signal<IntegrationInstance[]>;
  failedToBeLoadedIntegration: Signal<IntegrationInstance[]>;
  clientSuppliedCallbacks: Signal<ClientSuppliedCallbacks | undefined>;
  methodToCallbackMapping: Signal<MethodToCallbackMap | undefined>;
  loadIntegration: Signal<boolean>;
  integrationsData: Signal<Record<string, any>>;
  dynamicallyLoadedIntegrations: Signal<Record<string, DynamicallyLoadedIntegration>>;
  clientIntegrationsReady: Signal<boolean>;
};

const dummyIntegrationConfigToDelete: ClientIntegrations[] = [
  {
    name: 'GA',
    config: {
      trackingID: 'UA-179234741-1',
      doubleClick: false,
      enhancedLinkAttribution: false,
      includeSearch: false,
      trackCategorizedPages: true,
      trackNamedPages: true,
      useRichEventNames: false,
      sampleRate: '100',
      siteSpeedSampleRate: '1',
      resetCustomDimensionsOnPage: [
        {
          resetCustomDimensionsOnPage: '',
        },
      ],
      setAllMappedProps: true,
      anonymizeIp: false,
      domain: 'auto',
      enhancedEcommerce: false,
      nonInteraction: false,
      optimize: '',
      sendUserId: false,
      useGoogleAmpClientId: false,
      namedTracker: false,
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      oneTrustCookieCategories: [
        {
          oneTrustCookieCategory: '',
        },
      ],
      eventFilteringOption: 'disable',
    },
  },
];

const nativeDestinationsState: NativeDestinationsState = {
  clientIntegrations: signal(dummyIntegrationConfigToDelete), // TODO: make default as [] once dummy is removed
  loadOnlyIntegrations: signal({}),
  clientIntegrationObjects: signal(undefined),
  successfullyLoadedIntegration: signal([]),
  failedToBeLoadedIntegration: signal([]),
  clientSuppliedCallbacks: signal(undefined),
  methodToCallbackMapping: signal({
    syncPixel: 'syncPixelCallback',
  }),
  loadIntegration: signal(true),
  integrationsData: signal({}),
  dynamicallyLoadedIntegrations: signal({}),
  clientIntegrationsReady: signal(false),
};

export { nativeDestinationsState };
