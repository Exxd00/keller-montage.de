import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle,
  Star,
  MessageCircle,
  Clock,
  Shield,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import FormCTA from "@/components/sections/FormCTA";
import { cities, services, businessInfo } from "@/lib/data";

interface CityPageProps {
  params: Promise<{ citySlug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return {
      title: "Stadt nicht gefunden",
    };
  }

  return {
    title: `Möbelmontage ${city.name} - IKEA Montage & Küchenmontage`,
    description: `Professionelle Möbelmontage in ${city.name}. IKEA Montage, Küchenmontage, Lieferservice. Schnell, zuverlässig, fair. Jetzt kostenlos anfragen!`,
    alternates: {
      canonical: `https://keller-montage.de/${city.slug}`,
    },
    openGraph: {
      title: `Möbelmontage ${city.name} - IKEA Montage & Küchenmontage`,
      description: `Professionelle Möbelmontage in ${city.name}. IKEA Montage, Küchenmontage, Lieferservice.`,
    },
  };
}

// Local FAQs template - will be customized per city
function getLocalFAQs(cityName: string) {
  return [
    {
      question: `Was kostet Möbelmontage in ${cityName}?`,
      answer: `Unsere Möbelmontage in ${cityName} startet ab 59€. Sie erhalten immer ein verbindliches Festpreis-Angebot ohne versteckte Kosten. Der genaue Preis hängt von Art und Umfang der Möbel ab.`,
    },
    {
      question: `Wie schnell können Sie in ${cityName} einen Termin anbieten?`,
      answer: `Wir bieten in ${cityName} und Umgebung in der Regel Termine innerhalb von 24-48 Stunden an – auch am Wochenende. Express-Termine sind auf Anfrage möglich.`,
    },
    {
      question: `Montieren Sie IKEA Möbel in ${cityName}?`,
      answer: `Ja, wir sind auf IKEA Montage in ${cityName} spezialisiert. PAX Schränke, KALLAX Regale, MALM Betten und komplette IKEA Küchen – wir montieren alle IKEA Produkte professionell.`,
    },
    {
      question: `Bieten Sie auch Küchenmontage in ${cityName} an?`,
      answer: `Ja, wir bieten komplette Küchenmontage in ${cityName} ab 149€ an. Das beinhaltet Aufbau der Schränke, Arbeitsplatten, Geräteinstallation und Anschlüsse.`,
    },
  ];
}

// Local testimonial variations
function getLocalTestimonial(cityName: string) {
  const testimonials = [
    { name: "Michael S.", text: "Schnelle Terminvergabe und saubere Arbeit. Absolute Empfehlung!", rating: 5 },
    { name: "Sarah W.", text: "Unsere IKEA Küche wurde perfekt montiert. Sehr professionell.", rating: 5 },
    { name: "Thomas M.", text: "Faire Preise und pünktliche Ausführung. Gerne wieder!", rating: 5 },
  ];
  const idx = cityName.length % testimonials.length;
  return { ...testimonials[idx], location: cityName };
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  const localFAQs = getLocalFAQs(city.name);
  const localTestimonial = getLocalTestimonial(city.name);

  // JSON-LD for local business in this city
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Möbelmontage ${city.name}`,
    description: `Professionelle Möbelmontage in ${city.name}`,
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    telephone: businessInfo.phone,
    email: businessInfo.email,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top, 0px))' }}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
          <div className="container-max">
            {/* Urgency Banner */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Heute noch Termine in {city.name} verfügbar
              </div>
            </div>

            {/* Location Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                <span>{city.region}</span>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                Möbelmontage in{" "}
                <span className="text-primary">{city.name}</span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl">ab <span className="text-primary">59€</span></span>
              </h1>

              <p className="text-lg font-medium text-foreground mb-2">
                Festpreis – Schnell – Zuverlässig
              </p>

              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Professionelle Möbelmontage, Küchenmontage und Lieferservice in{" "}
                {city.name}. IKEA Spezialist mit über{" "}
                {businessInfo.stats.yearsExperience} Jahren Erfahrung.
              </p>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="font-bold">4.9/5</span>
                <span className="text-muted-foreground text-sm">| 120+ zufriedene Kunden</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Link
                  href="/#kontakt-form"
                  className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 rounded-xl font-medium shimmer no-underline"
                >
                  Kostenloses Angebot anfordern
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Contact Options */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors no-underline"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{businessInfo.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, "" )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors no-underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container-max">
          {/* Pricing Cards */}
          <section className="py-10 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Unsere Preise in {city.name}
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {[
                { name: "Lieferung", price: "ab 39€", desc: "Abholung & Transport", slug: "lieferungen" },
                { name: "Möbelmontage", price: "ab 59€", desc: "IKEA, PAX & mehr", slug: "moebelmontage", popular: true },
                { name: "Küchenmontage", price: "ab 149€", desc: "Komplette Installation", slug: "kuechenmontage" },
              ].map((service) => (
                <Link
                  key={service.slug}
                  href={`/${city.slug}/${service.slug}`}
                  className={`glass-card rounded-xl md:rounded-2xl p-4 md:p-6 card-hover group text-center no-underline relative ${
                    service.popular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      BELIEBT
                    </div>
                  )}
                  <h3 className="font-bold text-sm md:text-lg mb-1 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-xl md:text-3xl font-bold text-primary mb-1">
                    {service.price}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {service.desc}
                  </p>
                </Link>
              ))}
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                <span>Professioneller Service</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>100% Festpreise</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>Termine in 24-48h</span>
              </div>
            </div>
          </section>

          {/* Services in this city */}
          <section className="py-8 md:py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Alle Leistungen in {city.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/${city.slug}/${service.slug}`}
                  className="glass-card rounded-xl md:rounded-2xl p-5 md:p-6 card-hover group no-underline"
                >
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.name} in {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.shortDescription}
                  </p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                    Mehr erfahren
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Local Testimonial */}
          <section className="py-8 md:py-10">
            <div className="glass-card rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto">
              <div className="flex justify-center gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-lg md:text-xl italic mb-4">„{localTestimonial.text}"</p>
              <p className="text-muted-foreground">
                – {localTestimonial.name}, {localTestimonial.location}
              </p>
            </div>
          </section>

          {/* Local FAQs */}
          <section className="py-8 md:py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Häufige Fragen zur Montage in {city.name}
            </h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {localFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl overflow-hidden group"
                >
                  <summary className="px-5 py-4 cursor-pointer font-medium flex items-center justify-between hover:bg-muted/30 transition-colors list-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Why choose us */}
          <section className="py-8 md:py-10 bg-muted/30 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
              Warum {businessInfo.displayName} in {city.name}?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: `${businessInfo.stats.yearsExperience}+`, label: "Jahre Erfahrung" },
                { value: "5.000+", label: "Projekte" },
                { value: "24h", label: "Antwortzeit" },
                { value: "100%", label: "Festpreise" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <FormCTA cityName={city.name} />

          {/* Related cities */}
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Weitere Städte in der Nähe von {city.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
              {cities
                .filter((c) => c.region === city.region && c.slug !== city.slug)
                .slice(0, 12)
                .map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/${nearbyCity.slug}`}
                    className="glass-card rounded-lg p-3 card-hover text-center no-underline"
                  >
                    <span className="text-sm font-medium hover:text-primary transition-colors">
                      {nearbyCity.name}
                    </span>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-4">
              <Link href="/staedte" className="text-primary hover:underline text-sm font-medium">
                Alle {cities.length}+ Städte ansehen →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
