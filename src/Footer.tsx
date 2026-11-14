
import { useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import BentoCard from "./BentoCard";
import {
  scrollToTarget,
  useBatamClock,
  useScrollReveal,
  SplitWords,
} from "./shared";
import { PROFILE, SOCIALS } from "./data";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const time = useBatamClock();

  useScrollReveal(root);

  const instagram = SOCIALS.find(
    (social) => social.label === "Instagram"
  );

  return (
    <section
      id="contact"
      ref={root}
      className="px-4 pb-8 pt-20 md:px-8 md:pt-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* HEADING */}
        <h2
          data-words
          className="font-serif text-[clamp(3rem,9vw,9rem)] leading-[0.95]"
        >
          <SplitWords text="Let's build something precise." />
        </h2>

        <div
          data-physics
          className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:mt-20 md:grid-cols-12"
        >

          {/* CONTACT CARD */}
          <BentoCard
            data-reveal
            className="p-6 md:col-span-8 md:p-10"
          >
            <p className="text-sm text-mute">
              Let's Connect
            </p>

            <p className="mt-4 font-serif text-4xl md:text-6xl">
              Have a project in mind?
            </p>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute md:text-base">
              I'm always open to connecting, sharing ideas,
              and exploring new opportunities. Feel free
              to reach out through my Instagram.
            </p>

            {instagram && (
              <div className="mt-8">
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-line px-5 py-3 text-sm transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-carbon"
                >
                  <instagram.icon size={17} />
                  Let's Connect
                  <ArrowUpRight size={15} />
                </a>
              </div>
            )}
          </BentoCard>

          {/* LOCAL TIME CARD */}
          <BentoCard
            data-reveal
            className="flex flex-col justify-between gap-8 p-6 md:col-span-4 md:p-10"
          >
            <div>
              <p className="text-sm text-mute">
                Local time, TanjungPinang
              </p>

              <p className="mt-3 font-mono text-4xl tabular-nums">
                {time}
              </p>

              <p className="mt-2 font-mono text-xs text-mute">
                WIB · UTC+7
              </p>
            </div>

            <p className="inline-flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 bg-accent" />
              </span>

              Thanks For Coming
            </p>
          </BentoCard>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-mute md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {PROFILE.initials}.
            Designed and built in TanjungPinang, Indonesia.
          </p>

          <button
            onClick={() => scrollToTarget(0)}
            className="inline-flex items-center gap-2 text-white transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
