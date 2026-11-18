import React from 'react';
import {SceneDef} from '../components/Scene';
import {Arrow, BrandMark, Burst, CloudTile, CountUp, CubeTile, Gem, GraphIcon, PixelCritter, Pop, SparkTile, Wordmark} from '../components/icons';
import {Book, BrowserCard, DarkMonitor, DocsCard, InstallCard, Laptop, OpenPage, TerminalWindow} from '../components/mocks';
import {B, C, L, Row, VideoProps} from '../script';
import {s} from '../theme';

/**
 * Part 1: original video frames 0-699 (699 frames).
 * The part is rendered inside a fixed-length sequence, so scene durations here must sum to exactly that.
 * Durations are in seconds (fractional allowed, e.g. 140 / 30); caption/bullet times are seconds from scene start.
 */
export const PART1_FRAMES = 699;

export const part1 = (p: VideoProps): SceneDef[] => [
  {
    id: 'hook',
    duration: 3,
    visual: () => <PixelCritter badge="20X" size={440} />,
    visualY: 560,
    captionY: 840,
    decor: {type: 'spokes', corners: ['tl', 'br']},
    captions: [
      {
        at: 0,
        speed: 5,
        lines: [L('*CLAUDE* *CODE*', 74, 700), L('developers are', 56), L('_canceling_ _their_', 56), L('*$200* *plan*', 68, 500)],
      },
    ],
  },
  {
    id: 'dropped',
    duration: 6,
    visual: () => <BrowserCard title={`${p.productName} — ${p.productTagline}`} subtitle={`${p.productName} is an open-source skill that helps AI coding assistants understand your codebase by building a queryable knowledge graph from code, docs and diagrams.`} command={p.installCommand} />,
    visualY: 560,
    captionY: 1030,
    captions: [
      C(0, L('Because one _developer_', 56), L('*quitely* *dropped*', 78, 700), L('a free tool', 56)),
      C(3, L('that *permanently*', 62), L('solved', 62)),
      C(4, L('the biggest token', 62), L('*problem* *forever*', 72, 700)),
    ],
  },
  {
    id: 'logo',
    duration: 2,
    visual: () => <Wordmark name={p.productName} />,
    visualY: 860,
  },
  {
    id: 'problem',
    duration: 3,
    visual: () => <PixelCritter alert tilt={-28} size={420} />,
    visualY: 600,
    captionY: 960,
    captions: [
      C(0, L("Here's the", 56), L('*massive* *problem*', 74, 700)),
      C(1.2, L('every', 54), L('*claude* *code*', 76, 700), L('developer lives with', 54)),
    ],
  },
  {
    id: 'reread',
    duration: 9,
    visual: () => <TerminalWindow />,
    visualY: 600,
    captionY: 1000,
    bulletsY: 1000,
    captions: [
      C(0, L('Every single time you', 56), L('*start* a new session', 66, 600)),
      C(2.2, L('claude has to re-read', 54), L('your entire _codebase_', 58), L('*from* *scratch*', 84, 700)),
      C(4.8),
    ],
    // empty caption clears the previous one before the list starts
    bullets: [B(5, 'Every file'), B(5.9, 'Every function'), B(6.8, 'Every relationship|between them')],
  },
];
