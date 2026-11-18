import React from 'react';
import {Caption, Line} from './components/Text';
import {s} from './theme';

export type VideoProps = {
  /** Shown in the "follow" end card. */
  brandName: string;
  /** The tool the video is about. */
  productName: string;
  productTagline: string;
  installCommand: string;
  /** Comment-to-get call to action. */
  ctaKeyword: string;
  ctaOffer: string;
  ctaBookTitle: string;
  ctaGuideLine: string;
  ctaGuidePayoff: string;
};

export const defaultProps: VideoProps = {
  brandName: 'Secure Monitoring',
  productName: 'Graphify',
  productTagline: 'Knowledge Graphs for AI Coding Assistants',
  installCommand: 'pip install graphify',
  ctaKeyword: 'GRAPH',
  ctaOffer: "And I'll send you my free guide",
  ctaBookTitle: 'Stop burning AI tokens',
  ctaGuideLine: 'A simple step by step guide',
  ctaGuidePayoff: 'set up in 5 minutes',
};

/* helpers: captions/bullets are authored in seconds */
export const L = (text: string, size = 58, weight = 500): Line => ({text, size, weight});
export const C = (at: number, ...lines: Line[]): Caption => ({at: s(at), lines});
export const B = (at: number, text: string) => ({at: s(at), text});

export const Row: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 40}) => (
  <div style={{display: 'flex', alignItems: 'center', gap}}>{children}</div>
);

/** Fixed part lengths (frames) taken from the scene cuts of the original video: 3095 frames total. */
export const PART_FRAMES = [699, 691, 941, 764];
export const TOTAL_FRAMES = PART_FRAMES.reduce((a, b) => a + b, 0);
