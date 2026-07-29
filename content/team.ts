export type Practitioner = {
  slug: string;
  name: string;
  credentials: string;
  role: string;
  /** Service slugs this practitioner delivers */
  disciplines: string[];
  /** Location slugs they work from */
  locations: string[];
  /** Areas of focus — drives the "find someone for X" filter */
  focus: string[];
  languages: string[];
  bio: string;
  /** Public registration number with their Alberta college. Patients can verify it. */
  registration?: string;
  photo?: string;
  /**
   * TRUE until the clinic supplies the real bio, headshot and registration number.
   * The UI renders a visible "placeholder" notice for any entry with this set —
   * these are structural stand-ins, not real people. Do not remove the flag
   * without replacing every field on the entry with verified information.
   */
  isPlaceholder: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER CONTENT — replace before launch.
 *
 * Real practitioner names, credentials, registration numbers, photos and bios
 * were not available when this site was built, and inventing them would be
 * both dishonest and a regulatory problem (Alberta's health colleges govern how
 * practitioners may be described publicly).
 *
 * Each entry below is a structural stand-in so the page, the filters and the
 * schema markup can be built and tested. Every one renders with a visible
 * placeholder notice until `isPlaceholder` is set to false.
 *
 * To go live: replace each entry with real information and set isPlaceholder: false.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const team: Practitioner[] = [
  {
    slug: "physiotherapist-south-1",
    name: "Physiotherapist — profile pending",
    credentials: "BScPT / MScPT",
    role: "Physiotherapist",
    disciplines: ["physiotherapy", "mva-recovery", "wcb-recovery"],
    locations: ["south-parsons-road"],
    focus: ["Low back pain", "Post-surgical rehabilitation", "Whiplash"],
    languages: ["English"],
    bio: "This profile is a placeholder. The clinic's registered physiotherapist bio, headshot and College of Physiotherapists of Alberta registration number will be published here.",
    isPlaceholder: true,
  },
  {
    slug: "massage-therapist-south-1",
    name: "Registered Massage Therapist — profile pending",
    credentials: "RMT",
    role: "Registered Massage Therapist",
    disciplines: ["massage-therapy"],
    locations: ["south-parsons-road", "west-156-street"],
    focus: ["Deep tissue", "Prenatal massage", "Sports recovery"],
    languages: ["English"],
    bio: "This profile is a placeholder. The therapist's bio, headshot and registration details will be published here.",
    isPlaceholder: true,
  },
  {
    slug: "chiropractor-west-1",
    name: "Chiropractor — profile pending",
    credentials: "DC",
    role: "Chiropractor",
    disciplines: ["chiropractic"],
    locations: ["west-156-street"],
    focus: ["Mechanical back pain", "Headaches", "Ergonomics"],
    languages: ["English"],
    bio: "This profile is a placeholder. The chiropractor's bio, headshot and College of Chiropractors of Alberta registration number will be published here.",
    isPlaceholder: true,
  },
  {
    slug: "acupuncturist-south-1",
    name: "Acupuncturist — profile pending",
    credentials: "R.Ac",
    role: "Registered Acupuncturist",
    disciplines: ["acupuncture"],
    locations: ["south-parsons-road"],
    focus: ["Chronic pain", "Headaches", "Sleep and stress"],
    languages: ["English"],
    bio: "This profile is a placeholder. The practitioner's bio, headshot and registration details will be published here.",
    isPlaceholder: true,
  },
  {
    slug: "counsellor-1",
    name: "Clinical Counsellor — profile pending",
    credentials: "MSc / RPsych",
    role: "Clinical Counsellor",
    disciplines: ["clinical-counselling"],
    locations: ["south-parsons-road", "west-156-street"],
    focus: ["Chronic pain", "Post-collision anxiety", "Return to work"],
    languages: ["English"],
    bio: "This profile is a placeholder. The counsellor's bio, credentials and registration details will be published here.",
    isPlaceholder: true,
  },
];

export function getPractitioner(slug: string) {
  return team.find((p) => p.slug === slug);
}

export const hasRealTeamProfiles = team.some((p) => !p.isPlaceholder);
