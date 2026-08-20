"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo, services } from "@/lib/data";
import { trackPhoneClick, trackPhoneConfirmed, trackPhoneCancelled } from "@/lib/analytics";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

// Animated SVG Icons - Complex multi-stage animations
const ServiceIcon = ({ type, className }: { type: string; className?: string }) => {
  // Delivery - Items load into truck, then truck drives away
  if (type === "delivery") {
    return (
      <svg
        viewBox="0 0 32 24"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        {/* Ground line */}
        <line
          x1="0"
          y1="20"
          x2="32"
          y2="20"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />

        {/* Truck group - drives away after loading */}
        <g className="animate-[truck-drive_4s_ease-in-out_infinite]">
          {/* Truck cargo area */}
          <rect
            x="2"
            y="8"
            width="14"
            height="10"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
          />

          {/* Truck cabin */}
          <path
            d="M16 11H21L24 15V18H16V11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.15"
          />

          {/* Cabin window */}
          <rect x="17" y="12" width="4" height="3" rx="0.5" fill="currentColor" fillOpacity="0.3" />

          {/* Truck wheels */}
          <g className="animate-[wheel-spin_4s_ease-in-out_infinite] origin-center" style={{ transformOrigin: '6px 20px' }}>
            <circle cx="6" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="6" cy="20" r="1" fill="currentColor" fillOpacity="0.4" />
          </g>
          <g className="animate-[wheel-spin_4s_ease-in-out_infinite] origin-center" style={{ transformOrigin: '20px 20px' }}>
            <circle cx="20" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="20" cy="20" r="1" fill="currentColor" fillOpacity="0.4" />
          </g>

          {/* Package 1 - loads first */}
          <rect
            x="4"
            y="12"
            width="4"
            height="4"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.4"
            className="animate-[load-package1_4s_ease-in-out_infinite]"
          />

          {/* Package 2 - loads second */}
          <rect
            x="9"
            y="13"
            width="3"
            height="3"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.3"
            className="animate-[load-package2_4s_ease-in-out_infinite]"
          />

          {/* Package 3 - loads third */}
          <rect
            x="5"
            y="9"
            width="3"
            height="2.5"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.25"
            className="animate-[load-package3_4s_ease-in-out_infinite]"
          />
        </g>

        {/* Floating packages outside truck - waiting to load */}
        <g className="animate-[packages-outside_4s_ease-in-out_infinite]">
          <rect x="26" y="14" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
          <rect x="28" y="11" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" />
        </g>

        {/* Speed/motion lines when driving */}
        <g className="animate-[speed-lines-appear_4s_ease-in-out_infinite]">
          <line x1="-2" y1="12" x2="1" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="-4" y1="15" x2="0" y2="15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="-3" y1="18" x2="1" y2="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        </g>
      </svg>
    );
  }

  // Furniture Assembly - Scattered pieces assemble into wardrobe
  if (type === "furniture") {
    return (
      <svg
        viewBox="0 0 32 28"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        {/* Ground line */}
        <line x1="0" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* Assembled wardrobe - appears at end */}
        <g className="animate-[wardrobe-appear_5s_ease-in-out_infinite]">
          {/* Main frame */}
          <rect
            x="6"
            y="4"
            width="20"
            height="20"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
          {/* Center divider */}
          <line x1="16" y1="4" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5" />
          {/* Handles */}
          <line x1="13" y1="12" x2="13" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="12" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Shelves */}
          <line x1="6" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="16" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="6" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="16" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          {/* Legs */}
          <line x1="8" y1="24" x2="8" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="24" x2="24" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Scattered wood pieces - fly in to assemble */}
        {/* Left panel */}
        <rect
          x="2"
          y="8"
          width="3"
          height="14"
          rx="0.5"
          fill="currentColor"
          fillOpacity="0.3"
          className="animate-[piece-left_5s_ease-in-out_infinite]"
        />

        {/* Right panel */}
        <rect
          x="27"
          y="6"
          width="3"
          height="14"
          rx="0.5"
          fill="currentColor"
          fillOpacity="0.3"
          className="animate-[piece-right_5s_ease-in-out_infinite]"
        />

        {/* Top panel */}
        <rect
          x="8"
          y="0"
          width="16"
          height="3"
          rx="0.5"
          fill="currentColor"
          fillOpacity="0.3"
          className="animate-[piece-top_5s_ease-in-out_infinite]"
        />

        {/* Bottom panel */}
        <rect
          x="10"
          y="26"
          width="12"
          height="2"
          rx="0.5"
          fill="currentColor"
          fillOpacity="0.3"
          className="animate-[piece-bottom_5s_ease-in-out_infinite]"
        />

        {/* Center divider piece */}
        <rect
          x="15"
          y="10"
          width="2"
          height="8"
          rx="0.5"
          fill="currentColor"
          fillOpacity="0.25"
          className="animate-[piece-center_5s_ease-in-out_infinite]"
        />

        {/* Screws flying in */}
        <circle cx="4" cy="4" r="1" fill="currentColor" fillOpacity="0.5" className="animate-[screw-fly1_5s_ease-in-out_infinite]" />
        <circle cx="28" cy="2" r="1" fill="currentColor" fillOpacity="0.5" className="animate-[screw-fly2_5s_ease-in-out_infinite]" />
        <circle cx="2" cy="22" r="1" fill="currentColor" fillOpacity="0.5" className="animate-[screw-fly3_5s_ease-in-out_infinite]" />
        <circle cx="30" cy="24" r="1" fill="currentColor" fillOpacity="0.5" className="animate-[screw-fly4_5s_ease-in-out_infinite]" />

        {/* Screwdriver */}
        <g className="animate-[screwdriver-work_5s_ease-in-out_infinite]">
          <rect x="28" y="6" width="3" height="2" rx="0.5" fill="currentColor" fillOpacity="0.7" />
          <line x1="29.5" y1="8" x2="29.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  // Kitchen Installation - Cabinets install, stove with pot and fire
  if (type === "kitchen") {
    return (
      <svg
        viewBox="0 0 32 28"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        {/* Ground/Floor */}
        <line x1="0" y1="26" x2="32" y2="26" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* Lower cabinets - slide in from bottom */}
        <g className="animate-[cabinet-lower_6s_ease-in-out_infinite]">
          <rect x="2" y="16" width="28" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <line x1="10" y1="16" x2="10" y2="26" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="22" y1="16" x2="22" y2="26" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          {/* Drawer handles */}
          <line x1="5" y1="19" x2="7" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="19" x2="18" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="19" x2="27" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Drawer lines */}
          <line x1="2" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="22" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
        </g>

        {/* Countertop - appears after lower cabinets */}
        <rect
          x="2"
          y="14"
          width="28"
          height="2"
          rx="0.3"
          fill="currentColor"
          fillOpacity="0.2"
          className="animate-[countertop-appear_6s_ease-in-out_infinite]"
        />

        {/* Upper cabinets - slide in from top */}
        <g className="animate-[cabinet-upper_6s_ease-in-out_infinite]">
          <rect x="2" y="2" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <line x1="8" y1="2" x2="8" y2="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="4" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Stove/Cooktop - appears on counter */}
        <g className="animate-[stove-appear_6s_ease-in-out_infinite]">
          {/* Stove base */}
          <rect x="18" y="12" width="10" height="2" rx="0.3" fill="currentColor" fillOpacity="0.3" />
          {/* Burner */}
          <circle cx="23" cy="13" r="2.5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" />
          <circle cx="23" cy="13" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
        </g>

        {/* Pot - drops onto stove */}
        <g className="animate-[pot-drop_6s_ease-in-out_infinite]">
          {/* Pot body */}
          <path
            d="M19 8C19 8 19 12 19 12H27V8C27 8 19 8 19 8Z"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Pot handles */}
          <line x1="18" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="27" y1="9" x2="28" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Pot lid */}
          <path d="M19.5 8H26.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="23" cy="7" r="0.8" fill="currentColor" fillOpacity="0.5" />
        </g>

        {/* Fire/Flames - animate after pot is placed */}
        <g className="animate-[fire-burn_6s_ease-in-out_infinite]">
          {/* Center flame */}
          <path
            d="M23 14C23 14 22 15.5 22 16.5C22 17.5 22.5 18 23 18C23.5 18 24 17.5 24 16.5C24 15.5 23 14 23 14Z"
            fill="currentColor"
            fillOpacity="0.8"
            className="animate-[flame-flicker_0.3s_ease-in-out_infinite]"
          />
          {/* Left flame */}
          <path
            d="M21 15C21 15 20.5 16 20.5 16.5C20.5 17 21 17.5 21.5 17.5C22 17.5 22 17 22 16.5C22 16 21 15 21 15Z"
            fill="currentColor"
            fillOpacity="0.6"
            className="animate-[flame-flicker_0.4s_ease-in-out_infinite_0.1s]"
          />
          {/* Right flame */}
          <path
            d="M25 15C25 15 24.5 16 24.5 16.5C24.5 17 25 17.5 25.5 17.5C26 17.5 26 17 26 16.5C26 16 25 15 25 15Z"
            fill="currentColor"
            fillOpacity="0.6"
            className="animate-[flame-flicker_0.35s_ease-in-out_infinite_0.2s]"
          />
        </g>

        {/* Steam from pot - appears when cooking */}
        <g className="animate-[steam-rise_6s_ease-in-out_infinite]">
          <path
            d="M21 5C21 5 20 4 21 3C22 2 21 1 21 1"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            strokeLinecap="round"
            fill="none"
            className="animate-[steam-wave_1s_ease-in-out_infinite]"
          />
          <path
            d="M23 4C23 4 22 3 23 2C24 1 23 0 23 0"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            strokeLinecap="round"
            fill="none"
            className="animate-[steam-wave_1s_ease-in-out_infinite_0.3s]"
          />
          <path
            d="M25 5C25 5 24 4 25 3C26 2 25 1 25 1"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            strokeLinecap="round"
            fill="none"
            className="animate-[steam-wave_1s_ease-in-out_infinite_0.6s]"
          />
        </g>
      </svg>
    );
  }

  return null;
};

