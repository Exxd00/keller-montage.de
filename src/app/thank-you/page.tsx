"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Phone, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { businessInfo } from "@/lib/data";

function ThankYouContent() {
  const router = useRouter();
  const [isValidAccess, setIsValidAccess] = useState<boolean | null>(null);
  // Ensures the access check + flag consumption runs exactly once,
  // even under React Strict Mode's double-invoked effects (dev only).
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Access is granted ONLY when the form set the one-time success flag after a
    // CONFIRMED successful submission. The URL (?success=true) is intentionally
    // NOT trusted, so nobody can reach this page by guessing the link.
    let sessionSuccess: string | null = null;
    try {
      sessionSuccess = sessionStorage.getItem("form_submitted");
    } catch {
      sessionSuccess = null;
    }

    if (sessionSuccess === "true") {
      // Consume the flag immediately -> single-use access.
      // A refresh, back-navigation or direct link will now redirect home.
      try {
        sessionStorage.removeItem("form_submitted");
      } catch {
        // ignore storage errors
      }

      setIsValidAccess(true);

      // Track conversion event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "thank_you_page", {
          event_category: "conversion",
          event_label: "form_submission_success",
        });
      }

      // Clean URL (remove any leftover query params)
      window.history.replaceState({}, "", "/thank-you");
    } else {
      setIsValidAccess(false);
      router.replace("/");
    }
  }, [router]);

  if (isValidAccess === null) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (!isValidAccess) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center shadow-2xl shadow-primary/30 animate-bounce">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        Vielen Dank!
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns innerhalb
        von 24 Stunden bei Ihnen melden.
      </p>

      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="font-bold text-lg mb-4">
          Möchten Sie uns direkt erreichen?
        </h2>
        <p className="text-muted-foreground mb-4">
          Für dringende Anfragen können Sie uns auch telefonisch oder per
          WhatsApp kontaktieren.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${businessInfo.phone}`}
            className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 rounded-xl"
          >
            <Phone className="w-5 h-5" />
            Jetzt anrufen
          </a>
          <a
            href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, "" )}?text=Hallo, ich habe gerade eine Anfrage gestellt und habe weitere Fragen.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#20bd5a] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      <Link href="/">
        <Button variant="outline" size="lg" className="rounded-xl">
          <Home className="w-5 h-5 mr-2" />
          Zurück zur Startseite
        </Button>
      </Link>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot-news" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </head>

      <Header />
      <main className="min-h-[80vh] flex items-center justify-center" style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top, 0px))' }}>
        <div className="container-max">
          <Suspense fallback={<LoadingFallback />}>
            <ThankYouContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
