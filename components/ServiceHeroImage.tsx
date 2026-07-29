import Image from "next/image";
import type { Photo } from "@/content/photos";

/**
 * A framed photograph. One containment layer, hairline border, and a soft
 * paper wash behind it so the image sits on the page rather than floating.
 *
 * LCP handling: Next 16 deprecated the `priority` prop, so the hero opts in
 * with `loading="eager"` + `fetchPriority="high"` instead. Everything else
 * lazy-loads. Never lazy-load the LCP element — it doubles LCP in the field.
 *
 * Width/height are declared via `fill` + a fixed aspect-ratio wrapper so the
 * space is reserved before the image arrives (no layout shift).
 */
export function Figure({
  photo,
  ratio = "4 / 3",
  priority = false,
  sizes = "(max-width: 60rem) 100vw, 50vw",
  className,
  caption,
}: {
  photo: Photo;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}) {
  return (
    <figure className={`figure ${className ?? ""}`} style={{ aspectRatio: caption ? undefined : ratio }}>
      <div className="figure-media" style={{ aspectRatio: ratio }} data-hero-media>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          style={{ objectFit: "cover", objectPosition: photo.position ?? "center" }}
        />
      </div>
      {caption && <figcaption className="figure-caption">{caption}</figcaption>}
    </figure>
  );
}
