/**
 * AI SecOps Lab · Lab 01: "You deleted the API key. Git didn't." (YouTube Short / Reel, 1080x1920)
 * Every terminal line is replayed from a real lab run (src/secops/lab.json); remediation claims are
 * sourced from GitHub Docs and AWS IAM docs. Timing comes from the measured narration (timeline.json).
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import timeline from './timeline.json';
import lab from './lab.json';

/** Measured timings from the real lab run (never hard-coded). */
const ms = (cmdStart: string) => lab.log.find((l) => l.cmd.startsWith(cmdStart))!.ms;
import {Backdrop, C, Captions, clamp, ease, FixCard, Icon, SceneCtx, SceneWrap, Terminal, TopBar, Vault3D, VAULT_LABELS} from './parts';

const At: React.FC<{x?: number; y: number; children: React.ReactNode; center?: boolean}> = ({x = 0, y, children, center = true}) => (
  <div style={{position: 'absolute', left: x, right: center ? 0 : undefined, top: y, display: 'flex', flexDirection: 'column', alignItems: center ? 'center' : 'flex-start'}}>{children}</div>
);
const lineOf = (scene: string, i = 0) => timeline.lines.filter((l) => l.scene === scene)[i];
const sceneOf = (id: string) => timeline.scenes.find((s) => s.id === id)!;

/* ------------------------------------------------------------------ scenes */
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [2, 14], [0, 1], {...clamp, easing: ease});
  const b = interpolate(f, [38, 46], [0, 1], {...clamp, easing: ease});
  const jitter = f >= 38 && f < 56 && f % 3 === 0 ? (f % 2 ? 10 : -10) : 0;
  return (
    <>
      <At y={430}>
        <div style={{opacity: a, transform: `translateY(${(1 - a) * 40}px)`, fontFamily: C.head, fontWeight: 900, fontSize: 104, lineHeight: 1.0, color: C.text, textAlign: 'center', letterSpacing: '-0.02em'}}>
          YOU DELETED
          <br />
          THE <span style={{color: C.accent}}>API KEY.</span>
        </div>
      </At>
      <At y={720}>
        <div style={{position: 'relative', opacity: b, transform: `scale(${1.3 - 0.3 * b}) translateX(${jitter}px)`}}>
          {['#F5F7FA', C.red].map((c, i) => (
            <div key={c} style={{position: 'absolute', inset: 0, fontFamily: C.head, fontWeight: 900, fontSize: 150, color: c, opacity: f < 60 ? 0.7 : 0, transform: `translateX(${(i ? 8 : -8) * (f < 60 ? 1 : 0)}px)`, mixBlendMode: 'screen'}}>GIT DIDN'T.</div>
          ))}
          <div style={{position: 'relative', fontFamily: C.head, fontWeight: 900, fontSize: 150, color: C.red, textShadow: `0 0 40px ${C.red}88`}}>GIT DIDN'T.</div>
        </div>
      </At>
      <At y={1010}>
        <div style={{opacity: b, fontFamily: C.mono, fontSize: 30, color: C.muted}}>
          <span style={{color: C.accent}}>$</span> git rm .env <span style={{color: C.text}}>✓</span>
        </div>
      </At>
    </>
  );
};

const Setup: React.FC = () => (
  <At y={330}>
    <Terminal
      extra={(li, cmd) => {
        if (cmd !== 'git log --oneline') return null;
        const tag = li === 3 ? ['FAKE KEY ADDED', C.red] : li === 0 ? ['KEY REMOVED', C.muted] : null;
        return tag ? <span style={{position: 'absolute', right: 0, top: 6, fontSize: 18, color: tag[1] as string, border: `1.5px solid ${tag[1]}`, borderRadius: 8, padding: '0 10px'}}>{tag[0]}</span> : null;
      }}
    />
  </At>
);

