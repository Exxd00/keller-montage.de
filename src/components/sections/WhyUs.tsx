"use client";

import { CheckCircle, Shield, Clock, FileText, Award, Users, Truck, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Clock,
    text: "12+ Jahre Erfahrung",
  },
  {
    icon: Award,
    text: "5.000+ erfolgreich montierte Projekte",
  },
  {
    icon: FileText,
    text: "100% Festpreise – keine versteckten Kosten",
  },
  {
    icon: Shield,
    text: "Professionelle Ausführung",
  },
  {
    icon: Clock,
    text: "Schnelle Terminvergabe (24–48h)",
  },
  {
    icon: FileText,
    text: "Rechnung mit ausgewiesener MwSt.",
  },
];

// Desktop feature cards
const featureCards = [
  {
    icon: Wrench,
    title: "Professionelle Montage",
    description: "Fachgerechter Aufbau aller Möbelarten mit eigenem Werkzeug",
  },
  {
    icon: Truck,
    title: "Lieferservice",
    description: "Abholung vom Möbelhaus und Lieferung bis in Ihre Wohnung",
  },
  {
    icon: Users,
    title: "Erfahrenes Team",
    description: "Geschulte Monteure mit jahrelanger Erfahrung",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-max">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              Warum Sie bei uns richtig sind
            </h2>
            <p className="hidden lg:block text-lg text-muted-foreground max-w-2xl mx-auto">
              Vertrauen Sie auf über 12 Jahre Erfahrung und tausende zufriedene Kunden
            </p>
          </div>

          {/* Desktop Feature Cards - Only visible on lg+ */}
          <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="glass-card rounded-2xl p-8 text-center group hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Benefits Grid */}
          <div className="glass-card rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {benefits.map((benefit, index) => {
                return (
                  <div key={index} className="flex items-center gap-3 lg:gap-4">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-base md:text-lg">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Statement */}
          <p className="text-center text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            Wir arbeiten zuverlässig, sauber und termingerecht – damit Sie sich um nichts kümmern müssen.
          </p>

          {/* CTA */}
          <div className="text-center">
            <Link href="/kontakt" className="no-underline">
              <Button size="lg" className="btn-primary shimmer lg:text-lg lg:px-10 lg:py-6">
                Jetzt Termin sichern
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
