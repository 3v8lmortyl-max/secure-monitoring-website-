# Explainer video (Remotion)

A 103-second vertical (1080×1920, 30 fps) kinetic-typography explainer. It is built in
Remotion and copies the scene structure, timing and motion style of a reference short:

- words pop in one at a time, blurred and grey, then settle to black
- floating cards and icons with a long soft drop shadow
- ✦ bullet lists that build up
- orange spoke and blue node-graph corner decorations, and a dot-grid background
- a blur-and-drop transition between scenes, plus a persistent watermark

## Commands

```bash
cd video
npm install
npm run studio        # live preview / scrubbing in the browser
npm run render        # -> out/explainer.mp4
```

## Editing

| What | Where |
| --- | --- |
| Brand, watermark, product name, CTA text | `defaultProps` in `src/script.tsx`, or pass `--props='{"brandName":"..."}'` |
| Scene order, durations, captions, bullets | `buildScript()` in `src/script.tsx` (all times in seconds) |
| Word-reveal motion, overall text size (`TEXT_SCALE`) | `src/components/Text.tsx` |
| Scene transitions, corner decorations, dot grid | `src/components/Scene.tsx` |
| Icons (critter, burst, graph, gem, tiles, brand mark) | `src/components/icons.tsx` |
| Mock UI (web page, docs, terminal, monitor, laptop, book) | `src/components/mocks.tsx` |

Caption markup: `*bold*`, `_italic_`, `!accent!`. Use `|` inside a bullet to force a line break.
To clear a caption early, add a caption with no lines, e.g. `C(4.8)`.

Fonts (Roboto, Roboto Mono, both open-source) are bundled in `public/fonts`, so rendering works offline.
