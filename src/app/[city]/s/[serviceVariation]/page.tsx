import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Check, ArrowRight, Phone, MessageCircle, Clock, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_CITIES, BUSINESS, TESTIMONIALS } from "@/lib/constants";
import { SERVICE_VARIATIONS } from "@/lib/pseo-data";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";

interface PageProps {
  params: Promise<{ city: string; serviceVariation: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, serviceVariation: serviceSlug } = await params;

  const city = ALL_CITIES.find((c) => c.slug === citySlug);
  const service = SERVICE_VARIATIONS.find((s) => s.slug === serviceSlug);

  if (!city || !service) {
    return { title: "Nicht gefunden" };
  }

  const title = `${service.metaTitle} in ${city.name} | ${BUSINESS.fullName}`;
  const description = service.metaDescription.replace("{city}", city.name);

  return {
    title,
    description,
    keywords: [...service.keywords, city.name, city.region],
    openGraph: {
      title,
      description,
      url: `https://${BUSINESS.domain}/${city.slug}/s/${service.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://${BUSINESS.domain}/${city.slug}/s/${service.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const params: { city: string; serviceVariation: string }[] = [];

  // Only generate for top 50 cities to speed up build
  const topCities = ALL_CITIES.filter(c => c.distance <= 50);

  topCities.forEach((city) => {
    SERVICE_VARIATIONS.forEach((service) => {
      params.push({
        city: city.slug,
        serviceVariation: service.slug,
      });
    });
  });

  return params;
}

export default async function ServiceVariationPage({ params }: PageProps) {
  const { city: citySlug, serviceVariation: serviceSlug } = await params;

  const city = ALL_CITIES.find((c) => c.slug === citySlug);
  const service = SERVICE_VARIATIONS.find((s) => s.slug === serviceSlug);

  if (!city || !service) {
    notFound();
  }

  const h1 = service.h1Template.replace("{city}", city.name);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} in ${city.name}`,
    "description": service.metaDescription.replace("{city}", city.name),
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS.fullName,
      "telephone": BUSINESS.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": BUSINESS.city,
        "addressRegion": BUSINESS.region,
        "addressCountry": "DE"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "offers": {
      "@type": "Offer",
      "price": service.price.replace("ab ", "").replace("€", ""),
      "priceCurrency": "EUR"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="pt-24 pb-12 md:pt-32 md:pb-16">
        {/* Breadcrumb */}
        <nav className="container-max mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link href="/leistungen" className="hover:text-primary">Leistungen</Link></li>
            <li>/</li>
            <li><Link href={`/${city.slug}`} className="hover:text-primary">{city.name}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{service.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container-max mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              {city.name}, {city.region}
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold">4.9/5</span>
              <span className="text-muted-foreground">| 120+ Bewertungen</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {h1}
            </h1>

            <p className="text-xl md:text-2xl font-semibold mb-4">
              <span className="text-primary">{service.price}</span> – Festpreis
            </p>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              {service.metaDescription.replace("{city}", city.name)}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link href="#kontakt-form">
                <Button size="lg" className="btn-primary px-6 py-6 text-base rounded-xl">
                  Kostenloses Angebot
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-border rounded-xl hover:bg-muted transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
              <Check className="w-5 h-5 text-primary" />
              <span>Festpreis-Garantie</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
              <Clock className="w-5 h-5 text-primary" />
              <span>Termin in 24-48h</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
              <Shield className="w-5 h-5 text-primary" />
              <span>Gewährleistung</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-3 bg-muted/50 rounded-xl">
              <Star className="w-5 h-5 text-primary" />
              <span>120+ Kunden</span>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="container-max mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">{service.name} – Inklusive</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Professionelle Montage durch Fachkräfte</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Festpreis ohne versteckte Kosten</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Anfahrt nach {city.name} inklusive</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Aufräumen und Verpackungsentsorgung</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Gewährleistung auf alle Arbeiten</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">So funktioniert's</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold">Anfrage senden</p>
                    <p className="text-sm text-muted-foreground">Per Formular, Telefon oder WhatsApp</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold">Festpreis-Angebot</p>
                    <p className="text-sm text-muted-foreground">Verbindliches Angebot erhalten</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold">Montage-Termin</p>
                    <p className="text-sm text-muted-foreground">Wir montieren – Sie genießen</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="container-max mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Weitere Leistungen in {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICE_VARIATIONS.filter(s => s.id !== service.id).slice(0, 8).map((otherService) => (
              <Link
                key={otherService.id}
                href={`/${city.slug}/s/${otherService.slug}`}
                className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                  {otherService.name}
                </h3>
                <p className="text-sm text-primary font-medium">{otherService.price}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-muted/30">
          <div className="container-max">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Kundenbewertungen aus {city.region}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-6">
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

        <FAQSection />
        <ContactForm />

        {/* Final CTA */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="container-max text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {service.name} in {city.name} anfragen
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Kontaktieren Sie uns jetzt für ein kostenloses Festpreis-Angebot.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>Jetzt anrufen</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hallo, ich interessiere mich für ${service.name} in ${city.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
