import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function scrollToTarget(target: string | number) {
  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : 1.2,
    ease: "power3.inOut",
    scrollTo: { y: target, offsetY: 64 },
  });
}

export function useBatamClock(): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta", // WIB, UTC+7, same as Batam
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

/** Staggered word reveals and fade-ups for any element marked data-words / data-reveal. */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const q = gsap.utils.selector(root);
        const items = q("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 40 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }),
        });
        // cinematic scroll physics: blocks tilt, scale and slide into place as they enter
        q("[data-physics]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { scale: 0.92, rotate: i % 2 ? 1.4 : -1.4, y: 80, transformOrigin: "50% 0%" },
            {
              scale: 1,
              rotate: 0,
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 40%", scrub: 0.6 },
            }
          );
        });
        q("[data-words]").forEach((heading) => {
          gsap.from(heading.querySelectorAll("[data-word]"), {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
        });
      },
      root
    );
    return () => mm.revert();
  }, [scope]);
}

export function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className={`inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom ${className}`}>
          <span data-word className="inline-block will-change-transform">
            {word}
          </span>
          {"\u00A0"}
        </span>
      ))}
    </>
  );
}

/** Character-level split for kinetic headlines (each char is a [data-char] mask target). */
export function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className={`inline-block whitespace-nowrap ${className}`}>
          {word.split("").map((ch, j) => (
            <span key={j} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <span data-char className="inline-block will-change-transform">
                {ch}
              </span>
            </span>
          ))}
          {"\u00A0"}
        </span>
      ))}
    </>
  );
}

/** Button that leans toward the cursor and springs back. */
export function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "solid",
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (e: PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const leave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });

  const look =
    variant === "solid"
      ? "bg-accent text-carbon hover:bg-carbon hover:text-accent border border-accent"
      : "border border-white/40 text-white hover:border-accent hover:bg-accent hover:text-carbon";

  return (
    <button
      ref={ref}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition-colors duration-300 ${look} ${className}`}
    >
      {children}
    </button>
  );
}

