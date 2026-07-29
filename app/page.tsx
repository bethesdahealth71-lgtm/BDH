import Link from "next/link";
import { careServices, claimServices } from "@/content/services";
import { locations, directionsUrl } from "@/content/locations";
import { site } from "@/content/site";
import { TriageWizard } from "@/components/TriageWizard";
import { Reveal } from "@/components/motion/Reveal";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { CredentialsBlock, FeesBlock } from "@/components/TrustBlocks";
import {
  AccessStrip,
  SectionHead,
  ReviewsSection,
  FaqList,
  EmergencyNote,
} from "@/components/blocks";

/**
 * Home — Split Studio.
 * Every major block is a diptych: the claim on one side, the proof on the other,
 * alternating direction down the page.
 */
export default function HomePage() {
  const homeFaqs = [
    {
      q: "Do I need a referral to book?",
      a: "No. In Alberta you can book physiotherapy, massage therapy, chiropractic and acupuncture directly. Some insurance plans ask for a physician's referral before they reimburse — worth checking your policy, but it does not stop you being seen.",
    },
    {
      q: "How soon can I be seen?",
      a: "We keep space at both clinics for new injuries and collision cases. Call and tell us what happened — if we cannot fit you in quickly we will say so rather than book you three weeks out.",
    },
    {
      q: "Will my insurance cover this?",
      a: "Most extended health plans cover physiotherapy and registered massage therapy. We direct bill most major insurers, WCB Alberta for accepted claims, and auto insurers under the Diagnostic and Treatment Protocols. The full list is on the insurance and billing page.",
    },
    {
      q: "What do I bring to a first appointment?",
      a: "Your insurance details, any claim numbers, and clothing you can move in. If you have imaging reports or a surgeon's protocol, bring those too.",
    },
  ];

  return (
    <>
      {/* ── Hero · H2 split diptych, 7/5, right half is the triage ───────── */}
      <section className="shell hero">
        <HeroIntro>
          <div data-hero-item>
            <h1 className="hero-title">
              Tell us where it hurts.
              <br />
              <span className="accent">We&rsquo;ll take it from there.</span>
            </h1>
            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              Physiotherapy, massage, chiropractic and acupuncture at two Edmonton clinics. No
              referral needed. Most plans billed directly. Car accident and workplace claims
              handled end to end — including the paperwork.
            </p>

            <div className="hero-support">
              <Link href="/book" className="btn btn-primary">
                Book online
              </Link>
              <a href={site.phoneHref} className="tlink">
                {site.phone} <span aria-hidden="true">→</span>
              </a>
            </div>

            <p style={{ marginTop: "var(--space-xl)", fontSize: "var(--text-sm)", color: "var(--color-ink-3)" }}>
              Mon–Sat, 9am–8pm · South (Parsons Road) &amp; West (156 Street)
            </p>
          </div>

          <div className="hero-panel" data-hero-item>
            <TriageWizard />
          </div>
        </HeroIntro>
      </section>

      {/* ── Access facts. Not stats — things we can actually stand behind. ── */}
      <section className="shell band-tight">
        <Reveal>
          <AccessStrip />
        </Reveal>
      </section>

      {/* ── Claim pathways — the real differentiator, given real weight ───── */}
      <section className="band band-inset">
        <div className="shell">
          <SectionHead
            title="Hurt in a car accident, or at work?"
            lede="These are the two situations where people lose the most time and money guessing. Both are usually funded — and the admin is ours, not yours."
          />
          <Reveal className="pathways" stagger={0.1}>
            {claimServices.map((s) => (
              <article key={s.slug} className="pathway">
                <h3>{s.shortName ?? s.name}</h3>
                <p>{s.intro}</p>
                <div>
                  <Link href={`/services/${s.slug}`} className="tlink">
                    How it works <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Services index — hairline rows, not an icon-tile grid ─────────── */}
      <section className="shell band">
        <SectionHead
          title="What we treat"
          lede="Six disciplines under one roof, so your physiotherapist and your massage therapist are talking to each other instead of past each other."
          action={
            <Link href="/services" className="btn btn-chip">
              All services
            </Link>
          }
        />
        <Reveal className="index-list" stagger={0.05}>
          {careServices.map((s) => (
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
        </Reveal>
      </section>

      {/* ── Credentials + fees — the Trust & Authority requirements ───────── */}
      <section className="shell band">
        <CredentialsBlock />
      </section>

      <section className="band band-inset">
        <div className="shell">
          <FeesBlock />
        </div>
      </section>

      {/* ── How care works · diptych flipped — proof left, claim right ───── */}
      <section className="shell band">
        <div className="diptych" data-flip="true">
          <div className="panel-inset">
            <h3 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>Your first appointment</h3>
            <ol
              className="col-list"
              style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-md)" }}
            >
              <li>Arrive ten minutes early with your insurance and any claim details.</li>
              <li>Tell us what happened and what you need to get back to.</li>
              <li>A full assessment — movement, strength, and the joints involved.</li>
              <li>A plain-language explanation of what we found.</li>
              <li>Treatment on the day, not just an assessment fee.</li>
              <li>A written plan with a realistic timeline.</li>
            </ol>
            <p style={{ marginBottom: 0, marginTop: "var(--space-lg)" }}>
              <Link href="/new-patients" className="tlink">
                What to bring <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "var(--text-4xl)", marginTop: 0 }}>
              An hour that actually tells you something.
            </h2>
            <p className="lede">
              Most people arrive having been told to rest it, ice it, and see how it goes. That is
              not a plan. You should leave your first visit knowing what is wrong, roughly how long
              it will take, and exactly what to do between now and the next appointment.
            </p>
            <p style={{ color: "var(--color-ink-2)" }}>
              If physiotherapy is not the right answer for what you have, we will tell you that
              too — and point you at what is.
            </p>
          </div>
        </div>
      </section>

      {/* ── Locations ────────────────────────────────────────────────────── */}
      <section className="band band-inset">
        <div className="shell">
          <SectionHead
            title="Two clinics, one standard"
            lede="Same treatment approach, same direct billing, same hours. Pick whichever is closer."
          />
          <Reveal className="place-grid" stagger={0.1}>
            {locations.map((l) => (
              <article key={l.slug} className="panel">
                <p className="meta">{l.shortName}</p>
                <h3 style={{ fontSize: "var(--text-3xl)", marginTop: "var(--space-2xs)" }}>
                  {l.unit ? `${l.unit}, ` : ""}
                  {l.street}
                </h3>
                <p style={{ color: "var(--color-ink-2)" }}>
                  {l.city}, {l.region} {l.postalCode}
                </p>
                <p style={{ color: "var(--color-ink-2)" }}>{l.parking}</p>
                <div className="triage-actions" style={{ marginTop: "var(--space-lg)" }}>
                  <Link href={`/locations/${l.slug}`} className="btn btn-chip">
                    Clinic details
                  </Link>
                  <a href={directionsUrl(l)} className="btn btn-chip" target="_blank" rel="noopener">
                    Directions
                  </a>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FAQ + proof diptych ──────────────────────────────────────────── */}
      <section className="shell band">
        <div className="diptych" data-even="true">
          <FaqList faqs={homeFaqs} heading="Questions people ask first" />
          <div style={{ display: "grid", gap: "var(--space-lg)", alignContent: "start" }}>
            <ReviewsSection />
            <EmergencyNote />
          </div>
        </div>
      </section>

      {/* ── Closing CTA · one button, not two ────────────────────────────── */}
      <section className="band band-tight">
        <div className="shell-tight" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>
            Booking takes about ninety seconds.
          </h2>
          <p className="lede" style={{ margin: "var(--space-md) auto var(--space-lg)" }}>
            Pick a clinic, pick a time, and we will sort the billing out when you arrive.
          </p>
          <Link href="/book" className="btn btn-primary">
            Book an appointment
          </Link>
        </div>
      </section>
    </>
  );
}
