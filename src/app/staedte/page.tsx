"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { cities } from "@/lib/data";

export default function StaedtePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Get unique regions
  const regions = useMemo(() => {
    const regionSet = new Set(cities.map((c) => c.region));
    return Array.from(regionSet).sort();
  }, []);

  const filteredCities = useMemo(() => {
    let filtered = cities;

    if (selectedRegion) {
      filtered = filtered.filter((c) => c.region === selectedRegion);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.region.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedRegion, searchQuery]);

  const mainCities = cities.filter((c) => c.isMain);

  return (
    <>
      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))' }}>
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Unsere Servicegebiete
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wir bieten unsere Dienstleistungen in {cities.length}+ Städten und
              Gemeinden in der Region Nürnberg an
            </p>
          </div>

          {/* Main Cities */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Hauptstädte
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {mainCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="glass-card rounded-xl p-4 md:p-6 card-hover group text-center"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-full gradient-bg flex items-center justify-center">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm md:text-base group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {city.region}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Stadt suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Region Filter */}
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto md:max-h-none">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedRegion === null
                      ? "bg-primary text-white"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  Alle Regionen
                </button>
                {regions.slice(0, 8).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
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
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              {filteredCities.length} Städte gefunden
            </p>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 mb-12">
            {filteredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="glass-card rounded-lg p-3 md:p-4 card-hover group"
              >
                <h3 className="font-medium text-xs md:text-sm group-hover:text-primary transition-colors">
                  {city.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 truncate">
                  {city.region}
                </p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-muted/50 rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Ihre Stadt nicht dabei?
            </h2>
            <p className="text-muted-foreground mb-6">
              Kontaktieren Sie uns - wir prüfen gerne, ob wir auch in Ihrer
              Region tätig sein können
            </p>
            <Link
              href="/#kontakt-form"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl font-medium"
            >
              Jetzt anfragen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
