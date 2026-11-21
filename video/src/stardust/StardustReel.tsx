/**
 * STARDUST: vertical Instagram Reel cut (1080x1920). Same 3D film re-framed for 9:16
 * (wider lens, camera pulled back, smaller particle typography), narration-only soundtrack,
 * titles kept inside Instagram's safe zone, and a closing call to action.
 */
import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CameraRig, Particles, Planet, Shockwave, Starfield, Sun} from './Universe';
import {ELEMENTS, Flash, FONT, Singularity} from './Stardust';
import {REEL_CTA, REEL_FADE, smooth, T} from './timeline';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const SAFE_BOTTOM = 520; // keep text above Instagram's caption / buttons

const Title: React.FC<{a: number; b: number; kicker: string; title?: string; top?: number}> = ({a, b, kicker, title, top}) => {
  const f = useCurrentFrame();
  if (f < a || f > b) return null;
  const o = interpolate(f, [a, a + 18, b - 18, b], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        ...(top !== undefined ? {top} : {bottom: SAFE_BOTTOM}),
        textAlign: 'center',
        opacity: o,
        fontFamily: FONT,
        color: '#F4F1EA',
        transform: `translateY(${(1 - o) * 14}px)`,
      }}
    >
      <div style={{fontSize: 26, letterSpacing: `${interpolate(f, [a, b], [0.45, 0.56])}em`, fontWeight: 500, color: 'rgba(244,241,234,0.75)'}}>{kicker}</div>
      {title ? <div style={{fontSize: 76, fontWeight: 200, marginTop: 16}}>{title}</div> : null}
    </div>
  );
};

const Forge: React.FC = () => {
  const f = useCurrentFrame();
  const [a, b] = [T.giant[0] + 10, T.collapse[1]];
  if (f < a || f > b + 10) return null;
  const out = interpolate(f, [b - 12, b + 6], [1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 260, display: 'flex', justifyContent: 'center', opacity: out}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 170px)', gap: 18}}>
        {ELEMENTS.map(([sym, z, name, col], i) => {
          const p = interpolate(f, [a + i * 18, a + i * 18 + 14], [0, 1], clamp);
          return (
            <div
              key={sym}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 20}px) scale(${0.9 + p * 0.1})`,
                height: 170,
                borderRadius: 16,
                border: `1px solid ${col}66`,
                background: 'rgba(10,12,20,0.45)',
                boxShadow: `0 0 30px ${col}33, inset 0 0 20px ${col}22`,
                padding: '14px 18px',
                fontFamily: FONT,
                color: '#F4F1EA',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{fontSize: 20, color: col}}>{z}</div>
              <div style={{fontSize: 66, fontWeight: 300, lineHeight: 1, color: col}}>{sym}</div>
              <div style={{fontSize: 17, letterSpacing: '0.12em', color: 'rgba(244,241,234,0.7)'}}>{name.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Closing call to action: Comment "STARDUST". */
const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const a = REEL_CTA[0];
  const o = interpolate(f, [a - 6, a + 14, REEL_FADE[0], REEL_FADE[1]], [0, 1, 1, 0], clamp);
  const word = interpolate(f, [a + 36, a + 56], [0, 1], clamp);
  const pulse = 1 + 0.03 * Math.sin((f - a) / 6);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: SAFE_BOTTOM - 40, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: o, fontFamily: FONT, color: '#F4F1EA'}}>
      <div style={{fontSize: 34, fontWeight: 300, letterSpacing: '0.04em', color: 'rgba(244,241,234,0.85)', textAlign: 'center', lineHeight: 1.35}}>
        Want the full explanation video?
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 34, transform: `scale(${pulse})`}}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffd98a" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5A8.4 8.4 0 1 1 21 11.5z" />
        </svg>
        <div style={{fontSize: 40, fontWeight: 400}}>Comment</div>
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: '#ffd98a',
          textShadow: '0 0 40px rgba(255,200,110,0.55)',
          opacity: word,
          transform: `translateY(${(1 - word) * 20}px) scale(${0.92 + word * 0.08})`,
        }}
      >
        “STARDUST”
      </div>
    </div>
  );
};

export const StardustReel: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => {
  const frame = useCurrentFrame();
  const subtitle = interpolate(frame, [1452, 1480, REEL_CTA[0] - 20, REEL_CTA[0] - 4], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {withAudio ? <Audio src={staticFile('audio/stardust-reel.mp3')} /> : null}
      <ThreeCanvas width={1080} height={1920} camera={{fov: 62, near: 0.1, far: 1000, position: [0, 0, 7]}} gl={{antialias: true}}>
        <color attach="background" args={['#020308']} />
        <CameraRig frame={frame} dist={1.12} />
        <Starfield frame={frame} fade={REEL_FADE} />
        <Sun frame={frame} />
        <Planet frame={frame} />
        <Shockwave frame={frame} />
        <Particles frame={frame} fade={REEL_FADE} textScale={0.85} />
      </ThreeCanvas>

      <Singularity />
      <Flash at={T.bang} len={26} color="#fff6e8" />
      <Flash at={T.nova} len={18} color="#e6f0ff" />

      <Title a={20} b={140} kicker="13.8 BILLION YEARS AGO" />
      <Title a={330} b={460} kicker="I · THE COSMIC WEB" title="Hydrogen, everywhere." />
      <Title a={565} b={690} kicker="II · THE FIRST STARS" title="Light ignites." />
      <Title a={700} b={850} kicker="III · THE STELLAR FORGE" title="Atoms are made." />
      <Forge />
      <Title a={895} b={1000} kicker="IV · SUPERNOVA" title="Scattered into the dark." />
      <Title a={1110} b={1250} kicker="V · A NEW WORLD" title="The dust remembers." />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: SAFE_BOTTOM + 40, textAlign: 'center', opacity: subtitle, fontFamily: FONT, color: 'rgba(244,241,234,0.85)', fontSize: 38, fontWeight: 300}}>
        Every atom in you was forged in a star.
      </div>
      <Cta />

      <AbsoluteFill style={{background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)'}} />
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'screen'}}>
        <filter id="sdrgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves={2} seed={frame % 24} />
        </filter>
        <rect width="100%" height="100%" filter="url(#sdrgrain)" />
      </svg>
      <AbsoluteFill style={{background: '#000', opacity: interpolate(frame, [0, 12], [1, 0], clamp) + smooth(frame, REEL_FADE[0] + 20, REEL_FADE[1])}} />
    </AbsoluteFill>
  );
};
