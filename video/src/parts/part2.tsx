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
  // Cuts measured on the original: 699 | 834 | 913 | 1012 | 1211 | 1286 | 1390 (sum 691 frames)
  {
    id: 'tokens',
    duration: 135 / 30,
    visual: () => <DarkMonitor />,
    visualY: 663,
    captionY: 1180,
    captions: [
      {at: 1, speed: 5, lines: [L('On a large project that is', 52), L('10s of 1000s of', 70, 500), L('*tokens* *burned*', 92, 700)]},
      {at: 91, speed: 5, lines: [L('before you type a', 60), L('*single* *word*', 96, 700)]},
    ],
  },
  {
    id: 'fixes',
    duration: 79 / 30,
    visual: () => <GraphIcon size={300} />,
    visualY: 700,
    captionY: 1000,
    captions: [{at: 36, speed: 5, lines: [L('and fixes that', 56), L('*permanently*', 84, 700)]}],
  },
  {
    id: 'scans',
    duration: 99 / 30,
    visual: () => <BrowserCard title={`${p.productName} — ${p.productTagline}`} subtitle="Point it at any repository. It parses every file once and keeps a living map of how your code fits together." command={p.installCommand} />,
    visualY: 560,
    captionY: 1030,
    captions: [
      {at: 7, speed: 6, lines: [L('It scans your', 58), L('*entire* *codebase*', 72, 700)]},
      {at: 45, speed: 6, lines: [L('and builds a persistent', 56), L('*knowledge* *graph*', 76, 700)]},
    ],
  },
  {
    id: 'maps',
    duration: 199 / 30,
    visual: () => <DocsCard name={p.productName} />,
    visualY: 520,
    bulletsY: 900,
    decor: {type: 'graph', corners: ['tr', 'bl']},
    bullets: [B(3 / 30, 'Every class'), B(38 / 30, 'Every function'), B(68 / 30, 'Every import'), B(98 / 30, 'Every call relationship'), B(143 / 30, 'Every architectural|decision')],
  },
  {
    id: 'local',
    duration: 75 / 30,
    visual: () => (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 120}}>
        <div style={{position: 'relative', height: 420, width: 400, display: 'flex', justifyContent: 'center'}}>
          <Burst size={300} />
          <div style={{position: 'absolute', top: 240}}>
            <GraphIcon size={190} delay={24} />
          </div>
        </div>
        <Laptop />
      </div>
    ),
    visualY: 900,
  },
  {
    id: 'privacy',
    duration: 104 / 30,
    dots: true,
    bulletsY: 700,
    bulletSize: 48,
    bullets: [B(4 / 30, 'No code leaves|your devices'), B(49 / 30, 'No cloud'), B(74 / 30, 'No privacy risk')],
  },
];
