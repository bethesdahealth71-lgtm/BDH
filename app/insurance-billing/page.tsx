import type { Metadata } from "next";
import Link from "next/link";
import { insurers, mvaSteps, wcbSteps, paymentNotes } from "@/content/billing";
import { site } from "@/content/site";
import {
  Breadcrumbs,
  SectionHead,
  StepSequence,
  FaqList,
  CallOrBook,
} from "@/components/blocks";
import { CredentialsBlock, FeesBlock } from "@/components/TrustBlocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Insurance, Direct Billing, WCB & MVA Claims in Edmonton",
  description:
    "Who we direct bill, how Alberta auto injury (MVA) claims work, and what to do after a workplace injury. Step-by-step, in plain language.",
  alternates: { canonical: "/insurance-billing" },
};

const faqs = [
  {
    q: "Is physiotherapy covered by Alberta Health Care?",
    a: "No. Alberta Health Care does not cover outpatient physiotherapy, massage, chiropractic or acupuncture at private clinics. These are paid by extended health plans, auto insurers, WCB, or by you.",
  },
  {
    q: "What does direct billing actually mean?",
    a: "It means we submit the claim to your insurer at the front desk and you pay only the portion they do not cover — often nothing. You do not pay the full amount and wait for reimbursement.",
  },
  {
    q: "What if you cannot direct bill my insurer?",
    a: "You pay at the visit and we give you an itemised receipt with the practitioner's name and registration number on it. Insurers accept these. We can email it if that is easier for your submission.",
  },
  {
    q: "How do I find out my coverage before booking?",
    a: "Call your insurer or check your plan booklet, and ask three things: how many visits per year, what dollar amount per visit, and whether they require a doctor's referral. Bring the answers with you.",
  },
  {
    q: "Do I pay anything for a car accident claim?",
    a: "In most Alberta auto injury claims, treatment inside the Diagnostic and Treatment Protocols is billed to the insurer and costs you nothing. We confirm your coverage before treating, not after.",
  },
  {
    q: "What happens if my WCB claim is denied?",
    a: "You can still be treated — billing moves to your extended health plan or to you. Come in and we will walk through the options, including what requesting a review of the decision involves.",
  },
];

export default function InsuranceBillingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Insurance & billing", href: "/insurance-billing" },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <section className="shell hero">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Insurance & billing", href: "/insurance-billing" },
          ]}
        />
        <div className="diptych">
          <div>
            <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>
              The money part, explained before you book.
            </h1>
            <p className="lede" style={{ marginTop: "var(--space-lg)" }}>
              Nobody should find out what treatment costs at the front desk on their way out. Here
              is who we bill directly, how the two claim routes work, and what happens when neither
              applies.
            </p>
            <div className="hero-support">
              <CallOrBook />
            </div>
          </div>

          <aside className="hero-panel">
            <h2 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>Bring these with you</h2>
            <ul
              className="col-list"
              style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-md)" }}
            >
              <li>Your insurance card or policy and member number</li>
              <li>Your claim number, if you have one</li>
              <li>Your adjuster or case manager&rsquo;s name</li>
              <li>Your employer&rsquo;s name, for a WCB claim</li>
              <li>Any referral letter your plan requires</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ── Direct billing list · F3 tabular spec sheet ──────────────────── */}
      <section className="shell band">
        <SectionHead
          title="Who we direct bill"
          lede="Submitted at the desk, so you pay only your share. If yours is not listed, ask — the list changes."
        />
        <div className="table-scroll">
          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Insurer</th>
                <th scope="col">Direct billing</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {insurers.map((i) => (
                <tr key={i.name}>
                  <th scope="row" style={{ fontWeight: 600 }}>
                    {i.name}
                  </th>
                  <td>{i.directBill ? "Yes" : "Receipt provided"}</td>
                  <td style={{ color: "var(--color-ink-3)" }}>{i.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="field-note" style={{ marginTop: "var(--space-md)" }}>
          Coverage varies by plan even within the same insurer. We will verify yours before your
          first treatment.
        </p>
      </section>

      {/* ── MVA walkthrough ─────────────────────────────────────────────── */}
      <section className="band band-inset">
        <div className="shell">
          <SectionHead
            title="After a car accident (MVA)"
            lede="Alberta funds treatment after a collision regardless of fault. Five steps — you do two."
            action={
              <Link href="/services/mva-recovery" className="btn btn-chip">
                MVA recovery
              </Link>
            }
          />
          <StepSequence steps={mvaSteps} />
        </div>
      </section>

      {/* ── WCB walkthrough ─────────────────────────────────────────────── */}
      <section className="shell band">
        <SectionHead
          title="After a workplace injury (WCB)"
          lede="Report it, file it, book it. We handle the reporting to your case manager from there."
          action={
            <Link href="/services/wcb-recovery" className="btn btn-chip">
              WCB recovery
            </Link>
          }
        />
        <StepSequence steps={wcbSteps} />
      </section>

      {/* ── Appointment lengths and cost ─────────────────────────────────── */}
      <section className="shell band">
        <FeesBlock />
      </section>

      {/* ── Credentials ─────────────────────────────────────────────────── */}
      <section className="band band-inset">
        <div className="shell">
          <CredentialsBlock />
        </div>
      </section>

      {/* ── Paying yourself ─────────────────────────────────────────────── */}
      <section className="shell band">
        <div className="diptych">
          <div>
            <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>If none of that applies</h2>
            <ul className="col-list" style={{ gridTemplateColumns: "1fr", marginTop: "var(--space-lg)" }}>
              {paymentNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <div className="notice" data-tone="accent" style={{ marginTop: "var(--space-lg)" }}>
              <p className="notice-title">Cost should not be the reason you go untreated</p>
              <p style={{ margin: 0 }}>
                If paying is the obstacle, tell us. Call{" "}
                <a href={site.phoneHref} className="inline-link">
                  {site.phone}
                </a>{" "}
                and we will talk through what a shorter course of treatment or a home programme
                would look like.
              </p>
            </div>
          </div>

          <FaqList faqs={faqs} heading="Billing questions" />
        </div>
      </section>
    </>
  );
}
