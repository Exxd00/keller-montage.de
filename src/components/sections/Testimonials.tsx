"use client";

import { Star, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    text: "Schnelle Terminvergabe und saubere Arbeit. Absolute Empfehlung!",
    name: "Michael S.",
    location: "Nürnberg",
    rating: 5,
  },
  {
    id: 2,
    text: "Unsere IKEA Küche wurde perfekt montiert. Sehr professionell.",
    name: "Sarah W.",
    location: "Fürth",
    rating: 5,
  },
  {
    id: 3,
    text: "Faire Preise und pünktliche Ausführung. Gerne wieder!",
    name: "Thomas M.",
    location: "Erlangen",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            Über 120 zufriedene Kunden in Nürnberg
          </h2>

          {/* Prominent Star Rating */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold ml-2">4.9/5</span>
          </div>
          <p className="text-muted-foreground mt-2 lg:text-lg">Durchschnittsbewertung</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto stagger-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card rounded-xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 relative hover:shadow-xl transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3 lg:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base md:text-lg lg:text-xl text-foreground mb-4 lg:mb-6 italic">
                „{testimonial.text}"
              </p>

              {/* Author */}
              <p className="text-sm lg:text-base text-muted-foreground">
                – {testimonial.name}, {testimonial.location}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/kontakt" className="no-underline">
            <Button size="lg" className="btn-primary shimmer">
              Jetzt Termin vereinbaren
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
