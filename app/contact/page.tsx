import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { locations, directionsUrl, mapEmbedUrl } from "@/content/locations";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs, SectionHead, EmergencyNote } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Call, Text or Visit Our Edmonton Clinics",
  description:
    "Call +1 780 720 5370, send a message, or visit our South (Parsons Road) or West (156 Street) clinic in Edmonton. Open Monday to Saturday, 9am to 8pm.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />

      <section className="shell hero">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
        />

        <div className="diptych">
          <div>
            <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>
              The fastest way to reach us is the phone.
            </h1>
            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              Someone answers during clinic hours, and they can usually tell you in two minutes
              whether we can help, what it will cost, and when we can see you.
            </p>

            <div className="hero-support">
              <a href={site.phoneHref} className="btn btn-primary">
                Call {site.phone}
              </a>
              <a href={site.smsHref} className="btn btn-chip">
                Send a text
              </a>
              <Link href="/book" className="btn btn-chip">
                Book online
              </Link>
            </div>

            <hr className="rule" style={{ marginBlock: "var(--space-2xl)" }} />

            <div className="place-grid">
              {locations.map((l) => (
                <div key={l.slug}>
                  <p className="meta">{l.shortName} clinic</p>
                  <address
                    style={{
                      fontStyle: "normal",
                      marginTop: "var(--space-xs)",
                      color: "var(--color-ink-2)",
                    }}
                  >
                    {l.unit && (
                      <>
                        {l.unit}
                        <br />
                      </>
                    )}
                    {l.street}
                    <br />
                    {l.city}, {l.region} {l.postalCode}
                  </address>
                  <p style={{ marginTop: "var(--space-xs)" }}>
                    <a href={directionsUrl(l)} className="tlink" target="_blank" rel="noopener">
                      Directions <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </div>
              ))}
            </div>

            <hr className="rule" style={{ marginBlock: "var(--space-2xl)" }} />

            <p className="meta">Hours</p>
            <div className="table-scroll">
              <table className="spec" style={{ marginTop: "var(--space-xs)", maxWidth: "34rem" }}>
                <tbody>
                  <tr>
                    <th scope="row" style={{ fontWeight: 500 }}>
                      Monday – Saturday
                    </th>
                    <td>9:00 – 20:00</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ fontWeight: 500 }}>
                      Sunday &amp; statutory holidays
                    </th>
                    <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: "var(--space-lg)" }}>
              Email{" "}
              <a href={`mailto:${site.email}`} className="inline-link">
                {site.email}
              </a>{" "}
              for general enquiries and accounts.
            </p>
          </div>

          <aside className="hero-panel">
            <h2 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>Send a message</h2>
            <p style={{ color: "var(--color-ink-2)", fontSize: "var(--text-base)" }}>
              For general questions. We reply within one business day.
            </p>
            <div style={{ marginTop: "var(--space-lg)" }}>
              <ContactForm />
            </div>
          </aside>
        </div>
      </section>

      <section className="shell band-tight">
        <SectionHead title="Find us" />
        <div className="place-grid">
          {locations.map((l) => (
            <div key={l.slug}>
              <iframe
                className="map-frame"
                src={mapEmbedUrl(l)}
                title={`Map showing ${l.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="meta" style={{ marginTop: "var(--space-sm)" }}>
                {l.shortName} — {l.street}
              </p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <EmergencyNote />
        </div>
      </section>
    </>
  );
}
