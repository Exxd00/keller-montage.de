"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Home, Phone, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";
import { trackThankYouPage } from "@/lib/analytics";

// Track conversion when page loads
function useConversionTracking() {
  useEffect(() => {
    // Use our analytics utility for tracking
    trackThankYouPage();
  }, []);
}

export default function ThankYouPage() {
  const router = useRouter();
  const [isValidAccess, setIsValidAccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user came from form submission
    const formSubmitted = sessionStorage.getItem("formSubmitted");

    if (formSubmitted === "true") {
      setIsValidAccess(true);
      // Clear the flag so they can't refresh and see it again
      sessionStorage.removeItem("formSubmitted");
    } else {
      setIsValidAccess(false);
      // Redirect to home after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [router]);

  // Only track if valid access
  useEffect(() => {
    if (isValidAccess) {
      trackThankYouPage();
    }
  }, [isValidAccess]);

  // Loading state
  if (isValidAccess === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Invalid access - redirect message
  if (isValidAccess === false) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="container-max">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Diese Seite ist nicht verfügbar</h1>
            <p className="text-muted-foreground mb-6">
              Sie werden zur Startseite weitergeleitet...
            </p>
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Zur Startseite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="container-max">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Vielen Dank für Ihre Anfrage!
          </h1>

          {/* Message */}
          <p className="text-lg text-muted-foreground mb-8">
            Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
          </p>

          {/* What happens next */}
          <div className="bg-muted/50 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg mb-4">Was passiert als nächstes?</h2>
            <ul className="text-left space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>Wir prüfen Ihre Anfrage und erstellen ein individuelles Angebot</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>Sie erhalten innerhalb von 24 Stunden ein verbindliches Festpreis-Angebot</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Nach Ihrer Bestätigung vereinbaren wir einen Termin</span>
              </li>
            </ul>
          </div>

          {/* Contact Options */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Dringende Fragen? Kontaktieren Sie uns direkt:
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href={`tel:${BUSINESS.phone}`}
                data-source="thank_you_page"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                data-source="thank_you_page"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <Link href="/">
            <Button variant="outline" size="lg" className="rounded-xl">
              <Home className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
