"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, primaryNav, booking } from "@/content/site";
import { Wordmark } from "./Wordmark";

/**
 * N12 · Announcement banner + retracting nav.
 * The banner carries genuinely useful standing information (direct billing,
 * claim types, hours) rather than a promo — for this audience that IS the promo.
 * It retracts on scroll-down and returns on scroll-up; the nav bar stays.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [bannerHidden, setBannerHidden] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY.current) > 6) {
          setBannerHidden(y > lastY.current && y > 80);
          lastY.current = y;
        }
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the mobile sheet on navigation — adjusted during render rather than
  // in an effect, which is React's sanctioned pattern for "reset state when a
  // prop changes" and avoids the extra commit an effect would cause.
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="site-header">
      {!bannerDismissed && (
        <div className="banner" data-hidden={bannerHidden}>
          <div className="shell banner-inner">
            <p className="banner-text">
              <strong>Direct billing to most insurers.</strong> MVA and WCB claims accepted.
              Open Mon–Sat, 9am–8pm.
            </p>
            <button
              type="button"
              className="banner-dismiss"
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss announcement"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="navbar">
        <div className="shell navbar-inner">
          <Link href="/" className="brand" aria-label={`${site.name} — home`}>
            <Wordmark />
            <span className="brand-text">
              <span className="brand-name">Bethesda</span>
              <span className="brand-sub">Health &amp; Wellness</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {primaryNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link"
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <a href={site.phoneHref} className="nav-call">
              <span aria-hidden="true">☏</span>
              <span className="nav-call-num">{site.phone}</span>
            </a>
            <a
              href={booking.base}
              className="btn btn-primary nav-book"
              target="_blank"
              rel="noopener"
            >
              Book now
            </a>
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <div id="mobile-nav" className="mobile-nav" data-open={menuOpen} hidden={!menuOpen}>
          <div className="shell">
            {primaryNav.map((l) => (
              <Link key={l.href} href={l.href} className="mobile-nav-link">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="mobile-nav-link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
