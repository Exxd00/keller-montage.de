"use client";

import { Send, FileText, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: 1,
    icon: Send,
    title: "Anfrage senden",
    description: "(mit Fotos möglich)",
  },
  {
    step: 2,
    icon: FileText,
    title: "Festpreis-Angebot",
    description: "Innerhalb von 24 Stunden erhalten",
  },
  {
    step: 3,
    icon: Wrench,
    title: "Termin & Ausführung",
    description: "Professionelle Montage vor Ort",
  },
];

export default function HowWeWork() {
  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4">
            In nur 3 Schritten zur perfekten Montage
          </h2>
          <p className="hidden lg:block text-lg text-muted-foreground max-w-2xl mx-auto">
            Einfach, transparent und stressfrei – so arbeiten wir
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-10 stagger-grid max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative glass-card rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-10 text-center group hover:shadow-xl transition-shadow"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 lg:-top-5 lg:-left-5 w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg lg:text-xl shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-5 lg:mb-6 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-sm md:text-lg lg:text-xl xl:text-2xl mb-1 md:mb-2 lg:mb-3">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Connector Lines (Desktop Only) */}
        <div className="hidden lg:flex justify-center items-center -mt-36 mb-28 relative z-0 max-w-4xl mx-auto">
          <div className="w-1/4 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-primary/30" />
          <div className="w-1/4 h-0.5 bg-gradient-to-r from-primary/30 via-primary/30 to-transparent" />
        </div>

        {/* Tagline */}
        <p className="text-center text-muted-foreground text-base md:text-lg font-medium mt-8 lg:-mt-16">
          Einfach, transparent und stressfrei.
        </p>
      </div>
    </section>
  );
}
