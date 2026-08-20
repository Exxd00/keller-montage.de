"use client";

import { Phone } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { useEffect, useState } from "react";
import {
  trackPhoneClick,
  trackPhoneConfirmed,
  trackPhoneCancelled,
  trackWhatsAppClick,
  trackWhatsAppConfirmed,
  trackWhatsAppCancelled,
} from "@/lib/analytics";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

// WhatsApp SVG icon for proper branding
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

  // Delay visibility for better LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Phone handlers
  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackPhoneClick(businessInfo.phone, "floating_button");
    setShowPhoneDialog(true);
  };

  const handlePhoneConfirm = () => {
    trackPhoneConfirmed(businessInfo.phone, "floating_button");
    setShowPhoneDialog(false);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handlePhoneCancel = () => {
    trackPhoneCancelled("floating_button");
    setShowPhoneDialog(false);
  };

  // WhatsApp handlers
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackWhatsAppClick("floating_button");
    setShowWhatsAppDialog(true);
  };

  const handleWhatsAppConfirm = () => {
    trackWhatsAppConfirmed("floating_button");
    setShowWhatsAppDialog(false);
    window.open(
      `https://wa.me/${businessInfo.whatsapp.replace(/\+/g, '')}?text=Hallo, ich interessiere mich für Ihre Dienstleistungen.`,
      "_blank"
    );
  };

  const handleWhatsAppCancel = () => {
    trackWhatsAppCancelled("floating_button");
    setShowWhatsAppDialog(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3 no-print"
        role="group"
        aria-label="Schnellkontakt"
        style={{
          contain: 'layout style',
          willChange: 'auto'
        }}
      >
        {/* Phone Button */}
        <button
          onClick={handlePhoneClick}
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200"
          aria-label={`Jetzt anrufen: ${businessInfo.phone}`}
          style={{ touchAction: 'manipulation' }}
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200"
          aria-label="Nachricht per WhatsApp senden"
          style={{ touchAction: 'manipulation' }}
        >
          <WhatsAppIcon />
        </button>
      </div>

      {/* Phone Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showPhoneDialog}
        onClose={handlePhoneCancel}
        onConfirm={handlePhoneConfirm}
        type="phone"
        phoneNumber={businessInfo.phone}
      />

      {/* WhatsApp Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showWhatsAppDialog}
        onClose={handleWhatsAppCancel}
        onConfirm={handleWhatsAppConfirm}
        type="whatsapp"
      />
    </>
  );
}
