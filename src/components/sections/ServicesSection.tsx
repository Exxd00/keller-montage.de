"use client";

import { useRouter } from "next/navigation";
import { Truck, Wrench, ChefHat, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  truck: Truck,
  wrench: Wrench,
  kitchen: ChefHat,
};

// Professional images for services - matching each service type
const serviceImages = {
  kuechenmontage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  moebelmontage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&auto=format&fit=crop&q=80",
  lieferungen: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&auto=format&fit=crop&q=80",
};

export function ServicesSection() {
  const router = useRouter();

  // Sort services to ensure Küchenmontage (popular) is first
  const sortedServices = [...SERVICES].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  const handleServiceClick = (serviceId: string) => {
    // Set the selected service in sessionStorage for the form to pick up
    sessionStorage.setItem('selectedService', serviceId);

    // Smooth scroll to the contact form
    const formElement = document.getElementById('kontakt-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Dispatch custom event to notify form of service selection
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('serviceSelected', { detail: { service: serviceId } }));
      }, 500);
    }
  };

  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      {/* Background gradient like rohrreinigungkraft.de */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#0F1115] dark:via-[#131720] dark:to-[#0F1115]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Unsere Leistungen
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2430] dark:text-white mb-3">
            Was wir für Sie tun können
          </h2>
          <p className="text-sm md:text-base text-[#5F6673] dark:text-[#AAB0BC] max-w-xl mx-auto">
            Professionelle Montage und Lieferung aus einer Hand
          </p>
        </div>

        {/* Service Cards Grid - Side by side on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {sortedServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            const isMain = service.popular;
            const imageUrl = serviceImages[service.id as keyof typeof serviceImages];

            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`relative flex flex-col rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group text-left ${
                  isMain
                    ? "ring-2 ring-primary shadow-lg col-span-2 md:col-span-1"
                    : "shadow-md hover:ring-2 hover:ring-primary/30"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image with gradient overlay */}
                <div className="relative h-28 sm:h-32 md:h-40 lg:h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Badge for main service */}
                  {isMain && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-3 md:py-1 bg-primary text-white text-[10px] md:text-xs font-semibold rounded-full shadow-lg">
                      Hauptleistung
                    </div>
                  )}

                  {/* Icon overlay */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>

                  {/* Title on image */}
                  <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
                    <h3 className="font-bold text-sm md:text-lg text-white drop-shadow-lg leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-primary font-bold text-sm md:text-lg">{service.price}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-[#1B1F2A] p-3 md:p-4 flex-1 flex flex-col">
                  <p className="text-xs md:text-sm text-[#5F6673] dark:text-[#AAB0BC] mb-2 md:mb-3 flex-1 line-clamp-2 md:line-clamp-none">
                    {service.description}
                  </p>

                  {/* Action Link */}
                  <div className="flex items-center text-primary text-xs md:text-sm font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Jetzt anfragen</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
