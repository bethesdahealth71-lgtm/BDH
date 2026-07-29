/**
 * "What brings you in?" — the homepage triage.
 *
 * SIX options, deliberately. This was nine, which is past the point where a
 * list stops being a shortcut and becomes a reading task — and the person
 * using it is in pain and impatient. Overlapping paths were merged (long-term
 * pain folded into back/neck/joint; surgery folded into sports recovery;
 * pregnancy and "not sure" folded into the catch-all, which routes to a phone
 * call where a human can triage properly).
 *
 * Nothing here is stored or transmitted — the selection lives in component
 * state only, because health information must not leak into analytics or a
 * query string. See /privacy.
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
    detail: "Whiplash, neck or back pain, headaches",
    service: "mva-recovery",
    alsoConsider: ["physiotherapy", "clinical-counselling"],
    reassurance:
      "In most Alberta auto claims your treatment is billed to the insurer and costs you nothing — whether or not the crash was your fault. We complete the paperwork for you.",
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
    id: "pain",
    label: "My back, neck or a joint hurts",
    detail: "New or long-standing pain, stiffness, sciatica, arthritis",
    service: "physiotherapy",
    alsoConsider: ["chiropractic", "massage-therapy"],
    reassurance:
      "No doctor's referral needed in Alberta. Most people leave the first visit knowing what is wrong and what to do about it.",
  },
  {
    id: "injury",
    label: "I'm recovering from an injury or surgery",
    detail: "Sports injuries, sprains, joint replacement, ligament repair",
    service: "physiotherapy",
    alsoConsider: ["massage-therapy", "acupuncture"],
    reassurance:
      "Bring your surgeon's protocol if you have one. We build a plan to get you back to your sport or your job, rather than telling you to rest and hope.",
  },
  {
    id: "stress",
    label: "Stress, sleep or low mood",
    detail: "Tension headaches, anxiety after an injury, a long recovery",
    service: "clinical-counselling",
    alsoConsider: ["massage-therapy", "acupuncture"],
    reassurance:
      "Counselling here is practical and time-limited. You and your counsellor agree a focus and a rough number of sessions up front.",
  },
  {
    id: "unsure",
    label: "Something else, or I'm not sure",
    detail: "Pregnancy and postpartum, dizziness, or you just want advice",
    service: "physiotherapy",
    alsoConsider: ["chiropractic", "massage-therapy"],
    reassurance:
      "Call us and describe it. If physiotherapy is not the right answer we will say so and tell you what is — including when you should see a doctor instead.",
  },
];
