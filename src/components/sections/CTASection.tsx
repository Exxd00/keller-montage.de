"use client";

import Link from "next/link";
import { Phone, ArrowRight, Star, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/data";

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-primary/10 to-orange-500/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline with Urgency */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 lg:mb-8">
            Jetzt Termin sichern – bevor die Woche ausgebucht ist
          </h2>

          {/* 4 Key Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-10">
            {[
              "Möbelmontage ab 59€",
              "Küchenmontage ab 149€",
              "4.9/5 Kundenzufriedenheit",
              "12+ Jahre Erfahrung",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                <span className="text-sm lg:text-base font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4 mb-6 lg:mb-8">
            <Link href="/kontakt" className="no-underline">
              <Button
                size="lg"
                className="btn-primary shimmer px-8 lg:px-12 py-6 lg:py-7 rounded-xl lg:rounded-2xl w-full sm:w-auto text-base md:text-lg lg:text-xl"
              >
                Kostenloses Angebot anfordern
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Contact Options */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary font-medium transition-colors no-underline"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span>{businessInfo.phone}</span>
            </a>
            <a
              href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, "" )}?text=Hallo, ich interessiere mich für Ihre Möbelmontage-Dienste.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors no-underline"
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
