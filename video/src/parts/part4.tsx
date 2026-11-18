import React from 'react';
import {SceneDef} from '../components/Scene';
import {Arrow, BrandMark, Burst, CloudTile, CountUp, CubeTile, Gem, GraphIcon, PixelCritter, Pop, SparkTile, Wordmark} from '../components/icons';
import {Book, BrowserCard, DarkMonitor, DocsCard, InstallCard, Laptop, OpenPage, TerminalWindow} from '../components/mocks';
import {B, C, L, Row, VideoProps} from '../script';
import {s} from '../theme';

/**
 * Part 4: original video frames 2331-3095 (764 frames).
 * The part is rendered inside a fixed-length sequence, so scene durations here must sum to exactly that.
 * Durations are in seconds (fractional allowed, e.g. 140 / 30); caption/bullet times are seconds from scene start.
 */
export const PART4_FRAMES = 764;

export const part4 = (p: VideoProps): SceneDef[] => [
  {
    id: 'install',
    duration: 5,
    visual: () => (
      <InstallCard
        lines={[
          '# Requires Python 3.10+',
          p.installCommand,
          '# Build the graph for this repo',
          `${p.productName.toLowerCase()} build .`,
          '# Connect your assistant',
          `${p.productName.toLowerCase()} install`,
        ]}
      />
    ),
    visualY: 520,
    bulletsY: 900,
    decor: {type: 'spokes', corners: ['tr', 'bl']},
    bullets: [B(0.3, 'Installs in one|command'), B(1.4, 'Runs completely|locally'), B(2.6, 'Updates automatically|every time your|code changes')],
  },
  {
    id: 'outro-hook',
    duration: 7,
    visual: () => <Burst size={340} />,
    visualY: 620,
    captionY: 930,
    captions: [
      C(0.4, L('You just fixed the', 56), L('biggest *problem*', 66, 500)),
      C(2, L('in *claude* _code_', 80, 600)),
      C(3, L('now fix the one', 54), L('*problem*', 90, 700)),
      C(4.6, L('every AI user', 56), L('*still* *has*', 96, 700)),
    ],
  },
  {
    id: 'cta',
    duration: 5,
    dots: true,
    visual: () => <Book title={p.ctaBookTitle} author={p.brandName} />,
    visualY: 860,
    captionY: 230,
    captions: [C(0, L('_Comment_', 52, 500), L(`*“${p.ctaKeyword}”*`, 104, 700))],
    extra: {top: 1270, captions: [C(1.2, L(p.ctaOffer, 46)), C(2.6, L(p.ctaOffer, 46), L(`“${p.ctaBookTitle}”`, 62, 600))]},
  },
  {
    id: 'guide',
    duration: 4,
    visual: () => <OpenPage />,
    visualY: 260,
    captionY: 1060,
    captions: [C(0, L(p.ctaGuideLine, 64, 600)), C(1.6, L('To get it', 56), L(`*${p.ctaGuidePayoff.split(' ').join('* *')}*`, 76, 700))],
  },
  {
    id: 'follow',
    duration: 4,
    dots: true,
    visual: () => <BrandMark size={300} />,
    visualY: 760,
    captionY: 230,
    captions: [C(0.3, L('Make sure you _follow_', 52), L(`*${p.brandName.split(' ').join('* *')}*`, 82, 700))],
    extra: {top: 1180, captions: [C(1.6, L('The system only _sends_ it to', 46), L('*FOLLOWERS*', 84, 700))]},
  },
];
