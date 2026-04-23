"use client";

import { useEffect } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { BUSINESS } from "@/lib/constants";

export default function KontaktPage() {
  useEffect(() => {
    // Smooth scroll to form when coming from other pages
    if (window.location.hash === "#kontakt-form" || document.referrer) {
      setTimeout(() => {
        const form = document.getElementById("kontakt-form");
        if (form) {
          const yOffset = -80;
          const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Kontaktieren Sie uns
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Haben Sie Fragen oder möchten ein Angebot? Wir sind für Sie da!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details Card */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-bold text-xl mb-4">Kontaktdaten</h2>
              <div className="space-y-4">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">{BUSINESS.phoneDisplay}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-Mail</p>
                    <p className="font-medium">{BUSINESS.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">{BUSINESS.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-bold text-xl mb-4">Öffnungszeiten</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{BUSINESS.openingHours.weekdays}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{BUSINESS.openingHours.weekend}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm variant="minimal" />
          </div>
        </div>
      </div>
    </div>
  );
}
