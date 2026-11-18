import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {SceneView} from '../components/Scene';
import {COLORS, FONT, s} from '../theme';
import {PromoProps, promoScenes} from './scenes';

export const promoFrames = (p: PromoProps) => promoScenes(p).reduce((n, sc) => n + s(sc.duration), 0);

export const Promo: React.FC<PromoProps & {withAudio?: boolean}> = ({withAudio = true, ...p}) => (
  <AbsoluteFill style={{background: COLORS.bg, fontFamily: FONT, overflow: 'hidden'}}>
    {withAudio ? <Audio src={staticFile('audio/promo.mp3')} /> : null}
    <Series>
      {promoScenes(p).map((sc) => (
        <Series.Sequence key={sc.id} name={sc.id} durationInFrames={s(sc.duration)}>
          <SceneView scene={sc} duration={s(sc.duration)} />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
