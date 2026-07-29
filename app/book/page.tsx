import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { site } from "@/content/site";
import { BookingEmbed } from "@/components/BookingEmbed";
import { Breadcrumbs, EmergencyNote } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book an Appointment in Edmonton",
  description:
    "Book physiotherapy, massage, chiropractic, acupuncture or counselling at our South or West Edmonton clinic. No referral needed. Direct billing available.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="shell band">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Book", href: "/book" },
        ])}
      />
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Book", href: "/book" },
        ]}
      />

      <div className="diptych">
        <div>
          <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>Book an appointment</h1>
          <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
            Choose your clinic, your treatment and your time below. No referral needed, and we
            will verify your insurance before your first visit rather than after it.
          </p>
        </div>

        <aside className="hero-panel">
          <p className="meta">Prefer to talk to someone?</p>
          <p style={{ marginTop: "var(--space-xs)" }}>
            <a
              href={site.phoneHref}
              className="inline-link"
              style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xl)" }}
            >
              {site.phone}
            </a>
          </p>
          <p style={{ color: "var(--color-ink-2)", fontSize: "var(--text-base)" }}>
            Monday to Saturday, 9am to 8pm. If you are not sure what to book, this is the faster
            route — describe what happened and we will pick for you.
          </p>

          <hr className="rule" style={{ marginBlock: "var(--space-lg)" }} />

          <p className="meta">Clinics</p>
          <div className="tag-row" style={{ marginTop: "var(--space-xs)" }}>
            {locations.map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`} className="tag">
                {l.shortName}
              </Link>
            ))}
          </div>

          <hr className="rule" style={{ marginBlock: "var(--space-lg)" }} />

          <p className="meta">Book a specific service</p>
          <div className="tag-row" style={{ marginTop: "var(--space-xs)" }}>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="tag"
                data-tone={s.claimPathway ? "claim" : "accent"}
              >
                {s.shortName ?? s.name}
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div style={{ marginTop: "var(--space-3xl)" }}>
        <BookingEmbed title="Book an appointment at Bethesda Health & Wellness" />
      </div>

      <div style={{ marginTop: "var(--space-2xl)" }}>
        <EmergencyNote />
      </div>
    </div>
  );
}
