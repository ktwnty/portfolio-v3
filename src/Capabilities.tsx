import { useRef } from "react";
import BentoCard from "./BentoCard";
import { useScrollReveal, SplitWords } from "./shared";
import { CAPABILITIES, PROCESS } from "./data";


export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root);

  return (
    <section id="arsenal" ref={root} className="px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 data-words className="mb-10 font-serif text-5xl leading-none md:mb-16 md:text-8xl">
          <SplitWords text="Technical arsenal" />
        </h2>

        <div data-physics className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {CAPABILITIES.map((c) => {
            const Icon = c.icon;
            return (
              <BentoCard key={c.title} data-reveal className="flex flex-col p-6 md:p-8">
                <Icon size={24} className="text-accent" />
                <h3 className="mt-8 font-serif text-3xl leading-tight md:text-4xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{c.blurb}</p>
                <ul className="mt-8 border-t border-line">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="group flex cursor-default items-center justify-between border-b border-line py-3 text-sm transition-all duration-300 hover:pl-2 hover:text-accent"
                    >
                      {item}
                      <span className="h-1.5 w-1.5 bg-accent/50 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-150 group-hover:bg-accent" />
                    </li>
                  ))}
                </ul>
              </BentoCard>
            );
          })}

          <BentoCard data-reveal className="p-6 md:col-span-3 md:p-8">
            <p className="font-serif text-3xl md:text-4xl">How a project runs</p>
            <ol className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((s, i) => (
                <li key={s.title} className="bg-carbon p-5">
                  <span className="font-mono text-xs text-mute">Step {i + 1}</span>
                  <p className="mt-3 font-serif text-2xl">{s.title}</p>
                  <p className="mt-2 text-sm text-mute">{s.body}</p>
                </li>
              ))}
            </ol>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

