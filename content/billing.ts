export type Insurer = {
  name: string;
  /** Whether we can submit the claim on your behalf at the front desk. */
  directBill: boolean;
  note?: string;
};

/**
 * Direct-billing list. VERIFY against the clinic's actual Telus eClaims / Provider
 * Connect enrolment before launch — telling a patient you direct bill an insurer
 * you do not is the fastest way to lose them at the front desk.
 */
export const insurers: Insurer[] = [
  { name: "Alberta Blue Cross", directBill: true },
  { name: "Sun Life", directBill: true },
  { name: "Manulife", directBill: true },
  { name: "Canada Life", directBill: true },
  { name: "Green Shield Canada", directBill: true },
  { name: "Desjardins Insurance", directBill: true },
  { name: "Empire Life", directBill: true },
  { name: "Equitable Life", directBill: true },
  { name: "Chambers of Commerce Group", directBill: true },
  { name: "Johnson Inc.", directBill: true },
  { name: "Beneva", directBill: true },
  { name: "First Canadian", directBill: true },
  { name: "Industrial Alliance", directBill: true },
  { name: "Maximum Benefit", directBill: true },
  { name: "UV Insurance", directBill: true },
  { name: "WCB Alberta", directBill: true, note: "Accepted claims only" },
  { name: "Alberta auto insurers (Section B)", directBill: true, note: "Under the Diagnostic and Treatment Protocols" },
  {
    name: "Great-West Life legacy plans",
    directBill: false,
    note: "Pay at the visit; we issue a receipt you can submit",
  },
];

export const directBillInsurers = insurers.filter((i) => i.directBill);

export type ClaimStep = { title: string; body: string; youDo?: string; weDo?: string };

export const mvaSteps: ClaimStep[] = [
  {
    title: "Report the collision",
    body: "Report to your own insurer, even if the other driver was at fault. In Alberta you generally have a limited window to notify them, and treatment funding runs from the date of the accident.",
    youDo: "Call your insurer and get a claim number.",
  },
  {
    title: "Book — you do not need to wait for approval",
    body: "You can be assessed before the paperwork is finished. Soft tissue injuries respond better to early treatment than to waiting.",
    youDo: "Book online or call. Bring your claim number and adjuster's name if you have them.",
  },
  {
    title: "We complete the AB-1",
    body: "The Notification of Loss and Proof of Claim form opens your funded treatment. We complete it with you at the first visit and submit it to the insurer.",
    weDo: "Fill in and submit the AB-1 on your behalf.",
  },
  {
    title: "Treatment inside the protocols",
    body: "Alberta's Diagnostic and Treatment Protocols fund a defined block of physiotherapy, chiropractic and massage following a collision. There is normally nothing to pay.",
    weDo: "Bill the insurer directly and track your progress against the protocol.",
  },
  {
    title: "If you need more time",
    body: "If you are still symptomatic when the funded block ends, additional treatment can be requested with clinical justification.",
    weDo: "Prepare and submit the extension request and supporting reports.",
  },
];

export const wcbSteps: ClaimStep[] = [
  {
    title: "Tell your employer the day it happens",
    body: "Alberta requires you to report a workplace injury to your employer. Do it in writing if you can, and keep a copy.",
    youDo: "Report the injury to your supervisor.",
  },
  {
    title: "File your Worker's Report with WCB Alberta",
    body: "You file a Worker's Report of Injury; your employer files theirs separately. WCB assigns a claim number once yours is received.",
    youDo: "File online at wcb.ab.ca and note your claim number.",
  },
  {
    title: "Book your assessment",
    body: "Bring your claim number. If the claim is still pending we will explain your billing options before we treat, not afterwards.",
    youDo: "Book and bring the claim number.",
  },
  {
    title: "Treatment and work conditioning",
    body: "Treatment is billed directly to WCB for accepted claims. Your programme is built around the physical demands of your actual job.",
    weDo: "Direct bill WCB Alberta and build the plan around your job demands.",
  },
  {
    title: "Reporting and return to work",
    body: "Your case manager needs progress reports, and your employer needs written restrictions to build modified duties around.",
    weDo: "Report to your case manager and put your restrictions in writing.",
  },
];

export const paymentNotes = [
  "Physiotherapy, massage, chiropractic and acupuncture are not covered by Alberta Health Care — they are paid by extended health plans, auto insurers, WCB, or you.",
  "Where we can direct bill, you pay only the portion your plan does not cover.",
  "Where we cannot, you pay at the visit and we issue an itemised receipt with the practitioner's registration number so your insurer will accept it.",
  "We will tell you what a course of treatment is likely to cost before you commit to it.",
];
