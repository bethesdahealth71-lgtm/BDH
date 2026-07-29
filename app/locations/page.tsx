import type { Metadata } from "next";
import Link from "next/link";
import { locations, directionsUrl } from "@/content/locations";
import { site } from "@/content/site";
import { SectionHead, Breadcrumbs, CallOrBook } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Edmonton Clinics — South & West",
  description:
    "Two Bethesda clinics in Edmonton: South at 1059 Parsons Road SW and West at 9509 156 Street NW. Hours, parking, accessibility and directions for both.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <div className="shell band">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
        ])}
      />
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
        ]}
      />

      <SectionHead
        as="h1"
        title="Where to find us"
        lede="Both clinics run the same hours and the same disciplines. Book whichever is closer — your file follows you if you need to switch."
      />

      <div className="place-grid">
        {locations.map((l) => (
          <article key={l.slug} className="panel">
            <p className="meta">{l.shortName} clinic</p>
            <h3 style={{ fontSize: "var(--text-3xl)", marginTop: "var(--space-2xs)" }}>
              {l.unit ? `${l.unit}, ` : ""}
              {l.street}
            </h3>
            <address style={{ fontStyle: "normal", color: "var(--color-ink-2)" }}>
              {l.city}, {l.region} {l.postalCode}
              <br />
              <a href={l.phone ? `tel:${l.phone.replace(/\s/g, "")}` : site.phoneHref} className="inline-link">
                {l.phone ?? site.phone}
              </a>
            </address>
            <p style={{ color: "var(--color-ink-2)" }}>{l.intro}</p>
            <div className="triage-actions" style={{ marginTop: "var(--space-lg)" }}>
              <Link href={`/locations/${l.slug}`} className="btn btn-primary">
                Clinic details
              </Link>
              <a href={directionsUrl(l)} className="btn btn-chip" target="_blank" rel="noopener">
                Directions
              </a>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "var(--space-3xl)" }}>
        <CallOrBook />
      </div>
    </div>
  );
}
