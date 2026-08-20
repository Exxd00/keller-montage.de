import type { MetadataRoute } from "next";
import { cities, getAllServices, services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://keller-montage.de";
  const allServices = getAllServices();
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/staedte`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/arbeiten`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // City pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: city.isMain ? 0.9 : 0.7,
  }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // City-Service combination pages (main cities with all services)
  const mainCities = cities.filter((c) => c.isMain);
  const cityServicePages: MetadataRoute.Sitemap = [];

  for (const city of mainCities) {
    for (const service of allServices) {
      cityServicePages.push({
        url: `${baseUrl}/${city.slug}/${service.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  }

  // Other cities with main services only
  const otherCities = cities.filter((c) => !c.isMain);
  for (const city of otherCities) {
    for (const service of services) {
      cityServicePages.push({
        url: `${baseUrl}/${city.slug}/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      });
    }
  }

  return [...staticPages, ...cityPages, ...servicePages, ...cityServicePages];
}