const Gone: React.FC = () => {
  const f = useCurrentFrame();
  const s = sceneOf('gone');
  const stamp = interpolate(f, [s.terminal[1].out - s.start + 6, s.terminal[1].out - s.start + 16], [0, 1], {...clamp, easing: ease});
  const doubt = interpolate(f, [s.dur - 40, s.dur - 28], [0, 1], clamp);
  return (
    <>
      <At y={330}>
        <Terminal />
      </At>
      <At y={830}>
        <div style={{opacity: stamp, transform: `scale(${1.4 - 0.4 * stamp}) rotate(-4deg)`, fontFamily: C.head, fontWeight: 900, fontSize: 70, color: doubt > 0.5 ? C.red : C.green, border: `6px solid ${doubt > 0.5 ? C.red : C.green}`, borderRadius: 18, padding: '6px 34px'}}>
          {doubt > 0.5 ? '…OR IS IT?' : 'LOOKS CLEAN'}
        </div>
      </At>
    </>
  );
};

const History: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: 230}}>
        <Vault3D w={1080} h={720} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 330, display: 'flex', flexDirection: 'column', gap: 52}}>
        {VAULT_LABELS.map((c, i) => {
          const p = interpolate(f, [8 + i * 6, 24 + i * 6], [0, 1], {...clamp, easing: ease});
          return (
            <div key={c.hash} style={{opacity: p, fontFamily: C.mono, fontSize: 22, lineHeight: 1.25}}>
              <div style={{color: C.text}}>{c.hash}</div>
              <div style={{color: C.muted, fontSize: 18}}>{c.msg}</div>
              <div style={{color: c.env ? C.red : C.muted, fontSize: 17}}>{c.env ? '● .env inside' : '○ .env removed'}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 70, top: 300, fontFamily: C.head, fontWeight: 800, fontSize: 30, color: C.text, textAlign: 'right'}}>
        EVERY COMMIT =<br />
        <span style={{color: C.accent}}>A FULL SNAPSHOT</span>
      </div>
      <At y={960}>
        <Terminal width={980} />
      </At>
    </>
  );
};

