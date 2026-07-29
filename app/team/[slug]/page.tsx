import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { team, getPractitioner } from "@/content/team";
import { getService } from "@/content/services";
import { getLocation } from "@/content/locations";
import { Breadcrumbs, CallOrBook } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";

export function generateStaticParams() {
  return team.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/team/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPractitioner(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.role}`,
    description: p.bio.slice(0, 155),
    alternates: { canonical: `/team/${p.slug}` },
    // A placeholder profile must never be indexed.
    robots: p.isPlaceholder ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function PractitionerPage(props: PageProps<"/team/[slug]">) {
  const { slug } = await props.params;
  const p = getPractitioner(slug);
  if (!p) notFound();

  const disciplines = p.disciplines
    .map((d) => getService(d))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const places = p.locations.map((l) => getLocation(l)).filter(Boolean);

  return (
    <>
      {!p.isPlaceholder && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: p.name,
            jobTitle: p.role,
            honorificSuffix: p.credentials,
            worksFor: { "@id": `${site.url}/#organization` },
            knowsLanguage: p.languages,
            url: `${site.url}/team/${p.slug}`,
          }}
        />
      )}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Our team", href: "/team" },
          { name: p.role, href: `/team/${p.slug}` },
        ])}
      />

      <div className="shell band">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Our team", href: "/team" },
            { name: p.role, href: `/team/${p.slug}` },
          ]}
        />

        <div className="diptych">
          <div>
            {p.isPlaceholder && (
              <span className="placeholder-flag" style={{ marginBottom: "var(--space-md)" }}>
                Placeholder profile
              </span>
            )}
            <h1 style={{ fontSize: "var(--text-display-s)", margin: "var(--space-sm) 0 0" }}>
              {p.role}
            </h1>
            <p className="meta" style={{ marginTop: "var(--space-xs)" }}>
              {p.credentials}
              {p.registration ? ` · Registration ${p.registration}` : ""}
            </p>

            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              {p.bio}
            </p>

            {p.isPlaceholder && (
              <div className="notice" style={{ marginTop: "var(--space-lg)" }}>
                <p className="notice-title">Not a real profile yet</p>
                <p style={{ margin: 0 }}>
                  We have not published this practitioner&rsquo;s name, photo or registration
                  number because we do not have them. Call{" "}
                  <a href={site.phoneHref} className="inline-link">
                    {site.phone}
                  </a>{" "}
                  and ask who you would be seeing — we will tell you before you book.
                </p>
              </div>
            )}

            <div style={{ marginTop: "var(--space-2xl)" }}>
              <CallOrBook />
            </div>
          </div>

          <aside className="hero-panel">
            <div className="person-portrait" style={{ marginBottom: "var(--space-lg)" }}>
              {p.isPlaceholder ? "Photo pending" : p.name}
            </div>

            <p className="meta">Areas of focus</p>
            <ul
              className="col-list"
              style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-xs)" }}
            >
              {p.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <hr className="rule" style={{ marginBlock: "var(--space-lg)" }} />

            <p className="meta">Disciplines</p>
            <div className="tag-row" style={{ marginTop: "var(--space-xs)" }}>
              {disciplines.map((d) => (
                <Link key={d.slug} href={`/services/${d.slug}`} className="tag" data-tone="accent">
                  {d.shortName ?? d.name}
                </Link>
              ))}
            </div>

            <hr className="rule" style={{ marginBlock: "var(--space-lg)" }} />

            <p className="meta">Works from</p>
            <div className="tag-row" style={{ marginTop: "var(--space-xs)" }}>
              {places.map(
                (l) =>
                  l && (
                    <Link key={l.slug} href={`/locations/${l.slug}`} className="tag">
                      {l.shortName}
                    </Link>
                  ),
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
