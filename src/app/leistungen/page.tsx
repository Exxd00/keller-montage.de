"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Wrench,
  ChefHat,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, businessInfo } from "@/lib/data";

// Package data with pricing and features
const packages = [
  {
    id: "lieferungen",
    name: "Lieferung",
    slug: "lieferungen",
    icon: Truck,
    price: "ab 39€",
    description: "Abholung & Lieferung vom Möbelhaus",
    popular: false,
    features: [
      "Abholung direkt vom Möbelhaus",
      "Transport bis in die Wohnung",
      "Treppen & Aufzug inklusive",
      "Sichere Verpackung",
      "Expresslieferung möglich",
    ],
    examples: ["IKEA Abholung", "Sofa Transport", "Matratzen Lieferung", "Same-Day Service"],
  },
  {
    id: "moebelmontage",
    name: "Möbelmontage",
    slug: "moebelmontage",
    icon: Wrench,
    price: "ab 59€",
    description: "IKEA, PAX, Betten, Schränke & mehr",
    popular: true,
    features: [
      "Aufbau aller Möbelarten",
      "IKEA & PAX Spezialist",
      "Werkzeug inklusive",
      "Verpackungsentsorgung",
      "Professionelle Ausführung",
    ],
    examples: ["PAX Schrank", "KALLAX Regal", "MALM Bett", "Büromöbel"],
  },
  {
    id: "kuechenmontage",
    name: "Küchenmontage",
    slug: "kuechenmontage",
    icon: ChefHat,
    price: "ab 149€",
    description: "Komplette Kücheninstallation",
    popular: false,
    features: [
      "Komplette Küchenmontage",
      "Arbeitsplatten Anpassung",
      "Geräte Installation",
      "Wasser & Elektro Anschluss",
      "IKEA METOD Spezialist",
    ],
    examples: ["IKEA Küche", "METOD System", "Küchenzeile", "Eckküche"],
  },
];

// Pricing table data
const pricingExamples = [
  { service: "PAX Schrank (2m)", price: "ab 89€", time: "~2 Std." },
  { service: "KALLAX Regal", price: "ab 35€", time: "~30 Min." },
  { service: "MALM Bett (160cm)", price: "ab 59€", time: "~1 Std." },
  { service: "HEMNES Kommode", price: "ab 45€", time: "~45 Min." },
  { service: "IKEA Küche (10 Schränke)", price: "ab 349€", time: "~1 Tag" },
  { service: "Lieferung + Montage PAX", price: "ab 149€", time: "~3 Std." },
];

export default function LeistungenPage() {
  return (
    <>
      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top, 0px))' }}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container-max">
            {/* Urgency Banner */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Termine in 24-48h verfügbar
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Unsere <span className="text-primary">Leistungen</span> & Preise
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Transparente Festpreise – Keine versteckten Kosten
              </p>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="font-bold">4.9/5</span>
                <span className="text-muted-foreground">| 120+ zufriedene Kunden</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Packages */}
        <section className="py-12 md:py-16">
          <div className="container-max">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Wählen Sie Ihr Paket
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <div
                    key={pkg.id}
                    className={`relative glass-card rounded-2xl p-6 md:p-8 ${
                      pkg.popular ? "ring-2 ring-primary shadow-xl scale-[1.02]" : ""
                    }`}
                  >
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                        BELIEBT
                      </div>
                    )}

                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/30">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Price */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{pkg.description}</p>
                      <div className="text-3xl md:text-4xl font-bold text-primary">{pkg.price}</div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Examples */}
                    <div className="text-xs text-muted-foreground mb-6">
                      <span className="font-medium">z.B.:</span> {pkg.examples.join(", ")}
                    </div>

                    {/* CTA */}
                    <Link href="/#kontakt-form" className="block no-underline">
                      <Button
                        className={`w-full ${pkg.popular ? "btn-primary shimmer" : "bg-muted hover:bg-muted/80 text-foreground"}`}
                      >
                        Jetzt anfragen
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Professioneller Service</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Rechnung mit MwSt.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>12+ Jahre Erfahrung</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Examples Table */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                Preisbeispiele
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Alle Preise sind Festpreise inkl. Material und Werkzeug
              </p>

              <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left px-4 md:px-6 py-4 font-semibold">Leistung</th>
                      <th className="text-right px-4 md:px-6 py-4 font-semibold">Preis</th>
                      <th className="text-right px-4 md:px-6 py-4 font-semibold hidden sm:table-cell">Dauer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingExamples.map((item, idx) => (
                      <tr key={idx} className="border-t border-border">
                        <td className="px-4 md:px-6 py-4 text-sm md:text-base">{item.service}</td>
                        <td className="px-4 md:px-6 py-4 text-right font-semibold text-primary">{item.price}</td>
                        <td className="px-4 md:px-6 py-4 text-right text-muted-foreground text-sm hidden sm:table-cell">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                * Individuelle Angebote erhalten Sie innerhalb von 24 Stunden
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Services Accordion */}
        <section className="py-12 md:py-16">
          <div className="container-max">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Alle Leistungen im Detail
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Klicken Sie auf eine Kategorie, um alle verfügbaren Services zu sehen
            </p>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {services.map((service) => {
                  const Icon = service.icon === "delivery" ? Truck : service.icon === "furniture" ? Wrench : ChefHat;
                  return (
                    <AccordionItem
                      key={service.id}
                      value={service.id}
                      className="glass-card rounded-xl border-none overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{service.subServices.length} Services</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        {/* Main Features */}
                        <div className="mb-6 pb-4 border-b border-border">
                          <p className="text-muted-foreground mb-4">{service.germanDescription}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sub-Services */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {service.subServices.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/service/${sub.slug}`}
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors py-1 no-underline"
                            >
                              <ChevronRight className="w-3 h-3" />
                              {sub.name}
                            </Link>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-6 pt-4 border-t border-border">
                          <Link href="/#kontakt-form" className="no-underline">
                            <Button className="btn-primary">
                              {service.name} anfragen
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container-max">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              So einfach funktioniert's
            </h2>

            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
              {[
                { step: 1, title: "Anfrage", desc: "Mit Fotos möglich" },
                { step: 2, title: "Festpreis", desc: "In 24h erhalten" },
                { step: 3, title: "Montage", desc: "Professionell & sauber" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container-max">
            <div className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-orange-500/5">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Jetzt Festpreis-Angebot anfordern
              </h2>
              <p className="text-muted-foreground mb-6">
                Erhalten Sie innerhalb von 24 Stunden ein verbindliches Angebot – kostenlos und unverbindlich.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {["100% Festpreise", "Keine versteckten Kosten", "12+ Jahre Erfahrung"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
                <Link href="/#kontakt-form" className="no-underline">
                  <Button size="lg" className="btn-primary shimmer w-full sm:w-auto px-8">
                    Kostenlos anfragen
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Contact Options */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
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
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
