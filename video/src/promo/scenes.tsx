import React from 'react';
import {SceneDef} from '../components/Scene';
import {Burst, Pop} from '../components/icons';
import {B, C, L} from '../script';
import {BrandWordmark, CameraIcon, CctvGrid, Console, IndustryTile, PriceCards, Stat, TrialCalendar} from './visuals';

export type PromoProps = {brandName: string; ctaLine: string};
export const promoDefaults: PromoProps = {brandName: 'Secure Monitoring', ctaLine: 'Link in bio'};

/**
 * "Your cameras are recording. Nobody's watching." – a promo for Secure Monitoring in the
 * explainer's style. Claims mirror the website: live human operators on existing CCTV, 24/7,
 * 30-second response *target*, $199/$299 per site per month, no setup fees, 7-day free trial.
 */
export const promoScenes = (p: PromoProps): SceneDef[] => [
  {
    id: 'hook',
    duration: 3.4,
    visual: () => <CameraIcon size={480} />,
    visualY: 560,
    captionY: 900,
    decor: {type: 'spokes', corners: ['tl', 'br']},
    sfx: [{at: 0, type: 'impact'}],
    captions: [{at: 0, speed: 5, lines: [L('Your store has', 58), L('*cameras*', 96, 700), L('but _nobody_ is *watching*', 62)], say: 'Your store has cameras... but nobody is watching.'}],
  },
  {
    id: 'record',
    duration: 5,
    visual: () => <CctvGrid label />,
    visualY: 560,
    captionY: 1060,
    captions: [
      C(0, L('Most cameras only', 58), L('*record*', 96, 700)),
      {...C(1.8, L('So you find out', 56), L('*the* *next* *morning*', 78, 700)), say: 'So you find out... the next morning.'},
    ],
  },
  {
    id: 'loss',
    duration: 3.6,
    dots: true,
    captionY: 760,
    sfx: [{at: 0.2, type: 'impact'}],
    captions: [C(0, L('when the *loss*', 70, 500), L('is already', 60), L('*done*', 130, 700))],
  },
  {
    id: 'logo',
    duration: 2.4,
    visual: () => <BrandWordmark name={p.brandName} />,
    visualY: 860,
    sfx: [{at: 0.5, type: 'ding'}],
    captions: [{...C(0.2), say: `${p.brandName} changes that.`}],
  },
  {
    id: 'intro',
    duration: 4.6,
    visual: () => <Burst size={300} />,
    visualY: 620,
    captionY: 900,
    captions: [
      C(0, L('*Live* *human* operators', 66, 500)),
      C(1.6, L('watching your', 56), L('*existing* *cameras*', 78, 700)),
      {...C(3.2, L('*24/7*', 150, 700)), say: 'Twenty-four seven!'},
    ],
  },
  {
    id: 'how',
    duration: 7,
    visual: () => <Console />,
    visualY: 520,
    bulletsY: 900,
    decor: {type: 'graph', corners: ['tr', 'bl']},
    sfx: [{at: 0.7, type: 'alert'}, {at: 2.3, type: 'pop'}],
    bullets: [
      B(0.4, 'Connects to the cameras|you already have'),
      B(1.9, 'Operators spot trouble|as it happens'),
      B(3.5, 'Your team gets alerted'),
      B(4.8, 'Every incident|gets reported'),
    ],
  },
  {
    id: 'stat',
    duration: 3.6,
    visual: () => <Stat to={30} unit="sec" />,
    visualY: 640,
    captionY: 900,
    sfx: [{at: 0.1, type: 'ticks'}, {at: 0.95, type: 'impact'}],
    captions: [{...C(0.9, L('response *target*', 70, 500), L('when it matters', 54)), say: 'Thirty-second response target, when it matters.'}],
  },
  {
    id: 'no',
    duration: 4.4,
    dots: true,
    bulletsY: 760,
    bulletSize: 60,
    bullets: [B(0, 'No new cameras'), B(1.2, 'No setup fees'), B(2.4, 'No guards|on payroll')],
  },
  {
    id: 'price',
    duration: 4.8,
    visual: () => <PriceCards />,
    visualY: 640,
    captionY: 1000,
    sfx: [{at: 0.4, type: 'ding'}],
    captions: [
      {...C(0.2, L('From *$199*', 84, 500), L('per site, per month', 54)), say: 'From one hundred ninety-nine dollars, per site, per month.'},
    ],
  },
  {
    id: 'built',
    duration: 5,
    captionY: 380,
    captions: [{...C(0, L('Built for', 66, 500), L('*US* *retail* *stores*', 76, 700)), say: 'Built for U.S. retail stores.'}],
    visual: () => (
      <div style={{display: 'grid', gridTemplateColumns: '300px 300px', gap: 50}}>
        <Pop delay={30}>
          <IndustryTile glyph="store" label="Convenience" color="#D97757" />
        </Pop>
        <Pop delay={42}>
          <IndustryTile glyph="bottle" label="Liquor" color="#7A4DE8" />
        </Pop>
        <Pop delay={54}>
          <IndustryTile glyph="basket" label="Grocery" color="#16a34a" />
        </Pop>
        <Pop delay={66}>
          <IndustryTile glyph="bag" label="Retail" color="#1E5BE6" />
        </Pop>
      </div>
    ),
    visualY: 1080,
    sfx: [{at: 1, type: 'pop'}, {at: 1.4, type: 'pop'}, {at: 1.8, type: 'pop'}, {at: 2.2, type: 'pop'}],
  },
  {
    id: 'trial',
    duration: 4.6,
    visual: () => <TrialCalendar />,
    visualY: 560,
    captionY: 950,
    decor: {type: 'spokes', corners: ['tr', 'bl']},
    sfx: [{at: 2.2, type: 'riser'}],
    captions: [C(0, L('Try it *free*', 76, 500), L('for *7* *days*', 96, 700))],
  },
  {
    id: 'cta',
    duration: 4.2,
    dots: true,
    visual: () => <BrandWordmark name={p.brandName} />,
    visualY: 700,
    captionY: 1000,
    sfx: [{at: 0, type: 'impact'}, {at: 0.6, type: 'ding'}],
    captions: [
      C(0.3, L('Start your', 58), L('*free* *trial*', 100, 700)),
      {...C(2.1, L('Start your', 58), L('*free* *trial*', 100, 700), L(p.ctaLine.split(' ').map((w) => `_${w}_`).join(' '), 56)), say: p.ctaLine + '.'},
    ],
  },
];
