"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { businessInfo, services } from "@/lib/data";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Leistungen", href: "/leistungen" },
  { name: "Städte", href: "/staedte" },
  { name: "Arbeiten", href: "/arbeiten" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check current theme state
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    // Initial check
    checkTheme();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Animate through services
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
      style={{
        paddingTop: `max(env(safe-area-inset-top, 0px), ${isScrolled ? '0.5rem' : '1rem'})`,
      }}
    >
      <div className="container-max">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group no-underline" aria-label="Möbelmontage Nürnberg - Startseite">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/30">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-white"
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
            <div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                Möbelmontage
              </span>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span>Nürnberg</span>
                <span className="mx-1">•</span>
                <span
                  key={currentService}
                  className="text-primary font-medium animate-fade-in"
                >
                  {services[currentService].shortName}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 no-underline min-h-[44px] flex items-center"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}
            >
              {isDark ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {/* Phone Button */}
            <a
              href={`tel:${businessInfo.phone}`}
              className="hidden md:flex items-center gap-2 btn-primary px-4 py-3 rounded-full text-sm font-medium no-underline min-h-[44px]"
              aria-label={`Anrufen: ${businessInfo.phone}`}
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "phone_click", {
                    event_category: "contact",
                    event_label: "header_phone",
                  });
                }
              }}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="hidden xl:inline">Jetzt anrufen</span>
            </a>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-full min-h-[44px] min-w-[44px]">
                  <Menu className="w-5 h-5" aria-hidden="true" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile Navigation">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium py-3 border-b border-border hover:text-primary transition-colors no-underline min-h-[44px] flex items-center"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-3">
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="flex items-center justify-center gap-2 btn-primary py-3 rounded-xl text-center no-underline min-h-[44px]"
                      aria-label={`Anrufen: ${businessInfo.phone}`}
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      Jetzt anrufen
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
