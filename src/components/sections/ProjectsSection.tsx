"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

interface ProjectImage {
  src: string;
  alt: string;
  label: string;
  labelColor: string;
  flipped?: boolean;
}

interface Project {
  id: number;
  title: string;
  images: ProjectImage[];
  descriptions: {
    vorher: string;
    montage: string;
    nachher: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Projekt in Nürnberg – IKEA Küchenmontage",
    images: [
      {
        src: "/images/projekt1-ikea-vorher.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 1 vorher",
        label: "Vorher",
        labelColor: "bg-[#1F2430]/80",
      },
      {
        src: "/images/projekt1-ikea-montage.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 1 während der Montage",
        label: "Montage",
        labelColor: "bg-[#F59E0B]/90",
      },
      {
        src: "/images/projekt1-ikea-nachher.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 1 nach der Montage",
        label: "Nachher",
        labelColor: "bg-primary/90",
      },
    ],
    descriptions: {
      vorher: "Unmontierte Küche mit vorbereiteten Elementen und geschütztem Arbeitsbereich.",
      montage: "Fachgerechte Installation der Schränke mit sauberer Arbeitsweise und Bodenschutz.",
      nachher: "Perfekt montierte Küche – sauber, ausgerichtet und sofort nutzbar.",
    },
  },
  {
    id: 2,
    title: "Projekt in Nürnberg – Küchenmontage in kleiner Wohnung",
    images: [
      {
        src: "/images/projekt2-wohnung-vorher.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 2 vorher",
        label: "Vorher",
        labelColor: "bg-[#1F2430]/80",
      },
      {
        src: "/images/projekt2-wohnung-montage.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 2 während der Montage",
        label: "Montage",
        labelColor: "bg-[#F59E0B]/90",
      },
      {
        src: "/images/projekt2-wohnung-nachher.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 2 nach der Montage",
        label: "Nachher",
        labelColor: "bg-primary/90",
      },
    ],
    descriptions: {
      vorher: "Kompakter Küchenbereich mit geschütztem Boden.",
      montage: "Zwei Monteure arbeiten effizient und strukturiert.",
      nachher: "Funktionale und sauber montierte Küche.",
    },
  },
  {
    id: 3,
    title: "Projekt in Nürnberg – Familienküche Montage",
    images: [
      {
        src: "/images/projekt3-familie-vorher.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 3 vorher",
        label: "Vorher",
        labelColor: "bg-[#1F2430]/80",
      },
      {
        src: "/images/projekt3-familie-montage.jpg",
        alt: "Küchenmontage in Nürnberg – Projekt 3 während der Montage",
        label: "Montage",
        labelColor: "bg-[#F59E0B]/90",
      },
      {
        src: "https://ugc.same-assets.com/4M5X_n_qV59YieFX37n2aiPZMFWwarkM.jpeg",
        alt: "Küchenmontage in Nürnberg – Projekt 3 nach der Montage",
        label: "Nachher",
        labelColor: "bg-primary/90",
      },
    ],
    descriptions: {
      vorher: "Vorbereiteter Küchenbereich im Wohnraum.",
      montage: "Saubere und strukturierte Montage mit Bodenschutz.",
      nachher: "Fertig montierte Küche – bereit für den Alltag.",
    },
  },
];

// Fullscreen Lightbox Component
function ImageLightbox({
  images,
  initialIndex,
  onClose,
  projectTitle,
}: {
  images: ProjectImage[];
  initialIndex: number;
  onClose: () => void;
  projectTitle: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
  }, [images.length]);

  const toggleZoom = () => {
    setScale((prev) => (prev === 1 ? 1.5 : 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
  };

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col">
      {/* Header - Safe area padding for mobile */}
      <div className="flex items-center justify-between px-4 pt-14 pb-3 sm:pt-6 sm:px-6 text-white safe-area-top">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-sm font-medium truncate">{projectTitle}</h3>
          <p className="text-xs text-white/70">{currentImage.label}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleZoom}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={scale === 1 ? "Zoom in" : "Zoom out"}
          >
            {scale === 1 ? <ZoomIn size={22} /> : <ZoomOut size={22} />}
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Schließen"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="absolute left-2 md:left-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image */}
        <div
          className="relative w-full h-full max-w-4xl mx-auto px-12 md:px-20 transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className={`object-contain ${currentImage.flipped ? "-scale-x-100" : ""}`}
            sizes="100vw"
            priority
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute right-2 md:right-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Navigation Dots & Labels */}
      <div className="p-4">
        <div className="flex justify-center items-center gap-6">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setScale(1);
              }}
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
        <p className="text-center text-white/50 text-xs mt-3">
          Wischen oder Pfeile zum Navigieren
        </p>
      </div>
    </div>
  );
}

