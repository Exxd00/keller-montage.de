"use client";

import { useState, useMemo } from "react";
import { MapPin, Navigation } from "lucide-react";
import { ALL_CITIES, BUSINESS, MAIN_CITIES } from "@/lib/constants";

// Approximate coordinates for cities relative to Nürnberg (center)
// Simplified positioning based on distance and direction
const cityPositions: Record<string, { x: number; y: number }> = {
  nuernberg: { x: 50, y: 50 },
  fuerth: { x: 46, y: 48 },
  erlangen: { x: 48, y: 38 },
  schwabach: { x: 52, y: 58 },
  ansbach: { x: 30, y: 55 },
  forchheim: { x: 55, y: 32 },
  bamberg: { x: 52, y: 20 },
  bayreuth: { x: 70, y: 25 },
  "neumarkt-in-der-oberpfalz": { x: 70, y: 55 },
  roth: { x: 48, y: 62 },
  "lauf-an-der-pegnitz": { x: 58, y: 48 },
  herzogenaurach: { x: 40, y: 40 },
  // Add more as needed
};

interface CitiesMapProps {
  onCityClick?: (citySlug: string) => void;
  selectedCity?: string | null;
  hoveredCity?: string | null;
  onCityHover?: (citySlug: string | null) => void;
}

export function CitiesMap({
  onCityClick,
  selectedCity,
  hoveredCity,
  onCityHover,
}: CitiesMapProps) {
  // Group cities by distance ranges for the rings
  const cityRings = useMemo(() => {
    return {
      inner: ALL_CITIES.filter(c => c.distance <= 15),
      middle: ALL_CITIES.filter(c => c.distance > 15 && c.distance <= 40),
      outer: ALL_CITIES.filter(c => c.distance > 40 && c.distance <= 70),
      far: ALL_CITIES.filter(c => c.distance > 70),
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Background map circles - visual representation only */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-primary/20" />
        {/* Middle ring */}
        <div className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-primary/15" />
        {/* Inner ring */}
        <div className="absolute w-[45%] h-[45%] rounded-full border border-dashed border-primary/15" />
        {/* Core ring */}
        <div className="absolute w-[20%] h-[20%] rounded-full border border-primary/20" />
      </div>

      {/* Center point - Nürnberg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 animate-pulse">
            <Navigation className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-bold text-primary">{BUSINESS.city}</span>
          </div>
        </div>
      </div>

      {/* Main cities markers */}
      {MAIN_CITIES.filter(city => city.slug !== "nuernberg").map((city, index) => {
        const position = cityPositions[city.slug];
        if (!position) return null;

        const isSelected = selectedCity === city.slug;
        const isHovered = hoveredCity === city.slug;

        return (
          <button
            key={city.slug}
            onClick={() => onCityClick?.(city.slug)}
            onMouseEnter={() => onCityHover?.(city.slug)}
            onMouseLeave={() => onCityHover?.(null)}
            className="absolute z-10 group"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`
                w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200
                ${isSelected || isHovered
                  ? "bg-primary scale-125 shadow-lg shadow-primary/40"
                  : "bg-primary/70 hover:bg-primary hover:scale-110"
                }
              `}
            >
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <div
              className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap
                text-xs font-medium transition-all duration-200 pointer-events-none
                ${isSelected || isHovered
                  ? "opacity-100 text-primary"
                  : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                }
              `}
            >
              {city.name}
            </div>
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Hauptstadt</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary/50" />
          <span>Servicegebiet</span>
        </div>
      </div>
    </div>
  );
}

// Stats display for the map section
export function MapStats() {
  const stats = useMemo(() => {
    const regions = [...new Set(ALL_CITIES.map(c => c.region))];
    return {
      totalCities: ALL_CITIES.length,
      totalRegions: regions.length,
      mainCities: MAIN_CITIES.length,
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalCities}+</div>
        <div className="text-xs md:text-sm text-muted-foreground">Städte</div>
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div className="text-2xl md:text-3xl font-bold text-primary">{stats.totalRegions}</div>
        <div className="text-xs md:text-sm text-muted-foreground">Regionen</div>
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div className="text-2xl md:text-3xl font-bold text-primary">Bayern</div>
        <div className="text-xs md:text-sm text-muted-foreground">Servicegebiet</div>
      </div>
    </div>
  );
}
