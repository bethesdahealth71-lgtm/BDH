export type Hours = { days: string; opens: string; closes: string; note?: string };

export type Location = {
  slug: string;
  name: string;
  shortName: string;
  street: string;
  unit?: string;
  city: string;
  region: string;
  regionName: string;
  postalCode: string;
  country: string;
  /** Confirmed per-location line. Falls back to the main clinic line when absent. */
  phone?: string;
  /** decimal degrees — used for LocalBusiness geo + the directions link */
  geo?: { lat: number; lng: number };
  hours: Hours[];
  parking: string;
  accessibility: string[];
  transit: string;
  /** Service slugs offered here. Empty = every service. */
  services: string[];
  intro: string;
};

export const locations: Location[] = [
  {
    slug: "south-parsons-road",
    name: "Bethesda Health & Wellness — South",
    shortName: "South",
    street: "1059 Parsons Road SW",
    city: "Edmonton",
    region: "AB",
    regionName: "Alberta",
    postalCode: "T6X 0X2",
    country: "CA",
    phone: "+1 780 720 5370",
    hours: [
      { days: "Monday – Saturday", opens: "09:00", closes: "20:00" },
      { days: "Sunday & statutory holidays", opens: "", closes: "", note: "Closed" },
    ],
    parking: "Free surface parking directly in front of the clinic entrance.",
    accessibility: [
      "Ground-floor entry — no stairs from the parking lot",
      "Step-free treatment rooms",
      "Accessible washroom",
    ],
    transit: "Served by the Parsons Road corridor; closest LRT is Century Park.",
    services: [],
    intro:
      "Our South clinic sits just off Parsons Road, minutes from Anthony Henday and Gateway Boulevard. It is our larger site — the full range of physiotherapy, massage, chiropractic, acupuncture and counselling runs here six days a week.",
  },
  {
    slug: "west-156-street",
    name: "Bethesda Health & Wellness — West",
    shortName: "West",
    street: "9509 156 Street NW",
    unit: "Suite 311",
    city: "Edmonton",
    region: "AB",
    regionName: "Alberta",
    postalCode: "T5P 4J5",
    country: "CA",
    hours: [
      { days: "Monday – Saturday", opens: "09:00", closes: "20:00" },
      { days: "Sunday & statutory holidays", opens: "", closes: "", note: "Closed" },
    ],
    parking: "On-site parking in the building lot; additional street parking on 156 Street.",
    accessibility: [
      "Elevator access to Suite 311",
      "Step-free route from the parking lot to the elevator",
      "Accessible washroom on the same floor",
    ],
    transit: "On the 156 Street bus corridor in west Edmonton.",
    services: [],
    intro:
      "Our West clinic serves west Edmonton from Suite 311 at 9509 156 Street. Same treatment approach, same direct billing, closer to home if you are west of Whitemud.",
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export function formatAddress(l: Location, sep = ", ") {
  return [l.unit, l.street, `${l.city} ${l.region} ${l.postalCode}`].filter(Boolean).join(sep);
}

export function directionsUrl(l: Location) {
  const q = encodeURIComponent(`${l.name}, ${formatAddress(l)}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function mapEmbedUrl(l: Location) {
  const q = encodeURIComponent(`${l.street}${l.unit ? ` ${l.unit}` : ""}, ${l.city}, ${l.region} ${l.postalCode}`);
  return `https://maps.google.com/maps?q=${q}&output=embed`;
}
