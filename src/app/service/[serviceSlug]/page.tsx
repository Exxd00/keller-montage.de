import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  MapPin,
  Star,
  MessageCircle,
  Shield,
  Clock,
  FileText,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import FormCTA from "@/components/sections/FormCTA";
import { services, getAllServices, cities, businessInfo } from "@/lib/data";

interface ServicePageProps {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const allServices = getAllServices();
  return allServices.map((service) => ({
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const allServices = getAllServices();
  const service = allServices.find((s) => s.slug === serviceSlug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return {
    title: `${service.name} Nürnberg - Professioneller Service`,
    description: `${service.name} in Nürnberg und Umgebung. Professionell, schnell und zuverlässig. Jetzt kostenlos anfragen!`,
    alternates: {
      canonical: `https://keller-montage.de/service/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} Nürnberg - Professioneller Service`,
      description: `${service.name} in Nürnberg und Umgebung. Professionell, schnell und zuverlässig.`,
    },
  };
}

// Get price for service
function getServicePrice(serviceId: string): string {
  if (serviceId === "lieferungen") return "ab 39€";
  if (serviceId === "kuechenmontage") return "ab 149€";
  return "ab 59€";
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const allServices = getAllServices();
  const serviceData = allServices.find((s) => s.slug === serviceSlug);

  if (!serviceData) {
    notFound();
  }

  // Find the main service
  const mainService = services.find((s) => s.id === serviceData.parentId);
  const mainCities = cities.filter((c) => c.isMain).slice(0, 8);
  const relatedServices = allServices
    .filter((s) => s.parentId === serviceData.parentId && s.slug !== serviceSlug)
    .slice(0, 8);

  const servicePrice = getServicePrice(serviceData.parentId);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceData.name,
    description: `${serviceData.name} in Nürnberg und Umgebung`,
    provider: {
      "@type": "LocalBusiness",
      name: businessInfo.name,
      telephone: businessInfo.phone,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "120",
      },
    },
    areaServed: {
      "@type": "State",
      name: "Bayern",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                Heute noch Termine verfügbar
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex justify-center mb-4 text-sm">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary no-underline">
                    Home
                  </Link>
                </li>
                <li className="text-muted-foreground">/</li>
                <li>
                  <Link
                    href="/leistungen"
                    className="text-muted-foreground hover:text-primary no-underline"
                  >
                    Leistungen
                  </Link>
                </li>
                <li className="text-muted-foreground">/</li>
                <li className="text-foreground font-medium">{serviceData.name}</li>
              </ol>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
                <span>{serviceData.parentName}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                <span className="text-primary">{serviceData.name}</span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl">{servicePrice}</span>
              </h1>

              <p className="text-lg font-medium text-foreground mb-2">
                Festpreis – Schnell – Zuverlässig
              </p>

              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Professionelle {serviceData.name} von erfahrenen Experten in Nürnberg und Umgebung.
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
          {/* Trust Elements */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 py-6 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span>Professioneller Service</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" />
              <span>100% Festpreise</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>Termine in 24-48h</span>
            </div>
          </div>

          {/* Features */}
          {mainService && (
            <section className="py-8 md:py-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Was wir bieten
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

          {/* Available cities */}
          <section className="py-8 md:py-10">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
              {serviceData.name} in diesen Städten
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
              {mainCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}/${serviceSlug}`}
                  className="glass-card rounded-lg p-3 md:p-4 card-hover group no-underline"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {serviceData.name} {city.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link
                href="/staedte"
                className="text-primary hover:underline text-sm font-medium"
              >
                Alle {cities.length}+ Städte anzeigen →
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <FormCTA serviceName={serviceData.name} />

          {/* Related services */}
          {relatedServices.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Ähnliche Leistungen
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/service/${related.slug}`}
                    className="glass-card rounded-lg p-3 md:p-4 card-hover text-center no-underline"
                  >
                    <span className="text-sm font-medium hover:text-primary transition-colors">
                      {related.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
