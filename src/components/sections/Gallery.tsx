"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/data";

export default function Gallery({ showAll = false }: { showAll?: boolean }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const displayImages = showAll ? galleryImages : galleryImages.slice(0, 6);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + displayImages.length) % displayImages.length
      );
    }
  };

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Unsere Arbeiten
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Einblicke in unsere Projekte - Küchen, Schlafzimmer, Büros und mehr
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 stagger-grid">
          {displayImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl group focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITEHE0FR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEEA/9oAzQKsdhbk3S4GQ5ITub9R4SkY6pSlTM2BXLqoJVRNn//Z"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.category}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeLightbox();
              if (e.key === "ArrowRight") nextImage();
              if (e.key === "ArrowLeft") prevImage();
            }}
            tabIndex={0}
            role="dialog"
            aria-label="Bildgalerie"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:text-primary transition-colors z-10"
              aria-label="Schließen"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 p-2 text-white hover:text-primary transition-colors z-10"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 p-2 text-white hover:text-primary transition-colors z-10"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <div
              className="relative w-full max-w-4xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[lightboxIndex].src}
                alt={displayImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="font-medium">
                {displayImages[lightboxIndex].alt}
              </p>
              <p className="text-sm text-white/60">
                {lightboxIndex + 1} / {displayImages.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
