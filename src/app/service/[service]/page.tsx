import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Check, ArrowRight, Phone, MessageCircle, Truck, Wrench, ChefHat, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, ALL_CITIES, MAIN_CITIES, BUSINESS, TESTIMONIALS } from "@/lib/constants";
import { ContactForm } from "@/components/sections/ContactForm";
import { StepsSection } from "@/components/sections/StepsSection";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  truck: Truck,
  wrench: Wrench,
  kitchen: ChefHat,
};

// Get unique regions
const regions = [...new Set(ALL_CITIES.map(city => city.region))];

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find((s) => s.slug === serviceSlug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return {
    title: `${service.name} in ${BUSINESS.city} und Umgebung | ${service.price}`,
    description: `Professionelle ${service.name} in ${BUSINESS.city} und ${ALL_CITIES.length}+ Städten. ${service.description}. ${service.price}. Jetzt Termin sichern!`,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = SERVICES.find((s) => s.slug === serviceSlug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Wrench;

  // Group cities by region
  const groupedCities = ALL_CITIES.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, typeof ALL_CITIES>);

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Hero Section */}
      <section className="container-max mb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Termine in 24-48h verfügbar
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
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
              {service.name} in {BUSINESS.city}
              <span className="text-primary ml-2">{service.price}</span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold mb-4">
              Festpreis – ohne versteckte Kosten
            </p>

            <p className="text-muted-foreground text-lg mb-6">
              {service.description}. Professionell, schnell und zuverlässig in {ALL_CITIES.length}+ Städten.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground mb-6">{service.examples}</p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakt">
                <Button size="lg" className="btn-primary px-6 py-6 text-base rounded-xl">
                  Jetzt anfragen
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

          {/* Service Card */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <IconComponent className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
            <p className="text-4xl font-bold text-primary mb-6">{service.price}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Festpreis - keine versteckten Kosten</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Professionelles Werkzeug inklusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Rechnung mit MwSt.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>{BUSINESS.city} & Umgebung</span>
              </div>
            </div>

            <Link href="/kontakt" className="block">
              <Button className="w-full btn-primary py-6 text-base rounded-xl">
                Jetzt Termin sichern
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Service Areas */}
      <section className="container-max mb-16">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">
            {service.name} – Hauptstädte
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MAIN_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/${service.slug}`}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold group-hover:text-primary transition-colors">
                {city.name}
              </h3>
              <p className="text-xs text-muted-foreground">{service.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* All Service Areas by Region */}
      <section className="container-max mb-16 bg-muted/30 rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {service.name} in {ALL_CITIES.length}+ Städten
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Wählen Sie Ihre Stadt für ein individuelles Angebot
        </p>

        <div className="space-y-8">
          {Object.entries(groupedCities).map(([region, cities]) => (
            <div key={region}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                {region}
                <span className="text-sm font-normal text-muted-foreground">({cities.length})</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}/${service.slug}`}
                    className="p-3 rounded-lg bg-background hover:bg-primary/5 transition-colors group flex items-center justify-between border border-border/50"
                  >
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Services */}
      <section className="container-max mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Weitere Leistungen
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.filter(s => s.slug !== service.slug).map((otherService) => {
            const OtherIcon = iconMap[otherService.icon] || Wrench;
            return (
              <Link
                key={otherService.slug}
                href={`/service/${otherService.slug}`}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <OtherIcon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {otherService.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{otherService.description}</p>
                <p className="text-primary font-bold">{otherService.price}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Steps */}
      <StepsSection />

      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-max">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Das sagen unsere Kunden
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

      {/* Contact Form */}
      <ContactForm />

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {service.name} {service.price}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Kontaktieren Sie uns jetzt für ein kostenloses Festpreis-Angebot.
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
              href={`https://wa.me/${BUSINESS.whatsapp}`}
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
