import { Check } from "lucide-react";

/**
 * Benefit checklist.
 *
 * A tick per line reads faster than a paragraph and faster than bullets — the
 * eye lands on the mark, not the text. Every item here is a verifiable fact
 * about access; none of it is a claim about outcomes, because we have no
 * outcome data to stand behind.
 */
export function Checklist({
  items,
  title,
  lede,
}: {
  items: string[];
  title?: string;
  lede?: string;
}) {
  return (
    <div>
      {title && (
        <h2 style={{ fontSize: "var(--text-3xl)", marginTop: 0 }}>{title}</h2>
      )}
      {lede && <p className="lede">{lede}</p>}
      <ul className="checklist">
        {items.map((i) => (
          <li key={i}>
            <Check className="check-icon" strokeWidth={2.5} aria-hidden="true" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
