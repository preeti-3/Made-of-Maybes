# Made of Maybes

A standalone interactive museum of unfinished ideas. This MVP contains the opening sky, museum threshold, floating causeway, one working exhibit, a distant preview, and a temporary ending.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production verification:

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

- `components/ExperienceShell.tsx` — state, accessible overlays, journey controls, loading, and fallbacks
- `components/scene/ExperienceCanvas.tsx` — lazy WebGL canvas and renderer settings
- `components/scene/MuseumEnvironment.tsx` — scene composition and lighting
- `components/scene/EntranceArch.tsx`, `FloatingPath.tsx`, `CloudField.tsx` — procedural environment
- `components/scene/UnfinishedIdeaExhibit.tsx` — the first interactive exhibit
- `components/scene/CameraJourney.tsx` — controlled depth-first camera path
- `experience/config.ts` — content, palette, timings, and desktop/mobile camera stops
- `experience/sound.ts` — optional synthesized tones; no downloaded audio

## Controls and accessibility

- Scroll, `ArrowDown`, `PageDown`, or Space advances the journey.
- Visible buttons duplicate all essential scene interactions.
- The blue fragment can be selected directly in 3D or completed with the HTML control.
- Sound is off by default and is generated with the Web Audio API after opt-in.
- The motion toggle and `prefers-reduced-motion` shorten movement and stop ambient drift.
- Rendering pauses when the tab is hidden.
- If WebGL is unavailable, an HTML-only version preserves the premise and exhibit description.

## Performance notes

The museum uses procedural primitives only: no GLTF models, texture maps, image assets, or runtime font downloads. Mobile reduces cloud and distant-object counts, shortens the camera composition, lowers DPR, and disables antialiasing. Lighting is limited and surfaces rely on simple rough materials rather than real-time reflections.

## Assets and licenses

- No external visual or audio assets are used.
- UI icons are from [Lucide](https://lucide.dev/) (ISC License).
- Runtime libraries retain their respective open-source licenses.

## Deliberate simplifications from the reference

- Architecture is reduced to one arch, six causeway slabs, and one exhibit island.
- Plants are small geometric cone clusters rather than realistic foliage.
- Clouds are instanced low-poly volumes rather than volumetric simulation.
- Banners, gold trim, rocks, and distant displays are used sparingly.
- The first invention uses five primitives, two orbit rings, and a compact constellation response.
- The reference image informs atmosphere and composition only; it is not embedded or recreated pixel-for-pixel.

## Deployment

The project has no backend or environment variables. Import the repository into Vercel and use the default Next.js build settings.
