import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { locations } from "@/content/locations";
import {
  Breadcrumbs,
  SectionHead,
  FaqList,
  EmergencyNote,
  CallOrBook,
} from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "New Patients — What to Expect at Your First Appointment",
  description:
    "What to bring, what to wear, how long it takes and what happens during your first physiotherapy appointment in Edmonton. No referral needed in Alberta.",
  alternates: { canonical: "/new-patients" },
};

const faqs = [
  {
    q: "How early should I arrive?",
    a: "Ten minutes for a first visit so we can complete your intake and verify your insurance without eating into your treatment time. For follow-ups, arriving on time is fine.",
  },
  {
    q: "Can I bring someone with me?",
    a: "Yes. A partner, parent, friend or interpreter is welcome in the room. Tell us at booking if you would prefer a practitioner of a particular gender and we will arrange it where we can.",
  },
  {
    q: "What if I need to cancel?",
    a: "Give us 24 hours' notice and there is no charge. Late cancellations and no-shows may be billed, because the slot cannot be given to someone else. Tell us if something genuinely urgent came up.",
  },
  {
    q: "Will I get treatment on the first visit?",
    a: "Almost always. The first appointment is mostly assessment, but you will normally receive hands-on treatment and leave with exercises rather than paying for an assessment and coming back.",
  },
  {
    q: "Do you see children?",
    a: "Yes. A parent or guardian must attend with anyone under 18 and provide consent.",
  },
];

export default function NewPatientsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "New patients", href: "/new-patients" },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <section className="shell hero">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "New patients", href: "/new-patients" },
          ]}
        />
        <div className="diptych">
          <div>
            <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>
              Your first visit, start to finish.
            </h1>
            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              You do not need a referral, you do not need to have seen a doctor, and you do not
              need to know what is wrong. That last part is our job.
            </p>
            <div className="hero-support">
              <CallOrBook />
            </div>
          </div>

          <aside className="hero-panel">
            <h2 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>Bring with you</h2>
            <ul
              className="col-list"
              style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-md)" }}
            >
              <li>Insurance card, policy and member number</li>
              <li>Claim number and adjuster or case manager, if you have one</li>
              <li>A list of medications you take</li>
              <li>Imaging reports or a surgeon&rsquo;s protocol, if you have them</li>
              <li>Clothing you can move in — shorts for a leg, a loose top for a shoulder</li>
            </ul>
            <p className="field-note" style={{ marginTop: "var(--space-md)" }}>
              Missing something? Come anyway. We can sort most of it out afterwards.
            </p>
          </aside>
        </div>
      </section>

      <section className="shell band">
        <SectionHead
          title="What actually happens"
          lede="About an hour for a first appointment. Here is where the time goes."
        />
        <ol className="steps">
          <li className="step">
            <h3 className="step-title">Intake and insurance</h3>
            <p className="step-body">
              A short health history form and a check of your coverage, so nobody is surprised by a
              bill later. Five to ten minutes.
            </p>
          </li>
          <li className="step">
            <h3 className="step-title">The conversation</h3>
            <p className="step-body">
              What happened, when it started, what makes it worse, and — the question that changes
              the plan most — what you need to get back to doing.
            </p>
          </li>
          <li className="step">
            <h3 className="step-title">Physical assessment</h3>
            <p className="step-body">
              Movement, strength, joint mechanics and the specific tests that separate the likely
              causes from each other.
            </p>
          </li>
          <li className="step">
            <h3 className="step-title">What we found</h3>
            <p className="step-body">
              A plain-language explanation. If we are not certain, we will say so and tell you what
              would make us certain.
            </p>
          </li>
          <li className="step">
            <h3 className="step-title">Treatment</h3>
            <p className="step-body">
              Hands-on work on the day, chosen for what we found rather than a standard protocol.
            </p>
          </li>
          <li className="step">
            <h3 className="step-title">Your plan</h3>
            <p className="step-body">
              A small number of exercises written down, guidance on work and activity, and an
              honest estimate of how many visits this is likely to take.
            </p>
          </li>
        </ol>
      </section>

      <section className="band band-inset">
        <div className="shell">
          <div className="diptych" data-even="true">
            <FaqList faqs={faqs} heading="Before you come in" />
            <div style={{ display: "grid", gap: "var(--space-lg)", alignContent: "start" }}>
              <div className="panel">
                <h3 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>Where to go</h3>
                {locations.map((l) => (
                  <p key={l.slug} style={{ color: "var(--color-ink-2)" }}>
                    <strong style={{ color: "var(--color-ink)" }}>{l.shortName}</strong> —{" "}
                    {l.unit ? `${l.unit}, ` : ""}
                    {l.street}, {l.city}
                    <br />
                    <Link href={`/locations/${l.slug}`} className="inline-link">
                      Parking &amp; accessibility
                    </Link>
                  </p>
                ))}
                <p style={{ marginBottom: 0, color: "var(--color-ink-2)" }}>
                  Lost on the way?{" "}
                  <a href={site.phoneHref} className="inline-link">
                    {site.phone}
                  </a>
                </p>
              </div>
              <EmergencyNote />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
