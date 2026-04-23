import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const qualityPoints = [
  {
    icon: Ruler,
    text: "Millimetergenaue Ausrichtung aller Schränke",
  },
  {
    icon: Eye,
    text: "Perfekte Fugen und saubere Übergänge",
  },
  {
    icon: CheckCircle,
    text: "Qualitätskontrolle nach jedem Arbeitsschritt",
  },
];

export function QualitySection() {
  return (
    <section className="section-padding bg-[#FCFAF8] dark:bg-[#0F1115]">
      <div className="container-max">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Header with small image */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/quality-detail.jpg"
                alt="Präzise Küchenmontage"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2430] dark:text-white mb-1">
                Qualität im Detail
              </h2>
              <p className="text-[#5F6673] dark:text-[#AAB0BC] text-xs">
                Höchste Präzision bei jeder Montage.
              </p>
            </div>
          </div>

          {/* Quality Points */}
          <div className="space-y-2 mb-6">
            {qualityPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837]"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[#1F2430] dark:text-white text-sm">
                    {point.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <Link href="/kontakt">
            <Button className="btn-primary w-full px-6 py-5 rounded-xl text-sm">
              Qualität erleben
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - Left */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2430] dark:text-white">
              Qualität im Detail
            </h2>
            <p className="text-[#5F6673] dark:text-[#AAB0BC] text-lg mb-6">
              Wir achten auf jedes Detail – von der präzisen Ausrichtung bis zum
              perfekten Abschluss. Unser Anspruch ist höchste Qualität bei jeder Montage.
            </p>

            <div className="space-y-4 mb-8">
              {qualityPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-[#1F2430] dark:text-white text-base">
                      {point.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <Link href="/kontakt">
              <Button className="btn-primary px-8 py-6 rounded-xl text-base">
                Qualität erleben
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Detail Image - Right */}
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src="/images/quality-detail.jpg"
                alt="Nahaufnahme einer präzise montierten Küche mit perfekten Fugen und sauberen Übergängen"
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
