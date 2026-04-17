import * as amplitude from '@amplitude/analytics-browser';
import { Identify } from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = '84ace0d2f36082f53ba6988af698a0b6';

export const initAmplitude = () => {
  amplitude.init(AMPLITUDE_API_KEY, undefined, {
    defaultTracking: true,
  });

  const identifyObj = new Identify();
  
  // Mobile specific properties
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);

  identifyObj.set('platform', 'mobile_web');
  identifyObj.set('is_pwa', isPWA);
  identifyObj.set('device_type', 'mobile');
  identifyObj.set('install_source', isPWA ? 'home_screen' : 'browser');
  identifyObj.set('viewport_width', window.innerWidth);
  identifyObj.set('viewport_height', window.innerHeight);
  identifyObj.set('os', isIOS ? 'iOS' : isAndroid ? 'Android' : 'other');

  amplitude.identify(identifyObj);
};

export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  amplitude.track(eventName, eventProperties);
};

// Lifecycle events
export const initLifecycleTracking = () => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      trackEvent('app_foregrounded');
    } else {
      trackEvent('app_backgrounded');
    }
  });

  if (window.matchMedia('(display-mode: standalone)').matches) {
    trackEvent('pwa_launched_from_home_screen');
  }
};
