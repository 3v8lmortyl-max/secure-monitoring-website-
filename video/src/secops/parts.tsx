/** AI SecOps Lab design system + motion components (brand v2: #E63946 accent / #F5F7FA primary on #0B0D12; Montserrat + Inter). */
import React, {createContext, useContext} from 'react';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
import {AbsoluteFill, continueRender, delayRender, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import timeline from './timeline.json';
import lab from './lab.json';

if (typeof document !== 'undefined') {
  const h = delayRender('AI SecOps Lab fonts');
  Promise.all(
    [
      ['Montserrat', 'fonts/Montserrat.woff2'],
      ['Inter', 'fonts/Inter.woff2'],
      ['JetBrains Mono', 'fonts/JetBrainsMono.woff2'],
    ].map(([fam, file]) => {
      const f = new FontFace(fam, `url(${staticFile(file)}) format('woff2')`, {weight: '100 900'});
      document.fonts.add(f);
      return f.load();
    })
  )
    .then(() => continueRender(h))
    .catch(() => continueRender(h));
}

/** Brand v2: Background #0B0D12 · Primary #F5F7FA · Accent #E63946 · Surface #1F2937 · Secondary #374151. */
export const C = {
  accent: '#E63946',
  cyan: '#E63946', // legacy alias: the accent colour
  purple: '#9CA3AF', // legacy alias: neutral secondary text/lines
  green: '#F5F7FA', // legacy alias: "ok / success" states render in primary white
  red: '#E63946',
  navy: '#0B0D12',
  slate: '#1F2937',
  secondary: '#374151',
  text: '#F5F7FA',
  muted: '#9CA3AF',
  head: "'Montserrat', 'Inter', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);

type Scene = (typeof timeline.scenes)[number];
export const SceneCtx = createContext<Scene>(timeline.scenes[0]);
export const useSceneInfo = () => useContext(SceneCtx);

/* ------------------------------------------------------------------ background */
export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: C.navy, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: `radial-gradient(60% 35% at 18% 16%, rgba(230,57,70,0.20), transparent 70%), radial-gradient(55% 35% at 88% 72%, rgba(230,57,70,0.12), transparent 70%)`}} />
      {/* perspective grid floor */}
      <div style={{position: 'absolute', left: -600, right: -600, bottom: -200, height: 1100, perspective: 900, overflow: 'hidden'}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'rotateX(68deg)',
            transformOrigin: '50% 100%',
            backgroundImage: `linear-gradient(rgba(230,57,70,0.20) 2px, transparent 2px), linear-gradient(90deg, rgba(230,57,70,0.20) 2px, transparent 2px)`,
            backgroundSize: '120px 120px',
            backgroundPosition: `0 ${(f * 2) % 120}px`,
            WebkitMaskImage: 'linear-gradient(0deg, #000 10%, transparent 75%)',
          }}
        />
      </div>
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.08, mixBlendMode: 'screen'}}>
        <filter id="sxgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 17} />
        </filter>
        <rect width="100%" height="100%" filter="url(#sxgrain)" />
      </svg>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 4px)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 90% 75% at 50% 45%, transparent 55%, rgba(0,0,0,0.7) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Top bar: brand tag + episode label + progress line. */
export const TopBar: React.FC = () => {
  const f = useCurrentFrame();
  const p = f / timeline.total;
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 0, height: 8, width: `${p * 100}%`, background: `linear-gradient(90deg, #8f1d27, ${C.accent})`, boxShadow: `0 0 18px ${C.accent}`}} />
      <div style={{position: 'absolute', left: 60, top: 70, display: 'flex', alignItems: 'center', gap: 18}}>
        <Img src={staticFile('secops/emblem.png')} style={{width: 74, height: 74, objectFit: 'contain'}} />
        <div>
          <div style={{fontFamily: C.head, fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: '-0.01em'}}>
            AI SecOps <span style={{color: C.accent}}>Lab</span>
          </div>
          <div style={{fontFamily: C.mono, fontSize: 19, color: C.muted, letterSpacing: '0.12em'}}>LAB 01 · DEVSECOPS</div>
        </div>
      </div>
      <div style={{position: 'absolute', right: 60, top: 92, display: 'flex', alignItems: 'center', gap: 10, fontFamily: C.head, fontWeight: 800, fontSize: 21, color: '#fff', background: C.accent, padding: '9px 18px', borderRadius: 8, boxShadow: `0 0 24px ${C.accent}66`}}>
        <div style={{width: 12, height: 12, borderRadius: 6, background: '#fff', opacity: Math.floor(f / 15) % 2 ? 0.35 : 1}} />
        REAL TEST
      </div>
    </>
  );
};

