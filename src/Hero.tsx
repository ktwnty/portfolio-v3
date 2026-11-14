import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { MapPin } from "lucide-react";
import { SplitChars } from "./shared";
import { BADGES } from "./data";

const HERO_METRICS: { value: string; count?: number; label: string }[] = [
  { value: "6+", count: 6, label: "Production systems shipped" },
  { value: "03", count: 3, label: "Disciplines: code, design, motion" },
  { value: "60", count: 60, label: "fps motion budget" },
  { value: "+7", label: "Available in WIB timezone" },
];

const CARD = "glass cursor-grab border border-line p-4 font-mono text-xs active:cursor-grabbing md:absolute md:w-64";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const q = gsap.utils.selector(scope);

        const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
        tl.from(q("[data-hero-meta]"), { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 })
          .from(q("[data-char]"), { yPercent: 120, rotate: 8, duration: 1.1, stagger: { each: 0.018, from: "start" } }, "-=0.5")
          .from(q("[data-hero-float]"), { opacity: 0, scale: 0.8, y: 40, duration: 1, stagger: 0.15, ease: "back.out(1.6)" }, "-=0.8")
          .from(q("[data-hero-cell]"), { opacity: 0, y: 30, duration: 0.9, stagger: 0.08 }, "-=0.7");

        q("[data-count]").forEach((node) => {
          const el = node as HTMLElement;
          const counter = { v: 0 };
          tl.to(
            counter,
            {
              v: Number(el.dataset.count),
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.v)).padStart(2, "0");
              },
            },
            "<"
          );
        });

        // telemetry capsules bob gently; the inner wrapper floats so Draggable owns the outer transform
        q("[data-float-inner]").forEach((el, i) => {
          gsap.to(el, { y: i % 2 ? -10 : 10, duration: 2.4 + i * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
        if (desktop) {
          Draggable.create(q("[data-hero-float]"), { type: "x,y", inertia: true, bounds: scope });
        }

        // kinetic headline: lines drift in opposite directions while scrolling away
        const scrub = { trigger: scope, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q("[data-kinetic='l']"), { xPercent: -6, ease: "none", scrollTrigger: scrub });
        gsap.to(q("[data-kinetic='r']"), { xPercent: 6, ease: "none", scrollTrigger: scrub });
      },
      scope
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-[38%] h-px w-[150%] origin-left rotate-[-12deg] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-accent-deep/20 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-4 text-sm md:flex-row md:items-center">
          <span data-hero-meta className="inline-flex w-fit items-center gap-2.5 border border-line px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 bg-accent" />
            </span>
            Open for projects and collaborations
          </span>

          <span data-hero-meta className="inline-flex items-center gap-2 font-mono text-xs text-mute">
            <MapPin size={14} className="text-accent" />
            Tanjungpinang, IDN
          </span>
        </div>

        <div className="relative mt-10 md:mt-16">
          <h1
            aria-label="Crafting digital interfaces where engineering meets visual poetry."
            className="font-serif text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.92] tracking-tight"
          >
            <div data-kinetic="l" aria-hidden>
              <SplitChars text="Crafting digital interfaces" />
            </div>
            <div data-kinetic="r" aria-hidden className="text-accent/60">
              <SplitChars text="where engineering meets" />
            </div>
            <div data-kinetic="l" aria-hidden className="italic">
              <SplitChars text="visual poetry." />
            </div>
          </h1>

          <p data-hero-meta className="mt-10 max-w-xl text-base leading-relaxed text-mute md:mt-14 md:text-lg">
            I'm a front-end developer and Figma designer based in Tanjungpinang. I build production interfaces that are fast, accessible, and typeset like a magazine.
          </p>

          {/* floating telemetry capsules: draggable with inertia on desktop, stacked on mobile */}
          <div data-hero-float className={`${CARD} md:bottom-0 md:right-0`}>
            <div data-float-inner className="flex items-center gap-3">
              <span className="relative inline-block h-10 w-10 shrink-0 rounded-full border border-accent/50">
                <span
                  className="absolute inset-0 animate-spin rounded-full"
                  style={{ background: "conic-gradient(from 0deg, rgba(165,180,252,0.7), transparent 30%)", animationDuration: "3s" }}
                />
              </span>
              <div>
                <div className="text-mute">RADAR</div>
                <p className="mt-1 font-sans text-sm text-white">Building interfaces</p>
              </div>
            </div>
          </div>
        </div>

        <div data-hero-meta className="ticker mt-12 overflow-hidden border-y border-line py-3 font-mono text-xs text-mute md:mt-16" aria-hidden>
          <div className="ticker-track gap-3">
            {[...BADGES, ...BADGES].map((b, i) => (
              <span key={i} className="shrink-0 border border-line px-3 py-1">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {HERO_METRICS.map((m) => (
            <div key={m.label} data-hero-cell className="bg-carbon p-5 md:p-7">
              <p
                className="font-serif text-5xl tabular-nums md:text-6xl"
                {...(m.count !== undefined ? { "data-count": m.count } : {})}
              >
                {m.value}
              </p>
              <p className="mt-3 text-sm text-mute">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}