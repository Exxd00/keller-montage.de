import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, MapPin, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import FormCTA from "@/components/sections/FormCTA";
import {
  services,
  getAllServices,
  cities,
  businessInfo,
  testimonials,
} from "@/lib/data";

interface CityServicePageProps {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}

export async function generateStaticParams() {
  const allServices = getAllServices();
  const params: { citySlug: string; serviceSlug: string }[] = [];

  // Generate combinations for main cities with all services
  const mainCities = cities.filter((c) => c.isMain);

  for (const city of mainCities) {
    for (const service of allServices) {
      params.push({
        citySlug: city.slug,
        serviceSlug: service.slug,
      });
    }
  }

  // For other cities, only generate with main services
  const otherCities = cities.filter((c) => !c.isMain).slice(0, 100);
  const mainServices = services.map((s) => s.slug);

  for (const city of otherCities) {
    for (const serviceSlug of mainServices) {
      params.push({
        citySlug: city.slug,
        serviceSlug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: CityServicePageProps): Promise<Metadata> {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  const allServices = getAllServices();
  const service = allServices.find((s) => s.slug === serviceSlug);

  if (!city || !service) {
    return {
      title: "Seite nicht gefunden",
    };
  }

  const title = `${service.name} ${city.name} - Professioneller Service`;
  const description = `${service.name} in ${city.name}. Professionelle Montage von erfahrenen Experten. IKEA Spezialist. Jetzt kostenlos anfragen!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://keller-montage.de/${city.slug}/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { citySlug, serviceSlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  const allServices = getAllServices();
  const serviceData = allServices.find((s) => s.slug === serviceSlug);

  if (!city || !serviceData) {
    notFound();
  }

  const mainService = services.find((s) => s.id === serviceData.parentId);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceData.name} ${city.name}`,
    description: `${serviceData.name} in ${city.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: businessInfo.name,
      telephone: businessInfo.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "Bayern",
        addressCountry: "DE",
      },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
  };

  // Get related combinations
  const otherServicesInCity = allServices
    .filter((s) => s.slug !== serviceSlug)
    .slice(0, 6);

  const sameServiceInOtherCities = cities
    .filter((c) => c.slug !== citySlug && c.region === city.region)
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="pb-16" style={{ paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))' }}>
        <div className="container-max">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link
                  href={`/${city.slug}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {city.name}
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">{serviceData.name}</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 badge-primary mb-4">
              <MapPin className="w-4 h-4" />
              <span>{city.name}, {city.region}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient-animate">{serviceData.name}</span>
              <br />
              <span className="text-xl md:text-2xl">in {city.name}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Suchen Sie einen zuverlässigen Partner für {serviceData.name} in{" "}
              {city.name}? Wir sind Ihr lokaler Spezialist mit über{" "}
              {businessInfo.stats.yearsExperience} Jahren Erfahrung.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              {["Festpreise", "Schnelle Termine", "IKEA Spezialist"].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 rounded-xl font-medium shimmer"
              >
                <Phone className="w-5 h-5" />
                Jetzt anrufen
              </a>
              <Link
                href="/#kontakt-form"
                className="inline-flex items-center justify-center gap-2 btn-outline px-6 py-3 rounded-xl font-medium"
              >
                Kostenlos anfragen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Service details */}
          {mainService && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {serviceData.name} in {city.name} - Was wir bieten
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {mainService.features.map((feature) => (
                  <div
                    key={feature}
                    className="glass-card rounded-xl p-4 flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Testimonial */}
          <section className="mb-12 bg-muted/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold flex-shrink-0">
                {testimonials[0].name.charAt(0)}
              </div>
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground italic mb-2">
                  "{testimonials[0].text}"
                </p>
                <p className="text-sm text-muted-foreground">
                  - {testimonials[0].name}, {testimonials[0].location}
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <FormCTA cityName={city.name} serviceName={serviceData.name} />

          {/* Other services in this city */}
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Weitere Leistungen in {city.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
              {otherServicesInCity.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${city.slug}/${s.slug}`}
                  className="glass-card rounded-lg p-3 md:p-4 card-hover text-center"
                >
                  <span className="text-sm font-medium hover:text-primary transition-colors">
                    {s.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Same service in other cities */}
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              {serviceData.name} in anderen Städten
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
              {sameServiceInOtherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/${serviceSlug}`}
                  className="glass-card rounded-lg p-3 md:p-4 card-hover"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium hover:text-primary transition-colors">
                      {c.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
