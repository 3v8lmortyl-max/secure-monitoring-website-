import React from 'react';
import {Easing, interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Global type scale: author sizes in the script, tune overall size here. */
export const TEXT_SCALE = 1.35;

/**
 * Word markup used throughout the script:
 *   *word*  -> bold
 *   _word_  -> italic
 *   !word!  -> accent colour (red)
 */
type Token = {text: string; bold: boolean; italic: boolean; accent: boolean};

const parse = (line: string): Token[] =>
  line
    .split(' ')
    .filter(Boolean)
    .map((raw) => {
      let w = raw;
      let bold = false;
      let italic = false;
      let accent = false;
      for (let i = 0; i < 3; i++) {
        if (w.length > 2 && w.startsWith('*') && w.endsWith('*')) {
          bold = true;
          w = w.slice(1, -1);
        } else if (w.length > 2 && w.startsWith('_') && w.endsWith('_')) {
          italic = true;
          w = w.slice(1, -1);
        } else if (w.length > 2 && w.startsWith('!') && w.endsWith('!')) {
          accent = true;
          w = w.slice(1, -1);
        }
      }
      return {text: w, bold, italic, accent};
    });

export const countWords = (lines: string[]) =>
  lines.reduce((n, l) => n + parse(l).length, 0);

/**
 * A single word: pops in slightly large, blurred and grey, then settles
 * into place and darkens to ink. This is the signature motion of the original.
 */
const Word: React.FC<{token: Token; appearAt: number; weight: number; color?: string}> = ({
  token,
  appearAt,
  weight,
  color,
}) => {
  const frame = useCurrentFrame();
  const t = frame - appearAt;
  const p = interpolate(t, [0, 8], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const c = interpolate(t, [3, 16], [0, 1], clamp);
  const target = token.accent ? '#d23b3b' : color ?? COLORS.ink;
  return (
    <span
      style={{
        display: 'inline-block',
        marginRight: '0.24em',
        opacity: interpolate(t, [0, 3], [0, 1], clamp),
        transform: `translateY(${(1 - p) * 22}px) scale(${1 + (1 - p) * 0.16})`,
        transformOrigin: '50% 100%',
        filter: `blur(${(1 - p) * 7}px)`,
        color: interpolateColors(c, [0, 1], [COLORS.muted, target]),
        fontWeight: token.bold ? Math.max(700, weight) : weight,
        fontStyle: token.italic ? 'italic' : 'normal',
        whiteSpace: 'pre',
      }}
    >
      {token.text}
    </span>
  );
};

export type Line = {text: string; size?: number; weight?: number; color?: string};

/** Lines of words revealed one by one, starting at `start` (frames), `speed` frames apart. */
export const WordLines: React.FC<{
  lines: Line[];
  start: number;
  speed?: number;
  align?: 'center' | 'left';
}> = ({lines, start, speed = 6, align = 'center'}) => {
  const frame = useCurrentFrame();
  let idx = 0;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        fontFamily: FONT,
      }}
    >
      {lines.map((line, li) => {
        const tokens = parse(line.text);
        const first = idx;
        idx += tokens.length;
        if (frame < start + first * speed) return null; // line not started yet
        return (
          <div
            key={li}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: align === 'center' ? 'center' : 'flex-start',
              alignItems: 'baseline',
              fontSize: (line.size ?? 58) * TEXT_SCALE,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              // compensate the trailing word margin so lines stay optically centred
              marginRight: align === 'center' ? '-0.24em' : 0,
            }}
          >
            {tokens.map((tok, ti) => {
              const at = start + (first + ti) * speed;
              if (frame < at) return null;
              return (
                <Word key={ti} token={tok} appearAt={at} weight={line.weight ?? 500} color={line.color} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/** `say` overrides what the voice-over reads for this caption. */
export type Caption = {at: number; lines: Line[]; speed?: number; say?: string};

/** A sequence of captions: each replaces the previous one, with a quick blur-out. */
export const Captions: React.FC<{captions: Caption[]; end: number; top: number}> = ({
  captions,
  end,
  top,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {captions.map((cap, i) => {
        const until = i + 1 < captions.length ? captions[i + 1].at : end;
        if (frame < cap.at || frame >= until) return null;
        const out = interpolate(frame, [until - 5, until], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top,
              left: 60,
              right: 60,
              opacity: 1 - out,
              filter: `blur(${out * 10}px)`,
              transform: `translateY(${out * 14}px)`,
            }}
          >
            <WordLines lines={cap.lines} start={cap.at} speed={cap.speed} />
          </div>
        );
      })}
    </>
  );
};

/** The four-point sparkle used as the bullet glyph. */
export const Sparkle: React.FC<{size: number; color?: string}> = ({size, color = COLORS.ink}) => (
  <svg width={size} height={size} viewBox="-1 -1 2 2">
    <path
      d="M0,-1 C0.08,-0.08 0.08,-0.08 1,0 C0.08,0.08 0.08,0.08 0,1 C-0.08,0.08 -0.08,0.08 -1,0 C-0.08,-0.08 -0.08,-0.08 0,-1Z"
      fill={color}
    />
  </svg>
);

export type Bullet = {at: number; text: string; say?: string};

/** Accumulating ✦ list. Use "|" in text to force a line break. */
export const Bullets: React.FC<{items: Bullet[]; top: number; left?: number; size?: number; speed?: number}> = ({
  items,
  top,
  left = 110,
  size = 52,
  speed = 5,
}) => {
  const frame = useCurrentFrame();
  const sz = size * TEXT_SCALE;
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right: 80,
        display: 'flex',
        flexDirection: 'column',
        gap: sz * 0.5,
        fontFamily: FONT,
      }}
    >
      {items.map((b, i) => {
        if (frame < b.at) return null;
        const t = frame - b.at;
        const pop = interpolate(t, [0, 7], [0, 1], {...clamp, easing: Easing.out(Easing.back(2.2))});
        return (
          <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: sz * 0.4}}>
            <div
              style={{
                marginTop: sz * 0.22,
                transform: `scale(${pop}) rotate(${(1 - pop) * -90}deg)`,
                flexShrink: 0,
              }}
            >
              <Sparkle size={sz * 0.62} />
            </div>
            <WordLines
              lines={b.text.split('|').map((t) => ({text: t, size, weight: 500}))}
              start={b.at + 2}
              speed={speed}
              align="left"
            />
          </div>
        );
      })}
    </div>
  );
};
