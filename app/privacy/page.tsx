import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Privacy & Your Health Information",
  description:
    "How Bethesda Health & Wellness collects, uses and protects your personal and health information under Alberta's Health Information Act and PIPEDA.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="shell-tight band">
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
      />

      <h1 style={{ fontSize: "var(--text-display-s)", margin: 0 }}>
        Privacy &amp; your health information
      </h1>

      <div className="prose-block" style={{ marginTop: "var(--space-xl)" }}>
        <p className="lede">
          This page explains what we collect, why, who sees it, and how to get a copy or complain.
          It covers this website and the clinic.
        </p>

        <div className="notice" data-tone="accent">
          <p className="notice-title">This is a template, not legal advice</p>
          <p style={{ margin: 0 }}>
            It is written to reflect Alberta&rsquo;s <em>Health Information Act</em> and PIPEDA,
            but it must be reviewed by the clinic&rsquo;s privacy officer and, ideally, a lawyer
            before launch. The custodian name and complaint contact below are placeholders.
          </p>
        </div>

        <h2>What this website collects</h2>
        <p>
          This site does not use advertising trackers, third-party marketing pixels, or
          cross-site cookies. Specifically:
        </p>
        <ul>
          <li>
            <strong>The symptom picker on the home page</strong> stores your selection in your
            browser&rsquo;s memory only. It is not transmitted anywhere, not written to the URL,
            and not recorded in analytics. Closing the tab erases it.
          </li>
          <li>
            <strong>The contact form</strong> collects your name, email and message so we can
            reply. It explicitly asks you not to send health information, because email is not a
            secure channel.
          </li>
          <li>
            <strong>The booking calendar</strong> is provided by Jane (Jane Software Inc.), a
            Canadian practice management system. When you book, your information goes to Jane
            under their privacy policy and is held in Canada.
          </li>
          <li>
            <strong>Maps</strong> are embedded from Google Maps and load when you scroll to them.
            Google may set cookies when a map loads.
          </li>
        </ul>

        <h2>What the clinic collects</h2>
        <p>
          To treat you we collect your contact details, health history, the results of assessments,
          treatment notes, and billing and insurance information. This is your health record and
          we are its custodian under the <em>Health Information Act</em>.
        </p>

        <h2>Who we share it with, and when</h2>
        <ul>
          <li>
            <strong>Your insurer</strong> — the minimum needed to process a claim you have asked
            us to submit.
          </li>
          <li>
            <strong>WCB Alberta</strong> — clinical reporting required for an accepted claim. Your
            employer receives functional information (what you can safely do), not your clinical
            record.
          </li>
          <li>
            <strong>An auto insurer</strong> — the treatment and reporting required under Alberta&rsquo;s
            Diagnostic and Treatment Protocols.
          </li>
          <li>
            <strong>Other practitioners in this clinic</strong> — where they are involved in your
            care. Counselling records are held separately and are not shared with your
            physiotherapist without your written consent.
          </li>
          <li>
            <strong>Your lawyer or another clinic</strong> — only with your written authorisation.
          </li>
        </ul>
        <p>
          We do not sell your information. We do not use it for marketing without your express
          consent, and you can withdraw that consent at any time.
        </p>

        <h2>Your rights</h2>
        <ul>
          <li>You can ask to see your record and receive a copy.</li>
          <li>You can ask us to correct something that is wrong.</li>
          <li>You can ask who we have disclosed it to.</li>
          <li>
            You can complain to us, and if you are not satisfied, to the Office of the Information
            and Privacy Commissioner of Alberta.
          </li>
        </ul>

        <h2>How long we keep it</h2>
        <p>
          Health records are retained for the period required by the practitioner&rsquo;s Alberta
          college — generally ten years after the last visit, or ten years after a patient who was
          a minor reaches the age of majority, whichever is longer.
        </p>

        <h2>Security</h2>
        <p>
          Records are held in Jane, which encrypts data in transit and at rest and stores it in
          Canada. Access is limited to staff who need it for your care or your billing, and access
          is logged. Paper records, where they exist, are stored locked.
        </p>

        <h2>Contact</h2>
        <p>
          To make a request, ask a question, or complain, contact the clinic&rsquo;s privacy
          officer:
        </p>
        <p>
          <a href={`mailto:${site.email}`} className="inline-link">
            {site.email}
          </a>
          <br />
          <a href={site.phoneHref} className="inline-link">
            {site.phone}
          </a>
        </p>
        <p className="field-note">
          {/* TODO(deploy): name the designated privacy officer and add the OIPC
              Alberta contact details before publishing. */}
          The designated privacy officer&rsquo;s name will be published here before launch.
        </p>

        <p style={{ marginTop: "var(--space-2xl)" }}>
          <Link href="/contact" className="tlink">
            Contact the clinic <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
