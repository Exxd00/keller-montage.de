"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AnalyticsProvider from "@/components/AnalyticsProvider";

// Lazy load below-the-fold sections - SSR: false for faster initial load
const FloatingButtons = dynamic(() => import("@/components/layout/FloatingButtons"), {
  ssr: false,
});

const WhyUs = dynamic(() => import("@/components/sections/WhyUs"), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-2xl mx-4" />,
});

const HowWeWork = dynamic(() => import("@/components/sections/HowWeWork"), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-2xl mx-4" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-2xl mx-4" />,
});

const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-2xl mx-4" />,
});

const QuickContactForm = dynamic(() => import("@/components/sections/QuickContactForm"), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted/30 animate-pulse rounded-2xl mx-4" />,
});

const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted/30 animate-pulse rounded-2xl mx-4" />,
});

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider>
        <Header />
        <main id="main-content">
        {/* 1. Hero Section - Services, Pricing, CTAs */}
        <HeroSection />

        {/* 2. Why Choose Us - Build Trust */}
        <WhyUs />

        {/* 3. How We Work - 3 Steps Process */}
        <HowWeWork />

        {/* 4. Testimonials - Social Proof */}
        <Testimonials />

        {/* 5. FAQ Section */}
        <FAQSection />

        {/* 6. Contact Form */}
        <QuickContactForm />

        {/* 7. Final CTA */}
        <CTASection />
      </main>
      <Footer />
        <FloatingButtons />
      </AnalyticsProvider>
    </Suspense>
  );
}
