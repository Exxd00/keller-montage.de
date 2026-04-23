"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Download, Palette, Image as ImageIcon, FileText, Check, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const CORRECT_PASSWORD = "Leavemealone2003+";

// Color Palette
const COLORS = [
  { name: "Primary (Coral Red)", hex: "#E84C5C", rgb: "rgb(232, 76, 92)", usage: "Buttons, Akzente, Logo" },
  { name: "Primary Hover", hex: "#D94C68", rgb: "rgb(217, 76, 104)", usage: "Button Hover Light Mode" },
  { name: "Primary Hover Dark", hex: "#FF6F8E", rgb: "rgb(255, 111, 142)", usage: "Button Hover Dark Mode" },
  { name: "Background Light", hex: "#FCFAF8", rgb: "rgb(252, 250, 248)", usage: "Hintergrund Hell" },
  { name: "Background Dark", hex: "#0F1115", rgb: "rgb(15, 17, 21)", usage: "Hintergrund Dunkel" },
  { name: "Card Light", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", usage: "Karten Hell" },
  { name: "Card Dark", hex: "#1B1F2A", rgb: "rgb(27, 31, 42)", usage: "Karten Dunkel" },
  { name: "Text Light", hex: "#1F2430", rgb: "rgb(31, 36, 48)", usage: "Text Hell" },
  { name: "Text Dark", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", usage: "Text Dunkel" },
  { name: "Muted Light", hex: "#5F6673", rgb: "rgb(95, 102, 115)", usage: "Sekundärtext Hell" },
  { name: "Muted Dark", hex: "#AAB0BC", rgb: "rgb(170, 176, 188)", usage: "Sekundärtext Dunkel" },
  { name: "Border Light", hex: "#F1E7E7", rgb: "rgb(241, 231, 231)", usage: "Rahmen Hell" },
  { name: "Border Dark", hex: "#232837", rgb: "rgb(35, 40, 55)", usage: "Rahmen Dunkel" },
];

// Downloadable Files
const LOGO_FILES = [
  { name: "Logo Light Mode", path: "/logo_day_mode_corrected.png", description: "PNG Logo für hellen Hintergrund" },
  { name: "Logo Dark Mode", path: "/logo_night_mode_corrected.png", description: "PNG Logo für dunklen Hintergrund" },
  { name: "Favicon", path: "/favicon.png", description: "Browser Favicon" },
  { name: "Logo SVG (Fallback)", path: "/logo.svg", description: "SVG Version" },
];

const PROJECT_IMAGES = [
  { name: "Hero Desktop", path: "/images/hero-desktop.jpg" },
  { name: "Projekt 1 - Vorher", path: "/images/projekt1-ikea-vorher.jpg" },
  { name: "Projekt 1 - Montage", path: "/images/projekt1-ikea-montage.jpg" },
  { name: "Projekt 1 - Nachher", path: "/images/projekt1-ikea-nachher.jpg" },
  { name: "Projekt 2 - Vorher", path: "/images/projekt2-wohnung-vorher.jpg" },
  { name: "Projekt 2 - Montage", path: "/images/projekt2-wohnung-montage.jpg" },
  { name: "Projekt 2 - Nachher", path: "/images/projekt2-wohnung-nachher.jpg" },
  { name: "Projekt 3 - Vorher", path: "/images/projekt3-familie-vorher.jpg" },
  { name: "Projekt 3 - Montage", path: "/images/projekt3-familie-montage.jpg" },
  { name: "Qualität Detail", path: "/images/quality-detail.jpg" },
  { name: "Team Professional", path: "/images/team-professional.jpg" },
];

const SEO_FILES = [
  { name: "sitemap.xml", path: "/sitemap.xml", description: "Sitemap für Suchmaschinen" },
  { name: "robots.txt", path: "/robots.txt", description: "Crawler Anweisungen" },
  { name: "manifest.json", path: "/manifest.json", description: "PWA Manifest" },
  { name: "schema.json", path: "/schema.json", description: "Strukturierte Daten (JSON-LD)" },
];

function ColorCard({ color }: { color: typeof COLORS[0] }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div
        className="w-full h-20 rounded-lg mb-3 border border-gray-200"
        style={{ backgroundColor: color.hex }}
      />
      <h4 className="font-semibold text-sm mb-1">{color.name}</h4>
      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center justify-between">
          <span>HEX:</span>
          <button
            onClick={() => copyToClipboard(color.hex)}
            className="flex items-center gap-1 font-mono hover:text-primary"
          >
            {color.hex}
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span>RGB:</span>
          <span className="font-mono text-[10px]">{color.rgb}</span>
        </div>
        <p className="text-[10px] mt-2 text-gray-500">{color.usage}</p>
      </div>
    </div>
  );
}

function DownloadCard({ file, type }: { file: { name: string; path: string; description?: string }; type: "logo" | "image" | "seo" }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      {type === "logo" || type === "image" ? (
        <div className="relative w-full h-32 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <Image
            src={file.path}
            alt={file.name}
            fill
            className="object-contain p-2"
          />
        </div>
      ) : (
        <div className="w-full h-20 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <FileText size={32} className="text-gray-400" />
        </div>
      )}
      <h4 className="font-semibold text-sm mb-1">{file.name}</h4>
      {file.description && (
        <p className="text-xs text-gray-500 mb-3">{file.description}</p>
      )}
      <a
        href={file.path}
        download
        className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
      >
        <Download size={14} />
        Herunterladen
      </a>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Falsches Passwort");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Bereich</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Bitte geben Sie das Passwort ein</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button type="submit" className="w-full btn-primary py-3 rounded-xl">
                Anmelden
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            KELLER Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Brand Assets, Farben und Downloads
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Farbpalette</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {COLORS.map((color, index) => (
              <ColorCard key={index} color={color} />
            ))}
          </div>
        </section>

        {/* Logo Files */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Logo Dateien</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOGO_FILES.map((file, index) => (
              <DownloadCard key={index} file={file} type="logo" />
            ))}
          </div>
        </section>

        {/* Project Images */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projekt Bilder</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PROJECT_IMAGES.map((file, index) => (
              <DownloadCard key={index} file={file} type="image" />
            ))}
          </div>
        </section>

        {/* SEO Files */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SEO Dateien</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SEO_FILES.map((file, index) => (
              <DownloadCard key={index} file={file} type="seo" />
            ))}
          </div>
        </section>

        {/* Business Info */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Geschäftsinformationen</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Kontakt</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Telefon: 0911 893 145 10</li>
                  <li>WhatsApp: 0160 2255443</li>
                  <li>E-Mail: info@keller-montage.de</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Adresse</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Hans Bunte Straße 26</li>
                  <li>90431 Nürnberg</li>
                  <li>Deutschland</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Mo-Fr: 10:00 - 18:00</li>
                  <li>Sonntag: geschlossen</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Links</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="https://keller-montage.de" target="_blank" rel="noopener" className="text-primary hover:underline">
                      Website
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/VMtxaGySYfnDoTZL9" target="_blank" rel="noopener" className="text-primary hover:underline">
                      Google Maps
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Exxd00/keller-montage.de" target="_blank" rel="noopener" className="text-primary hover:underline">
                      GitHub Repository
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 KELLER – DIE KÜCHENWELT. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </div>
  );
}
