import React, {useLayoutEffect, useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {random} from 'remotion';
import {GLOW_FRAG, PARTICLE_FRAG, PARTICLE_VERT, PLANET_FRAG, RING_FRAG, STARS_FRAG, STARS_VERT, SUN_FRAG, SURFACE_VERT, UV_VERT} from './shaders';
import {expoOut, smooth, T} from './timeline';

const N = 40000;

/* ------------------------------------------------------------------ geometry builders (deterministic) */
const buildWeb = () => {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < 70; i++) {
    const v = new THREE.Vector3(random(`nx${i}`) - 0.5, (random(`ny${i}`) - 0.5) * 0.8, random(`nz${i}`) - 0.5).multiplyScalar(34);
    nodes.push(v);
  }
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => [j, a.distanceTo(b)] as [number, number])
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1])
      .slice(0, 3)
      .forEach(([j]) => edges.push([i, j]));
  });
  const out = new Float32Array(N * 3);
  const g = (k: string) => (random(`${k}a`) + random(`${k}b`) + random(`${k}c`) - 1.5) * 0.55;
  for (let i = 0; i < N; i++) {
    let p: THREE.Vector3;
    if (random(`wk${i}`) < 0.72) {
      const [a, b] = edges[Math.floor(random(`we${i}`) * edges.length)];
      p = nodes[a].clone().lerp(nodes[b], random(`wt${i}`));
      p.add(new THREE.Vector3(g(`x${i}`), g(`y${i}`), g(`z${i}`)).multiplyScalar(0.6));
    } else {
      const n = nodes[Math.floor(random(`wn${i}`) * nodes.length)];
      p = n.clone().add(new THREE.Vector3(g(`p${i}`), g(`q${i}`), g(`r${i}`)).multiplyScalar(1.6));
    }
    out.set([p.x, p.y, p.z], i * 3);
  }
  return out;
};

/** Particle targets sampled from the words, rendered with a built-in font so every tab samples identically. */
const buildText = () => {
  const out = new Float32Array(N * 3);
  const c = document.createElement('canvas');
  c.width = 2200;
  c.height = 520;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 150px sans-serif';
  ctx.fillText('YOU ARE', 1100, 130);
  ctx.font = 'bold 250px sans-serif';
  ctx.fillText('STARDUST', 1100, 350);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < c.height; y += 2) for (let x = 0; x < c.width; x += 2) if (data[(y * c.width + x) * 4 + 3] > 128) pts.push([x, y]);
  for (let i = 0; i < N; i++) {
    const [x, y] = pts[Math.floor(random(`tp${i}`) * pts.length)];
    out.set([(x - 1100) / 82 + (random(`tj${i}`) - 0.5) * 0.04, -(y - 260) / 82, (random(`tz${i}`) - 0.5) * 0.5], i * 3);
  }
  return out;
};

/* ------------------------------------------------------------------ the morphing particle universe */
export const Particles: React.FC<{frame: number; fade?: readonly [number, number]; textScale?: number}> = ({frame, fade = T.fadeOut, textScale = 1}) => {
  const {geo, mat} = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const seed = new Float32Array(N * 4);
    for (let i = 0; i < N * 4; i++) seed[i] = random(`s${i}`);
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    g.setAttribute('aWeb', new THREE.BufferAttribute(buildWeb(), 3));
    g.setAttribute('aText', new THREE.BufferAttribute(buildText(), 3));
    const m = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: {value: 0},
        uBang: {value: 0},
        uShell: {value: 0},
        uStarScale: {value: 1},
        uSize: {value: 0.09},
        uSingular: {value: 1},
        uAlpha: {value: 1},
        uTextBoost: {value: 0},
        uTextScale: {value: 1},
        uW1: {value: new THREE.Vector3(1, 0, 0)},
        uW2: {value: new THREE.Vector3(0, 0, 0)},
      },
    });
    return {geo: g, mat: m};
  }, []);

  const f = frame;
  const u = mat.uniforms;
  u.uTime.value = f / 30;
  u.uSingular.value = 1 - smooth(f, T.bang, T.bang + 6);
  u.uBang.value = expoOut(Math.max(0, (f - T.bang) / 160));
  const web = smooth(f, T.webIn[0], T.webIn[1]) * (1 - smooth(f, T.webOut[0], T.webOut[1]));
  const star = smooth(f, T.starIn[0], T.starIn[1]) * (1 - smooth(f, T.nova - 2, T.nova + 4));
  const bang = 1 - smooth(f, T.webIn[0], T.webIn[1]);
  const shell = smooth(f, T.nova - 2, T.nova + 4) * (1 - smooth(f, T.shellOut[0], T.shellOut[1]));
  const disk = smooth(f, T.diskIn[0], T.diskIn[1]) * (1 - smooth(f, T.diskOut[0], T.diskOut[1]));
  const text = smooth(f, T.textIn[0], T.textIn[1]);
  u.uW1.value.set(bang, web, star);
  u.uTextBoost.value = text;
  u.uTextScale.value = textScale;
  u.uW2.value.set(shell, disk, text);
  u.uStarScale.value = 1 - 0.85 * smooth(f, T.collapse[0], T.collapse[1]);
  u.uShell.value = 0.6 + 15 * expoOut(Math.max(0, (f - T.nova) / 120));
  u.uAlpha.value = (f < T.bang ? 0.9 : 1) * (1 - smooth(f, fade[0], fade[1])) * (1 - 0.55 * smooth(f, T.planetGrow[0], T.planetGrow[1]) * (1 - text));
  u.uSize.value = 0.09 + 0.1 * bang * u.uBang.value + 0.17 * web + 0.1 * shell + 0.03 * disk + 0.06 * text;
  return <points geometry={geo} material={mat} frustumCulled={false} />;
};

