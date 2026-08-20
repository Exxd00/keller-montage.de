import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/thank-you/", "/api/", "/admin", "/admin/"],
      },
      {
        // Block Google Ads bot specifically
        userAgent: "AdsBot-Google",
        disallow: ["/thank-you", "/thank-you/"],
      },
      {
        // Block Google Ads mobile bot
        userAgent: "AdsBot-Google-Mobile",
        disallow: ["/thank-you", "/thank-you/"],
      },
      {
        // Block Google media partners (for display ads)
        userAgent: "Mediapartners-Google",
        disallow: ["/thank-you", "/thank-you/"],
      },
    ],
    sitemap: "https://keller-montage.de/sitemap.xml",
  };
}
