import React from 'react';
import {Composition} from 'remotion';
import {Explainer} from './Explainer';
import {Ad, adFrames} from './sm/Ad';
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
  <Composition id="SecureMonitoringAd" component={Ad} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={adFrames} defaultProps={{withAudio: true}} />
  </>
);
