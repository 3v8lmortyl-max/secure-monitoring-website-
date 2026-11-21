/** GLSL for STARDUST: shared noise, the morphing particle universe, the sun, planet, glow and shockwave. */

export const NOISE = /* glsl */ `
float hash3(vec3 p){ p = fract(p*0.3183099 + 0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vnoise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x), mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x), mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y), f.z);
}
float fbm(vec3 p){ float a = 0.5, s = 0.0; for(int i=0;i<5;i++){ s += a*vnoise(p); p = p*2.03 + 7.1; a *= 0.5; } return s; }
`;

/* ------------------------------------------------------------------ particle universe */
export const PARTICLE_VERT = /* glsl */ `
${NOISE}
attribute vec4 aSeed;
attribute vec3 aWeb;
attribute vec3 aText;
uniform float uTime, uBang, uShell, uStarScale, uSize, uSingular, uTextScale;
uniform vec3 uW1; // bang, web, star
uniform vec3 uW2; // shell, disk, text
varying vec3 vColor;
varying float vFade;

vec3 elementColor(float s){
  // forged elements: oxygen teal, iron ember, carbon gold, silicon violet, calcium ice
  if (s < 0.2) return vec3(0.25, 1.0, 0.85);
  if (s < 0.4) return vec3(1.0, 0.35, 0.18);
  if (s < 0.6) return vec3(1.0, 0.8, 0.3);
  if (s < 0.8) return vec3(0.72, 0.5, 1.0);
  return vec3(0.75, 0.9, 1.0);
}

void main(){
  vec3 dir = normalize(aSeed.xyz * 2.0 - 1.0 + 1e-4);
  float sp = 0.25 + aSeed.w;

  // 1. big bang: radial burst with a slight spiral
  float rb = uBang * (3.0 + 24.0 * sp * sp);
  float tw = uBang * 0.6 * (aSeed.y - 0.5);
  vec3 pBang = vec3(dir.x*cos(tw) - dir.z*sin(tw), dir.y, dir.x*sin(tw) + dir.z*cos(tw)) * rb;

  // 2. cosmic web: precomputed filaments, gently breathing
  vec3 pWeb = aWeb + 0.25 * vec3(vnoise(aWeb*0.4 + uTime*0.05) - 0.5, vnoise(aWeb*0.4 + 3.0 + uTime*0.05) - 0.5, vnoise(aWeb*0.4 + 7.0) - 0.5);

  // 3. protostar: differential-rotation swirl + corona shell
  float r = 0.9 + pow(aSeed.y, 1.7) * 7.5;
  float ang = aSeed.x * 6.2831 + uTime * (1.8 / (r + 0.4));
  vec3 pStar = vec3(cos(ang) * r, (aSeed.z - 0.5) * 0.18 * r, sin(ang) * r);
  if (aSeed.w > 0.72) pStar = dir * (1.15 + 0.5 * aSeed.y);
  pStar *= uStarScale;

  // 4. supernova remnant: expanding turbulent shell
  vec3 turb = vec3(vnoise(dir*3.0 + uTime*0.3), vnoise(dir*3.0 + 11.0), vnoise(dir*3.0 + 23.0)) - 0.5;
  vec3 pShell = (dir + turb * 0.7) * uShell * (0.7 + 0.6 * aSeed.y);

  // 5. accretion disk: thin, tilted, Keplerian
  float rd = 3.0 + pow(aSeed.y, 1.25) * 8.5;
  float ad = aSeed.x * 6.2831 + uTime * (2.6 / rd);
  vec3 pDisk = vec3(cos(ad) * rd, (aSeed.z - 0.5) * 0.22 + sin(ad*2.0)*0.05, sin(ad) * rd);
  pDisk.yz = mat2(0.94, -0.34, 0.34, 0.94) * pDisk.yz;

  // 6. typography
  vec3 pText = aText * uTextScale + 0.05 * vec3(sin(uTime*1.3 + aSeed.x*40.0), cos(uTime*1.1 + aSeed.y*40.0), 0.0);

  vec3 pos = uW1.x*pBang + uW1.y*pWeb + uW1.z*pStar + uW2.x*pShell + uW2.y*pDisk + uW2.z*pText;

  vec3 cBang = mix(vec3(1.0, 0.95, 0.88), vec3(1.0, 0.55, 0.22), aSeed.y);
  vec3 cWeb = mix(vec3(0.3, 0.45, 1.0), vec3(0.78, 0.42, 1.0), aSeed.x);
  vec3 cStar = mix(vec3(1.0, 0.82, 0.4), vec3(1.0, 0.42, 0.14), aSeed.y);
  vec3 cShell = elementColor(aSeed.x);
  vec3 cDisk = mix(vec3(0.9, 0.62, 0.36), vec3(0.45, 0.62, 1.0), step(0.72, aSeed.z));
  vec3 cText = mix(vec3(1.0, 0.93, 0.78), vec3(0.62, 0.8, 1.0), aSeed.x * 0.5);
  vColor = uW1.x*cBang + uW1.y*cWeb + uW1.z*cStar + uW2.x*cShell + uW2.y*cDisk + uW2.z*cText;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float size = uSize * (0.55 + aSeed.z * 0.9) * (1.0 + uW2.z * 0.35);
  gl_PointSize = max(1.0, size * (320.0 / -mv.z)) * mix(1.0, 0.35, uSingular);
  gl_Position = projectionMatrix * mv;
  vFade = mix(1.0, 0.08, uSingular) * smoothstep(0.0, 1.5, -mv.z);
}
`;

