/** 30-second cut of the Secure Monitoring ad: same scenes and design, tighter script (exactly 900 frames). */
import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {adScenes, AdScene} from './Ad';
import {Backdrop, s, Scene, SM} from './kit';

const pick = (id: string, duration: number, vo: AdScene['vo']): AdScene => {
  const sc = adScenes.find((x) => x.id === id);
  if (!sc) throw new Error(`missing scene ${id}`);
  return {...sc, duration, vo};
};

export const ad30Scenes: AdScene[] = [
  pick('open', 3.2, [{at: 0.4, text: 'Your cameras are recording.'}]),
  pick('problem', 3.8, [{at: 0.2, text: "But cameras alone don't stop theft."}]),
  pick('brand', 3.0, [{at: 0.4, text: 'Meet Secure Monitoring.'}]),
  pick('ops', 4.2, [{at: 0.2, text: 'A trained team watches your cameras live, twenty-four seven.'}]),
  pick('alert', 3.4, [{at: 0.2, text: 'When something looks wrong, they flag it,'}]),
  pick('manager', 3.0, [{at: 0.05, text: 'and your team gets alerted.'}]),
  pick('pricing', 4.0, [{at: 0.3, text: 'Plans from one ninety-nine per site, per month.'}]),
  pick('cta', 5.4, [{at: 0.3, text: 'No setup fees. Start your seven-day free trial today.'}]),
];

export const ad30Frames = ad30Scenes.reduce((n, sc) => n + s(sc.duration), 0);

export const Ad30: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => (
  <AbsoluteFill style={{background: SM.bg, overflow: 'hidden'}}>
    <Backdrop />
    {withAudio ? <Audio src={staticFile('audio/ad30.mp3')} /> : null}
    <Series>
      {ad30Scenes.map((sc) => (
        <Series.Sequence key={sc.id} name={sc.id} durationInFrames={s(sc.duration)}>
          <Scene duration={s(sc.duration)} hud={sc.hud} cam={sc.cam}>
            {sc.render()}
          </Scene>
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