/* ------------------------------------------------------------------ background starfield */
export const Starfield: React.FC<{frame: number; fade?: readonly [number, number]}> = ({frame, fade = T.fadeOut}) => {
  const {geo, mat} = useMemo(() => {
    const n = 5000;
    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const tw = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const d = new THREE.Vector3(random(`a${i}`) - 0.5, random(`b${i}`) - 0.5, random(`c${i}`) - 0.5).normalize().multiplyScalar(180 + random(`d${i}`) * 120);
      pos.set([d.x, d.y, d.z], i * 3);
      size[i] = 1 + Math.pow(random(`e${i}`), 6) * 4;
      tw[i] = random(`f${i}`);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aTw', new THREE.BufferAttribute(tw, 1));
    const m = new THREE.ShaderMaterial({vertexShader: STARS_VERT, fragmentShader: STARS_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: {uTime: {value: 0}, uAlpha: {value: 0}}});
    return {geo: g, mat: m};
  }, []);
  mat.uniforms.uTime.value = frame / 30;
  mat.uniforms.uAlpha.value = smooth(frame, T.bang + 40, T.bang + 200) * (1 - smooth(frame, fade[0], fade[1]));
  return <points geometry={geo} material={mat} frustumCulled={false} />;
};

/* ------------------------------------------------------------------ star */
const glowMat = (color: string, power: number) =>
  new THREE.ShaderMaterial({
    vertexShader: SURFACE_VERT,
    fragmentShader: GLOW_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: {uColor: {value: new THREE.Color(color)}, uPower: {value: power}, uStrength: {value: 1}},
  });

