import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT, MONO, SHADOW} from '../theme';
import {useScene} from './Scene';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Bar: React.FC<{w: number | string; h?: number; c?: string; mt?: number}> = ({w, h = 10, c = '#d9dce6', mt = 0}) => (
  <div style={{width: w, height: h, background: c, borderRadius: h / 2, marginTop: mt}} />
);

/* ------------------------------------------------------------------ */
/* Landing page card                                                   */
/* ------------------------------------------------------------------ */
export const BrowserCard: React.FC<{title: string; subtitle: string; command: string}> = ({title, subtitle, command}) => (
  <div
    style={{
      width: 840,
      height: 450,
      background: '#f6f7fb',
      boxShadow: SHADOW,
      borderRadius: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 34,
      fontFamily: FONT,
      color: '#1b1f3b',
    }}
  >
    <div style={{background: '#e3e8ff', color: '#4a5bd8', fontSize: 13, fontWeight: 700, padding: '6px 18px', borderRadius: 20, letterSpacing: 1}}>
      OPEN SOURCE · KNOWLEDGE GRAPHS
    </div>
    <div style={{fontSize: 44, fontWeight: 700, textAlign: 'center', lineHeight: 1.15, marginTop: 22, width: 720}}>{title}</div>
    <div style={{fontSize: 17, color: '#6a7086', textAlign: 'center', width: 640, marginTop: 18, lineHeight: 1.45}}>{subtitle}</div>
    <div style={{display: 'flex', alignItems: 'center', marginTop: 34, background: COLORS.navy, borderRadius: 8, padding: '10px 12px 10px 22px', gap: 18}}>
      <span style={{fontFamily: MONO, color: '#fff', fontSize: 17}}>{command}</span>
      <span style={{background: COLORS.blue, color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 5}}>COPY</span>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Documentation page that scrolls                                     */
/* ------------------------------------------------------------------ */
const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
  <div style={{padding: '34px 46px', borderBottom: '1px solid #eceef4'}}>
    <div style={{fontSize: 24, fontWeight: 700, color: '#1b1f3b', marginBottom: 18}}>{title}</div>
    {children}
  </div>
);

