"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, Check, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_CITIES, SERVICES, BUSINESS, TESTIMONIALS } from "@/lib/constants";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { use } from "react";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default function CityPage({ params }: CityPageProps) {
  const router = useRouter();
  const { city: citySlug } = use(params);
  const city = ALL_CITIES.find((c) => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactForm = document.getElementById("kontakt-form");
    if (contactForm) {
      const yOffset = -80;
      const y = contactForm.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Hero Section */}
      <section className="container-max mb-16">
        <div className="text-center mb-10">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Termine in {city.name} verfügbar
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold">4.9/5</span>
            <span className="text-muted-foreground">| 120+ Kunden</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Küchenmontage & Möbelmontage in{" "}
            <span className="text-primary">{city.name}</span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold mb-4">
            ab <span className="text-primary">59€</span> – Festpreis
          </p>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Ihr regionaler Spezialist für IKEA, PAX & Küchenmontage in {city.name} und {city.region}.
            Schnell, zuverlässig und professionell.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#kontakt-form" onClick={handleContactClick}>
              <Button size="lg" className="btn-primary px-6 py-6 text-base rounded-xl">
                Jetzt Termin sichern
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 border-2 border-border rounded-xl hover:bg-muted transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Anrufen
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
            <Check className="w-5 h-5 text-primary" />
            <span>Möbelmontage ab 59€</span>
          </div>
          <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
            <Check className="w-5 h-5 text-primary" />
            <span>Küchenmontage ab 149€</span>
          </div>
          <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
            <Check className="w-5 h-5 text-primary" />
            <span>Termine in 24-48h</span>
          </div>
          <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
            <Check className="w-5 h-5 text-primary" />
            <span>100% Festpreise</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container-max mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Unsere Leistungen in {city.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/${city.slug}/${service.slug}`}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {service.name} in {city.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
              <ul className="space-y-2 mb-4">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <span className="text-primary font-medium inline-flex items-center gap-1">
                Mehr erfahren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Local Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-max">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Das sagen unsere Kunden aus {city.region}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-foreground italic mb-4">
                  „{testimonial.text}"
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  – {testimonial.author}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form */}
      <ContactForm />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Möbelmontage in {city.name} gesucht?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Kontaktieren Sie uns jetzt für ein kostenloses Angebot. Wir sind Ihr zuverlässiger Partner für Küchen- und Möbelmontage in {city.name}.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
