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

An original ad styled on the Secure Monitoring brand sheet. It shares nothing visually with the explainer. Code: `src/sm/`.

- **Brand system:** a shield + CCTV mark recreated as vector (`ShieldMark`, `Lockup`), the palette #2563EB / #1D4ED8 / #0B1220 / #F8FAFC, Inter, outlined icon tiles, slanted lower thirds and a white logo-reveal card.
- **Photography:** client-supplied AI-generated images live in `public/brand/ai/`. Full-bleed shots use `HeroPhoto` (focal-point cover, slow push and drift, brand grade). Camera views use `CctvPhoto`, with live timestamp, REC, grain, scanlines and jitter overlays; the burned-in labels were cropped out of the source images.
- **Motion graphics:** a 3D metallic shield (three.js via `@remotion/three`; render with `--gl=angle`), a glowing US map (`us-atlas` + `d3-geo`), tracking brackets, an alert card, a push notification, a lower third and masked type reveals.
- **Voice:** female (`af_heart`) at one constant speed, over a ducked music bed with SFX.
- **Claims:** all from the website. The 30-second figure is a response *target*; plans are $199/$299 per site per month (Enterprise from $699), with no setup fees and a 7-day free trial. Customer, transaction and AI-analytics features from the brand sheet are left out on purpose, because the website says they are not offered.

```bash
npx remotion render SecureMonitoringAd out/secure-monitoring-ad.mp4 --gl=angle
# audio: node scripts/timeline.mjs ad > /tmp/ad.json
#        VOICE=af_heart VO_SPEED=1.0 MUSIC=1 python scripts/generate_audio.py /tmp/ad.json ./kokoro 2010 public/audio/ad.mp3
```

### 30-second cut (`SecureMonitoringAd30`)

`src/sm/Ad30.tsx` reuses the brand ad's scenes with a tighter script (hook → problem → brand → live team → alert → team alerted → pricing → CTA), exactly 900 frames.

```bash
npx remotion render SecureMonitoringAd30 out/secure-monitoring-ad-30s.mp4 --gl=angle
# audio: node scripts/timeline.mjs ad30 > /tmp/ad30.json
#        VOICE=af_heart VO_SPEED=1.0 MUSIC=1 python scripts/generate_audio.py /tmp/ad30.json ./kokoro 900 public/audio/ad30.mp3
```

### Landscape version (`SecureMonitoringAdLandscape`, 1920×1080)

`src/sm/AdLandscape.tsx` re-lays out every scene of the full ad for 16:9. It keeps the same timing, so it reuses `audio/ad.mp3`.

```bash
npx remotion render SecureMonitoringAdLandscape out/secure-monitoring-ad-landscape.mp4 --gl=angle
```

## STARDUST (`Stardust`, 1920×1080, 54s)

A fully procedural 3D short about the 13.8-billion-year history of the atoms in your body. It is built with three.js through `@remotion/three` and needs no external assets.

- **Particle universe:** one 40k-particle system morphs through the singularity, big bang, cosmic web, protostar, supernova remnant and accretion disk, then forms the particle typography. Every state is computed in a GLSL vertex shader from frame-driven uniforms.
- **Shaded surfaces:** the star's surface (fbm granulation, red-giant shift), the planet (continents, oceans, clouds, night-side city lights, atmosphere) and the shockwave are all shaders.
- **Camera:** a Catmull-Rom path through keyframes, with shake at the supernova.
- **Sound:** a procedural score (drone, riser, impacts, heartbeat, pads, arpeggio) and Kokoro narration, both locked to `src/stardust/timeline.ts`.

```bash
node scripts/stardust_timeline.mjs > /tmp/sd.json
python scripts/stardust_audio.py /tmp/sd.json ./kokoro
npx remotion render Stardust out/stardust.mp4 --gl=angle
```

### STARDUST Reel (`StardustReel`, 1080×1920, 58s)

The vertical Instagram cut has narration only and ends with a "comment STARDUST" call to action.

```bash
REEL=1 python scripts/stardust_audio.py /tmp/sd.json ./kokoro   # writes public/audio/stardust-reel.mp3
npx remotion render StardustReel out/stardust-reel.mp4 --gl=angle
```
