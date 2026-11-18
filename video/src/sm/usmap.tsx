/** Crisp, glowing US map (us-atlas + d3-geo): state outlines draw on, retail locations pulse. */
import React, {useMemo} from 'react';
import {geoAlbersUsa, geoPath} from 'd3-geo';
import {feature, mesh} from 'topojson-client';
import type {Topology, GeometryCollection} from 'topojson-specification';
import states from 'us-atlas/states-10m.json';
import {interpolate, useCurrentFrame} from 'remotion';
import {clamp, ease, SM} from './kit';

const CITIES: [number, number][] = [
  [-74.0, 40.7], [-118.2, 34.05], [-87.6, 41.9], [-95.4, 29.8], [-112.1, 33.45], [-80.2, 25.8], [-122.3, 47.6],
  [-104.99, 39.74], [-84.4, 33.75], [-96.8, 32.8], [-75.2, 39.95], [-71.06, 42.36], [-83.05, 42.33], [-90.07, 29.95],
  [-122.42, 37.77], [-93.27, 44.98], [-86.78, 36.16], [-115.14, 36.17], [-81.38, 28.54], [-77.04, 38.9],
];

export const UsMap: React.FC<{width: number; height: number}> = ({width, height}) => {
  const frame = useCurrentFrame();
  const {path, nation, inner, pts} = useMemo(() => {
    const topo = states as unknown as Topology<{states: GeometryCollection; nation: GeometryCollection}>;
    const fc = feature(topo, topo.objects.states);
    const proj = geoAlbersUsa().fitSize([width * 0.94, height * 0.94], fc);
    const p = geoPath(proj);
    return {
      path: p,
      nation: p(feature(topo, topo.objects.nation)) ?? '',
      inner: p(mesh(topo, topo.objects.states, (a, b) => a !== b)) ?? '',
      pts: CITIES.map((c) => proj(c)).filter(Boolean) as [number, number][],
    };
  }, [width, height]);
  const draw = interpolate(frame, [0, 45], [0, 1], {...clamp, easing: ease});
  const fill = interpolate(frame, [20, 50], [0, 1], clamp);
  void path;
  return (
    <svg width={width} height={height} viewBox={`${-width * 0.03} ${-height * 0.03} ${width} ${height}`}>
      <defs>
        <linearGradient id="usFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#13284d" />
          <stop offset="1" stopColor="#0d1a33" />
        </linearGradient>
        <filter id="usGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={nation} fill="url(#usFill)" opacity={fill} />
      <path d={inner} fill="none" stroke={SM.glow} strokeOpacity={0.35} strokeWidth={1.2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      <path d={nation} fill="none" stroke={SM.glow} strokeWidth={2.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} filter="url(#usGlow)" />
      {pts.map(([x, y], i) => {
        const at = 30 + i * 3;
        const p = interpolate(frame, [at, at + 12], [0, 1], {...clamp, easing: ease});
        const ring = ((frame - at) % 45) / 45;
        return (
          <g key={i} opacity={p}>
            <circle cx={x} cy={y} r={8 + ring * 26} fill="none" stroke={SM.glow} strokeOpacity={(1 - ring) * 0.6} strokeWidth={2} />
            <circle cx={x} cy={y} r={7 * p} fill="#ffffff" filter="url(#usGlow)" />
          </g>
        );
      })}
    </svg>
  );
};
