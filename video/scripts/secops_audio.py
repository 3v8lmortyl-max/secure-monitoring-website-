"""AI SecOps Lab short: narration + sound design + master timeline.

Reads src/secops/script.json and src/secops/lab.json (real terminal output from the lab run),
synthesises narration (Kokoro), measures every line, and writes:
  - src/secops/timeline.json  scene starts/durations, per-word caption timing, terminal keystroke timing
  - public/audio/secops.mp3   narration + SFX + ducked music bed, loudness-normalised for Shorts (-14 LUFS)

  python scripts/secops_audio.py /path/to/kokoro-dir
"""
import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np  # noqa: E402
import soundfile as sf  # noqa: E402
from kokoro_onnx import Kokoro  # noqa: E402
from generate_audio import SR, ding, impact, lowpass, music_bed, riser, t_, to_sr, trim, whoosh  # noqa: E402

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
FPS = 30
VOICE = os.environ.get('VOICE', 'af_heart')
SPEED = float(os.environ.get('VO_SPEED', 1.06))
rng = np.random.default_rng(3)

# Which real lab commands appear on screen in which scene.
TERMINAL = {
    'setup': ['git log --oneline'],
    'gone': ['ls -a', 'cat .env'],
    'history': ['git log --all --oneline -S AKIA'],
    'reveal': ['git show HEAD~3:.env'],
    'scan': ["git log -p --all | grep -Eo 'AKIA[A-Z0-9]{16}' | sort -u"],
}
TYPE_FPC = 1.0  # frames per typed character
PAUSE_AFTER_TYPE = 8  # frames before output appears
GAP_BETWEEN_CMDS = 20


def keyclick():
    n = int(0.018 * SR)
    c = lowpass(rng.standard_normal(n), 4200) * np.exp(-np.arange(n) / (n / 5))
    return (c * rng.uniform(0.25, 0.4)).astype(np.float32)


def glitch(dur=0.35):
    """Digital stutter: gated, bit-crushed noise bursts."""
    n = int(dur * SR)
    y = rng.standard_normal(n).astype(np.float32)
    gate = (np.floor(np.arange(n) / (SR * 0.028)) % 2).astype(np.float32)
    y = np.round(y * 3) / 3 * gate
    tone = np.sign(np.sin(2 * np.pi * 180 * t_(dur))) * 0.3
    return ((y * 0.5 + tone * gate) * np.exp(-t_(dur) * 4)).astype(np.float32)


def main(model_dir):
    script = json.load(open(os.path.join(ROOT, 'src/secops/script.json')))
    k = Kokoro(os.path.join(model_dir, 'kokoro-v1.0.onnx'), os.path.join(model_dir, 'voices-v1.0.bin'))

    scenes, lines_out, sfx_events, typing = [], [], [], []
    cursor = 0  # frames
    clips = []
    for sc in script['scenes']:
        start = cursor
        t = start + 6
        for text in sc['lines']:
            a, sr = k.create(text, voice=VOICE, speed=SPEED, lang='en-us')
            clip = to_sr(trim(a), sr)
            dur_f = int(np.ceil(len(clip) / SR * FPS))
            words = text.split()
            weights = np.array([len(w) + 2 for w in words], float)
            edges = np.concatenate([[0], np.cumsum(weights) / weights.sum()]) * dur_f
            lines_out.append({'scene': sc['id'], 'start': t, 'dur': dur_f, 'text': text,
                              'words': [{'w': w, 'at': t + int(edges[i]), 'end': t + int(edges[i + 1])} for i, w in enumerate(words)]})
            clips.append((t, clip))
            t += dur_f + 8
        # terminal timing (real commands from the lab)
        term = []
        tt = start + 10
        for cmd in TERMINAL.get(sc['id'], []):
            typed = int(len(cmd) * TYPE_FPC)
            term.append({'cmd': cmd, 'start': tt, 'typed': typed, 'out': tt + typed + PAUSE_AFTER_TYPE})
            typing.append((tt, typed))
            tt += typed + PAUSE_AFTER_TYPE + GAP_BETWEEN_CMDS
        dur = max(int(sc['min'] * FPS), t - start + 14, tt - start + 10)
        for name, off in sc.get('sfx', []):
            sfx_events.append((name, start + int(off * FPS)))
        scenes.append({'id': sc['id'], 'start': start, 'dur': dur, 'terminal': term})
        cursor = start + dur

    total = cursor
    n = int(total / FPS * SR) + SR
    vo, fx = np.zeros(n, np.float32), np.zeros(n, np.float32)

    def put(buf, clip, frame, g=1.0):
        s = max(int(frame / FPS * SR), 0)
        e = min(s + len(clip), len(buf))
        buf[s:e] += clip[: e - s] * g

    for f, clip in clips:
        put(vo, clip, f)
    for f0, frames in typing:
        for i in range(frames):
            if rng.random() < 0.85:
                put(fx, keyclick(), f0 + i, 1.0)
        put(fx, keyclick() * 1.6, f0 + frames + PAUSE_AFTER_TYPE - 2, 1.0)  # enter
    make = {'impact': lambda: impact(1.6), 'whoosh': lambda: whoosh(0.5), 'riser': lambda: riser(1.4), 'ding': lambda: ding(1318.5, 1.2), 'glitch': glitch}
    for name, f in sfx_events:
        put(fx, make[name](), f - (40 if name == 'riser' else 0), {'impact': 0.9, 'whoosh': 0.45, 'riser': 0.5, 'ding': 0.5, 'glitch': 0.55}[name])
    # fix-card pops land on each numbered line
    for ln in lines_out:
        if ln['scene'] == 'fix' and ln['text'][:4] in ('One.', 'Two.', 'Thre', 'And '):
            put(fx, whoosh(0.3), ln['start'] - 4, 0.3)

    vo /= np.abs(vo).max() + 1e-9
    fx /= np.abs(fx).max() + 1e-9
    bed = music_bed(n, bpm=100)
    env = np.convolve(np.abs(vo), np.ones(4800) / 4800, mode='same')
    duck = 1 - 0.6 * np.clip(env / (env.max() + 1e-9) * 4, 0, 1)
    mix = vo * 0.95 + fx * 0.5 + bed * duck * 0.16
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)
    stereo = np.stack([mix, mix], axis=1)[: int(total / FPS * SR)]
    out = os.path.join(ROOT, 'public/audio/secops.mp3')
    with tempfile.TemporaryDirectory() as d:
        w = os.path.join(d, 'm.wav')
        sf.write(w, stereo, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w, '-af', 'highpass=f=50,acompressor=threshold=-18dB:ratio=3:attack=5:release=120,loudnorm=I=-14:TP=-1.5:LRA=9', '-ar', str(SR), '-b:a', '256k', out], check=True)

    json.dump({'fps': FPS, 'total': total, 'scenes': scenes, 'lines': lines_out}, open(os.path.join(ROOT, 'src/secops/timeline.json'), 'w'), indent=1)
    for sc in scenes:
        print(f"{sc['id']:8s} {sc['start']:5d}  {sc['dur'] / FPS:4.1f}s")
    print('total', total, 'frames =', round(total / FPS, 1), 's')


if __name__ == '__main__':
    main(sys.argv[1])
