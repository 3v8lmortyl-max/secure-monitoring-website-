"""Build public/audio/soundtrack.mp3: Kokoro voice-over + synthesized SFX, synced to the video.

Free and offline: voice = Kokoro-82M (Apache-2.0) via kokoro-onnx, SFX = procedurally generated.

  pip install kokoro-onnx soundfile numpy
  # model files: https://github.com/thewh1teagle/kokoro-onnx/releases (kokoro-v1.0.onnx, voices-v1.0.bin)
  node scripts/timeline.mjs > /tmp/timeline.json
  python scripts/generate_audio.py /tmp/timeline.json /path/to/kokoro-dir

Requires ffmpeg on PATH for the final loudness-normalised mp3.
"""
import json
import os
import re
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

FPS = 30
SR = 48000
TOTAL_FRAMES = 3095
VOICE = os.environ.get('VOICE', 'am_michael')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'soundtrack.mp3')
rng = np.random.default_rng(7)

# ---------------------------------------------------------------- narration
# Spoken text per on-screen caption (fixes pronunciation and adds emotion through punctuation).
SAY = {
    'CLAUDE CODE developers are canceling their $200 plan': 'Claude Code developers are cancelling their two-hundred-dollar plan!',
    'Because one developer quitely dropped a free tool': 'Because one developer quietly dropped a free tool...',
    'that permanently solved': 'that permanently solved',
    'the biggest token problem forever': 'the biggest token problem. Forever.',
    "Here's the massive problem": "Here's the massive problem",
    'On a large project that is 10s of 1000s of tokens burned': 'On a large project, that is tens of thousands of tokens. Burned.',
    'before you type a single word': 'before you type a single word!',
    'claude has to re-read your entire codebase from scratch': 'Claude has to re-read your entire codebase... from scratch.',
    'The saving hits 71x per session': 'The saving hits seventy-one x, per session!',
    '$20 > $200': 'Twenty dollars beats two hundred.',
    'Without paying a dollar more': 'Without paying a dollar more!',
    'It works with': 'It works with Claude Code, Cursor, Gemini, and more.',
    'Updates automatically everytime your code changes': 'Updates automatically, every time your code changes.',
    'claude code for free': 'Claude Code. For free.',
    'every AI user still has': 'every A.I. user still has.',
    'The numbers are wild': 'And the numbers are wild!',
    'No privacy risk': 'No privacy risk.',
}
# Extra lines for scenes whose key text lives in the visual, not in captions.
EXTRA = [
    {'type': 'voice', 'scene': 'logo', 'offset': 6, 'text': 'Graphify!'},
    {'type': 'voice', 'scene': 'stat', 'offset': 2, 'text': 'Forty-nine x...'},
]
# Delivery per scene: (speed, gain). Faster + louder = excited; slower + softer = serious / intimate.
STYLE = {
    'hook': (1.12, 1.1), 'dropped': (1.08, 1.0), 'logo': (1.0, 1.15), 'problem': (0.98, 1.0),
    'reread': (1.08, 1.0), 'tokens': (1.05, 1.0), 'fixes': (1.0, 1.05), 'scans': (1.08, 1.0),
    'maps': (1.15, 0.95), 'privacy': (0.95, 0.85), 'next': (1.08, 1.0), 'answer': (1.05, 1.0),
    'stat': (1.05, 1.15), 'saving': (1.05, 1.1), 'price': (1.0, 1.1), 'works': (1.12, 1.0),
    'install': (1.12, 1.0), 'outro-hook': (1.05, 1.05), 'cta': (1.05, 1.1),
}


def spoken(text):
    if text in SAY:
        return SAY[text]
    t = text.replace('“', '').replace('”', '').replace('everytime', 'every time')
    t = re.sub(r'(\d+)x', lambda m: m.group(1) + ' x', t)
    return t if t[-1] in '.!?,' else t + '.'


def to_sr(a, sr_in):
    n = int(len(a) * SR / sr_in)
    return np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a).astype(np.float32)


