"use client";

import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = "moebelmontage_analytics_consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function enableAnalytics() {
  if (!GA_ID || document.querySelector(`script[data-ga-id="${GA_ID}"]`)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.dataset.gaId = GA_ID;
  document.head.appendChild(script);
}

export function ConsentAnalytics() {
  const [choice, setChoice] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as "accepted" | "rejected" | null;
    setChoice(stored);
    if (stored === "accepted") enableAnalytics();
  }, []);

  if (!GA_ID || choice) return null;

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
    if (value === "accepted") enableAnalytics();
  };

  return (
    <aside className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[100] mx-auto max-w-xl rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl md:bottom-5" aria-label="Cookie-Einstellungen">
      <p className="text-sm font-semibold">Datenschutz-Einstellungen</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Optionale Reichweitenmessung startet nur mit Ihrer Zustimmung. Das Anfrageformular funktioniert auch ohne Analyse-Cookies.
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => decide("rejected")} className="min-h-11 flex-1 rounded-xl border border-border px-3 text-sm font-medium">Ablehnen</button>
        <button type="button" onClick={() => decide("accepted")} className="min-h-11 flex-1 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground">Akzeptieren</button>
      </div>
    </aside>
  );
}
