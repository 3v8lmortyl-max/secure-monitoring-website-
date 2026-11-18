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
    duration: 171 / 30,
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
    visualY: 620,
    bulletsY: 900,
    decor: {type: 'spokes', corners: ['tr', 'bl']},
    bullets: [B(0, 'Installs in one|command'), B(1.4, 'Runs completely|locally'), B(2.9, 'Updates automatically|everytime your|*code* *changes*')],
  },
  {
    id: 'outro-hook',
    duration: 190 / 30,
    visual: () => <Burst size={340} />,
    visualY: 700,
    captionY: 1080,
    captions: [
      C(0.2, L('You just fixed the', 56), L('biggest problem in', 56)),
      C(1.8, L('*claude* *code*', 80, 700), L('for free', 60)),
      C(2.8, L('now fix the one', 60), L('*problem*', 96, 700)),
      C(4.3, L('every AI user', 56), L('*still* *has*', 96, 700)),
    ],
  },
  {
    id: 'cta',
    duration: 145 / 30,
    dots: true,
    visual: () => <Book title={p.ctaBookTitle} author={p.brandName} />,
    visualY: 860,
    captionY: 200,
    captions: [C(0, L('_Comment_', 60, 500), L(`*“${p.ctaKeyword}”*`, 110, 700))],
    extra: {top: 1300, captions: [C(2, L(p.ctaOffer, 46)), C(3, L(p.ctaOffer, 46), L(`“${p.ctaBookTitle}”`, 62, 600))]},
  },
  {
    id: 'guide-a',
    duration: 52 / 30,
    visual: () => <OpenPage />,
    visualY: 1500,
    captionY: 540,
    captions: [C(0, L(p.ctaGuideLine, 64, 600))],
  },
  {
    id: 'guide-b',
    duration: 93 / 30,
    visual: () => <OpenPage />,
    visualY: 260,
    captionY: 1120,
    captions: [C(0.2, L('To get it', 60, 500), L(`*${p.ctaGuidePayoff.split(' ').join('* *')}*`, 88, 700))],
  },
  {
    id: 'follow',
    duration: 113 / 30,
    dots: true,
    visual: () => <BrandMark size={300} />,
    visualY: 860,
    captionY: 300,
    captions: [C(0.3, L('Make sure you _follow_', 52), L(`*${p.brandName.split(' ').join('* *')}*`, 82, 700))],
    extra: {top: 1380, captions: [C(1.8, L('The system only _sends_ it to', 46), L('*FOLLOWERS*', 84, 700))]},
  },
];
