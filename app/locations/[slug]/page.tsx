import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  locations,
  getLocation,
  directionsUrl,
  mapEmbedUrl,
  formatAddress,
} from "@/content/locations";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { site } from "@/content/site";
import { BookingEmbed } from "@/components/BookingEmbed";
import { Breadcrumbs, SectionHead } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { locationNode, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/locations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const l = getLocation(slug);
  if (!l) return {};
  return {
    // NB: l.name already carries the brand, and the root layout appends it —
    // use the short name here or the title reads "Bethesda … | Bethesda …".
    title: `${l.shortName} Clinic — ${l.street}, Edmonton`,
    description: `${l.name} at ${formatAddress(l)}. Physiotherapy, massage, chiropractic and acupuncture. Open Monday to Saturday, 9am to 8pm. ${l.parking}`,
    alternates: { canonical: `/locations/${l.slug}` },
  };
}

export default async function LocationPage(props: PageProps<"/locations/[slug]">) {
  const { slug } = await props.params;
  const l = getLocation(slug);
  if (!l) notFound();

  const offered = l.services.length
    ? services.filter((s) => l.services.includes(s.slug))
    : services;
  const staff = team.filter((p) => p.locations.includes(l.slug));
  const phoneHref = l.phone ? `tel:${l.phone.replace(/\s/g, "")}` : site.phoneHref;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...locationNode(l) }} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
          { name: l.shortName, href: `/locations/${l.slug}` },
        ])}
      />

      <section className="shell hero">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Locations", href: "/locations" },
            { name: l.shortName, href: `/locations/${l.slug}` },
          ]}
        />

        <div className="diptych">
          <div>
            <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>{l.name}</h1>
            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              {l.intro}
            </p>
            <div className="hero-support">
              <Link href="/book" className="btn btn-primary">
                Book at {l.shortName}
              </Link>
              <a href={directionsUrl(l)} className="tlink" target="_blank" rel="noopener">
                Get directions <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="meta">Visit us</p>
            <address style={{ fontStyle: "normal", marginTop: "var(--space-xs)" }}>
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

            <hr className="rule" style={{ marginBlock: "var(--space-md)" }} />

            <p className="meta">Call</p>
            <p style={{ marginTop: "var(--space-2xs)" }}>
              <a href={phoneHref} className="inline-link" style={{ fontFamily: "var(--font-mono)" }}>
                {l.phone ?? site.phone}
              </a>
            </p>

            <hr className="rule" style={{ marginBlock: "var(--space-md)" }} />

            <p className="meta">Hours</p>
            <div className="table-scroll">
              <table className="spec" style={{ marginTop: "var(--space-xs)" }}>
                <tbody>
                  {l.hours.map((h) => (
                    <tr key={h.days}>
                      <th scope="row" style={{ fontWeight: 500 }}>
                        {h.days}
                      </th>
                      <td>{h.note ?? `${h.opens} – ${h.closes}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Getting here diptych — practical info left, map right ────────── */}
      <section className="shell band">
        <div className="diptych">
          <div>
            <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>Getting here</h2>
            <h3 style={{ fontSize: "var(--text-xl)", marginTop: "var(--space-lg)" }}>Parking</h3>
            <p style={{ color: "var(--color-ink-2)" }}>{l.parking}</p>

            <h3 style={{ fontSize: "var(--text-xl)", marginTop: "var(--space-lg)" }}>Transit</h3>
            <p style={{ color: "var(--color-ink-2)" }}>{l.transit}</p>

            <h3 style={{ fontSize: "var(--text-xl)", marginTop: "var(--space-lg)" }}>
              Accessibility
            </h3>
            <ul className="col-list" style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-sm)" }}>
              {l.accessibility.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="field-note" style={{ marginTop: "var(--space-md)" }}>
              Need something we have not listed — a ground-floor room, a longer appointment, an
              interpreter? Call ahead and we will arrange it.
            </p>
          </div>

          <div>
            <iframe
              className="map-frame"
              src={mapEmbedUrl(l)}
              title={`Map showing ${l.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p style={{ marginTop: "var(--space-sm)" }}>
              <a href={directionsUrl(l)} className="tlink" target="_blank" rel="noopener">
                Open in Google Maps <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── What runs here ──────────────────────────────────────────────── */}
      <section className="band band-inset">
        <div className="shell">
          <SectionHead title={`What runs at ${l.shortName}`} />
          <div className="index-list">
            {offered.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="index-row">
                <div className="index-row-inner">
                  <span className="index-row-title">{s.name}</span>
                  <span className="index-row-summary">{s.summary}</span>
                  <span className="index-row-go" aria-hidden="true">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {staff.length > 0 && (
            <p style={{ marginTop: "var(--space-2xl)" }}>
              <Link href="/team" className="tlink">
                See who works at {l.shortName} <span aria-hidden="true">→</span>
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="shell band">
        <SectionHead
          title={`Book at ${l.shortName}`}
          lede="Choose the clinic when you pick your appointment type below."
        />
        <BookingEmbed title={`Book at ${l.name}`} />
      </section>
    </>
  );
}