export const DocsCard: React.FC<{name: string}> = ({name}) => {
  const frame = useCurrentFrame();
  const {duration} = useScene();
  const y = interpolate(frame, [8, duration - 10], [0, 980], {...clamp, easing: Easing.inOut(Easing.quad)});
  return (
    <div style={{width: 840, height: 500, background: '#fff', boxShadow: SHADOW, borderRadius: 4, overflow: 'hidden', fontFamily: FONT}}>
      <div style={{transform: `translateY(${-y}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 46px', borderBottom: '1px solid #eceef4'}}>
          <div style={{fontWeight: 900, fontSize: 20, color: COLORS.blue}}>{name}</div>
          <div style={{display: 'flex', gap: 22, fontSize: 14, color: '#7a8095'}}>
            <span>Docs</span>
            <span>Examples</span>
            <span>Benchmarks</span>
            <span>GitHub</span>
          </div>
        </div>
        <Section title="Explore graphed repositories">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} style={{border: '1px solid #e6e8f0', borderRadius: 8, padding: 16}}>
                <Bar w="70%" h={12} c="#c9cde0" />
                <Bar w="95%" mt={10} />
                <Bar w="80%" mt={8} />
                <div style={{display: 'flex', gap: 8, marginTop: 14}}>
                  <Bar w={40} h={14} c="#dfe7ff" />
                  <Bar w={54} h={14} c="#e9f6ec" />
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section title={`What is ${name}?`}>
          <Bar w="96%" />
          <Bar w="90%" mt={10} />
          <Bar w="72%" mt={10} />
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 24}}>
            {['3.7k+', 'MIT', '71.5x', 'Py 3.10+'].map((v) => (
              <div key={v} style={{border: '1px solid #e6e8f0', borderRadius: 8, padding: '16px 0', textAlign: 'center'}}>
                <div style={{fontWeight: 700, fontSize: 22, color: '#1b1f3b'}}>{v}</div>
                <Bar w="50%" h={8} mt={8} c="#e4e6ee" />
              </div>
            ))}
          </div>
        </Section>
        <Section title="Core capabilities">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} style={{display: 'flex', gap: 14, alignItems: 'center', marginTop: i ? 14 : 0}}>
              <div style={{width: 12, height: 12, borderRadius: 6, background: COLORS.blue}} />
              <Bar w={`${60 + ((i * 13) % 30)}%`} />
            </div>
          ))}
        </Section>
        <Section title="Architecture & pipeline">
          <div style={{display: 'flex', gap: 16}}>
            {['Parse', 'Link', 'Index'].map((t) => (
              <div key={t} style={{flex: 1, background: '#f4f6fc', borderRadius: 8, padding: 16}}>
                <div style={{fontWeight: 700, color: '#3a4060', fontSize: 16}}>{t}</div>
                <Bar w="90%" mt={10} />
                <Bar w="70%" mt={8} />
              </div>
            ))}
          </div>
        </Section>
        <Section title="Worked examples">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} style={{display: 'flex', gap: 16, marginTop: i ? 12 : 0}}>
              <Bar w="28%" c="#c9cde0" />
              <Bar w="40%" />
              <Bar w="18%" c="#dfe7ff" />
            </div>
          ))}
        </Section>
        <div style={{height: 400}} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Terminal window (optionally on a warm desktop wallpaper)            */
/* ------------------------------------------------------------------ */
const CODE: {t: string; c: string}[] = [
  {t: '> claude', c: '#e6e6e6'},
  {t: '  Reading project files…', c: '#9aa0a6'},
  {t: '  ├─ src/server/routes.ts', c: '#8ab4f8'},
  {t: '  ├─ src/server/auth/session.ts', c: '#8ab4f8'},
  {t: '  ├─ src/lib/db/schema.ts', c: '#8ab4f8'},
  {t: '  ├─ src/components/Dashboard.tsx', c: '#8ab4f8'},
  {t: '  ├─ src/components/CameraGrid.tsx', c: '#8ab4f8'},
  {t: '  └─ … 1,284 more files', c: '#9aa0a6'},
  {t: '  Context used: 182,440 tokens', c: '#f28b82'},
];

export const TerminalWindow: React.FC<{wallpaper?: boolean; lines?: {t: string; c: string}[]}> = ({
  wallpaper = true,
  lines = CODE,
}) => {
  const frame = useCurrentFrame();
  const shown = Math.floor(interpolate(frame, [6, 6 + lines.length * 7], [0, lines.length], clamp));
  const cursor = Math.floor(frame / 15) % 2 === 0;
  const win = (
    <div style={{width: wallpaper ? 780 : 860, height: wallpaper ? 400 : 470, background: '#1e1f22', borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.45)', border: '1px solid #3a3b3f'}}>
      <div style={{height: 36, background: '#2b2d31', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8}}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}} />
        ))}
        <div style={{marginLeft: 16, fontFamily: MONO, fontSize: 13, color: '#a0a3a8'}}>~/project — zsh</div>
      </div>
      <div style={{padding: '18px 22px', fontFamily: MONO, fontSize: 17, lineHeight: 1.6}}>
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{color: l.c, whiteSpace: 'pre'}}>
            {l.t}
          </div>
        ))}
        <span style={{display: 'inline-block', width: 10, height: 20, background: cursor ? '#e6e6e6' : 'transparent', verticalAlign: 'middle'}} />
      </div>
    </div>
  );
  if (!wallpaper) return <div style={{boxShadow: SHADOW, borderRadius: 10}}>{win}</div>;
  return (
    <div
      style={{
        width: 900,
        height: 500,
        boxShadow: SHADOW,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(120% 90% at 85% 100%, #f7a440 0%, #e2512c 35%, #7a1f3d 65%, #1b0f2e 100%)',
      }}
    >
      {win}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Dark desk shot: monitor in perspective with a "loading" phone panel */
/* ------------------------------------------------------------------ */
export const DarkMonitor: React.FC = () => {
  const frame = useCurrentFrame();
  const tokens = Math.round(interpolate(frame, [20, 120], [0, 48210], clamp));
  return (
    <div
      style={{
        width: 680,
        height: 760,
        boxShadow: SHADOW,
        background: 'radial-gradient(90% 80% at 60% 40%, #2a2c33 0%, #0b0b0e 70%)',
        overflow: 'hidden',
        perspective: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 640,
          height: 470,
          background: '#16171b',
          border: '10px solid #050506',
          borderRadius: 8,
          transform: 'rotateY(-30deg) rotateX(4deg) translateX(40px)',
          display: 'flex',
          gap: 18,
          padding: 20,
          boxShadow: '0 0 80px rgba(120,140,255,0.12)',
        }}
      >
        <div style={{flex: 1}}>
          {Array.from({length: 18}).map((_, i) => (
            <Bar key={i} w={`${30 + ((i * 37) % 60)}%`} h={7} mt={i ? 11 : 0} c={['#5f6b8a', '#8a6fb8', '#5c8f7a', '#7c7f88'][i % 4]} />
          ))}
        </div>
        <div style={{width: 220, height: '100%', borderRadius: 30, background: '#060607', border: '3px solid #2c2d33', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12}}>
          <div style={{width: 14, height: 14, borderRadius: 7, background: '#fff', opacity: 0.5 + 0.5 * Math.sin(frame / 4)}} />
          <div style={{fontFamily: MONO, fontSize: 15, color: '#cfd2da', textAlign: 'center'}}>
            {tokens.toLocaleString('en-US')}
            <br />
            tokens read
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Laptop                                                              */
/* ------------------------------------------------------------------ */
export const Laptop: React.FC = () => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(20px 34px 30px rgba(0,0,0,0.3))'}}>
    <div style={{width: 560, height: 350, background: '#0c0c0e', borderRadius: '18px 18px 4px 4px', padding: 14}}>
      <svg width="100%" height="100%" viewBox="0 0 100 62" preserveAspectRatio="none" style={{borderRadius: 4, display: 'block'}}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2340" />
            <stop offset="1" stopColor="#8a7aa8" />
          </linearGradient>
        </defs>
        <rect width="100" height="62" fill="url(#sky)" />
        <polygon points="0,62 0,40 18,30 34,38 52,22 70,34 86,26 100,32 100,62" fill="#4b3f66" />
        <polygon points="0,62 0,50 24,42 46,48 66,40 100,48 100,62" fill="#2b2440" />
        <rect x="22" y="57" width="56" height="3.5" rx="1.5" fill="rgba(255,255,255,0.25)" />
      </svg>
    </div>
    <div style={{width: 660, height: 20, background: 'linear-gradient(#d7d8dc, #9a9ba1)', borderRadius: '0 0 16px 16px'}} />
  </div>
);

/* ------------------------------------------------------------------ */
/* Install docs card                                                   */
/* ------------------------------------------------------------------ */
export const InstallCard: React.FC<{lines: string[]}> = ({lines}) => {
  const frame = useCurrentFrame();
  const shown = Math.floor(interpolate(frame, [4, 4 + lines.length * 6], [0, lines.length], clamp));
  return (
    <div style={{width: 840, height: 440, background: '#fff', boxShadow: SHADOW, borderRadius: 4, padding: '28px 40px', fontFamily: FONT, boxSizing: 'border-box'}}>
      <div style={{fontWeight: 700, fontSize: 22, color: '#1b1f3b'}}>Install & Run</div>
      <Bar w="80%" mt={14} h={8} />
      <div style={{background: COLORS.navy, borderRadius: 8, marginTop: 20, padding: '18px 24px', height: 230, boxSizing: 'border-box'}}>
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{fontFamily: MONO, fontSize: 17, lineHeight: 1.6, color: l.startsWith('#') ? '#7d86a8' : '#e8ecff', whiteSpace: 'pre'}}>
            {l.startsWith('#') ? l : `$ ${l}`}
          </div>
        ))}
      </div>
      <Bar w="92%" mt={20} h={8} />
      <Bar w="64%" mt={10} h={8} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Book (lead magnet)                                                  */
/* ------------------------------------------------------------------ */
export const Book: React.FC<{title: string; author: string}> = ({title, author}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 16], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const words = title.split(' ');
  return (
    <div style={{perspective: 1400}}>
      <div
        style={{
          width: 380,
          height: 520,
          transform: `rotateX(${40 - enter * 6}deg) rotateZ(${-28 + Math.sin(frame / 30) * 2}deg) translateY(${(1 - enter) * 120}px)`,
          background: 'linear-gradient(135deg, #ffffff 0%, #ececec 100%)',
          borderRadius: '3px 8px 8px 3px',
          boxShadow:
            '-3px 3px 0 #dcdcdc, -6px 6px 0 #d0d0d0, -9px 9px 0 #c4c4c4, -12px 12px 0 #bdbdbd, 40px 60px 70px rgba(0,0,0,0.35)',
          padding: '44px 36px',
          boxSizing: 'border-box',
          fontFamily: FONT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{fontWeight: 900, fontSize: 44, lineHeight: 1.02, textTransform: 'uppercase', color: '#222'}}>
          {words.map((w, i) => (
            <span key={i} style={{color: i === 1 ? '#d23b3b' : '#222'}}>
              {w}{' '}
            </span>
          ))}
        </div>
        <svg viewBox="0 0 100 60" width="100%">
          <path d="M10,50 C30,20 40,40 55,22 C65,10 80,18 90,8" fill="none" stroke="#bbb" strokeWidth={2} />
          <circle cx={90} cy={8} r={4} fill="#999" />
        </svg>
        <div style={{fontSize: 16, letterSpacing: 2, color: '#777', textTransform: 'uppercase'}}>{author}</div>
      </div>
    </div>
  );
};

/** An open page sliding in from the top-left corner. */
export const OpenPage: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <div
      style={{
        width: 760,
        height: 980,
        background: '#fdfdfd',
        transform: `rotate(-32deg) translate(${(1 - enter) * -300}px, ${(1 - enter) * -200}px)`,
        boxShadow: '30px 50px 80px rgba(0,0,0,0.35), inset -30px 0 40px rgba(0,0,0,0.06)',
        padding: '70px 60px',
        boxSizing: 'border-box',
        borderRadius: 4,
      }}
    >
      {Array.from({length: 22}).map((_, i) =>
        i === 9 ? (
          <div key={i} style={{display: 'flex', gap: 20, margin: '20px 0'}}>
            <div style={{width: 120, height: 160, background: 'linear-gradient(#fff6c8, #f2c94c)', borderRadius: '0 0 60px 60px'}} />
            <div style={{flex: 1}}>
              <Bar w="80%" h={8} />
              <Bar w="60%" h={8} mt={12} />
              <Bar w="70%" h={8} mt={12} />
            </div>
          </div>
        ) : (
          <Bar key={i} w={`${70 + ((i * 17) % 28)}%`} h={8} mt={14} c="#d0d0d0" />
        )
      )}
    </div>
  );
};
