import { ReactNode } from "react";

type Tone = "ink" | "accent" | "accent2";

interface BlueprintCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Outer + inner border color. Defaults to ink (blueprint blue).
   * Use `accent` (red) for destructive / error contexts, `accent2` (green) for success.
   */
  tone?: Tone;
  /** Skip the inner double-border line. */
  noInnerBorder?: boolean;
  /** Skip the four corner snap dots. */
  noSnapCorners?: boolean;
  /** Background utility class (default: `bg-white/80`). Pass empty string for transparent. */
  bg?: string;
}

const toneBorder: Record<Tone, string> = {
  ink: "border-bp-ink",
  accent: "border-bp-accent",
  accent2: "border-bp-accent2",
};

/**
 * Standard blueprint surface: 2px outer border + 1.5px inner border + 4 corner snap dots.
 * Use this anywhere a card-like blueprint surface is needed (form cards, feature panels,
 * dashboard sections, blog entries). Override `tone` for accent variants.
 */
export const BlueprintCard = ({
  children,
  className = "",
  tone = "ink",
  noInnerBorder = false,
  noSnapCorners = false,
  bg = "bg-white/80",
}: BlueprintCardProps) => {
  const border = toneBorder[tone];
  return (
    <div className={`relative border-2 ${border} ${bg} ${className}`.trim()}>
      {!noInnerBorder && (
        <div
          className={`pointer-events-none absolute border-[1.5px] ${border}`}
          style={{ inset: 5 }}
          aria-hidden
        />
      )}
      {!noSnapCorners && (
        <>
          <span
            className="snap-corner"
            style={{ top: -5, left: -5 }}
            aria-hidden
          />
          <span
            className="snap-corner"
            style={{ top: -5, right: -5 }}
            aria-hidden
          />
          <span
            className="snap-corner"
            style={{ bottom: -5, left: -5 }}
            aria-hidden
          />
          <span
            className="snap-corner"
            style={{ bottom: -5, right: -5 }}
            aria-hidden
          />
        </>
      )}
      <div className="relative">{children}</div>
    </div>
  );
};
