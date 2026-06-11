import React from 'react';
import { MousePosition } from '@/types/landing';

interface CrosshairProps {
  mousePos: MousePosition;
  isVisible: boolean;
}

export const Crosshair: React.FC<CrosshairProps> = ({ mousePos, isVisible }) => {
  return (
    <>
      <div className={`pointer-events-none fixed inset-0 z-100 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute w-px h-full bg-white/10" style={{ left: mousePos.x }}></div>
        <div className="absolute h-px w-full bg-white/10" style={{ top: mousePos.y }}></div>
        
        <div 
          className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2" 
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="absolute w-1.5 h-1.5 bg-[#ff0000] shadow-[0_0_12px_#ff0000]"></div>
        </div>
      </div>

      <div className={`absolute top-28 left-6 font-mono text-[11px] text-white/40 tracking-wider transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        X: {mousePos.x} <br />
        Y: {mousePos.y}
      </div>
    </>
  );
};