import { site } from "@/content/site";
import { locations, formatAddress, type Location } from "@/content/locations";
import { aggregateRating } from "@/content/reviews";
import type { Service, Faq } from "@/content/services";

/** Shared @id so every node in the graph points at one organisation. */
const ORG_ID = `${site.url}/#organization`;

function openingHours(l: Location) {
  return l.hours
    .filter((h) => h.opens && h.closes)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: h.opens,
      closes: h.closes,
    }));
}

export function locationNode(l: Location) {
  return {
    "@type": ["MedicalClinic", "Physiotherapy"],
    "@id": `${site.url}/locations/${l.slug}#clinic`,
    name: l.name,
    parentOrganization: { "@id": ORG_ID },
    url: `${site.url}/locations/${l.slug}`,
    telephone: l.phone ?? site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: [l.unit, l.street].filter(Boolean).join(", "),
      addressLocality: l.city,
      addressRegion: l.region,
      postalCode: l.postalCode,
      addressCountry: l.country,
    },
    ...(l.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng } }
      : {}),
    openingHoursSpecification: openingHours(l),
    areaServed: site.areaServed.map((a) => ({ "@type": "City", name: a })),
    isAcceptingNewPatients: true,
    // AggregateRating is emitted only when real, consented reviews exist.
    ...(aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
          },
        }
      : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        description: site.description,
        sameAs: Object.values(site.social),
        medicalSpecialty: ["Physiotherapy", "PhysicalTherapy", "Chiropractic"],
        location: locations.map((l) => ({ "@id": `${site.url}/locations/${l.slug}#clinic` })),
      },
      ...locations.map(locationNode),
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-CA",
      },
    ],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.name,
    url: `${site.url}/services/${service.slug}`,
    description: service.summary,
    provider: { "@id": ORG_ID },
    availableService: service.includes.map((i) => ({ "@type": "MedicalTherapy", name: i })),
    relevantSpecialty: { "@type": "MedicalSpecialty", name: "Physiotherapy" },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.href}`,
    })),
  };
}

export function addressLine(l: Location) {
  return formatAddress(l);
}
