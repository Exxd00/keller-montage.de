import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesCardsSection } from "@/components/sections/ServicesCardsSection";

// Lazy load heavy components for better mobile performance
const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(mod => ({ default: mod.StatsSection })), {
  loading: () => <div className="py-12 bg-white dark:bg-[#0F1115]" />,
});

const WhyUsSection = dynamic(() => import("@/components/sections/WhyUsSection").then(mod => ({ default: mod.WhyUsSection })), {
  loading: () => <div className="py-12" />,
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="py-12" />,
});

const QualitySection = dynamic(() => import("@/components/sections/QualitySection").then(mod => ({ default: mod.QualitySection })), {
  loading: () => <div className="py-12" />,
});

const StepsSection = dynamic(() => import("@/components/sections/StepsSection").then(mod => ({ default: mod.StepsSection })), {
  loading: () => <div className="py-12" />,
});

const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="py-12" />,
});

const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="py-12" />,
});

const ContactForm = dynamic(() => import("@/components/sections/ContactForm").then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="py-12" />,
});

const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-12" />,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesCardsSection />
      <StatsSection />
      <WhyUsSection />
      <ProjectsSection />
      <QualitySection />
      <StepsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactForm />
      <CTASection />
    </>
  );
}
