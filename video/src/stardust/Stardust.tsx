/**
 * STARDUST: a 3D short about the 13.8-billion-year history of the atoms inside you.
 * One continuous 40k-particle system morphs: singularity → big bang → cosmic web → star → supernova
 * → accretion disk → the words "YOU ARE STARDUST". Star and planet surfaces are real-time GLSL.
 */
import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill, Audio, continueRender, delayRender, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CameraRig, Particles, Planet, Shockwave, Starfield, Sun} from './Universe';
import {smooth, T} from './timeline';

if (typeof document !== 'undefined') {
  const h = delayRender('Inter for STARDUST');
  const face = new FontFace('Inter', `url(${staticFile('fonts/Inter.woff2')}) format('woff2')`, {weight: '100 900'});
  document.fonts.add(face);
  face.load().then(() => continueRender(h)).catch(() => continueRender(h));
}

export const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** A title that fades/tracks in and out over [a, b]. */
const Title: React.FC<{a: number; b: number; kicker: string; title?: string; align?: 'left' | 'center'}> = ({a, b, kicker, title, align = 'left'}) => {
  const f = useCurrentFrame();
  if (f < a || f > b) return null;
  const o = interpolate(f, [a, a + 18, b - 18, b], [0, 1, 1, 0], clamp);
  const track = interpolate(f, [a, b], [0.5, 0.62]);
  return (
    <div
      style={{
        position: 'absolute',
        left: align === 'left' ? 150 : 0,
        right: align === 'left' ? undefined : 0,
        bottom: 210,
        textAlign: align,
        opacity: o,
        fontFamily: FONT,
        color: '#F4F1EA',
        transform: `translateY(${(1 - o) * 14}px)`,
      }}
    >
      <div style={{fontSize: 22, letterSpacing: `${track}em`, fontWeight: 500, color: 'rgba(244,241,234,0.7)'}}>{kicker}</div>
      {title ? <div style={{fontSize: 64, fontWeight: 200, letterSpacing: '0.02em', marginTop: 14}}>{title}</div> : null}
    </div>
  );
};

export const ELEMENTS: [string, number, string, string][] = [
  ['H', 1, 'Hydrogen', '#9ec5ff'],
  ['He', 2, 'Helium', '#ffe39e'],
  ['C', 6, 'Carbon', '#ffd36b'],
  ['O', 8, 'Oxygen', '#5ff5d8'],
  ['Si', 14, 'Silicon', '#c4a3ff'],
  ['Fe', 26, 'Iron', '#ff7b55'],
];

const Forge: React.FC = () => {
  const f = useCurrentFrame();
  const [a, b] = [T.giant[0] + 10, T.collapse[1]];
  if (f < a || f > b + 10) return null;
  const out = interpolate(f, [b - 12, b + 6], [1, 0], clamp);
  return (
    <div style={{position: 'absolute', right: 140, top: 250, display: 'grid', gridTemplateColumns: 'repeat(2, 150px)', gap: 18, opacity: out}}>
      {ELEMENTS.map(([sym, z, name, col], i) => {
        const p = interpolate(f, [a + i * 18, a + i * 18 + 14], [0, 1], clamp);
        return (
          <div
            key={sym}
            style={{
              opacity: p,
              transform: `translateY(${(1 - p) * 20}px) scale(${0.9 + p * 0.1})`,
              height: 150,
              borderRadius: 14,
              border: `1px solid ${col}66`,
              background: 'rgba(10,12,20,0.45)',
              boxShadow: `0 0 30px ${col}33, inset 0 0 20px ${col}22`,
              padding: '12px 16px',
              fontFamily: FONT,
              color: '#F4F1EA',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{fontSize: 18, color: col}}>{z}</div>
            <div style={{fontSize: 58, fontWeight: 300, lineHeight: 1, color: col}}>{sym}</div>
            <div style={{fontSize: 16, letterSpacing: '0.12em', color: 'rgba(244,241,234,0.7)'}}>{name.toUpperCase()}</div>
          </div>
        );
      })}
    </div>
  );
};

/** The singularity: a breathing point of light before the bang. */
export const Singularity: React.FC = () => {
  const f = useCurrentFrame();
  if (f > T.bang + 4) return null;
  const grow = interpolate(f, [10, T.bang], [0.4, 1.35], clamp);
  const pulse = 1 + 0.08 * Math.sin(f / 4) + 0.04 * Math.sin(f / 1.7);
  const s = grow * pulse;
  const o = interpolate(f, [8, 40, T.bang, T.bang + 4], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: o, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', width: 900 * s, height: 900 * s, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,190,120,0.22) 0%, rgba(255,120,60,0.08) 30%, transparent 65%)'}} />
      <div style={{position: 'absolute', width: 160 * s, height: 160 * s, borderRadius: '50%', background: 'radial-gradient(circle, #ffffff 0%, rgba(255,236,200,0.9) 12%, rgba(255,170,90,0.35) 40%, transparent 70%)'}} />
      <div style={{position: 'absolute', width: 700 * s, height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,230,200,0.5), transparent)'}} />
    </AbsoluteFill>
  );
};