def trim(a, thr=0.01):
    idx = np.where(np.abs(a) > thr)[0]
    return a[max(idx[0] - 200, 0): idx[-1] + 1200] if len(idx) else a


# ---------------------------------------------------------------- SFX synthesis
def t_(dur):
    return np.arange(int(dur * SR)) / SR


def lowpass(x, cutoff):
    """One-pole low-pass with a per-sample cutoff (Hz) array or scalar."""
    c = np.broadcast_to(np.asarray(cutoff, dtype=np.float64), x.shape)
    a = 1 - np.exp(-2 * np.pi * c / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def whoosh(dur=0.5, up=True):
    t = t_(dur)
    p = t / dur
    env = np.sin(np.pi * p) ** 2
    cut = 300 + 5000 * (p if up else 1 - p) ** 1.5
    n = rng.standard_normal(len(t))
    y = lowpass(n, cut) - lowpass(n, 150)
    return (y * env / (np.abs(y).max() + 1e-9) * 0.5).astype(np.float32)


def pop(f0=880, f1=420, dur=0.09):
    t = t_(dur)
    f = f0 + (f1 - f0) * t / dur
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 45)
    return (y * 0.45).astype(np.float32)


def tick(dur=0.03):
    t = t_(dur)
    return (np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 220) * 0.25).astype(np.float32)


def impact(dur=1.2):
    t = t_(dur)
    sub = np.sin(2 * np.pi * (45 + 40 * np.exp(-t * 12)) * t) * np.exp(-t * 3.5)
    n = lowpass(rng.standard_normal(len(t)), 900) * np.exp(-t * 18)
    return ((sub * 0.8 + n * 0.6) * 0.6).astype(np.float32)


def ding(f=1318.5, dur=1.0):
    t = t_(dur)
    y = sum(a * np.sin(2 * np.pi * f * m * t) for m, a in [(1, 1), (2.01, 0.35), (3.02, 0.15)])
    return (y * np.exp(-t * 4) * 0.22).astype(np.float32)


def riser(dur=2.2):
    t = t_(dur)
    p = t / dur
    n = lowpass(rng.standard_normal(len(t)), 400 + 7000 * p ** 2)
    tone = np.sin(2 * np.pi * np.cumsum(200 + 600 * p ** 2) / SR) * 0.3
    return ((n * 0.5 + tone) * p ** 2 * 0.5).astype(np.float32)


def typing(dur=1.6):
    out = np.zeros(int(dur * SR), np.float32)
    pos = 0
    while pos < len(out) - 2000:
        c = lowpass(rng.standard_normal(500), 3500) * np.exp(-np.arange(500) / 60)
        out[pos:pos + 500] += (c * rng.uniform(0.12, 0.25)).astype(np.float32)
        pos += int(rng.uniform(0.06, 0.16) * SR)
    return out


