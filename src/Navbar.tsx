import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import gsap from "gsap";
import { Menu, Radio, X } from "lucide-react";
import { prefersReducedMotion, scrollToTarget, useBatamClock } from "./shared";
import { NAV_LINKS, PROFILE } from "./data";

/** Floating glass capsule. Links lean toward the cursor and swell as it approaches. */
export default function Navbar() {
  const time = useBatamClock();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const centers = useRef<{ x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(dock.current, { yPercent: -180, opacity: 0, duration: 1.1, ease: "power4.out", delay: 0.1 });
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
      );
    });
    return () => mm.revert();
  }, []);

  // measure link centres once per hover so transforms never feed back into the maths
  const measure = () => {
    centers.current = links.current.map((a) => {
      if (!a) return { x: 0, y: 0 };
      const r = a.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    links.current.forEach((a, i) => {
      const c = centers.current[i];
      if (!a || !c) return;
      const dx = e.clientX - c.x;
      const dy = e.clientY - c.y;
      const p = Math.max(0, 1 - Math.hypot(dx, dy) / 110); // 0 far, 1 on top
      gsap.to(a, { x: dx * 0.35 * p, y: dy * 0.5 * p, scale: 1 + p * 0.2, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    });
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(dock.current, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.02,
      y: (e.clientY - (r.top + r.height / 2)) * 0.06,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(links.current.filter(Boolean), { x: 0, y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    gsap.to(dock.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  };

  const go = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <header ref={wrap} className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center px-3 md:top-5">
      <div
        ref={dock}
        onPointerEnter={measure}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="glass pointer-events-auto relative flex h-14 w-full max-w-[1100px] items-center justify-between gap-3 overflow-hidden rounded-full border border-white/15 pl-3 pr-2 shadow-[0_0_60px_-15px_rgba(129,140,248,0.55)] md:pl-4"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("#home");
          }}
          aria-label="Back to top"
          className="flex h-9 min-w-9 items-center justify-center rounded-full border border-accent px-2 font-serif text-lg leading-none text-accent"
        >
          {PROFILE.initials}
          <sup className="ml-px text-[0.4em] leading-none">®</sup>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 text-sm text-mute md:flex">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              ref={(el) => {
                links.current[i] = el;
              }}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              className="inline-block rounded-full px-3.5 py-2 transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 border-l border-line pl-3 font-mono text-[11px] text-mute xl:flex">
            <span className="tabular-nums"></span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs tabular-nums">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {time}
            <span className="hidden text-mute sm:inline">WIB</span>
          </div>
          <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase text-accent lg:inline-flex">
            <Radio size={13} className="animate-pulse" />
          </span>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <div ref={bar} className="absolute inset-x-6 bottom-0 h-px origin-left bg-accent-deep" style={{ transform: "scaleX(0)" }} />
      </div>

      {open && (
        <div className="glass pointer-events-auto mt-2 w-full max-w-[1100px] border border-white/15 px-4 pb-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              className="block border-b border-line py-4 font-serif text-3xl"
            >
              {l.label}
            </a>
          ))}
          <p className="mt-4 font-mono text-[11px] text-mute"></p>
        </div>
      )}
    </header>
  );
}