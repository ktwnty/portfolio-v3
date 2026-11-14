import { useRef, type HTMLAttributes, type KeyboardEvent, type PointerEvent } from "react";
import gsap from "gsap";

export type BentoCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Makes the card keyboard-focusable and exposes it as a button. */
  interactive?: boolean;
  /** Radius (px) of the cursor-tracking spotlight. */
  spotlightSize?: number;
};

/**
 * Sharp-edged bento cell with a GSAP-driven spotlight that tracks the pointer.
 * Two layers follow the cursor: a soft glow and a brighter 1px border highlight.
 */
export default function BentoCard({
  children,
  className = "",
  interactive = false,
  spotlightSize = 320,
  onClick,
  onKeyDown,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: BentoCardProps) {
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  const writePos = () => {
    const el = layer.current;
    if (!el) return;
    el.style.setProperty("--mx", `${pos.current.x}px`);
    el.style.setProperty("--my", `${pos.current.y}px`);
  };

  const local = (e: PointerEvent<HTMLDivElement>) => {
    const r = root.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const handleEnter = (e: PointerEvent<HTMLDivElement>) => {
    pos.current = local(e); // jump to the pointer so the glow never sweeps in from a corner
    writePos();
    gsap.to(layer.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    onPointerEnter?.(e);
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const { x, y } = local(e);
    gsap.to(pos.current, {
      x,
      y,
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
      onUpdate: writePos,
    });
    onPointerMove?.(e);
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    gsap.to(layer.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
    onPointerLeave?.(e);
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      e.currentTarget.click();
    }
    onKeyDown?.(e);
  };

  const mask = `radial-gradient(${spotlightSize * 0.7}px circle at var(--mx, 50%) var(--my, 50%), #000, transparent)`;

  return (
    <div
      ref={root}
      className={`relative overflow-hidden bg-panel ${interactive ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      onKeyDown={handleKey}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...(interactive ? { role: "button", tabIndex: 0 } : {})}
      {...rest}
    >
      <div ref={layer} aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(${spotlightSize}px circle at var(--mx, 50%) var(--my, 50%), rgba(165,180,252,0.14), transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            border: "1px solid rgba(165,180,252,0.9)",
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
