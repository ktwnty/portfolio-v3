import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./shared";
import { STACK, STACK_B } from "./data";

type BandProps = { items: string[]; reverse?: boolean; solid?: boolean; className: string; duration: number };

/** One angled ticker band: scroll velocity boosts it, hover pauses it, each word glitches on hover. */
function Band({ items, reverse = false, solid = false, className, duration }: BandProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 }
    );
    const state = { boost: 1, hover: 1 };
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        state.boost = Math.max(state.boost, 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6));
      },
    });
    const tick = () => {
      state.boost += (1 - state.boost) * 0.05;
      tween.timeScale(state.boost * state.hover);
    };
    gsap.ticker.add(tick);

    const wrapEl = wrap.current!;
    const enter = () => gsap.to(state, { hover: 0, duration: 0.6, ease: "power2.out", overwrite: true });
    const leave = () => gsap.to(state, { hover: 1, duration: 0.8, ease: "power2.inOut", overwrite: true });
    wrapEl.addEventListener("pointerenter", enter);
    wrapEl.addEventListener("pointerleave", leave);

    return () => {
      wrapEl.removeEventListener("pointerenter", enter);
      wrapEl.removeEventListener("pointerleave", leave);
      gsap.ticker.remove(tick);
      trigger.kill();
      tween.kill();
    };
  }, [reverse, duration]);

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <span
            data-text={item}
            className={`glitch px-6 leading-none md:px-10 ${
              solid
                ? "font-sans text-4xl font-semibold uppercase tracking-tight text-carbon md:text-6xl"
                : "text-outline font-serif text-5xl italic md:text-7xl"
            }`}
          >
            {item}
          </span>
          <span className={`font-mono text-xl ${solid ? "text-carbon/60" : "text-accent-deep/60"}`}>✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`absolute w-[110%] -left-[5%] ${className}`}>
      <div ref={wrap} className={`overflow-hidden py-4 md:py-5 ${solid ? "bg-accent" : "border-y border-line bg-carbon/80"}`}>
        <div ref={track} className="flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technology stack" className="relative h-[17rem] overflow-hidden md:h-[27rem]">
      <Band items={STACK_B} reverse className="top-[48%] rotate-[2.5deg]" duration={45} />
      <Band items={STACK} solid className="top-[22%] -rotate-[2.5deg]" duration={38} />
    </section>
  );
}
