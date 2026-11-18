import {continueRender, delayRender, staticFile} from 'remotion';

/* Fonts are bundled in public/fonts (variable woff2), so rendering works offline. */
const faces: [string, string, string][] = [
  ['Roboto', 'fonts/Roboto.woff2', 'normal'],
  ['Roboto', 'fonts/Roboto-Italic.woff2', 'italic'],
  ['Roboto Mono', 'fonts/RobotoMono.woff2', 'normal'],
];
if (typeof document !== 'undefined') {
  const handle = delayRender('Loading fonts');
  Promise.all(
    faces.map(([family, file, style]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {style, weight: '100 900'});
      document.fonts.add(face);
      return face.load();
    })
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error('Font loading failed', err);
      continueRender(handle);
    });
}

export const FONT = "'Roboto', 'Helvetica Neue', Arial, sans-serif";
export const MONO = "'Roboto Mono', ui-monospace, monospace";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const COLORS = {
  bg: '#ffffff',
  ink: '#121212',
  muted: '#a3a3a3',
  faint: '#d6d6d6',
  watermark: '#c9c9c9',
  orange: '#D97757',
  blue: '#1E5BE6',
  purple: '#7A4DE8',
  navy: '#121a33',
};

/** The long, soft bottom-right shadow every floating element in the original has. */
export const SHADOW =
  '28px 44px 60px rgba(0,0,0,0.26), 10px 14px 22px rgba(0,0,0,0.10)';
export const DROP = 'drop-shadow(22px 34px 26px rgba(0,0,0,0.24))';

/** Seconds -> frames */
export const s = (sec: number) => Math.round(sec * FPS);
