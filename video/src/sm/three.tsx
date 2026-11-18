/**
 * 3D motion-graphics assets (three.js via @remotion/three), all procedural so there is no licensing:
 *  - CctvCamera3D: bullet security camera with sunshield, glass lens, IR ring, mount, LED, scan cone
 *  - Shield3D:     extruded metallic shield + camera glyph (brand mark), with a light sweep
 *  - Aisle3D:      a convenience-store aisle (shelving, ~1.2k products, ceiling lights, a walking person)
 *                  shot from a high CCTV angle; wrap it in <CctvFrame> for the security-feed look
 */
import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {continueRender, delayRender, Easing, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Image-based lighting + filmic tone mapping so metals and glass read as real materials. */
const Env: React.FC<{exposure?: number; intensity?: number}> = ({exposure = 1, intensity = 1}) => {
  const {gl, scene} = useThree();
  useMemo(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    (scene as unknown as {environmentIntensity: number}).environmentIntensity = intensity;
  }, [gl, scene, exposure, intensity]);
  return null;
};

const LookAt: React.FC<{target: [number, number, number]; fov?: number; position: [number, number, number]}> = ({target, fov, position}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    camera.position.set(...position);
    if (fov && 'fov' in camera) {
      (camera as THREE.PerspectiveCamera).fov = fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
    camera.lookAt(...target);
  });
  return null;
};

/* ================================================================== CCTV camera */
export const CctvCamera3D: React.FC<{width: number; height: number}> = ({width, height}) => {
  const frame = useCurrentFrame();
  const pan = interpolate(frame, [0, 50], [-1.05, -0.32], {...clamp, easing: ease}) + Math.sin(frame / 40) * 0.03;
  const tilt = interpolate(frame, [0, 50], [0.25, 0.12], {...clamp, easing: ease});
  const led = Math.floor(frame / 15) % 2 === 0 ? 4 : 0.3;
  const shell = {color: '#eef1f5', metalness: 0.35, roughness: 0.28};
  return (
    <ThreeCanvas width={width} height={height} camera={{fov: 30, position: [0, 0.2, 7.2]}} gl={{antialias: true, alpha: true}}>
      <Env exposure={1.05} intensity={0.9} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 5, 6]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, 2, -3]} intensity={60} color="#2563EB" />
      <pointLight position={[4, -2, -2]} intensity={40} color="#3B82F6" />
      <group position={[0.35, 0.1, 0]} rotation={[tilt, pan, 0]}>
        {/* body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 2.0, 64]} />
          <meshStandardMaterial {...shell} />
        </mesh>
        <mesh position={[0, 0, -1.0]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.46, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial {...shell} />
        </mesh>
        {/* front bezel */}
        <mesh position={[0, 0, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.18, 64]} />
          <meshStandardMaterial color="#1b1f27" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* glass + lens */}
        <mesh position={[0, 0, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.02, 64]} />
          <meshPhysicalMaterial color="#05070b" metalness={0.2} roughness={0.02} clearcoat={1} clearcoatRoughness={0.02} />
        </mesh>
        <mesh position={[0, 0, 1.16]}>
          <circleGeometry args={[0.2, 48]} />
          <meshPhysicalMaterial color="#0d1a3a" emissive="#1D4ED8" emissiveIntensity={0.35} metalness={0.9} roughness={0.08} />
        </mesh>
        <mesh position={[0, 0, 1.165]}>
          <ringGeometry args={[0.21, 0.25, 48]} />
          <meshStandardMaterial color="#3a3f4a" metalness={1} roughness={0.25} />
        </mesh>
        {Array.from({length: 10}).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.34, Math.sin(a) * 0.34, 1.165]}>
              <circleGeometry args={[0.03, 16]} />
              <meshStandardMaterial color="#2a0d10" emissive="#7f1d1d" emissiveIntensity={0.5} />
            </mesh>
          );
        })}
        {/* sunshield */}
        <mesh position={[0, 0.5, 0.15]}>
          <boxGeometry args={[1.12, 0.06, 2.5]} />
          <meshStandardMaterial {...shell} />
        </mesh>
        {/* status LED */}
        <mesh position={[0.28, 0.33, 1.02]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#ff2a2a" emissive="#ff2a2a" emissiveIntensity={led} />
        </mesh>
        {/* mount */}
        <mesh position={[0, -0.6, -0.4]}>
          <sphereGeometry args={[0.14, 32, 16]} />
          <meshStandardMaterial color="#cfd5de" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.75, -1.0]} rotation={[0.9, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 1.4, 32]} />
          <meshStandardMaterial color="#cfd5de" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
      {/* wall plate */}
      <mesh position={[0.35, -1.45, -2.2]}>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshStandardMaterial color="#cfd5de" metalness={0.4} roughness={0.35} />
      </mesh>
    </ThreeCanvas>
  );
};