// Mobile Image Carousel Component
function MobileImageCarousel({
  images,
  descriptions,
  onImageClick,
}: {
  images: ProjectImage[];
  descriptions: { vorher: string; montage: string; nachher: string };
  onImageClick: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
  };

  const currentImage = images[currentIndex];
  const currentDescription =
    currentIndex === 0
      ? descriptions.vorher
      : currentIndex === 1
        ? descriptions.montage
        : descriptions.nachher;

  return (
    <div className="relative">
      {/* Image Container */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => onImageClick(currentIndex)}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className={`object-cover transition-transform duration-300 ${currentImage.flipped ? "-scale-x-100" : ""}`}
          sizes="100vw"
        />

        {/* Label Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1.5 ${currentImage.labelColor} backdrop-blur-sm rounded-lg`}
        >
          <span className="text-white font-semibold text-sm">{currentImage.label}</span>
        </div>

        {/* Tap to expand hint */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs flex items-center gap-1">
            <ZoomIn size={12} /> Tippen zum Vergrößern
          </span>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-[#1F2430]" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-[#1F2430]" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-4 py-3 bg-[#F9F7F7] dark:bg-[#1B1F2A] border-t border-[#F1E7E7] dark:border-[#232837]">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary text-white"
                : "bg-white dark:bg-[#232837] text-[#5F6673] dark:text-[#AAB0BC] hover:bg-primary/10"
            }`}
          >
            <span className="text-xs font-medium">{img.label}</span>
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="px-4 py-3 border-t border-[#F1E7E7] dark:border-[#232837]">
        <p className="text-sm text-[#5F6673] dark:text-[#AAB0BC]">
          <span className="font-medium text-[#1F2430] dark:text-white">{currentImage.label}:</span>{" "}
          {currentDescription}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1B1F2A] rounded-2xl border border-[#F1E7E7] dark:border-[#232837] overflow-hidden shadow-sm">
        {/* Project Title */}
        <div className="px-4 py-3 md:p-5 border-b border-[#F1E7E7] dark:border-[#232837]">
          <h3 className="text-base md:text-lg font-bold text-[#1F2430] dark:text-white">
            {project.title}
          </h3>
        </div>

        {/* MOBILE: Carousel with arrows and fullscreen */}
        <div className="md:hidden">
          <MobileImageCarousel
            images={project.images}
            descriptions={project.descriptions}
            onImageClick={openLightbox}
          />
        </div>

        {/* DESKTOP: 3 columns side by side */}
        <div className="hidden md:grid md:grid-cols-3">
          {project.images.map((img, index) => (
            <div
              key={index}
              className="relative cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-105 ${img.flipped ? "-scale-x-100" : ""}`}
                  sizes="33vw"
                />
                <div
                  className={`absolute bottom-3 left-3 px-3 py-1.5 ${img.labelColor} backdrop-blur-sm rounded-lg`}
                >
                  <span className="text-white font-semibold text-sm">{img.label}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                    <ZoomIn size={20} className="text-[#1F2430]" />
                  </div>
                </div>
              </div>
              <div
                className={`p-4 ${index < 2 ? "border-r border-[#F1E7E7] dark:border-[#232837]" : ""}`}
              >
                <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm">
                  {index === 0 && project.descriptions.vorher}
                  {index === 1 && project.descriptions.montage}
                  {index === 2 && project.descriptions.nachher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={project.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          projectTitle={project.title}
        />
      )}
    </>
  );
}

export function ProjectsSection() {
  return (
    <section className="section-padding section-gradient dark:bg-[#151821]" id="projekte">
      <div className="container-max relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-[#1F2430] dark:text-white">
            Unsere Küchenmontagen
          </h2>
          <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base max-w-2xl mx-auto">
            Einblicke in echte Küchenmontage-Projekte in Nürnberg und Umgebung.
          </p>
          <p className="text-primary text-xs md:text-sm mt-2 flex items-center justify-center gap-1">
            <ChevronLeft size={14} />
            <span>Wischen oder tippen zum Erkunden</span>
            <ChevronRight size={14} />
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6 md:space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
