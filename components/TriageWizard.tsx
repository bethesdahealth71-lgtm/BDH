"use client";

import Link from "next/link";
import { useState } from "react";
import { triageOptions } from "@/content/triage";
import { getService } from "@/content/services";
import { booking, site } from "@/content/site";

/**
 * The homepage triage. One question, one answer, then a route.
 *
 * Deliberately NOT a multi-step quiz: the visitor is in pain and impatient.
 * Nothing here is stored or transmitted — the selection lives in component
 * state only, because health information must not leak into analytics or a
 * query string. See /privacy.
 */
export function TriageWizard() {
  const [chosen, setChosen] = useState<string | null>(null);
  const option = triageOptions.find((o) => o.id === chosen);
  const service = option ? getService(option.service) : undefined;

  if (!option || !service) {
    return (
      <div className="triage">
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-2xs)" }}>
            What brings you in?
          </h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-3)", margin: 0 }}>
            Pick the closest one. We will point you at the right service — nothing is saved.
          </p>
        </div>

        <div className="triage-options">
          {triageOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className="triage-option"
              data-urgent={o.urgent ? "true" : undefined}
              aria-pressed={false}
              onClick={() => setChosen(o.id)}
            >
              <span className="triage-option-label">{o.label}</span>
              <span className="triage-option-detail">{o.detail}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const alsoConsider = (option.alsoConsider ?? [])
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="triage">
      <button type="button" className="triage-back" onClick={() => setChosen(null)}>
        ← Start over
      </button>

      <div className="triage-result">
        <p className="meta">Start here</p>
        <h2 style={{ fontSize: "var(--text-3xl)", margin: 0 }}>{service.name}</h2>
        <p style={{ margin: 0, color: "var(--color-ink-2)" }}>{option.reassurance}</p>

        <div className="triage-actions">
          <a
            href={booking.forDiscipline(service.janeDisciplineId)}
            className={`btn ${option.urgent ? "btn-clay" : "btn-primary"}`}
            target="_blank"
            rel="noopener"
          >
            Book {service.shortName ?? service.name}
          </a>
          <Link href={`/services/${service.slug}`} className="btn btn-chip">
            Read more first
          </Link>
        </div>

        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-3)", margin: 0 }}>
          Rather talk to someone?{" "}
          <a href={site.phoneHref} className="inline-link">
            {site.phone}
          </a>
        </p>

        {alsoConsider.length > 0 && (
          <>
            <hr className="rule" />
            <div>
              <p className="meta" style={{ marginBottom: "var(--space-xs)" }}>
                Often booked alongside
              </p>
              <div className="tag-row">
                {alsoConsider.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="tag">
                    {s.shortName ?? s.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
