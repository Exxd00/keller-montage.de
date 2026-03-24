import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { META, BUSINESS } from "@/lib/constants";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: META.title,
    template: `%s | ${BUSINESS.fullName}`,
  },
  description: META.description,
  keywords: META.keywords,
  authors: [{ name: BUSINESS.fullName }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: META.title,
    description: META.description,
    url: `https://${BUSINESS.domain}`,
    siteName: BUSINESS.fullName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/hero-desktop.jpg",
        width: 1200,
        height: 630,
        alt: BUSINESS.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: ["/images/hero-desktop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `https://${BUSINESS.domain}`,
  },
  verification: {
    google: "add-your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS.fullName,
    "description": META.description,
    "url": `https://${BUSINESS.domain}`,
    "telephone": BUSINESS.phone,
    "email": BUSINESS.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS.address,
      "addressLocality": BUSINESS.city,
      "postalCode": BUSINESS.postalCode,
      "addressCountry": "DE"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "120"
    }
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) - Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });

            // ============================================
            // KELLER MONTAGE - COMPREHENSIVE EVENT TRACKING
            // Analytics ID: ${GA_MEASUREMENT_ID}
            // ============================================
            //
            // MAIN CONVERSION EVENTS (4 Primary):
            // 1. thank_you_page - When user reaches thank you page
            // 2. form_submit - When contact form is submitted
            // 3. whatsapp_click - When WhatsApp button is clicked
            // 4. click_to_call - When phone number is clicked
            //
            // ============================================

            // Global tracking function
            window.trackEvent = function(eventName, eventParams) {
              if (typeof gtag !== 'undefined') {
                gtag('event', eventName, eventParams);
                console.log('📊 Event tracked:', eventName, eventParams);
              }
            };

            // ============================================
            // 1. PHONE CALL TRACKING (Lead Generation)
            // Tracks: generate_lead, click_to_call, conversion
            // ============================================
            document.addEventListener('click', function(e) {
              var link = e.target.closest('a[href^="tel:"]');
              if (link) {
                var phoneNumber = link.getAttribute('href').replace('tel:', '');
                var source = link.getAttribute('data-source') || 'floating_button';

                // Track as lead (value: 50 EUR)
                gtag('event', 'generate_lead', {
                  event_category: 'Lead',
                  event_label: 'Phone Call',
                  value: 50,
                  currency: 'EUR',
                  lead_source: 'phone',
                  phone_number: phoneNumber,
                  click_source: source
                });

                // Track click-to-call event
                gtag('event', 'click_to_call', {
                  event_category: 'Contact',
                  event_label: phoneNumber,
                  phone_number: phoneNumber,
                  page_location: window.location.pathname,
                  click_source: source
                });

                // Google Ads conversion tracking
                gtag('event', 'conversion', {
                  send_to: '${GA_MEASUREMENT_ID}',
                  event_category: 'Conversion',
                  event_label: 'Phone Call Initiated',
                  value: 50,
                  currency: 'EUR'
                });

                console.log('📞 Phone Call Tracked:', phoneNumber, 'Source:', source);
              }
            });

            // ============================================
            // 2. WHATSAPP CLICK TRACKING (Lead Generation)
            // Tracks: generate_lead, whatsapp_click, conversion
            // ============================================
            document.addEventListener('click', function(e) {
              var link = e.target.closest('a[href*="wa.me"]');
              if (link) {
                var source = link.getAttribute('data-source') || 'floating_button';

                // Track as lead (value: 50 EUR)
                gtag('event', 'generate_lead', {
                  event_category: 'Lead',
                  event_label: 'WhatsApp',
                  value: 50,
                  currency: 'EUR',
                  lead_source: 'whatsapp',
                  click_source: source
                });

                // Track WhatsApp click event
                gtag('event', 'whatsapp_click', {
                  event_category: 'Contact',
                  event_label: 'WhatsApp Message',
                  page_location: window.location.pathname,
                  click_source: source
                });

                // Google Ads conversion tracking
                gtag('event', 'conversion', {
                  send_to: '${GA_MEASUREMENT_ID}',
                  event_category: 'Conversion',
                  event_label: 'WhatsApp Click',
                  value: 50,
                  currency: 'EUR'
                });

                console.log('💬 WhatsApp Click Tracked, Source:', source);
              }
            });

            // ============================================
            // 3. SERVICE CARD CLICKS (Engagement)
            // ============================================
            document.addEventListener('click', function(e) {
              var serviceCard = e.target.closest('[data-service]');
              if (serviceCard) {
                var serviceName = serviceCard.getAttribute('data-service');

                gtag('event', 'select_content', {
                  event_category: 'Engagement',
                  event_label: serviceName,
                  content_type: 'service',
                  item_id: serviceName
                });

                gtag('event', 'service_interest', {
                  event_category: 'Services',
                  event_label: serviceName,
                  service_name: serviceName
                });
              }
            });

            // ============================================
            // 4. CTA BUTTON CLICKS (Engagement)
            // ============================================
            document.addEventListener('click', function(e) {
              var ctaButton = e.target.closest('[data-cta]');
              if (ctaButton) {
                var ctaName = ctaButton.getAttribute('data-cta');
                var ctaLocation = ctaButton.getAttribute('data-cta-location') || 'unknown';

                gtag('event', 'cta_click', {
                  event_category: 'Engagement',
                  event_label: ctaName,
                  cta_name: ctaName,
                  cta_location: ctaLocation,
                  page_location: window.location.pathname
                });
              }
            });

            // ============================================
            // 5. FAQ INTERACTION TRACKING
            // ============================================
            document.addEventListener('click', function(e) {
              var faqItem = e.target.closest('[data-faq]');
              if (faqItem) {
                var question = faqItem.getAttribute('data-faq');

                gtag('event', 'faq_interaction', {
                  event_category: 'Engagement',
                  event_label: question,
                  content_type: 'faq'
                });
              }
            });

            // ============================================
            // 6. SCROLL DEPTH TRACKING (25%, 50%, 75%, 90%, 100%)
            // ============================================
            var scrollDepths = [25, 50, 75, 90, 100];
            var scrolledDepths = [];

            window.addEventListener('scroll', function() {
              var scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

              scrollDepths.forEach(function(depth) {
                if (scrollPercent >= depth && scrolledDepths.indexOf(depth) === -1) {
                  scrolledDepths.push(depth);
                  gtag('event', 'scroll_depth', {
                    event_category: 'Engagement',
                    event_label: depth + '%',
                    value: depth,
                    percent_scrolled: depth
                  });
                }
              });
            });

            // ============================================
            // 7. TIME ON PAGE TRACKING (30s, 60s, 120s, 300s)
            // ============================================
            var pageStartTime = Date.now();
            var timeIntervals = [30, 60, 120, 300];
            var trackedIntervals = [];

            setInterval(function() {
              var timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);

              timeIntervals.forEach(function(interval) {
                if (timeOnPage >= interval && trackedIntervals.indexOf(interval) === -1) {
                  trackedIntervals.push(interval);
                  gtag('event', 'time_on_page', {
                    event_category: 'Engagement',
                    event_label: interval + ' seconds',
                    value: interval,
                    engaged_time: interval
                  });
                }
              });
            }, 5000);

            // ============================================
            // 8. FORM FIELD FOCUS TRACKING
            // ============================================
            document.addEventListener('focus', function(e) {
              if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                var fieldName = e.target.name || e.target.id || 'unknown';
                var formElement = e.target.closest('form');
                var formName = formElement ? (formElement.getAttribute('name') || formElement.getAttribute('id') || 'contact_form') : 'contact_form';

                gtag('event', 'form_field_focus', {
                  event_category: 'Form',
                  event_label: fieldName,
                  field_name: fieldName,
                  form_name: formName
                });
              }
            }, true);

            // ============================================
            // 9. OUTBOUND LINK TRACKING
            // ============================================
            document.addEventListener('click', function(e) {
              var link = e.target.closest('a[href^="http"]');
              if (link && !link.href.includes(window.location.hostname)) {
                gtag('event', 'outbound_link', {
                  event_category: 'Outbound',
                  event_label: link.href,
                  outbound_url: link.href,
                  transport_type: 'beacon'
                });
              }
            });

            // ============================================
            // 10. PAGE VISIBILITY TRACKING
            // ============================================
            document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'hidden') {
                var timeOnPage = Math.floor((Date.now() - pageStartTime) / 1000);
                gtag('event', 'page_exit', {
                  event_category: 'Engagement',
                  event_label: 'Page Hidden',
                  time_spent: timeOnPage
                });
              }
            });

            // ============================================
            // 11. ERROR TRACKING
            // ============================================
            window.addEventListener('error', function(e) {
              gtag('event', 'javascript_error', {
                event_category: 'Error',
                event_label: e.message,
                error_message: e.message,
                error_file: e.filename,
                error_line: e.lineno
              });
            });

            console.log('✅ KELLER MONTAGE Analytics Initialized - ID: ${GA_MEASUREMENT_ID}');
            console.log('📊 Tracking: Phone Calls, WhatsApp, Form Submissions, Thank You Page');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
