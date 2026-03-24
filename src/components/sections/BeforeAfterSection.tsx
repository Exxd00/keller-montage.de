"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const images = [
  {
    src: "/images/before-kitchen.jpg",
    alt: "Küche vor der Montage - leerer Raum mit Kartons und Materialien",
    label: "Vorher",
    labelColor: "bg-[#1F2430]/80",
  },
  {
    src: "/images/vorher-nachher-nachher.jpg",
    alt: "Fertig montierte moderne Küche - sauber und perfekt installiert",
    label: "Nachher",
    labelColor: "bg-primary/90",
  },
];

// Lightbox Component
function ImageLightbox({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

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
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-3 sm:pt-6 sm:px-6 text-white">
        <div className="flex-1">
          <h3 className="text-sm font-medium">{currentImage.label}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Schließen"
        >
          <X size={22} />
        </button>
      </div>

      {/* Image Container */}
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

      {/* Navigation Dots */}
      <div className="p-4">
        <div className="flex justify-center items-center gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex flex-col items-center gap-1 transition-all ${
                index === currentIndex ? "opacity-100" : "opacity-50 hover:opacity-75"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary scale-125" : "bg-white/50"
                }`}
              />
              <span className="text-xs text-white">{img.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="section-padding section-gradient dark:bg-[#151821]">
      <div className="container-max relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#1F2430] dark:text-white">
              Vorher / Nachher
            </h2>
            <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base max-w-2xl mx-auto">
              Der Unterschied, den professionelle Montage macht – von der Lieferung bis zur fertigen Traumküche.
            </p>
          </div>
        </ScrollReveal>

        {/* Before/After Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Before Image */}
          <ScrollReveal variant="fadeRight" delay={100}>
            <button
              onClick={() => openLightbox(0)}
              className="relative group cursor-pointer w-full"
            >
            <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src="/images/vorher-nachher-vorher.jpg"
                alt="Küche vor der Montage - leerer Raum mit Kartons und Materialien"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              {/* Label */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-[#1F2430]/80 backdrop-blur-sm rounded-lg">
                <span className="text-white font-semibold text-sm md:text-base">Vorher</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                  <ZoomIn size={20} className="text-[#1F2430]" />
                </div>
              </div>
            </div>
            </button>
          </ScrollReveal>

          {/* After Image */}
          <ScrollReveal variant="fadeLeft" delay={200}>
            <button
              onClick={() => openLightbox(1)}
              className="relative group cursor-pointer w-full"
            >
            <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src="/images/vorher-nachher-nachher.jpg"
                alt="Fertig montierte moderne Küche - sauber und perfekt installiert"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              {/* Label */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-lg">
                <span className="text-white font-semibold text-sm md:text-base">Nachher</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                  <ZoomIn size={20} className="text-[#1F2430]" />
                </div>
              </div>
            </div>
            </button>
          </ScrollReveal>
        </div>

        {/* Optional Caption */}
        <ScrollReveal variant="fadeUp" delay={300}>
          <div className="text-center mt-8">
            <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base italic max-w-xl mx-auto">
              Saubere Vorbereitung, geschützter Boden, und ein perfektes Endergebnis –
              so arbeiten wir bei jedem Projekt.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