# ---------------------------------------------------------------- mix
def main(timeline_path, model_dir, total_frames=TOTAL_FRAMES, out=OUT):
    events = json.load(open(timeline_path))
    scenes = {e['scene']: e for e in events if e['type'] == 'cut'}
    for x in (EXTRA if 'reread' in scenes else []):
        events.append({**x, 'frame': scenes[x['scene']]['frame'] + x['offset']})
    events.sort(key=lambda e: e['frame'])
    speech = [e for e in events if e['type'] in ('voice', 'bullet')]

    n = int(total_frames / FPS * SR) + SR
    vo = np.zeros(n, np.float32)
    fx = np.zeros(n, np.float32)

    def place(buf, clip, frame, gain=1.0):
        s = max(int(frame / FPS * SR), 0)
        e = min(s + len(clip), len(buf))
        buf[s:e] += clip[: e - s] * gain

    k = Kokoro(os.path.join(model_dir, 'kokoro-v1.0.onnx'), os.path.join(model_dir, 'voices-v1.0.bin'))
    cursor = 0  # sample index where the previous line ended (no overlapping lines)
    for i, e in enumerate(speech):
        nxt = speech[i + 1]['frame'] if i + 1 < len(speech) else total_frames
        avail = (nxt - e['frame']) / FPS
        speed, gain = STYLE.get(e['scene'], (float(os.environ.get('VO_SPEED', 1.05)), 1.0)) if not os.environ.get('VO_SPEED') else (float(os.environ['VO_SPEED']), 1.0)
        if e['type'] == 'bullet':
            speed = max(speed, 1.1)
        text = spoken(e['text'])
        nx = speech[i + 1] if i + 1 < len(speech) else None
        if nx and nx['scene'] == e['scene'] and nx['text'][:1].islower() and text.endswith('.') and not text.endswith('..'):
            text = text[:-1] + ','  # sentence continues in the next caption: keep the intonation up
        for _ in range(4):  # speed up until the line fits before the next cue (max 1.45x)
            a, sr = k.create(text, voice=VOICE, speed=speed, lang='en-us')
            a = trim(a)
            if len(a) / sr <= avail + 0.25 or speed >= 1.45:
                break
            speed = min(1.45, speed * (len(a) / sr) / max(avail, 0.4))
        clip = to_sr(a, sr)
        start = max(int(e['frame'] / FPS * SR), cursor + int(0.04 * SR))
        end = min(start + len(clip), n)
        vo[start:end] += clip[: end - start] * gain
        cursor = end
        print(f"{e['frame']:5d} {speed:.2f}x {len(clip) / SR:4.1f}s/{avail:4.1f}s  {text}")

    # sound design
    for e in events:
        f, sc = e['frame'], e.get('scene')
        if e['type'] == 'cut' and f > 0:
            place(fx, whoosh(0.45), f - 9, 0.55)
        if e['type'] == 'bullet':
            place(fx, pop(), f, 0.6)
    generic = {'impact': lambda: (impact(), 0.8), 'ding': lambda: (ding(1318.5), 0.75), 'typing': lambda: (typing(1.5), 0.5),
               'riser': lambda: (riser(2.2), 0.6), 'pop': lambda: (pop(), 0.6), 'alert': lambda: (ding(880, 0.6), 0.6)}
    for e in events:
        if e['type'] != 'sfx':
            continue
        if e['sfx'] == 'ticks':
            for j in range(8):
                place(fx, tick(), e['frame'] + j * 3, 0.8)
        elif e['sfx'] == 'alert':  # two-tone alert chime
            place(fx, ding(880, 0.5), e['frame'], 0.6)
            place(fx, ding(1174.7, 0.6), e['frame'] + 6, 0.6)
        else:
            clip, g = generic[e['sfx']]()
            place(fx, clip, e['frame'] - (66 if e['sfx'] == 'riser' else 0), g)
    if 'reread' in scenes:  # explainer-specific sound design
        explainer_sfx(place, fx, scenes)
    mix_and_write(vo, fx, total_frames, out)


def explainer_sfx(place, fx, scenes):
    place(fx, impact(), 0, 0.9)                                   # hook hit
    place(fx, whoosh(0.6, up=False), 263, 0.5)                    # logo reveal
    place(fx, ding(1046.5), scenes['logo']['frame'] + 16, 0.8)
    place(fx, impact(0.9), scenes['problem']['frame'] + 2, 0.6)   # "massive problem"
    place(fx, typing(1.8), scenes['reread']['frame'] + 6, 0.5)    # terminal
    place(fx, typing(1.2), scenes['next']['frame'] + 6, 0.45)
    for j in range(8):                                            # 41x -> 49x counter
        place(fx, tick(), scenes['stat']['frame'] + 4 + j * 3, 0.8)
    place(fx, impact(), scenes['stat']['frame'] + 26, 0.75)
    place(fx, ding(1318.5), scenes['saving']['frame'] + 30, 0.8)  # 71x
    place(fx, ding(1568.0), scenes['price']['frame'] + 4, 0.7)    # $20 > $200
    for j, d in enumerate([30, 54, 78, 96]):                      # "It works with" icons
        place(fx, pop(1100 + j * 120, 600), scenes['works']['frame'] + d, 0.6)
    place(fx, riser(2.2), scenes['cta']['frame'] - 66, 0.6)       # build into the CTA
    place(fx, impact(), scenes['cta']['frame'], 0.8)
    place(fx, ding(1046.5, 1.6), scenes['follow']['frame'] + 6, 0.7)


