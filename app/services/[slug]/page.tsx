import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { mvaSteps, wcbSteps } from "@/content/billing";
import { team } from "@/content/team";
import { site } from "@/content/site";
import { BookingEmbed } from "@/components/BookingEmbed";
import { Figure } from "@/components/ServiceHeroImage";
import { servicePhotos } from "@/content/photos";
import { Reveal } from "@/components/motion/Reveal";
import {
  Breadcrumbs,
  FaqList,
  StepSequence,
  EmergencyNote,
  SectionHead,
} from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const practitioners = team.filter((p) => p.disciplines.includes(service.slug));
  const claimSteps =
    service.slug === "mva-recovery" ? mvaSteps : service.slug === "wcb-recovery" ? wcbSteps : null;
  const tone = service.claimPathway ? "clay" : "accent";
  // Absent for acupuncture and chiropractic on purpose — see content/photos.ts.
  const photo = servicePhotos[service.slug];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ])}
      />

      {/* ── Hero diptych: the claim left, the booking action right ───────── */}
      <section className="shell hero">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.shortName ?? service.name, href: `/services/${service.slug}` },
          ]}
        />
        <div className="diptych">
          <div>
            <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>{service.name}</h1>
            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              {service.intro}
            </p>
            <div className="hero-support">
              <Link href="/book" className={`btn ${tone === "clay" ? "btn-clay" : "btn-primary"}`}>
                Book {service.shortName ?? service.name}
              </Link>
              <a href={site.phoneHref} className="tlink">
                {site.phone} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gap: "var(--space-lg)" }}>
            {photo && (
              <Figure
                photo={photo}
                ratio="4 / 3"
                priority
                sizes="(max-width: 60rem) 100vw, 42vw"
              />
            )}
            <aside className="hero-panel">
              <h2 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>
                {service.claimPathway ? "What this covers" : "What this includes"}
              </h2>
              <ul
                className="col-list"
                style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-md)" }}
              >
                {service.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Claim walkthrough (MVA / WCB only) ───────────────────────────── */}
      {claimSteps && (
        <section className="band band-inset">
          <div className="shell">
            <SectionHead
              title="How the claim actually works"
              lede="Five steps. You do two of them; we do the rest."
            />
            <Reveal>
              <StepSequence steps={claimSteps} />
            </Reveal>
            <p style={{ marginTop: "var(--space-lg)" }}>
              <Link href="/insurance-billing" className="tlink">
                Insurance &amp; billing in full <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── Treats / For who — diptych, flipped ──────────────────────────── */}
      <section className="shell band">
        <div className="diptych" data-even="true">
          <div>
            <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>What we treat</h2>
            <ul className="col-list" style={{ marginTop: "var(--space-lg)" }}>
              {service.treats.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="panel-inset">
            <h2 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>This is for you if…</h2>
            <ul
              className="col-list"
              style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-md)" }}
            >
              {service.forWho.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── What a session looks like ────────────────────────────────────── */}
      <section className="shell band">
        <SectionHead
          title={service.claimPathway ? "What happens when you come in" : "What a session looks like"}
          lede="Knowing what is about to happen takes most of the nerves out of a first appointment."
        />
        <Reveal as="ol" className="steps" stagger={0.06}>
          {service.session.map((s) => (
            <li key={s.title} className="step">
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* ── Practitioners ────────────────────────────────────────────────── */}
      {practitioners.length > 0 && (
        <section className="shell band-tight">
          <SectionHead
            as="h2"
            title="Who you might see"
            action={
              <Link href="/team" className="btn btn-chip">
                Meet the team
              </Link>
            }
          />
          <div className="tag-row">
            {practitioners.map((p) => (
              <Link key={p.slug} href={`/team/${p.slug}`} className="tag">
                {p.role}
                {p.isPlaceholder ? " · profile pending" : ""}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ + booking diptych ────────────────────────────────────────── */}
      <section className="shell band">
        <div className="diptych">
          <FaqList faqs={service.faqs} heading="Common questions" />
          <div style={{ display: "grid", gap: "var(--space-lg)", alignContent: "start" }}>
            <div className="notice" data-tone={service.claimPathway ? undefined : "accent"}>
              <p className="notice-title">
                {service.claimPathway ? "Not sure you qualify?" : "Not sure this is the right one?"}
              </p>
              <p style={{ margin: 0 }}>
                Call{" "}
                <a href={site.phoneHref} className="inline-link">
                  {site.phone}
                </a>{" "}
                and describe what happened. We will tell you honestly — including if you should be
                seeing a doctor instead.
              </p>
            </div>

            {related.length > 0 && (
              <div>
                <p className="meta" style={{ marginBottom: "var(--space-xs)" }}>
                  Often booked alongside
                </p>
                <div className="tag-row">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/services/${r.slug}`} className="tag" data-tone="accent">
                      {r.shortName ?? r.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <EmergencyNote />
          </div>
        </div>
      </section>

      {/* ── Book, in place ───────────────────────────────────────────────── */}
      <section className="band band-inset">
        <div className="shell">
          <SectionHead
            title={`Book ${service.shortName ?? service.name}`}
            lede="Pick a clinic and a time below, or call if you would rather talk it through first."
          />
          <BookingEmbed
            janeDisciplineId={service.janeDisciplineId}
            title={`Book ${service.name}`}
          />
        </div>
      </section>
    </>
  );
}
