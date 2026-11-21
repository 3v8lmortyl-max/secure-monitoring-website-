"""STARDUST soundtrack: procedural cinematic score + Kokoro narration, locked to src/stardust/timeline.ts.

  node scripts/stardust_timeline.mjs > /tmp/sd.json
  python scripts/stardust_audio.py /tmp/sd.json /path/to/kokoro-dir
  REEL=1 python scripts/stardust_audio.py ...   # Instagram cut: narration only + closing CTA -> stardust-reel.mp3
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
from generate_audio import SR, impact, lowpass, riser, t_, to_sr, trim  # noqa: E402

rng = np.random.default_rng(11)
FPS = 30
NOTE = lambda n: 440.0 * 2 ** ((n - 69) / 12)  # MIDI -> Hz


def at(f):
    return int(f / FPS * SR)


def env_ar(n, a, r):
    e = np.ones(n, np.float32)
    ai, ri = int(a * SR), int(r * SR)
    if ai: e[:ai] = np.linspace(0, 1, ai)
    if ri: e[-ri:] *= np.linspace(1, 0, ri)
    return e


def pad(notes, dur, a=2.0, r=2.5, bright=0.35):
    """Warm detuned pad: stacked sines with soft upper partials and slow vibrato."""
    t = t_(dur)
    y = np.zeros(len(t), np.float32)
    for n in notes:
        f = NOTE(n)
        for det in (-0.12, 0.0, 0.11):
            ff = f * 2 ** (det / 12)
            y += np.sin(2 * np.pi * ff * t + 3 * det) * 0.5
            y += bright * 0.3 * np.sin(2 * np.pi * ff * 2 * t + det)
            y += bright * 0.12 * np.sin(2 * np.pi * ff * 3 * t)
    y *= (0.85 + 0.15 * np.sin(2 * np.pi * 0.2 * t))
    return (y / (np.abs(y).max() + 1e-9) * env_ar(len(t), a, r)).astype(np.float32)


def pluck(n, dur=1.6, bright=1.0):
    t = t_(dur)
    f = NOTE(n)
    y = np.sin(2 * np.pi * f * t) + 0.35 * bright * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 6) + 0.15 * np.sin(2 * np.pi * 3.01 * f * t) * np.exp(-t * 9)
    return (y * np.exp(-t * 2.6) * np.minimum(1, t / 0.004)).astype(np.float32)


def drone(dur, base=38):
    t = t_(dur)
    y = np.sin(2 * np.pi * NOTE(base) * t) + 0.6 * np.sin(2 * np.pi * NOTE(base + 7) * t * 1.001) + 0.25 * np.sin(2 * np.pi * NOTE(base + 12) * t)
    y *= 0.75 + 0.25 * np.sin(2 * np.pi * 0.07 * t)
    return (y / 1.85).astype(np.float32)


def shimmer(dur, density=6):
    """Sparse high glassy plinks: stars twinkling."""
    out = np.zeros(int(dur * SR), np.float32)
    for _ in range(int(dur * density)):
        s = int(rng.uniform(0, dur - 1.5) * SR)
        n = rng.choice([86, 88, 90, 93, 95, 98, 100])
        p = pluck(n, 1.4, 0.3) * rng.uniform(0.08, 0.2)
        out[s:s + len(p)] += p
    return out


def heartbeat(dur, bpm=76):
    out = np.zeros(int(dur * SR), np.float32)
    k = t_(0.5)
    kick = (np.sin(2 * np.pi * (42 + 70 * np.exp(-k * 25)) * k) * np.exp(-k * 7)).astype(np.float32)
    beat = 60 / bpm
    for i in range(int(dur / beat)):
        g = 0.4 + 0.6 * i / max(1, dur / beat)  # crescendo
        for off, amp in ((0, 1.0), (0.22, 0.55)):  # lub-dub
            s = int((i * beat + off) * SR)
            if s + len(kick) < len(out):
                out[s:s + len(kick)] += kick * amp * g
    return out


def reverse_suck(dur):
    r = riser(dur)
    t = t_(dur)
    tone = np.sin(2 * np.pi * np.cumsum(900 * (1 - t / dur) ** 2 + 60) / SR) * (t / dur) ** 3 * 0.4
    return (r + tone).astype(np.float32)


def main(tl_path, model_dir, out=os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'stardust.mp3')):
    tl = json.load(open(tl_path))
    B = tl['beats']
    total = tl['total']
    reel = bool(os.environ.get('REEL'))
    if reel:
        total = tl['reelTotal']
        tl['narration'] = tl['narration'] + [tl['reelCta']]
        out = os.path.join(os.path.dirname(out), 'stardust-reel.mp3')
    n = at(total) + SR
    mus = np.zeros(n, np.float32)
    fx = np.zeros(n, np.float32)
    vo = np.zeros(n, np.float32)

    def put(buf, clip, frame, g=1.0):
        s = max(at(frame), 0)
        e = min(s + len(clip), len(buf))
        buf[s:e] += clip[: e - s] * g

    bang, nova = B['bang'], B['nova']
    # I. singularity: low drone + riser into the bang
    put(mus, drone((bang + 10) / FPS) * env_ar(at(bang + 10), 3, 0.1), 0, 0.35)
    put(fx, riser(3.2), bang - 96, 0.7)
    put(fx, impact(4.0), bang, 1.0)
    put(fx, impact(2.0), bang + 2, 0.6)
    # cosmic web: D minor add9 pad + twinkles
    put(mus, pad([50, 57, 62, 64, 65], (560 - bang) / FPS, a=3, r=3), bang + 10, 0.5)
    put(mus, shimmer((560 - bang) / FPS, 3), bang + 40, 1.0)
    put(mus, drone((870 - 170) / FPS, 38) * env_ar(at(700), 4, 1), 170, 0.22)
    # ignition: bright swell
    put(mus, pad([62, 66, 69, 74, 76], 6.0, a=1.2, r=2.5, bright=0.6), 515, 0.45)
    put(fx, pluck(86, 3.0, 0.4) + pluck(93, 3.0, 0.4), 530, 0.35)
    # stellar forge: heartbeat crescendo + tension pad
    put(mus, heartbeat((B['collapse'][0] - 640) / FPS), 640, 0.75)
    put(mus, pad([46, 53, 58, 62, 69], (B['collapse'][0] - 640) / FPS, a=2.5, r=0.8, bright=0.5), 640, 0.4)
    for i, f in enumerate(range(B['giant'][0] + 10, B['collapse'][1], 18)):  # element tiles appear
        put(fx, pluck(74 + [0, 2, 5, 7, 9, 12][i % 6], 0.8, 0.8), f, 0.25)
    # collapse: reverse suck, a breath of silence, then supernova
    put(fx, reverse_suck((nova - 3 - B['collapse'][0] + 20) / FPS), B['collapse'][0] - 20, 0.8)
    put(fx, impact(5.0), nova, 1.15)
    put(fx, impact(3.0), nova + 3, 0.7)
    put(mus, shimmer(4.0, 14), nova + 6, 1.4)
    put(mus, pad([38, 45, 50, 57], 5.0, a=0.05, r=4.0, bright=0.2), nova, 0.45)
    # new world: warm progression + gentle arpeggio
    prog = [([53, 60, 65, 67, 69], 1000), ([48, 55, 60, 64, 67], 1110), ([50, 57, 62, 65, 69], 1220), ([46, 53, 58, 62, 65], 1330)]
    for notes, f0 in prog:
        put(mus, pad(notes, 4.6, a=1.5, r=1.8), f0, 0.42)
    arp = [65, 69, 72, 76, 72, 69, 67, 72, 76, 79, 76, 72]
    for i, f in enumerate(range(1010, 1440, 11)):
        put(mus, pluck(arp[i % len(arp)], 1.6), f, 0.22)
    # finale: big D-major add9 swell as the words form, shimmer on the last line
    put(mus, pad([38, 50, 57, 62, 66, 69, 76], (total - 1380) / FPS + 1, a=2.0, r=3.5, bright=0.55), 1380, 0.6)
    put(fx, riser(2.4), B['textIn'][1] - 72, 0.35)
    put(mus, shimmer(4.0, 8), B['textIn'][1], 1.2)
    put(fx, pluck(86, 4.0, 0.3) + pluck(90, 4.0, 0.3) + pluck(93, 4.0, 0.3), 1478, 0.3)

    # narration: calm, slightly slow female voice
    k = Kokoro(os.path.join(model_dir, 'kokoro-v1.0.onnx'), os.path.join(model_dir, 'voices-v1.0.bin'))
    cursor = 0
    for f, text in tl['narration']:
        a, sr = k.create(text, voice=os.environ.get('VOICE', 'af_heart'), speed=0.92, lang='en-us')
        clip = to_sr(trim(a), sr)
        s = max(at(f), cursor + int(0.1 * SR))
        e = min(s + len(clip), n)
        vo[s:e] += clip[: e - s]
        cursor = e
        print(f'{f:5d} {len(clip) / SR:4.1f}s  {text}')

    vo /= np.abs(vo).max() + 1e-9
    if reel:  # narration only: no score, no sound effects
        mus[:] = 0
        fx[:] = 0
    mus /= np.abs(mus).max() + 1e-9
    fx /= np.abs(fx).max() + 1e-9
    envv = np.convolve(np.abs(vo), np.ones(9600) / 9600, mode='same')
    duck = 1 - 0.45 * np.clip(envv / (envv.max() + 1e-9) * 4, 0, 1)
    mix = vo * 0.95 + mus * 0.42 * duck + fx * 0.55
    fade = np.ones(n, np.float32)
    fade[at(total - 40):] = np.linspace(1, 0, n - at(total - 40))
    mix = np.tanh(mix * fade * 1.15) / np.tanh(1.15)
    # gentle stereo width: delayed, slightly filtered copy on the right for music/fx
    wide = np.roll(mus * 0.42 * duck + fx * 0.55, int(0.012 * SR)) * fade
    left, right = mix, np.tanh((vo * 0.95 + wide) * fade * 1.15) / np.tanh(1.15)
    stereo = np.stack([left, right], axis=1)[: at(total)]
    with tempfile.TemporaryDirectory() as d:
        w = os.path.join(d, 'm.wav')
        sf.write(w, stereo, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w, '-af', 'highpass=f=28,acompressor=threshold=-20dB:ratio=2.5:attack=10:release=200,loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', str(SR), '-b:a', '256k', out], check=True)
    print('wrote', os.path.abspath(out))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
