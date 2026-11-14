import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X } from "lucide-react";
import BentoCard from "./BentoCard";
import { prefersReducedMotion, SplitWords, useScrollReveal } from "./shared";
import { PROJECTS, type Project } from "./data";

type Filter = "All" | Project["kind"];
const FILTERS: Filter[] = ["All", "Development", "Design"];

/** Brutalist full-screen blueprint sheet with the case study. */
function Blueprint({ project, onClose }: { project: Project; onClose: () => void }) {
  const sheet = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(sheet.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power4.inOut", onComplete: onClose });
  }, [onClose]);

  useLayoutEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
          .from("[data-bp-item]", { opacity: 0, y: 30, duration: 0.7, stagger: 0.07 }, "-=0.3")
          .from("[data-bp-metric]", { scale: 0.7, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.5");
      },
      el
    );
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const focusable = sheet.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [close]);

  return createPortal(
    <div
      ref={sheet}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="blueprint fixed inset-0 z-[80] overflow-y-auto overscroll-contain text-white"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-accent-deep/40 bg-[#04060f]/90 px-4 py-3 backdrop-blur md:px-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
          Blueprint {project.code} · Sheet 1/1 · {project.year}
        </span>
        <button
          ref={closeBtn}
          onClick={close}
          aria-label="Close case study"
          className="flex h-10 items-center gap-2 border border-accent-deep/60 px-3 font-mono text-xs transition-colors hover:bg-accent hover:text-carbon"
        >
          ESC <X size={14} />
        </button>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-8 p-4 pb-20 md:grid-cols-12 md:gap-10 md:p-8 md:pb-24">
        <div className="md:col-span-7">
          <div data-bp-item>
            <p className="font-mono text-xs uppercase text-accent-deep">{project.category}</p>
            <h3 className="mt-3 font-serif text-5xl leading-[0.95] md:text-8xl">{project.title}</h3>
            <p className="mt-4 text-sm text-mute">{project.role}</p>
          </div>

          <div data-bp-item className="relative mt-10 border border-accent-deep/50 p-3">
            {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((pos) => (
              <span key={pos} className={`absolute h-3 w-3 border border-accent bg-carbon ${pos}`} />
            ))}
            <img src={project.image} alt={`${project.title} preview`} className="aspect-[16/10] w-full object-cover grayscale contrast-110" />
            <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase text-accent-deep">
              <span className="h-px flex-1 bg-accent-deep/60" />
              Ratio 16 : 10  {project.code}
              <span className="h-px flex-1 bg-accent-deep/60" />
            </div>
          </div>

          <p data-bp-item className="mt-10 max-w-xl text-lg leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="space-y-10 md:col-span-5 md:pt-6">
          <div className="grid grid-cols-3 gap-px border border-accent-deep/50 bg-accent-deep/40">
            {project.metrics.map((m) => (
              <div key={m.label} data-bp-metric className="bg-[#04060f] p-4 md:p-5">
                <p className="font-serif text-4xl md:text-5xl">{m.value}</p>
                <p className="mt-2 text-xs text-mute">{m.label}</p>
              </div>
            ))}
          </div>

          <div data-bp-item>
            <h4 className="mb-4 font-mono text-xs uppercase text-accent">/ Architecture</h4>
            <div className="border border-accent-deep/50">
              {project.architecture.map((a, i) => (
                <div key={a.title} className="grid gap-2 border-b border-accent-deep/30 p-5 last:border-b-0 md:grid-cols-[7rem_1fr]">
                  <p className="font-mono text-xs text-accent-deep">
                    0{i + 1} {a.title}
                  </p>
                  <p className="text-sm leading-relaxed text-mute">{a.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-bp-item>
            <h4 className="mb-4 font-mono text-xs uppercase text-accent">/ Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="border border-accent-deep/50 px-3 py-1.5 font-mono text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.href && (
            <a
              data-bp-item
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 text-sm font-medium text-carbon transition-colors hover:bg-transparent hover:text-accent"
            >
              Visit project <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function WorkCard({
  project,
  className,
  hidden,
  onOpen,
  onHover,
}: {
  project: Project;
  className: string;
  hidden: boolean;
  onOpen: (p: Project) => void;
  onHover: (p: Project | null) => void;
}) {
  const enter = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    onHover(project);
    gsap.to(el.querySelector("[data-img]"), { scale: 1.08, filter: "grayscale(0)", duration: 0.8, ease: "power3.out" });
    gsap.to(el.querySelector("[data-arrow]"), { rotate: 45, backgroundColor: "#A5B4FC", color: "#050507", duration: 0.4 });
    gsap.to(el.querySelectorAll("[data-meta]"), { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" });
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // 3D perspective tilt on the preview frame, parallax drift on the image inside it
    gsap.to(e.currentTarget.querySelector("[data-tilt]"), {
      rotationY: px * 16,
      rotationX: py * -16,
      transformPerspective: 900,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(e.currentTarget.querySelector("[data-img]"), {
      x: px * -18,
      y: py * -12,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    onHover(null);
    gsap.to(el.querySelector("[data-tilt]"), { rotationX: 0, rotationY: 0, duration: 0.9, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
    gsap.to(el.querySelector("[data-img]"), { scale: 1, x: 0, y: 0, filter: "grayscale(1)", duration: 0.8, ease: "power3.out" });
    gsap.to(el.querySelector("[data-arrow]"), { rotate: 0, backgroundColor: "rgba(5,5,7,0.6)", color: "#fff", duration: 0.4 });
    gsap.to(el.querySelectorAll("[data-meta]"), { y: 12, opacity: 0, duration: 0.4 });
  };

  return (
    <BentoCard
      data-flip-id={project.id}
      data-reveal
      interactive
      aria-label={`Open case study: ${project.title}`}
      onClick={() => onOpen(project)}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`border border-line p-4 md:p-5 ${hidden ? "hidden" : ""} ${className}`}
    >
      <div data-tilt className="relative aspect-[16/10] overflow-hidden border border-line">
        <img
          data-img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1)" }}
        />
        <span data-arrow className="glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center border border-line">
          <ArrowUpRight size={18} />
        </span>
        <span
          data-meta
          className="glass absolute left-3 top-3 hidden border border-line px-3 py-1.5 font-mono text-[11px] sm:block"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          {project.metrics[0].value} · {project.metrics[0].label}
        </span>
        <span
          data-meta
          className="glass absolute bottom-3 left-3 border border-line px-3 py-1.5 font-mono text-[11px]"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          {project.code} · {project.role.split(",")[0]}
        </span>
        <span
          data-meta
          className="glass absolute bottom-3 right-3 hidden border border-line px-3 py-1.5 font-mono text-[11px] sm:block"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          Open blueprint ↗
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-3xl leading-tight md:text-4xl">{project.title}</h3>
          <p className="mt-2 text-sm text-mute">{project.category}</p>
        </div>
        <span className="font-mono text-xs text-mute">{project.year}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 3).map((s) => (
          <span key={s} className="border border-line px-2.5 py-1 text-xs text-mute">
            {s}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}

// non-linear, grid-breaking placement
const LAYOUT = [
  "md:col-span-7",
  "md:col-span-5 md:mt-28",
  "md:col-span-5 md:-mt-10",
  "md:col-span-7 md:mt-16",
];

export default function SelectedWorks() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const handleClose = useCallback(() => setActive(null), []);
  useScrollReveal(root);

  const changeFilter = (f: Filter) => {
    if (f === filter || !grid.current) return;
    flipState.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]"));
    setFilter(f);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state || prefersReducedMotion()) return;
    Flip.from(state, {
      duration: 0.8,
      ease: "power3.inOut",
      absolute: true,
      stagger: 0.05,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }),
    });
    gsap.delayedCall(1, () => ScrollTrigger.refresh()); // grid height changed
  }, [filter]);

  // hovering a project retints the page-wide ambient glow (the fixed layer in App reads --amb)
  const setAmbient = useCallback((p: Project | null) => {
    gsap.to(document.documentElement, {
      "--amb": p ? `rgba(${p.hue},0.26)` : "rgba(129,140,248,0.07)",
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(
    () => () => {
      gsap.killTweensOf(document.documentElement);
      document.documentElement.style.removeProperty("--amb");
    },
    []
  );

  return (
    <section id="works" ref={root} className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 data-words className="font-serif text-5xl leading-none md:text-8xl">
            <SplitWords text="The archival lab" />
          </h2>
          <div data-reveal className="max-w-sm">
            <p className="text-mute">Four production systems. Open any card for the blueprint: architecture, stack and results.</p>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => changeFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-300 ${
                    filter === f ? "border-accent bg-accent text-carbon" : "border-line hover:border-accent"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={grid} data-physics className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((p, i) => (
            <WorkCard
              key={p.id}
              project={p}
              className={LAYOUT[i % LAYOUT.length]}
              hidden={filter !== "All" && p.kind !== filter}
              onOpen={setActive}
              onHover={setAmbient}
            />
          ))}
        </div>
      </div>
      {active && <Blueprint project={active} onClose={handleClose} />}
    </section>
  );
}