def music_bed(n, bpm=96):
    """Dark, minimal corporate bed: sustained minor pad + soft sub pulse + quiet hats."""
    t = np.arange(n) / SR
    beat = 60 / bpm
    bar = beat * 4
    chords = [[110.0, 130.81, 164.81], [87.31, 110.0, 130.81], [98.0, 123.47, 146.83], [82.41, 103.83, 123.47]]  # Am F G E
    pad = np.zeros(n, np.float32)
    for ci in range(int(t[-1] / bar) + 1):
        s0, s1 = int(ci * bar * SR), min(int((ci + 1) * bar * SR), n)
        tt = t[s0:s1] - ci * bar
        env = np.minimum(1, tt / 0.6) * np.minimum(1, (bar - tt) / 0.6)
        for f in chords[ci % 4]:
            for h, a in [(1, 1), (2, 0.25), (0.5, 0.5)]:
                pad[s0:s1] += (a * np.sin(2 * np.pi * f * h * tt + h) * env * (0.6 + 0.4 * np.sin(2 * np.pi * 0.11 * tt))).astype(np.float32)
    pulse = np.zeros(n, np.float32)
    k = t_(0.35)
    kick = (np.sin(2 * np.pi * (50 + 60 * np.exp(-k * 30)) * k) * np.exp(-k * 9)).astype(np.float32)
    hat = (lowpass(rng.standard_normal(1600), 9000) - lowpass(rng.standard_normal(1600), 4000)).astype(np.float32) * np.exp(-np.arange(1600) / 250).astype(np.float32)
    for b in range(int(t[-1] / beat)):
        s0 = int(b * beat * SR)
        if s0 + len(kick) < n:
            pulse[s0:s0 + len(kick)] += kick * 0.9
        h0 = int((b + 0.5) * beat * SR)
        if h0 + len(hat) < n and b > 8:
            pulse[h0:h0 + len(hat)] += hat * 0.12
    bed = pad / (np.abs(pad).max() + 1e-9) * 0.5 + pulse * 0.45
    fade = np.minimum(1, t / 2.0) * np.minimum(1, (t[-1] - t) / 2.5)
    return (bed * fade).astype(np.float32)


def mix_and_write(vo, fx, total_frames, out):
    vo /= np.abs(vo).max() + 1e-9
    mix = vo * 0.9 + fx * 0.55
    if os.environ.get('MUSIC'):
        bed = music_bed(len(vo))
        env = np.convolve(np.abs(vo), np.ones(4800) / 4800, mode='same')  # duck the bed under the voice
        duck = 1 - 0.55 * np.clip(env / (env.max() + 1e-9) * 4, 0, 1)
        mix = mix + bed * duck * 0.22
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)  # gentle soft-clip glue
    stereo = np.stack([mix, mix], axis=1)[: int(total_frames / FPS * SR)]

    os.makedirs(os.path.dirname(out), exist_ok=True)
    with tempfile.TemporaryDirectory() as d:
        wav = os.path.join(d, 'mix.wav')
        sf.write(wav, stereo, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav,
                        '-af', 'highpass=f=60,acompressor=threshold=-18dB:ratio=3:attack=5:release=120,loudnorm=I=-14:TP=-1.5:LRA=9',
                        '-ar', str(SR), '-b:a', '192k', out], check=True)
    print('wrote', os.path.abspath(out))


if __name__ == '__main__':
    # optional: total frames and output path (e.g. for the Promo composition)
    main(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else TOTAL_FRAMES, sys.argv[4] if len(sys.argv) > 4 else OUT)
