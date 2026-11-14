
import { useEffect, useRef, useState } from "react";

import {
  ArrowUpRight,
  Code,
  Figma,
  Globe,
  Laptop,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import BentoCard from "./BentoCard";
import { useScrollReveal, SplitWords } from "./shared";

/* -------------------------------------------------------------------------- */
/*  Content — edit these values                                                */
/* -------------------------------------------------------------------------- */

type Tool = {
  icon: LucideIcon;
  name: string;
  role: string;
  detail: string;
  status: string;
  live: boolean;
};

const WORKSPACE: Tool[] = [
  {
    icon: Code,
    name: "VS Code",
    role: "Editor",
    detail: "Strict TypeScript, ESLint and Tailwind IntelliSense.",
    status: "Compiling",
    live: true,
  },
  {
    icon: Figma,
    name: "Figma",
    role: "Design tokens",
    detail: "Variables, components and clickable prototypes.",
    status: "Syncing tokens",
    live: true,
  },
  {
    icon: Terminal,
    name: "CMD",
    role: "Terminal",
    detail: "Searchable command history for every project.",
    status: "Idle",
    live: false,
  },
  {
    icon: Globe,
    name: "Chrome",
    role: "Browser",
    detail: "One space per client, so tabs never mix.",
    status: "3 spaces open",
    live: true,
  },
  {
    icon: Laptop,
    name: "Windows",
    role: "Daily driver",
    detail: "Where everything is built, tested and shipped.",
    status: "Battery 87%",
    live: true,
  },
];

const RADAR_STAGES = ["Explore", "Prototype", "Build", "Ship"] as const;

type RadarItem = {
  title: string;
  stage: 1 | 2 | 3 | 4;
  note: string;
};

const RADAR: RadarItem[] = [
  {
    title: "GSAP motion physics",
    stage: 3,
    note: "Velocity-driven tickers, springs and scrubbed timelines.",
  },
  {
    title: "Supabase architecture",
    stage: 2,
    note: "Row-level security, schema design and realtime channels.",
  },
  {
    title: "AI interface design",
    stage: 2,
    note: "Memory dashboards and conversational UI patterns.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Music Tracks                                                               */
/* -------------------------------------------------------------------------- */

type Track = {
  title: string;
  artist: string;
  mood: string;
  bpm: number;
  src: string;
};


const TRACKS: Track[] = [
  {
    title: "All I Need to Hear",
    artist: "The 1975",
    mood: "Deep focus",
    bpm: 137,
    src: "/audio/All-I-Need-To-Hear.mp3",
  },
  {
    title: "Magnolia",
    artist: "Magnolia Celebration",
    mood: "After-midnight commits",
    bpm: 92,
    src: "/audio/Magnolia.mp3",
  },
  {
    title: "Secret Door",
    artist: "Arctic Monkeys",
    mood: "Slow debugging",
    bpm: 125,
    src: "/audio/Secret-Door.mp3",
  },
  {
    title: "Like I Can",
    artist: "Sam Smith",
    mood: "Late-night builds",
    bpm: 100,
    src: "/audio/Like-I-Can.mp3",
  },
  {
    title: "White Keys",
    artist: "Dominic Fike",
    mood: "Quiet refactors",
    bpm: 82,
    src: "/audio/white-keys.mp3",
  },
];


const spotifyUrl = (t: Track) =>
  `https://open.spotify.com/search/${encodeURIComponent(
    `${t.title} ${t.artist}`
  )}`;

const BARS = 28;

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* -------------------------------------------------------------------------- */
/*  Columns                                                                    */
/* -------------------------------------------------------------------------- */

function ColumnHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <BentoCard className="p-6 md:p-8">
      <p className="text-sm text-mute">{label}</p>
      <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
        {title}
      </h3>
    </BentoCard>
  );
}

/* -------------------------------------------------------------------------- */
/*  Workspace                                                                  */
/* -------------------------------------------------------------------------- */

function Workspace() {
  return (
    <div data-reveal className="flex flex-col gap-px bg-line">
      <ColumnHeader label="Workspace" title="Hardware and tools" />

      {WORKSPACE.map(
        ({ icon: Icon, name, role, detail, status, live }) => (
          <BentoCard
            key={name}
            className="group flex-1 p-5 md:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-mute transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                <Icon size={18} />
              </span>

              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-serif text-2xl leading-none">
                    {name}
                  </span>

                  <span className="font-mono text-xs text-mute">
                    {role}
                  </span>

                  <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-accent">
                    <span
                      className={`h-1.5 w-1.5 ${
                        live ? "animate-pulse bg-accent" : "bg-white/30"
                      }`}
                    />
                    {status}
                  </span>
                </p>

                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {detail}
                </p>
              </div>
            </div>
          </BentoCard>
        )
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Radar                                                                      */
/* -------------------------------------------------------------------------- */

function Radar() {
  return (
    <div data-reveal className="flex flex-col gap-px bg-line">
      <ColumnHeader label="Radar" title="Research and initiatives" />

      {RADAR.map((item) => (
        <BentoCard
          key={item.title}
          className="flex-1 p-5 md:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-serif text-2xl leading-tight">
              {item.title}
            </p>

            <span className="inline-flex shrink-0 items-center gap-2 border border-line px-2.5 py-1 font-mono text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-accent" />
              </span>

              {RADAR_STAGES[item.stage - 1]}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-mute">
            {item.note}
          </p>

          <div
            role="img"
            aria-label={`Stage ${item.stage} of ${RADAR_STAGES.length}: ${RADAR_STAGES[item.stage - 1]}`}
            className="mt-5 grid grid-cols-4 gap-1"
          >
            {RADAR_STAGES.map((stage, i) => (
              <div key={stage}>
                <div
                  className={`h-1 ${
                    i < item.stage ? "bg-accent" : "bg-line"
                  }`}
                />

                <p
                  className={`mt-2 font-mono text-[10px] ${
                    i < item.stage ? "text-white" : "text-mute"
                  }`}
                >
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Soundtrack — Real MP3 Player                                               */
/* -------------------------------------------------------------------------- */

function Soundtrack() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const track = TRACKS[index];

  // Load the selected audio file
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();

    setElapsed(0);
    setDuration(0);
  }, [index]);

  // Handle actual audio playback
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing, index]);

  // Select a track
  const choose = (i: number) => {
    setIndex(i);
    setElapsed(0);
    setPlaying(true);
  };

  // Next track
  const next = () => {
    choose((index + 1) % TRACKS.length);
  };

  // Previous track
  const previous = () => {
    if (elapsed > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }

      setElapsed(0);
    } else {
      choose((index - 1 + TRACKS.length) % TRACKS.length);
    }
  };

  // Seek audio position
  const handleSeek = (value: number) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = value;
    setElapsed(value);
  };

  // Update progress
  const pct =
    duration > 0
      ? Math.min(100, (elapsed / duration) * 100)
      : 0;

  const state = playing ? "running" : "paused";
  const beat = 60 / track.bpm;

  return (
    <div data-reveal className="flex flex-col gap-px bg-line">
      <ColumnHeader
        label="Soundtrack"
        title="What's playing while I build"
      />

      <BentoCard className="p-5 md:p-6">

        {/* Real MP3 Audio Element */}
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration || 0);
          }}
          onTimeUpdate={(e) => {
            setElapsed(e.currentTarget.currentTime);
          }}
          onEnded={next}
          onError={() => {
            console.error(`Unable to load audio: ${track.src}`);
            setPlaying(false);
          }}
        />

        {/* Equalizer */}
        <div className="flex h-16 items-end gap-[3px]" aria-hidden>
          {Array.from({ length: BARS }, (_, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              <div
                className="eq-bar h-full w-full bg-accent"
                style={{
                  animationDuration: `${beat * (0.5 + (i % 4) * 0.25)}s`,
                  animationDelay: `-${((i * 37) % 10) / 10}s`,
                  animationPlayState: state,
                  opacity: 0.45 + ((i * 13) % 6) / 10,
                }}
              />
            </div>
          ))}
        </div>

        {/* Track Information */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div className="min-w-0" aria-live="polite">
            <p className="truncate font-serif text-3xl leading-tight">
              {track.title}
            </p>

            <p className="mt-1 text-sm text-mute">
              {track.artist} · {track.mood}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 border border-line px-2.5 py-1 font-mono text-xs">
            <span
              className="beat-dot h-1.5 w-1.5 bg-accent-deep"
              style={{
                animationDuration: `${beat}s`,
                animationPlayState: state,
              }}
            />

            {track.bpm} BPM
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="relative flex h-5 items-center focus-within:outline focus-within:outline-1 focus-within:outline-white">
            <div className="h-1 w-full bg-line">
              <div
                className="h-full bg-accent"
                style={{ width: `${pct}%` }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(elapsed, duration || 0)}
              onChange={(e) =>
                handleSeek(Number(e.target.value))
              }
              aria-label="Seek"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>

          <div className="mt-2 flex justify-between font-mono text-xs tabular-nums text-mute">
            <span>{fmt(elapsed)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="mt-6 flex items-center gap-2">
          {/* Previous */}
          <button
            onClick={previous}
            aria-label="Previous track"
            className="flex h-11 w-11 items-center justify-center border border-line transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <SkipBack size={16} />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            className="flex h-11 flex-1 items-center justify-center gap-2 border border-accent bg-accent text-sm font-medium text-carbon transition-colors duration-300 hover:bg-carbon hover:text-accent"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}

            {playing ? "Pause" : "Play"}
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next track"
            className="flex h-11 w-11 items-center justify-center border border-line transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Spotify Link */}
        <a
          href={spotifyUrl(track)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-mute transition-colors duration-300 hover:text-accent"
        >
          Open "{track.title}" in Spotify
          <ArrowUpRight size={14} />
        </a>
      </BentoCard>

      {/* Playlist */}
      <BentoCard className="flex-1">
        <ul>
          {TRACKS.map((t, i) => (
            <li
              key={t.title}
              className={i > 0 ? "border-t border-line" : ""}
            >
              <button
                onClick={() => choose(i)}
                aria-current={i === index}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm transition-colors duration-300 hover:text-accent md:px-6 ${
                  i === index ? "text-accent" : ""
                }`}
              >
                <span className="min-w-0 truncate">
                  {t.title}

                  <span className="text-mute">
                    {" "}— {t.artist}
                  </span>
                </span>

                <span className="shrink-0 font-mono text-xs text-mute">
                  {t.bpm} BPM
                </span>
              </button>
            </li>
          ))}
        </ul>
      </BentoCard>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function PersonalPulse() {
  const root = useRef<HTMLElement>(null);

  useScrollReveal(root);

  return (
    <section
      id="pulse"
      ref={root}
      className="px-4 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2
          data-words
          className="mb-10 font-serif text-5xl leading-none md:mb-16 md:text-8xl"
        >
          <SplitWords text="Behind the screen & daily rhythm" />
        </h2>

        <div
          data-physics
          className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3"
        >
          <Workspace />
          <Radar />
          <Soundtrack />
        </div>
      </div>
    </section>
  );
}
