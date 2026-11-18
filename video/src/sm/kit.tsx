/**
 * Secure Monitoring design kit: dark "security operations" aesthetic.
 * Brand: official SM logo (public/brand), navy/blue + signal red, Geist / Geist Mono.
 */
import React, {createContext, useContext} from 'react';
import {AbsoluteFill, continueRender, delayRender, Easing, interpolate, random, staticFile, useCurrentFrame} from 'remotion';

if (typeof document !== 'undefined') {
  const handle = delayRender('Loading Geist');
  Promise.all(
    [
      ['Inter', 'fonts/Inter.woff2'],
      ['Geist Mono', 'fonts/GeistMono.woff2'],
    ].map(([family, file]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {weight: '100 900'});
      document.fonts.add(face);
      return face.load();
    })
  )
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
}

/* Brand sheet: primary #2563EB, accent #1D4ED8, background #0B1220, text #F8FAFC, Inter. */
export const SM = {
  bg: '#0B1220',
  bg2: '#0F1A2E',
  text: '#F8FAFC',
  muted: '#94A3B8',
  dim: '#475569',
  line: 'rgba(148,163,184,0.14)',
  glass: 'rgba(15,26,46,0.72)',
  blue: '#1D4ED8',
  blueHi: '#2563EB',
  glow: '#3B82F6',
  red: '#EF4444',
  green: '#22C55E',
  font: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1); // expo-out: calm, premium
export const s = (sec: number) => Math.round(sec * 30);

const SceneCtx = createContext({duration: 90});
export const useSceneDuration = () => useContext(SceneCtx).duration;

/* ------------------------------------------------------------------ background */
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.15;
  const seed = Math.floor(frame / 2);
  return (
    <AbsoluteFill style={{background: SM.bg}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(70% 45% at ${50 + Math.sin(frame / 90) * 8}% 38%, rgba(37,99,235,0.30) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)`,
        }}
      />
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMax slice" style={{position: 'absolute', opacity: 0.55}}>
        {Array.from({length: 14}).map((_, i) => {
          const y = 1500 + i * 16;
          const ph = drift * 0.02 + i * 0.35;
          return (
            <path
              key={i}
              d={`M -50 ${y + Math.sin(ph) * 40} C 300 ${y - 160 + Math.cos(ph) * 50}, 700 ${y + 120 + Math.sin(ph) * 50}, 1130 ${y - 260 + Math.cos(ph) * 40}`}
              fill="none"
              stroke={SM.blueHi}
              strokeOpacity={0.05 + (i / 14) * 0.2}
              strokeWidth={1.2}
            />
          );
        })}
      </svg>
      {/* film grain */}
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.07, mixBlendMode: 'screen'}}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)'}} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ HUD */
export const Hud: React.FC<{cam?: string; show?: boolean}> = ({cam = 'CAM 04', show = true}) => {
  const frame = useCurrentFrame();
  if (!show) return null;
  const o = interpolate(frame, [0, 12], [0, 1], clamp);
  const sec = 14 * 60 + Math.floor(frame / 30);
  const tc = `02:${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}:${String(frame % 30).padStart(2, '0')}`;
  const br = (style: React.CSSProperties) => <div style={{position: 'absolute', width: 54, height: 54, borderColor: 'rgba(244,241,234,0.55)', borderStyle: 'solid', borderWidth: 0, ...style}} />;
  return (
    <AbsoluteFill style={{opacity: o, fontFamily: SM.mono, color: SM.text, fontSize: 24, letterSpacing: '0.08em'}}>
      {br({top: 64, left: 56, borderTopWidth: 3, borderLeftWidth: 3})}
      {br({top: 64, right: 56, borderTopWidth: 3, borderRightWidth: 3})}
      {br({bottom: 64, left: 56, borderBottomWidth: 3, borderLeftWidth: 3})}
      {br({bottom: 64, right: 56, borderBottomWidth: 3, borderRightWidth: 3})}
      <div style={{position: 'absolute', top: 92, left: 96, display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width: 14, height: 14, borderRadius: 7, background: SM.red, opacity: Math.floor(frame / 15) % 2 ? 0.25 : 1}} />
        REC
      </div>
      <div style={{position: 'absolute', top: 92, right: 96, color: SM.muted}}>{cam}</div>
      <div style={{position: 'absolute', bottom: 92, left: 96, color: SM.muted}}>{tc}</div>
      <div style={{position: 'absolute', bottom: 92, right: 96, color: SM.muted}}>LIVE</div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ text */
type Tok = {t: string; style: 'n' | 'blue' | 'red' | 'muted'};
const tokenize = (line: string): Tok[] =>
  line.split(' ').filter(Boolean).map((w) => {
    if (/^\*.+\*$/.test(w)) return {t: w.slice(1, -1), style: 'blue'};
    if (/^\^.+\^$/.test(w)) return {t: w.slice(1, -1), style: 'red'};
    if (/^_.+_$/.test(w)) return {t: w.slice(1, -1), style: 'muted'};
    return {t: w, style: 'n'};
  });

/**
 * Masked word reveal: each word rises out of a clipping line, staggered.
 * Markup: *blue*  ^red^  _muted_
 */
export const Reveal: React.FC<{
  lines: string[];
  at?: number;
  out?: number;
  size?: number;
  weight?: number;
  align?: 'center' | 'left';
  stagger?: number;
  lineHeight?: number;
  tracking?: string;
  color?: string;
}> = ({lines, at = 0, out, size = 96, weight = 600, align = 'center', stagger = 3, lineHeight = 1.06, tracking = '-0.035em', color = SM.text}) => {
  const frame = useCurrentFrame();
  const exit = out !== undefined ? interpolate(frame, [out - 8, out], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)}) : 0;
  let k = 0;
  return (
    <div
      style={{
        fontFamily: SM.font,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: tracking,
        lineHeight,
        textAlign: align,
        color,
        opacity: 1 - exit,
        transform: `translateY(${-exit * 24}px)`,
        filter: exit ? `blur(${exit * 6}px)` : undefined,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', columnGap: '0.24em'}}>
          {tokenize(line).map((tok, ti) => {
            const st = at + k++ * stagger;
            const p = interpolate(frame, [st, st + 16], [0, 1], {...clamp, easing: ease});
            const c = tok.style === 'blue' ? SM.glow : tok.style === 'red' ? SM.red : tok.style === 'muted' ? SM.muted : color;
            return (
              <span key={ti} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em'}}>
                <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 105}%)`, opacity: p > 0 ? 1 : 0, color: c}}>{tok.t}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Small mono overline label with a leading rule, e.g. "— 01 / PROCESS". */
