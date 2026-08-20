"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  trackEvent,
  trackServiceView,
  trackCityView,
  initScrollTracking,
  initTimeTracking
} from "@/lib/analytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize scroll and time tracking
  useEffect(() => {
    initScrollTracking();
    initTimeTracking();
  }, []);

  // Track page views on route change
  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Track service views
    if (pathname.startsWith('/service/')) {
      const serviceName = pathname.replace('/service/', '');
      trackServiceView(serviceName);
    }

    // Track city views
    const cityMatch = pathname.match(/^\/([a-z-]+)$/);
    if (cityMatch && !['kontakt', 'leistungen', 'arbeiten', 'impressum', 'datenschutz', 'staedte'].includes(cityMatch[1])) {
      trackCityView(cityMatch[1]);
    }

  }, [pathname, searchParams]);

  return <>{children}</>;
}

// Hook for tracking CTA clicks
export function useTrackCTA() {
  return (ctaName: string, location: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: `${ctaName} - ${location}`,
    });
  };
}

// Component for trackable links
export function TrackableLink({
  href,
  children,
  eventName,
  eventCategory = 'engagement',
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  eventName: string;
  eventCategory?: 'contact' | 'engagement' | 'navigation' | 'conversion' | 'lead';
  className?: string;
  [key: string]: unknown;
}) {
  const handleClick = () => {
    trackEvent({
      action: 'cta_click',
      category: eventCategory,
      label: eventName,
    });
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
