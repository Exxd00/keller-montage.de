"use client";

import { Send, FileText, Wrench } from "lucide-react";
import { STEPS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const stepIcons = [Send, FileText, Wrench];

export function StepsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FCFAF8] to-[#FFF5F7] dark:from-[#151821] dark:via-[#0F1115] dark:to-[#1B1F2A]" />

      {/* Decorative gradient overlays */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-b from-primary/[0.02] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-gradient-to-t from-primary/[0.03] to-transparent rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 px-2 text-[#1F2430] dark:text-white">
              In nur 3 Schritten zu Ihrer Küchenmontage
            </h2>
            <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base max-w-2xl mx-auto hidden md:block">
              Einfach, transparent und stressfrei – so läuft Ihre Anfrage ab
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Grid - All visible on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 lg:gap-12">
          {STEPS.map((step, index) => {
            const IconComponent = stepIcons[index];
            return (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 150}>
                <div className="relative text-center">
                  {/* Step Number */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary text-white text-xs sm:text-sm font-bold flex items-center justify-center z-10 shadow-lg shadow-primary/30">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mt-3 sm:mt-4 transition-transform hover:scale-105">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xs sm:text-sm md:text-lg mb-0.5 sm:mb-1 md:mb-2 leading-tight text-[#1F2430] dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-[#5F6673] dark:text-[#AAB0BC] text-[10px] sm:text-xs md:text-sm leading-snug px-1">
                    {step.description}
                  </p>

                  {/* Connector Line - Desktop only */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal variant="fadeUp" delay={500}>
          <p className="text-center text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base mt-6 md:mt-8">
            Einfach, transparent und stressfrei – Ihre Küche in besten Händen.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
