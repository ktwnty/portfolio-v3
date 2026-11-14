
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GraduationCap } from "lucide-react";
import BentoCard from "./BentoCard";
import { SplitWords, useScrollReveal } from "./shared";
import { DEFAULT_PORTRAITS, PROFILE } from "./data";

const TRAITS: { label: string; note: string }[] = [
  { label: "Design systems", note: "Tokens first, so one change ripples through every screen." },
  { label: "Interactive UI", note: "Interfaces that respond to the hand, not just the click." },
  { label: "Accessibility", note: "Keyboard, contrast and reduced motion are in the first draft." },
  { label: "Motion design", note: "Easing and timing that explain what changed." },
  { label: "Dashboards", note: "Dense data made legible at a glance." },
  { label: "Performance", note: "Budgets set before the first component is written." },
  { label: "Figma prototyping", note: "Clickable flows that settle arguments early." },
  { label: "Supabase backends", note: "Row-level security and schemas that survive growth." },
];

const PRINCIPLES = [
  "Structure before surface",
  "Motion explains, never decorates",
  "Ship it accessible",
];

export default function ProfileCard() {
  const root = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const turbulence = useRef<SVGFETurbulenceElement>(null);
  const displace = useRef<SVGFEDisplacementMapElement>(null);

  const [trait, setTrait] = useState(0);

  useScrollReveal(root);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        portrait.current,
        { yPercent: -6, scale: 1.1 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: portrait.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Monochrome portrait warps when hovered, then settles
  const distort = (on: boolean) => {
    if (!displace.current || !turbulence.current) return;

    gsap.to(displace.current, {
      attr: { scale: on ? 28 : 0 },
      duration: on ? 0.5 : 0.9,
      ease: "power3.out",
    });

    gsap.to(turbulence.current, {
      attr: { baseFrequency: on ? 0.03 : 0.0001 },
      duration: 0.9,
      ease: "power2.out",
    });

    gsap.to(front.current, {
      rotate: on ? 0 : 2.5,
      scale: on ? 1.03 : 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="profile"
      ref={root}
      className="px-4 py-20 md:px-8 md:py-32"
    >
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="portrait-distort">
          <feTurbulence
            ref={turbulence}
            type="fractalNoise"
            baseFrequency="0.0001"
            numOctaves="2"
            result="n"
          />
          <feDisplacementMap
            ref={displace}
            in="SourceGraphic"
            in2="n"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="mx-auto max-w-[1400px]">
        <h2
          data-words
          className="mb-10 font-serif text-5xl leading-none md:mb-16 md:text-8xl"
        >
          <SplitWords text="Identity and profile" />
        </h2>

        <div
          data-physics
          className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-12"
        >
          {/* Overlapping editorial portraits */}
          <BentoCard
            data-reveal
            className="min-h-[32rem] md:col-span-5 md:row-span-3"
          >
            <div
              className="absolute inset-0 flex items-center justify-center p-8"
              onPointerEnter={() => distort(true)}
              onPointerLeave={() => distort(false)}
            >
              <div className="absolute left-[8%] top-[9%] h-[62%] w-[58%] -rotate-6 overflow-hidden border border-accent/40 bg-accent-deep/10">
                <img
                  src={PROFILE.portraitAlt || DEFAULT_PORTRAITS[1]}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover opacity-70 grayscale contrast-125"
                />

                <span className="absolute left-2 top-2 font-mono text-[10px] uppercase text-accent">
                  
                </span>
              </div>

              <div
                ref={front}
                className="relative h-[72%] w-[68%] translate-x-[10%] translate-y-[4%] rotate-[2.5deg] overflow-hidden border border-white/30 bg-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
                style={{ filter: "url(#portrait-distort)" }}
              >
                <div
                  ref={portrait}
                  className="absolute inset-[-8%]"
                >
                  <img
                    src={PROFILE.portrait || DEFAULT_PORTRAITS[0]}
                    alt={`Editorial portrait of ${PROFILE.initials}`}
                    className="h-full w-full object-cover grayscale contrast-125"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-transparent mix-blend-multiply" />

                <span className="absolute bottom-2 left-3 font-mono text-[10px] uppercase text-white/70">
                  {PROFILE.initials}
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Manifesto */}
          <BentoCard
            data-reveal
            className="p-6 md:col-span-7 md:p-10"
          >
            <p className="text-sm text-mute">Manifesto</p>

            <p className="mt-5 font-serif text-2xl leading-snug md:text-4xl">
              I design and build in the same sitting, so nothing gets lost
              between the{" "}
              <em className="text-accent">mockup</em> and the browser.
            </p>

            <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-mute">
              <p>
                I'm a front-end developer and Figma designer based in
                Tanjungpinang, Indonesia. I care about visual hierarchy,
                rhythm, and typography as much as I care about clean
                component APIs and bundle size.
              </p>

              <p>
                Currently studying Informatics Engineering at STT Indonesia
                Tanjungpinang, I ground my interface decisions in solid data
                structures, system logic, and measurable performance turning
                Figma designs into fast, production-ready web experiences.
              </p>
            </div>
          </BentoCard>

          {/* Education */}
          <BentoCard
            data-reveal
            className="p-6 md:col-span-4 md:p-8"
          >
            <GraduationCap size={22} />

            <p className="mt-6 font-serif text-3xl leading-tight">
              Informatics Engineering
            </p>

            <p className="mt-2 text-sm text-mute">
              STT Indonesia Tanjungpinang · Student
            </p>
          </BentoCard>

          {/* Principles */}
          <BentoCard
            data-reveal
            className="p-6 md:col-span-3 md:p-8"
          >
            <p className="text-sm text-mute">Working principles</p>

            <ul className="mt-5 space-y-3">
              {PRINCIPLES.map((p) => (
                <li
                  key={p}
                  className="border-b border-line pb-3 text-sm last:border-b-0 last:pb-0"
                >
                  {p}
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Interactive traits */}
          <BentoCard
            data-reveal
            className="p-6 md:col-span-7 md:p-8"
          >
            <p className="text-sm text-mute">
              Focus areas · tap a trait
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {TRAITS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setTrait(i)}
                  onPointerEnter={(e) =>
                    gsap.to(e.currentTarget, {
                      y: -3,
                      duration: 0.25,
                    })
                  }
                  onPointerLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      y: 0,
                      duration: 0.4,
                    })
                  }
                  aria-pressed={trait === i}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-300 ${
                    trait === i
                      ? "border-accent bg-accent text-carbon"
                      : "border-line hover:border-accent"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p
              className="mt-6 min-h-12 border-l border-accent pl-4 font-serif text-xl italic leading-snug"
              aria-live="polite"
            >
              {TRAITS[trait].note}
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