const Reveal: React.FC = () => {
  const f = useCurrentFrame();
  const s = sceneOf('reveal');
  const outAt = s.terminal[0].out - s.start;
  const flash = interpolate(f, [outAt, outAt + 10], [0.5, 0], clamp);
  const badge = interpolate(f, [outAt + 6, outAt + 18], [0, 1], {...clamp, easing: ease});
  return (
    <>
      <At y={380}>
        <Terminal hot title="acme-api — zsh — recovering deleted file" />
      </At>
      <At y={780}>
        <div style={{opacity: badge, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
          <div style={{fontFamily: C.head, fontWeight: 900, fontSize: 130, color: '#fff', lineHeight: 1, textShadow: `0 0 40px ${C.accent}88`}}>{ms('git show')} <span style={{color: C.accent}}>ms</span></div>
          <div style={{fontFamily: C.mono, fontSize: 22, color: C.red, border: `1.5px solid ${C.red}`, padding: '6px 14px', borderRadius: 8}}>FAKE KEY · GENERATED FOR THIS DEMO</div>
        </div>
      </At>
      <AbsoluteFill style={{background: C.red, opacity: flash, mixBlendMode: 'screen'}} />
    </>
  );
};

const Scan: React.FC = () => {
  const f = useCurrentFrame();
  const s = sceneOf('scan');
  const outAt = s.terminal[0].out - s.start;
  const p = interpolate(f, [outAt + 4, outAt + 16], [0, 1], {...clamp, easing: ease});
  return (
    <>
      <At y={350}>
        <Terminal hot title="pattern search across all history" />
      </At>
      <At y={820}>
        <div style={{opacity: p, display: 'flex', gap: 26}}>
          {[
            ['4', 'COMMITS'],
            ['1', 'SECRET FOUND'],
            [String(ms('git log -p')), 'MS'],
          ].map(([v, l]) => (
            <div key={l} style={{width: 290, padding: '22px 0', textAlign: 'center', borderRadius: 18, background: 'rgba(31,41,55,0.7)', border: `1.5px solid ${l.includes('SECRET') ? C.red : C.secondary}`}}>
              <div style={{fontFamily: C.head, fontWeight: 900, fontSize: 72, color: l.includes('SECRET') ? C.red : C.text}}>{v}</div>
              <div style={{fontFamily: C.mono, fontSize: 20, color: C.muted, letterSpacing: '0.1em'}}>{l}</div>
            </div>
          ))}
        </div>
      </At>
    </>
  );
};

const Fix: React.FC = () => {
  const s = sceneOf('fix');
  const at = (i: number) => lineOf('fix', i).start - s.start;
  return (
    <>
      <At y={290}>
        <div style={{fontFamily: C.head, fontWeight: 900, fontSize: 78, color: C.text}}>
          THE <span style={{color: C.accent}}>FIX</span>
        </div>
      </At>
      <div style={{position: 'absolute', left: 60, top: 420, display: 'flex', flexDirection: 'column', gap: 24}}>
        <FixCard n="01" title="Revoke & rotate first" body="Assume the key is compromised. Kill it, issue a new one." source="GitHub Docs" at={at(1)} color={C.red} icon={<Icon d={<><path d="M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zM15.5 7.5l3 3L22 7l-3-3" /></>} />} />
        <FixCard n="02" title="Rewrite history" body="git filter-repo. Clones & forks may still hold copies." source="GitHub Docs" at={at(2)} color={C.text} icon={<Icon d={<><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="12" r="2.5" /><path d="M6 8.5v7M8.3 7.2l7.4 3.6" /></>} />} />
        <FixCard n="03" title="Push protection" body="Secrets get blocked before they reach the repo." source="GitHub Docs" at={at(3)} color={C.accent} icon={<Icon d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>} />} />
        <FixCard n="+" title="Short-lived credentials" body="On AWS, prefer IAM roles over long-term access keys." source="AWS IAM Docs" at={at(4)} color={C.text} icon={<Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />} />
      </div>
    </>
  );
};

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 20], [0, 1], {...clamp, easing: ease});
  const btn = interpolate(f, [26, 40], [0, 1], {...clamp, easing: ease});
  const pulse = 1 + 0.03 * Math.sin(f / 5);
  return (
    <At y={360}>
      <div style={{opacity: p, transform: `scale(${0.9 + 0.1 * p})`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Img src={staticFile('secops/emblem.png')} style={{width: 440, height: 440, objectFit: 'contain', filter: `drop-shadow(0 0 50px ${C.accent}55)`}} />
        <div style={{fontFamily: C.head, fontWeight: 800, fontSize: 104, color: '#fff', letterSpacing: '-0.02em', marginTop: 10}}>
          <i>AI SecOps <span style={{color: C.accent}}>Lab</span></i>
        </div>
        <div style={{fontFamily: C.body, fontSize: 26, letterSpacing: '0.3em', color: C.muted, marginTop: 10}}>AI <span style={{color: C.accent}}>/</span> CYBERSECURITY <span style={{color: C.accent}}>/</span> ENTERPRISE TECH</div>
        <div style={{opacity: btn, transform: `scale(${pulse})`, marginTop: 60, padding: '26px 64px', borderRadius: 999, background: C.accent, fontFamily: C.head, fontWeight: 900, fontSize: 46, color: '#fff', boxShadow: `0 0 50px ${C.accent}88`}}>
          FOLLOW @AISECOPSLAB
        </div>
      </div>
    </At>
  );
};

const SCENES: Record<string, React.FC> = {hook: Hook, setup: Setup, gone: Gone, history: History, reveal: Reveal, scan: Scan, fix: Fix, outro: Outro};

export const SecOpsShort: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => (
  <AbsoluteFill style={{background: C.navy}}>
    <Backdrop />
    {withAudio ? <Audio src={staticFile('audio/secops.mp3')} /> : null}
    {timeline.scenes.map((s) => {
      const Comp = SCENES[s.id];
      return (
        <Sequence key={s.id} from={s.start} durationInFrames={s.dur} name={s.id}>
          <SceneCtx.Provider value={s}>
            <SceneWrap dur={s.dur}>
              <Comp />
            </SceneWrap>
          </SceneCtx.Provider>
        </Sequence>
      );
    })}
    <TopBar />
    <Captions />
  </AbsoluteFill>
);

export const SECOPS_TOTAL = timeline.total;
