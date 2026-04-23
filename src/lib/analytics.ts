// ============================================
// KELLER MONTAGE - ANALYTICS & TRACKING SYSTEM
// Google Analytics ID: G-N15LLLP7VV
// ============================================

export const GA_MEASUREMENT_ID = "G-N15LLLP7VV";

// Declare gtag type
type GtagCommand = 'config' | 'event' | 'js' | 'set';
interface GtagItem {
  item_id?: string;
  item_name?: string;
  item_category?: string;
  price?: number;
  quantity?: number;
}
type GtagEventParams = Record<string, string | number | boolean | string[] | GtagItem[] | undefined>;

declare global {
  interface Window {
    gtag: (command: GtagCommand, targetId: string, params?: GtagEventParams) => void;
    dataLayer: GtagEventParams[];
  }
}

// ============================================
// CORE TRACKING FUNCTIONS
// ============================================

/**
 * Track a custom event to Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventParams: GtagEventParams = {}
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
    console.log("📊 Event tracked:", eventName, eventParams);
  }
}

/**
 * Track a page view
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
}

// ============================================
// 1. LEAD GENERATION EVENTS (HIGH VALUE)
// ============================================

/**
 * Track phone call click - Primary conversion
 */
export function trackPhoneCall(phoneNumber: string, source?: string) {
  trackEvent("generate_lead", {
    event_category: "Lead",
    event_label: "Phone Call",
    value: 50,
    currency: "EUR",
    lead_source: "phone",
    phone_number: phoneNumber,
    click_source: source || "unknown",
  });

  trackEvent("click_to_call", {
    event_category: "Contact",
    event_label: phoneNumber,
    phone_number: phoneNumber,
    page_location: typeof window !== "undefined" ? window.location.pathname : "",
  });

  // Google Ads conversion
  trackEvent("conversion", {
    send_to: GA_MEASUREMENT_ID,
    event_category: "Conversion",
    event_label: "Phone Call Initiated",
    value: 50,
    currency: "EUR",
  });
}

/**
 * Track WhatsApp click - Primary conversion
 */
export function trackWhatsAppClick(source?: string) {
  trackEvent("generate_lead", {
    event_category: "Lead",
    event_label: "WhatsApp",
    value: 50,
    currency: "EUR",
    lead_source: "whatsapp",
    click_source: source || "unknown",
  });

  trackEvent("whatsapp_click", {
    event_category: "Contact",
    event_label: "WhatsApp Message",
    page_location: typeof window !== "undefined" ? window.location.pathname : "",
  });

  // Google Ads conversion
  trackEvent("conversion", {
    send_to: GA_MEASUREMENT_ID,
    event_category: "Conversion",
    event_label: "WhatsApp Click",
    value: 50,
    currency: "EUR",
  });
}

/**
 * Track form submission - Primary conversion
 */
export function trackFormSubmission(formData: {
  service?: string;
  city?: string;
  formName?: string;
}) {
  // Main lead event
  trackEvent("generate_lead", {
    event_category: "Lead",
    event_label: "Form Submission",
    value: 100,
    currency: "EUR",
    lead_source: "contact_form",
    service_type: formData.service || "unknown",
    city: formData.city || "unknown",
  });

  // Form submit event
  trackEvent("form_submit", {
    event_category: "Form",
    event_label: formData.formName || "Contact Form",
    form_name: formData.formName || "contact_form",
    service: formData.service || "unknown",
  });

  // Conversion event for Google Ads
  trackEvent("conversion", {
    send_to: GA_MEASUREMENT_ID,
    event_category: "Conversion",
    event_label: "Lead Form Submitted",
    value: 100,
    currency: "EUR",
  });
}

// ============================================
// 2. THANK YOU PAGE EVENTS (CONVERSION COMPLETE)
// ============================================

/**
 * Track thank you page view - Conversion confirmation
 */