export const Sun: React.FC<{frame: number}> = ({frame}) => {
  const {surf, glow} = useMemo(
    () => ({
      surf: new THREE.ShaderMaterial({vertexShader: SURFACE_VERT, fragmentShader: SUN_FRAG, uniforms: {uTime: {value: 0}, uHot: {value: 0}, uBright: {value: 1}}}),
      glow: glowMat('#ffb15a', 2.2),
    }),
    []
  );
  const f = frame;
  const grow = smooth(f, T.sunGrow[0], T.sunGrow[1]);
  const swell = smooth(f, T.giant[0], T.giant[1]);
  const crush = smooth(f, T.collapse[0], T.collapse[1]);
  const scale = (0.01 + 1.3 * grow + 1.4 * swell) * (1 - 0.97 * crush) * (1 + 0.015 * Math.sin(f / 3) * swell);
  if (f < T.sunGrow[0] || f > T.nova + 1) return null;
  surf.uniforms.uTime.value = f / 30;
  surf.uniforms.uHot.value = swell;
  surf.uniforms.uBright.value = 1.2 + 2.5 * crush;
  glow.uniforms.uColor.value.set(swell > 0.5 ? '#ff6a3a' : '#ffb15a');
  glow.uniforms.uStrength.value = 1.6 + 3 * crush;
  return (
    <group scale={scale}>
      <mesh material={surf}>
        <sphereGeometry args={[1, 96, 64]} />
      </mesh>
      <mesh material={glow} scale={1.9}>
        <sphereGeometry args={[1, 64, 32]} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------------ planet */
export const Planet: React.FC<{frame: number}> = ({frame}) => {
  const {surf, atmo} = useMemo(
    () => ({
      surf: new THREE.ShaderMaterial({vertexShader: SURFACE_VERT, fragmentShader: PLANET_FRAG, uniforms: {uTime: {value: 0}, uLight: {value: new THREE.Vector3(1.0, 0.35, 0.6)}}}),
      atmo: glowMat('#4f8dff', 3.0),
    }),
    []
  );
  const f = frame;
  const s = smooth(f, T.planetGrow[0], T.planetGrow[1]) * (1 - smooth(f, T.planetOut[0], T.planetOut[1]));
  if (s <= 0.001) return null;
  surf.uniforms.uTime.value = f / 30;
  atmo.uniforms.uStrength.value = 1.4;
  return (
    <group scale={2.2 * s} rotation={[0.35, f * 0.004, 0.1]}>
      <mesh material={surf}>
        <sphereGeometry args={[1, 128, 96]} />
      </mesh>
      <mesh material={atmo} scale={1.12}>
        <sphereGeometry args={[1, 64, 32]} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------------ supernova shockwave */
export const Shockwave: React.FC<{frame: number}> = ({frame}) => {
  const {camera} = useThree();
  const mat = useMemo(() => new THREE.ShaderMaterial({vertexShader: UV_VERT, fragmentShader: RING_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: {uR: {value: 0}, uAlpha: {value: 0}}}), []);
  const ref = React.useRef<THREE.Mesh>(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.quaternion.copy(camera.quaternion);
  });
  const t = (frame - T.nova) / 110;
  if (t < 0 || t > 1) return null;
  mat.uniforms.uR.value = expoOut(t) * 0.95;
  mat.uniforms.uAlpha.value = (1 - t) * 1.5;
  return (
    <mesh ref={ref} material={mat}>
      <planeGeometry args={[60, 60]} />
    </mesh>
  );
};

/* ------------------------------------------------------------------ camera: one continuous flight */
type Key = [number, [number, number, number], [number, number, number]];
const KEYS: Key[] = [
  [0, [0, 0, 7], [0, 0, 0]],
  [140, [0, 0, 4.2], [0, 0, 0]],
  [175, [0, 0.5, 9], [0, 0, 0]],
  [330, [8, 5, 40], [0, 0, 0]],
  [470, [-18, 7, 30], [0, 0, 0]],
  [600, [0, 3, 15], [0, 0, 0]],
  [760, [5, 2.5, 11], [0, 0, 0]],
  [868, [2, 1, 7], [0, 0, 0]],
  [960, [0, 16, 26], [0, 0, 0]],
  [1100, [-6, 9, 17], [0, 0, 0]],
  [1240, [4.5, 1.6, 7.2], [0, 0, 0]],
  [1330, [2, 0.8, 8], [0, 0, 0]],
  [1440, [0, 0, 27], [0, 0, 0]],
  [1620, [0, 0, 31], [0, 0, 0]],
];
const cr = (p0: number, p1: number, p2: number, p3: number, t: number) =>
  0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);

export const CameraRig: React.FC<{frame: number; dist?: number}> = ({frame, dist = 1}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    let i = KEYS.findIndex((k, j) => j < KEYS.length - 1 && frame >= k[0] && frame < KEYS[j + 1][0]);
    if (i < 0) i = KEYS.length - 2;
    const k0 = KEYS[Math.max(0, i - 1)];
    const k1 = KEYS[i];
    const k2 = KEYS[i + 1];
    const k3 = KEYS[Math.min(KEYS.length - 1, i + 2)];
    const raw = Math.min(1, Math.max(0, (frame - k1[0]) / (k2[0] - k1[0])));
    const t = raw * raw * (3 - 2 * raw) * 0.6 + raw * 0.4; // gentle ease, keeps momentum through keys
    const pos = [0, 1, 2].map((a) => cr(k0[1][a], k1[1][a], k2[1][a], k3[1][a], t));
    const tgt = [0, 1, 2].map((a) => cr(k0[2][a], k1[2][a], k2[2][a], k3[2][a], t));
    // supernova camera shake
    const shake = Math.max(0, 1 - Math.abs(frame - T.nova) / 22) * 0.35;
    camera.position.set(pos[0] * dist + Math.sin(frame * 2.1) * shake, pos[1] * dist + Math.cos(frame * 2.7) * shake, pos[2] * dist);
    camera.lookAt(tgt[0], tgt[1], tgt[2]);
  });
  return null;
};
