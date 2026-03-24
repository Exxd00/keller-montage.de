"use client";
// Cache busted: v2
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MapPin, Clock, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";

export function HeroSection() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactForm = document.getElementById("kontakt-form");
    if (contactForm) {
      const yOffset = -80;
      const y = contactForm.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.location.href = "/kontakt#kontakt-form";
    }
  };

  return (
    <section className="relative min-h-[auto] lg:min-h-screen pt-24 pb-6 md:pt-32 md:pb-16 overflow-hidden">
      {/* Background with angled kitchen image overlay and gradient - inspired by rohrreinigungkraft.de */}
      <div className="absolute inset-0">
        {/* Base gradient - Light Mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCFAF8] via-white to-[#FFF5F7] dark:from-[#0F1115] dark:via-[#151821] dark:to-[#1B1F2A]" />

        {/* Angled Background Image - Desktop Only */}
        <div
          className="absolute top-0 right-0 w-[60%] h-full overflow-hidden hidden lg:block"
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          {/* Kitchen Background Image */}
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: 'url(/images/hero-desktop.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Gradient Overlay on Image - Light Mode */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-white dark:via-[#0F1115]/50 dark:to-[#0F1115]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30 dark:from-[#0F1115]/60 dark:to-[#0F1115]/40" />
          {/* Primary color tint overlay */}
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        </div>

        {/* Mobile Background - Subtle pattern instead of distracting image */}
        <div className="absolute inset-0 lg:hidden">
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAF8] via-white to-[#FFF5F7] dark:from-[#0F1115] dark:via-[#151821] dark:to-[#1B1F2A]" />
          {/* Subtle decorative elements */}
          <div className="absolute top-[10%] right-[5%] w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-[20%] left-[5%] w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-[50%] right-[15%] w-24 h-24 rounded-full bg-primary/3 blur-2xl" />
        </div>




      </div>

      <div className="container-max relative z-10">
        {/* Mobile Layout - Clean background for clear text */}
        <div className="lg:hidden text-center px-4 relative z-20">
          {/* Quick Appointment Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 mb-5 animate-slide-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Schnelle Termine verfügbar</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[1.75rem] sm:text-3xl font-bold leading-tight text-[#1F2430] dark:text-white mb-5 animate-slide-up-delay-1">
            <span className="block">Neue Küche?</span>
            <span className="text-primary">Wir montieren ab 149€</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#1F2430]/80 dark:text-white/80 mb-4 leading-relaxed animate-slide-up-delay-2">
            Professionelle Küchenmontage in <span className="text-primary font-semibold">{BUSINESS.city}</span> und <span className="text-primary font-semibold">Umgebung</span>.<br />
            Sauber, schnell und zum Festpreis.
          </p>

          {/* Emotional Line */}
          <p className="text-base sm:text-lg text-primary font-medium mb-8 animate-slide-up-delay-3">
            Ohne Stress zur fertigen Küche.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 mb-5 animate-slide-up-delay-4">
            <a
              href={`tel:${BUSINESS.phone}`}
              data-source="hero_mobile"
              data-cta="phone_call"
              data-cta-location="hero_section"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-lg shadow-primary/30 hover:scale-[1.02] text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Jetzt anrufen</span>
            </a>

            <Link
              href="/kontakt"
              onClick={scrollToContact}
              className="flex-1"
              data-cta="contact_form"
              data-cta-location="hero_section_mobile"
            >
              <Button size="lg" className="w-full py-3.5 text-sm sm:text-base rounded-full bg-white dark:bg-[#1B1F2A] border-2 border-[#E8E0E0] dark:border-[#2A2F3A] text-[#1F2430] dark:text-white font-medium hover:border-primary/50 transition-all shadow-lg hover:scale-[1.02] hover:bg-white">
                Kostenlos anfragen
                <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>

          {/* Quick response text */}
          <p className="text-sm text-[#5F6673] dark:text-[#AAB0BC] mb-6 animate-slide-up-delay-5">
            Antwort in kurzer Zeit – schnell & unkompliziert
          </p>

          {/* 3 Marketing Features */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 animate-fade-in-delay">
            <div className="flex items-center gap-1.5 text-[#5F6673] dark:text-[#AAB0BC]">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">Lokaler Fachbetrieb</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5F6673] dark:text-[#AAB0BC]">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">24-48h Termin</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5F6673] dark:text-[#AAB0BC]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">Saubere Arbeit</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center min-h-[60vh] xl:min-h-[70vh]">
          {/* Text Content */}
          <div className="text-left relative z-20 max-w-2xl xl:max-w-3xl">
            {/* Quick Appointment Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 mb-6 animate-slide-up">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Schnelle Termine verfügbar</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-[3.5rem] 2xl:text-[4rem] font-bold leading-[1.15] text-[#1F2430] dark:text-white mb-6 animate-slide-up-delay-1">
              Neue Küche? <br /><span className="text-primary">Wir montieren ab 149€</span>
            </h1>

            <p className="text-lg lg:text-xl xl:text-2xl text-[#1F2430]/80 dark:text-white/80 mb-4 animate-slide-up-delay-2">
              Professionelle Küchenmontage in <span className="text-primary font-semibold">{BUSINESS.city}</span> und <span className="text-primary font-semibold">Umgebung</span>.<br />
              Sauber, schnell und zum Festpreis.
            </p>

            <p className="text-lg text-primary font-medium mb-10 animate-slide-up-delay-3">
              Ohne Stress zur fertigen Küche.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 mb-4 animate-slide-up-delay-4">
              <a
                href={`tel:${BUSINESS.phone}`}
                data-source="hero_desktop"
                data-cta="phone_call"
                data-cta-location="hero_section"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-lg transition-all shadow-lg shadow-primary/30 hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" />
                <span>Jetzt anrufen</span>
              </a>

              <Link
                href="/kontakt"
                onClick={scrollToContact}
                data-cta="contact_form"
                data-cta-location="hero_section_desktop"
              >
                <Button size="lg" className="px-8 py-6 rounded-full bg-white dark:bg-[#1B1F2A] border-2 border-[#E8E0E0] dark:border-[#2A2F3A] text-[#1F2430] dark:text-white font-medium hover:border-primary/50 transition-all shadow-lg hover:scale-[1.02] hover:bg-white">
                  Kostenlos anfragen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Quick response text */}
            <p className="text-sm text-[#5F6673] dark:text-[#AAB0BC] mb-6 animate-slide-up-delay-5">
              Antwort in kurzer Zeit – schnell & unkompliziert
            </p>

            {/* 3 Marketing Features */}
            <div className="flex flex-wrap items-center gap-6 animate-fade-in-delay">
              <div className="flex items-center gap-2 text-[#5F6673] dark:text-[#AAB0BC]">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Lokaler Fachbetrieb</span>
              </div>
              <div className="flex items-center gap-2 text-[#5F6673] dark:text-[#AAB0BC]">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">24-48h Termin</span>
              </div>
              <div className="flex items-center gap-2 text-[#5F6673] dark:text-[#AAB0BC]">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Saubere Arbeit</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
