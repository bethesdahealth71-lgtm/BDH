import Link from "next/link";
import { site } from "@/content/site";
import { locations, directionsUrl, formatAddress } from "@/content/locations";

/**
 * Ft1 · Mast-headed. One horizontal band anchored by the wordmark.
 * Not a four-column sitemap — a clinic footer's job is to answer
 * "where are you and how do I reach you", so the addresses lead.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-mast">
          <div>
            <p className="footer-wordmark">Bethesda Health &amp; Wellness</p>
            <p className="footer-tagline">
              Two clinics in Edmonton. Six days a week. Direct billing to most plans.
            </p>
          </div>
          <a href={site.phoneHref} className="btn btn-primary">
            Call {site.phone}
          </a>
        </div>

        <div className="footer-grid">
          {locations.map((l) => (
            <div key={l.slug}>
              <p className="footer-heading">{l.shortName} clinic</p>
              <address className="footer-address">
                {l.unit && (
                  <>
                    {l.unit}
                    <br />
                  </>
                )}
                {l.street}
                <br />
                {l.city}, {l.region} {l.postalCode}
                <br />
                <a href={directionsUrl(l)} target="_blank" rel="noopener">
                  Directions
                </a>{" "}
                ·{" "}
                <Link href={`/locations/${l.slug}`}>Clinic page</Link>
              </address>
              <p className="footer-heading" style={{ marginTop: "var(--space-md)" }}>
                Hours
              </p>
              <p style={{ fontSize: "var(--text-base)", margin: 0 }}>
                Mon–Sat 9am–8pm
                <br />
                Sunday &amp; statutory holidays closed
              </p>
            </div>
          ))}

          <div>
            <p className="footer-heading">Contact</p>
            <address className="footer-address">
              <a href={site.phoneHref}>{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>

            <p className="footer-heading" style={{ marginTop: "var(--space-lg)" }}>
              Explore
            </p>
            <div className="footer-links">
              <Link href="/services">Services</Link>
              <Link href="/locations">Locations</Link>
              <Link href="/team">Our team</Link>
              <Link href="/insurance-billing">Insurance</Link>
              <Link href="/new-patients">New patients</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <p style={{ margin: 0 }}>
            © {year} {site.legalName}
          </p>
          <p style={{ margin: 0 }}>
            <Link href="/privacy">Privacy &amp; your health information</Link>
          </p>
          <p style={{ margin: 0, maxWidth: "52ch" }}>
            Information on this site is general and is not a substitute for individual
            assessment. If this is an emergency, call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function footerAddressLine() {
  return locations.map((l) => formatAddress(l)).join(" · ");
}