export default function HeroSection() {
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);

  // Phone handlers - same as floating button
  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackPhoneClick(businessInfo.phone, "hero_section");
    setShowPhoneDialog(true);
  };

  const handlePhoneConfirm = () => {
    trackPhoneConfirmed(businessInfo.phone, "hero_section");
    setShowPhoneDialog(false);
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handlePhoneCancel = () => {
    trackPhoneCancelled("hero_section");
    setShowPhoneDialog(false);
  };

  return (
    <>
    <section
      className="relative min-h-screen flex items-center pb-8 lg:pb-12 overflow-hidden"
      style={{ paddingTop: 'calc(4rem + env(safe-area-inset-top, 0px))' }}
    >
      {/* Background - Full coverage */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div className="absolute inset-0 w-full h-full grid-pattern opacity-30" />

      {/* Diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background opacity-60" />

      {/* Decorative Elements - Enhanced for desktop, spread across */}
      <div className="absolute top-10 left-[10%] w-48 h-48 lg:w-72 lg:h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-64 h-64 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        {/* Urgency Banner - Centered on desktop */}
        <div className="mb-4 lg:mb-6 animate-fade-in lg:text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs sm:text-sm lg:text-base font-medium">
            <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
            </span>
            Heute noch freie Termine verfügbar
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 xl:gap-20 items-center">
          {/* Content */}
          <div className="space-y-4 lg:space-y-6 animate-fade-in">
            {/* Star Rating Badge */}
            <div className="flex items-center gap-1.5 lg:gap-2 bg-yellow-500/10 px-2.5 lg:px-4 py-1 lg:py-2 rounded-full w-fit">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="font-bold text-xs sm:text-sm lg:text-base">4.9/5</span>
              <span className="text-muted-foreground text-xs sm:text-sm lg:text-base">| 120+ Kunden</span>
            </div>

            {/* Heading with Price */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
              <span className="text-gradient-animate">Möbelmontage</span> in Nürnberg
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                ab <span className="text-primary">59€</span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground">
              Festpreis – Schnell – Zuverlässig
            </p>

            {/* Key Benefits - Better grid on desktop */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3">
              {[
                "Möbelmontage ab 59€",
                "Küchenmontage ab 149€",
                "Termine in 24–48h",
                "100% Festpreise",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 lg:gap-2 text-xs sm:text-sm lg:text-base">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Description - Enhanced for desktop */}
            <p className="hidden sm:block text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl">
              Ihr regionaler Spezialist für IKEA, PAX & Küchenmontage.
              <br />
              <span className="font-medium text-foreground">Saubere Arbeit. Zuverlässige Termine.</span>
            </p>

            {/* CTA Buttons - Better layout on desktop */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 pt-2">
              <Link
                href="/kontakt"
                className="inline-block no-underline"
              >
                <Button
                  size="lg"
                  className="btn-primary shimmer text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-xl w-full lg:w-auto"
                >
                  <span className="sm:hidden">Kostenlos anfragen</span>
                  <span className="hidden sm:inline">Kostenloses Festpreis-Angebot sichern</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
                </Button>
              </Link>

              {/* Phone Number Button */}
              <button
                type="button"
                onClick={handlePhoneClick}
                className="flex items-center justify-center gap-3 bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 text-primary font-bold py-3.5 lg:py-4 px-5 lg:px-8 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-base lg:text-xl tracking-wide">{businessInfo.phone}</span>
              </button>
            </div>
          </div>

          {/* Services Cards - Enhanced for desktop */}
          <div className="grid grid-cols-1 gap-3 lg:gap-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  // Scroll to form
                  const formElement = document.getElementById('kontakt-form');
                  if (formElement) {
                    const offset = 80;
                    const elementPosition = formElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }
                  // Dispatch event to select service
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('selectService', {
                      detail: { service: service.id }
                    }));
                  }, 300);
                }}
                className="group glass-card rounded-xl lg:rounded-2xl p-4 lg:p-6 card-hover animate-fade-in flex items-center gap-3 lg:gap-5 text-left w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-xl lg:rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <ServiceIcon
                    type={service.icon}
                    className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base lg:text-lg text-foreground group-hover:text-primary transition-colors">
                      {service.shortName}
                    </h3>
                    <span className="text-primary font-bold text-sm lg:text-lg whitespace-nowrap">
                      {service.id === "lieferungen" && "ab 39€"}
                      {service.id === "moebelmontage" && "ab 59€"}
                      {service.id === "kuechenmontage" && "ab 149€"}
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 lg:mt-1 line-clamp-1 lg:line-clamp-none">
                    {service.id === "lieferungen" && "Abholung & Lieferung vom Möbelhaus"}
                    {service.id === "moebelmontage" && "IKEA, PAX, Betten, Schränke & mehr"}
                    {service.id === "kuechenmontage" && "Komplette Kücheninstallation"}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}

            {/* CTA Button */}
            <Link href="/kontakt" className="no-underline">
              <Button className="w-full btn-primary py-3.5 lg:py-5 text-sm lg:text-base font-semibold rounded-xl lg:rounded-2xl">
                Jetzt Termin sichern
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Bar - Desktop only */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-16 pt-8 border-t border-border/50">
          {[
            { value: "12+", label: "Jahre Erfahrung" },
            { value: "5.000+", label: "Projekte" },
            { value: "24h", label: "Antwortzeit" },
            { value: "100%", label: "Festpreise" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl xl:text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm xl:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Phone Confirmation Dialog */}
    <ConfirmationDialog
      isOpen={showPhoneDialog}
      onClose={handlePhoneCancel}
      onConfirm={handlePhoneConfirm}
      type="phone"
      phoneNumber={businessInfo.phone}
    />
    </>
  );
}
