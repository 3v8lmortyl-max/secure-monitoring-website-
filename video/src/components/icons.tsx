import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, DROP, FONT} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Orange pixel critter (the "developer" mascot of the piece). */
export const PixelCritter: React.FC<{size?: number; badge?: string; alert?: boolean; tilt?: number}> = ({
  size = 300,
  badge,
  alert,
  tilt = 0,
}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 9) * 4;
  return (
    <div style={{transform: `rotate(${tilt}deg) translateY(${bob}px)`, filter: DROP}}>
      <svg width={size} height={size * 0.82} viewBox="-10 -24 190 156">
        <g fill={COLORS.orange} stroke="#fff" strokeWidth={4} strokeLinejoin="round">
          <path d="M20,10 H140 V40 H160 V64 H140 V90 H130 V120 H114 V90 H106 V120 H90 V90 H70 V120 H54 V90 H46 V120 H30 V90 H20 V64 H0 V40 H20 Z" />
        </g>
        {alert ? (
          <>
            <polyline points="48,48 62,58 48,68" fill="none" stroke={COLORS.ink} strokeWidth={8} strokeLinecap="round" />
            <polyline points="114,30 100,40 114,50" fill="none" stroke={COLORS.ink} strokeWidth={8} strokeLinecap="round" />
            <rect x={146} y={-22} width={10} height={30} rx={4} fill={COLORS.ink} transform="rotate(-24 150 -6)" />
            <circle cx={163} cy={18} r={6} fill={COLORS.ink} />
          </>
        ) : (
          <>
            <polyline points="48,32 64,42 48,52" fill="none" stroke={COLORS.ink} strokeWidth={8} strokeLinecap="round" />
            <polyline points="112,32 96,42 112,52" fill="none" stroke={COLORS.ink} strokeWidth={8} strokeLinecap="round" />
          </>
        )}
        {badge ? (
          <g transform="translate(118,-20)">
            <rect width={58} height={26} rx={13} fill={COLORS.ink} />
            <text x={29} y={18.5} fill="#fff" fontFamily={FONT} fontWeight={700} fontSize={15} textAnchor="middle">
              {badge}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/** Orange asterisk / sunburst that spins in. */
export const Burst: React.FC<{size?: number; spokes?: number; color?: string; delay?: number}> = ({
  size = 260,
  spokes = 12,
  color = COLORS.orange,
  delay = 0,
}) => {
  const frame = useCurrentFrame() - delay;
  const pop = interpolate(frame, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.6))});
  const spin = frame * 0.5 + (1 - pop) * -120;
  return (
    <div style={{filter: DROP, transform: `scale(${pop}) rotate(${spin}deg)`}}>
      <svg width={size} height={size} viewBox="-100 -100 200 200">
        {Array.from({length: spokes}).map((_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          const len = i % 2 === 0 ? 92 : 78;
          const grow = interpolate(frame, [i * 0.8, i * 0.8 + 10], [0.2, 1], clamp);
          return (
            <line
              key={i}
              x1={Math.cos(a) * 14}
              y1={Math.sin(a) * 14}
              x2={Math.cos(a) * len * grow}
              y2={Math.sin(a) * len * grow}
              stroke={color}
              strokeWidth={15}
              strokeLinecap="round"
            />
          );
        })}
        <circle r={20} fill={color} />
      </svg>
    </div>
  );
};

/** Blue hexagonal "knowledge graph" logo. */
export const GraphIcon: React.FC<{size?: number; delay?: number}> = ({size = 220, delay = 0}) => {
  const frame = useCurrentFrame() - delay;
  const pts = Array.from({length: 6}).map((_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    return [Math.cos(a) * 48, Math.sin(a) * 48];
  });
  const draw = interpolate(frame, [0, 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const node = (i: number) => interpolate(frame, [4 + i * 2, 12 + i * 2], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  const hex = pts.map((p) => p.join(',')).join(' ');
  return (
    <div style={{filter: DROP}}>
      <svg width={size} height={size} viewBox="-62 -62 124 124">
        <polygon
          points={hex}
          fill="none"
          stroke={COLORS.blue}
          strokeWidth={7}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        {[1, 3, 5].map((i) => (
          <line key={i} x1={0} y1={0} x2={pts[i][0] * draw} y2={pts[i][1] * draw} stroke={COLORS.blue} strokeWidth={7} strokeLinecap="round" />
        ))}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={9 * node(i)} fill={COLORS.blue} />
        ))}
        <circle r={9 * node(6)} fill={COLORS.blue} />
      </svg>
    </div>
  );
};

