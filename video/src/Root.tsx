import React from 'react';
import {Composition} from 'remotion';
import {Explainer} from './Explainer';
import {defaultProps, totalFrames, VideoProps} from './script';
import {FPS, HEIGHT, WIDTH} from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Explainer"
    component={Explainer}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={totalFrames(defaultProps)}
    defaultProps={defaultProps}
    calculateMetadata={({props}) => ({durationInFrames: totalFrames(props as VideoProps)})}
  />
);
