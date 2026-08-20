"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Was kostet die Montage wirklich?",
    answer: "Unsere Preise starten ab 59€. Sie erhalten immer ein verbindliches Festpreis-Angebot ohne versteckte Zusatzkosten.",
  },
  {
    question: "Wie schnell bekomme ich einen Termin?",
    answer: "In der Regel innerhalb von 24–48 Stunden – auch am Wochenende.",
  },
  {
    question: "Welche Möbel montieren Sie?",
    answer: "Wir montieren alle gängigen Möbelmarken: IKEA, POCO, XXXLutz, Roller und viele mehr. Von Schränken über Betten bis hin zu kompletten Küchen.",
  },
  {
    question: "Montieren Sie IKEA & PAX Systeme?",
    answer: "Ja, wir sind spezialisiert auf IKEA Möbel, PAX Systeme und komplette Küchen.",
  },
  {
    question: "Muss ich während der Montage anwesend sein?",
    answer: "In der Regel ja. Alternativ kann eine Schlüsselübergabe vereinbart werden.",
  },
];

// JSON-LD Schema for FAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-muted/30" id="faq">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-max">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Dienstleistungen
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl lg:rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors min-h-[56px] lg:min-h-[64px]"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-foreground pr-4 lg:text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 lg:px-8 pb-4 lg:pb-6 text-muted-foreground lg:text-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