/* ================================================================== shield mark */
/** Official SM symbol as a texture (loaded once, render waits for it). */
let smTex: THREE.Texture | null = null;
const useSmTexture = () => {
  const [, force] = React.useState(0);
  React.useLayoutEffect(() => {
    if (smTex) return;
    const h = delayRender('SM logo texture');
    new THREE.TextureLoader().load(staticFile('brand/sm-mark.png'), (tx) => {
      tx.colorSpace = THREE.SRGBColorSpace;
      tx.anisotropy = 8;
      smTex = tx;
      force((n) => n + 1);
      continueRender(h);
    });
  }, []);
  return smTex;
};

const shieldShape = (s: number) => {
  const sh = new THREE.Shape();
  sh.moveTo(0, 1.0 * s);
  sh.lineTo(0.82 * s, 0.72 * s);
  sh.lineTo(0.82 * s, 0.05 * s);
  sh.quadraticCurveTo(0.8 * s, -0.75 * s, 0, -1.1 * s);
  sh.quadraticCurveTo(-0.8 * s, -0.75 * s, -0.82 * s, 0.05 * s);
  sh.lineTo(-0.82 * s, 0.72 * s);
  sh.closePath();
  return sh;
};

const cameraGlyph = () => {
  const g = new THREE.Shape();
  g.moveTo(-0.42, 0.08);
  g.lineTo(0.3, 0.3);
  g.lineTo(0.36, 0.08);
  g.lineTo(-0.36, -0.14);
  g.closePath();
  return g;
};

export const Shield3D: React.FC<{width: number; height: number; light?: boolean; spinIn?: boolean}> = ({width, height, light, spinIn = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = interpolate(frame, [0, 40], [0, 1], {...clamp, easing: ease});
  const rotY = spinIn ? (1 - p) * -Math.PI * 0.9 + Math.sin(frame / (fps * 1.6)) * 0.12 : Math.sin(frame / (fps * 1.6)) * 0.18;
  const sweep = interpolate(frame, [10, 60], [-4, 4], clamp);
  const ring = useMemo(() => {
    const outer = shieldShape(1);
    outer.holes.push(new THREE.Path(shieldShape(0.82).getPoints(64).reverse()));
    return outer;
  }, []);
  const inner = useMemo(() => shieldShape(0.82), []);
  const tex = useSmTexture();
  const bevel = {bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 6, curveSegments: 48};
  return (
    <ThreeCanvas width={width} height={height} camera={{fov: 28, position: [0, 0, 6.2]}} gl={{antialias: true, alpha: true}}>
      <Env exposure={1.1} intensity={light ? 1.2 : 0.8} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 3, 5]} intensity={1.6} />
      <pointLight position={[sweep, 1.5, 2.5]} intensity={45} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={40} color="#3B82F6" />
      <group rotation={[0.08, rotY, 0]} scale={0.95 + p * 0.05}>
        <mesh position={[0, 0, -0.12]}>
          <extrudeGeometry args={[ring, {depth: 0.32, ...bevel}]} />
          <meshPhysicalMaterial color="#2563EB" metalness={0.75} roughness={0.22} clearcoat={0.6} clearcoatRoughness={0.15} />
        </mesh>
        <mesh position={[0, 0, -0.08]}>
          <extrudeGeometry args={[inner, {depth: 0.12, bevelEnabled: false, curveSegments: 48}]} />
          <meshPhysicalMaterial color="#0B1220" metalness={0.1} roughness={0.35} clearcoat={0.8} />
        </mesh>
        {tex ? (
          <mesh position={[0, 0.0, 0.06]}>
            <planeGeometry args={[1.32, 1.32 * (881 / 1341)]} />
            <meshBasicMaterial map={tex} transparent toneMapped={false} />
          </mesh>
        ) : null}
      </group>
    </ThreeCanvas>
  );
};

