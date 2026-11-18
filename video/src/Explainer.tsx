import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {SceneView} from './components/Scene';
import {buildScript, VideoProps} from './script';
import {COLORS, FONT, s} from './theme';

export const Explainer: React.FC<VideoProps> = (props) => {
  const scenes = buildScript(props);
  return (
    <AbsoluteFill style={{background: COLORS.bg, fontFamily: FONT, overflow: 'hidden'}}>
      <Series>
        {scenes.map((sc) => (
          <Series.Sequence key={sc.id} name={sc.id} durationInFrames={s(sc.duration)}>
            <SceneView scene={sc} duration={s(sc.duration)} />
          </Series.Sequence>
        ))}
      </Series>
      {/* persistent watermark */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1600,
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.watermark,
          letterSpacing: '0.01em',
        }}
      >
        {props.watermark}
      </div>
    </AbsoluteFill>
  );
};