export const PARTICLE_FRAG = /* glsl */ `
uniform float uAlpha;
uniform float uTextBoost;
varying vec3 vColor;
varying float vFade;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  float a = exp(-d * 16.0) + 0.35 * exp(-d * 60.0);
  gl_FragColor = vec4(vColor * a * uAlpha * vFade * (1.0 + 0.6 * uTextBoost), 1.0);
}
`;

/* ------------------------------------------------------------------ star surface */
export const SURFACE_VERT = /* glsl */ `
varying vec3 vN; varying vec3 vP; varying vec3 vView;
void main(){
  vN = normalize(normal);
  vP = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

export const SUN_FRAG = /* glsl */ `
${NOISE}
uniform float uTime, uHot, uBright;
varying vec3 vN; varying vec3 vP; varying vec3 vView;
void main(){
  vec3 p = normalize(vP);
  float n = fbm(p * 4.0 + vec3(0.0, uTime * 0.15, uTime * 0.07));
  float g = fbm(p * 14.0 - vec3(uTime * 0.3));
  float heat = clamp(n * 0.75 + g * 0.45, 0.0, 1.0);
  vec3 young = mix(vec3(1.0, 0.45, 0.08), vec3(1.0, 0.97, 0.75), heat);
  vec3 giant = mix(vec3(0.55, 0.05, 0.02), vec3(1.0, 0.45, 0.15), heat);
  vec3 col = mix(young, giant, uHot);
  float limb = pow(max(dot(normalize(vN), vec3(0.0,0.0,1.0)) * 0.5 + 0.5, 0.0), 0.35);
  float rim = pow(1.0 - abs(dot(normalize(vN), vView)), 2.0);
  col = col * (0.55 + 0.6 * limb) + rim * vec3(1.0, 0.6, 0.25) * 0.6;
  gl_FragColor = vec4(col * uBright, 1.0);
}
`;

export const GLOW_FRAG = /* glsl */ `
uniform vec3 uColor; uniform float uPower, uStrength;
varying vec3 vN; varying vec3 vP; varying vec3 vView;
void main(){
  float f = pow(1.0 - abs(dot(normalize(vN), vView)), uPower);
  gl_FragColor = vec4(uColor * f * uStrength, 1.0);
}
`;

export const PLANET_FRAG = /* glsl */ `
${NOISE}
uniform float uTime; uniform vec3 uLight;
varying vec3 vN; varying vec3 vP; varying vec3 vView;
void main(){
  vec3 p = normalize(vP);
  float h = fbm(p * 2.6 + 3.0);
  float land = smoothstep(0.52, 0.56, h);
  float mount = smoothstep(0.62, 0.75, h);
  float ice = smoothstep(0.78, 0.9, abs(p.y));
  vec3 ocean = mix(vec3(0.02, 0.09, 0.28), vec3(0.04, 0.32, 0.55), smoothstep(0.35, 0.52, h));
  vec3 ground = mix(vec3(0.12, 0.38, 0.12), vec3(0.55, 0.45, 0.28), mount);
  vec3 col = mix(ocean, ground, land);
  col = mix(col, vec3(0.95), ice);
  float clouds = smoothstep(0.55, 0.75, fbm(p * 5.0 + vec3(uTime * 0.04, 0.0, uTime * 0.02)));
  col = mix(col, vec3(1.0), clouds * 0.85);
  vec3 n = normalize(vN);
  float diff = max(dot(n, normalize(uLight)), 0.0);
  float spec = pow(max(dot(reflect(-normalize(uLight), n), vView), 0.0), 40.0) * (1.0 - land) * (1.0 - clouds);
  vec3 lit = col * (0.04 + 1.1 * diff) + spec * vec3(1.0, 0.95, 0.8) * 0.8;
  // city lights on the night side
  float city = step(0.995, hash3(floor(p * 220.0))) * land * (1.0 - smoothstep(0.0, 0.15, diff));
  lit += city * vec3(1.0, 0.75, 0.4) * 1.5;
  float rim = pow(1.0 - max(dot(n, vView), 0.0), 3.0);
  lit += rim * vec3(0.35, 0.6, 1.0) * (0.3 + diff);
  gl_FragColor = vec4(lit, 1.0);
}
`;

export const RING_FRAG = /* glsl */ `
uniform float uR, uAlpha;
varying vec2 vUv;
void main(){
  float d = length(vUv - 0.5) * 2.0;
  float w = 0.03 + uR * 0.05;
  float ring = exp(-pow((d - uR) / w, 2.0));
  float inner = smoothstep(uR, 0.0, d) * 0.04;
  vec3 col = mix(vec3(0.55, 0.75, 1.0), vec3(1.0, 0.9, 0.75), ring);
  gl_FragColor = vec4(col * (ring + inner) * uAlpha, 1.0);
}
`;

export const UV_VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

export const STARS_VERT = /* glsl */ `
attribute float aSize; attribute float aTw;
uniform float uTime;
varying float vB;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vB = 0.55 + 0.45 * sin(uTime * (0.6 + aTw * 2.0) + aTw * 50.0);
  gl_PointSize = aSize;
  gl_Position = projectionMatrix * mv;
}
`;
export const STARS_FRAG = /* glsl */ `
uniform float uAlpha;
varying float vB;
void main(){
  vec2 c = gl_PointCoord - 0.5; float a = exp(-dot(c, c) * 18.0);
  gl_FragColor = vec4(vec3(0.85, 0.9, 1.0) * a * vB * uAlpha, 1.0);
}
`;
