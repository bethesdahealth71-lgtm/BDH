export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Nav / card label when the full name is too long */
  shortName?: string;
  /** One line. Appears on the services index and in the triage results. */
  summary: string;
  /** <title> — the root layout appends the brand, so do NOT repeat it here. */
  seoTitle: string;
  seoDescription: string;
  /** Opening paragraph on the service page. Two to three sentences, plain language. */
  intro: string;
  /** "What we treat" — conditions, phrased the way patients search for them. */
  treats: string[];
  /** "What a session looks like" — ordered, concrete, reduces first-visit anxiety. */
  session: { title: string; body: string }[];
  /** "Who it's for" */
  forWho: string[];
  /** Techniques / sub-services — also the long-tail keyword surface. */
  includes: string[];
  faqs: Faq[];
  /** Slugs of services commonly booked alongside this one. */
  related: string[];
  /** Jane discipline id, when known, for deep-linked booking. */
  janeDisciplineId?: number;
  /** Claim-funded pathways get a different visual register (clay, not leaf). */
  claimPathway?: boolean;
};

export const services: Service[] = [
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    summary: "Assessment, hands-on treatment and a graded exercise plan to restore movement.",
    seoTitle: "Physiotherapy in Edmonton",
    seoDescription:
      "Registered physiotherapy at two Edmonton clinics. Assessment, manual therapy and exercise prescription for back pain, sports injuries, post-surgical recovery and more. Direct billing available.",
    intro:
      "Physiotherapy starts with finding out what is actually driving your pain — not just where you feel it. Your physiotherapist assesses how you move, explains what they find in plain language, and builds a plan you can carry out between visits. Most people leave the first appointment already knowing what to do next.",
    treats: [
      "Low back pain and sciatica",
      "Neck pain, whiplash and headaches",
      "Shoulder impingement and rotator cuff injury",
      "Knee pain, ACL and meniscus rehabilitation",
      "Ankle sprains and plantar fasciitis",
      "Tennis and golfer's elbow",
      "Hip and groin pain",
      "Post-surgical recovery",
      "Dizziness and balance problems",
      "Pelvic floor and postpartum recovery",
    ],
    session: [
      {
        title: "History and assessment",
        body: "We ask what happened, what makes it worse, and what you need to get back to. Then we test movement, strength and joint mechanics to find the source.",
      },
      {
        title: "Explanation",
        body: "You get a plain-language account of what is going on and a realistic sense of the timeline — including whether physiotherapy is the right answer at all.",
      },
      {
        title: "Hands-on treatment",
        body: "Manual therapy, soft-tissue work, dry needling or modalities as indicated, chosen for your presentation rather than a set protocol.",
      },
      {
        title: "Your plan",
        body: "You leave with a small number of exercises you will actually do, written down, plus guidance on activity, work and load.",
      },
    ],
    forWho: [
      "You have pain that has not settled on its own",
      "You are recovering from surgery and want to rebuild properly",
      "You were injured in a car accident or at work",
      "You want to return to sport without re-injuring yourself",
      "You were told to rest it, and resting it did not work",
    ],
    includes: [
      "Assessment and diagnosis",
      "Manual therapy and joint mobilisation",
      "Exercise therapy and progressive loading",
      "Post-surgical rehabilitation",
      "Sports injury rehabilitation",
      "Vestibular rehabilitation",
      "Pelvic health physiotherapy",
      "Geriatric and balance-focused physiotherapy",
      "Paediatric physiotherapy",
      "Chronic pain management",
    ],
    faqs: [
      {
        q: "Do I need a doctor's referral?",
        a: "No. In Alberta you can book physiotherapy directly. Some extended health plans ask for a referral before they reimburse, so it is worth checking your policy — but you do not need one to be seen here.",
      },
      {
        q: "What should I wear?",
        a: "Something you can move in, and that lets us see the area we are treating. Shorts for a knee or hip, a tank top or loose t-shirt for a shoulder or back. We have gowns if you would rather change here.",
      },
      {
        q: "How long is the first appointment?",
        a: "Plan for about an hour. Most of that is assessment and explanation; follow-up visits are shorter.",
      },
      {
        q: "How many sessions will I need?",
        a: "It depends on what is wrong and how long it has been going on. Your physiotherapist will give you an honest estimate at the first visit and revise it as you progress. If you are not improving, we will tell you and refer you on.",
      },
      {
        q: "Does it hurt?",
        a: "Some hands-on techniques are uncomfortable and some post-treatment soreness is normal. Nothing should be unbearable — tell your therapist and they will adjust.",
      },
    ],
    related: ["massage-therapy", "chiropractic", "mva-recovery"],
  },
  {
    slug: "massage-therapy",
    name: "Massage Therapy",
    summary: "Registered massage for pain, tension and recovery — not a spa treatment.",
    seoTitle: "Registered Massage Therapy in Edmonton",
    seoDescription:
      "Registered massage therapy in Edmonton for back and neck tension, sports recovery, prenatal care and chronic pain. Direct billing to most extended health plans.",
    intro:
      "Registered massage therapy here is treatment, not pampering. Your therapist works on the tissue that is actually contributing to your pain and coordinates with your physiotherapist or chiropractor when you are seeing both. Receipts are issued under a registered massage therapist so your extended health plan will recognise them.",
    treats: [
      "Neck and upper back tension",
      "Tension headaches",
      "Low back tightness",
      "Sports recovery and delayed onset soreness",
      "Repetitive strain from desk work",
      "Scar tissue and post-surgical restriction",
      "Pregnancy-related back and hip pain",
      "Swelling and lymphatic congestion",
    ],
    session: [
      {
        title: "Intake",
        body: "A short health history and a conversation about what you want out of the session — relief, recovery, or maintenance.",
      },
      {
        title: "Treatment",
        body: "Pressure and technique matched to the goal. You are draped throughout and you set the pressure; say so at any point and it changes.",
      },
      {
        title: "Aftercare",
        body: "Hydration, heat or ice guidance, and a stretch or two if they will help hold the result.",
      },
    ],
    forWho: [
      "You carry tension in your neck and shoulders",
      "You train hard and recover slowly",
      "You are pregnant and uncomfortable",
      "You want to extend the results of physiotherapy between visits",
    ],
    includes: [
      "Deep tissue massage",
      "Swedish massage",
      "Sports massage",
      "Trigger point therapy",
      "Myofascial release",
      "Prenatal massage",
      "Manual lymphatic drainage",
      "Cupping",
    ],
    faqs: [
      {
        q: "Will my insurance cover it?",
        a: "Most extended health plans cover registered massage therapy. Some require a physician's referral first. We can direct bill most major insurers — the full list is on the insurance and billing page.",
      },
      {
        q: "How much do I need to undress?",
        a: "Only as much as you are comfortable with. You are draped at all times and only the area being worked on is uncovered. Plenty of effective work happens through clothing.",
      },
      {
        q: "Is deep tissue better than a relaxation massage?",
        a: "Not inherently — they do different jobs. More pressure is not automatically more therapeutic. Tell your therapist the outcome you want and they will pick the technique.",
      },
      {
        q: "Can I get a massage while pregnant?",
        a: "Yes. Prenatal massage uses side-lying positioning and adjusted technique. Let us know your trimester when you book.",
      },
    ],
    related: ["physiotherapy", "acupuncture", "chiropractic"],
  },
  {
    slug: "chiropractic",
    name: "Chiropractic",
    summary: "Spinal and joint assessment, adjustment and soft-tissue work for mechanical pain.",
    seoTitle: "Chiropractor in Edmonton",
    seoDescription:
      "Chiropractic care in Edmonton for back pain, neck pain and headaches. Assessment, adjustment, soft-tissue therapy and ergonomic advice. Direct billing available.",
    intro:
      "Chiropractic care at Bethesda focuses on how your joints move and what happens when they stop moving well. Your chiropractor assesses the whole chain rather than the single sore spot, and combines adjustment with soft-tissue work and exercise so the change holds.",
    treats: [
      "Mechanical low back pain",
      "Neck pain and stiffness",
      "Cervicogenic headaches",
      "Mid-back and rib pain",
      "Sciatica",
      "Postural strain from desk work",
      "Jaw and TMJ discomfort",
    ],
    session: [
      {
        title: "Assessment",
        body: "Movement screening, joint-by-joint palpation and orthopaedic testing to find the segments that are not doing their share.",
      },
      {
        title: "Adjustment and release",
        body: "Manual or instrument-assisted adjustment where indicated, plus soft-tissue work on the muscles guarding around it.",
      },
      {
        title: "Load and posture",
        body: "Specific exercise and ergonomic changes so the same pattern does not simply return next month.",
      },
    ],
    forWho: [
      "Your back locks up periodically",
      "You get headaches that start in your neck",
      "You sit at a desk and feel it by Thursday",
      "You want manual care alongside a rehabilitation plan",
    ],
    includes: [
      "Spinal adjustment",
      "Extremity and joint mobilisation",
      "Soft-tissue therapy",
      "Posture and ergonomic assessment",
      "Rehabilitative exercise",
      "Preventive and maintenance care",
    ],
    faqs: [
      {
        q: "Does an adjustment hurt?",
        a: "Usually not. You may hear a pop — that is gas releasing in the joint, not bones moving out of place. Some people feel mild soreness for a day afterwards, similar to after exercise.",
      },
      {
        q: "Do I have to keep coming forever?",
        a: "No. Your chiropractor will set out a treatment plan with an endpoint. Ongoing maintenance care is a choice some people make, not an obligation.",
      },
      {
        q: "Can I see a chiropractor and a physiotherapist at the same time?",
        a: "Yes, and it is common here. Because both practitioners are in the same clinic they can coordinate rather than working at cross purposes.",
      },
    ],
    related: ["physiotherapy", "massage-therapy", "wcb-recovery"],
  },
  {
    slug: "acupuncture",
    name: "Acupuncture",
    summary:
      "Fine-needle treatment for pain, tension and stress, delivered by a registered practitioner.",
    seoTitle: "Acupuncture in Edmonton",
    seoDescription:
      "Registered acupuncture in Edmonton for chronic pain, headaches, stress and injury recovery. Single-use sterile needles, direct billing where your plan allows.",
    intro:
      "Acupuncture uses very fine, single-use sterile needles placed at specific points to influence pain and muscle tension. Many patients use it alongside physiotherapy for pain that has not responded to hands-on treatment alone.",
    treats: [
      "Chronic low back and neck pain",
      "Migraines and tension headaches",
      "Osteoarthritic joint pain",
      "Muscle tension and trigger points",
      "Stress and difficulty sleeping",
      "Digestive discomfort",
      "Recovery after injury",
    ],
    session: [
      {
        title: "Consultation",
        body: "A health history and a discussion of what you are hoping to change, plus any medications or conditions we need to work around.",
      },
      {
        title: "Treatment",
        body: "Needles are placed and left in place while you rest, usually twenty to thirty minutes. Most people feel a dull heaviness rather than sharpness.",
      },
      {
        title: "Review",
        body: "We check how you responded and set the interval for the next visit — acupuncture is usually cumulative rather than one-and-done.",
      },
    ],
    forWho: [
      "Your pain has not responded to hands-on treatment alone",
      "You get frequent headaches",
      "You want a drug-free option to try alongside your current care",
      "You are managing stress that shows up physically",
    ],
    includes: [
      "Traditional acupuncture",
      "Electroacupuncture",
      "Dry needling of trigger points",
      "Cupping",
      "Auricular (ear) acupuncture",
    ],
    faqs: [
      {
        q: "Does it hurt?",
        a: "The needles are about the thickness of a hair. Insertion is usually a brief pinch at most, and many points you will not feel at all.",
      },
      {
        q: "Are the needles reused?",
        a: "Never. Every needle is sterile, single-use, and disposed of in a sharps container immediately after your treatment.",
      },
      {
        q: "How many treatments before I notice a difference?",
        a: "Some people notice a change after one session; for persistent conditions it is more common to reassess after four to six. Your practitioner will tell you at the outset when they expect to see a response.",
      },
    ],
    related: ["physiotherapy", "massage-therapy", "clinical-counselling"],
  },
  {
    slug: "clinical-counselling",
    name: "Clinical Counselling",
    shortName: "Counselling",
    summary:
      "Talk therapy for pain-related distress, injury recovery and the stress that comes with both.",
    seoTitle: "Clinical Counselling & Pain Psychology in Edmonton",
    seoDescription:
      "Clinical counselling in Edmonton for chronic pain, injury-related anxiety, stress and recovery after an accident. In person or by secure video. Direct billing where available.",
    intro:
      "Pain and injury are not only physical. Persistent pain changes sleep, mood, work and confidence, and a serious accident can leave you anxious about things that never used to bother you. Counselling here is practical and time-limited, focused on getting you functioning rather than open-ended.",
    treats: [
      "Chronic pain and the distress that comes with it",
      "Anxiety after a motor vehicle accident",
      "Fear of movement or re-injury",
      "Sleep disruption",
      "Low mood during a long recovery",
      "Stress related to a claim or a return to work",
      "Adjusting to a change in physical ability",
    ],
    session: [
      {
        title: "First conversation",
        body: "What brought you here, what you have already tried, and what a good outcome would look like for you specifically.",
      },
      {
        title: "A working plan",
        body: "You and your counsellor agree on a focus and an approximate number of sessions rather than leaving it open-ended.",
      },
      {
        title: "Between sessions",
        body: "Practical strategies you use in daily life, reviewed and adjusted at the next visit.",
      },
    ],
    forWho: [
      "Your pain has outlasted the injury that caused it",
      "You have been avoiding driving since your accident",
      "Recovery is taking longer than you expected and it is wearing on you",
      "You are managing a claim and a return to work at the same time",
    ],
    includes: [
      "Pain psychology",
      "Cognitive behavioural strategies",
      "Stress and anxiety management",
      "Injury recovery support",
      "Mindfulness and relaxation training",
      "Behavioural change coaching",
    ],
    faqs: [
      {
        q: "Is what I say confidential?",
        a: "Yes, with the narrow legal exceptions every regulated counsellor is bound by — a risk of serious harm to you or someone else, suspected harm to a child, or a court order. Your counsellor will explain these at the first session.",
      },
      {
        q: "Will my physiotherapist see my counselling notes?",
        a: "Not unless you ask us to share them. Counselling records are held separately. If coordinated care would help, we will ask for your written consent first.",
      },
      {
        q: "Is counselling covered after a car accident?",
        a: "Psychological treatment is often fundable under an auto injury claim. Bring your claim number and adjuster details and we will tell you what applies before you commit.",
      },
    ],
    related: ["mva-recovery", "physiotherapy", "acupuncture"],
  },
  {
    slug: "medispa",
    name: "Medispa",
    summary: "Non-surgical skin and body treatments, delivered in a clinical setting.",
    seoTitle: "Medispa Treatments in Edmonton",
    seoDescription:
      "Medispa services in Edmonton delivered in a clinical setting alongside our rehabilitation practice. Consultation first, honest advice about what will and will not work.",
    intro:
      "Our medispa services sit alongside the rehabilitation practice rather than apart from it — same clinical standards, same record-keeping, same willingness to tell you when a treatment is not right for you. Every treatment begins with a consultation, and a patch test where the treatment requires one.",
    treats: [
      "Skin texture and tone concerns",
      "Post-injury and post-surgical scarring",
      "Unwanted hair",
      "Skin hydration and maintenance",
    ],
    session: [
      {
        title: "Consultation",
        body: "Skin history, current products and medications, and a frank conversation about realistic outcomes and how many sessions they take.",
      },
      {
        title: "Patch test",
        body: "Where the treatment calls for one, we test and wait rather than proceeding the same day.",
      },
      {
        title: "Treatment and aftercare",
        body: "The treatment itself, followed by written aftercare and a review appointment.",
      },
    ],
    forWho: [
      "You want clinical oversight rather than a retail counter",
      "You are managing scarring after surgery or an injury",
      "You want an honest answer about whether a treatment will help you",
    ],
    includes: [
      "Consultation and skin assessment",
      "Scar management",
      "Skin rejuvenation treatments",
      "Maintenance programmes",
    ],
    faqs: [
      {
        q: "Is medispa covered by insurance?",
        a: "Generally no — cosmetic treatments are not covered by extended health plans. Scar management following surgery or injury is sometimes an exception. We will tell you which category yours falls into before you book.",
      },
      {
        q: "Do you offer a consultation before treatment?",
        a: "Always. We do not sell treatment packages before assessing whether the treatment suits your skin and your goal.",
      },
    ],
    related: ["massage-therapy"],
  },
  {
    slug: "mva-recovery",
    name: "Motor Vehicle Accident Recovery",
    shortName: "After a car accident",
    summary: "Alberta auto injury care with the paperwork handled — usually at no cost to you.",
    seoTitle: "Physiotherapy After a Car Accident in Edmonton (MVA)",
    seoDescription:
      "Injured in a car accident in Edmonton? Alberta's Diagnostic and Treatment Protocols cover physiotherapy, massage and chiropractic. We complete the AB-1 and bill your insurer directly.",
    claimPathway: true,
    intro:
      "If you were hurt in a collision in Alberta, treatment is generally funded by the at-fault driver's insurer under the province's Diagnostic and Treatment Protocols — regardless of who caused the crash. In most cases that means you pay nothing out of pocket. The paperwork is the part people dread, so we do it for you.",
    treats: [
      "Whiplash-associated disorder",
      "Neck and back pain after a collision",
      "Headaches following a crash",
      "Shoulder and seatbelt injuries",
      "Knee and dashboard injuries",
      "Concussion symptoms",
      "Anxiety about driving",
    ],
    session: [
      {
        title: "Call us — you do not need a lawyer first",
        body: "Bring your claim number and adjuster details if you have them. If you do not have them yet, come anyway; we will help you work out what you need.",
      },
      {
        title: "We complete the AB-1",
        body: "The Notification of Loss and Proof of Claim form is what opens your treatment funding. We fill it in with you at the first appointment and submit it.",
      },
      {
        title: "Assessment and treatment inside the protocols",
        body: "Alberta's protocols fund a defined block of treatment following a collision. Your therapist works within it and tracks your progress against it.",
      },
      {
        title: "If you need more than the protocols allow",
        body: "We prepare and submit the supporting documentation to request extended treatment, rather than simply discharging you or handing you the bill.",
      },
    ],
    forWho: [
      "You were injured in a collision in Alberta, at fault or not",
      "You are sore days later and unsure whether it is worth reporting",
      "You have a claim number and no idea what to do with it",
      "Your treatment block has run out and you are still in pain",
    ],
    includes: [
      "AB-1 form completion and submission",
      "Direct billing to the auto insurer",
      "Physiotherapy under the protocols",
      "Massage therapy under the protocols",
      "Chiropractic under the protocols",
      "Psychological support for post-collision anxiety",
      "Extension requests and progress reporting",
    ],
    faqs: [
      {
        q: "Will this cost me anything?",
        a: "In most Alberta auto injury claims, treatment within the Diagnostic and Treatment Protocols is billed directly to the insurer and you pay nothing. We will confirm your specific coverage before we start treating, not after.",
      },
      {
        q: "I did not go to hospital. Can I still claim?",
        a: "Yes. Soft tissue injuries frequently do not become obvious until a day or two after the collision. What matters is that the injury is documented and the claim is opened — the sooner the better.",
      },
      {
        q: "How long do I have to start treatment?",
        a: "Alberta sets deadlines for reporting a collision and for opening a claim, and treatment funding is time-limited from the date of the accident. Do not wait to find out — call us and we will tell you where you stand.",
      },
      {
        q: "Do I need a lawyer?",
        a: "Not to start treatment. Your care under the protocols is independent of any legal claim. If you do have a lawyer, we will send them our records with your consent.",
      },
      {
        q: "I was at fault. Am I still covered?",
        a: "Yes. Section B benefits in Alberta apply regardless of fault. Being the at-fault driver does not disqualify you from treatment funding.",
      },
    ],
    related: ["physiotherapy", "massage-therapy", "clinical-counselling"],
  },
  {
    slug: "wcb-recovery",
    name: "Workplace Injury Recovery",
    shortName: "Injured at work",
    summary: "WCB-funded rehabilitation with return-to-work planning built in from day one.",
    seoTitle: "WCB Physiotherapy in Edmonton for Workplace Injuries",
    seoDescription:
      "Injured at work in Alberta? We treat WCB claims in Edmonton, report to your case manager, and build a return-to-work plan with your employer. Direct billing to WCB Alberta.",
    claimPathway: true,
    intro:
      "A workplace injury comes with a second job attached: the claim, the case manager, the modified-duties conversation with your employer. We treat the injury and take on the reporting so that side of it does not fall to you. Treatment for an accepted WCB Alberta claim is billed directly to WCB.",
    treats: [
      "Lifting and manual handling back injuries",
      "Repetitive strain and overuse injuries",
      "Shoulder injuries from overhead work",
      "Slips, trips and falls at work",
      "Crush and impact injuries",
      "Post-surgical recovery following a work injury",
    ],
    session: [
      {
        title: "Report it and get your claim number",
        body: "Tell your employer and file with WCB Alberta. Bring the claim number to your first visit — if the claim is still pending we can usually begin and bill retroactively once it is accepted.",
      },
      {
        title: "Assessment with the job in view",
        body: "We assess the injury and the physical demands of your actual role, because ready for work means something different for a scaffolder than for a driver.",
      },
      {
        title: "Treatment and conditioning",
        body: "Hands-on treatment early, then progressive work conditioning that rebuilds the specific capacities your job requires.",
      },
      {
        title: "Reporting and return to work",
        body: "We report progress to your case manager and put restrictions and modified duties in writing so your employer has something concrete to work with.",
      },
    ],
    forWho: [
      "You were hurt on the job and have an open WCB claim",
      "You are on modified duties and not progressing",
      "Your employer needs written restrictions",
      "You are anxious about going back to the task that injured you",
    ],
    includes: [
      "WCB Alberta direct billing",
      "Physiotherapy for accepted claims",
      "Work conditioning programmes",
      "Functional and job-demands assessment",
      "Progress reporting to your case manager",
      "Return-to-work and modified-duty planning",
      "Ergonomic assessment",
    ],
    faqs: [
      {
        q: "Do I pay for WCB treatment?",
        a: "No. Once your claim is accepted, treatment is billed directly to WCB Alberta. If your claim is still pending we will explain your options before treating.",
      },
      {
        q: "Do I need a referral from my employer?",
        a: "No. You need a WCB claim, not your employer's permission. Report the injury, get the claim number, and book.",
      },
      {
        q: "Will my employer see my file?",
        a: "Your employer receives functional information — what you can and cannot safely do — not your clinical records. WCB receives the clinical reporting required for the claim.",
      },
      {
        q: "My claim was denied. What now?",
        a: "You can still be treated; billing simply moves to your extended health plan or to you directly. Come in and we will walk through the options, including what a review of the decision involves.",
      },
    ],
    related: ["physiotherapy", "chiropractic", "clinical-counselling"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const claimServices = services.filter((s) => s.claimPathway);
export const careServices = services.filter((s) => !s.claimPathway);
