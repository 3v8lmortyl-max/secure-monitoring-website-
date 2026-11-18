import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Aisle3D, CctvCamera3D, Shield3D} from '../three';
import {CctvFrame} from '../assets';
import {UsMap} from '../usmap';
import {Backdrop} from '../kit';

/** Dev-only contact sheet of the 3D / map assets. */
export const Preview: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <div style={{position: 'absolute', left: 0, top: 0}}><CctvCamera3D width={540} height={540} /></div>
    <div style={{position: 'absolute', left: 540, top: 0}}><Shield3D width={540} height={540} /></div>
    <div style={{position: 'absolute', left: 20, top: 560}}><CctvFrame w={1040} h={700} cam="CAM 07 AISLE 4"><Aisle3D width={1040} height={700} /></CctvFrame></div>
    <div style={{position: 'absolute', left: 20, top: 1280}}><CctvFrame w={510} h={500} cam="CAM 02"><Aisle3D width={510} height={500} view="end" seed="b" /></CctvFrame></div>
    <div style={{position: 'absolute', left: 550, top: 1300}}><UsMap width={510} height={360} /></div>
  </AbsoluteFill>
);
