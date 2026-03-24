"use client";

import { SERVICES } from "@/lib/constants";
import { ChefHat, Wrench, Truck, ArrowRight } from "lucide-react";

// Service icons with colors - inspired by mobelmontage-nurnberg.de
const serviceData = [
  {
    slug: "kuechenmontage",
    icon: ChefHat,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    slug: "moebelmontage",
    icon: Wrench,
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500",
  },
  {
    slug: "lieferungen",
    icon: Truck,
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-500",
  },
];

export function ServicesCardsSection() {
  const displayServices = SERVICES.slice(0, 3);

  const handleServiceClick = (serviceId: string) => {
    const serviceMap: { [key: string]: string } = {
      'kuechenmontage': 'kuechenmontage',
      'moebelmontage': 'moebelmontage',
      'lieferungen': 'lieferung',
    };

    sessionStorage.setItem('selectedService', serviceMap[serviceId] || serviceId);

    const formElement = document.getElementById('kontakt-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('serviceSelected', {
          detail: { service: serviceMap[serviceId] || serviceId }
        }));
      }, 500);
    }
  };

  return (
    <section className="py-6 md:py-10 lg:py-14 xl:py-16 relative bg-white dark:bg-[#0F1115]">
      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-primary/10 text-primary text-xs lg:text-sm font-medium mb-2 lg:mb-3">
            Unsere Leistungen
          </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1F2430] dark:text-white">
            Wählen Sie Ihre Dienstleistung
          </h2>
        </div>

        {/* Services Grid - 3 columns side by side */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 xl:gap-8 max-w-5xl mx-auto">
          {displayServices.map((service) => {
            const serviceInfo = serviceData.find(s => s.slug === service.slug) || serviceData[0];
            const IconComponent = serviceInfo.icon;
            const isMain = service.popular;

            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.slug)}
                className={`group flex flex-col items-center text-center p-3 md:p-5 lg:p-6 xl:p-8 bg-[#FCFAF8] dark:bg-[#1B1F2A] rounded-xl md:rounded-2xl border transition-all duration-200 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 ${
                  isMain
                    ? "ring-2 ring-primary/20 border-primary/30"
                    : "border-[#F1E7E7] dark:border-[#232837]"
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-xl lg:rounded-2xl ${serviceInfo.bgColor} flex items-center justify-center mb-2 md:mb-3 lg:mb-4`}>
                  <IconComponent className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 ${serviceInfo.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#1F2430] dark:text-white mb-1 lg:mb-2 leading-tight">
                  {service.name}
                </h3>

                {/* Price */}
                <span className="text-primary font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                  {service.price}
                </span>

                {/* Arrow indicator */}
                <div className="mt-2 lg:mt-3 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-[#F1E7E7] dark:bg-[#232837] flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#5F6673] dark:text-[#AAB0BC] group-hover:text-white" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
