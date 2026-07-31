import Link from "next/link";
import {
  Activity,
  Hand,
  Bone,
  Sparkles,
  Brain,
  Flower2,
  Car,
  HardHat,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";

/**
 * Slug → icon. Kept in the component, not in content/services.ts, so the
 * content layer stays presentation-free and a CMS swap doesn't have to carry
 * icon names.
 */
const ICONS: Record<string, LucideIcon> = {
  physiotherapy: Activity,
  "massage-therapy": Hand,
  chiropractic: Bone,
  acupuncture: Sparkles,
  "clinical-counselling": Brain,
  medispa: Flower2,
  "mva-recovery": Car,
  "wcb-recovery": HardHat,
};

/**
 * Service tiles.
 *
 * Replaces the hairline text rows. A grid of labelled icon tiles is scannable
 * in one sweep — you find "massage" by shape and position rather than by
 * reading six summary sentences. Claim pathways keep the clay register so they
 * stay visually distinct from ordinary treatments.
 */
export function ServiceTiles({ services }: { services: Service[] }) {
  return (
    <ul className="tile-grid">
      {services.map((s) => {
        const Icon = ICONS[s.slug] ?? Activity;
        return (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="tile"
              data-claim={s.claimPathway ? "true" : undefined}
            >
              <span className="tile-icon">
                <Icon strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="tile-name">{s.shortName ?? s.name}</span>
              <span className="tile-summary">{s.summary}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
