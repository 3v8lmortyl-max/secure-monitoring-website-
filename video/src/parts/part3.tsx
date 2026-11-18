import React from 'react';
import {SceneDef} from '../components/Scene';
import {Arrow, BrandMark, Burst, CloudTile, CountUp, CubeTile, Gem, GraphIcon, PixelCritter, Pop, SparkTile, Wordmark} from '../components/icons';
import {Book, BrowserCard, DarkMonitor, DocsCard, InstallCard, Laptop, OpenPage, TerminalWindow} from '../components/mocks';
import {B, C, L, Row, VideoProps} from '../script';
import {s} from '../theme';

/**
 * Part 3: original video frames 1390-2331 (941 frames).
 * The part is rendered inside a fixed-length sequence, so scene durations here must sum to exactly that.
 * Durations are in seconds (fractional allowed, e.g. 140 / 30); caption/bullet times are seconds from scene start.
 */
export const PART3_FRAMES = 941;

export const part3 = (p: VideoProps): SceneDef[] => [
  {
    id: 'next',
    duration: 5,
    visual: () => <TerminalWindow wallpaper={false} lines={[{t: '> claude', c: '#e6e6e6'}, {t: `  Querying ${p.productName.toLowerCase()} graph…`, c: '#9aa0a6'}, {t: '  ✓ 3 relevant nodes found', c: '#81c995'}, {t: '  Context used: 2,140 tokens', c: '#81c995'}]} />,
    visualY: 620,
    captionY: 1040,
    captions: [
      C(0, L('Then the next time', 56), L('*you* *open* a *session*', 66, 500)),
      C(2, L('*Claude*', 120, 700), L('does not re-read everything', 52)),
      C(3.6, L('it queries the', 56), L('*graph*', 84, 700)),
    ],
  },
  {
    id: 'answer',
    duration: 8,
    dots: true,
    decor: {type: 'graph', corners: ['tr', 'bl']},
    captionY: 520,
    bulletsY: 760,
    captions: [C(0, L('*The* *answer* *it* *needs*', 62, 700), L('*is* *already* *there*', 62, 700))],
    bullets: [B(2, 'One lookup'), B(3, 'A fraction of|the tokens'), B(4.6, 'The same|exact results'), B(6.2, 'The numbers|are wild')],
  },
  {
    id: 'stat',
    duration: 3,
    visual: () => (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
        <Burst size={330} />
        <CountUp from={41} to={49} suffix="x" />
      </div>
    ),
    visualY: 720,
    captionY: 1080,
    captions: [C(0.9, L('fewer tokens on large', 52), L('*code* *bases*', 76, 700))],
  },
  {
    id: 'saving',
    duration: 6,
    visual: () => (
      <Row>
        <GraphIcon size={240} />
        <Arrow width={130} delay={12} />
        <Gem size={200} delay={20} />
      </Row>
    ),
    visualY: 560,
    captionY: 860,
    captions: [C(0.8, L('The saving hits', 60), L('*71x*', 120, 700), L('per _session_', 58))],
  },
  {
    id: 'price',
    duration: 5,
    dots: true,
    captionY: 800,
    captions: [C(0, L('*$20* *>* *$200*', 100, 700)), C(1.9, L('*$20* *>* *$200*', 100, 700), L('Without paying a', 56), L('*dollar* *more*', 86, 700))],
  },
  {
    id: 'works',
    duration: 5,
    captionY: 560,
    captions: [C(0, L('It works with', 66, 500))],
    visual: () => (
      <div style={{display: 'grid', gridTemplateColumns: '260px 260px', gap: 60, justifyItems: 'center', alignItems: 'center'}}>
        <Pop delay={s(1)}>
          <Burst size={220} delay={s(1)} />
        </Pop>
        <Pop delay={s(1.8)}>
          <CubeTile size={210} />
        </Pop>
        <Pop delay={s(2.6)}>
          <CloudTile size={250} />
        </Pop>
        <Pop delay={s(3.2)}>
          <SparkTile size={250} />
        </Pop>
      </div>
    ),
    visualY: 1000,
  },
];
