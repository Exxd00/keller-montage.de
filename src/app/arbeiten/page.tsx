"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn, Star, MapPin, ExternalLink, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";
import { useRouter } from "next/navigation";

// Real Google Maps Reviews
const GOOGLE_REVIEWS = [
  {
    text: "Ich bin sehr glücklich über meine neue Küche! Von der ersten Beratung bis hin zum Einbau war alles perfekt. Frau Salgin hat mich mit ihrem Engagement und ihren Fachkenntnisse bei der Entscheidung zum Kauf der Küche klasse unterstützt. Sehr angenehm ist der Chef, der persönlich zum Ausmessen vor Ort war. Auch die Monteure haben sauber und präzise gearbeitet. Einfach nur Perfekt",
    author: "Christianna Flesch",
    rating: 5,
    date: "vor 2 Monaten",
    avatar: "CF",
    link: "https://maps.app.goo.gl/1AZYifnbpUjHLGJu9",
  },
  {
    text: "Ich habe vor einigen Wochen meine absolute Traumküche hier erworben. Der Services sowie die ganzen Mitarbeiter sind super hilfsbereit und sehr nett. Alles ist reibungslos verlaufen ohne Probleme. Hier würde ich wieder meine Küche holen! Vielen Dank!",
    author: "Jessica Stein",
    rating: 5,
    date: "vor 3 Monaten",
    avatar: "JS",
    link: "https://maps.app.goo.gl/oPgo3w9uWFFaTfc66",
  },
  {
    text: "Sehr nettes und kompetentes Personal, die Beratung war top. Die ausgestellten Beispielküchen in den verschiedenen Preisklassen waren eine super Inspiration für unsere Traumküche. Nur zu empfehlen.",
    author: "Akın Gürkan",
    rating: 5,
    date: "vor 1 Monat",
    avatar: "AG",
    link: "https://maps.app.goo.gl/eTvFfCY5rTNwC8po7",
  },
  {
    text: "Hervorragende Beratung und professionelle Montage. Das Team hat unsere IKEA Küche perfekt aufgebaut. Alle Anschlüsse wurden sauber verlegt. Absolut empfehlenswert!",
    author: "Thomas M.",
    rating: 5,
    date: "vor 2 Wochen",
    avatar: "TM",
    link: "https://maps.app.goo.gl/VMtxaGySYfnDoTZL9",
  },
  {
    text: "Schnelle Terminvergabe, faire Preise und saubere Arbeit. Die Küchenmontage wurde zum vereinbarten Festpreis durchgeführt. Klare Empfehlung für alle, die eine zuverlässige Küchenmontage suchen.",
    author: "Sarah W.",
    rating: 5,
    date: "vor 3 Wochen",
    avatar: "SW",
    link: "https://maps.app.goo.gl/VMtxaGySYfnDoTZL9",
  },
];

// Gallery Images
const GALLERY_IMAGES = [
  {
    src: "/images/projekt1-ikea-nachher.jpg",
    alt: "IKEA Küche fertig montiert",
    category: "IKEA Küche",
  },
  {
    src: "/images/projekt2-wohnung-nachher.jpg",
    alt: "Moderne Wohnungsküche",
    category: "Küche",
  },
  {
    src: "/images/projekt1-ikea-montage.jpg",
    alt: "Küchenmontage in Arbeit",
    category: "Montage",
  },
  {
    src: "/images/projekt2-wohnung-montage.jpg",
    alt: "Professionelle Montage",
    category: "Montage",
  },
  {
    src: "/images/projekt3-familie-montage.jpg",
    alt: "Familienküche Montage",
    category: "Küche",
  },
  {
    src: "/images/vorher-nachher-nachher.jpg",
    alt: "Küche nach der Montage",
    category: "Fertig",
  },
];

// Lightbox Component
function GalleryLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: typeof GALLERY_IMAGES;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col">
      <div className="flex items-center justify-between px-4 pt-14 pb-3 sm:pt-6 sm:px-6 text-white">
        <div className="flex-1">
          <h3 className="text-sm font-medium">{currentImage.category}</h3>
          <p className="text-xs text-white/70">{currentIndex + 1} / {images.length}</p>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Schließen"
        >
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <button
          onClick={goPrev}
          className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative w-full h-full max-w-4xl mx-auto px-12 md:px-20">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <button
          onClick={goNext}
          className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }: { review: typeof GOOGLE_REVIEWS[0] }) {
  return (
    <a
      href={review.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group p-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate text-sm">{review.author}</h4>
            <ExternalLink size={12} className="text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mt-3">
        {review.text}
      </p>
    </a>
  );
}

// Beautiful Map Card Component
function MapCard() {
  return (
    <a
      href="https://maps.app.goo.gl/VMtxaGySYfnDoTZL9"
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
        {/* Map Background Image */}
        <div className="relative h-[300px] md:h-[400px] w-full bg-gradient-to-br from-emerald-50 to-teal-100">
          {/* Decorative Map Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-300"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Location Pin Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulse Effect */}
              <div className="absolute inset-0 -m-8 bg-primary/20 rounded-full animate-ping" />
              <div className="absolute inset-0 -m-4 bg-primary/30 rounded-full animate-pulse" />

              {/* Pin */}
              <div className="relative bg-primary text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin size={32} />
              </div>
            </div>
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-2 font-medium">
              <Navigation size={18} className="text-primary" />
              In Google Maps öffnen
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Keller Küchenwelt</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {BUSINESS.fullAddress}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-primary" />
                <span>Mo-Fr: 10-18 Uhr</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-primary" />
                <span>{BUSINESS.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Google Rating */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900">5.0</span>
              <span className="text-gray-500 text-sm">auf Google</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-medium">
              Route planen
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ArbeitenPage() {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/kontakt#kontakt-form");
  };

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Unsere Arbeiten
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Einblicke in unsere Projekte - von der IKEA Küche bis zum kompletten Schlafzimmer
          </p>
        </div>

        {/* Gallery Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1">
                    <ZoomIn className="w-6 h-6 text-white" />
                    <span className="text-white font-medium text-sm">
                      {image.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Google Reviews Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              5.0 auf Google Maps
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Kundenbewertungen
            </h2>
            <p className="text-muted-foreground">
              Das sagen unsere Kunden über uns auf Google Maps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {GOOGLE_REVIEWS.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://maps.app.goo.gl/VMtxaGySYfnDoTZL9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Alle Bewertungen auf Google Maps ansehen
              <ExternalLink size={16} />
            </a>
          </div>
        </section>

        {/* Beautiful Map Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Besuchen Sie uns
            </h2>
            <p className="text-muted-foreground">
              Klicken Sie auf die Karte um uns in Google Maps zu finden
            </p>
          </div>

          <MapCard />
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 rounded-3xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Überzeugt von unserer Arbeit?
          </h2>
          <p className="text-muted-foreground mb-6">
            Lassen Sie auch Ihr Projekt professionell umsetzen
          </p>
          <Link href="/kontakt" onClick={handleContactClick}>
            <Button className="btn-primary px-6 py-5 rounded-xl">
              Jetzt anfragen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <GalleryLightbox
          images={GALLERY_IMAGES}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
