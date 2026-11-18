import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {clamp, ease, rand, SM, useSceneDuration} from './kit';

/* ------------------------------------------------------------------ official logo */
/** Official logo with a left-to-right mask reveal and a light sheen passing over it. */
export const Logo: React.FC<{width?: number; at?: number; mark?: boolean}> = ({width = 760, at = 0, mark}) => {
  const frame = useCurrentFrame() - at;
  const wipe = interpolate(frame, [0, 26], [0, 100], {...clamp, easing: ease});
  const sheen = interpolate(frame, [18, 48], [-30, 130], clamp);
  const src = staticFile(mark ? 'brand/logo-mark.png' : 'brand/logo.png');
  const ratio = mark ? 155 / 240 : 321 / 600;
  return (
    <div style={{position: 'relative', width, height: width * ratio, filter: 'drop-shadow(0 30px 60px rgba(31,90,166,0.35))'}}>
      <Img src={src} style={{width: '100%', height: '100%', WebkitMaskImage: `linear-gradient(90deg, #000 ${wipe}%, transparent ${wipe + 8}%)`}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: `url(${src})`,
          WebkitMaskSize: '100% 100%',
          background: `linear-gradient(105deg, transparent ${sheen - 12}%, rgba(255,255,255,0.75) ${sheen}%, transparent ${sheen + 12}%)`,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ CCTV feed */
/** Generated night-time store CCTV feed: perspective aisle, shelves, grain, scanlines, timestamp. */
export const CameraFeed: React.FC<{
  w: number;
  h: number;
  seed: string;
  cam: string;
  person?: boolean;
  flag?: number; // frame at which the operator flags the person
  dim?: number;
}> = ({w, h, seed, cam, person, flag, dim = 0}) => {
  const frame = useCurrentFrame();
  const dur = useSceneDuration();
  const pan = interpolate(frame, [0, dur], [0, 1]);
  const px = person ? 300 + pan * 140 : 0; // person walks across the aisle (viewBox units)
  const flagged = flag !== undefined ? interpolate(frame, [flag, flag + 10], [0, 1], {...clamp, easing: ease}) : 0;
  const tint = rand(seed) > 0.5 ? '#9fb3c8' : '#a9bfb0';
  const shelves = Array.from({length: 7});
  return (
    <div style={{position: 'relative', width: w, height: h, overflow: 'hidden', background: '#0b0f14', borderRadius: 6}}>
      <svg width={w} height={h} viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" style={{display: 'block', transform: `scale(${1.04 + pan * 0.05})`}}>
        <defs>
          <linearGradient id={`fl${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a2129" />
            <stop offset="1" stopColor="#2f3a45" />
          </linearGradient>
          <radialGradient id={`lt${seed}`} cx="0.5" cy="0" r="0.8">
            <stop offset="0" stopColor={tint} stopOpacity="0.35" />
            <stop offset="1" stopColor={tint} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill="#141a21" />
        <polygon points="0,400 250,170 390,170 640,400" fill={`url(#fl${seed})`} />
        {[0.25, 0.45, 0.65, 0.85].map((t, i) => (
          <line key={i} x1={250 - 250 * t} y1={170 + 230 * t} x2={390 + 250 * t} y2={170 + 230 * t} stroke="#3a4652" strokeWidth={1} opacity={0.5} />
        ))}
        {/* shelving units, both sides */}
        {[-1, 1].map((side) =>
          shelves.map((_, i) => {
            const t = i / shelves.length;
            const x = side < 0 ? 250 - 250 * (1 - t) : 390 + 250 * (1 - t) - 30 * (1 - t);
            const top = 170 - 150 * (1 - t);
            const height = 230 * (1 - t) + 60;
            const width = 40 * (1 - t) + 8;
            return (
              <g key={`${side}${i}`}>
                <rect x={side < 0 ? x - width : x} y={top} width={width} height={height} fill="#232c36" />
                {[0.2, 0.45, 0.7].map((r, j) => (
                  <rect key={j} x={side < 0 ? x - width : x} y={top + height * r} width={width} height={height * 0.12} fill={rand(`${seed}${i}${j}${side}`) > 0.5 ? '#3c4a58' : '#4a5866'} />
                ))}
              </g>
            );
          })
        )}
        <rect width="640" height="400" fill={`url(#lt${seed})`} />
        {person ? (
          <g transform={`translate(${px},205)`} fill="#c7d0da" opacity={0.85}>
            <circle cx={0} cy={0} r={13} />
            <path d="M-20,18 Q0,8 20,18 L24,96 L12,96 L8,150 L-8,150 L-12,96 L-24,96 Z" />
          </g>
        ) : null}
        {person && flagged > 0 ? (
          <g transform={`translate(${px - 44},178)`} opacity={flagged} stroke={SM.red} strokeWidth={3} fill="none">
            <path d="M0,18 V0 H18 M70,0 H88 V18 M88,170 V188 H70 M18,188 H0 V170" />
            <rect x={0} y={-30} width={150} height={24} fill={SM.red} stroke="none" />
            <text x={8} y={-12} fill="#fff" fontFamily="monospace" fontSize={15} fontWeight={700} stroke="none">
              OPERATOR FLAG
            </text>
          </g>
        ) : null}
      </svg>
      {/* sensor grain + scanlines */}
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.22, mixBlendMode: 'screen'}}>
        <filter id={`n${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves={1} seed={(frame % 9) + 1} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#n${seed})`} />
      </svg>
      <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 2px, transparent 2px 4px)'}} />
      <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)', background: `rgba(0,0,0,${dim})`}} />
      <div style={{position: 'absolute', top: 14, left: 16, fontFamily: SM.mono, fontSize: Math.max(14, w / 30), color: 'rgba(244,241,234,0.85)', letterSpacing: '0.06em'}}>
        {cam}
      </div>
      <div style={{position: 'absolute', top: 14, right: 16, fontFamily: SM.mono, fontSize: Math.max(14, w / 30), color: 'rgba(244,241,234,0.7)'}}>
        02:{String(14 + Math.floor(frame / 900)).padStart(2, '0')}:{String(Math.floor(frame / 30) % 60).padStart(2, '0')}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ photo */
/** The website's monitoring-room photo with a slow push-in and a grade that matches the palette. */
export const OpsPhoto: React.FC<{w: number; h: number}> = ({w, h}) => {
  const frame = useCurrentFrame();
  const dur = useSceneDuration();
  const z = interpolate(frame, [0, dur], [1.08, 1.18]);
  return (
    <div style={{position: 'relative', width: w, height: h, overflow: 'hidden', borderRadius: 18, border: `1px solid ${SM.line}`, boxShadow: '0 40px 100px rgba(0,0,0,0.6)'}}>
      <Img src={staticFile('brand/monitoring-room.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z}) translateX(${-frame * 0.15}px)`, filter: 'saturate(0.75) contrast(1.08) brightness(0.85)'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,7,11,0) 45%, rgba(5,7,11,0.85) 100%), linear-gradient(0deg, rgba(31,90,166,0.18), rgba(31,90,166,0.18))'}} />
    </div>
  );
};

/* ------------------------------------------------------------------ line icons (24px grid, stroke) */
const ICONS: Record<string, React.ReactNode> = {
  camera: (
    <>
      <path d="M3 7h11l3-2v10l-3-2H3z" />
      <path d="M8 13v4M5 21h6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v11h16V9M9 20v-6h6v6" />
    </>
  ),
  bottle: <path d="M10 2h4v4c2 1 3 3 3 5v11H7V11c0-2 1-4 3-5z" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
    </>
  ),
  bag: (
    <>
      <path d="M6 7h12l1 14H5z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export const Icon: React.FC<{name: keyof typeof ICONS | string; size?: number; color?: string; stroke?: number}> = ({name, size = 64, color = SM.text, stroke = 1.6}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {ICONS[name]}
  </svg>
);

/* ------------------------------------------------------------------ cards */
export const Glass: React.FC<{children: React.ReactNode; style?: React.CSSProperties; glow?: boolean}> = ({children, style, glow}) => (
  <div
    style={{
      background: glow ? 'linear-gradient(160deg, rgba(31,90,166,0.28), rgba(255,255,255,0.03))' : SM.glass,
      border: `1px solid ${glow ? 'rgba(76,141,255,0.55)' : SM.line}`,
      borderRadius: 26,
      boxShadow: glow ? '0 0 60px rgba(76,141,255,0.25), inset 0 1px 0 rgba(255,255,255,0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.06)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Numbered process row: 01 [icon] Title / subtitle. */
export const Step: React.FC<{n: string; icon: string; title: string; sub: string; at: number; active?: boolean}> = ({n, icon, title, sub, at, active}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 22], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{opacity: p, transform: `translateX(${(1 - p) * 80}px)`}}>
      <Glass glow={active} style={{display: 'flex', alignItems: 'center', gap: 34, padding: '30px 40px', width: 880}}>
        <div style={{fontFamily: SM.mono, fontSize: 30, color: SM.blueHi, width: 50}}>{n}</div>
        <div style={{width: 96, height: 96, borderRadius: 22, background: 'rgba(31,90,166,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={icon} size={54} color={SM.text} />
        </div>
        <div>
          <div style={{fontFamily: SM.font, fontSize: 50, fontWeight: 600, color: SM.text, letterSpacing: '-0.02em'}}>{title}</div>
          <div style={{fontFamily: SM.font, fontSize: 32, color: SM.muted, marginTop: 4}}>{sub}</div>
        </div>
      </Glass>
    </div>
  );
};

/** Circular progress ring with a counting number. */
export const Ring: React.FC<{to: number; unit: string; at?: number; size?: number}> = ({to, unit, at = 0, size = 560}) => {
  const frame = useCurrentFrame() - at;
  const p = interpolate(frame, [0, 40], [0, 1], {...clamp, easing: ease});
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: 'rotate(-90deg)'}}>
        <circle cx={50} cy={50} r={r} fill="none" stroke={SM.line} strokeWidth={1.2} />
        <circle cx={50} cy={50} r={r} fill="none" stroke={SM.blueHi} strokeWidth={1.6} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} style={{filter: 'drop-shadow(0 0 3px rgba(76,141,255,0.8))'}} />
        {Array.from({length: 60}).map((_, i) => (
          <line key={i} x1={50} y1={1.5} x2={50} y2={i % 5 ? 3 : 4.5} stroke={i / 60 <= p ? SM.blueHi : SM.dim} strokeWidth={0.4} transform={`rotate(${i * 6} 50 50)`} />
        ))}
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SM.font, color: SM.text}}>
        <span style={{fontSize: size * 0.4, fontWeight: 600, letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums'}}>{Math.round(to * p)}</span>
        <span style={{fontSize: size * 0.12, fontWeight: 500, color: SM.muted, marginLeft: 8, marginTop: size * 0.14}}>{unit}</span>
      </div>
    </div>
  );
};

export const PriceCard: React.FC<{name: string; price: string; note: string; at: number; glow?: boolean}> = ({name, price, note, at, glow}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 24], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 70}px)`}}>
      <Glass glow={glow} style={{width: 420, padding: '44px 40px'}}>
        <div style={{fontFamily: SM.mono, fontSize: 26, letterSpacing: '0.18em', color: glow ? SM.blueHi : SM.muted}}>{name.toUpperCase()}</div>
        <div style={{fontFamily: SM.font, fontSize: 132, fontWeight: 600, color: SM.text, letterSpacing: '-0.05em', marginTop: 14, lineHeight: 1}}>{price}</div>
        <div style={{fontFamily: SM.font, fontSize: 30, color: SM.muted, marginTop: 14}}>{note}</div>
      </Glass>
    </div>
  );
};

/** Primary CTA button with a slow glow pulse and a sheen. */
export const Button: React.FC<{text: string; at: number}> = ({text, at}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 20], [0, 1], {...clamp, easing: ease});
  const pulse = 0.5 + 0.5 * Math.sin((frame - at) / 9);
  const sheen = ((frame - at) * 2.2) % 260 - 80;
  return (
    <div
      style={{
        opacity: p,
        transform: `scale(${0.9 + p * 0.1})`,
        position: 'relative',
        overflow: 'hidden',
        padding: '38px 64px',
        borderRadius: 999,
        background: `linear-gradient(180deg, #2a6ac0, ${SM.blue})`,
        boxShadow: `0 0 ${40 + pulse * 40}px rgba(76,141,255,${0.35 + pulse * 0.25}), inset 0 1px 0 rgba(255,255,255,0.25)`,
        fontFamily: SM.font,
        fontSize: 48,
        fontWeight: 600,
        color: '#fff',
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(100deg, transparent ${sheen - 10}%, rgba(255,255,255,0.35) ${sheen}%, transparent ${sheen + 10}%)`}} />
    </div>
  );
};
