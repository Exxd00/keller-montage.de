/**
 * Analytics & Lead Tracking Utility
 * Supports Google Analytics 4, Facebook Pixel, Google Sheets, and custom events
 */

import { getTrackingData, getGCLID, getCurrentPage, getTrafficSource } from './tracking';

const EVENT_NAMESPACE = 'moebelmontage_nuer';

const eventNames: Partial<Record<EventAction, string>> = {
  form_submit: `${EVENT_NAMESPACE}_form_submit`,
  form_start: `${EVENT_NAMESPACE}_form_start`,
  form_step: `${EVENT_NAMESPACE}_form_step`,
  form_error: `${EVENT_NAMESPACE}_form_error`,
  phone_click: `${EVENT_NAMESPACE}_phone_click`,
  phone_confirmed: `${EVENT_NAMESPACE}_phone_click`,
  whatsapp_click: `${EVENT_NAMESPACE}_whatsapp_open`,
  whatsapp_confirmed: `${EVENT_NAMESPACE}_whatsapp_confirm`,
  email_click: `${EVENT_NAMESPACE}_email_click`,
  cta_click: `${EVENT_NAMESPACE}_primary_cta_click`,
};

// Send event to Google Sheets via API
// Only called for confirmed actions: phone_call, whatsapp, form
async function sendToGoogleSheets(
  eventType: 'phone_call' | 'whatsapp' | 'form',
  source: string,
  phoneNumber?: string
): Promise<void> {
  try {
    // Get tracking data
    const tracking = getTrackingData();

    await fetch('/api/track-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        source,
        phoneNumber,
        // Tracking data
        gclid: tracking.gclid,
        trafficSource: tracking.source,
        page: tracking.page,
      }),
    });
  } catch (error) {
    console.error('Failed to send event to Google Sheets:', error);
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Event types for type safety
export type EventCategory =
  | 'contact'
  | 'engagement'
  | 'navigation'
  | 'conversion'
  | 'lead';

export type EventAction =
  | 'form_submit'
  | 'form_start'
  | 'form_step'
  | 'form_error'
  | 'phone_click'
  | 'phone_confirmed'
  | 'phone_cancelled'
  | 'whatsapp_click'
  | 'whatsapp_confirmed'
  | 'whatsapp_cancelled'
  | 'email_click'
  | 'cta_click'
  | 'service_view'
  | 'city_view'
  | 'scroll_depth'
  | 'time_on_page'
  | 'lead_generated';

interface TrackEventParams {
  action: EventAction;
  category: EventCategory;
  label?: string;
  value?: number;
  customParams?: Record<string, unknown>;
}

interface TrackLeadParams {
  source: string;
  service?: string;
  city?: string;
  phone?: string;
  email?: string;
  value?: number;
}

// Track general events
export function trackEvent({ action, category, label, value, customParams }: TrackEventParams): void {
  const eventName = eventNames[action] || `${EVENT_NAMESPACE}_${action}`;
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams,
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    const fbEvent = mapToFacebookEvent(action);
    if (fbEvent) {
      window.fbq('track', fbEvent, {
        content_category: category,
        content_name: label,
        value: value,
        ...customParams,
      });
    }
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event tracked:', { eventName, category, label, value, customParams });
  }
}

// Track lead generation
export function trackLead({ source, service, city, phone, email, value }: TrackLeadParams): void {
  const leadData = {
    lead_source: source,
    service_type: service,
    city: city,
    has_phone: !!phone,
    has_email: !!email,
    estimated_value: value || 59, // Default minimum value
    timestamp: new Date().toISOString(),
  };

  // Google Analytics 4 - Lead event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'EUR',
      value: value || 59,
      ...leadData,
    });
  }

  // Facebook Pixel - Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: service || 'General Inquiry',
      content_category: source,
      value: value || 59,
      currency: 'EUR',
    });
  }

  // Store lead in localStorage for retargeting
  try {
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('leads', JSON.stringify(existingLeads.slice(-10))); // Keep last 10
  } catch {
    // Ignore storage errors
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('🎯 Lead tracked:', leadData);
  }
}

