"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Star, Check, ArrowRight, Truck, Wrench, ChefHat, Phone, MessageCircle, MapPin, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, PRICE_EXAMPLES, BUSINESS, ALL_CITIES, MAIN_CITIES } from "@/lib/constants";
import { StepsSection } from "@/components/sections/StepsSection";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  truck: Truck,
  wrench: Wrench,
  kitchen: ChefHat,
};

// Get unique regions
const regions = [...new Set(ALL_CITIES.map(city => city.region))];

export default function LeistungenPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Filter cities based on search and region
  const filteredCities = useMemo(() => {
    return ALL_CITIES.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || city.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Group filtered cities by region
  const groupedCities = useMemo(() => {
    return filteredCities.reduce((acc, city) => {
      if (!acc[city.region]) {
        acc[city.region] = [];
      }
      acc[city.region].push(city);
      return acc;
    }, {} as Record<string, typeof ALL_CITIES>);
  }, [filteredCities]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion(null);
  };

  const hasActiveFilters = searchQuery || selectedRegion;
  const activeService = selectedService ? SERVICES.find(s => s.slug === selectedService) : null;

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Termine in 24-48h verfügbar
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Unsere <span className="text-primary">Leistungen</span> & Preise
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparente Festpreise in <strong>{ALL_CITIES.length}+ Städten</strong> in {BUSINESS.city} und Umgebung
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold">4.9/5</span>
            <span className="text-muted-foreground">| 120+ zufriedene Kunden</span>
          </div>
        </div>

        {/* Service Packages */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Wählen Sie Ihr Paket
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const IconComponent = iconMap[service.icon] || Wrench;
              return (
                <div
                  key={service.id}
                  className={`relative rounded-2xl border p-6 transition-all hover:shadow-lg ${
                    service.popular
                      ? "bg-primary/5 border-primary/30 ring-2 ring-primary/20"
                      : "bg-card border-border"
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      BELIEBT
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    service.popular ? "bg-primary text-white" : "bg-primary/10 text-primary"
                  }`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

                  <p className="text-3xl font-bold text-primary mb-6">{service.price}</p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-muted-foreground mb-4">{service.examples}</p>

                  <div className="flex flex-col gap-2">
                    <Link href={`/service/${service.slug}`} className="block">
                      <Button
                        className={`w-full rounded-xl ${service.popular ? "btn-primary" : ""}`}
                        variant={service.popular ? "default" : "outline"}
                      >
                        Alle Städte anzeigen
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <button
                      onClick={() => setSelectedService(selectedService === service.slug ? null : service.slug)}
                      className="text-sm text-primary hover:underline"
                    >
                      {selectedService === service.slug ? "Städte ausblenden" : "Städte hier anzeigen"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Professioneller Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Rechnung mit MwSt.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Große Serviceregion</span>
            </div>
          </div>
        </section>

        {/* Cities for Selected Service */}
        {selectedService && activeService && (
          <section className="mb-16 bg-muted/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {activeService.name} in {ALL_CITIES.length}+ Städten
              </h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Schließen
              </button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Stadt suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Region Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    !selectedRegion
                      ? "bg-primary text-white"
                      : "bg-background hover:bg-muted border border-border"
                  }`}
                >
                  Alle
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedRegion === region
                        ? "bg-primary text-white"
                        : "bg-background hover:bg-muted border border-border"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredCities.length} Städte gefunden
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Filter zurücksetzen
                  </button>
                </div>
              )}
            </div>

            {/* Cities Grid */}
            {filteredCities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Keine Städte gefunden</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {Object.entries(groupedCities).map(([region, cities]) => (
                  <div key={region}>
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-muted-foreground">
                      {region} ({cities.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/${city.slug}/${activeService.slug}`}
                          className="p-2.5 rounded-lg bg-background hover:bg-primary/5 transition-colors group text-center border border-border/50"
                        >
                          <span className="font-medium text-sm group-hover:text-primary transition-colors block">{city.name}</span>
                          <span className="text-xs text-muted-foreground">{activeService.price}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Price Examples */}
        <section className="mb-16 bg-muted/50 rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Preisbeispiele
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Alle Preise sind Festpreise inkl. Material und Werkzeug
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Leistung</th>
                  <th className="text-center py-3 font-medium text-primary">Preis</th>
                  <th className="text-right py-3 font-medium">Dauer</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_EXAMPLES.map((item, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-4">{item.service}</td>
                    <td className="py-4 text-center font-bold text-primary">{item.price}</td>
                    <td className="py-4 text-right text-muted-foreground">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            * Individuelle Angebote erhalten Sie innerhalb von 24 Stunden
          </p>
        </section>

        {/* Quick Links to All Services in Main Cities */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Schnellzugriff: Leistungen in Hauptstädten
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MAIN_CITIES.slice(0, 6).map((city) => (
              <div key={city.slug} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {city.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={`${city.slug}-${service.slug}`}
                      href={`/${city.slug}/${service.slug}`}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {service.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/staedte" className="text-primary hover:underline inline-flex items-center gap-1">
              Alle {ALL_CITIES.length}+ Städte anzeigen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* Steps Section */}
      <StepsSection />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Jetzt Festpreis-Angebot anfordern
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Erhalten Sie innerhalb von 24 Stunden ein verbindliches Angebot – kostenlos und unverbindlich.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>100% Festpreise</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Keine versteckten Kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>{ALL_CITIES.length}+ Städte</span>
            </div>
          </div>

          <Link href="/kontakt" className="block mb-6">
            <Button size="lg" className="btn-primary px-8 py-6 text-lg rounded-xl">
              Kostenlos anfragen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
