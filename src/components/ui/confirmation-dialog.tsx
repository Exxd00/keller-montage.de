"use client";

import { X, Phone, MessageCircle } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "phone" | "whatsapp";
  phoneNumber?: string;
}

// WhatsApp icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  type,
  phoneNumber,
}: ConfirmationDialogProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isWhatsApp = type === "whatsapp";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isWhatsApp ? "bg-[#25D366]" : "bg-primary"
              } text-white`}
            >
              {isWhatsApp ? <WhatsAppIcon /> : <Phone className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-bold">
              {isWhatsApp ? "WhatsApp öffnen?" : "Anruf starten?"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isWhatsApp
              ? "Sie werden zu WhatsApp weitergeleitet, um uns eine Nachricht zu senden."
              : `Sie werden die Telefon-App öffnen, um ${phoneNumber} anzurufen.`}
          </p>
          {!isWhatsApp && phoneNumber && (
            <p className="mt-3 text-2xl font-bold text-center py-3 bg-muted rounded-xl">
              {phoneNumber}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-xl text-white font-medium transition-colors ${
              isWhatsApp
                ? "bg-[#25D366] hover:bg-[#20bd5a]"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isWhatsApp ? "WhatsApp öffnen" : "Jetzt anrufen"}
          </button>
        </div>
      </div>
    </div>
  );
}
