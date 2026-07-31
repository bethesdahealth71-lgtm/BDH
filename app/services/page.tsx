import type { Metadata } from "next";
import Link from "next/link";
import { careServices, claimServices } from "@/content/services";
import { SectionHead, Breadcrumbs, EmergencyNote, CallOrBook } from "@/components/blocks";
import { ServiceTiles } from "@/components/ServiceTiles";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services — Physiotherapy, Massage, Chiropractic & More in Edmonton",
  description:
    "Physiotherapy, registered massage therapy, chiropractic, acupuncture, clinical counselling and medispa at two Edmonton clinics. Plus dedicated MVA and WCB recovery programmes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="shell band">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <SectionHead
        as="h1"
        title="Everything we do, and who each thing is for"
        lede="Six treatment disciplines and two claim-funded recovery programmes. If you are not sure which one you need, call us and describe it — that is a faster route than reading all of these."
      />

      <ServiceTiles services={careServices} />

      <div className="band-tight">
        <SectionHead
          title="Funded recovery programmes"
          lede="If your injury came from a collision or from work, the funding route matters as much as the treatment. These pages explain both."
        />
        <div className="pathways">
          {claimServices.map((s) => (
            <article key={s.slug} className="pathway">
              <h3>{s.shortName ?? s.name}</h3>
              <p>{s.summary}</p>
              <div>
                <Link href={`/services/${s.slug}`} className="tlink">
                  How it works <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--space-lg)", marginTop: "var(--space-2xl)" }}>
        <CallOrBook />
        <EmergencyNote />
      </div>
    </div>
  );
}
