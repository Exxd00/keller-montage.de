"use client";

import { Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function TestimonialsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F9] via-[#FCFAF8] to-white dark:from-[#1B1F2A] dark:via-[#0F1115] dark:to-[#151821]" />

      {/* Decorative overlays */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-primary/[0.03] to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-primary/[0.02] to-transparent" />

      <div className="container-max relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              5.0 auf Google
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-[#1F2430] dark:text-white">
              Über 120 zufriedene Kunden in {BUSINESS.city} und Umgebung
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl md:text-2xl font-bold text-[#1F2430] dark:text-white">5.0/5</span>
            </div>
            <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base">
              Echte Bewertungen unserer Kunden auf Google Maps
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid - 3 cards only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal key={index} variant="fadeUp" delay={index * 100}>
              <a
                href={(testimonial as { link?: string }).link || "https://maps.app.goo.gl/VMtxaGySYfnDoTZL9"}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837] rounded-2xl p-5 md:p-6 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/20 transition-all group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <blockquote className="text-[#1F2430] dark:text-white italic mb-4 text-sm md:text-base leading-relaxed line-clamp-4">
                  „{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <p className="text-xs md:text-sm text-[#5F6673] dark:text-[#AAB0BC]">
                    – {testimonial.author}, {testimonial.location}
                  </p>
                  <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Reviews Link */}
        <ScrollReveal variant="fadeUp" delay={350}>
          <div className="text-center mb-8">
            <a
              href="https://maps.app.goo.gl/VMtxaGySYfnDoTZL9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
            >
              Alle Bewertungen auf Google Maps ansehen
              <ExternalLink size={14} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={400}>
          <div className="text-center">
            <Link href="/kontakt">
              <Button className="btn-primary px-6 md:px-8 py-5 md:py-6 rounded-xl text-sm md:text-base">
                Auch zufrieden werden
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
