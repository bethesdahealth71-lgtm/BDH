import Link from "next/link";
import type { ReactNode } from "react";
import { ClipboardCheck, ShieldCheck, CalendarClock, MapPin } from "lucide-react";
import type { Faq } from "@/content/services";
import type { ClaimStep } from "@/content/billing";
import { publishableReviews } from "@/content/reviews";
import { site } from "@/content/site";

/**
 * S2 · Hanging section head. Heading floats in negative space above its
 * section — no rule, no eyebrow, no tag-left/heading-right two-column grid.
 */
export function SectionHead({
  title,
  lede,
  as: As = "h2",
  action,
}: {
  title: string;
  lede?: string;
  /** Index pages use this as their page title, so h1 must be allowed. */
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <As
          style={{
            fontSize: As === "h1" ? "var(--text-display-s)" : "var(--text-4xl)",
            margin: 0,
          }}
        >
          {title}
        </As>
        {lede && (
          <p className="lede" style={{ marginTop: "var(--space-sm)", marginBottom: 0 }}>
            {lede}
          </p>
        )}
      </div>
      {action && <div className="section-head-action">{action}</div>}
    </div>
  );
}

/** Native accordion — no JS, keyboard-accessible for free, and printable. */
export function FaqList({ faqs, heading }: { faqs: Faq[]; heading?: string }) {
  return (
    <div>
      {heading && (
        <h2 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-lg)" }}>{heading}</h2>
      )}
      <div className="faq-list">
        {faqs.map((f) => (
          <details key={f.q} className="faq-item" name="faq">
            <summary>{f.q}</summary>
            <div className="faq-answer">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

/** F4 · Step sequence — the claim walkthroughs. */
export function StepSequence({ steps }: { steps: ClaimStep[] }) {
  return (
    <ol className="steps">
      {steps.map((s) => (
        <li key={s.title} className="step">
          <h3 className="step-title">{s.title}</h3>
          <p className="step-body">{s.body}</p>
          {(s.youDo || s.weDo) && (
            <dl className="step-who">
              {s.youDo && (
                <>
                  <dt>You</dt>
                  <dd>{s.youDo}</dd>
                </>
              )}
              {s.weDo && (
                <>
                  <dt>We</dt>
                  <dd>{s.weDo}</dd>
                </>
              )}
            </dl>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Reviews.
 *
 * Renders real, consented reviews when they exist and an honest empty state
 * when they do not. It never invents one. See content/reviews.ts.
 */
export function ReviewsSection() {
  // No real reviews yet → render nothing at all.
  //
  // Renders nothing rather than an "our reviews are coming soon" notice: a
  // patient does not care about our content pipeline, and an empty-state
  // apology makes the clinic look unfinished. Omission is honest; a
  // placeholder notice is just noise. See content/reviews.ts to populate.
  if (publishableReviews.length === 0) return null;

  return (
    <div>
      <h2 style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-lg)" }}>
        What patients say
      </h2>
      <div className="review-grid">
        {publishableReviews.slice(0, 4).map((r) => (
          <figure key={`${r.author}-${r.date}`} className="panel review">
            <blockquote style={{ margin: 0 }}>{r.body}</blockquote>
            <figcaption className="meta" style={{ marginTop: "var(--space-sm)" }}>
              {r.author} · {r.rating}/5 · {r.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Reassurance strip — facts about access, not invented metrics. */
export function AccessStrip() {
  const items = [
    {
      Icon: ClipboardCheck,
      title: "No referral needed",
      body: "Book physiotherapy, massage or chiropractic directly in Alberta.",
    },
    {
      Icon: ShieldCheck,
      title: "Direct billing",
      body: "Most extended health plans, WCB Alberta and auto insurers.",
    },
    {
      Icon: CalendarClock,
      title: "Six days a week",
      body: "Monday to Saturday, 9am to 8pm, at both clinics.",
    },
    {
      Icon: MapPin,
      title: "Two locations",
      body: "South at Parsons Road, West at 156 Street.",
    },
  ];

  return (
    <ul className="access-strip">
      {items.map(({ Icon, title, body }) => (
        <li key={title}>
          <Icon className="access-icon" strokeWidth={1.5} aria-hidden="true" />
          <strong>{title}</strong>
          <span>{body}</span>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {trail.map((t, i) => (
        <span key={t.href}>
          {i > 0 && <span aria-hidden="true"> / </span>}
          {i === trail.length - 1 ? (
            <span aria-current="page">{t.name}</span>
          ) : (
            <Link href={t.href}>{t.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function EmergencyNote() {
  return (
    <p className="field-note" style={{ maxWidth: "var(--measure)" }}>
      This page is general information, not a diagnosis. If you have chest pain, a head injury
      with confusion, sudden weakness or numbness, or loss of bladder or bowel control, do not
      book — call <strong>911</strong> or go to an emergency department. For non-urgent medical
      advice in Alberta, call <strong>Health Link at 811</strong>.
    </p>
  );
}

export function CallOrBook({ tone = "accent" }: { tone?: "accent" | "clay" }) {
  return (
    <div className="triage-actions">
      <a
        href="/book"
        className={`btn ${tone === "clay" ? "btn-clay" : "btn-primary"}`}
      >
        Book online
      </a>
      <a href={site.phoneHref} className="btn btn-chip">
        Call {site.phone}
      </a>
    </div>
  );
}
