import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { team, hasRealTeamProfiles } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${site.url}/locations`, priority: 0.9, changeFrequency: "yearly" },
    { url: `${site.url}/insurance-billing`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site.url}/new-patients`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${site.url}/book`, priority: 0.9, changeFrequency: "yearly" },
    { url: `${site.url}/contact`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${site.url}/privacy`, priority: 0.2, changeFrequency: "yearly" },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    priority: s.claimPathway ? 0.9 : 0.8,
    changeFrequency: "monthly",
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${site.url}/locations/${l.slug}`,
    priority: 0.8,
    changeFrequency: "yearly",
  }));

  // Placeholder practitioner profiles stay out of the sitemap — submitting a
  // noindex URL is a wasted crawl and a Search Console warning.
  const teamRoutes: MetadataRoute.Sitemap = hasRealTeamProfiles
    ? [
        { url: `${site.url}/team`, priority: 0.7, changeFrequency: "monthly" },
        ...team
          .filter((p) => !p.isPlaceholder)
          .map((p) => ({
            url: `${site.url}/team/${p.slug}`,
            priority: 0.6,
            changeFrequency: "monthly" as const,
          })),
      ]
    : [];

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...teamRoutes].map((r) => ({
    ...r,
    lastModified: now,
  }));
}
