import type { Metadata } from "next";
import Link from "next/link";
import { team, hasRealTeamProfiles } from "@/content/team";
import { getLocation } from "@/content/locations";
import { site } from "@/content/site";

/** Shown while real bios are pending — describes roles, never invented people. */
const disciplineSummary = [
  {
    role: "Physiotherapists",
    credentials: "Registered with the College of Physiotherapists of Alberta",
    focus: ["Back and neck pain", "Post-surgical rehab", "Sports injuries", "Whiplash"],
    where: "South & West",
  },
  {
    role: "Registered Massage Therapists",
    credentials: "Registered massage therapists",
    focus: ["Deep tissue", "Sports recovery", "Prenatal massage"],
    where: "South & West",
  },
  {
    role: "Chiropractors",
    credentials: "Registered with the College of Chiropractors of Alberta",
    focus: ["Mechanical back pain", "Headaches", "Ergonomics"],
    where: "West",
  },
  {
    role: "Acupuncturists",
    credentials: "Registered acupuncturists",
    focus: ["Chronic pain", "Headaches", "Sleep and stress"],
    where: "South",
  },
  {
    role: "Clinical Counsellors",
    credentials: "Registered counselling professionals",
    focus: ["Chronic pain", "Post-collision anxiety", "Return to work"],
    where: "South & West",
  },
];
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
        title={
          hasRealTeamProfiles
            ? "The people who will actually treat you"
            : "Who you'll be seeing"
        }
        lede="Every practitioner here is registered with their Alberta college, so you can look them up on a public register — and their registration number appears on every receipt you get."
      />

      {/* Until real bios exist, this page describes the DISCIPLINES available
          at each clinic instead of showing placeholder people. No invented
          names, and no "profile pending" cards shown to patients — the build
          status lives in content/team.ts and the README, not in the UI. */}
      {hasRealTeamProfiles ? (
        <div className="people-grid">
          {team.map((p) => (
            <article key={p.slug} className="person">
              <div className="person-portrait">{p.name}</div>
              <h3 className="person-name">{p.name}</h3>
              <p className="person-role">
                {p.role} · {p.credentials}
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
      ) : (
        <>
          <div className="people-grid">
            {disciplineSummary.map((d) => (
              <article key={d.role} className="person">
                <h3 className="person-name">{d.role}</h3>
                <p className="person-role">{d.credentials}</p>
                <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--color-ink-2)" }}>
                  {d.focus.join(" · ")}
                </p>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-ink-3)" }}>
                  {d.where}
                </p>
              </article>
            ))}
          </div>

          <div className="notice" data-tone="accent" style={{ marginTop: "var(--space-2xl)" }}>
            <p className="notice-title">Want to know who you&rsquo;ll be seeing?</p>
            <p style={{ margin: 0 }}>
              Call{" "}
              <a href={site.phoneHref} className="inline-link">
                {site.phone}
              </a>{" "}
              and ask. We&rsquo;ll tell you the practitioner&rsquo;s name and background before
              you book, and you can request someone specific.
            </p>
          </div>
        </>
      )}

      <div style={{ marginTop: "var(--space-3xl)" }}>
        <CallOrBook />
      </div>
    </div>
  );
}
