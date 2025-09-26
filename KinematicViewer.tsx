
import React from 'react';
import type { LimbData } from '../types';

interface KinematicViewerProps {
  leftLimb: LimbData;
  rightLimb: LimbData;
}

const Limb: React.FC<{ hip: number; knee: number; isLeft?: boolean }> = ({ hip, knee, isLeft = false }) => {
  const hipX = 100;
  const hipY = 50;
  const thighLength = 40;
  const shinLength = 40;

  return (
    <g transform={`translate(${hipX}, ${hipY})`} className={isLeft ? "stroke-cyan-600" : "stroke-cyan-300"}>
      {/* Thigh */}
      <g transform={`rotate(${hip})`}>
        <line x1="0" y1="0" x2="0" y2={thighLength} strokeWidth="4" />
        {/* Knee Joint */}
        <circle cx="0" cy={thighLength} r="4" fill="#1f2937" strokeWidth="2" />
        {/* Shin */}
        <g transform={`translate(0, ${thighLength}) rotate(${knee})`}>
          <line x1="0" y1="0" x2="0" y2={shinLength} strokeWidth="3" />
          {/* Ankle Joint */}
          <circle cx="0" cy={shinLength} r="3" fill="#1f2937" strokeWidth="2" />
        </g>
      </g>
    </g>
  );
};

export const KinematicViewer: React.FC<KinematicViewerProps> = ({ leftLimb, rightLimb }) => {
  return (
    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm shadow-lg shadow-cyan-500/5 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Kinematic Stride Analysis</h3>
      <div className="flex-grow w-full flex items-center justify-center">
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Main Body/Hip */}
          <rect x="70" y="40" width="60" height="20" rx="5" className="fill-gray-600 stroke-cyan-700" strokeWidth="1" />
          <g style={{ filter: 'url(#glow)' }}>
            <Limb hip={rightLimb.hip} knee={rightLimb.knee} />
            <Limb hip={leftLimb.hip} knee={leftLimb.knee} isLeft />
          </g>
        </svg>
      </div>
    </div>
  );
};
