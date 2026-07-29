import {
  regulators,
  clinicAssurances,
  fees,
  hasPublishedFees,
} from "@/content/credentials";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Credentials.
 *
 * Only verified facts render. Unverified entries are hidden entirely rather
 * than badged — a patient should never be asked to audit our data. Flip
 * `verified` in content/credentials.ts and the row appears.
 */
export function CredentialsBlock() {
  const assurances = clinicAssurances.filter((c) => c.verified);

  return (
    <div className={assurances.length ? "diptych" : undefined} data-even="true">
      <div>
        <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>
          Regulated, registered, and checkable
        </h2>
        <p className="lede">
          Every discipline here is a regulated profession in Alberta — a public register you can
          search, and a registration number on every receipt.
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

      {assurances.length > 0 && (
        <div className="panel-inset">
          <h3 style={{ fontSize: "var(--text-2xl)", marginTop: 0 }}>How we handle your claim</h3>
          <Reveal as="dl" className="cred-list" mode="group" stagger={0.06}>
            {assurances.map((c) => (
              <div key={c.label} className="cred-row">
                <dt className="cred-label">{c.label}</dt>
                <dd className="cred-detail">{c.detail}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      )}
    </div>
  );
}

/**
 * Appointment lengths and cost.
 *
 * When no fees are published we show the appointment lengths (useful on their
 * own — people plan their day around them) and one plain sentence about cost.
 * We do NOT print a "fees not published yet" apology or a column of "call for
 * fee" cells; that is our admin problem surfacing as the patient's problem.
 */
export function FeesBlock() {
  return (
    <div>
      <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>Appointment lengths and cost</h2>
      <p className="lede">
        {hasPublishedFees ? (
          <>What you pay depends on your plan, and we check your coverage before your first
          treatment — not after it.</>
        ) : (
          <>
            What you pay depends on your plan. Call{" "}
            <a href={site.phoneHref} className="inline-link">
              {site.phone}
            </a>{" "}
            and we will quote you for exactly what you need, and check your coverage before your
            first treatment.
          </>
        )}
      </p>

      <div className="table-scroll">
        <table className="spec spec-stack">
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">First visit</th>
              <th scope="col">Follow-up</th>
              {hasPublishedFees && <th scope="col">Fee</th>}
            </tr>
          </thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f.service}>
                <th scope="row" style={{ fontWeight: 600 }}>
                  {f.service}
                  {f.initialFee === 0 && (
                    <span className="fee-flag">Usually no cost to you</span>
                  )}
                </th>
                <td data-label="First visit">{f.initial ? `${f.initial} min` : "—"}</td>
                <td data-label="Follow-up">{f.followUp ? `${f.followUp} min` : "—"}</td>
                {hasPublishedFees && (
                  <td data-label="Fee" style={{ color: "var(--color-ink-2)" }}>
                    {f.initialFee === 0 ? "Normally $0" : f.initialFee === null ? "—" : `$${f.initialFee}`}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