export const Flash: React.FC<{at: number; len: number; color: string}> = ({at, len, color}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [at - 2, at, at + len], [0, 1, 0], clamp);
  return o > 0 ? <AbsoluteFill style={{background: color, opacity: o, mixBlendMode: 'screen'}} /> : null;
};

const Finale: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [1452, 1480, T.fadeOut[0], T.fadeOut[1]], [0, 1, 1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 190, textAlign: 'center', opacity: o, fontFamily: FONT, color: 'rgba(244,241,234,0.85)', fontSize: 34, fontWeight: 300, letterSpacing: '0.06em'}}>
      Every atom in you was forged in a star.
    </div>
  );
};

export const Stardust: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => {
  const frame = useCurrentFrame();
  const bars = 120;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {withAudio ? <Audio src={staticFile('audio/stardust.mp3')} /> : null}
      <ThreeCanvas width={1920} height={1080} camera={{fov: 40, near: 0.1, far: 1000, position: [0, 0, 7]}} gl={{antialias: true}}>
        <color attach="background" args={['#020308']} />
        <CameraRig frame={frame} />
        <Starfield frame={frame} />
        <Sun frame={frame} />
        <Planet frame={frame} />
        <Shockwave frame={frame} />
        <Particles frame={frame} />
      </ThreeCanvas>

      <Singularity />
      <Flash at={T.bang} len={26} color="#fff6e8" />
      <Flash at={T.nova} len={18} color="#e6f0ff" />

      <Title a={20} b={140} kicker="13.8 BILLION YEARS AGO" align="center" />
      <Title a={330} b={460} kicker="I · THE COSMIC WEB" title="Hydrogen, everywhere." />
      <Title a={565} b={690} kicker="II · THE FIRST STARS" title="Light ignites." />
      <Title a={700} b={850} kicker="III · THE STELLAR FORGE" title="Atoms are made." />
      <Forge />
      <Title a={895} b={1000} kicker="IV · SUPERNOVA" title="Scattered into the dark." />
      <Title a={1110} b={1250} kicker="V · A NEW WORLD" title="The dust remembers." />
      <Finale />

      {/* cinematic grade: vignette + grain + letterbox */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)'}} />
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'screen'}}>
        <filter id="sdgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves={2} seed={frame % 24} />
        </filter>
        <rect width="100%" height="100%" filter="url(#sdgrain)" />
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: bars, background: '#000'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: bars, background: '#000'}} />
      <AbsoluteFill style={{background: '#000', opacity: interpolate(frame, [0, 12], [1, 0], clamp) + smooth(frame, T.fadeOut[0] + 20, T.fadeOut[1])}} />
    </AbsoluteFill>
  );
};
