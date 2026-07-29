/**
 * "Where does it hurt / what happened" — the homepage triage.
 * Routes an anxious visitor to the right service page and a pre-filtered booking
 * in two taps. Deliberately short: three options deep is a decision, ten is a form.
 */

export type TriageOption = {
  id: string;
  /** What the patient would say, not what a clinician would call it. */
  label: string;
  detail: string;
  /** Service slug to route to. */
  service: string;
  /** Extra services worth mentioning on the result. */
  alsoConsider?: string[];
  /** Shown on the result card — the single most useful thing to know. */
  reassurance: string;
  /** Claim pathways get the clay register and a different call to action. */
  urgent?: boolean;
};

export const triageOptions: TriageOption[] = [
  {
    id: "collision",
    label: "I was in a car accident",
    detail: "Whiplash, neck or back pain, headaches after a collision",
    service: "mva-recovery",
    alsoConsider: ["physiotherapy", "clinical-counselling"],
    reassurance:
      "In most Alberta auto claims your treatment is billed to the insurer and costs you nothing — whether or not the crash was your fault. We complete the AB-1 for you.",
    urgent: true,
  },
  {
    id: "work",
    label: "I was injured at work",
    detail: "An accepted or pending WCB Alberta claim",
    service: "wcb-recovery",
    alsoConsider: ["physiotherapy", "chiropractic"],
    reassurance:
      "Accepted WCB claims are billed directly to WCB Alberta. We report to your case manager and put your work restrictions in writing.",
    urgent: true,
  },
  {
    id: "back-neck",
    label: "My back or neck hurts",
    detail: "Ongoing pain, stiffness, sciatica or headaches from the neck",
    service: "physiotherapy",
    alsoConsider: ["chiropractic", "massage-therapy"],
    reassurance:
      "No doctor's referral needed in Alberta. Most people leave the first visit knowing what is wrong and what to do about it.",
  },
  {
    id: "sport",
    label: "I hurt myself training or playing",
    detail: "Sprains, strains, tendon pain, or a joint that gave way",
    service: "physiotherapy",
    alsoConsider: ["massage-therapy", "acupuncture"],
    reassurance:
      "We assess what failed and what to load, then build a return-to-sport plan rather than telling you to rest and hope.",
  },
  {
    id: "surgery",
    label: "I'm recovering from surgery",
    detail: "Joint replacement, ligament repair, or another procedure",
    service: "physiotherapy",
    alsoConsider: ["massage-therapy"],
    reassurance:
      "Bring your surgeon's protocol if you have one. We will work inside it and coordinate with your surgical team.",
  },
  {
    id: "chronic",
    label: "I've had pain for a long time",
    detail: "Pain that outlasted the injury, or arthritis and long-term conditions",
    service: "physiotherapy",
    alsoConsider: ["acupuncture", "clinical-counselling"],
    reassurance:
      "Persistent pain usually needs more than hands-on treatment. We combine movement, pain education and — if it would help — counselling.",
  },
  {
    id: "stress",
    label: "Stress and tension are getting to me",
    detail: "Sleep, mood, tension headaches, or anxiety after an injury",
    service: "clinical-counselling",
    alsoConsider: ["massage-therapy", "acupuncture"],
    reassurance:
      "Counselling here is practical and time-limited. You and your counsellor agree a focus and a rough number of sessions up front.",
  },
  {
    id: "pregnancy",
    label: "I'm pregnant or postpartum",
    detail: "Pelvic and back pain, or rebuilding after birth",
    service: "physiotherapy",
    alsoConsider: ["massage-therapy"],
    reassurance:
      "Pelvic health physiotherapy and prenatal massage are both available. Tell us your trimester when you book so we can position you comfortably.",
  },
  {
    id: "unsure",
    label: "I'm not sure what I need",
    detail: "Something is wrong and you want someone to point you the right way",
    service: "physiotherapy",
    alsoConsider: ["chiropractic", "massage-therapy"],
    reassurance:
      "Call us and describe it. If physiotherapy is not the right answer we will say so and tell you what is — including when you should see a doctor instead.",
  },
];
