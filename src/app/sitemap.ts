import { MetadataRoute } from "next";
import { ALL_CITIES, SERVICES } from "@/lib/constants";
import {
  SERVICE_VARIATIONS,
  BRANDS,
  ALL_NEIGHBORHOODS,
  USE_CASES,
  LONG_TAIL_KEYWORDS
} from "@/lib/pseo-data";

const BASE_URL = "https://keller-montage.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split("T")[0];

  // ===========================================
  // STATIC PAGES
  // ===========================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/leistungen`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/staedte`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/arbeiten`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ===========================================
  // SERVICE PAGES (Original 3 services)
  // ===========================================
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/service/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // ===========================================
  // CITY LANDING PAGES (191 cities)
  // ===========================================
  const cityPages: MetadataRoute.Sitemap = ALL_CITIES.map((city) => {
    let priority = 0.7;
    if (city.distance <= 15) priority = 0.9;
    else if (city.distance <= 30) priority = 0.8;
    else if (city.distance <= 50) priority = 0.7;
    else priority = 0.6;

    return {
      url: `${BASE_URL}/${city.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority,
    };
  });

  // ===========================================
  // CITY + SERVICE PAGES (191 × 3 = 573 pages)
  // ===========================================
  const cityServicePages: MetadataRoute.Sitemap = [];
  ALL_CITIES.forEach((city) => {
    SERVICES.forEach((service) => {
      let priority = 0.5;
      if (city.distance <= 15) priority = 0.7;
      else if (city.distance <= 30) priority = 0.6;
      else if (city.distance <= 50) priority = 0.55;
      else priority = 0.5;

      cityServicePages.push({
        url: `${BASE_URL}/${city.slug}/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority,
      });
    });
  });

  // ===========================================
  // SERVICE VARIATIONS PAGES (191 × 13 = 2,483 pages)
  // ===========================================
  const serviceVariationPages: MetadataRoute.Sitemap = [];
  ALL_CITIES.forEach((city) => {
    SERVICE_VARIATIONS.forEach((service) => {
      let priority = 0.45;
      if (city.distance <= 15) priority = 0.65;
      else if (city.distance <= 30) priority = 0.55;
      else priority = 0.45;

      serviceVariationPages.push({
        url: `${BASE_URL}/${city.slug}/s/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority,
      });
    });
  });

  // ===========================================
  // BRAND PAGES (191 × 8 = 1,528 pages)
  // ===========================================
  const brandPages: MetadataRoute.Sitemap = [];
  ALL_CITIES.forEach((city) => {
    BRANDS.forEach((brand) => {
      let priority = 0.4;
      if (city.distance <= 15) priority = 0.6;
      else if (city.distance <= 30) priority = 0.5;
      else priority = 0.4;

      brandPages.push({
        url: `${BASE_URL}/${city.slug}/marke/${brand.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority,
      });
    });
  });

  // ===========================================
  // NEIGHBORHOOD PAGES (87 × 3 = 261 pages)
  // ===========================================
  const neighborhoodPages: MetadataRoute.Sitemap = [];
  ALL_NEIGHBORHOODS.forEach((neighborhood) => {
    SERVICES.forEach((service) => {
      neighborhoodPages.push({
        url: `${BASE_URL}/stadtteile/${neighborhood.slug}/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.55,
      });
    });
    // Also add standalone neighborhood page
    neighborhoodPages.push({
      url: `${BASE_URL}/stadtteile/${neighborhood.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  });

  // ===========================================
  // USE CASE PAGES (191 × 8 = 1,528 pages)
  // ===========================================
  const useCasePages: MetadataRoute.Sitemap = [];
  ALL_CITIES.forEach((city) => {
    USE_CASES.forEach((useCase) => {
      let priority = 0.4;
      if (city.distance <= 15) priority = 0.55;
      else if (city.distance <= 30) priority = 0.45;
      else priority = 0.4;

      useCasePages.push({
        url: `${BASE_URL}/${city.slug}/anlass/${useCase.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority,
      });
    });
  });

  // ===========================================
  // LONG-TAIL KEYWORD PAGES (191 × 10 = 1,910 pages)
  // ===========================================
  const longTailPages: MetadataRoute.Sitemap = [];
  ALL_CITIES.forEach((city) => {
    LONG_TAIL_KEYWORDS.forEach((keyword) => {
      let priority = 0.35;
      if (city.distance <= 15) priority = 0.5;
      else if (city.distance <= 30) priority = 0.4;
      else priority = 0.35;

      longTailPages.push({
        url: `${BASE_URL}/${city.slug}/fragen/${keyword.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority,
      });
    });
  });

  // ===========================================
  // COMBINE ALL PAGES
  // Total: ~8,000+ pages
  // ===========================================
  return [
    ...staticPages,           // 7 pages
    ...servicePages,          // 3 pages
    ...cityPages,             // 191 pages
    ...cityServicePages,      // 573 pages
    ...serviceVariationPages, // 2,483 pages
    ...brandPages,            // 1,528 pages
    ...neighborhoodPages,     // 348 pages
    ...useCasePages,          // 1,528 pages
    ...longTailPages,         // 1,910 pages
  ];
  // GRAND TOTAL: ~8,571 pSEO pages!
}
