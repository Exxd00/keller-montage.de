"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";

const benefits = [
  {
    icon: Sparkles,
    title: "Saubere Montage",
    description: "Kein Staub, kein Chaos – wir arbeiten ordentlich und schützen Ihren Boden.",
  },
  {
    icon: Clock,
    title: "Zuverlässige Termine",
    description: "Wir kommen pünktlich und halten uns an Vereinbarungen.",
  },
  {
    icon: Award,
    title: "IKEA & alle Küchen",
    description: "Erfahrung mit IKEA METOD und allen gängigen Küchenmarken.",
  },
];

export function WhyUsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FCFAF8] via-white to-[#FFF8F9] dark:from-[#0F1115] dark:via-[#151821] dark:to-[#1B1F2A]" />

      {/* Subtle color overlays for depth */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/[0.03] to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/[0.02] to-transparent" />

      <div className="container-max relative z-10">
        {/* Mobile Layout - Image integrated with header */}
        <div className="lg:hidden">
          {/* Header with small image */}
          <ScrollReveal variant="fadeUp">
            <div className="flex items-start gap-4 mb-6">
              {/* Small thumbnail on mobile */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/team-professional.jpg"
                  alt="KELLER Küchenmonteur"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1F2430] dark:text-white mb-1">
                  Warum Sie bei uns richtig sind
                </h2>
                <p className="text-primary font-medium text-sm">
                  Ihr zuverlässiger Partner in {BUSINESS.city}.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <ScrollReveal key={index} variant="fadeUp" delay={index * 100}>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837] shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2430] dark:text-white text-sm mb-0.5">
                        {benefit.title}
                      </h3>
                      <p className="text-[#5F6673] dark:text-[#AAB0BC] text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* CTA */}
          <ScrollReveal variant="fadeUp" delay={300}>
            <Link href="/kontakt">
              <Button className="btn-primary w-full px-6 py-5 rounded-xl text-sm">
                Jetzt beraten lassen
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Image - Left on desktop with Parallax */}
          <ScrollReveal variant="fadeRight">
            <ParallaxImage
              src="/images/team-professional.jpg"
              alt="Professioneller Küchenmonteur bei der Arbeit mit geschütztem Boden und organisierten Werkzeugen in Nürnberg"
              containerClassName="w-full aspect-[4/5] rounded-[20px] shadow-xl"
              speed={0.12}
              sizes="45vw"
            />
          </ScrollReveal>

          {/* Text Content - Right on desktop */}
          <div>
            <ScrollReveal variant="fadeUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2430] dark:text-white">
                Warum Sie bei uns richtig sind
              </h2>

              <p className="text-primary font-medium text-lg mb-6">
                Ihr zuverlässiger Partner für Küchenmontage in {BUSINESS.city}.
              </p>
            </ScrollReveal>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <ScrollReveal key={index} variant="fadeLeft" delay={index * 100}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837] shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1F2430] dark:text-white text-lg mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-[#5F6673] dark:text-[#AAB0BC] text-base leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal variant="fadeUp" delay={400}>
              <Link href="/kontakt">
                <Button className="btn-primary px-8 py-6 rounded-xl text-base">
                  Jetzt beraten lassen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
