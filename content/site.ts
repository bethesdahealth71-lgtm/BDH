/**
 * Single source of truth for NAP (Name / Address / Phone).
 * Local SEO depends on these strings being byte-identical everywhere they appear —
 * on the site, in the JSON-LD, and in the Google Business Profile. Change them here only.
 */

export const site = {
  name: "Bethesda Health & Wellness",
  legalName: "Bethesda Health and Wellness Centre Inc.",
  shortName: "Bethesda",
  // TODO(deploy): set to the live origin before launch — sitemap + canonical + JSON-LD all read this.
  url: "https://bethesdahealth.ca",
  tagline: "Physiotherapy, massage and rehabilitation in Edmonton.",
  description:
    "Physiotherapy, massage therapy, chiropractic, acupuncture and counselling at two Edmonton clinics. Direct billing to most insurers. MVA and WCB claims accepted.",
  email: "bethesdahcs@gmail.com",
  phone: "+1 780 720 5370",
  phoneHref: "tel:+17807205370",
  smsHref: "sms:+17807205370",
  areaServed: ["Edmonton", "Sherwood Park", "St. Albert", "Leduc", "Beaumont"],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

/** JaneApp is the booking engine of record. Embedded, never linked away to. */
export const booking = {
  origin: "https://bethesdahealth.janeapp.com",
  base: "https://bethesdahealth.janeapp.com/locations/bethesda-health-and-wellness-centre-inc/book",
  /** Deep-link into Jane with a discipline preselected where Jane supports it. */
  forDiscipline(janeDisciplineId?: number) {
    return janeDisciplineId
      ? `${booking.base}#/discipline/${janeDisciplineId}`
      : booking.base;
  },
} as const;

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Our team", href: "/team" },
  { label: "Insurance & billing", href: "/insurance-billing" },
  { label: "New patients", href: "/new-patients" },
];
