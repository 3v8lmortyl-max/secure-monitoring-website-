import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {useScene} from '../components/Scene';
import {BrandMark} from '../components/icons';
import {COLORS, DROP, FONT, MONO, SHADOW} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const RED = '#e5484d';

/** Dome-free bullet CCTV camera on a wall mount, with a blinking REC badge. */
export const CameraIcon: React.FC<{size?: number; asleep?: boolean}> = ({size = 420, asleep}) => {
  const frame = useCurrentFrame();
  const pop = interpolate(frame, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.7))});
  const pan = Math.sin(frame / 18) * 6;
  const rec = Math.floor(frame / 12) % 2 === 0;
  return (
    <div style={{filter: DROP, transform: `scale(${pop})`}}>
      <svg width={size} height={size * 0.75} viewBox="0 0 200 150">
        <rect x={8} y={20} width={22} height={70} rx={6} fill="#2b2d33" />
        <rect x={24} y={48} width={34} height={12} rx={4} fill="#3a3d45" />
        <g transform={`rotate(${12 + pan} 58 54)`}>
          <rect x={52} y={30} width={116} height={50} rx={14} fill="#f4f4f6" stroke="#2b2d33" strokeWidth={4} />
          <rect x={150} y={26} width={30} height={58} rx={10} fill="#2b2d33" />
          <circle cx={165} cy={55} r={15} fill="#111" />
          <circle cx={165} cy={55} r={8} fill={asleep ? '#333' : '#3b6cf0'} />
          <circle cx={168} cy={51} r={3} fill="#fff" opacity={0.8} />
          <rect x={52} y={22} width={110} height={10} rx={5} fill="#d9dbe0" />
        </g>
        <g transform="translate(118,100)">
          <rect width={74} height={30} rx={15} fill={COLORS.ink} />
          <circle cx={18} cy={15} r={7} fill={rec ? RED : '#5a1e20'} />
          <text x={48} y={21} fill="#fff" fontFamily={FONT} fontWeight={700} fontSize={16} textAnchor="middle">
            REC
          </text>
        </g>
      </svg>
    </div>
  );
};

/** A schematic store aisle drawn inside a camera tile. */
const Aisle: React.FC<{seed: number; person?: number}> = ({seed, person}) => (
  <svg width="100%" height="100%" viewBox="0 0 160 100" preserveAspectRatio="none">
    <rect width={160} height={100} fill={['#23262d', '#1f2228', '#262a30', '#1d2026'][seed % 4]} />
    <polygon points="0,100 60,40 100,40 160,100" fill="#2f333b" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={6 + i * 14} y={30 - i * 4} width={10} height={50 + i * 8} fill="#3a404a" />
        <rect x={144 - i * 14} y={30 - i * 4} width={10} height={50 + i * 8} fill="#3a404a" />
      </g>
    ))}
    {person !== undefined ? (
      <g transform={`translate(${70 + person * 18},48)`}>
        <circle cx={6} cy={4} r={5} fill="#c9ccd4" />
        <rect x={1} y={10} width={10} height={22} rx={4} fill="#c9ccd4" />
      </g>
    ) : null}
  </svg>
);

