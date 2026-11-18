/**
 * Landscape (1920x1080) version of the full Secure Monitoring ad.
 * Same scenes, timing, voice-over, music and SFX as the vertical ad (reuses audio/ad.mp3);
 * every scene is re-laid out for 16:9: copy on one side, visual on the other, or full-bleed photography.
 */
import React from 'react';
import {AbsoluteFill, Audio, Img, Series, staticFile} from 'remotion';
import {ActiveSteps, adScenes, AI, Light, WALL, Wordmark} from './Ad';
import {AlertCard, Bracket, Button, CctvPhoto, HeroPhoto, IconTile, LowerThird, PriceCard, PushNotice, Ring} from './assets';
import {Backdrop, Label, Reveal, Rise, s, Scene, SM} from './kit';
import {Shield3D} from './three';
import {UsMap} from './usmap';

const At: React.FC<{x: number; y: number; w?: number; children: React.ReactNode; center?: boolean}> = ({x, y, w, children, center}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, display: 'flex', flexDirection: 'column', alignItems: center ? 'center' : 'flex-start'}}>{children}</div>
);

/** Left-aligned headline block: overline label + masked reveal. */
const Copy: React.FC<{label?: string; labelColor?: string; lines: string[]; at?: number; size?: number; weight?: number}> = ({label, labelColor, lines, at = 4, size = 92, weight}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
    {label ? <Label text={label} color={labelColor} align="left" /> : null}
    <Reveal at={at} size={size} weight={weight} align="left" lines={lines} />
  </div>
);

