"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Phone, X, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

// ============================================
// CONTACT CONFIRMATION DIALOG
// Shows confirmation before phone call or WhatsApp
// Tracks events to GA4 and Google Sheets
// ============================================

type ContactType = "phone" | "whatsapp" | null;

interface DialogContextType {
  showDialog: (type: ContactType, source: string) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function useContactDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useContactDialog must be used within ContactDialogProvider");
  }
  return context;
}

// WhatsApp Icon SVG
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Get GCLID from URL or localStorage
function getGclid(): string {
  if (typeof window === "undefined") return "";

  // Check URL first
  const urlParams = new URLSearchParams(window.location.search);
  const gclidFromUrl = urlParams.get("gclid");

  if (gclidFromUrl) {
    // Save to localStorage for later
    localStorage.setItem("gclid", gclidFromUrl);
    localStorage.setItem("gclid_timestamp", Date.now().toString());
    return gclidFromUrl;
  }

  // Check localStorage (valid for 90 days)
  const savedGclid = localStorage.getItem("gclid");
  const savedTimestamp = localStorage.getItem("gclid_timestamp");

  if (savedGclid && savedTimestamp) {
    const daysSaved = (Date.now() - parseInt(savedTimestamp)) / (1000 * 60 * 60 * 24);
    if (daysSaved < 90) {
      return savedGclid;
    }
  }

  return "";
}

// Get traffic source
function getTrafficSource(): string {
  if (typeof window === "undefined") return "Direct";

  const gclid = getGclid();
  if (gclid) return "Google Ads";

  const referrer = document.referrer;
  if (!referrer) return "Direct";

  if (referrer.includes("google.")) return "Organic";
  if (referrer.includes("bing.")) return "Organic";
  if (referrer.includes("yahoo.")) return "Organic";
  if (referrer.includes("facebook.")) return "Social";
  if (referrer.includes("instagram.")) return "Social";

  return "Referral";
}

// Send tracking data to our API (which forwards to Google Sheets)
async function sendTrackingData(data: {
  event_type: "phone" | "whatsapp";
  contact_type: string;
  source: string;
  gclid: string;
  page_url: string;
  click_source: string;
}) {
  try {
    const response = await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Tracking: Event sent successfully", data.event_type);
    } else {
      console.error("❌ Tracking: API returned error", result);
    }
  } catch (error) {
    console.error("❌ Tracking: Failed to send event", error);
  }
}

// Track to GA4
function trackContactEvent(type: "phone" | "whatsapp", source: string, confirmed: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;

  const gclid = getGclid();
  const trafficSource = getTrafficSource();
  const contactType = type === "phone" ? "📞 Anruf" : "💬 WhatsApp";

  // Main lead event
  window.gtag("event", "generate_lead", {
    event_category: "Lead",
    event_label: contactType,
    value: 50,
    currency: "EUR",
    lead_source: type,
    click_source: source,
    confirmed: confirmed,
    gclid: gclid || undefined,
    traffic_source: trafficSource,
  });

  // Specific contact event
  const eventName = type === "phone" ? "phone_call_confirmed" : "whatsapp_confirmed";
  window.gtag("event", eventName, {
    event_category: "Contact",
    event_label: `${contactType} - ${confirmed ? "Confirmed" : "Cancelled"}`,
    click_source: source,
    page_location: window.location.pathname,
    gclid: gclid || undefined,
  });

  // Conversion event for Google Ads
  if (confirmed) {
    window.gtag("event", "conversion", {
      send_to: "G-N15LLLP7VV",
      event_category: "Conversion",
      event_label: `${contactType} Initiated`,
      value: 50,
      currency: "EUR",
    });
  }

  console.log(`📊 GA4: ${eventName} tracked (confirmed: ${confirmed})`);

  // Send to our API (which sends to Google Sheets) if confirmed
  if (confirmed) {
    sendTrackingData({
      event_type: type,
      contact_type: contactType,
      source: trafficSource,
      gclid: gclid,
      page_url: window.location.href,
      click_source: source,
    });
  }
}

// Dialog Component
function ConfirmationDialog({
  type,
  source,
  onClose,
}: {
  type: ContactType;
  source: string;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    trackContactEvent(type as "phone" | "whatsapp", source, false);
    setTimeout(onClose, 200);
  }, [type, source, onClose]);

  const handleConfirm = useCallback(() => {
    trackContactEvent(type as "phone" | "whatsapp", source, true);

    if (type === "phone") {
      window.location.href = `tel:${BUSINESS.phone}`;
    } else if (type === "whatsapp") {
      window.open(
        `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`,
        "_blank"
      );
    }

    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [type, source, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  if (!type) return null;

  const isPhone = type === "phone";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        className={`relative bg-white dark:bg-[#1B1F2A] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-200 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Header */}
        <div
          className={`p-6 text-center ${
            isPhone
              ? "bg-gradient-to-br from-primary to-primary/80"
              : "bg-gradient-to-br from-[#25D366] to-[#128C7E]"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
            {isPhone ? (
              <Phone className="w-8 h-8 text-white" />
            ) : (
              <WhatsAppIcon className="w-8 h-8 text-white" />
            )}
          </div>

          <h2 id="dialog-title" className="text-xl font-bold text-white">
            {isPhone ? "Jetzt anrufen?" : "WhatsApp öffnen?"}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-center text-[#5F6673] dark:text-[#AAB0BC] mb-2">
            {isPhone
              ? "Wir sind für Sie erreichbar:"
              : "Schreiben Sie uns direkt:"}
          </p>

          <p className="text-center text-2xl font-bold text-[#1F2430] dark:text-white mb-4">
            {isPhone ? BUSINESS.phoneDisplay : BUSINESS.whatsappDisplay}
          </p>

          <p className="text-center text-sm text-[#9CA3AF] mb-6">
            {BUSINESS.openingHours.display}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-xl border border-[#E8E0E0] dark:border-[#2A2F3A] text-[#5F6673] dark:text-[#AAB0BC] font-medium hover:bg-[#F5F5F5] dark:hover:bg-[#232837] transition-colors"
            >
              Abbrechen
            </button>

            <button
              onClick={handleConfirm}
              className={`flex-1 px-4 py-3 rounded-xl text-white font-medium transition-all hover:scale-105 active:scale-95 ${
                isPhone
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-[#25D366] hover:bg-[#25D366]/90"
              }`}
            >
              {isPhone ? "Anrufen" : "WhatsApp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Provider Component
export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogType, setDialogType] = useState<ContactType>(null);
  const [dialogSource, setDialogSource] = useState<string>("");

  const showDialog = useCallback((type: ContactType, source: string) => {
    setDialogType(type);
    setDialogSource(source);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogType(null);
    setDialogSource("");
  }, []);

  // Intercept all phone and WhatsApp clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for phone links
      const phoneLink = target.closest('a[href^="tel:"]');
      if (phoneLink) {
        e.preventDefault();
        e.stopPropagation();
        const source = phoneLink.getAttribute("data-source") || "unknown";
        showDialog("phone", source);
        return;
      }

      // Check for WhatsApp links
      const whatsappLink = target.closest('a[href*="wa.me"]');
      if (whatsappLink) {
        e.preventDefault();
        e.stopPropagation();
        const source = whatsappLink.getAttribute("data-source") || "unknown";
        showDialog("whatsapp", source);
        return;
      }
    };

    // Use capture phase to intercept before other handlers
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [showDialog]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      {dialogType && (
        <ConfirmationDialog
          type={dialogType}
          source={dialogSource}
          onClose={closeDialog}
        />
      )}
    </DialogContext.Provider>
  );
}
