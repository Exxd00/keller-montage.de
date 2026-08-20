"use client";

import { useEffect, useState, useRef } from "react";
import { businessInfo } from "@/lib/data";

// Animated Counter Component
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="counter-animate">
      {count.toLocaleString("de-DE")}
      {suffix}
    </div>
  );
}

const stats = [
  {
    value: businessInfo.stats.yearsExperience,
    suffix: "+",
    label: "Jahre Erfahrung",
  },
  {
    value: businessInfo.stats.projectsCompleted,
    suffix: "+",
    label: "Projekte",
  },
  {
    value: businessInfo.stats.happyCustomers,
    suffix: "+",
    label: "Zufriedene Kunden",
  },
  {
    value: businessInfo.stats.citiesCovered,
    suffix: "+",
    label: "Städte",
  },
];

export default function TrustSection() {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 noise" />

      <div className="container-max relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 stagger-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 md:mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partner Brands */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Wir montieren Möbel von allen führenden Herstellern
          </p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 items-center justify-center">
            {businessInfo.brands.map((brand) => (
              <div
                key={brand}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
