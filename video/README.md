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

## Voice-over and sound effects (free, offline)

`public/audio/soundtrack.mp3` holds the narration plus SFX, and `src/Explainer.tsx` plays it under the video.

- **Voice:** [Kokoro-82M](https://github.com/thewh1teagle/kokoro-onnx) (Apache-2.0), voice `am_michael`. Each line is placed on its caption's frame and sped up if needed to fit before the next cue. Emotion comes from per-scene speed/level and punctuation (`STYLE` / `SAY` in the script).
- **SFX:** generated in code (no licensing): whooshes on scene cuts, pops on bullets, typing, counter ticks, impacts, chimes and a riser into the CTA.
- **Mix:** compressed and loudness-normalised to −14 LUFS.

Regenerate after changing captions:

```bash
pip install kokoro-onnx soundfile numpy        # plus ffmpeg on PATH
# download kokoro-v1.0.onnx + voices-v1.0.bin from the kokoro-onnx GitHub releases into ./kokoro
node scripts/timeline.mjs > /tmp/timeline.json
python scripts/generate_audio.py /tmp/timeline.json ./kokoro   # VOICE=af_heart for a female voice
```

## Brand ad: Secure Monitoring (`SecureMonitoringAd`, ~57s)

An original ad with its own design system in `src/sm/`. It shares nothing visually with the explainer.

- **Brand:** the official logo and monitoring-room photo from the website (`public/brand/`), the navy/blue + signal-red palette and the Geist type family.
- **Look:** dark "security operations" styling with a blue glow, a fine grid, film grain, a camera overlay (REC, timecode, viewfinder corners), masked word reveals and light-sweep cuts.
- **Generated assets:** night CCTV feeds with an operator flag, line icons, glass cards, a response ring, pricing cards and a CTA button.
- **Claims:** they follow the website. The 30-second figure is a response *target*. Pricing is $199/$299 per site per month (Enterprise from $699), with no setup fees and a 7-day free trial.

Scenes and voice-over lines live in `src/sm/Ad.tsx`.

```bash
npx remotion render SecureMonitoringAd out/secure-monitoring-ad.mp4
# audio: node scripts/timeline.mjs ad > /tmp/ad.json
#        VO_SPEED=1.0 MUSIC=1 python scripts/generate_audio.py /tmp/ad.json ./kokoro 1716 public/audio/ad.mp3
```