/** Scene wrapper with a fast zoom/blur transition. */
export const SceneWrap: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const i = interpolate(f, [0, 10], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [dur - 7, dur], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity: i * (1 - o), transform: `scale(${1.06 - 0.06 * i + 0.05 * o})`, filter: i < 1 || o > 0 ? `blur(${(1 - i) * 12 + o * 12}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ terminal (replays real lab output) */
const out = (cmd: string) => lab.log.find((l) => l.cmd === cmd)!;
const Hot: React.FC<{v: string}> = ({v}) => (
  <span style={{color: '#fff', background: `${C.red}55`, boxShadow: `0 0 18px ${C.red}`, borderRadius: 4, padding: '0 4px'}}>{v}</span>
);
/** Highlights the (fake) leaked credentials inside real output lines. */
const Highlight: React.FC<{text: string; hot?: boolean}> = ({text, hot}) => {
  if (!hot) return <>{text}</>;
  const kv = text.match(/^(AWS_ACCESS_KEY_ID=|AWS_SECRET_ACCESS_KEY=)(.+)$/);
  if (kv) return <>{kv[1]}<Hot v={kv[2]} /></>;
  return <>{text.split(/(AKIA[A-Z0-9]{16})/).map((p, i) => (/^AKIA[A-Z0-9]{16}$/.test(p) ? <Hot key={i} v={p} /> : <span key={i}>{p}</span>))}</>;
};

export const Terminal: React.FC<{width?: number; hot?: boolean; extra?: (lineIdx: number, cmd: string) => React.ReactNode; title?: string}> = ({width = 1000, hot, extra, title = 'acme-api — zsh'}) => {
  const f = useCurrentFrame();
  const sc = useSceneInfo();
  const t0 = sc.start;
  return (
    <div style={{width, borderRadius: 18, overflow: 'hidden', background: 'rgba(11,13,18,0.94)', border: `1.5px solid ${C.secondary}`, boxShadow: `0 0 60px ${C.accent}22, 0 30px 80px rgba(0,0,0,0.6)`}}>
      <div style={{height: 54, background: C.slate, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10}}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div key={c} style={{width: 15, height: 15, borderRadius: 8, background: c}} />
        ))}
        <div style={{marginLeft: 18, fontFamily: C.mono, fontSize: 20, color: C.muted}}>{title}</div>
        <div style={{marginLeft: 'auto', fontFamily: C.head, fontWeight: 800, fontSize: 16, color: '#fff', background: C.accent, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.08em'}}>● LAB</div>
      </div>
      <div style={{padding: '24px 30px 32px', fontFamily: C.mono, fontSize: 34, lineHeight: 1.45, color: C.text, minHeight: 120}}>
        {sc.terminal.map((t, idx) => {
          const local = f - (t.start - t0);
          if (local < 0) return null;
          const typed = t.cmd.slice(0, Math.min(t.cmd.length, Math.floor(local / 1.0)));
          const showOut = f - (t.out - t0) >= 0;
          const res = out(t.cmd);
          const lines = res.out.split('\n');
          const reveal = Math.max(0, Math.floor((f - (t.out - t0)) / 2));
          const cursorOn = !showOut && Math.floor(f / 8) % 2 === 0;
          return (
            <div key={idx} style={{marginBottom: 10}}>
              <div style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>
                <span style={{color: C.muted}}>dev@lab</span> <span style={{color: C.accent}}>acme-api</span> <span style={{color: C.muted}}>%</span> {typed}
                {cursorOn ? <span style={{background: C.text, color: C.text}}>_</span> : null}
                {showOut ? <span style={{float: 'right', fontSize: 20, color: C.accent, marginTop: 8}}>{res.ms} ms</span> : null}
              </div>
              {showOut
                ? lines.slice(0, reveal + 1).map((ln, li) => (
                    <div key={li} style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: ln.includes('No such file') ? C.muted : C.text, position: 'relative'}}>
                      <Highlight text={ln} hot={hot} />
                      {extra ? extra(li, t.cmd) : null}
                    </div>
                  ))
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ captions (word-synced) */
export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const line = timeline.lines.find((l) => f >= l.start - 2 && f < l.start + l.dur + 6);
  if (!line || line.scene === 'hook') return null; // the hook already shows the line as giant type
  // chunk into short Shorts-style phrases
  const chunks: (typeof line.words)[] = [];
  let cur: typeof line.words = [];
  for (const w of line.words) {
    cur.push(w);
    const len = cur.map((x) => x.w).join(' ').length;
    if (cur.length >= 4 || len > 20 || /[.,?!]$/.test(w.w)) {
      chunks.push(cur);
      cur = [];
    }
  }
  if (cur.length) chunks.push(cur);
  const chunk = chunks.find((c) => f < c[c.length - 1].end + 2) ?? chunks[chunks.length - 1];
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 1430, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 18px'}}>
      {chunk.map((w, i) => {
        const active = f >= w.at && f < w.end + 2;
        const said = f >= w.at;
        const pop = interpolate(f, [w.at, w.at + 5], [0.85, 1], {...clamp, easing: ease});
        return (
          <span
            key={i}
            style={{
              fontFamily: C.head,
              fontWeight: 900,
              fontSize: 72,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: active ? C.accent : said ? '#fff' : 'rgba(255,255,255,0.55)',
              transform: `scale(${said ? pop : 0.85})`,
              display: 'inline-block',
              textShadow: active ? `0 0 26px ${C.accent}aa, 0 6px 18px rgba(0,0,0,0.9)` : '0 6px 18px rgba(0,0,0,0.9)',
              WebkitTextStroke: '2px rgba(0,0,0,0.55)',
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ 3D commit vault */
const COMMITS = ['df83e1b', 'fca0a16', '143db27', '0b3b51e'];
export const Vault3D: React.FC<{w: number; h: number}> = ({w, h}) => {
  const f = useCurrentFrame() ;
  const slabs = [1.65, 0.55, -0.55, -1.65];
  const beam = interpolate(f, [70, 140], [2.4, -2.4], clamp);
  const edge = (geo: THREE.BufferGeometry) => new THREE.EdgesGeometry(geo);
  const box = new THREE.BoxGeometry(5.2, 0.42, 3.2);
  return (
    <ThreeCanvas width={w} height={h} camera={{fov: 34, position: [0, 1.6, 11]}} gl={{antialias: true, alpha: true}}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 5, 6]} intensity={60} color="#ffffff" />
      <group rotation={[0.32, -0.55 + Math.sin(f / 60) * 0.18, 0]} position={[1.1, 0, 0]}>
        {slabs.map((y, i) => {
          const drop = interpolate(f, [i * 6, i * 6 + 18], [3, 0], {...clamp, easing: ease});
          const hasEnv = i > 0; // .env exists in every snapshot except the latest one
          const hit = Math.abs(beam - y) < 0.35;
          return (
            <group key={i} position={[0, y + drop, 0]}>
              <mesh geometry={box}>
                <meshPhysicalMaterial color={hit ? '#F5F7FA' : '#1F2937'} transparent opacity={hit ? 0.45 : 0.34} roughness={0.2} metalness={0.3} emissive={hit ? '#F5F7FA' : '#0B0D12'} emissiveIntensity={hit ? 0.35 : 0.1} />
              </mesh>
              <lineSegments geometry={edge(box)}>
                <lineBasicMaterial color={i === 0 ? '#9CA3AF' : '#F5F7FA'} />
              </lineSegments>
              {hasEnv ? (
                <mesh position={[1.4, 0.02, 0.4]}>
                  <boxGeometry args={[0.5, 0.3, 0.5]} />
                  <meshStandardMaterial color="#E63946" emissive="#E63946" emissiveIntensity={1.6 + Math.sin(f / 5 + i) * 0.4} />
                </mesh>
              ) : null}
            </group>
          );
        })}
        <mesh position={[0, beam, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6.4, 4.2]} />
          <meshBasicMaterial color="#F5F7FA" transparent opacity={f > 70 && f < 140 ? 0.14 : 0} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </ThreeCanvas>
  );
};
export const VAULT_LABELS = COMMITS.map((h, i) => ({
  hash: h,
  msg: ['remove secrets, add gitignore', 'add rate limiting', 'add health endpoint', 'initial api setup'][i],
  env: i > 0,
}));

/* ------------------------------------------------------------------ cards */
export const FixCard: React.FC<{n: string; title: string; body: string; source: string; at: number; color?: string; icon: React.ReactNode}> = ({n, title, body, source, at, color = C.cyan, icon}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 14], [0, 1], {...clamp, easing: ease});
  if (p <= 0) return null;
  return (
    <div style={{opacity: p, transform: `translateX(${(1 - p) * 90}px)`, display: 'flex', gap: 26, alignItems: 'center', width: 960, padding: '26px 30px', borderRadius: 22, background: 'rgba(31,41,55,0.78)', border: `1.5px solid ${color}88`, boxShadow: `0 0 34px ${color}22`}}>
      <div style={{width: 96, height: 96, flexShrink: 0, borderRadius: 22, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color}}>{icon}</div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: C.head, fontWeight: 800, fontSize: 42, color: C.text, letterSpacing: '-0.01em'}}>
          <span style={{color}}>{n}</span> {title}
        </div>
        <div style={{fontFamily: C.body, fontSize: 28, color: C.muted, marginTop: 6, lineHeight: 1.3}}>{body}</div>
        <div style={{fontFamily: C.mono, fontSize: 18, color: `${color}cc`, marginTop: 10, letterSpacing: '0.06em'}}>SOURCE · {source}</div>
      </div>
    </div>
  );
};

export const Icon: React.FC<{d: React.ReactNode; size?: number}> = ({d, size = 54}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
