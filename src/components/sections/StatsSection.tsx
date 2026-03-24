"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar, Users, Award, Clock } from "lucide-react";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  suffix?: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: Calendar,
    value: "26",
    suffix: "+",
    label: "Jahre Erfahrung",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    value: "2000",
    suffix: "+",
    label: "Zufriedene Kunden",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Award,
    value: "98",
    suffix: "%",
    label: "Kundenzufriedenheit",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Clock,
    value: "24-48",
    suffix: "h",
    label: "Terminvergabe",
    color: "bg-amber-500/10 text-amber-500",
  },
];

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Check if value contains a range (like "24-48")
          if (value.includes("-")) {
            setDisplayValue(value);
            return;
          }

          const numericValue = parseInt(value.replace(/\D/g, ""));
          const duration = 2000;
          const steps = 60;
          const increment = numericValue / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current).toString());
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#FCFAF8] to-white dark:from-[#151821] dark:to-[#0F1115]">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card */}
                <div className="relative bg-white dark:bg-[#1B1F2A] rounded-2xl p-5 md:p-6 border border-[#F1E7E7] dark:border-[#232837] shadow-sm hover:shadow-lg transition-all duration-300 text-center overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Decorative corner shapes */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7" />
                    </div>

                    {/* Number */}
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2430] dark:text-white mb-2">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Label */}
                    <p className="text-sm md:text-base text-[#5F6673] dark:text-[#AAB0BC] font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
