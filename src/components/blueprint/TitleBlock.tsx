interface TitleBlockProps {
  project?: string;
  sheet?: string;
  title?: string;
  scale?: string;
  drawnBy?: string;
  date?: string;
  className?: string;
}

/**
 * Architectural title block (cartouche). Defaults to absolute bottom-right
 * via `.bp-titleblock` CSS; pass className to override.
 */
export const TitleBlock = ({
  project = "is-an.ai",
  sheet = "A-103",
  title = "DIY ASSEMBLY · v3",
  scale = "N.T.S.",
  drawnBy = "is-an.ai team",
  date = "2026.05",
  className = "",
}: TitleBlockProps) => (
  <div className={`bp-titleblock ${className}`} aria-hidden>
    <div className="span2">
      <div className="label">PROJECT</div>
      <div className="val">{project}</div>
    </div>
    <div>
      <div className="label">SHEET</div>
      <div className="val">{sheet}</div>
    </div>
    <div>
      <div className="label">SCALE</div>
      <div className="val">{scale}</div>
    </div>
    <div className="span2">
      <div className="label">TITLE</div>
      <div className="val">{title}</div>
    </div>
    <div>
      <div className="label">DRAWN</div>
      <div className="val">{drawnBy}</div>
    </div>
    <div>
      <div className="label">DATE</div>
      <div className="val">{date}</div>
    </div>
  </div>
);
