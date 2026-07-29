/**
 * Trust signals and fee transparency.
 *
 * The "Trust & Authority" pattern names two anti-patterns this site had:
 * hidden contact info and no visible credentials. Contact was already solved;
 * this file fixes credentials and pricing.
 */

export type Credential = {
  label: string;
  detail: string;
  /**
   * false = the claim is structurally true for the profession in Alberta but
   * the clinic's specific enrolment/registration has NOT been verified.
   * The UI marks unverified entries. Verify, then flip to true.
   */
  verified: boolean;
};

/** Regulatory facts about these professions in Alberta. */
export const regulators: Credential[] = [
  {
    label: "College of Physiotherapists of Alberta",
    detail:
      "Every practising physiotherapist in Alberta must be registered. You can look up any registrant on the College's public register.",
    verified: true,
  },
  {
    label: "College of Massage Therapists of Alberta",
    detail:
      "Massage therapy is a regulated profession in Alberta. Receipts carry the therapist's registration number so your insurer will accept them.",
    verified: true,
  },
  {
    label: "College of Chiropractors of Alberta",
    detail: "Chiropractors are regulated and must hold current registration to practise.",
    verified: true,
  },
  {
    label: "College of Acupuncturists of Alberta",
    detail: "Acupuncture is a regulated profession with mandatory registration.",
    verified: true,
  },
];

/** Operational trust signals specific to this clinic. */
export const clinicAssurances: Credential[] = [
  {
    label: "WCB Alberta provider",
    detail: "We treat accepted WCB claims and bill WCB directly.",
    verified: false,
  },
  {
    label: "Auto insurer direct billing",
    detail:
      "We treat under Alberta's Diagnostic and Treatment Protocols and bill the insurer directly.",
    verified: false,
  },
  {
    label: "Telus eClaims direct billing",
    detail: "Most major extended health plans are submitted at the front desk.",
    verified: false,
  },
  {
    label: "Records held in Jane, in Canada",
    detail:
      "Your health record is encrypted in transit and at rest, stored on Canadian servers, and access is logged.",
    verified: false,
  },
];

export type Fee = {
  service: string;
  /** Minutes. */
  initial: number | null;
  followUp: number | null;
  /** CAD. null = not supplied yet; the UI says so rather than inventing one. */
  initialFee: number | null;
  followUpFee: number | null;
  note?: string;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FEES NOT SUPPLIED.
 *
 * Publishing a fee the clinic does not charge is worse than publishing none —
 * the patient arrives expecting one number and is billed another.
 *
 * Every amount here is null, and the table renders "Call for current fee"
 * with a visible notice. Fill in the real numbers and the notice disappears
 * automatically (see `hasPublishedFees`).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const fees: Fee[] = [
  { service: "Physiotherapy", initial: 60, followUp: 30, initialFee: null, followUpFee: null },
  { service: "Massage Therapy", initial: 60, followUp: 45, initialFee: null, followUpFee: null },
  { service: "Chiropractic", initial: 45, followUp: 20, initialFee: null, followUpFee: null },
  { service: "Acupuncture", initial: 60, followUp: 45, initialFee: null, followUpFee: null },
  { service: "Clinical Counselling", initial: 60, followUp: 50, initialFee: null, followUpFee: null },
  {
    service: "MVA / WCB treatment",
    initial: 60,
    followUp: 30,
    initialFee: 0,
    followUpFee: 0,
    note: "Billed to the insurer or WCB — normally nothing to pay.",
  },
];

export const hasPublishedFees = fees.some(
  (f) => f.initialFee !== null && f.initialFee > 0,
);
