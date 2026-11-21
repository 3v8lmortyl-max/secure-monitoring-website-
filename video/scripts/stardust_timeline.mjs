// Prints STARDUST's narration + key beats as JSON for scripts/stardust_audio.py.
import {build} from 'esbuild';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import os from 'node:os';

const out = path.join(os.tmpdir(), `stardust-${process.pid}.cjs`);
await build({entryPoints: ['src/stardust/timeline.ts'], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error'});
const m = (await import(pathToFileURL(out).href)).default;
console.log(JSON.stringify({total: m.TOTAL, beats: m.T, narration: m.NARRATION, reelTotal: m.REEL_TOTAL, reelCta: m.REEL_CTA}, null, 1));