/* ================================================================== store aisle */
const PRODUCT_COLORS = ['#9c3b36', '#c9a45a', '#3c5a86', '#4f6b4a', '#b8743f', '#5c4a6e', '#d9d6cf', '#3f6f74', '#8a4a5e', '#6b5546', '#c8b77a', '#39456b', '#e6e2da', '#a85a4a'];

const Products: React.FC<{seed: string}> = ({seed}) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const out: {p: [number, number, number]; s: [number, number, number]; c: string}[] = [];
    for (const side of [-1, 1]) {
      for (let u = 0; u < 12; u++) {
        const z0 = -1.5 - u * 2.1;
        for (let lvl = 0; lvl < 4; lvl++) {
          const y = 0.18 + lvl * 0.52;
          let z = z0 + 0.95;
          let k = 0;
          while (z > z0 - 0.95) {
            const r = random(`${seed}${side}${u}${lvl}${k++}`);
            const w = 0.14 + r * 0.16;
            const h = 0.22 + random(`h${seed}${side}${u}${lvl}${k}`) * 0.24;
            const d = 0.25 + r * 0.15;
            if (random(`gap${seed}${side}${u}${lvl}${k}`) > 0.08) {
              out.push({p: [side * (1.55 - d / 2 - 0.05), y + h / 2, z - w / 2], s: [d, h, w], c: PRODUCT_COLORS[Math.floor(random(`c${seed}${side}${u}${lvl}${k}`) * PRODUCT_COLORS.length)]});
            }
            z -= w + 0.015;
          }
        }
      }
    }
    return out;
  }, [seed]);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const col = new THREE.Color();
    items.forEach((it, i) => {
      m.compose(new THREE.Vector3(...it.p), new THREE.Quaternion(), new THREE.Vector3(...it.s));
      ref.current!.setMatrixAt(i, m);
      ref.current!.setColorAt(i, col.set(it.c));
    });
    ref.current!.instanceMatrix.needsUpdate = true;
    if (ref.current!.instanceColor) ref.current!.instanceColor.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.7} metalness={0.02} />
    </instancedMesh>
  );
};

const Shelving: React.FC = () => (
  <>
    {[-1, 1].map((side) =>
      Array.from({length: 12}).map((_, u) => {
        const zc = -1.5 - u * 2.1;
        return (
          <group key={`${side}${u}`}>
            <mesh position={[side * 1.92, 1.3, zc]}>
              <boxGeometry args={[0.08, 2.6, 2.05]} />
              <meshStandardMaterial color="#d9dde3" metalness={0.3} roughness={0.5} />
            </mesh>
            {[0, 1, 2, 3].map((lvl) => (
              <mesh key={lvl} position={[side * 1.58, 0.16 + lvl * 0.52, zc]}>
                <boxGeometry args={[0.72, 0.035, 2.05]} />
                <meshStandardMaterial color="#e7eaee" metalness={0.4} roughness={0.35} />
              </mesh>
            ))}
            <mesh position={[side * 1.23, 0.08, zc]}>
              <boxGeometry args={[0.02, 0.16, 2.05]} />
              <meshStandardMaterial color="#9aa3ad" />
            </mesh>
          </group>
        );
      })
    )}
  </>
);