const LANDSCAPE: Record<string, () => React.ReactNode> = {
  open: () => (
    <>
      <HeroPhoto src={AI('camera-hero')} focus={[60, 40]} zoom={[1.1, 1.0]} side="left" shade={0.7} />
      <At x={120} y={600}>
        <Reveal at={10} size={110} align="left" lines={['Your cameras are', '*recording.*']} />
      </At>
    </>
  ),
  problem: () => (
    <>
      <At x={110} y={400} w={680}>
        <Copy label="THE PROBLEM" labelColor={SM.red} at={16} size={84} lines={['Cameras alone', "don't ^stop^ ^theft.^"]} />
      </At>
      <At x={790} y={175}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 330px)', gap: 12}}>
          {[...WALL, ['cctv-checkout', 'CAM 03 REGISTER'] as [string, string], ['aisle-empty', 'CAM 06 AISLE 3'] as [string, string], ['cctv-storefront', 'CAM 08 ENTRANCE'] as [string, string]].map(([src, cam], i) => (
            <Rise key={i} at={i * 2} dist={30}>
              <CctvPhoto src={AI(src)} w={330} h={232} cam={cam} zoom={[1.02, 1.1]} dim={0.15} />
            </Rise>
          ))}
        </div>
      </At>
    </>
  ),
  brand: () => (
    <Light>
      <At x={0} y={70} w={1920} center>
        <Shield3D width={560} height={560} light />
      </At>
      <At x={0} y={650} w={1920} center>
        <Wordmark at={14} light size={120} />
      </At>
    </Light>
  ),
  ops: () => (
    <>
      <HeroPhoto src={AI('operator-soc')} focus={[50, 50]} zoom={[1.0, 1.06]} side="left" shade={0.75} />
      <At x={90} y={330}>
        <LowerThird at={10} />
      </At>
      <At x={120} y={640}>
        <Reveal at={22} size={92} align="left" lines={['Live monitoring by', 'a *trained* *team.*']} />
      </At>
    </>
  ),
  closeup: () => (
    <>
      <HeroPhoto src={AI('operator-closeup')} focus={[40, 45]} zoom={[1.04, 1.12]} drift={-40} side="right" shade={0.8} />
      <At x={1180} y={600}>
        <Reveal at={6} size={110} align="left" lines={['Real people.', '*Real* *time.*']} />
      </At>
    </>
  ),
  alert: () => (
    <>
      <At x={90} y={170}>
        <div style={{position: 'relative'}}>
          <CctvPhoto src={AI('aisle-person')} w={1100} h={619} cam="CAM 05 AISLE 4" zoom={[1.0, 1.04]} />
          <Bracket box={[51, 11, 17, 80]} at={22} />
        </div>
      </At>
      <At x={1250} y={250}>
        <Reveal at={36} size={84} align="left" lines={['Flagged', '*in* *the* *moment.*']} />
      </At>
      <At x={1250} y={560}>
        <div style={{transform: 'scale(0.82)', transformOrigin: 'left top'}}>
          <AlertCard at={30} />
        </div>
      </At>
    </>
  ),
  manager: () => (
    <>
      <At x={150} y={150}>
        <Rise dist={40}>
          <div style={{width: 760, height: 772, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', border: `1px solid ${SM.line}`}}>
            <Img src={staticFile(AI('manager-phone'))} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        </Rise>
      </At>
      <At x={1000} y={300}>
        <div style={{transform: 'scale(0.9)', transformOrigin: 'left top'}}>
          <PushNotice at={12} title="Incident alert · Aisle 4" body="Operator reviewing live. Check in with staff." />
        </div>
      </At>
      <At x={1010} y={560}>
        <Reveal at={20} size={96} align="left" lines={['Your team is', '*alerted.*']} />
      </At>
    </>
  ),
  process: () => (
    <>
      <At x={120} y={380} w={700}>
        <Copy label="HOW IT WORKS" size={96} lines={['Four steps.', '_Zero_ _new_ _hardware._']} at={0} />
      </At>
      <At x={900} y={150}>
        <ActiveSteps />
      </At>
    </>
  ),
  response: () => (
    <>
      <At x={180} y={230}>
        <Ring to={30} unit="sec" at={4} size={620} />
      </At>
      <At x={980} y={390} w={820}>
        <Copy label="RESPONSE TARGET" at={18} size={84} weight={500} lines={['Our team begins', 'responding within', '*30* *seconds.*']} />
      </At>
    </>
  ),
  benefits: () => (
    <>
      <At x={120} y={360} w={720}>
        <Copy label="WHAT YOU GET" at={s(3.0)} size={84} weight={500} lines={['No new cameras.', '*No* *setup* *fees.*']} />
      </At>
      <At x={920} y={170}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 420px)', rowGap: 70, columnGap: 40}}>
          <IconTile icon="video" label="24/7 Live Monitoring" at={s(0.2)} />
          <IconTile icon="alert" label="Theft Alerts" at={s(0.9)} />
          <IconTile icon="file" label="Incident Reports" at={s(1.6)} />
          <IconTile icon="stores" label="Multi-Store Coverage" at={s(2.3)} />
        </div>
      </At>
    </>
  ),
  pricing: () => (
    <>
      <At x={120} y={390} w={700}>
        <Copy label="PRICING" size={100} lines={['Plans from', '*$199*']} at={0} />
        <Rise at={s(1.8)}>
          <div style={{fontFamily: SM.mono, fontSize: 28, letterSpacing: '0.14em', color: SM.muted, marginTop: 40}}>ENTERPRISE FROM $699 / MONTH</div>
        </Rise>
      </At>
      <At x={880} y={300}>
        <div style={{display: 'flex', gap: 40}}>
          <PriceCard name="Basic" price="$199" note="per site / month" at={s(0.6)} />
          <PriceCard name="Professional" price="$299" note="per site / month" at={s(1.0)} glow />
        </div>
      </At>
    </>
  ),
  us: () => (
    <>
      <At x={120} y={250} w={720}>
        <Copy label="BUILT FOR US RETAIL" size={88} lines={['Convenience,', 'liquor, grocery', '& *retail.*']} at={4} />
      </At>
      <At x={120} y={720}>
        <div style={{display: 'flex', gap: 28}}>
          {[
            ['store', 'Convenience'],
            ['bottle', 'Liquor'],
            ['cart', 'Grocery'],
            ['bag', 'Retail'],
          ].map(([icon, label], i) => (
            <IconTile key={label} icon={icon} label={label} at={s(0.8) + i * 6} size={120} />
          ))}
        </div>
      </At>
      <At x={860} y={180}>
        <UsMap width={980} height={680} />
      </At>
    </>
  ),
  owner: () => (
    <>
      <HeroPhoto src={AI('owner-closing')} focus={[45, 40]} zoom={[1.08, 1.0]} drift={50} side="right" shade={0.8} />
      <At x={1180} y={600}>
        <Reveal at={10} size={100} align="left" lines={['Lock up with', '*peace* *of* *mind.*']} />
      </At>
    </>
  ),
  cta: () => (
    <>
      <At x={120} y={150} w={760} center>
        <Shield3D width={500} height={500} spinIn={false} />
        <div style={{marginTop: 10}}>
          <Wordmark at={4} size={88} />
        </div>
      </At>
      <At x={1000} y={300}>
        <Reveal at={22} size={110} align="left" lines={['Secure Your Store', '*Today*']} />
        <div style={{height: 70}} />
        <Button text="Start your 7-day free trial  →" at={s(2.2)} />
        <div style={{height: 50}} />
        <Rise at={s(2.8)}>
          <div style={{fontFamily: SM.font, fontSize: 30, color: SM.muted, display: 'flex', gap: 30}}>
            <span>24/7 Monitoring</span>
            <span>·</span>
            <span>No Setup Fees</span>
            <span>·</span>
            <span>Existing Cameras</span>
          </div>
        </Rise>
      </At>
    </>
  ),
};

export const adLandscapeFrames = adScenes.reduce((n, sc) => n + s(sc.duration), 0);

export const AdLandscape: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => (
  <AbsoluteFill style={{background: SM.bg, overflow: 'hidden'}}>
    <Backdrop />
    {withAudio ? <Audio src={staticFile('audio/ad.mp3')} /> : null}
    <Series>
      {adScenes.map((sc) => (
        <Series.Sequence key={sc.id} name={sc.id} durationInFrames={s(sc.duration)}>
          <Scene duration={s(sc.duration)} hud={sc.hud} cam={sc.cam}>
            {(LANDSCAPE[sc.id] ?? sc.render)()}
          </Scene>
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
