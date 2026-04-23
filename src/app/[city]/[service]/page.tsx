import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Check, ArrowRight, Phone, MessageCircle, Truck, Wrench, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_CITIES, SERVICES, BUSINESS, TESTIMONIALS } from "@/lib/constants";
import { ContactForm } from "@/components/sections/ContactForm";
import { StepsSection } from "@/components/sections/StepsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import type { Metadata } from "next";

interface CityServicePageProps {
  params: Promise<{ city: string; service: string }>;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  truck: Truck,
  wrench: Wrench,
  kitchen: ChefHat,
};

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  ALL_CITIES.forEach((city) => {
    SERVICES.forEach((service) => {
      params.push({
        city: city.slug,
        service: service.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: CityServicePageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = ALL_CITIES.find((c) => c.slug === citySlug);
  const service = SERVICES.find((s) => s.slug === serviceSlug);

  if (!city || !service) {
    return {
      title: "Seite nicht gefunden",
    };
  }

  return {
    title: `${service.name} in ${city.name} - ${service.price}`,
    description: `Professionelle ${service.name} in ${city.name}. ${service.description}. Festpreise ${service.price}. IKEA Spezialist. Jetzt Termin sichern!`,
  };
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = ALL_CITIES.find((c) => c.slug === citySlug);
  const service = SERVICES.find((s) => s.slug === serviceSlug);

  if (!city || !service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Wrench;

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Hero Section */}
      <section className="container-max mb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href={`/${city.slug}`} className="hover:text-primary">{city.name}</Link>
              <span>/</span>
              <span className="text-foreground">{service.name}</span>
            </nav>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Termine in {city.name} verfügbar
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
              {service.name} in{" "}
              <span className="text-primary">{city.name}</span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold mb-4">
              <span className="text-primary">{service.price}</span> – Festpreis
            </p>

            <p className="text-muted-foreground text-lg mb-6">
              Professionelle {service.name} in {city.name} und {city.region}.
              {service.description}. Schnell, zuverlässig und zu fairen Festpreisen.
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
            <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
            <p className="text-muted-foreground mb-4">in {city.name}</p>
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
                <span>Termine in 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Rechnung mit MwSt.</span>
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

      {/* Other Services in City */}
      <section className="container-max mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Weitere Leistungen in {city.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.filter((s) => s.id !== service.id).map((s) => {
            const Icon = iconMap[s.icon] || Wrench;
            return (
              <Link
                key={s.id}
                href={`/${city.slug}/${s.slug}`}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {s.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{s.description}</p>
                <p className="text-primary font-bold">{s.price}</p>
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

      {/* FAQ */}
      <FAQSection />

      {/* Contact Form */}
      <ContactForm />

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container-max text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {service.name} in {city.name} {service.price}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Kontaktieren Sie uns jetzt für ein kostenloses Festpreis-Angebot für Ihre {service.name} in {city.name}.
          </p>
          <Link href="/kontakt" className="block mb-6">
            <Button size="lg" className="btn-primary px-8 py-6 text-lg rounded-xl">
              Kostenloses Angebot anfordern
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
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
