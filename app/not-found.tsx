import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <div className="shell-tight band-loose">
      <p className="meta">404</p>
      <h1 style={{ fontSize: "var(--text-display-s)", marginTop: "var(--space-sm)" }}>
        That page isn&rsquo;t here.
      </h1>
      <p className="lede" style={{ marginTop: "var(--space-md)" }}>
        The link may be old, or we may have moved it. If you were trying to book or find out
        whether we can help, these are the quickest routes.
      </p>

      <div className="triage-actions" style={{ marginTop: "var(--space-xl)" }}>
        <Link href="/book" className="btn btn-primary">
          Book online
        </Link>
        <a href={site.phoneHref} className="btn btn-chip">
          Call {site.phone}
        </a>
        <Link href="/services" className="btn btn-chip">
          All services
        </Link>
      </div>
    </div>
  );
}