export const Label: React.FC<{text: string; at?: number; color?: string; align?: 'center' | 'left'}> = ({text, at = 0, color = SM.glow, align = 'center'}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 18], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: 18, fontFamily: SM.mono, fontSize: 26, letterSpacing: '0.22em', color, opacity: p}}>
      <div style={{width: 60 * p, height: 2, background: color}} />
      {text}
    </div>
  );
};

/* ------------------------------------------------------------------ motion helpers */
export const Rise: React.FC<{at?: number; dist?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at = 0, dist = 60, children, style}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 22], [0, 1], {...clamp, easing: ease});
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style}}>{children}</div>;
};

/** Scene wrapper: soft zoom-in on enter, blur/fade on exit, plus a light-sweep at the cut. */
export const Scene: React.FC<{duration: number; children: React.ReactNode; hud?: boolean; cam?: string}> = ({duration, children, hud, cam}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 16], [0, 1], {...clamp, easing: ease});
  const exit = interpolate(frame, [duration - 10, duration], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const sweep = interpolate(frame, [0, 14], [-0.2, 1.2], clamp);
  return (
    <SceneCtx.Provider value={{duration}}>
      <AbsoluteFill style={{opacity: enter * (1 - exit), transform: `scale(${1.035 - enter * 0.035 + exit * 0.02})`, filter: exit ? `blur(${exit * 10}px)` : undefined}}>
        {children}
        <Hud show={!!hud} cam={cam} />
      </AbsoluteFill>
      {frame < 16 ? (
        <AbsoluteFill
          style={{
            background: `linear-gradient(100deg, transparent ${sweep * 100 - 12}%, rgba(59,130,246,0.16) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </SceneCtx.Provider>
  );
};

export const rand = (seed: string) => random(seed);
