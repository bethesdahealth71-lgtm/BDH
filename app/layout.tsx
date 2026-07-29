import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCTA } from "@/components/StickyCTA";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

/* 2 + 1 type system: roman serif display, humanist sans body, mono for data.
   Deliberately not Inter / Geist — a one-font page is a template page. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Physiotherapy & Rehabilitation in Edmonton | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: `Physiotherapy & Rehabilitation in Edmonton | ${site.name}`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#f5f2e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${karla.variable} ${plexMono.variable}`}
    >
      <body>
        <JsonLd data={organizationSchema()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="page-bottom-pad">
          {children}
        </main>
        <SiteFooter />
        <StickyCTA />
      </body>
    </html>
  );
}
