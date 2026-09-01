/**
 * Dashed red arrows + script callouts pointing inward at the centered hero form.
 * Designed for a 1280×900 viewBox; render at full container size with
 * preserveAspectRatio="none" so it scales with the hero canvas.
 *
 * Hidden via `hidden lg:block` in the parent — decorative only on desktop.
 */
export const HeroArrows = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full"
    viewBox="0 0 1280 900"
    preserveAspectRatio="none"
    style={{ overflow: "visible", zIndex: 1 }}
    aria-hidden
  >
    {/* sticky note → form */}
    <path
      d="M 245 230 Q 320 320 410 380"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 3"
    />
    <path
      d="M 405 376 L 414 382 L 408 391"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
    />

    {/* SSL stamp → form */}
    <path
      d="M 1010 230 Q 950 320 880 380"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 3"
    />
    <path
      d="M 884 378 L 875 384 L 880 392"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
    />

    {/* CDN → form */}
    <path
      d="M 1080 660 Q 980 600 880 540"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 3"
    />
    <path
      d="M 884 542 L 877 543 L 877 552"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
    />

    {/*"click here!" callout */}
    <path
      d="M 980 470 Q 920 460 870 470"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 3"
    />
    <path
      d="M 875 466 L 866 471 L 870 480"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
    />
    <text
      x="990"
      y="465"
      fontFamily="Caveat, cursive"
      fontSize="22"
      fill="var(--bp-accent)"
      fontWeight="600"
    >
      click here!
    </text>

    {/*"type a name →" callout */}
    <text
      x="190"
      y="450"
      fontFamily="Caveat, cursive"
      fontSize="22"
      fill="var(--bp-accent)"
      fontWeight="600"
    >
      type a name →
    </text>
    <path
      d="M 360 444 Q 390 444 420 446"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 3"
    />
    <path
      d="M 416 442 L 425 446 L 420 454"
      stroke="var(--bp-accent)"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
