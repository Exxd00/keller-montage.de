"use client";

import Link from "next/link";
import { useState, useMemo, useCallback, memo } from "react";
import { MapPin, ArrowRight, Search, Filter, X, ChevronRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAIN_CITIES, ALL_CITIES, BUSINESS, SERVICES } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CitiesMap, MapStats } from "@/components/ui/cities-map";
import { ParallaxImage } from "@/components/ui/parallax-image";

// Get unique regions - memoized outside component
const regions = [...new Set(ALL_CITIES.map(city => city.region))];

// Memoized city card component for better performance
const CityCard = memo(function CityCard({
  city,
  isMain = false
}: {
  city: typeof MAIN_CITIES[0] & { distance?: number };
  isMain?: boolean;
}) {
  return (
    <Link
      href={`/${city.slug}`}
      className={`
        group flex items-center justify-between p-3 rounded-xl transition-all
        ${isMain
          ? "border border-border bg-card hover:border-primary/50 hover:shadow-md"
          : "hover:bg-muted"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {isMain && (
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
        )}
        <div>
          <span className="font-medium text-sm group-hover:text-primary transition-colors">
            {city.name}
          </span>
          {isMain && (
            <p className="text-xs text-muted-foreground">{city.region}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
});

// Memoized region section
const RegionSection = memo(function RegionSection({
  region,
  cities
}: {
  region: string;
  cities: typeof ALL_CITIES;
}) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2 sticky top-0 bg-background py-2 z-10">
        <span className="w-3 h-3 rounded-full bg-primary" />
        {region}
        <span className="text-sm font-normal text-muted-foreground">({cities.length})</span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </div>
  );
});

export default function StaedtePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Filter cities based on search and region - memoized
  const filteredCities = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return ALL_CITIES.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(query);
      const matchesRegion = !selectedRegion || city.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Group filtered cities by region - memoized
  const groupedCities = useMemo(() => {
    return filteredCities.reduce((acc, city) => {
      if (!acc[city.region]) {
        acc[city.region] = [];
      }
      acc[city.region].push(city);
      return acc;
    }, {} as Record<string, typeof ALL_CITIES>);
  }, [filteredCities]);

  // Callbacks for better performance
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedRegion(null);
  }, []);

  const handleCityClick = useCallback((slug: string) => {
    window.location.href = `/${slug}`;
  }, []);

  const hasActiveFilters = searchQuery || selectedRegion;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/hero-desktop.jpg"
          alt="Küchenmontage Servicegebiete"
          containerClassName="absolute inset-0"
          speed={0.15}
          overlay
          overlayClassName="bg-gradient-to-b from-black/60 via-black/40 to-background"
          priority
        />
        <div className="container-max relative z-10 text-center text-white pt-16">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <Navigation className="w-4 h-4" />
              {BUSINESS.city} & Umgebung
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Unsere <span className="text-primary">Servicegebiete</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={200}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Professionelle Küchenmontage in <strong>{ALL_CITIES.length}+ Städten</strong> in Bayern
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container-max py-12 md:py-16">
        {/* Map Section */}
        <ScrollReveal variant="fadeUp">
          <section className="mb-12 md:mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Map */}
              <div className="order-2 lg:order-1">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <CitiesMap
                    onCityClick={handleCityClick}
                    hoveredCity={hoveredCity}
                    onCityHover={setHoveredCity}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ihr lokaler Partner für <span className="text-primary">Küchenmontage</span>
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Von unserem Standort in {BUSINESS.city} aus bedienen wir den gesamten Großraum
                  Mittelfranken, Oberfranken, Unterfranken und die Oberpfalz. Schnelle Anfahrt,
                  faire Preise und professionelle Montage in Ihrer Nähe.
                </p>
                <MapStats />
                <div className="mt-6">
                  <Link href="/kontakt">
                    <Button className="btn-primary px-6 py-5 rounded-xl">
                      Jetzt Termin anfragen
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Search and Filter Bar */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Stadt suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-background"
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
              {selectedRegion && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
              )}
            </button>
          </div>

          {/* Region Filters */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedRegion
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Alle Regionen
              </button>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRegion === region
                      ? "bg-primary text-white"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters & Results Count */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              <strong>{filteredCities.length}</strong> {filteredCities.length === 1 ? 'Stadt' : 'Städte'} gefunden
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Filter zurücksetzen
              </button>
            )}
          </div>
        </section>

        {/* Main Cities Grid - only show when no filters */}
        {!hasActiveFilters && (
          <ScrollReveal variant="fadeUp">
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Hauptstädte</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {MAIN_CITIES.map((city) => (
                  <CityCard key={city.slug} city={city} isMain />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* All Cities by Region */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {hasActiveFilters ? `Suchergebnisse (${filteredCities.length})` : `Alle ${ALL_CITIES.length} Städte`}
          </h2>

          {filteredCities.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-2xl">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Keine Städte gefunden</h3>
              <p className="text-muted-foreground mb-4">
                Versuchen Sie es mit einem anderen Suchbegriff oder wählen Sie eine andere Region.
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedCities).map(([region, cities]) => (
                <RegionSection key={region} region={region} cities={cities} />
              ))}
            </div>
          )}
        </section>

        {/* Services Section */}
        <ScrollReveal variant="fadeUp">
          <section className="mb-12 bg-muted/30 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Unsere Leistungen in allen Städten
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Wählen Sie Ihre Stadt und die gewünschte Dienstleistung, um mehr über unsere Angebote zu erfahren.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/service/${service.slug}`}
                  className="group p-5 rounded-xl border border-border bg-background hover:border-primary/50 hover:shadow-md transition-all text-center"
                >
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <p className="text-primary font-bold">{service.price}</p>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Not Listed CTA */}
        <ScrollReveal variant="fadeUp">
          <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Ihre Stadt nicht dabei?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Kontaktieren Sie uns – wir prüfen gerne, ob wir auch in Ihrer Region tätig sein können.
              Oft können wir auch in weiter entfernten Gebieten helfen.
            </p>
            <Link href="/kontakt">
              <Button className="btn-primary px-6 py-5 rounded-xl">
                Jetzt anfragen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