// Track phone call clicks (GA4 only, no Google Sheets)
export function trackPhoneClick(phoneNumber: string, source: string): void {
  trackEvent({
    action: 'phone_click',
    category: 'contact',
    label: source,
    customParams: {
      phone_number: phoneNumber,
      click_source: source,
    },
  });
}

// Track WhatsApp clicks (GA4 only, no Google Sheets)
export function trackWhatsAppClick(source: string): void {
  trackEvent({
    action: 'whatsapp_click',
    category: 'contact',
    label: source,
  });
}

// Track WhatsApp confirmation - SENDS TO GOOGLE SHEETS
export function trackWhatsAppConfirmed(source: string): void {
  trackEvent({
    action: 'whatsapp_confirmed',
    category: 'conversion',
    label: source,
  });

  // Send to Google Sheets as 'whatsapp' event type
  sendToGoogleSheets('whatsapp', source);

  trackLead({
    source: 'whatsapp',
    value: 40,
  });

}

// Track WhatsApp cancellation (GA4 only, no Google Sheets)
export function trackWhatsAppCancelled(source: string): void {
  trackEvent({
    action: 'whatsapp_cancelled',
    category: 'engagement',
    label: source,
  });
}

// Track phone confirmation - SENDS TO GOOGLE SHEETS
export function trackPhoneConfirmed(phoneNumber: string, source: string): void {
  trackEvent({
    action: 'phone_confirmed',
    category: 'conversion',
    label: source,
    customParams: {
      phone_number: phoneNumber,
      click_source: source,
    },
  });

  // Send to Google Sheets as 'phone_call' event type
  sendToGoogleSheets('phone_call', source, phoneNumber);

  trackLead({
    source: 'phone_call',
    value: 50,
  });

}

// Track phone cancellation (GA4 only, no Google Sheets)
export function trackPhoneCancelled(source: string): void {
  trackEvent({
    action: 'phone_cancelled',
    category: 'engagement',
    label: source,
  });
}

// Track CTA button clicks
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaName} - ${location}`,
  });
}

// Track form interactions
export function trackFormStart(formName: string): void {
  trackEvent({
    action: 'form_start',
    category: 'engagement',
    label: formName,
  });
}

export function trackFormSubmit(formName: string, service?: string, city?: string): void {
  trackEvent({
    action: 'form_submit',
    category: 'conversion',
    label: formName,
    customParams: {
      service_type: service,
      city: city,
    },
  });

  trackLead({
    source: formName,
    service: service,
    city: city,
    value: getServiceValue(service),
  });
}

// Track page/service views
export function trackServiceView(serviceName: string): void {
  trackEvent({
    action: 'service_view',
    category: 'engagement',
    label: serviceName,
  });
}

export function trackCityView(cityName: string): void {
  trackEvent({
    action: 'city_view',
    category: 'engagement',
    label: cityName,
  });
}

// Track scroll depth
export function trackScrollDepth(percentage: number): void {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
    });
  }
}

// Helper: Map events to Facebook standard events
function mapToFacebookEvent(action: EventAction): string | null {
  const mapping: Partial<Record<EventAction, string>> = {
    form_submit: 'Lead',
    phone_click: 'Contact',
    whatsapp_click: 'Contact',
    cta_click: 'InitiateCheckout',
    service_view: 'ViewContent',
  };
  return mapping[action] || null;
}

// Helper: Get estimated service value
function getServiceValue(service?: string): number {
  if (!service) return 59;

  const values: Record<string, number> = {
    lieferungen: 39,
    moebelmontage: 89,
    kuechenmontage: 249,
  };

  return values[service] || 59;
}

// Initialize scroll tracking
export function initScrollTracking(): void {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Initialize time on page tracking
export function initTimeTracking(): void {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // seconds
  const tracked = new Set<number>();

  const checkTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    for (const interval of intervals) {
      if (elapsed >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        trackEvent({
          action: 'time_on_page',
          category: 'engagement',
          label: `${interval}s`,
          value: interval,
        });
      }
    }
  };

  setInterval(checkTime, 5000);
}
