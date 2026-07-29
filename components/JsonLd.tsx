/**
 * JSON-LD is injected as a plain <script type="application/ld+json">.
 * The payload is our own typed data, never user input — but we still escape `<`
 * so a stray sequence in copy can't break out of the script element.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
