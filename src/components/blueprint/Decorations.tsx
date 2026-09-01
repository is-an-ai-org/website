import { ReactNode } from "react";

/**
 * Yellow sticky note. Pass `rotate` to tilt it slightly for a hand-placed feel.
 */
export const BPSticky = ({
  children,
  rotate = -2,
  width = 170,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  width?: number;
  className?: string;
}) => (
  <div
    className={`bp-sticky ${className}`}
    style={{ width, transform: `rotate(${rotate}deg)` }}
  >
    {children}
  </div>
);

/**
 * Round green SSL"CERTIFIED" stamp.
 */
export const BPSSLStamp = ({ size = 130 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 130 130"
    style={{ overflow: "visible" }}
    aria-hidden
  >
    <circle
      cx="65"
      cy="65"
      r="58"
      fill="rgba(47,140,77,0.06)"
      stroke="var(--bp-accent-2)"
      strokeWidth="2.5"
      transform="rotate(-8 65 65)"
    />
    <circle
      cx="65"
      cy="65"
      r="50"
      fill="none"
      stroke="var(--bp-accent-2)"
      strokeWidth="1"
      strokeDasharray="3 2"
      transform="rotate(-8 65 65)"
    />
    <g transform="rotate(-8 65 65)">
      <text
        x="65"
        y="48"
        textAnchor="middle"
        fontFamily="Special Elite, monospace"
        fontSize="11"
        fill="var(--bp-accent-2)"
        letterSpacing="0.15em"
      >
        CERTIFIED
      </text>
      <text
        x="65"
        y="76"
        textAnchor="middle"
        fontFamily="Architects Daughter, cursive"
        fontSize="28"
        fill="var(--bp-accent-2)"
        fontWeight="700"
      >
        SSL
      </text>
      <text
        x="65"
        y="96"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="var(--bp-accent-2)"
        letterSpacing="0.1em"
      >
        FREE · AUTO
      </text>
    </g>
  </svg>
);

/**
 * CDN globe with latitude/longitude lines and four node dots.
 */
export const BPGlobe = ({ size = 100 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
    <circle
      cx="50"
      cy="50"
      r="44"
      fill="rgba(255,255,255,0.6)"
      stroke="var(--bp-ink)"
      strokeWidth="1.5"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="44"
      ry="18"
      fill="none"
      stroke="var(--bp-ink-soft)"
      strokeWidth="1"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="18"
      ry="44"
      fill="none"
      stroke="var(--bp-ink-soft)"
      strokeWidth="1"
    />
    <line
      x1="6"
      y1="50"
      x2="94"
      y2="50"
      stroke="var(--bp-ink-soft)"
      strokeWidth="1"
    />
    <line
      x1="50"
      y1="6"
      x2="50"
      y2="94"
      stroke="var(--bp-ink-soft)"
      strokeWidth="1"
    />
    {[
      [20, 30],
      [75, 28],
      [35, 72],
      [80, 68],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--bp-accent)" />
    ))}
  </svg>
);

/**
 * Coffee ring stain (decorative paper aging).
 */
export const BPCoffeeRing = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden>
    <circle
      cx="40"
      cy="40"
      r="34"
      fill="none"
      stroke="rgba(120,80,30,0.28)"
      strokeWidth="3"
    />
    <circle
      cx="40"
      cy="40"
      r="38"
      fill="none"
      stroke="rgba(120,80,30,0.15)"
      strokeWidth="1"
    />
    <text
      x="40"
      y="44"
      textAnchor="middle"
      fontFamily="Caveat, cursive"
      fontSize="13"
      fill="rgba(120,80,30,0.4)"
      fontWeight="600"
    >
      ring
    </text>
  </svg>
);
