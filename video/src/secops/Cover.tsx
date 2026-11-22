/** Reel cover for AI SecOps Lab · Lab 01 (1080x1920; key content inside the 1080x1440 profile-grid crop). */
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import lab from './lab.json';
import {Backdrop, C} from './parts';

const ms = lab.log.find((l) => l.cmd.startsWith('git show'))!.ms;
const Chip: React.FC<{children: React.ReactNode; solid?: boolean}> = ({children, solid}) => (
  <div style={{fontFamily: C.head, fontWeight: 800, fontSize: 30, letterSpacing: '0.04em', padding: '10px 22px', borderRadius: 10, color: '#fff', background: solid ? C.accent : 'transparent', border: `2px solid ${solid ? C.accent : '#ffffff55'}`, boxShadow: solid ? `0 0 30px ${C.accent}66` : 'none'}}>
    {children}
  </div>
);

export const SecOpsCover: React.FC = () => (
  <AbsoluteFill style={{background: C.navy}}>
    <Backdrop />
    {/* red diagonal slashes (brand overlay) */}
    <div style={{position: 'absolute', right: -80, top: 250, display: 'flex', gap: 22, transform: 'skewX(-28deg)', opacity: 0.9}}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{width: 34, height: 120, background: C.accent, opacity: 1 - i * 0.2}} />
      ))}
    </div>

    {/* brand row */}
    <div style={{position: 'absolute', left: 70, top: 300, display: 'flex', alignItems: 'center', gap: 20}}>
      <Img src={staticFile('secops/emblem.png')} style={{width: 96, height: 96}} />
      <div style={{fontFamily: C.head, fontWeight: 800, fontStyle: 'italic', fontSize: 40, color: '#fff'}}>
        AI SecOps <span style={{color: C.accent}}>Lab</span>
      </div>
    </div>

    {/* headline */}
    <div style={{position: 'absolute', left: 70, right: 60, top: 450, fontFamily: C.head, fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 0.98, letterSpacing: '-0.02em'}}>
      <div style={{fontSize: 118}}>You deleted</div>
      <div style={{fontSize: 118}}>
        the <span style={{background: C.accent, padding: '0 18px', boxShadow: `0 0 40px ${C.accent}66`}}>API key.</span>
      </div>
      <div style={{fontSize: 150, color: C.accent, marginTop: 26, textShadow: `0 0 50px ${C.accent}88`}}>Git didn't.</div>
    </div>

    {/* evidence: the recovered (fake) key */}
    <div style={{position: 'absolute', left: 70, right: 70, top: 1010, borderRadius: 20, overflow: 'hidden', background: 'rgba(11,13,18,0.94)', border: `1.5px solid ${C.secondary}`, boxShadow: `0 0 60px ${C.accent}33`}}>
      <div style={{height: 52, background: C.slate, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px'}}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div key={c} style={{width: 14, height: 14, borderRadius: 7, background: c}} />
        ))}
        <div style={{marginLeft: 14, fontFamily: C.mono, fontSize: 20, color: C.muted}}>recovering deleted file</div>
      </div>
      <div style={{padding: '22px 28px', fontFamily: C.mono, fontSize: 31, lineHeight: 1.5, color: C.text}}>
        <div>
          <span style={{color: C.accent}}>%</span> git show HEAD~3:.env
        </div>
        <div>
          AWS_ACCESS_KEY_ID=<span style={{background: `${C.accent}55`, boxShadow: `0 0 18px ${C.accent}`, padding: '0 4px', borderRadius: 4}}>{lab.fake_id}</span>
        </div>
      </div>
    </div>

    {/* proof row */}
    <div style={{position: 'absolute', left: 70, right: 70, top: 1290, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{fontFamily: C.head, fontWeight: 900, fontSize: 96, color: '#fff', lineHeight: 1}}>
        {ms}
        <span style={{color: C.accent}}> ms</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end'}}>
        <Chip solid>● REAL TEST</Chip>
        <Chip>LAB 01</Chip>
      </div>
    </div>
    <div style={{position: 'absolute', left: 70, top: 1412, fontFamily: C.mono, fontSize: 22, color: C.muted, letterSpacing: '0.08em'}}>FAKE KEY · GENERATED FOR THIS DEMO</div>
  </AbsoluteFill>
);
