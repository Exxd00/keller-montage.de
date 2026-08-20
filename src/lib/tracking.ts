// Tracking Utility for GCLID, UTM Parameters, Source Detection
// تتبع مصدر الزيارات وGoogle Ads

interface TrackingData {
  gclid: string | null;
  source: string;
  medium: string;
  campaign: string;
  page: string;
  referrer: string;
}

// Get URL parameters
function getUrlParam(param: string): string | null {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Store tracking data in localStorage
function storeTrackingData(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
    // Also store timestamp
    localStorage.setItem(`${key}_timestamp`, Date.now().toString());
  } catch {
    // Ignore storage errors
  }
}

// Get stored tracking data
function getStoredTrackingData(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(key);
    const timestamp = localStorage.getItem(`${key}_timestamp`);

    // Check if data is still valid (30 days)
    if (timestamp) {
      const age = Date.now() - parseInt(timestamp);
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (age > thirtyDays) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_timestamp`);
        return null;
      }
    }

    return value;
  } catch {
    return null;
  }
}

// Detect traffic source
function detectSource(): string {
  if (typeof window === 'undefined') return 'Direct';

  // Check for GCLID (Google Ads)
  const gclid = getUrlParam('gclid');
  if (gclid) return 'Google Ads';

  // Check for UTM source
  const utmSource = getUrlParam('utm_source');
  if (utmSource) {
    if (utmSource.toLowerCase().includes('google')) return 'Google Ads';
    if (utmSource.toLowerCase().includes('facebook')) return 'Facebook';
    if (utmSource.toLowerCase().includes('instagram')) return 'Instagram';
    return utmSource;
  }

  // Check referrer
  const referrer = document.referrer;
  if (!referrer) return 'Direct';

  try {
    const refUrl = new URL(referrer);
    const refHost = refUrl.hostname.toLowerCase();

    if (refHost.includes('google')) return 'Google Organic';
    if (refHost.includes('bing')) return 'Bing Organic';
    if (refHost.includes('facebook')) return 'Facebook';
    if (refHost.includes('instagram')) return 'Instagram';
    if (refHost.includes('twitter') || refHost.includes('x.com')) return 'Twitter/X';
    if (refHost.includes('linkedin')) return 'LinkedIn';
    if (refHost.includes('youtube')) return 'YouTube';

    // Same domain = Direct
    if (refHost === window.location.hostname) return 'Direct';

    return 'Referral: ' + refHost;
  } catch {
    return 'Unknown';
  }
}

// Initialize tracking on page load
export function initTracking(): void {
  if (typeof window === 'undefined') return;

  // Capture GCLID from URL and store it
  const gclid = getUrlParam('gclid');
  if (gclid) {
    storeTrackingData('gclid', gclid);
  }

  // Capture UTM parameters
  const utmSource = getUrlParam('utm_source');
  const utmMedium = getUrlParam('utm_medium');
  const utmCampaign = getUrlParam('utm_campaign');

  if (utmSource) storeTrackingData('utm_source', utmSource);
  if (utmMedium) storeTrackingData('utm_medium', utmMedium);
  if (utmCampaign) storeTrackingData('utm_campaign', utmCampaign);

  // Store first source if not already stored
  const existingSource = getStoredTrackingData('first_source');
  if (!existingSource) {
    storeTrackingData('first_source', detectSource());
  }

  // Always update last source
  storeTrackingData('last_source', detectSource());
}

// Get all tracking data for form submission
export function getTrackingData(): TrackingData {
  const gclid = getStoredTrackingData('gclid') || getUrlParam('gclid');
  const source = getStoredTrackingData('last_source') || detectSource();
  const medium = getStoredTrackingData('utm_medium') || getUrlParam('utm_medium') || '';
  const campaign = getStoredTrackingData('utm_campaign') || getUrlParam('utm_campaign') || '';
  const page = typeof window !== 'undefined' ? window.location.href : '';
  const referrer = typeof document !== 'undefined' ? document.referrer : '';

  return {
    gclid,
    source,
    medium,
    campaign,
    page,
    referrer,
  };
}

// Get GCLID specifically
export function getGCLID(): string | null {
  return getStoredTrackingData('gclid') || getUrlParam('gclid');
}

// Get current page URL
export function getCurrentPage(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

// Get traffic source
export function getTrafficSource(): string {
  return getStoredTrackingData('last_source') || detectSource();
}
