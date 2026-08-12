/*
 * Signature element: the berber art-deco pattern from the Vitasilk label,
 * redrawn as SVG. Used as section dividers and as the frame of the offer and
 * order cards so the page carries the bottle's own visual language.
 *
 * Every section on this theme is dark, so there is no tone switch. The light
 * sibling project needed one to pick a gold that stayed legible per section;
 * here pale gold works everywhere. Purely decorative — all of it is aria-hidden.
 */

export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-light/60" />
      <svg width="120" height="18" viewBox="0 0 120 18" fill="none" className="text-gold-light">
        {/* central diamond motif */}
        <path d="M60 1 L68 9 L60 17 L52 9 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M60 5 L64 9 L60 13 L56 9 Z" fill="currentColor" opacity="0.7" />
        {/* stepped side chevrons, echoing the label border */}
        <path d="M40 9 H48 M44 5 V13" stroke="currentColor" strokeWidth="1" opacity="0.65" />
        <path d="M72 9 H80 M76 5 V13" stroke="currentColor" strokeWidth="1" opacity="0.65" />
        <path d="M28 6 v6 M32 4 v10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M88 4 v10 M92 6 v6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="9" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="104" cy="9" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-light/60" />
    </div>
  );
}

/** Corner-ornamented frame, like the label's rectangle. Wraps its children. */
export function OrnamentFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const corner = (pos: string, rotate: string) => (
    <svg
      aria-hidden
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      className={`absolute ${pos} text-gold-light`}
      style={{ transform: rotate }}
    >
      <path d="M2 40 V10 Q2 2 10 2 H40" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 40 V14 Q8 8 14 8 H40" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <path d="M14 14 L20 8 L26 14 L20 20 Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
  return (
    <div className={`relative ${className}`}>
      {corner("top-0 left-0", "rotate(0deg)")}
      {corner("top-0 right-0", "rotate(90deg)")}
      {corner("bottom-0 right-0", "rotate(180deg)")}
      {corner("bottom-0 left-0", "rotate(270deg)")}
      {children}
    </div>
  );
}