/** 2x2 CCTV wall. `alert` highlights one tile in red with a label. */
export const CctvGrid: React.FC<{alert?: boolean; label?: boolean}> = ({alert, label = true}) => {
  const frame = useCurrentFrame();
  const {duration} = useScene();
  const t = interpolate(frame, [0, duration], [0, 1]);
  const hi = alert ? interpolate(frame, [18, 26], [0, 1], clamp) : 0;
  const clock = `02:${String(14 + Math.floor(frame / 30)).padStart(2, '0')}:${String((frame * 2) % 60).padStart(2, '0')} AM`;
  return (
    <div style={{width: 860, background: '#0d0e11', padding: 12, borderRadius: 8, boxShadow: SHADOW, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'relative', height: 250, overflow: 'hidden', borderRadius: 4, outline: i === 3 && hi > 0 ? `${6 * hi}px solid ${RED}` : 'none'}}>
          <Aisle seed={i} person={i === 3 ? t * 2 - 1 : undefined} />
          {label ? (
            <div style={{position: 'absolute', top: 8, left: 10, fontFamily: MONO, fontSize: 15, color: '#e8e8e8', textShadow: '0 1px 2px #000'}}>
              CAM 0{i + 1} · {clock}
            </div>
          ) : null}
          <div style={{position: 'absolute', top: 10, right: 12, width: 12, height: 12, borderRadius: 6, background: RED, opacity: Math.floor(frame / 12) % 2 ? 0.3 : 1}} />
          {i === 3 && hi > 0 ? (
            <div style={{position: 'absolute', bottom: 10, left: 10, background: RED, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 18, padding: '5px 12px', borderRadius: 4, opacity: hi}}>
              ALERT · Aisle 4
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

/** Operator console: live wall on the left, alert card + notify action on the right. */
export const Console: React.FC = () => {
  const frame = useCurrentFrame();
  const card = interpolate(frame, [20, 32], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const sent = frame > 70;
  return (
    <div style={{width: 900, height: 470, background: '#fff', boxShadow: SHADOW, borderRadius: 6, overflow: 'hidden', fontFamily: FONT, display: 'flex'}}>
      <div style={{width: 520, background: '#0d0e11', padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{borderRadius: 3, overflow: 'hidden', outline: i === 4 ? `4px solid ${RED}` : 'none'}}>
            <Aisle seed={i} person={i === 4 ? Math.sin(frame / 20) : undefined} />
          </div>
        ))}
      </div>
      <div style={{flex: 1, padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <div style={{width: 12, height: 12, borderRadius: 6, background: '#22c55e'}} />
          <div style={{fontSize: 17, fontWeight: 700, color: '#1b1f3b'}}>Operator · Live</div>
        </div>
        <div style={{opacity: card, transform: `translateX(${(1 - card) * 40}px)`, border: `2px solid ${RED}`, borderRadius: 8, padding: 14}}>
          <div style={{color: RED, fontWeight: 700, fontSize: 16}}>INCIDENT · CAM 05</div>
          <div style={{fontSize: 19, fontWeight: 600, color: '#1b1f3b', marginTop: 6}}>Concealment observed, Aisle 4</div>
          <div style={{fontSize: 14, color: '#7a8095', marginTop: 6, fontFamily: MONO}}>02:17:42 AM</div>
        </div>
        <div style={{opacity: card, marginTop: 'auto', background: sent ? '#22c55e' : COLORS.navy, color: '#fff', borderRadius: 8, padding: '14px 0', textAlign: 'center', fontWeight: 700, fontSize: 18}}>
          {sent ? '✓ Store manager alerted' : 'Notify store manager'}
        </div>
      </div>
    </div>
  );
};

/** Shield + wordmark that slides out (same motion as the explainer's logo reveal). */
export const BrandWordmark: React.FC<{name: string}> = ({name}) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [14, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 26 * slide}}>
      <BrandMark size={230} />
      <div style={{overflow: 'hidden', width: 600 * slide}}>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 88, lineHeight: 1, color: '#2d2f3a', transform: `translateX(${(1 - slide) * -200}px)`, filter: `blur(${(1 - slide) * 8}px)`, whiteSpace: 'nowrap'}}>
          {name.toUpperCase().split(' ').map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Big stat with a count-up and a unit. */
export const Stat: React.FC<{to: number; prefix?: string; unit: string; color?: string}> = ({to, prefix = '', unit, color = COLORS.ink}) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [4, 28], [0, to], {...clamp, easing: Easing.out(Easing.cubic)}));
  const pop = interpolate(frame, [0, 8], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <div style={{fontFamily: FONT, fontWeight: 700, color, transform: `scale(${pop})`, display: 'flex', alignItems: 'baseline', gap: 10, filter: DROP}}>
      <span style={{fontSize: 260, lineHeight: 1, letterSpacing: '-0.03em'}}>
        {prefix}
        {v}
      </span>
      <span style={{fontSize: 80}}>{unit}</span>
    </div>
  );
};

