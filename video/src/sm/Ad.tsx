/**
 * "Eyes on your store. Live." – Secure Monitoring brand ad (1080x1920).
 * Every claim mirrors the website: live human operators on existing CCTV, 24/7,
 * 30-second response *target*, $199 / $299 per site per month, no setup fees, 7-day free trial.
 */
import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {Backdrop, clamp, ease, Label, Reveal, Rise, s, Scene, SM} from './kit';
import {Button, CameraFeed, Glass, Icon, Logo, OpsPhoto, PriceCard, Ring, Step} from './assets';

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
    {n: '01', icon: 'camera', title: 'Connect', sub: 'Your existing cameras', at: s(0.4)},
    {n: '02', icon: 'eye', title: 'Watch', sub: 'Live, human monitoring', at: s(1.9)},
    {n: '03', icon: 'bell', title: 'Alert', sub: 'Your team is notified', at: s(3.4)},
    {n: '04', icon: 'file', title: 'Report', sub: 'Every incident documented', at: s(4.9)},
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

export const adScenes: AdScene[] = [
  {
    id: 'open',
    duration: 4,
    hud: true,
    cam: 'CAM 04 · AISLE 4',
    vo: [{at: 0.3, text: 'Your cameras are recording.'}],
    sfx: [{at: 0, type: 'impact'}],
    render: () => (
      <>
        <Center y={300}>
          <Rise dist={40}>
            <CameraFeed w={940} h={1000} seed="a" cam="AISLE 4" person />
          </Rise>
        </Center>
        <Center y={1390}>
          <Reveal at={8} size={100} lines={['Your cameras are', '^recording.^']} />
        </Center>
      </>
    ),
  },
  {
    id: 'question',
    duration: 3.4,
    vo: [{at: 0.1, text: 'But is anyone actually watching?'}],
    render: () => (
      <>
        <AbsoluteFill style={{opacity: 0.22, filter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CameraFeed w={1080} h={1920} seed="b" cam="" />
        </AbsoluteFill>
        <Center y={720}>
          <Reveal at={4} size={128} lines={['But is anyone', '*watching?*']} />
        </Center>
      </>
    ),
  },
  {
    id: 'wall',
    duration: 5,
    vo: [{at: 0.2, text: 'Most footage only gets reviewed after the loss has already happened.'}],
    render: () => (
      <>
        <Center y={260}>
          <Label text="THE PROBLEM" color={SM.red} />
        </Center>
        <Center y={360}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 12}}>
            {Array.from({length: 9}).map((_, i) => (
              <Rise key={i} at={i * 2} dist={30}>
                <CameraFeed w={300} h={300} seed={`w${i}`} cam={`CAM ${String(i + 1).padStart(2, '0')}`} dim={i === 4 ? 0 : 0.35} person={i === 4} />
              </Rise>
            ))}
          </div>
        </Center>
        <Center y={1400}>
          <Reveal at={14} size={84} weight={500} lines={['Most footage gets reviewed', '^after^ the loss.']} />
        </Center>
      </>
    ),
  },
  {
    id: 'brand',
    duration: 4.2,
    vo: [{at: 0.5, text: 'Secure Monitoring puts trained eyes on your store. Live.'}],
    sfx: [{at: 0.3, type: 'impact'}, {at: 0.9, type: 'ding'}],
    render: () => (
      <>
        <Center y={640}>
          <Logo width={820} at={6} />
        </Center>
        <Center y={1180}>
          <Label text="LIVE REMOTE VIDEO MONITORING" at={30} color={SM.muted} />
        </Center>
      </>
    ),
  },
  {
    id: 'ops',
    duration: 5,
    vo: [{at: 0.2, text: 'Real, trained operators watching your cameras live, twenty-four seven.'}],
    render: () => (
      <>
        <Center y={250}>
          <Rise dist={50}>
            <OpsPhoto w={960} h={760} />
          </Rise>
        </Center>
        <Center y={1110}>
          <Reveal at={10} size={98} lines={['Trained operators.', 'Watching live.', '*24/7.*']} stagger={4} />
        </Center>
      </>
    ),
  },
  {
    id: 'flag',
    duration: 4.6,
    hud: true,
    cam: 'CAM 07 · REAR AISLE',
    vo: [{at: 0.2, text: 'Trouble gets spotted as it happens, not the next morning.'}],
    sfx: [{at: 1.0, type: 'alert'}],
    render: () => (
      <>
        <Center y={300}>
          <CameraFeed w={940} h={1000} seed="f" cam="REAR AISLE" person flag={30} />
        </Center>
        <Center y={1390}>
          <Reveal at={8} size={92} lines={['Spotted as it', '^happens.^']} />
        </Center>
      </>
    ),
  },
  {
    id: 'process',
    duration: 7,
    vo: [
      {at: 0.4, text: 'Connect your existing cameras.'},
      {at: 1.9, text: 'We watch live.'},
      {at: 3.4, text: 'Your team gets alerted,'},
      {at: 4.9, text: 'and every incident is documented.'},
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
          <Reveal at={18} size={76} weight={500} lines={['Our team begins responding', 'within *30 seconds.*']} />
        </Center>
      </>
    ),
  },
  {
    id: 'simple',
    duration: 4.4,
    vo: [
      {at: 0.2, text: 'Your existing cameras.'},
      {at: 1.4, text: 'No setup fees.'},
      {at: 2.5, text: 'Simple per-site pricing.'},
    ],
    sfx: [{at: 0.2, type: 'pop'}, {at: 1.4, type: 'pop'}, {at: 2.5, type: 'pop'}],
    render: () => (
      <div style={{position: 'absolute', left: 120, top: 640, display: 'flex', flexDirection: 'column', gap: 64}}>
        <CheckRow text="Your existing cameras" at={s(0.2)} />
        <CheckRow text="No setup fees" at={s(1.4)} />
        <CheckRow text="Per-site pricing" at={s(2.5)} />
      </div>
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
    id: 'retail',
    duration: 4.6,
    vo: [{at: 0.2, text: 'Built for convenience, liquor, grocery, and retail stores across the U.S.'}],
    render: () => (
      <>
        <Center y={330}>
          <Label text="BUILT FOR US RETAIL" />
        </Center>
        <Center y={620}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 420px)', gap: 36}}>
            {[
              ['store', 'Convenience'],
              ['bottle', 'Liquor'],
              ['cart', 'Grocery'],
              ['bag', 'Retail'],
            ].map(([icon, label], i) => (
              <Rise key={label} at={s(0.3) + i * 8}>
                <Glass style={{height: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28}}>
                  <Icon name={icon} size={120} color={SM.text} stroke={1.3} />
                  <div style={{fontFamily: SM.font, fontSize: 46, fontWeight: 600, color: SM.text, letterSpacing: '-0.02em'}}>{label}</div>
                </Glass>
              </Rise>
            ))}
          </div>
        </Center>
      </>
    ),
  },
  {
    id: 'cta',
    duration: 5.6,
    vo: [{at: 0.3, text: 'Try Secure Monitoring free for seven days. Start your free trial today.'}],
    sfx: [{at: 0, type: 'impact'}, {at: 2.4, type: 'ding'}],
    render: () => (
      <>
        <Center y={400}>
          <Logo width={640} at={0} />
        </Center>
        <Center y={860}>
          <Reveal at={14} size={118} lines={['Try it free', 'for *7* *days.*']} />
        </Center>
        <Center y={1190}>
          <Button text="Start your free trial" at={s(2.2)} />
        </Center>
        <Center y={1400}>
          <Rise at={s(2.8)}>
            <div style={{fontFamily: SM.mono, fontSize: 26, letterSpacing: '0.16em', color: SM.muted}}>NO SETUP FEES · YOUR EXISTING CAMERAS</div>
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