/** Graph icon + wordmark that slides out from behind it. */
export const Wordmark: React.FC<{name: string}> = ({name}) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [16, 32], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 24 * slide}}>
      <div style={{transform: `translateX(${(1 - slide) * 0}px)`}}>
        <GraphIcon size={200} />
      </div>
      <div style={{overflow: 'hidden', width: 520 * slide}}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 104,
            letterSpacing: '-0.01em',
            color: '#2d2f3a',
            transform: `translateX(${(1 - slide) * -200}px)`,
            filter: `blur(${(1 - slide) * 8}px) ${DROP}`,
            whiteSpace: 'nowrap',
          }}
        >
          {name.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

/** Purple faceted crystal (a "notes vault" style app). */
export const Gem: React.FC<{size?: number; delay?: number}> = ({size = 200, delay = 0}) => {
  const frame = useCurrentFrame() - delay;
  const pop = interpolate(frame, [0, 12], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <div style={{filter: DROP, transform: `scale(${pop}) rotate(${Math.sin(frame / 14) * 4}deg)`}}>
      <svg width={size} height={size * 1.2} viewBox="-50 -62 100 124">
        <defs>
          <linearGradient id="gemA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b79bff" />
            <stop offset="1" stopColor="#6a3fd8" />
          </linearGradient>
          <linearGradient id="gemB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8f68f5" />
            <stop offset="1" stopColor="#4a22b8" />
          </linearGradient>
        </defs>
        <polygon points="-6,-58 30,-30 38,18 12,58 -30,44 -40,-6" fill="url(#gemB)" />
        <polygon points="-6,-58 30,-30 8,6 -24,-8" fill="url(#gemA)" />
        <polygon points="-24,-8 8,6 12,58 -30,44" fill="#7c55ee" />
        <polygon points="8,6 30,-30 38,18 12,58" fill="#5b33cc" />
      </svg>
    </div>
  );
};

/** Animated arrow that draws itself. */
export const Arrow: React.FC<{width?: number; delay?: number}> = ({width = 120, delay = 0}) => {
  const frame = useCurrentFrame() - delay;
  const d = interpolate(frame, [0, 10], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <svg width={width} height={40} viewBox={`0 0 ${width} 40`}>
      <line x1={4} y1={20} x2={4 + (width - 10) * d} y2={20} stroke={COLORS.ink} strokeWidth={3.5} strokeLinecap="round" />
      {d > 0.9 ? (
        <polyline points={`${width - 20},8 ${width - 6},20 ${width - 20},32`} fill="none" stroke={COLORS.ink} strokeWidth={3.5} strokeLinecap="round" />
      ) : null}
    </svg>
  );
};

/** A tile that pops in (used for the "It works with" grid). */
export const Pop: React.FC<{delay: number; children: React.ReactNode}> = ({delay, children}) => {
  const frame = useCurrentFrame() - delay;
  const pop = interpolate(frame, [0, 12], [0, 1], {...clamp, easing: Easing.out(Easing.back(2.2))});
  return (
    <div style={{transform: `scale(${pop}) translateY(${Math.sin((frame + delay * 3) / 12) * 5}px)`, opacity: pop > 0 ? 1 : 0}}>
      {children}
    </div>
  );
};

export const CubeTile: React.FC<{size?: number}> = ({size = 170}) => (
  <div style={{filter: DROP}}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x={4} y={4} width={92} height={92} rx={22} fill="#0d0d0d" />
      <g fill="none" stroke="#fff" strokeWidth={5} strokeLinejoin="round">
        <polygon points="50,24 74,37 74,63 50,76 26,63 26,37" />
        <polyline points="26,37 50,50 74,37" />
        <line x1={50} y1={50} x2={50} y2={76} />
      </g>
      <polygon points="50,24 74,37 50,50 26,37" fill="#fff" />
    </svg>
  </div>
);

export const CloudTile: React.FC<{size?: number}> = ({size = 170}) => (
  <div style={{filter: DROP}}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="cloudG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8ab4ff" />
          <stop offset="1" stopColor="#5a3fe0" />
        </linearGradient>
      </defs>
      <path d="M28,82 C10,82 6,62 18,54 C12,36 30,24 44,32 C50,16 76,16 80,36 C96,38 98,62 84,70 C86,82 74,88 64,82 Z" fill="url(#cloudG)" />
      <text x={50} y={64} fontFamily="monospace" fontWeight={700} fontSize={26} fill="#fff" textAnchor="middle">
        {'>_'}
      </text>
    </svg>
  </div>
);

export const SparkTile: React.FC<{size?: number}> = ({size = 170}) => (
  <div style={{filter: DROP}}>
    <svg width={size} height={size} viewBox="-1.1 -1.1 2.2 2.2">
      <defs>
        <linearGradient id="sparkG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f8cff" />
          <stop offset="0.35" stopColor="#e5484d" />
          <stop offset="0.65" stopColor="#f7c33b" />
          <stop offset="1" stopColor="#2fb36b" />
        </linearGradient>
      </defs>
      <path d="M0,-1 C0.1,-0.1 0.1,-0.1 1,0 C0.1,0.1 0.1,0.1 0,1 C-0.1,0.1 -0.1,0.1 -1,0 C-0.1,-0.1 -0.1,-0.1 0,-1Z" fill="url(#sparkG)" />
    </svg>
  </div>
);

/** Brand mark for the end card: shield with a monitoring "eye". */
export const BrandMark: React.FC<{size?: number}> = ({size = 300}) => {
  const frame = useCurrentFrame();
  const pop = interpolate(frame, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.8))});
  return (
    <div style={{filter: 'drop-shadow(26px 40px 30px rgba(0,0,0,0.3))', transform: `scale(${pop})`}}>
      <svg width={size} height={size * 1.15} viewBox="0 0 100 115">
        <path d="M50,4 L92,18 V52 C92,80 72,100 50,110 C28,100 8,80 8,52 V18 Z" fill={COLORS.ink} />
        <path d="M24,56 C32,42 42,36 50,36 C58,36 68,42 76,56 C68,70 58,76 50,76 C42,76 32,70 24,56 Z" fill="#fff" />
        <circle cx={50} cy={56} r={11} fill={COLORS.ink} />
        <circle cx={54} cy={52} r={3.5} fill="#fff" />
      </svg>
    </div>
  );
};

/** Big number that counts up, e.g. 41x -> 49x. */
export const CountUp: React.FC<{from: number; to: number; suffix?: string; size?: number}> = ({from, to, suffix = '', size = 150}) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [4, 26], [from, to], {...clamp, easing: Easing.out(Easing.cubic)}));
  const pop = interpolate(frame, [0, 8], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <div style={{fontFamily: FONT, fontWeight: 700, fontSize: size, color: COLORS.ink, transform: `scale(${pop})`, lineHeight: 1}}>
      {v}
      <span style={{fontSize: size * 0.55}}>{suffix}</span>
    </div>
  );
};
