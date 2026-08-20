"use client";

import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, CheckCircle, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/data";

interface FormCTAProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
  serviceName?: string;
  compact?: boolean;
}

export default function FormCTA({
  title,
  subtitle,
  cityName,
  serviceName,
  compact = false
}: FormCTAProps) {
  // Dynamic title based on context
  const displayTitle = title || (
    cityName && serviceName
      ? `${serviceName} in ${cityName} anfragen`
      : cityName
        ? `Jetzt Angebot für ${cityName} anfordern`
        : serviceName
          ? `${serviceName} anfragen`
          : "Jetzt kostenloses Angebot anfordern"
  );

  const displaySubtitle = subtitle || "Erhalten Sie innerhalb von 24 Stunden ein verbindliches Festpreis-Angebot – kostenlos und unverbindlich.";

  if (compact) {
    return (
      <section className="py-8 md:py-12">
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center bg-gradient-to-br from-primary/5 to-orange-500/5">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            {displayTitle}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {displaySubtitle}
          </p>

          {/* CTA Button */}
          <Link href="/#kontakt-form" className="no-underline">
            <Button size="lg" className="btn-primary shimmer px-8 py-6 text-base">
              Kostenloses Angebot anfordern
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          {/* Contact Options */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors no-underline"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>{businessInfo.phone}</span>
            </a>
            <a
              href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, "" )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors no-underline"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="anfrage" className="py-10 md:py-16">
      <div className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-12 bg-gradient-to-br from-primary/5 via-background to-orange-500/5 border border-primary/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Heute noch freie Termine
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {displayTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {displaySubtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CheckCircle, text: "100% Festpreise" },
            { icon: Clock, text: "Antwort in 24h" },
            { icon: Shield, text: "12+ Jahre Erfahrung" },
            { icon: Star, text: "4.9/5 Bewertung" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-background/50">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-center">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <Link href="/#kontakt-form" className="no-underline inline-block">
            <Button size="lg" className="btn-primary shimmer px-10 py-7 text-lg rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
              Jetzt kostenloses Angebot anfordern
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground mt-4">
            Unverbindlich & kostenlos • Antwort innerhalb von 24 Stunden
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground">oder direkt kontaktieren</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Contact Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${businessInfo.phone}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors no-underline group"
          >
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Jetzt anrufen</p>
              <p className="font-semibold group-hover:text-primary transition-colors">{businessInfo.phone}</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, "" )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition-colors no-underline group"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">WhatsApp schreiben</p>
              <p className="font-semibold text-green-600">Schnelle Antwort</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
