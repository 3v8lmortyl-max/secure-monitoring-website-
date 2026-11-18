/**
 * Secure Monitoring brand ad (1080x1920), styled on the brand sheet (shield mark, #2563EB/#1D4ED8 on #0B1220, Inter).
 * Claims mirror the website: live human operators on existing CCTV, 24/7, incident alerts/logs/reports,
 * multi-store coverage, 30-second response *target*, $199/$299 per site/month, no setup fees, 7-day free trial.
 * No AI-analytics / customer / transaction features: the website states it doesn't offer them.
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, Series, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {Backdrop, clamp, ease, Label, Reveal, Rise, s, Scene, SM} from './kit';
import {AlertCard, Button, CctvPhoto, Glass, Icon, IconTile, LowerThird, Lockup, PriceCard, Ring, Step} from './assets';

export type SfxType = 'impact' | 'ding' | 'alert' | 'ticks' | 'riser' | 'pop';
export type AdScene = {
  id: string;
  duration: number; // seconds
  vo: {at: number; text: string}[]; // voice-over lines, seconds from scene start
  sfx?: {at: number; type: SfxType}[];
  hud?: boolean;
  cam?: string;
  render: () => React.ReactNode;
};

const Center: React.FC<{y: number; children: React.ReactNode}> = ({y, children}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>{children}</div>
);

const ActiveSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = [
    {n: '01', icon: 'video', title: 'Connect', sub: 'Your existing cameras', at: s(0.4)},
    {n: '02', icon: 'eye', title: 'Monitor', sub: 'Live, trained operators', at: s(1.9)},
    {n: '03', icon: 'bell', title: 'Alert', sub: 'Your team is notified', at: s(3.4)},
    {n: '04', icon: 'file', title: 'Report', sub: 'Every incident logged', at: s(4.9)},
  ];
  const active = steps.reduce((a, st, i) => (frame >= st.at ? i : a), 0);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 28}}>
      {steps.map((st, i) => (
        <Step key={st.n} {...st} active={i === active} />
      ))}
    </div>
  );
};

const CheckRow: React.FC<{text: string; at: number}> = ({text, at}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 20], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{width: 92, height: 92, borderRadius: 46, border: `2px solid ${SM.blueHi}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(76,141,255,0.3)'}}>
        <Icon name="check" size={50} color={SM.blueHi} stroke={2.4} />
      </div>
      <div style={{fontFamily: SM.font, fontSize: 70, fontWeight: 600, color: SM.text, letterSpacing: '-0.03em'}}>{text}</div>
    </div>
  );
};

const Light: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: 'radial-gradient(80% 60% at 50% 40%, #FFFFFF 0%, #EEF3FB 70%, #E2EAF7 100%)'}}>{children}</AbsoluteFill>
);

const FEEDS: [string, string][] = [
  ['brand/operator.jpg', '10% 25%'],
  ['brand/store-exterior.jpg', '40% 60%'],
  ['brand/operator.jpg', '20% 20%'],
  ['brand/store-exterior.jpg', '60% 95%'],
  ['brand/aisle-theft.jpg', '0% 50%'],
  ['brand/operator.jpg', '70% 15%'],
  ['brand/store-exterior.jpg', '90% 70%'],
  ['brand/operator.jpg', '45% 10%'],
  ['brand/store-exterior.jpg', '10% 80%'],
];

export const adScenes: AdScene[] = [
  {
    id: 'open',
    duration: 4,
    hud: true,
    cam: 'CAM 01 · STOREFRONT',
    vo: [{at: 0.3, text: 'Your cameras are recording.'}],
    sfx: [{at: 0, type: 'impact'}],
    render: () => (
      <>
        <Center y={300}>
          <Rise dist={40}>
            <CctvPhoto src="brand/store-exterior.jpg" w={940} h={1000} cam="CAM 01 STOREFRONT" pos="35% 50%" />
          </Rise>
        </Center>
        <Center y={1390}>
          <Reveal at={8} size={100} lines={['Your cameras are', '*recording.*']} />
        </Center>
      </>
    ),
  },
  {
    id: 'problem',
    duration: 5,
    vo: [{at: 0.2, text: "But cameras alone don't stop theft. Most footage is only reviewed after the loss."}],
    render: () => (
      <>
        <Center y={260}>
          <Label text="THE PROBLEM" color={SM.red} />
        </Center>
        <Center y={360}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 10}}>
            {FEEDS.map(([src, pos], i) => (
              <Rise key={i} at={i * 2} dist={30}>
                <CctvPhoto src={src} w={300} h={300} pos={pos} cam={`CAM 0${i + 1}`} zoom={[1.3, 1.4]} dim={0.35} mono={i % 2 === 1} />
              </Rise>
            ))}
          </div>
        </Center>
        <Center y={1390}>
          <Reveal at={14} size={86} lines={["Cameras alone", "don't ^stop^ ^theft.^"]} />
        </Center>
      </>
    ),
  },
  {
    id: 'brand',
    duration: 4.7,
    vo: [{at: 0.5, text: 'Secure Monitoring. Live, human monitoring for retail stores.'}],
    sfx: [{at: 0.3, type: 'impact'}, {at: 0.9, type: 'ding'}],
    render: () => (
      <Light>
        <Center y={700}>
          <Lockup at={6} light />
        </Center>
      </Light>
    ),
  },
  {
    id: 'ops',
    duration: 5,
    vo: [{at: 0.2, text: 'A trained team watches your cameras live, twenty-four seven.'}],
    render: () => (
      <>
        <Center y={250}>
          <Rise dist={50}>
            <div style={{borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', border: `1px solid ${SM.line}`}}>
              <CctvPhoto src="brand/operator.jpg" w={960} h={700} cam="SOC" label={false} zoom={[1.02, 1.1]} />
            </div>
          </Rise>
        </Center>
        <div style={{position: 'absolute', left: 60, top: 860}}>
          <LowerThird at={12} />
        </div>
        <Center y={1180}>
          <Reveal at={24} size={88} lines={['Live monitoring by', 'a *trained* *team.*']} />
        </Center>
      </>
    ),
  },
  {
    id: 'alert',
    duration: 4.8,
    hud: true,
    cam: 'CAM 07 · AISLE 4',
    vo: [{at: 0.2, text: 'When something happens, your team gets alerted, and the incident is logged.'}],
    sfx: [{at: 1.0, type: 'alert'}],
    render: () => (
      <>
        <Center y={260}>
          <CctvPhoto src="brand/aisle-theft.jpg" w={940} h={980} cam="CAM 07 AISLE 4" pos="50% 40%" zoom={[1.0, 1.08]} />
        </Center>
        <Center y={1080}>
          <AlertCard at={30} />
        </Center>
        <Center y={1390}>
          <Reveal at={40} size={84} lines={['Incident ^alerts^', 'as it happens.']} />
        </Center>
      </>
    ),
  },
  {
    id: 'process',
    duration: 7,
    vo: [
      {at: 0.4, text: 'Connect the cameras you already have.'},
      {at: 1.9, text: 'We monitor live.'},
      {at: 3.4, text: 'Your team gets alerted,'},
      {at: 4.9, text: 'and every incident is reported.'},
    ],
    sfx: [{at: 0.4, type: 'pop'}, {at: 1.9, type: 'pop'}, {at: 3.4, type: 'pop'}, {at: 4.9, type: 'pop'}],
    render: () => (
      <>
        <Center y={330}>
          <Label text="HOW IT WORKS" />
        </Center>
        <Center y={430}>
          <Reveal size={86} lines={['Four steps.', '_Zero_ _new_ _hardware._']} />
        </Center>
        <Center y={760}>
          <ActiveSteps />
        </Center>
      </>
    ),
  },
  {
    id: 'response',
    duration: 4.4,
    vo: [{at: 0.3, text: 'Our target: begin responding within thirty seconds.'}],
    sfx: [{at: 0.2, type: 'ticks'}, {at: 1.5, type: 'impact'}],
    render: () => (
      <>
        <Center y={300}>
          <Label text="RESPONSE TARGET" />
        </Center>
        <Center y={430}>
          <Ring to={30} unit="sec" at={4} size={600} />
        </Center>
        <Center y={1150}>
          <Reveal at={18} size={76} weight={500} lines={['Our team begins responding', 'within *30* *seconds.*']} />
        </Center>
      </>
    ),
  },
  {
    id: 'benefits',
    duration: 6.6,
    vo: [{at: 0.2, text: 'Theft alerts. Incident reports. Multi-store coverage. With no new cameras, and no setup fees.'}],
    sfx: [{at: 0.2, type: 'pop'}, {at: 0.9, type: 'pop'}, {at: 1.6, type: 'pop'}, {at: 2.3, type: 'pop'}],
    render: () => (
      <>
        <Center y={330}>
          <Label text="WHAT YOU GET" />
        </Center>
        <Center y={520}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 400px)', rowGap: 70, columnGap: 40}}>
            <IconTile icon="video" label="24/7 Live Monitoring" at={s(0.2)} />
            <IconTile icon="alert" label="Theft Alerts" at={s(0.9)} />
            <IconTile icon="file" label="Incident Reports" at={s(1.6)} />
            <IconTile icon="stores" label="Multi-Store Coverage" at={s(2.3)} />
          </div>
        </Center>
        <Center y={1330}>
          <Reveal at={s(3.2)} size={64} weight={500} lines={['No new cameras · *No* *setup* *fees*']} />
        </Center>
      </>
    ),
  },
  {
    id: 'pricing',
    duration: 5,
    vo: [{at: 0.3, text: 'Plans start at one ninety-nine per site, per month.'}],
    sfx: [{at: 0.5, type: 'ding'}],
    render: () => (
      <>
        <Center y={330}>
          <Label text="PRICING" />
        </Center>
        <Center y={430}>
          <Reveal size={92} lines={['Plans from *$199*']} />
        </Center>
        <Center y={700}>
          <div style={{display: 'flex', gap: 40}}>
            <PriceCard name="Basic" price="$199" note="per site / month" at={s(0.6)} />
            <PriceCard name="Professional" price="$299" note="per site / month" at={s(1.0)} glow />
          </div>
        </Center>
        <Center y={1260}>
          <Rise at={s(1.8)}>
            <div style={{fontFamily: SM.mono, fontSize: 28, letterSpacing: '0.14em', color: SM.muted}}>ENTERPRISE FROM $699 / MONTH</div>
          </Rise>
        </Center>
      </>
    ),
  },
  {
    id: 'us',
    duration: 5.2,
    vo: [{at: 0.2, text: 'Built for convenience, liquor, grocery, and retail stores across America.'}],
    render: () => (
      <>
        <Center y={300}>
          <Label text="BUILT FOR US RETAIL" />
        </Center>
        <Center y={400}>
          <Rise>
            <div style={{width: 960, height: 690, borderRadius: 18, overflow: 'hidden', border: `1px solid ${SM.line}`}}>
              <Img src={staticFile('brand/us-map.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </Rise>
        </Center>
        <Center y={1180}>
          <div style={{display: 'flex', gap: 34}}>
            {[
              ['store', 'Convenience'],
              ['bottle', 'Liquor'],
              ['cart', 'Grocery'],
              ['bag', 'Retail'],
            ].map(([icon, label], i) => (
              <IconTile key={label} icon={icon} label={label} at={s(0.6) + i * 6} size={150} />
            ))}
          </div>
        </Center>
      </>
    ),
  },
  {
    id: 'cta',
    duration: 5.6,
    vo: [{at: 0.3, text: 'Secure your store today. Start your seven-day free trial.'}],
    sfx: [{at: 0, type: 'impact'}, {at: 2.4, type: 'ding'}],
    render: () => (
      <>
        <Center y={380}>
          <Lockup at={0} scale={0.85} />
        </Center>
        <Center y={820}>
          <Reveal at={14} size={104} lines={['Secure Your Store', '*Today*']} />
        </Center>
        <Center y={1150}>
          <Button text="Start your 7-day free trial  →" at={s(2.2)} />
        </Center>
        <Center y={1370}>
          <Rise at={s(2.8)}>
            <div style={{fontFamily: SM.font, fontSize: 30, color: SM.muted, display: 'flex', gap: 40}}>
              <span>24/7 Monitoring</span>
              <span>·</span>
              <span>No Setup Fees</span>
              <span>·</span>
              <span>Existing Cameras</span>
            </div>
          </Rise>
        </Center>
      </>
    ),
  },
];

export const adFrames = adScenes.reduce((n, sc) => n + s(sc.duration), 0);

export const Ad: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => (
  <AbsoluteFill style={{background: SM.bg, overflow: 'hidden'}}>
    <Backdrop />
    {withAudio ? <Audio src={staticFile('audio/ad.mp3')} /> : null}
    <Series>
      {adScenes.map((sc) => (
        <Series.Sequence key={sc.id} name={sc.id} durationInFrames={s(sc.duration)}>
          <Scene duration={s(sc.duration)} hud={sc.hud} cam={sc.cam}>
            {sc.render()}
          </Scene>
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