const Person: React.FC<{t: number}> = ({t}) => {
  const z = -12 + t * 9.5;
  const x = -0.25 + Math.sin(t * 2) * 0.12;
  const swing = Math.sin(t * 34) * 0.45;
  const hoodie = {color: '#1c2026', roughness: 0.9};
  return (
    <group position={[x, 0, z]} rotation={[0, Math.PI + 0.15, 0]}>
      {[-1, 1].map((sd) => (
        <mesh key={sd} position={[sd * 0.11, 0.45, 0]} rotation={[sd * swing, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.065, 0.9, 16]} />
          <meshStandardMaterial color="#2d3a55" roughness={0.85} />
        </mesh>
      ))}
      <mesh position={[0, 1.22, 0]}>
        <capsuleGeometry args={[0.24, 0.55, 8, 24]} />
        <meshStandardMaterial {...hoodie} />
      </mesh>
      {[-1, 1].map((sd) => (
        <mesh key={sd} position={[sd * 0.3, 1.15, 0]} rotation={[-sd * swing * 0.8, 0, sd * 0.08]}>
          <capsuleGeometry args={[0.07, 0.5, 6, 12]} />
          <meshStandardMaterial {...hoodie} />
        </mesh>
      ))}
      <mesh position={[0, 1.78, 0]}>
        <sphereGeometry args={[0.15, 24, 16]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.8, -0.03]}>
        <sphereGeometry args={[0.185, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial {...hoodie} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export type AisleView = 'corner' | 'overhead' | 'end';
const VIEWS: Record<AisleView, {pos: [number, number, number]; target: [number, number, number]; fov: number}> = {
  corner: {pos: [1.2, 3.0, 1.2], target: [-0.4, 0.5, -9], fov: 62},
  overhead: {pos: [-1.0, 3.3, -3], target: [0.4, 0, -12], fov: 70},
  end: {pos: [0.3, 2.9, -27.5], target: [0, 0.6, -10], fov: 58},
};

export const Aisle3D: React.FC<{width: number; height: number; seed?: string; view?: AisleView; person?: boolean; personStart?: number}> = ({
  width,
  height,
  seed = 'a',
  view = 'corner',
  person = true,
  personStart = 0,
}) => {
  const frame = useCurrentFrame();
  const v = VIEWS[view];
  const t = Math.max(0, (frame - personStart) / 300);
  return (
    <ThreeCanvas width={width} height={height} gl={{antialias: true}} camera={{fov: v.fov, position: v.pos}}>
      <LookAt position={v.pos} target={v.target} fov={v.fov} />
      <Env exposure={0.78} intensity={0.25} />
      <color attach="background" args={['#1a1d22']} />
      <fog attach="fog" args={['#1a1d22', 10, 30]} />
      <ambientLight intensity={0.22} color="#dfe8ff" />
      {/* floor + ceiling */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -12]}>
        <planeGeometry args={[4.2, 34]} />
        <meshStandardMaterial color="#8f949b" metalness={0.1} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.6, -12]}>
        <planeGeometry args={[6, 34]} />
        <meshStandardMaterial color="#7d8289" roughness={0.95} />
      </mesh>
      {/* fluorescent strips + their light */}
      {Array.from({length: 9}).map((_, i) => (
        <group key={i}>
          <mesh position={[0, 3.55, -1 - i * 3.2]}>
            <boxGeometry args={[0.22, 0.05, 1.6]} />
            <meshStandardMaterial color="#ffffff" emissive="#f2f6ff" emissiveIntensity={1.6} />
          </mesh>
          {i % 2 === 0 ? <pointLight position={[0, 3.2, -1 - i * 3.2]} intensity={6} distance={9} decay={1.6} color="#f4f7ff" /> : null}
        </group>
      ))}
      {[-1, 1].map((sd) => (
        <mesh key={sd} position={[sd * 2.0, 1.8, -12]} rotation={[0, -sd * Math.PI / 2, 0]}>
          <planeGeometry args={[34, 3.6]} />
          <meshStandardMaterial color="#6d737b" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 1.8, -27]}>
        <planeGeometry args={[6, 3.6]} />
        <meshStandardMaterial color="#3a4048" roughness={0.8} />
      </mesh>
      <Shelving />
      <Products seed={seed} />
      {person ? <Person t={t} /> : null}
    </ThreeCanvas>
  );
};
