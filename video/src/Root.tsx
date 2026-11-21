import React from 'react';
import {Composition} from 'remotion';
import {Explainer} from './Explainer';
import {Ad, adFrames} from './sm/Ad';
import {Stardust} from './stardust/Stardust';
import {TOTAL as STARDUST_FRAMES} from './stardust/timeline';
import {Ad30, ad30Frames} from './sm/Ad30';
import {AdLandscape, adLandscapeFrames} from './sm/AdLandscape';
import {Preview} from './sm/preview/Preview';
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
  <Composition id="Stardust" component={Stardust} width={1920} height={1080} fps={30} durationInFrames={STARDUST_FRAMES} defaultProps={{withAudio: true}} />
  <Composition id="SecureMonitoringAdLandscape" component={AdLandscape} width={1920} height={1080} fps={FPS} durationInFrames={adLandscapeFrames} defaultProps={{withAudio: true}} />
  <Composition id="SecureMonitoringAd30" component={Ad30} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={ad30Frames} defaultProps={{withAudio: true}} />
  <Composition id="SecureMonitoringAd" component={Ad} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={adFrames} defaultProps={{withAudio: true}} />
  <Composition id="AssetPreview" component={Preview} width={1080} height={1920} fps={30} durationInFrames={120} />
  </>
);
