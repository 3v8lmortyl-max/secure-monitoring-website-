// Prints the narration/SFX timeline (global frames) derived from the scene definitions.
// Usage: node scripts/timeline.mjs [explainer|ad] > timeline.json
import {build} from 'esbuild';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import os from 'node:os';

const out = path.join(os.tmpdir(), `timeline-${process.pid}.cjs`);
await build({
  stdin: {
    contents: `
      import {part1} from './src/parts/part1';
      import {part2} from './src/parts/part2';
      import {part3} from './src/parts/part3';
      import {part4} from './src/parts/part4';
      import {PART_FRAMES, defaultProps} from './src/script';
      import {adScenes} from './src/sm/Ad';
      import {ad30Scenes} from './src/sm/Ad30';
      export {part1, part2, part3, part4, PART_FRAMES, defaultProps, adScenes, ad30Scenes};`,
    resolveDir: process.cwd(),
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: out,
  jsx: 'automatic',
  logLevel: 'error',
});
const m = (await import(pathToFileURL(out).href)).default;
const clean = (t) => t.replace(/[*_!]/g, '').replace(/\|/g, ' ').replace(/\s+/g, ' ').trim();
const events = [];
const promo = process.argv[2] === 'ad' || process.argv[2] === 'ad30';
const builds = promo ? [() => (process.argv[2] === 'ad30' ? m.ad30Scenes : m.adScenes)] : [m.part1, m.part2, m.part3, m.part4];
const props = m.defaultProps;
let partStart = 0;
builds.forEach((build, pi) => {
  let sceneStart = partStart;
  for (const sc of build(props)) {
    const dur = Math.round(sc.duration * 30);
    events.push({type: 'cut', frame: sceneStart, scene: sc.id, duration: dur});
    const tracks = [sc.captions ?? [], sc.extra?.captions ?? []];
    for (const caps of tracks) {
      let prev = '';
      caps.forEach((c, i) => {
        const text = clean(c.lines.map((l) => l.text).join(' '));
        const next = caps[i + 1] ? caps[i + 1].at : dur;
        let say = c.say ?? text;
        if (prev && text.startsWith(prev)) say = text.slice(prev.length).trim(); // repeated build-up captions
        prev = text;
        if (c.say) say = c.say;
        if (say) events.push({type: 'voice', frame: sceneStart + c.at, maxFrames: Math.max(next - c.at, 12), text: say, scene: sc.id});
      });
    }
    (sc.bullets ?? []).forEach((b, i, arr) => {
      const next = arr[i + 1] ? arr[i + 1].at : dur;
      events.push({type: 'bullet', frame: sceneStart + b.at, maxFrames: next - b.at, text: b.say ?? clean(b.text), scene: sc.id});
    });
    (sc.vo ?? []).forEach((v) => events.push({type: 'voice', frame: sceneStart + Math.round(v.at * 30), text: v.text, scene: sc.id}));
    (sc.sfx ?? []).forEach((f) => events.push({type: 'sfx', sfx: f.type, frame: sceneStart + Math.round(f.at * 30), scene: sc.id}));
    sceneStart += dur;
  }
  partStart = promo ? sceneStart : partStart + m.PART_FRAMES[pi];
});
events.sort((a, b) => a.frame - b.frame);
console.log(JSON.stringify(events, null, 1));
