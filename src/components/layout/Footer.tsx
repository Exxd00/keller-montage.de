"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { businessInfo, services } from "@/lib/data";

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white" role="contentinfo">
      <div className="container-max py-8 lg:py-10">
        {/* Main Content - Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Company Info & Contact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-bold">{businessInfo.displayName}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Professionelle Möbel- & Küchenmontage in Nürnberg und Umgebung.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors no-underline"
              >
                <Phone className="w-4 h-4 text-primary" />
                {businessInfo.phone}
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors no-underline"
              >
                <Mail className="w-4 h-4 text-primary" />
                {businessInfo.email}
              </a>
            </div>
          </div>

          {/* Services - Inline */}
          <nav aria-label="Leistungen">
            <h2 className="font-bold mb-3 text-white text-sm">Leistungen</h2>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/service/${service.slug}`}
                  className="text-xs text-gray-400 hover:text-primary transition-colors bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full no-underline"
                >
                  {service.shortName}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link href="/leistungen" className="text-xs text-primary hover:text-primary/80 no-underline">
                Alle Leistungen
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/staedte" className="text-xs text-primary hover:text-primary/80 no-underline">
                Alle Städte
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/kontakt" className="text-xs text-primary hover:text-primary/80 no-underline">
                Kontakt
              </Link>
            </div>
          </nav>

          {/* Working Hours & Location */}
          <div>
            <h2 className="font-bold mb-3 text-white text-sm">Erreichbarkeit</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{businessInfo.workingHours.daily}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{businessInfo.address.city}, {businessInfo.address.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {businessInfo.name}</p>
          <nav aria-label="Rechtliche Links" className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors no-underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
