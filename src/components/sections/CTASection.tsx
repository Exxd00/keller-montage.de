"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Phone, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";

export function CTASection() {
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Check if we're on the contact page
    const contactForm = document.getElementById("kontakt-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Navigate to contact page, then scroll
      router.push("/kontakt");
      setTimeout(() => {
        const form = document.getElementById("kontakt-form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-[#FCFAF8] to-primary/10 dark:from-primary/10 dark:via-[#0F1115] dark:to-primary/15">
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#1F2430] dark:text-white">
            Jetzt Küchenmontage in {BUSINESS.city} anfragen
          </h2>
          <p className="text-[#5F6673] dark:text-[#AAB0BC] mb-6 text-base md:text-lg">
            Schnell, transparent und professionell – wir montieren Ihre Küche zuverlässig zum Festpreis.
          </p>

          {/* Quick Benefits - Küchenmontage fokus */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-[#1F2430] dark:text-white">Küchenmontage ab 149€</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-[#1F2430] dark:text-white">Termine in 24-48h</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-[#1F2430] dark:text-white">4.9/5 Kundenzufriedenheit</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/kontakt" onClick={handleContactClick} className="block mb-6">
            <Button size="lg" className="btn-primary px-8 py-6 text-lg rounded-xl shimmer">
              Jetzt Festpreis sichern
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          {/* Contact Options */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 text-[#1F2430] dark:text-white hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1da851] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
