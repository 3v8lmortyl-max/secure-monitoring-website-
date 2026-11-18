import React from 'react';
import {SceneDef} from './components/Scene';
import {Caption, Line} from './components/Text';
import {Arrow, BrandMark, Burst, CloudTile, CountUp, CubeTile, Gem, GraphIcon, PixelCritter, Pop, SparkTile, Wordmark} from './components/icons';
import {Book, BrowserCard, DarkMonitor, DocsCard, InstallCard, Laptop, OpenPage, TerminalWindow} from './components/mocks';
import {s} from './theme';

export type VideoProps = {
  /** Shown as the faint watermark and in the "follow" end card. */
  brandName: string;
  watermark: string;
  /** The tool the video is about. */
  productName: string;
  productTagline: string;
  installCommand: string;
  /** Comment-to-get call to action. */
  ctaKeyword: string;
  ctaOffer: string;
  ctaBookTitle: string;
  ctaGuideLine: string;
  ctaGuidePayoff: string;
};

export const defaultProps: VideoProps = {
  brandName: 'Secure Monitoring',
  watermark: 'securemonitoring',
  productName: 'Graphify',
  productTagline: 'Knowledge Graphs for AI Coding Assistants',
  installCommand: 'pip install graphify',
  ctaKeyword: 'GRAPH',
  ctaOffer: "And I'll send you my free guide",
  ctaBookTitle: 'Stop burning AI tokens',
  ctaGuideLine: 'A simple step by step guide',
  ctaGuidePayoff: 'set up in 5 minutes',
};

/* helpers: captions/bullets are authored in seconds */
const L = (text: string, size = 58, weight = 500): Line => ({text, size, weight});
const C = (at: number, ...lines: Line[]): Caption => ({at: s(at), lines});
const B = (at: number, text: string) => ({at: s(at), text});

const Row: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 40}) => (
  <div style={{display: 'flex', alignItems: 'center', gap}}>{children}</div>
);

export const buildScript = (p: VideoProps): SceneDef[] => [
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

export const totalFrames = (p: VideoProps) => buildScript(p).reduce((n, sc) => n + s(sc.duration), 0);