export function trackThankYouPage() {
  // Thank you page view
  trackEvent("thank_you_page", {
    event_category: "Conversion",
    event_label: "Thank You Page View",
    value: 100,
    currency: "EUR",
  });

  // Purchase equivalent for lead value
  trackEvent("purchase", {
    transaction_id: "LEAD_" + Date.now(),
    value: 100,
    currency: "EUR",
    items: [
      {
        item_name: "Lead - Küchenmontage Anfrage",
        item_category: "Lead",
        price: 100,
        quantity: 1,
      },
    ],
  });

  // Conversion complete event
  trackEvent("conversion_complete", {
    event_category: "Conversion",
    event_label: "Lead Submitted Successfully",
    send_to: GA_MEASUREMENT_ID,
  });
}

// ============================================
// 3. ENGAGEMENT EVENTS
// ============================================

/**
 * Track service card click
 */
export function trackServiceClick(serviceName: string) {
  trackEvent("select_content", {
    event_category: "Engagement",
    event_label: serviceName,
    content_type: "service",
    item_id: serviceName,
  });

  trackEvent("service_interest", {
    event_category: "Services",
    event_label: serviceName,
    service_name: serviceName,
  });
}

/**
 * Track CTA button click
 */
export function trackCTAClick(ctaName: string, ctaLocation?: string) {
  trackEvent("cta_click", {
    event_category: "Engagement",
    event_label: ctaName,
    cta_name: ctaName,
    cta_location: ctaLocation || "unknown",
    page_location: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track FAQ interaction
 */
export function trackFAQInteraction(question: string, isOpen: boolean) {
  trackEvent("faq_interaction", {
    event_category: "Engagement",
    event_label: question,
    content_type: "faq",
    action: isOpen ? "open" : "close",
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent("scroll_depth", {
    event_category: "Engagement",
    event_label: `${depth}%`,
    value: depth,
  });
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number) {
  trackEvent("time_on_page", {
    event_category: "Engagement",
    event_label: `${seconds} seconds`,
    value: seconds,
  });
}

// ============================================
// 4. FORM INTERACTION EVENTS
// ============================================

/**
 * Track form field focus
 */
export function trackFormFieldFocus(fieldName: string, formName?: string) {
  trackEvent("form_field_focus", {
    event_category: "Form",
    event_label: fieldName,
    form_name: formName || "contact_form",
    field_name: fieldName,
  });
}

/**
 * Track form step change
 */
export function trackFormStep(step: number, totalSteps: number) {
  trackEvent("form_progress", {
    event_category: "Form",
    event_label: `Step ${step} of ${totalSteps}`,
    step_number: step,
    total_steps: totalSteps,
  });
}

/**
 * Track form error
 */
export function trackFormError(fieldName: string, errorMessage: string) {
  trackEvent("form_error", {
    event_category: "Form",
    event_label: fieldName,
    error_field: fieldName,
    error_message: errorMessage,
  });
}

// ============================================
// 5. NAVIGATION EVENTS
// ============================================

/**
 * Track outbound link click
 */
export function trackOutboundLink(url: string) {
  trackEvent("outbound_link", {
    event_category: "Outbound",
    event_label: url,
    transport_type: "beacon",
  });
}

/**
 * Track internal navigation
 */
export function trackNavigation(from: string, to: string) {
  trackEvent("internal_navigation", {
    event_category: "Navigation",
    event_label: to,
    from_page: from,
    to_page: to,
  });
}

// ============================================
// 6. E-COMMERCE-LIKE EVENTS (for lead tracking)
// ============================================

/**
 * Track service view (like product view)
 */
export function trackServiceView(serviceName: string, serviceId: string) {
  trackEvent("view_item", {
    event_category: "Services",
    event_label: serviceName,
    items: [
      {
        item_id: serviceId,
        item_name: serviceName,
        item_category: "Dienstleistung",
      },
    ],
  });
}

/**
 * Track begin checkout (form start)
 */
export function trackFormStart(service?: string) {
  trackEvent("begin_checkout", {
    event_category: "Form",
    event_label: "Form Started",
    service_type: service || "unknown",
    items: [
      {
        item_name: service || "Anfrage",
        item_category: "Lead",
      },
    ],
  });
}

// ============================================
// 7. USER INTERACTION EVENTS
// ============================================

/**
 * Track image gallery interaction
 */
export function trackGalleryInteraction(action: string, imageName?: string) {
  trackEvent("gallery_interaction", {
    event_category: "Engagement",
    event_label: action,
    image_name: imageName || "unknown",
  });
}

/**
 * Track testimonial view
 */
export function trackTestimonialView(index: number, customerName?: string) {
  trackEvent("testimonial_view", {
    event_category: "Engagement",
    event_label: `Testimonial ${index + 1}`,
    testimonial_index: index,
    customer_name: customerName || "anonymous",
  });
}

/**
 * Track video interaction
 */
export function trackVideoInteraction(
  action: "play" | "pause" | "complete",
  videoName?: string
) {
  trackEvent("video_interaction", {
    event_category: "Engagement",
    event_label: action,
    video_action: action,
    video_name: videoName || "unknown",
  });
}

// ============================================
// 8. CITY/LOCATION EVENTS
// ============================================

/**
 * Track city selection
 */
export function trackCitySelection(cityName: string) {
  trackEvent("city_selected", {
    event_category: "Location",
    event_label: cityName,
    city_name: cityName,
  });
}

/**
 * Track service area view
 */
export function trackServiceAreaView(cityName: string, serviceName: string) {
  trackEvent("service_area_view", {
    event_category: "Location",
    event_label: `${cityName} - ${serviceName}`,
    city_name: cityName,
    service_name: serviceName,
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Initialize analytics event listeners (call once on app load)
 */
export function initializeAnalyticsListeners() {
  if (typeof window === "undefined") return;

  // Scroll depth tracking
  const scrollDepths = [25, 50, 75, 90, 100];
  const scrolledDepths: number[] = [];

  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );

    scrollDepths.forEach((depth) => {
      if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
        scrolledDepths.push(depth);
        trackScrollDepth(depth);
      }
    });
  });

  // Time on page tracking
  const pageStartTime = Date.now();
  const timeIntervals = [30, 60, 120, 300];
  const trackedIntervals: number[] = [];

  setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);

    timeIntervals.forEach((interval) => {
      if (timeOnPage >= interval && !trackedIntervals.includes(interval)) {
        trackedIntervals.push(interval);
        trackTimeOnPage(interval);
      }
    });
  }, 5000);

  // Phone click tracking
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest('a[href^="tel:"]');
    if (link) {
      const phoneNumber =
        link.getAttribute("href")?.replace("tel:", "") || "";
      const source = link.getAttribute("data-source") || "unknown";
      trackPhoneCall(phoneNumber, source);
    }
  });

  // WhatsApp click tracking
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest('a[href*="wa.me"]');
    if (link) {
      const source = link.getAttribute("data-source") || "unknown";
      trackWhatsAppClick(source);
    }
  });

  // Service card click tracking
  document.addEventListener("click", (e) => {
    const serviceCard = (e.target as HTMLElement).closest("[data-service]");
    if (serviceCard) {
      const serviceName = serviceCard.getAttribute("data-service") || "";
      trackServiceClick(serviceName);
    }
  });

  // CTA button click tracking
  document.addEventListener("click", (e) => {
    const ctaButton = (e.target as HTMLElement).closest("[data-cta]");
    if (ctaButton) {
      const ctaName = ctaButton.getAttribute("data-cta") || "";
      const ctaLocation = ctaButton.getAttribute("data-cta-location") || "";
      trackCTAClick(ctaName, ctaLocation);
    }
  });

  // FAQ interaction tracking
  document.addEventListener("click", (e) => {
    const faqItem = (e.target as HTMLElement).closest("[data-faq]");
    if (faqItem) {
      const question = faqItem.getAttribute("data-faq") || "";
      const isOpen = faqItem.getAttribute("data-faq-open") === "true";
      trackFAQInteraction(question, !isOpen);
    }
  });

  // Form field focus tracking
  document.addEventListener(
    "focus",
    (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        const fieldName =
          (target as HTMLInputElement).name ||
          (target as HTMLInputElement).id ||
          "unknown";
        trackFormFieldFocus(fieldName);
      }
    },
    true
  );

  // Outbound link tracking
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest('a[href^="http"]');
    if (link) {
      const href = link.getAttribute("href") || "";
      if (!href.includes(window.location.hostname)) {
        trackOutboundLink(href);
      }
    }
  });
}
