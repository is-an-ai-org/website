/**
 * Outer drafting border (double-line) + L-shaped corner ticks.
 * Place inside a `position: relative` parent.
 */
export const BPFrame = () => (
  <>
    <div className="bp-frame" aria-hidden />
    <div className="bp-corner tl" aria-hidden />
    <div className="bp-corner tr" aria-hidden />
    <div className="bp-corner bl" aria-hidden />
    <div className="bp-corner br" aria-hidden />
  </>
);