/** Industry tile: rounded card with a simple glyph and label. */
export const IndustryTile: React.FC<{glyph: 'store' | 'bottle' | 'basket' | 'bag'; label: string; color: string}> = ({glyph, label, color}) => (
  <div style={{width: 300, height: 300, borderRadius: 44, background: color, boxShadow: SHADOW, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
    <svg width={140} height={140} viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth={7} strokeLinejoin="round" strokeLinecap="round">
      {glyph === 'store' && (
        <>
          <path d="M14,40 L22,16 H78 L86,40 Z" />
          <path d="M20,40 V84 H80 V40" />
          <path d="M42,84 V60 H58 V84" />
        </>
      )}
      {glyph === 'bottle' && <path d="M42,10 H58 V30 C70,36 72,44 72,54 V88 H28 V54 C28,44 30,36 42,30 Z" />}
      {glyph === 'basket' && (
        <>
          <path d="M12,42 H88 L78,86 H22 Z" />
          <path d="M30,42 L44,14 M70,42 L56,14" />
        </>
      )}
      {glyph === 'bag' && (
        <>
          <path d="M20,34 H80 L76,88 H24 Z" />
          <path d="M36,34 C36,14 64,14 64,34" />
        </>
      )}
    </svg>
    <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 36, color: '#fff'}}>{label}</div>
  </div>
);

/** 7-day trial calendar: days tick green one after another. */
export const TrialCalendar: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{width: 820, background: '#fff', boxShadow: SHADOW, borderRadius: 10, padding: '28px 34px', fontFamily: FONT}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontWeight: 700, fontSize: 28, color: '#1b1f3b'}}>Free trial</div>
        <div style={{background: '#e9f9ef', color: '#16a34a', fontWeight: 700, fontSize: 18, padding: '6px 14px', borderRadius: 20}}>$0 today</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginTop: 24}}>
        {Array.from({length: 7}).map((_, i) => {
          const on = interpolate(frame, [12 + i * 7, 18 + i * 7], [0, 1], clamp);
          return (
            <div key={i} style={{height: 110, borderRadius: 10, border: '2px solid #e6e8f0', background: on > 0 ? `rgba(34,197,94,${on})` : '#f7f8fb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: on > 0.5 ? '#fff' : '#7a8095'}}>
              <div style={{fontSize: 16, fontWeight: 600}}>DAY</div>
              <div style={{fontSize: 36, fontWeight: 700}}>{on > 0.5 ? '✓' : i + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Price card pair: Basic / Professional. */
export const PriceCards: React.FC = () => {
  const frame = useCurrentFrame();
  const card = (i: number, name: string, price: string, dark: boolean) => {
    const p = interpolate(frame, [i * 10, i * 10 + 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.5))});
    return (
      <div style={{width: 380, padding: '34px 30px', borderRadius: 16, background: dark ? COLORS.navy : '#fff', color: dark ? '#fff' : '#1b1f3b', boxShadow: SHADOW, transform: `scale(${p}) translateY(${(1 - p) * 40}px)`, fontFamily: FONT}}>
        <div style={{fontSize: 24, fontWeight: 600, opacity: 0.8}}>{name}</div>
        <div style={{fontSize: 96, fontWeight: 700, lineHeight: 1.1, marginTop: 8}}>{price}</div>
        <div style={{fontSize: 22, opacity: 0.7}}>per site / month</div>
      </div>
    );
  };
  return (
    <div style={{display: 'flex', gap: 30}}>
      {card(0, 'Basic', '$199', false)}
      {card(1, 'Professional', '$299', true)}
    </div>
  );
};
