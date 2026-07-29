"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, primaryNav, booking } from "@/content/site";
import { Wordmark } from "./Wordmark";

/**
 * Nav — announcement banner + sticky bar that floats on scroll.
 *
 * ── Why the banner sits OUTSIDE the sticky header ────────────────────────────
 * It used to live inside it and collapse via a max-height transition driven by
 * a scroll listener. `position: sticky` keeps an element in normal flow, so
 * shrinking the header by 60px yanked the whole page up by 60px mid-scroll —
 * and the resulting scroll-position change re-fired the handler. That was the
 * jitter.
 *
 * Now the banner is a plain block above the sticky header. It scrolls out of
 * view on its own, the bar pins to the top, and the header's height never
 * changes. No scroll listener, no layout shift, nothing to glitch.
 *
 * ── Float-on-scroll ──────────────────────────────────────────────────────────
 * A 1px sentinel sits above the header; an IntersectionObserver flips
 * `data-floating` when it leaves the viewport. That fires twice per page (in
 * and out) instead of on every scroll frame, so there is no scroll handler and
 * no layout thrash. The floating state only changes paint properties —
 * background, radius, shadow, inset — never the header's height.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting), {
      rootMargin: "0px",
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close the mobile sheet on navigation — adjusted during render, which is
  // React's sanctioned "reset state when a prop changes" pattern.
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {!bannerDismissed && (
        <div className="banner">
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

      {/* Trip-wire for the floating state. Zero height, no visual effect. */}
      <div ref={sentinel} aria-hidden="true" className="nav-sentinel" />

      <header className="site-header" data-floating={floating}>
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
    </>
  );
}
