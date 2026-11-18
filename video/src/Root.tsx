import React from 'react';
import {Composition} from 'remotion';
import {Explainer} from './Explainer';
import {Promo, promoFrames} from './promo/Promo';
import {promoDefaults} from './promo/scenes';
import {defaultProps, TOTAL_FRAMES} from './script';
import {FPS, HEIGHT, WIDTH} from './theme';

export const RemotionRoot: React.FC = () => (
  <>
  <Composition
    id="Explainer"
    component={Explainer}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={TOTAL_FRAMES}
    defaultProps={defaultProps}
  />
  <Composition
    id="Promo"
    component={Promo}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={promoFrames(promoDefaults)}
    defaultProps={{...promoDefaults, withAudio: true}}
  />
  </>
);
