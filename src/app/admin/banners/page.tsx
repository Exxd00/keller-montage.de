"use client";

import { useState } from "react";

const bannerSizes = [
  { name: "Landscape (1200x628)", width: 1200, height: 628 },
  { name: "Square (1200x1200)", width: 1200, height: 1200 },
  { name: "Rectangle (300x250)", width: 300, height: 250 },
  { name: "Leaderboard (728x90)", width: 728, height: 90 },
  { name: "Large Rectangle (336x280)", width: 336, height: 280 },
];

const bannerVariants = [
  {
    id: "moebelmontage",
    title: "Möbelmontage",
    headline: "Möbelmontage Nürnberg",
    subheadline: "Professionell • Schnell • Festpreis",
    cta: "Jetzt Angebot erhalten",
    bgGradient: "from-amber-600 to-orange-700",
    icon: "🔧",
  },
  {
    id: "ikea",
    title: "IKEA Service",
    headline: "IKEA Montage Spezialist",
    subheadline: "PAX • METOD • BESTA & mehr",
    cta: "Kostenlos anfragen",
    bgGradient: "from-blue-600 to-blue-800",
    icon: "📦",
  },
  {
    id: "kueche",
    title: "Küchenmontage",
    headline: "Küchenmontage Komplett",
    subheadline: "Inkl. Elektro & Wasseranschluss",
    cta: "Termin vereinbaren",
    bgGradient: "from-emerald-600 to-teal-700",
    icon: "🍳",
  },
  {
    id: "express",
    title: "Express Service",
    headline: "Express-Service verfügbar",
    subheadline: "Termin in 24h möglich",
    cta: "Jetzt buchen",
    bgGradient: "from-red-600 to-rose-700",
    icon: "⚡",
  },
];

function BannerPreview({
  variant,
  size,
  showBadge = true,
}: {
  variant: (typeof bannerVariants)[0];
  size: { width: number; height: number };
  showBadge?: boolean;
}) {
  const isSmall = size.width < 400 || size.height < 150;
  const isLeaderboard = size.width > size.height * 3;
  const isSquare = Math.abs(size.width - size.height) < 100;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${variant.bgGradient} text-white`}
      style={{
        width: size.width / 2,
        height: size.height / 2,
        minWidth: isSmall ? size.width : size.width / 2,
        minHeight: isSmall ? size.height : size.height / 2,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
      </div>

      {/* Content */}
      <div
        className={`relative h-full flex ${isLeaderboard ? "flex-row items-center justify-between px-4" : "flex-col justify-center"} ${isSmall ? "p-2" : "p-4"}`}
      >
        {/* Badge */}
        {showBadge && !isSmall && (
          <div
            className={`${isLeaderboard ? "" : "absolute top-2 left-2"} bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium`}
          >
            12 Jahre Erfahrung
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${isLeaderboard ? "flex items-center gap-4" : "text-center"}`}
        >
          {!isSmall && (
            <span
              className={`${isLeaderboard ? "text-3xl" : isSquare ? "text-5xl mb-3 block" : "text-4xl mb-2 block"}`}
            >
              {variant.icon}
            </span>
          )}
          <div>
            <h2
              className={`font-bold ${isSmall ? "text-sm" : isLeaderboard ? "text-lg" : isSquare ? "text-2xl" : "text-xl"} leading-tight`}
            >
              {variant.headline}
            </h2>
            {!isSmall && (
              <p
                className={`${isLeaderboard ? "text-sm" : "text-base"} opacity-90 mt-1`}
              >
                {variant.subheadline}
              </p>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          className={`${isLeaderboard ? "" : "mt-3"} bg-white text-gray-900 font-semibold rounded-full ${isSmall ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm"} shadow-lg hover:shadow-xl transition-shadow`}
        >
          {variant.cta}
        </button>

        {/* Trust badges */}
        {!isSmall && !isLeaderboard && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs opacity-80">
            <span>✓ 5.000+ Kunden</span>
            <span>•</span>
            <span>✓ Festpreis</span>
          </div>
        )}
      </div>

      {/* Logo/Brand */}
      <div
        className={`absolute ${isLeaderboard ? "right-4" : "bottom-2 right-2"} text-xs font-medium opacity-70`}
      >
        keller-montage.de
      </div>
    </div>
  );
}

export default function BannersPage() {
  const [selectedVariant, setSelectedVariant] = useState(bannerVariants[0]);
  const [selectedSize, setSelectedSize] = useState(bannerSizes[0]);

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Admin - Banner Generator</title>
      </head>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Ads Banner Generator
          </h1>
          <p className="text-gray-600">
            Erstellen Sie Banner für Ihre Display-Remarketing-Kampagne.
            Screenshots können direkt in Google Ads hochgeladen werden.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Banner-Variante
              </label>
              <div className="grid grid-cols-2 gap-2">
                {bannerVariants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedVariant.id === variant.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{variant.icon}</span>
                    <span className="block text-sm font-medium mt-1">
                      {variant.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Banner-Größe
              </label>
              <div className="space-y-2">
                {bannerSizes.map((size) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedSize.name === size.name
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="font-medium">{size.name}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({size.width} x {size.height}px)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vorschau (50% Skaliert)
          </h2>
          <div className="flex justify-center bg-gray-100 rounded-lg p-8 overflow-auto">
            <BannerPreview variant={selectedVariant} size={selectedSize} />
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Machen Sie einen Screenshot dieses Banners und laden Sie ihn in
            Google Ads hoch.
          </p>
        </div>

        {/* All Variants Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Alle Banner-Varianten (Landscape 1200x628)
          </h2>
          <div className="grid gap-6">
            {bannerVariants.map((variant) => (
              <div key={variant.id} className="space-y-2">
                <h3 className="font-medium text-gray-700">{variant.title}</h3>
                <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
                  <BannerPreview
                    variant={variant}
                    size={{ width: 1200, height: 628 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-amber-900 mb-3">
            📋 Anleitung zum Hochladen in Google Ads
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-amber-800">
            <li>
              Wählen Sie die gewünschte Banner-Variante und Größe aus
            </li>
            <li>
              Machen Sie einen Screenshot des Banners (Windows: Win+Shift+S /
              Mac: Cmd+Shift+4)
            </li>
            <li>Öffnen Sie Google Ads Editor oder die Google Ads Weboberfläche</li>
            <li>
              Gehen Sie zur Kampagne &quot;DE_Display_Remarketing&quot; → Ad Group
              &quot;AG_Remarketing_All&quot;
            </li>
            <li>Erstellen Sie eine neue &quot;Responsive Display Ad&quot;</li>
            <li>
              Laden Sie die Screenshots als Marketing-Bilder hoch:
              <ul className="list-disc list-inside ml-4 mt-1 text-sm">
                <li>Landscape Image: 1200 x 628 px (1.91:1)</li>
                <li>Square Image: 1200 x 1200 px (1:1)</li>
                <li>Logo: Ihr Firmenlogo</li>
              </ul>
            </li>
            <li>
              Die Texte aus der CSV-Datei können direkt kopiert werden
            </li>
          </ol>
        </div>
      </div>
    </div>
    </>
  );
}
