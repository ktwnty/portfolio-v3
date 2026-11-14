# Portfolio (React 19 · Vite · Tailwind v4 · GSAP)

```bash
npm install
npm run dev
```

## Where to edit

- `src/data.ts`: `PROFILE` (initials, email, portrait, coordinates), `NAV_LINKS`, `STACK`, `PROJECTS`, `CAPABILITIES`, `PROCESS`, `SOCIALS`
- `src/PersonalPulse.tsx`: `WORKSPACE`, `RADAR` and `TRACKS` at the top of the file
- `src/index.css`: theme tokens (`--color-accent`, `--color-panel`), grid pattern, equalizer keyframes
- `public/projects/`: case-study images
- `public/portraits/`: generated monochrome portrait frames, used until `PROFILE.portrait` / `PROFILE.portraitAlt` are set

## Structure

`App` · `Navbar` (magnetic dock) · `Hero` · `Marquee` · `ProfileCard` · `SelectedWorks` · `PersonalPulse` · `Capabilities` · `Footer` · `BentoCard` · `shared.tsx` (GSAP hooks and `MagneticButton`)

## v3.3 changes

- Pulse player: playlist now matches the brief exactly: BIRDS OF A FEATHER (Billie Eilish), Die For You (The Weeknd), 505 (Arctic Monkeys), plus Blinding Lights and Do I Wanna Know? as extras
- Pulse player: each track has an "Open in Spotify" link (a Spotify search URL, so no track IDs to go stale)
- Playback stays simulated (progress, timer, seek, play/pause, track switching and equalizer all work); no licensed audio is bundled
- Version bumped to 3.3.0
- Not built here: the sandbox had no network, so dependencies were not installed. Run `npm install && npm run build` once and report any type error

## v3.2 changes

- Archival lab: hovering a project now retints a page-wide ambient glow (fixed layer in `App`, driven by the `--amb` CSS variable); preview frames get a 3D perspective tilt that follows the cursor, plus a floating metric capsule next to the existing telemetry chips
- Profile: two overlapping monochrome portraits (SVG frames in `public/portraits/` until you add real photos); the hatch placeholder is gone
- Project links: `href` is now optional and the "Visit project" button only renders when it is set (the `example.com` links were removed)
- `npm run build` now runs `tsc --noEmit && vite build`; version bumped to 3.2.0 to match the archive
- Not built here: the sandbox had no network, so dependencies were not installed. Syntax was checked with `tsc`; run `npm install && npm run build` once and report any type error

## v3.1 changes

- Version bumped to match the archive name; imports and exports across `src/` were cross-checked (no missing or mismatched modules found)
- Pulse player: playlist now follows the spec with Billie Eilish, The Weeknd and Arctic Monkeys tracks (title, artist, length, BPM); playback stays simulated, there is no audio file
- Still to fill in: `PROFILE.email` in `src/data.ts` (currently `hello@yourdomain.com`) and the social links in `SOCIALS`

## v2.1 changes

- Navbar: floating magnetic capsule dock with live WIB time, coordinates and availability radar
- Hero: per-character GSAP timeline, draggable (InertiaPlugin) telemetry capsules, badge ticker
- Marquee: two angled, crossing bands moving in opposite directions, hover-pause, glitch on hover
- Profile: overlapping portraits with an SVG displacement filter, floating code layers, interactive trait pills
- Selected works ("archival lab"): asymmetric grid, Flip filter, ambient gradient that follows hover, full-screen blueprint modal
- Pulse: live status indicators per tool
- Scroll physics: `data-physics` blocks scale, tilt and slide into place via ScrollTrigger scrub (see `useScrollReveal` in `shared.tsx`)

Note: dependencies were not installed or built in the environment that produced this version, so run `npm install && npm run build` once and report any type error.
