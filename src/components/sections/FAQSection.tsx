"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FAQSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-[#FCFAF8] to-[#FFF5F7] dark:from-[#0F1115] dark:via-[#151821] dark:to-[#1B1F2A]" />

      {/* Decorative overlays */}
      <div className="absolute top-0 right-1/4 w-1/2 h-1/3 bg-gradient-to-b from-primary/[0.02] to-transparent rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#1F2430] dark:text-white">
              Häufig gestellte Fragen
            </h2>
            <p className="text-[#5F6673] dark:text-[#AAB0BC] max-w-2xl mx-auto">
              Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Dienstleistungen
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((faq, index) => (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 80}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837] rounded-xl px-6 data-[state=open]:shadow-md dark:data-[state=open]:shadow-xl dark:data-[state=open]:shadow-black/20 transition-all hover:border-primary/20"
                >
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline text-[#1F2430] dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5F6673] dark:text-[#AAB0BC] pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
