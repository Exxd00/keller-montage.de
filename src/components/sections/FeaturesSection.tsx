import { Wrench, Users, ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  wrench: Wrench,
  users: Users,
  kitchen: ChefHat,
};

export function FeaturesSection() {
  return (
    <section className="section-padding section-gradient dark:bg-[#151821]">
      <div className="container-max relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-[#1F2430] dark:text-white">
            Warum Sie bei uns richtig sind
          </h2>
          <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm md:text-base max-w-2xl mx-auto hidden md:block">
            Vertrauen Sie auf professionelle Qualität und zuverlässigen Service
          </p>
        </div>

        {/* Feature Cards - 3 cards only */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-12">
          {FEATURES.slice(0, 3).map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Wrench;
            return (
              <div
                key={index}
                className="text-center p-5 sm:p-6 md:p-8 rounded-2xl bg-white dark:bg-[#1B1F2A] border border-[#F1E7E7] dark:border-[#232837] hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/20 transition-shadow"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 text-[#1F2430] dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-[#5F6673] dark:text-[#AAB0BC] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Text + CTA */}
        <div className="text-center">
          <p className="text-[#5F6673] dark:text-[#AAB0BC] text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
            Wir montieren Ihre Küche zuverlässig, sauber und termingerecht – damit Sie sich um nichts kümmern müssen.
          </p>
          <Link href="/kontakt">
            <Button className="btn-primary px-6 md:px-8 py-5 md:py-6 rounded-xl text-sm md:text-base">
              Kostenlos anfragen
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
