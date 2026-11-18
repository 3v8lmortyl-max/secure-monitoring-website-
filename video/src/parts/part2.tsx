import React from 'react';
import {SceneDef} from '../components/Scene';
import {Arrow, BrandMark, Burst, CloudTile, CountUp, CubeTile, Gem, GraphIcon, PixelCritter, Pop, SparkTile, Wordmark} from '../components/icons';
import {Book, BrowserCard, DarkMonitor, DocsCard, InstallCard, Laptop, OpenPage, TerminalWindow} from '../components/mocks';
import {B, C, L, Row, VideoProps} from '../script';
import {s} from '../theme';

/**
 * Part 2: original video frames 699-1390 (691 frames).
 * The part is rendered inside a fixed-length sequence, so scene durations here must sum to exactly that.
 * Durations are in seconds (fractional allowed, e.g. 140 / 30); caption/bullet times are seconds from scene start.
 */
export const PART2_FRAMES = 691;

export const part2 = (p: VideoProps): SceneDef[] => [
  {
    id: 'tokens',
    duration: 5,
    visual: () => <DarkMonitor />,
    visualY: 640,
    captionY: 1100,
    captions: [
      C(0, L('On a large project that is', 50), L('10s of 1000s of', 68, 500), L('*tokens* *burned*', 78, 700)),
      C(3, L('before you type a', 56), L('*single* *word*', 80, 700)),
    ],
  },
  {
    id: 'fixes',
    duration: 3,
    visual: () => <GraphIcon size={300} />,
    visualY: 700,
    captionY: 960,
    captions: [C(0.6, L(`${p.productName} fixes that`, 56), L('*permanently*', 84, 700))],
  },
  {
    id: 'scans',
    duration: 3,
    visual: () => <BrowserCard title={`${p.productName} — ${p.productTagline}`} subtitle="Point it at any repository. It parses every file once and keeps a living map of how your code fits together." command={p.installCommand} />,
    visualY: 560,
    captionY: 1030,
    captions: [
      C(0, L('It scans your', 58), L('*entire* *codebase*', 72, 700)),
      C(1.2, L('and builds a persistent', 56), L('*knowledge* *graph*', 76, 700)),
    ],
  },
  {
    id: 'maps',
    duration: 6,
    visual: () => <DocsCard name={p.productName} />,
    visualY: 520,
    bulletsY: 900,
    decor: {type: 'graph', corners: ['tr', 'bl']},
    bullets: [B(0.3, 'Every class'), B(1, 'Every function'), B(1.8, 'Every import'), B(2.7, 'Every call relationship'), B(3.8, 'Every architectural|decision')],
  },
  {
    id: 'local',
    duration: 3,
    visual: () => (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 120}}>
        <div style={{position: 'relative', height: 420, width: 400, display: 'flex', justifyContent: 'center'}}>
          <Burst size={300} />
          <div style={{position: 'absolute', top: 240}}>
            <GraphIcon size={190} delay={10} />
          </div>
        </div>
        <Laptop />
      </div>
    ),
    visualY: 900,
  },
  {
    id: 'privacy',
    duration: 3,
    dots: true,
    bulletsY: 780,
    bulletSize: 60,
    bullets: [B(0, 'No code leaves|your devices'), B(1.1, 'No cloud'), B(1.8, 'No privacy risk')],
  },
];
