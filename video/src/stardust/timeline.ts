/**
 * STARDUST: master timeline (30 fps). Everything (particles, sun, planet, camera,
 * titles, narration, score) is keyed to these frame numbers so picture and sound stay locked.
 */
export const FPS = 30;
export const TOTAL = 1620; // 54 s

export const T = {
  bang: 150, // singularity bursts
  webIn: [300, 430],
  webOut: [470, 600],
  starIn: [470, 600],
  sunGrow: [540, 660],
  giant: [690, 840], // red-giant swell + fusion
  collapse: [840, 868],
  nova: 870, // supernova flash
  shellOut: [960, 1080],
  diskIn: [960, 1080],
  planetGrow: [1080, 1200],
  planetOut: [1330, 1400],
  diskOut: [1300, 1400],
  textIn: [1340, 1440],
  fadeOut: [1580, 1620],
} as const;

/** Narration lines (frame, text) – read by scripts/stardust_audio.py via scripts/stardust_timeline.json. */
export const NARRATION: [number, string][] = [
  [12, 'Thirteen point eight billion years ago, everything fit inside a single point.'],
  [205, 'Then it burst. Space itself unfolded, and hydrogen drifted into a vast, cosmic web.'],
  [405, 'Over millions of years, gravity pulled the threads together,'],
  [522, 'until the first stars ignited.'],
  [640, 'Inside them, hydrogen was forged into carbon, oxygen, and iron.'],
  [782, 'And when the giants died,'],
  [884, 'they scattered those atoms across the dark.'],
  [1010, 'The dust gathered again, and became new worlds.'],
  [1172, 'Oceans. Mountains. Air.'],
  [1262, 'The iron in your blood, and the calcium in your bones, were made in stars that died before the sun was born.'],
  [1478, 'You are made of stardust.'],
];

export const smooth = (f: number, a: number, b: number) => {
  const x = Math.min(1, Math.max(0, (f - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
export const expoOut = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
