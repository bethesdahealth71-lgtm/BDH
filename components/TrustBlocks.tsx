import {
  regulators,
  clinicAssurances,
  fees,
  hasPublishedFees,
} from "@/content/credentials";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Credentials — the "Trust & Authority" pattern's core requirement.
 * Typographic rows, not badge images: we have no logo licences, and a wall of
 * borrowed logos is exactly the generic-medical look this site avoids.
 */
export function CredentialsBlock() {
  return (
    <div className="diptych" data-even="true">
      <div>
        <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>
          Regulated, registered, and checkable
        </h2>
        <p className="lede">
          Every discipline here is a regulated profession in Alberta. That means a public
          register you can search, a complaints process that is not us, and a registration
          number on every receipt.
        </p>
        <Reveal as="dl" className="cred-list" mode="group" stagger={0.06}>
          {regulators.map((c) => (
            <div key={c.label} className="cred-row">
              <dt className="cred-label">{c.label}</dt>
              <dd className="cred-detail">{c.detail}</dd>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="panel-inset">
        <h3 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>How we handle your claim</h3>
        <Reveal as="dl" className="cred-list" mode="group" stagger={0.06}>
          {clinicAssurances.map((c) => (
            <div key={c.label} className="cred-row">
              <dt className="cred-label">
                {c.label}
                {!c.verified && (
                  <span className="placeholder-flag" style={{ marginLeft: "var(--space-xs)" }}>
                    To verify
                  </span>
                )}
              </dt>
              <dd className="cred-detail">{c.detail}</dd>
            </div>
          ))}
        </Reveal>
        <p className="field-note" style={{ marginTop: "var(--space-lg)" }}>
          Items marked “to verify” are pending confirmation of the clinic&rsquo;s own enrolment.
          We would rather flag them than state them as fact.
        </p>
      </div>
    </div>
  );
}

/**
 * Fees. The pattern flags hidden pricing as an anti-pattern — but the honest
 * fix is a real structure with the numbers missing, not invented numbers.
 */
export function FeesBlock() {
  return (
    <div>
      <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>What it costs</h2>
      <p className="lede">
        Appointment lengths are fixed. What you actually pay depends on your plan — and we
        check that before your first treatment, not after it.
      </p>

      {!hasPublishedFees && (
        <div className="notice" style={{ marginBlock: "var(--space-lg)" }}>
          <p className="notice-title">Fees not published yet</p>
          <p style={{ margin: 0 }}>
            We have not listed dollar amounts here because they have not been confirmed, and a
            wrong number is worse than no number. Call{" "}
            <a href={site.phoneHref} className="inline-link">
              {site.phone}
            </a>{" "}
            and we will quote you the current fee for exactly what you need.
          </p>
        </div>
      )}

      {/* Four columns is too many for a phone, so below 40rem the rows stack
          into labelled blocks (data-label drives the ::before) rather than
          forcing a horizontal scroll on someone holding the phone one-handed. */}
      <div className="table-scroll">
        <table className="spec spec-stack">
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">First visit</th>
              <th scope="col">Follow-up</th>
              <th scope="col">Fee</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f.service}>
                <th scope="row" style={{ fontWeight: 600 }}>
                  {f.service}
                </th>
                <td data-label="First visit">{f.initial ? `${f.initial} min` : "—"}</td>
                <td data-label="Follow-up">{f.followUp ? `${f.followUp} min` : "—"}</td>
                <td data-label="Fee" style={{ color: "var(--color-ink-2)" }}>
                  {f.initialFee === 0
                    ? "Normally $0"
                    : f.initialFee === null
                      ? "Call for current fee"
                      : `$${f.initialFee}`}
                  {f.note && (
                    <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--color-ink-3)" }}>
                      {f.note}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
