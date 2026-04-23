"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentService, setCurrentService] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % BUSINESS.taglineServices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group no-underline"
            aria-label={`${BUSINESS.fullName} - Startseite`}
          >
<>
              <Image
                src="/logo_day_mode_corrected.png"
                alt={BUSINESS.name}
                width={80}
                height={40}
                className="h-9 sm:h-10 w-auto dark:hidden"
                priority
              />
              <Image
                src="/logo_night_mode_corrected.png"
                alt={BUSINESS.name}
                width={80}
                height={40}
                className="h-9 sm:h-10 w-auto hidden dark:block"
                priority
              />
            </>
            <div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                {BUSINESS.name}
              </span>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span>{BUSINESS.city}</span>
                <span className="mx-1">•</span>
                <span className="text-primary font-medium animate-fade-in" key={currentService}>
                  {BUSINESS.taglineServices[currentService]}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 no-underline min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Phone Button - Desktop */}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="hidden md:flex items-center gap-2 btn-primary px-4 py-3 rounded-full text-sm font-medium no-underline min-h-[44px]"
              aria-label={`Anrufen: ${BUSINESS.phoneDisplay}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Jetzt anrufen</span>
            </a>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full min-h-[44px] min-w-[44px]"
                >
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="w-5 h-5" />
                      <span>{BUSINESS.phoneDisplay}</span>
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
