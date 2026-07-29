/**
 * Photography.
 *
 * Source: Pexels (free licence — commercial use permitted, no attribution
 * required). Every image below was visually reviewed before inclusion; a
 * clinic site cannot ship an image nobody looked at.
 *
 * These are TRUE stock. Replace them with photographs of the actual clinics,
 * rooms and staff as soon as they exist — real photography of your own space
 * outperforms stock on trust every time. The alt text describes what is in the
 * frame, not what we wish were in it.
 *
 * Deliberately rejected during review: candle/rose-petal spa scenes, yoga
 * poses, smartwatch fitness shots, and a masked clinician portrait (which
 * would have read as a specific member of staff who does not work here).
 */

export type Photo = {
  src: string;
  alt: string;
  /** Focal bias for the CSS object-position, so faces/hands survive the crop. */
  position?: string;
};

export const photos = {
  hero: {
    src: "/photos/assessment-back.jpg",
    alt: "A physiotherapist assessing a patient's lower back, hands placed either side of the spine while the patient sits on a treatment table.",
    position: "center 40%",
  },
  physiotherapy: {
    src: "/photos/taping-lower-back.jpg",
    alt: "A therapist applying blue kinesiology tape across a patient's lower back in a bright clinic room.",
  },
  massage: {
    src: "/photos/manual-therapy.jpg",
    alt: "A therapist's hands working across a patient's upper back and shoulder during hands-on treatment.",
  },
  rehab: {
    src: "/photos/rehab-exercise.jpg",
    alt: "A patient working through a resistance exercise on rehabilitation equipment while a therapist supervises his form.",
  },
  counselling: {
    src: "/photos/counselling-notes.jpg",
    alt: "A counsellor taking notes on a clipboard while a client talks, seated in a calm room with plants.",
  },
  consultation: {
    src: "/photos/consultation.jpg",
    alt: "Two people in conversation during a consultation, one gesturing while explaining, an open notebook between them.",
  },
  neckPain: {
    src: "/photos/neck-pain.jpg",
    alt: "A person holding the back of their neck in discomfort, an anatomical spine chart on the wall behind them.",
  },
  medispa: {
    src: "/photos/medispa-treatment.jpg",
    alt: "A practitioner performing a facial treatment with a smooth stone tool on a client lying on a treatment table.",
  },
} as const satisfies Record<string, Photo>;

/**
 * Service slug → photo. Services with no honest match (acupuncture,
 * chiropractic) are absent on purpose: the page falls back to its typographic
 * header rather than borrowing an image of a different treatment.
 */
export const servicePhotos: Record<string, Photo> = {
  physiotherapy: photos.physiotherapy,
  "massage-therapy": photos.massage,
  "clinical-counselling": photos.counselling,
  medispa: photos.medispa,
  "mva-recovery": photos.neckPain,
  "wcb-recovery": photos.rehab,
};
