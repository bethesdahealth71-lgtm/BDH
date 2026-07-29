import type { Metadata } from "next";
import Link from "next/link";
import { team, hasRealTeamProfiles } from "@/content/team";
import { getLocation } from "@/content/locations";
import { Breadcrumbs, SectionHead, CallOrBook } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Team — Physiotherapists, RMTs & Practitioners in Edmonton",
  description:
    "The registered physiotherapists, massage therapists, chiropractors, acupuncturists and counsellors at Bethesda Health & Wellness in Edmonton.",
  alternates: { canonical: "/team" },
  // Placeholder profiles must not be indexed — they would rank for practitioner
  // names that do not exist. Flip this once real bios are published.
  robots: hasRealTeamProfiles ? { index: true, follow: true } : { index: false, follow: true },
};

export default function TeamPage() {
  return (
    <div className="shell band">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Our team", href: "/team" },
        ])}
      />
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Our team", href: "/team" },
        ]}
      />

      <SectionHead
        as="h1"
        title="The people who will actually treat you"
        lede="Every practitioner here is registered with their Alberta college. You can look any of us up — registration numbers are published on each profile."
      />

      {!hasRealTeamProfiles && (
        <div className="notice" style={{ marginBottom: "var(--space-2xl)" }}>
          <p className="notice-title">These profiles are placeholders</p>
          <p style={{ margin: 0 }}>
            Practitioner names, photos, credentials and registration numbers have not been
            supplied yet, and we will not invent them. The cards below show the roles and
            disciplines available at each clinic. To find out who you would be seeing, call{" "}
            <Link href="/contact" className="inline-link">
              the clinic
            </Link>{" "}
            and ask — we will tell you.
          </p>
        </div>
      )}

      <div className="people-grid">
        {team.map((p) => (
          <article key={p.slug} className="person">
            <div className="person-portrait">
              {p.isPlaceholder ? "Photo pending" : p.name}
            </div>
            {p.isPlaceholder && <span className="placeholder-flag">Placeholder profile</span>}
            <h3 className="person-name">{p.role}</h3>
            <p className="person-role">
              {p.credentials}
              {p.registration ? ` · Reg. ${p.registration}` : ""}
            </p>
            <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--color-ink-2)" }}>
              {p.focus.join(" · ")}
            </p>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-ink-3)" }}>
              {p.locations
                .map((slug) => getLocation(slug)?.shortName)
                .filter(Boolean)
                .join(" & ")}{" "}
              · {p.languages.join(", ")}
            </p>
            <p style={{ margin: "var(--space-2xs) 0 0" }}>
              <Link href={`/team/${p.slug}`} className="tlink">
                Profile <span aria-hidden="true">→</span>
              </Link>
            </p>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "var(--space-3xl)" }}>
        <CallOrBook />
      </div>
    </div>
  );
}
