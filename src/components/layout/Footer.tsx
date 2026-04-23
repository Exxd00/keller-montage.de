import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin, ChevronRight } from "lucide-react";
import { BUSINESS, NAV_LINKS, SERVICES, MAIN_CITIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white" role="contentinfo">
      <div className="container-max section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
<Image
                src="/logo_night_mode_corrected.png"
                alt={BUSINESS.name}
                width={80}
                height={40}
                className="h-9 w-auto"
              />
              <div>
                <span className="text-lg font-bold">{BUSINESS.name}</span>
                <p className="text-xs text-gray-400">{BUSINESS.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{BUSINESS.description}</p>
            <p className="text-gray-500 text-xs">Rechnung mit ausgewiesener MwSt.</p>
            <div className="space-y-2 text-sm mt-4">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors py-2 no-underline min-h-[44px]"
                aria-label={`Anrufen: ${BUSINESS.phone}`}
              >
                <Phone className="w-4 h-4" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors py-2 no-underline min-h-[44px]"
                aria-label={`E-Mail senden an: ${BUSINESS.email}`}
              >
                <Mail className="w-4 h-4" />
                {BUSINESS.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Schnelllinks">
            <h2 className="font-bold mb-4 text-white text-base">Navigation</h2>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 py-2 no-underline min-h-[44px]"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Leistungen">
            <h2 className="font-bold mb-4 text-white text-base">Leistungen</h2>
            <ul className="space-y-1">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/service/${service.slug}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 py-2 no-underline min-h-[44px]"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cities */}
          <nav aria-label="Städte">
            <h2 className="font-bold mb-4 text-white text-base">Städte</h2>
            <ul className="space-y-1">
              {MAIN_CITIES.slice(0, 6).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 py-2 no-underline min-h-[44px]"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/staedte"
                  className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium py-2 no-underline min-h-[44px]"
                >
                  <ChevronRight className="w-3 h-3" />
                  Alle Städte
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Info Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{BUSINESS.openingHours.display}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{BUSINESS.address}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Regionaler Montageservice in Nürnberg, Fürth, Erlangen und Umgebung.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-max py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {BUSINESS.fullName}. Alle Rechte vorbehalten.</p>
            <nav aria-label="Rechtliche Links">
              <ul className="flex items-center gap-4">
                <li>
                  <Link
                    href="/impressum"
                    className="hover:text-primary transition-colors py-2 no-underline min-h-[44px] inline-flex items-center"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/datenschutz"
                    className="hover:text-primary transition-colors py-2 no-underline min-h-[44px] inline-flex items-center"
                  >
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
