import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, HEIGHT, WIDTH} from '../theme';
import {Bullet, Bullets, Caption, Captions} from './Text';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const SceneCtx = createContext({duration: 90});
export const useScene = () => useContext(SceneCtx);

type Corner = 'tl' | 'tr' | 'bl' | 'br';

export type SceneDef = {
  id: string;
  /** seconds */
  duration: number;
  visual?: () => React.ReactNode;
  /** vertical centre of the visual, px */
  visualY?: number;
  captions?: Caption[];
  captionY?: number;
  bullets?: Bullet[];
  bulletsY?: number;
  bulletSize?: number;
  /** a second, independent caption track (e.g. footer lines) */
  extra?: {top: number; captions: Caption[]};
  /** sound effects for the audio generator; `at` in seconds from scene start */
  sfx?: {at: number; type: 'impact' | 'ding' | 'typing' | 'ticks' | 'riser' | 'pop' | 'alert'}[];
  dots?: boolean;
  decor?: {type: 'spokes' | 'graph'; corners: Corner[]};
};

/* Faint dot grid that appears behind text-only scenes. */
const Dots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        backgroundImage: `radial-gradient(${COLORS.faint} 2.6px, transparent 3px)`,
        backgroundSize: '58px 58px',
        backgroundPosition: '29px 10px',
        WebkitMaskImage: 'radial-gradient(ellipse 45% 32% at 50% 42%, #000 40%, transparent 100%)',
      }}
    />
  );
};

/* Corner decorations: orange spokes fanning in, or a rotating blue node graph. */
const CornerPiece: React.FC<{type: 'spokes' | 'graph'; corner: Corner; index: number}> = ({type, corner, index}) => {
  const frame = useCurrentFrame();
  const {duration} = useScene();
  const enter = interpolate(frame, [index * 4, index * 4 + 16], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const exit = interpolate(frame, [duration - 8, duration], [0, 1], clamp);
  const size = 380;
  const flipX = corner === 'tr' || corner === 'br' ? -1 : 1;
  const flipY = corner === 'bl' || corner === 'br' ? -1 : 1;
  const pos: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    left: flipX === 1 ? 0 : WIDTH - size,
    top: flipY === 1 ? 0 : HEIGHT - size,
    transform: `scale(${flipX}, ${flipY})`,
    filter: 'drop-shadow(10px 18px 14px rgba(0,0,0,0.18))',
  };
  if (type === 'spokes') {
    const rot = (1 - enter) * -50 + Math.sin(frame / 20) * 4 + exit * 40;
    return (
      <div style={pos}>
        <svg width={size} height={size} style={{transform: `rotate(${rot}deg)`, transformOrigin: '0 0'}}>
          {[8, 26, 44, 62, 80].map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const len = (i % 2 ? 230 : 290) * enter * (1 - exit);
            return (
              <line
                key={i}
                x1={-20}
                y1={-20}
                x2={Math.cos(a) * len}
                y2={Math.sin(a) * len}
                stroke={COLORS.orange}
                strokeWidth={30}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
    );
  }
  // graph triangle
  const spin = Math.sin(frame / 22 + index) * 22 + (1 - enter) * -60;
  const s = enter * (1 - exit);
  const pts = [
    [60, 60],
    [250, 40],
    [130, 230],
  ];
  return (
    <div style={pos}>
      <svg width={size} height={size} style={{transform: `rotate(${spin}deg) scale(${s})`, transformOrigin: '60px 60px'}}>
        {[
          [0, 1],
          [1, 2],
          [2, 0],
        ].map(([a, b], i) => (
          <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={COLORS.blue} strokeWidth={18} strokeLinecap="round" />
        ))}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={30} fill={COLORS.blue} />
        ))}
      </svg>
    </div>
  );
};

export const SceneView: React.FC<{scene: SceneDef; duration: number}> = ({scene, duration}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 10], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const exit = interpolate(frame, [duration - 7, duration], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const drift = interpolate(frame, [0, duration], [0, 1]);

  return (
    <SceneCtx.Provider value={{duration}}>
      <AbsoluteFill>
        {scene.dots ? <Dots /> : null}
        {scene.decor?.corners.map((c, i) => (
          <CornerPiece key={c} type={scene.decor!.type} corner={c} index={i} />
        ))}
        <AbsoluteFill
          style={{
            opacity: 1 - exit,
            filter: `blur(${exit * 16}px)`,
            transform: `translateY(${exit * 110}px) scale(${1 - exit * 0.1})`,
          }}
        >
          {scene.visual ? (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: scene.visualY ?? 640,
                display: 'flex',
                justifyContent: 'center',
                transform: `translateY(-50%) translateY(${(1 - enter) * -80}px) scale(${1 + (1 - enter) * 0.08 + drift * 0.035})`,
                opacity: enter,
                filter: enter < 1 ? `blur(${(1 - enter) * 14}px)` : undefined,
              }}
            >
              {scene.visual()}
            </div>
          ) : null}
          {scene.captions ? <Captions captions={scene.captions} end={duration + 30} top={scene.captionY ?? 1060} /> : null}
          {scene.extra ? <Captions captions={scene.extra.captions} end={duration + 30} top={scene.extra.top} /> : null}
          {scene.bullets ? <Bullets items={scene.bullets} top={scene.bulletsY ?? 1000} size={scene.bulletSize} /> : null}
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneCtx.Provider>
  );
};
